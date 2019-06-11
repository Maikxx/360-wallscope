require('dotenv').config()
import express from 'express'
import jwt from 'jsonwebtoken'
import { Token } from '../types/Token'
import { findBoards } from '../services/BoardService'

interface GetBoardByIdRequestParams {
    id: number
}

export async function onGetBoardById(request: express.Request, response: express.Response) {
    const { id } = request.params as GetBoardByIdRequestParams
    const token = request.headers.authorization && request.headers.authorization.replace('Token ', '')

    if (!isNaN(Number(id)) && token) {
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
            const board = await findBoards((decodedToken as Token)._id, id)

            if (board) {
                return response.status(200).json({
                    board,
                })
            } else {
                return response.status(404).json({
                    error: 'The requested board could not be found!',
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
            error: 'Invalid identifier is being passed with this request.',
        })
    }
}
