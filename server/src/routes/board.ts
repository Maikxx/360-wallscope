require('dotenv').config()
import express from 'express'
import jwt from 'jsonwebtoken'
import { Token } from '../types/Token'
import { findBoards, createBoard, editBoard, removeBoard } from '../services/BoardService'

interface GetBoardByIdRequestParams {
    id: number
}

interface CreateBoardRequestBody {
    name: string
    collaborators?: number[]
    result?: number
}

export async function onGetBoards(request: express.Request, response: express.Response) {
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
            const boards = await findBoards((decodedToken as Token)._id)

            if (boards && Array.isArray(boards) && boards.length > 0) {
                return response.status(200).json({
                    boards,
                })
            } else {
                return response.status(404).json({
                    error: 'This user probably has got no boards attached to him or her.',
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

export async function onCreateBoard(request: express.Request, response: express.Response) {
    const { name, collaborators, result } = request.body as CreateBoardRequestBody
    const token = request.headers.authorization && request.headers.authorization.replace('Token ', '')

    if (token && name) {
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
            const board = await createBoard({ result, collaborators, name, createdByUserId: (decodedToken as Token)._id })

            if (board) {
                return response.status(200).json({
                    board,
                })
            } else {
                return response.status(500).json({
                    error: 'Something went wrong creating your new board.',
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
            error: 'Make sure to pass an Authorization header and body: {name} to access this request.',
        })
    }
}

interface EditBoardRequestBody {
    id: number
    name?: string
    iconName?: string
}

export async function onEditBoard(request: express.Request, response: express.Response) {
    const { name, id, iconName } = request.body as EditBoardRequestBody
    const token = request.headers.authorization && request.headers.authorization.replace('Token ', '')

    if (token && name) {
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
            const board = await editBoard({ name, iconName, id, userId: (decodedToken as Token)._id })

            if (board) {
                return response.status(200).json({
                    board,
                })
            } else {
                return response.status(500).json({
                    error: 'Something went wrong creating your new board.',
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
            error: 'Make sure to pass an Authorization header and body: {name} to access this request.',
        })
    }
}

interface RemoveBoardRequestBody {
    id: number
}

export async function onRemoveBoard (request: express.Request, response: express.Response) {
    const { id } = request.body as RemoveBoardRequestBody
    const token = request.headers.authorization && request.headers.authorization.replace('Token ', '')

    if (token && !isNaN(id)) {
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
            const success = await removeBoard({ id, userId: (decodedToken as Token)._id })

            if (success) {
                return response.status(200).json({
                    success,
                })
            } else {
                return response.status(500).json({
                    error: 'Something went wrong creating your new board.',
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
            error: 'Make sure to pass an Authorization header and body: {name} to access this request.',
        })
    }
}
