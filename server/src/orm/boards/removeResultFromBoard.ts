import { database } from '../../services/database'

interface RemoveResultFromBoardOptions {
    board_id: number
    board_result_id: number
    user_id: number
}

export async function removeResultFromBoard({ board_id, user_id, board_result_id }: RemoveResultFromBoardOptions) {
    try {
        const [ { rows: [board] }, { rows: [boardResult] } ] = await Promise.all([
            database.query(
                `UPDATE boards
                SET results = array_remove(results, $3)
                WHERE _id = $1 AND owner = $2 AND $3 = ANY(results::INTEGER[])
                RETURNING _id;`,
                [ board_id, user_id, board_result_id ]
            ),
            database.query(
                `SELECT _id, links FROM board_results WHERE _id = $1 AND array_length(links, 1) > 0;`,
                [board_result_id]
            ),
        ])

        if (board) {
            if (boardResult) {
                await database.query(
                    `DELETE FROM links WHERE _id = ANY($1::INTEGER[]);`,
                    [boardResult.links]
                )
            }

            const { rows: [deleteBoardResult] } = await database.query(
                `DELETE FROM board_results WHERE _id = $1;`,
                [board_result_id]
            )

            if (deleteBoardResult) {
                return true
            } else {
                throw new Error('Something went wrong with removing the board result from the database.')
            }
        } else {
            throw new Error('We had some trouble updating the board you selected!')
        }
    } catch (error) {
        throw new Error('Removing a result from the boards table failed.')
    }
}
