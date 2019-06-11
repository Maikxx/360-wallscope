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

            CREATE TABLE IF NOT EXISTS boards
            (
                _id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                collaborators INTEGER[],
                owner INTEGER REFERENCES users (_id),
                results INTEGER[],
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS results
            (
                _id SERIAL PRIMARY KEY
            );

            CREATE TYPE link_type AS ENUM ('no_link', 'definate', 'possible');

            CREATE TABLE IF NOT EXISTS board_results
            (
                _id SERIAL PRIMARY KEY,
                result_id INTEGER REFERENCES results (_id),
                links INTEGER[]
            );

            CREATE TABLE IF NOT EXISTS links
            (
                _id SERIAL PRIMARY KEY,
                type link_type NOT NULL,
                destination_board_result_id INTEGER REFERENCES board_results (_id),
                origin_board_result_id INTEGER REFERENCES board_results (_id)
            );

            ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name TEXT;
            `
        )
    } catch (error) {
        console.error('Creating tables failed')
        console.error(error.message)
        throw new Error(error.message)
    }
}
