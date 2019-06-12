import { database } from './database'
import { QueryResult } from 'pg'
import { DatabaseBoard, CreatedDatabaseBoard } from '../types/Board'
import { DatabaseUser } from '../types/User'

interface BoardQueryResult extends QueryResult {
    rows: DatabaseBoard[]
}

interface OwnerUserQueryResult extends QueryResult {
    rows: DatabaseUser[]
}

interface CollaboratorUsersQueryResult extends QueryResult {
    rows: DatabaseUser[]
}

export async function findBoards(userId: number, byId?: number) {
    try {
        const POSTGRES_QUERY = `SELECT * FROM boards WHERE collaborators @> ARRAY[$1]::INTEGER[] ${byId ? 'AND _id = $2' : ''};`
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
        `SELECT _id, full_name, email FROM users WHERE _id = $1`,
        [board.owner]
    )

    const { rows: collaboratorUsers }: CollaboratorUsersQueryResult = await database.query(
        `SELECT _id, full_name, email FROM users WHERE _id = ANY($1)`,
        [board.collaborators]
    )

    // TODO: Add results query

    return {
        board: {
            ...board,
            ...(ownerUser && ({ _id: ownerUser._id, email: ownerUser.email, fullName: ownerUser.full_name })),
            ...(collaboratorUsers && collaboratorUsers.length > 0 && (collaboratorUsers.map(collaboratorUser => ({ _id: collaboratorUser._id, email: collaboratorUser.email, fullName: collaboratorUser.full_name })))),
        },
    }
}

interface CreateBoardOptions {
    createdByUserId: number
    name: string
    collaborators?: number[]
    result?: number
}

export async function createBoard({ createdByUserId, name, result, collaborators }: CreateBoardOptions) {
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
            `INSERT INTO boards (name, owner, results, collaborators) VALUES ($1, $2, $3, $4) RETURNING _id;`,
            [ name, createdByUserId, (boardResultQueryData && boardResultQueryData.rows && boardResultQueryData.rows[0]) || null, (collaborators && `{${collaborators.join(', ')}}`) || null ]
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
