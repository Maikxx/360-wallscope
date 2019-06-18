import { database } from '../../services/database'

interface RemoveLinkFromBoardResultOptions {
    board_result_id: number
    link_id: number
    user_id: number
}

export async function removeLinkFromBoardResult({ board_result_id, link_id, user_id }: RemoveLinkFromBoardResultOptions) {
    try {
        const { rows: [board] } = await database.query(
            `SELECT _id FROM boards WHERE $1 = ANY(results::INTEGER[]) AND (owner = $2 OR $2 = ANY(collaborators::INTEGER[]));`,
            [ board_result_id, user_id ]
        )

        if (board) {
            const [ { rows: [boardResult] }, { rows: [link] } ] = await Promise.all([
                database.query(
                    `UPDATE board_results
                    SET links = array_remove(links, $1)
                    WHERE _id = $2 AND $1 = ANY(links::INTEGER[])
                    RETURNING _id;`,
                    [ link_id, board_result_id ]
                ),
                database.query(
                    `DELETE FROM links WHERE _id = $1;`,
                    [link_id]
                ),
            ])

            if (boardResult && link) {
                return true
            } else {
                throw new Error('Something went wrong when deleting the link from the database.')
            }
        } else {
            throw new Error('You are not authorized to perform this action for this board.')
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
