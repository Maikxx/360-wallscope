import { database } from '../../services/database'
import { convertToPostgreSQLArray } from '../../utils/converters'
import { QueryResult } from 'pg'

interface CreateBoardOptions {
    createdByUserId: number
    name: string
    collaborators?: number[]
    result?: number
    iconName?: string
}

interface CreateBoardQueryResponse extends QueryResult {
    rows: {
        _id: number
    }[]
}

export async function createBoard({ createdByUserId, name, result, collaborators, iconName }: CreateBoardOptions) {
    let boardResultQueryData

    try {
        if (result) {
            boardResultQueryData = await database.query(
                `INSERT INTO board_results (result)
                VALUES ($1)
                RETURNING _id;`,
                [result]
            )
        }
    } catch (error) {
        throw new Error('Inserting a new result into the board_results table failed.')
    }

    try {
        const { rows: [board] }: CreateBoardQueryResponse = await database.query(
            `INSERT INTO boards (name, owner, results, collaborators, icon_name)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING _id;`,
            [
                name,
                createdByUserId,
                (boardResultQueryData && boardResultQueryData.rows && boardResultQueryData.rows[0]) || null,
                (collaborators && convertToPostgreSQLArray(collaborators)) || null,
                iconName || null,
            ]
        )

        if (board) {
            return board
        } else {
            throw new Error('Something went wrong creating a new board.')
        }
    } catch (error) {
        throw new Error('Inserting a new board into the boards table failed.')
    }
}
