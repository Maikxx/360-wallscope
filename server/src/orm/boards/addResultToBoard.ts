import { database } from '../../services/database'
import { QueryResult } from 'pg'
import { UpdateBoardQueryResponse } from '../../types/Board'

interface AddResultToBoardOptions {
    board_id: number
    result_id: number
    user_id: number
}

interface CreateBoardResultQueryResponse extends QueryResult {
    rows: {
        _id: number
    }[]
}

export async function addResultToBoard({ board_id, result_id, user_id }: AddResultToBoardOptions) {
    try {
        const { rows: [boardResult] }: CreateBoardResultQueryResponse = await database.query(
            `INSERT INTO board_results (
                result
            ) VALUES (
                $1
            ) RETURNING _id;`,
            [result_id]
        )

        if (boardResult) {
            const { rows: [board] }: UpdateBoardQueryResponse = await database.query(
                `UPDATE boards
                SET results = array_cat(results, $2)
                WHERE _id = $1 AND $2 != ALL(results::INTEGER[]) AND (owner = $3 OR $3 = ANY(collaborators::INTEGER[]))
                RETURNING _id;`,
                [ board_id, boardResult._id, user_id ]
            )

            if (board) {
                return board
            } else {
                throw new Error('Updating the existing board with your newly created board result failed.')
            }
        } else {
            throw new Error('Creating a new board result failed.')
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
