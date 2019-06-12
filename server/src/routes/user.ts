import express from 'express'
import { database } from '../services/database'

interface GetUserByIdRequestParamss {
    id: string
}

export async function onGetUserById(request: express.Request, response: express.Response) {
    const { id } = request.params as GetUserByIdRequestParamss

    if (!isNaN(Number(id))) {
        try {
            const { rows: [user] } = await database.query(`SELECT * FROM users WHERE _id = $1;`, [id])

            if (user) {
                response.status(200).json({
                    user,
                })
            }
        } catch (error) {
            console.error(`Getting the user with id "${id}" failed!`)

            response.status(500).json({
                error: `Getting the user with id "${id}" failed!`,
            })
        }
    } else {
        response.status(409).json({
            error: 'Invalid identifier is being passed with this request.',
        })
    }
}
