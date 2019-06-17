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

            CREATE TABLE IF NOT EXISTS boards
            (
                _id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                collaborators INTEGER[],
                owner INTEGER REFERENCES users (_id),
                results INTEGER[],
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            ALTER TABLE boards ADD COLUMN IF NOT EXISTS icon_name TEXT;

            DO $$ BEGIN
                CREATE TYPE link_type AS ENUM ('no_link', 'definate', 'possible');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;

            CREATE TABLE IF NOT EXISTS board_results
            (
                _id SERIAL PRIMARY KEY,
                result INTEGER REFERENCES results._id NOT NULL,
                links INTEGER[]
            );

            ALTER TABLE board_results DROP COLUMN IF EXISTS result_id;
            DROP TABLE IF EXISTS results;

            CREATE TABLE IF NOT EXISTS results
            (
                _id SERIAL PRIMARY KEY,
                title TEXT,
                data_url TEXT,
                summary TEXT,
                content TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            ALTER TABLE board_results ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

            CREATE TABLE IF NOT EXISTS links
            (
                _id SERIAL PRIMARY KEY,
                type link_type NOT NULL,
                destination_board_result_id INTEGER REFERENCES board_results (_id),
                origin_board_result_id INTEGER REFERENCES board_results (_id)
            );

            ALTER TABLE links ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
            `
        )
    } catch (error) {
        console.error('Creating tables failed')
        console.error(error.message)
        throw new Error(error.message)
    }
}
