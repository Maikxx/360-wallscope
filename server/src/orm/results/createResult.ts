import { database } from '../../services/database'
import { QueryResult } from 'pg'

interface CreateResultOptions {
    title?: string
    summary?: string
    content?: string
    data_url?: string
}

interface CreateResultQueryResponse extends QueryResult {
    rows: {
        _id: number
    }[]
}

export async function createResult({ title, summary, content, data_url }: CreateResultOptions) {
    try {
        const { rows: [result] }: CreateResultQueryResponse = await database.query(
            `INSERT INTO results (title, summary, content, data_url) VALUES ($1, $2, $3, $3) RETURNING _id;`,
            [ title || null, summary || null, content || null, data_url || null ]
        )

        if (result) {
            return result
        } else {
            throw new Error('Creating a new result failed!')
        }
    } catch (error) {
        throw new Error('Creating a new result failed!')
    }
}
