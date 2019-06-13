import express from 'express'
import { getBoards } from '../orm/boards/findBoards'
import { createBoard } from '../orm/boards/createBoard'
import { editBoard } from '../orm/boards/editBoard'
import { removeBoard } from '../orm/boards/removeBoard'
import { removeCollaboratorFromBoard } from '../orm/boards/removeCollaboratorFromBoard'
import { addCollaboratorToBoard } from '../orm/boards/addCollaboratorToBoard'
import { getAuthTokenFromRequest } from '../services/auth'

export async function onGetBoards(request: express.Request, response: express.Response) {
    try {
        const token = getAuthTokenFromRequest(request)
        const boards = await getBoards(token._id)

        if (boards && Array.isArray(boards) && boards.length > 0) {
            response.status(200).json({
                boards,
            })
        } else {
            throw new Error('This user probably has got no boards attached to him or her.')
        }
    } catch (error) {
        response.status(500).json({
            error: error.message,
        })
    }
}

interface GetBoardByIdRequestParams {
    id: number
}

export async function onGetBoardById(request: express.Request, response: express.Response) {
    const { id } = request.params as GetBoardByIdRequestParams

    if (!isNaN(Number(id))) {
        const token = getAuthTokenFromRequest(request)

        try {
            const board = await getBoards(token._id, id)

            if (board) {
                response.status(200).json({
                    board,
                })
            } else {
                throw new Error('The requested board could not be found!')
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

interface CreateBoardRequestBody {
    name: string
    collaborators?: number[]
    result?: number
}

export async function onCreateBoard(request: express.Request, response: express.Response) {
    const { name, collaborators, result } = request.body as CreateBoardRequestBody

    if (name && typeof name === 'string') {
        try {
            const token = getAuthTokenFromRequest(request)
            const board = await createBoard({ result, collaborators, name, createdByUserId: token._id })

            if (board) {
                response.status(200).json({
                    board,
                })
            } else {
                throw new Error('Something went wrong creating your new board.')
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

interface EditBoardRequestBody {
    id: number
    name?: string
    iconName?: string
}

export async function onEditBoard(request: express.Request, response: express.Response) {
    const { name, id, iconName } = request.body as EditBoardRequestBody

    if (!isNaN(Number(id))) {
        try {
            const token = getAuthTokenFromRequest(request)
            const board = await editBoard({ name, iconName, id, userId: token._id })

            if (board) {
                response.status(200).json({
                    board,
                })
            } else {
                throw new Error('Something went wrong editing your board.')
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

interface RemoveBoardRequestBody {
    id: number
}

export async function onRemoveBoard (request: express.Request, response: express.Response) {
    const { id } = request.body as RemoveBoardRequestBody

    if (!isNaN(Number(id))) {
        try {
            const token = getAuthTokenFromRequest(request)
            const success = await removeBoard({ id, userId: token._id })

            if (success) {
                response.status(200).json({
                    success,
                })
            } else {
                throw new Error('Something went wrong removing this board.')
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

interface AddCollaboratorToBoardRequestBody {
    id: number
    userId: number
}

export async function onAddCollaboratorToBoard(request: express.Request, response: express.Response) {
    const { id, userId } = request.body as AddCollaboratorToBoardRequestBody

    if (!isNaN(Number(id)) && !isNaN(Number(userId))) {
        try {
            const token = getAuthTokenFromRequest(request)
            const board = await addCollaboratorToBoard({ id, userId, ownerUserId: token._id })

            if (board) {
                response.status(200).json({
                    board,
                })
            } else {
                throw new Error('Something went wrong updating your board with a new collaborator.')
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

interface RemoveCollaboratorFromBoardRequestBody {
    id: number
    userId: number
}

export async function onRemoveCollaboratorFromBoard(request: express.Request, response: express.Response) {
    const { id, userId } = request.body as RemoveCollaboratorFromBoardRequestBody

    if (!isNaN(Number(id)) && !isNaN(Number(userId))) {
        try {
            const token = getAuthTokenFromRequest(request)
            const board = await removeCollaboratorFromBoard({ id, userId, ownerUserId: token._id })

            if (board) {
                response.status(200).json({
                    board,
                })
            } else {
                throw new Error('Something went wrong updating your board, while removing a collaborator.')
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
