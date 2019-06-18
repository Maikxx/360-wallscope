import express from 'express'
import { database } from '../services/database'
import { DatabaseUser } from '../types/User'
import { QueryResult } from 'pg'
import { getAuthTokenFromRequest } from '../services/auth'
import { convertDatabaseUserToClientUser } from '../utils/converters'

interface GetUserByIdRequestParams {
    id: string
}

interface GetUserByIdQueryResponse extends QueryResult {
    rows: DatabaseUser[]
}

export async function onGetUserById(request: express.Request, response: express.Response) {
    const { id } = request.params as GetUserByIdRequestParams

    if (!isNaN(Number(id))) {
        try {
            getAuthTokenFromRequest(request)
            const { rows: [user] }: GetUserByIdQueryResponse = await database.query(
                `SELECT _id, full_name, email FROM users WHERE _id = $1;`,
                [id]
            )

            if (user) {
                response.status(200).json({
                    user: convertDatabaseUserToClientUser(user),
                })
            } else {
                throw new Error(`Getting the user with id "${id}" failed!`)
            }
        } catch (error) {
            response.status(500).json({
                error: error.message,
            })
        }
    } else {
        response.status(409).json({
            error: 'Make sure to pass the correct data to this request.',
        })
    }
}

interface EditUserRequestParams {
    id: number
}

interface EditUserQueryResponse extends QueryResult {
    rows: DatabaseUser[]
}

interface EditUserRequestBody {
    fullName: string
    email: string
}

export async function onEditUser(request: express.Request, response: express.Response) {
    const { id } = request.params as EditUserRequestParams
    const { fullName, email } = request.body as EditUserRequestBody

    if (!isNaN(Number(id)) && fullName && email) {
        try {
            getAuthTokenFromRequest(request)
            const { rows: [user] }: EditUserQueryResponse = await database.query(
                `UPDATE USERS
                SET
                    full_name = $2,
                    email = $3
                WHERE _id = $1
                RETURNING *;`,
                [ id, fullName, email ]
            )

            if (user) {
                response.status(200).json({
                    user: convertDatabaseUserToClientUser(user),
                })
            } else {
                throw new Error(`Getting the user with id "${id}" failed!`)
            }
        } catch (error) {
            response.status(500).json({
                error: error.message,
            })
        }
    } else {
        response.status(409).json({
            error: 'Make sure to pass the correct data to this request.',
        })
    }
}
