import { database } from '../../services/database'
import { QueryResult } from 'pg'

interface RemoveCollaboratorFromBoardOptions {
    id: number
    ownerUserId: number
    userId: number
}

interface RemoveCollaboratorFromBoardOptionsQueryResponse extends QueryResult {
    rows: {
        _id: number
    }[]
}

export async function removeCollaboratorFromBoard({ id, userId, ownerUserId }: RemoveCollaboratorFromBoardOptions) {
    try {
        const { rows: [board] }: RemoveCollaboratorFromBoardOptionsQueryResponse = await database.query(
            `UPDATE boards
            SET collaborators = array_remove(collaborators, $3)
            WHERE _id = $1 AND owner = $2 AND $3 = ANY(collaborators::INTEGER[])
            RETURNING _id;`,
            [ id, ownerUserId, userId ]
        )

        if (board) {
            return board
        } else {
            throw new Error('We had some trouble updating the board you selected!')
        }
    } catch (error) {
        throw new Error('Removing a collaborator from boards table failed.')
    }
}
