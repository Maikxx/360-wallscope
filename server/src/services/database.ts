require('dotenv').config()
import { Client } from 'pg'

const DATABASE_CONNECTION_OPTIONS = process.env.NODE_ENV === 'production'
    ? {
        ssl: true,
        connectionString: process.env.DATABASE_URL,
    }
    : {
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        port: Number(process.env.PG_PORT),
        password: process.env.PG_PASSWORD,
    }

export const database = new Client(DATABASE_CONNECTION_OPTIONS)

export async function setupDatabase() {
    try {
        await database.connect()
    } catch (error) {
        console.error('Connecting to database failed')
        console.error(error.message)
        throw new Error(error.message)
    }

    try {
        await database.query(
            `
            CREATE TABLE IF NOT EXISTS users
            (
                _id SERIAL PRIMARY KEY,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name TEXT;

            ${alterOwnerIfNotProduction('users')}
            `
        )
    } catch (error) {
        console.error('Creating tables failed')
        console.error(error.message)
        throw new Error(error.message)
    }
}

function alterOwnerIfNotProduction(table: string) {
    const environmentIsProduction = process.env.NODE_ENV === 'production'

    return environmentIsProduction
        ? ''
        : `ALTER TABLE ${table} OWNER TO admin;`
}
