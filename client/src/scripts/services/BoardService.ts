import { getAuthorizationToken } from './UserService'
import { Board } from '../types/Board'

export interface GetBoardByIdResponse {
    error?: string
    board?: Board
}

export async function getBoardById(id: number) {
    try {
        const token = getAuthorizationToken()

        if (token) {
            const url = `${window.location.origin}/board/${id}`
            const data = await fetch(
                url,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }
            )

            const { error, board }: GetBoardByIdResponse = await data.json()

            if (!error && board) {
                return board
            } else {
                console.error(error)
                return null
            }
        } else {
            // TODO: Error handling
            console.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        // TODO: Error handling
        console.error(error.message)
        return null
    }
}

export interface GetBoardsForCurrentUserResponse {
    error?: string
    boards?: Board[]
}

export async function getBoardsForCurrentUser() {
    try {
        const token = getAuthorizationToken()

        if (token) {
            const url = `${window.location.origin}/boards`
            const data = await fetch(
                url,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                }
            )

            const { boards, error }: GetBoardsForCurrentUserResponse = await data.json()

            if (!error && boards) {
                return boards
            } else {
                console.error(error)
                return null
            }
        } else {
            // TODO: Error handling
            console.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        // TODO: Error handling
        console.error(error.message)
        return null
    }
}

interface EditBoardParams {
    id: number
    name?: string
    iconName?: string
}

interface EditBoardResponse {
    board?: {
        _id: number
    }
    error?: string
}

export async function editBoard({ name, iconName, id }: EditBoardParams) {
    try {
        const token = getAuthorizationToken()
        const url = `${window.location.origin}/edit-board`

        if (token) {
            const data = await fetch(
                url,
                {
                    headers: { Authorization: `Token ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({ name, id, iconName }),
                }
            )

            const { board, error }: EditBoardResponse = await data.json()

            if (!error && board) {
                return board
            } else {
                console.error(error)
                return null
            }
        } else {
            // TODO: Error handling
            console.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        // TODO: Error handling
        console.error(error.message)
        return null
    }
}

interface CreateBoardParams {
    name: string
    collaborators?: number[]
    result?: number
}

interface CreateBoardResponse {
    board?: {
        _id: number
    }
    error?: string
}

export async function createBoard({ name, collaborators, result }: CreateBoardParams) {
    try {
        const token = getAuthorizationToken()
        const url = `${window.location.origin}/create-board`

        if (token) {
            const data = await fetch(
                url,
                {
                    headers: { Authorization: `Token ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({ name, collaborators, result }),
                }
            )

            const { board, error }: CreateBoardResponse = await data.json()

            if (!error && board) {
                return board
            } else {
                console.error(error)
                return null
            }
        } else {
            // TODO: Error handling
            console.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        // TODO: Error handling
        console.error(error.message)
        return null
    }
}

interface RemoveBoardParams {
    id: number
}

interface RemoveBoardResponse {
    success?: boolean
    error?: string
}

export async function removeBoard({ id }: RemoveBoardParams) {
    try {
        const token = getAuthorizationToken()
        const url = `${window.location.origin}/remove-board`

        if (token) {
            const data = await fetch(
                url,
                {
                    headers: { Authorization: `Token ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({ id }),
                }
            )

            const { success, error }: RemoveBoardResponse = await data.json()

            if (!error && success) {
                return success
            } else {
                console.error(error)
                return null
            }
        } else {
            // TODO: Error handling
            console.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        // TODO: Error handling
        console.error(error.message)
        return null
    }
}
