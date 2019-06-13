import { database } from '../../services/database'
import { QueryResult } from 'pg'
import { DatabaseUser } from '../../types/User'

interface GetUserByEmailQueryResponse extends QueryResult {
    rows: DatabaseUser[]
}

export async function getUserByEmail(email: string) {
    const { rows: [databaseUser] }: GetUserByEmailQueryResponse = await database.query(
        `SELECT * FROM users WHERE email = $1;`,
        [email]
    )

    return databaseUser
}
