import { database } from '../../services/database'
import { QueryResult } from 'pg'

interface CreateUserParams {
    email: string
    password: string
    fullName: string
}

interface CreateUserQueryResponse extends QueryResult {
    rows: {
        _id: number
        full_name: string
        email: string
    }[]
}

export async function createUser({ email, password, fullName }: CreateUserParams) {
    try {
        const { rows: [databaseUser] }: CreateUserQueryResponse = await database.query(
            `INSERT INTO users (email, password, full_name)
            VALUES ($1, $2, $3)
            RETURNING _id, full_name, email;`,
            [ email, password, fullName ]
        )

        if (databaseUser) {
            const [ { rows: [favoriteBoard] }, { rows: [researchBoard] } ] = await Promise.all([
                database.query(
                    `INSERT INTO boards (name, icon_name, owner, is_default_board)
                    VALUES ($1, $2, $3, $4)
                    WHERE NOT EXISTS (
                        SELECT _id FROM boards WHERE owner = $1 AND name = $2
                    ) RETURNING _id;`,
                    [ 'Favorites', 'star', databaseUser._id, true ]
                ),
                database.query(
                    `INSERT INTO boards (name, icon_name, owner, is_default_board)
                    VALUES ($1, $2, $3, $4)
                    WHERE NOT EXISTS (
                        SELECT _id FROM boards WHERE owner = $1 AND name = $2
                    ) RETURNING _id;`,
                    [ 'Research', 'loop', databaseUser._id, true ]
                ),
            ])

            if (favoriteBoard && researchBoard) {
                return databaseUser
            } else {
                throw new Error('Something went wrong when creating new default boards for your new user.')
            }
        } else {
            throw new Error('Something went wrong creating a new user.')
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
