import { database } from '../../services/database'
import { QueryResult } from 'pg'
import { DatabaseUser, DatabaseUserKeys } from '../../types/User'

interface GetUserByEmailQueryResponse extends QueryResult {
    rows: DatabaseUser[]
}

export async function getUserByEmail(email: string, fields?: DatabaseUserKeys[]) {
    const query = `SELECT ${fields && fields.length > 0 ? fields.join(', ') : '*'} FROM users WHERE email = $1;`

    const { rows: [databaseUser] }: GetUserByEmailQueryResponse = await database.query(
        query,
        [email]
    )

    return databaseUser
}
