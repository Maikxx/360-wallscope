import { getAuthorizationToken } from './UserService'
import { Board } from '../types/Board'
import { toast } from 'react-toastify'

export interface GetBoardByIdResponse {
    error?: string
    board?: Board
}

export async function getBoardById(id: number) {
    try {
        const token = getAuthorizationToken()

        if (token) {
            const url = `${window.location.origin}/get-board/${id}`
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
                toast.error(error)
                return null
            }
        } else {
            toast.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        toast.error(error.message)
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
            const url = `${window.location.origin}/get-boards`
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
                toast.error(error)
                return null
            }
        } else {
            toast.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        toast.error(error.message)
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
                toast.error(error)
                return null
            }
        } else {
            toast.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        toast.error(error.message)
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
                toast.error(error)
                return null
            }
        } else {
            toast.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        toast.error(error.message)
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
                toast.error(error)
                return null
            }
        } else {
            toast.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        toast.error(error.message)
        return null
    }
}

interface AddCollaboratorToBoardParams {
    id: number
    collaboratorId: number
}

interface AddCollaboratorToBoardResponse {
    error?: string
    board?: {
        _id: number
    }
}

export async function addCollaboratorToBoard({ id, collaboratorId }: AddCollaboratorToBoardParams) {
    try {
        const token = getAuthorizationToken()
        const url = `${window.location.origin}/add-collaborator-to-board`

        if (token) {
            const data = await fetch(
                url,
                {
                    headers: { Authorization: `Token ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({ collaboratorId, id }),
                }
            )

            const { board, error }: AddCollaboratorToBoardResponse = await data.json()

            if (!error && board) {
                return board
            } else {
                toast.error(error)
                return null
            }
        } else {
            toast.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        toast.error(error.message)
        return null
    }
}

interface RemoveCollaboratorFromBoardParams {
    id: number
    collaboratorId: number
}

interface RemoveCollaboratorFromBoardResponse {
    success?: boolean
    error?: string
}

export async function removeCollaboratorFromBoard({ id, collaboratorId }: RemoveCollaboratorFromBoardParams) {
    try {
        const token = getAuthorizationToken()
        const url = `${window.location.origin}/remove-collaborator-from-board`

        if (token) {
            const data = await fetch(
                url,
                {
                    headers: { Authorization: `Token ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({ collaboratorId, id }),
                }
            )

            const { success, error }: RemoveCollaboratorFromBoardResponse = await data.json()

            if (!error && success) {
                return success
            } else {
                toast.error(error)
                return null
            }
        } else {
            toast.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        toast.error(error.message)
        return null
    }
}

interface AddResultToBoardParams {
    board_id: number
    result_id: number
}

interface AddResultToBoardResponse {
    error?: string
    board?: {
        _id: number
    }
}

export async function addResultToBoard({ board_id, result_id }: AddResultToBoardParams) {
    try {
        const token = getAuthorizationToken()
        const url = `${window.location.origin}/add-result-to-board`

        if (token) {
            const data = await fetch(
                url,
                {
                    headers: { Authorization: `Token ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({ board_id, result_id }),
                }
            )

            const { board, error }: AddResultToBoardResponse = await data.json()

            if (!error && board) {
                return board
            } else {
                toast.error(error)
                return null
            }
        } else {
            toast.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        toast.error(error.message)
        return null
    }
}

interface RemoveResultFromBoardParams {
    board_id: number
    board_result_id: number
}

interface RemoveResultFromBoardResponse {
    success?: boolean
    error?: string
}

export async function removeResultFromBoard({ board_id, board_result_id }: RemoveResultFromBoardParams) {
    try {
        const token = getAuthorizationToken()
        const url = `${window.location.origin}/remove-result-from-board`

        if (token) {
            const data = await fetch(
                url,
                {
                    headers: { Authorization: `Token ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({ board_id, board_result_id }),
                }
            )

            const { success, error }: RemoveResultFromBoardResponse = await data.json()

            if (!error && success) {
                return success
            } else {
                toast.error(error)
                return null
            }
        } else {
            toast.error('You are not authorized to perform this request!')
            return null
        }
    } catch (error) {
        toast.error(error.message)
        return null
    }
}
