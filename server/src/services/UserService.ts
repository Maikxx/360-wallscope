import { database } from './database'

export async function findUserByEmail(email?: string) {
    if (!email) {
        return null
    }

    const { rows: [databaseUser] } = await database.query(`SELECT * FROM users WHERE email = $1;`, [email])
    return databaseUser
}

interface CreateUserParams {
    email?: string
    password?: string
    fullName?: string
}

export async function createUser(user: CreateUserParams) {
    const { email, password, fullName } = user

    if (!email || !password || !fullName) {
        console.error('Email or password were not passed the correct way!')
    }

    const { rows: [databaseUser] } = await database.query(`INSERT INTO users (email, password, full_name) VALUES ($1, $2, $3) RETURNING *;`, [ email, password, fullName ])
    return databaseUser
}
