import { database } from '../../services/database'
import { QueryResult } from 'pg'

export interface EditBoardOptions {
    id: number
    name?: string
    iconName?: string
    user_id: number
}

interface EditBoardQueryResponse extends QueryResult {
    rows: {
        _id: number
    }[]
}

export async function editBoard({ id, name, iconName, user_id }: EditBoardOptions) {
    const boardsQuerySets: string[] = []
    const boardsQueryData: any[] = [ id, user_id ]

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
        throw new Error('Updating a boards table failed.')
    }
}
