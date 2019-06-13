import { database } from './database'
import { QueryResult } from 'pg'
import { DatabaseBoard, CreatedDatabaseBoard, DatabaseBoardResult } from '../types/Board'
import { DatabaseUser } from '../types/User'

interface BoardQueryResult extends QueryResult {
    rows: DatabaseBoard[]
}

interface OwnerUserQueryResult extends QueryResult {
    rows: DatabaseUser[]
}

export async function findBoards(userId: number, byId?: number) {
    try {
        const POSTGRES_QUERY = `SELECT * FROM boards WHERE (collaborators @> ARRAY[$1]::INTEGER[] OR owner = $1) ${byId ? 'AND _id = $2' : ''};`
        const POSTGRES_QUERY_PARAMS = byId ? [ userId, byId ] : [userId]
        const { rows: boards }: BoardQueryResult = await database.query(POSTGRES_QUERY, POSTGRES_QUERY_PARAMS)

        if (typeof byId !== undefined && !isNaN(Number(byId))) {
            const [board] = boards

            if (board) {
                return getPopulatedBoardFromDatabase(board)
            } else {
                throw new Error('Your either have passed a wrong board identifier, or you are not a participant of this board.')
            }
        } else {
            return Promise.all(boards.map(board => getPopulatedBoardFromDatabase(board)))
        }
    } catch (error) {
        throw new Error(`Something went wrong with getting ${byId ? 'your board' : 'boards'} from the database!`)
    }
}

export async function getPopulatedBoardFromDatabase(board: DatabaseBoard) {
    const { rows: [ownerUser] }: OwnerUserQueryResult = await database.query(
        `SELECT _id, full_name, email FROM users WHERE _id = $1;`,
        [board.owner]
    )

    let collaboratorUsers: DatabaseUser[] = []
    if (board.collaborators && board.collaborators.length > 0) {
        const { rows } = await database.query(
            `SELECT _id, full_name, email FROM users WHERE _id = ANY($1);`,
            [`{${board.collaborators.join(', ')}`]
        )

        collaboratorUsers = rows
    }

    let boardResults: DatabaseBoardResult[] = []
    if (board.results && board.results.length > 0) {
        const { rows } = await database.query(
            `SELECT _id, result_id, links FROM board_results WHERE _id = ANY($1);`,
            [`{${board.results.join(', ')}`]
        )

        boardResults = rows
    }

    if (boardResults && boardResults.length > 0) {
        boardResults = await Promise.all(boardResults.map(async boardResult => {
            if (boardResult.links && boardResult.links.length > 0) {
                const { rows: boardResultLinks } = await database.query(
                    `SELECT * FROM links WHERE _id = ANY($1);`,
                    [`{${boardResult.links.join(', ')}}`]
                )

                return {
                    ...boardResult,
                    links: boardResultLinks || [],
                }
            } else {
                return boardResult
            }
        }))
    }

    return {
        board: {
            ...board,
            ...(ownerUser ? ({ owner: { _id: ownerUser._id, email: ownerUser.email, fullName: ownerUser.full_name } }) : {}),
            ...((collaboratorUsers && collaboratorUsers.length > 0) ? ({ collaborators: collaboratorUsers.map(collaboratorUser => ({ _id: collaboratorUser._id, email: collaboratorUser.email, fullName: collaboratorUser.full_name })) }) : {}),
            ...((boardResults && boardResults.length > 0) ? ({ results: boardResults }) : {}),
        },
    }
}

interface CreateBoardOptions {
    createdByUserId: number
    name: string
    collaborators?: number[]
    result?: number
    iconName?: string
}

export async function createBoard({ createdByUserId, name, result, collaborators, iconName }: CreateBoardOptions) {
    let boardResultQueryData

    try {
        if (result) {
            boardResultQueryData = await database.query(
                `INSERT INTO board_results (result_id) VALUES ($1) RETURNING _id;`,
                [result]
            )
        }
    } catch (error) {
        console.error('Inserting a new result into the board_results table failed.')
        throw new Error('Inserting a new result into the board_results table failed.')
    }

    try {
        const { rows: [board] } = await database.query(
            `INSERT INTO boards (name, owner, results, collaborators, icon_name) VALUES ($1, $2, $3, $4, $5) RETURNING _id;`,
            [ name, createdByUserId, (boardResultQueryData && boardResultQueryData.rows && boardResultQueryData.rows[0]) || null, (collaborators && `{${collaborators.join(', ')}}`) || null, iconName || null ]
        )

        if (board) {
            return board as CreatedDatabaseBoard
        } else {
            console.error('Something went wrong creating a new board.')
            throw new Error('Something went wrong creating a new board.')
        }
    } catch (error) {
        console.error('Inserting a new board into the boards table failed.')
        throw new Error('Inserting a new board into the boards table failed.')
    }
}

