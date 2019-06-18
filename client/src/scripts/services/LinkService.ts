import { toast } from 'react-toastify'
import { getAuthorizationToken } from './UserService'
import { BoardResultLinkType } from '../types/Board'

interface RemoveLinkFromBoardResultParams {
    link_id: number
    board_result_id: number
}

interface RemoveLinkFromBoardResultResponse {
    error?: string
    success?: boolean
}

export async function removeLinkFromBoardResult({ link_id, board_result_id }: RemoveLinkFromBoardResultParams) {
    try {
        const token = getAuthorizationToken()

        if (token) {
            const url = `${window.location.origin}/remove-link-from-board-result`
            const data = await fetch(
                url,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        link_id,
                        board_result_id,
                    }),
                    method: 'POST',
                }
            )

            const { error, success }: RemoveLinkFromBoardResultResponse = await data.json()

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

interface CreateLinkParams {
    board_result_id: number
    destination_board_result_id: number
    type: BoardResultLinkType
}

interface CreateLinkResponse {
    error?: string
    link?: {
        _id: number
    }
}

export async function createLink({ board_result_id, destination_board_result_id, type }: CreateLinkParams) {
    try {
        const token = getAuthorizationToken()

        if (token) {
            const url = `${window.location.origin}/create-link`
            const data = await fetch(
                url,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type,
                        destination_board_result_id,
                        board_result_id,
                    }),
                    method: 'POST',
                }
            )

            const { error, link }: CreateLinkResponse = await data.json()

            if (!error && link) {
                return link
            } else {
                throw new Error(error)
            }
        } else {
            throw new Error('You are not authorized to perform this request.')
        }
    } catch (error) {
        toast.error(error.message)
        return null
    }
}
