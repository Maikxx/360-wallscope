import { database } from '../../services/database'
import { QueryResult } from 'pg'
import { DatabaseUser } from '../../types/User'

interface CreateUserParams {
    email: string
    password: string
    fullName: string
}

interface CreateUserQueryResponse extends QueryResult {
    rows: DatabaseUser[]
}

export async function createUser({ email, password, fullName }: CreateUserParams) {
    const { rows: [databaseUser] }: CreateUserQueryResponse = await database.query(
        `INSERT INTO users (email, password, full_name)
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [ email, password, fullName ]
    )

    return databaseUser
}