export interface EditBoardOptions {
    id: number
    name?: string
    iconName?: string
    userId: number
}

interface EditBoardQueryResponse {
    rows: {
        _id: number
    }[]
}

export async function editBoard({ id, name, iconName, userId }: EditBoardOptions) {
    if (isNaN(id) || (!iconName && !name) || isNaN(userId)) {
        throw new Error('Make sure to pass all the required parameters to the editBoard function.')
    }

    const boardsQuerySets: string[] = []
    const boardsQueryData: any[] = [ id, userId ]

    if (iconName) {
        boardsQuerySets.push(`icon_name = $${boardsQuerySets.length + 3}`)
        boardsQueryData.push(iconName)
    }

    if (name) {
        boardsQuerySets.push(`name = $${boardsQuerySets.length + 3}`)
        boardsQueryData.push(name)
    }

    try {
        const { rows: [board] }: EditBoardQueryResponse = await database.query(
            `UPDATE boards
                SET ${boardsQuerySets.join(', ')}
            WHERE _id = $1 AND (collaborators @> ARRAY[$2]::INTEGER[] OR owner = $2)
            RETURNING _id;`,
            boardsQueryData
        )

        if (board) {
            return board
        } else {
            throw new Error(`We could not find the board that you updated for some reason.`)
        }
    } catch (error) {
        console.error('Updating a boards table failed.')
        throw new Error('Updating a boards table failed.')
    }
}

interface RemoveBoardOptions {
    id: number
    userId: number
}

interface RemoveBoardQueryResponse {
    rows: DatabaseBoard[]
}

interface RemoveBoardBoardResultsQueryResponse {
    rows: DatabaseBoardResult[]
}

export async function removeBoard({ id, userId }: RemoveBoardOptions) {
    if (isNaN(id) || isNaN(userId)) {
        throw new Error('Make sure to pass all the required parameters to the removeBoard function.')
    }

    try {
        const { rows: [board] }: RemoveBoardQueryResponse = await database.query(
            `SELECT * FROM boards WHERE _id = $1 AND owner = $2;`,
            [ id, userId ]
        )

        if (board) {
            if (board.results && board.results.length > 0) {
                const { rows: boardResults }: RemoveBoardBoardResultsQueryResponse = await database.query(
                    `SELECT _id, links from board_results WHERE _id = ANY($1::INTEGER[]);`,
                    [`{${board.results.join(', ')}}`]
                )

                if (boardResults && boardResults.length > 0) {
                    await Promise.all(boardResults.map(async boardResult => {
                        if (boardResult.links && boardResult.links.length > 0) {
                            await database.query(
                                `DELETE FROM links WHERE _id = ANY($1::INTEGER[]);`,
                                [`{${boardResult.links.join(', ')}}`]
                            )
                        }

                        return boardResult
                    }))
                }

                await database.query(
                    `DELETE FROM board_results WHERE _id = ANY($1::INTEGER[]);`,
                    [`{${board.results.join(', ')}}`]
                )
            }

            await database.query(
                `DELETE FROM boards WHERE _id = $1 AND owner = $2;`,
                [ id, userId ]
            )

            return true
        } else {
            throw new Error(`We could not find the board that you tried to remove or you are not the owner of this board.`)
        }
    } catch (error) {
        console.log(error.message)
        console.error('Deleting a boards table failed.')
        throw new Error('Deleting a boards table failed.')
    }
}

interface AddCollaboratorToBoardOptions {
    id: number
    ownerUserId: number
    userId: number
}

interface AddCollaboratorToBoardOptionsQueryResponse {
    rows: {
        _id: number
    }[]
}

export async function addCollaboratorToBoard({ id, userId, ownerUserId }: AddCollaboratorToBoardOptions) {
    if (isNaN(id) || isNaN(userId) || isNaN(ownerUserId)) {
        throw new Error('Make sure to pass all the required parameters to the addCollaboratorToBoard function.')
    }

    try {
        const { rows: [board] }: AddCollaboratorToBoardOptionsQueryResponse = await database.query(
            `UPDATE boards
                SET collaborators = array_append(collaborators, $3)
            WHERE _id = $1 AND owner = $2 AND $3 != ALL(collaborators::INTEGER[])
            RETURNING _id;`,
            [ id, userId ]
        )

        if (board) {
            return board
        } else {
            throw new Error('We had some trouble updating the board you selected!')
        }
    } catch (error) {
        console.log(error.message)
        console.error('Adding a collaborator to boards table failed.')
        throw new Error('Adding a collaborator to boards table failed.')
    }
}
