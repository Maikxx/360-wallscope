import { QueryResult } from 'pg'
import { DatabaseBoard, DatabaseBoardResult } from '../../types/Board'
import { DatabaseUser } from '../../types/User'
import { database } from '../../services/database'

import { convertToPostgreSQLArray } from '../../utils/converters'

interface BoardQueryResult extends QueryResult {
    rows: DatabaseBoard[]
}

interface OwnerUserQueryResult extends QueryResult {
    rows: DatabaseUser[]
}

export async function getBoards(userId: number, byId?: number) {
    try {
        const { rows: boards }: BoardQueryResult = await database.query(
            `SELECT * FROM boards
            WHERE (collaborators @> ARRAY[$1]::INTEGER[] OR owner = $1) ${byId ? 'AND _id = $2' : ''};`,
            byId ? [ userId, byId ] : [userId]
        )

        if (typeof byId !== undefined && !isNaN(Number(byId))) {
            const [board] = boards

            if (board) {
                return getPopulatedBoardFromDatabase(board)
            } else {
                throw new Error('Your either passed a wrong board identifier, or you are not a participant of this board.')
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
            [convertToPostgreSQLArray(board.collaborators)]
        )

        collaboratorUsers = rows
    }

    let boardResults: DatabaseBoardResult[] = []
    if (board.results && board.results.length > 0) {
        const { rows } = await database.query(
            `SELECT
                board_results._id,
                board_results.result,
                board_results.links,
                results._id,
                results.title,
                results.data_url,
                results.summary,
                results.content,
                links._id,
                links.type,
                links.destination_board_result_id,
                links.origin_board_result_id,
            FROM board_results
            LEFT JOIN results
            ON results._id = board_results.result
            LEFT JOIN links
            ON links._id = ANY(board_results.links::INTEGER[])
            WHERE board_results._id = ANY($1);`,
            [convertToPostgreSQLArray(board.results)]
        )

        boardResults = rows
    }

    // if (boardResults && boardResults.length > 0) {
    //     boardResults = await Promise.all(boardResults.map(async boardResult => {
    //         if (boardResult.links && boardResult.links.length > 0) {
    //             const { rows: boardResultLinks } = await database.query(
    //                 `SELECT * FROM links WHERE _id = ANY($1);`,
    //                 [convertToPostgreSQLArray(boardResult.links)]
    //             )

    //             return {
    //                 ...boardResult,
    //                 links: boardResultLinks || [],
    //             }
    //         } else {
    //             return boardResult
    //         }
    //     }))
    // }

    return {
        ...board,
        ...(ownerUser ? ({ owner: { _id: ownerUser._id, email: ownerUser.email, fullName: ownerUser.full_name } }) : { owner: null }),
        ...((collaboratorUsers && collaboratorUsers.length > 0) ? ({ collaborators: collaboratorUsers.map(collaboratorUser => ({ _id: collaboratorUser._id, email: collaboratorUser.email, fullName: collaboratorUser.full_name })) }) : { collaborators: [] }),
        ...((boardResults && boardResults.length > 0) ? ({ results: boardResults }) : { results: [] }),
    }
}
