import express from 'express'
import { database } from '../services/database'
import jwt from 'jsonwebtoken'

interface GetUserByIdRequestParams {
    id: string
}

interface GetUserByIdResponse {
    rows: {
        _id: number
        full_name: string
        email: string
    }[]
}

export async function onGetUserById(request: express.Request, response: express.Response) {
    const { id } = request.params as GetUserByIdRequestParams
    const token = request.headers.authorization && request.headers.authorization.replace('Token ', '')

    if (token) {
        let decodedToken

        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)
        } catch (error) {
            console.error(`You don't seem to be logged in, send a valid token to access this request!`)

            return response.status(409).json({
                error: `You don't seem to be logged in, send a valid token to access this request!`,
            })
        }

        if (!decodedToken) {
            return response.status(409).json({
                error: `You don't seem to be logged in, send a valid token to access this request!`,
            })
        }

        try {
            if (!isNaN(Number(id))) {
                try {
                    const { rows: [user] }: GetUserByIdResponse = await database.query(`SELECT _id, full_name, email FROM users WHERE _id = $1;`, [id])

                    if (user) {
                        return response.status(200).json({
                            user: {
                                _id: user._id,
                                fullName: user.full_name,
                                email: user.email,
                            },
                        })
                    } else {
                        console.error(`Getting the user with id "${id}" failed!`)

                        return response.status(500).json({
                            error: `Getting the user with id "${id}" failed!`,
                        })
                    }
                } catch (error) {
                    console.error(`Getting the user with id "${id}" failed!`)

                    return response.status(500).json({
                        error: `Getting the user with id "${id}" failed!`,
                    })
                }
            } else {
                return response.status(409).json({
                    error: 'Invalid identifier is being passed with this request.',
                })
            }
        } catch (error) {
            console.error(error.message)

            return response.status(500).json({
                error: error.message,
            })
        }
    } else {
        return response.status(409).json({
            error: 'Make sure to pass an Authorization header to access this request.',
        })
    }
}
