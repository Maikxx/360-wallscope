import { database } from '../../services/database'
import { QueryResult } from 'pg'

interface AddCollaboratorToBoardOptions {
    id: number
    ownerUserId: number
    userId: number
}

interface AddCollaboratorToBoardOptionsQueryResponse extends QueryResult {
    rows: {
        _id: number
    }[]
}

export async function addCollaboratorToBoard({ id, userId, ownerUserId }: AddCollaboratorToBoardOptions) {
    try {
        const { rows: [board] }: AddCollaboratorToBoardOptionsQueryResponse = await database.query(
            `UPDATE boards
            SET collaborators = array_append(collaborators, $3)
            WHERE _id = $1 AND owner = $2 AND $3 != ALL(collaborators::INTEGER[])
            RETURNING _id;`,
            [ id, ownerUserId, userId ]
        )

        if (board) {
            return board
        } else {
            throw new Error('We had some trouble updating the board you selected!')
        }
    } catch (error) {
        throw new Error('Adding a collaborator to boards table failed.')
    }
}
