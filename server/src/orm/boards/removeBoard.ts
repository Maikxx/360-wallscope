import { DatabaseBoard, DatabaseBoardResult } from '../../types/Board'
import { database } from '../../services/database'
import { convertToPostgreSQLArray } from '../../utils/converters'
import { QueryResult } from 'pg'

interface RemoveBoardOptions {
    id: number
    userId: number
}

interface RemoveBoardQueryResponse extends QueryResult {
    rows: DatabaseBoard[]
}

interface RemoveBoardBoardResultsQueryResponse extends QueryResult {
    rows: DatabaseBoardResult[]
}

export async function removeBoard({ id, userId }: RemoveBoardOptions) {
    try {
        const { rows: [board] }: RemoveBoardQueryResponse = await database.query(
            `SELECT * FROM boards
            WHERE _id = $1 AND owner = $2;`,
            [ id, userId ]
        )

        if (board) {
            if (board.results && board.results.length > 0) {
                const { rows: boardResults }: RemoveBoardBoardResultsQueryResponse = await database.query(
                    `SELECT _id, links FROM board_results
                    WHERE _id = ANY($1::INTEGER[]);`,
                    [convertToPostgreSQLArray(board.results)]
                )

                if (boardResults && boardResults.length > 0) {
                    await Promise.all(boardResults.map(async boardResult => {
                        if (boardResult.links && boardResult.links.length > 0) {
                            await database.query(
                                `DELETE FROM links
                                WHERE _id = ANY($1::INTEGER[]);`,
                                [convertToPostgreSQLArray(boardResult.links)]
                            )
                        }

                        return boardResult
                    }))
                }

                await database.query(
                    `DELETE FROM board_results
                    WHERE _id = ANY($1::INTEGER[]);`,
                    [convertToPostgreSQLArray(board.results)]
                )
            }

            await database.query(
                `DELETE FROM boards
                WHERE _id = $1 AND owner = $2;`,
                [ id, userId ]
            )

            return true
        } else {
            throw new Error(`We could not find the board that you tried to remove or you are not the owner of this board.`)
        }
    } catch (error) {
        throw new Error('Deleting a boards table failed.')
    }
}
