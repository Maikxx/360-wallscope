import { BoardResultLinkType } from '../../types/Board'
import { database } from '../../services/database'
import { QueryResult } from 'pg'

interface CreateLinkOptions {
    board_result_id: number
    destination_board_result_id: number
    type: BoardResultLinkType
    user_id: number
}

interface CreateLinkQueryResponse extends QueryResult {
    rows: {
        _id: number
    }[]
}

export async function createLink({ board_result_id, destination_board_result_id, type, user_id }: CreateLinkOptions) {
    try {
        const { rows: [board] } = await database.query(
            `SELECT _id FROM boards WHERE $1 = ANY(results::INTEGER[]) AND (owner = $2 OR $2 = ANY(collaborators::INTEGER[]));`,
            [ board_result_id, user_id ]
        )

        if (board) {
            const { rows: [link] }: CreateLinkQueryResponse = await database.query(
                `INSERT INTO links (
                    origin_board_result_id,
                    destination_board_result_id,
                    type
                ) VALUES (
                    $1, $2, $3
                ) RETURNING _id;`,
                [ board_result_id, destination_board_result_id, type ]
            )

            if (link) {
                const { rows: [boardResult] } = await database.query(
                    `UPDATE board_results
                    SET links = array_concat(links, $1)
                    WHERE _id = $2 AND NOT $1 = ALL(links);`,
                    [ link._id, board_result_id ]
                )

                if (boardResult) {
                    return link
                } else {
                    throw new Error('Something went wrong when updating the board result with the new link.')
                }
            } else {
                throw new Error('Something went wrong when creating a link!')
            }
        } else {
            throw new Error('You are not authorized to perform this action for this board.')
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
