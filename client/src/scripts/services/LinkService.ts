import { toast } from 'react-toastify'
import { getAuthorizationToken } from './UserService'

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
