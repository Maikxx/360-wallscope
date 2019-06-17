import express from 'express'
import { removeLinkFromBoardResult } from '../orm/links/removeLinkFromBoardResult'
import { getAuthTokenFromRequest } from '../services/auth'

interface RemoveLinkFromBoardResultRequestBody {
    board_result_id: number
    link_id: number
}

export async function onRemoveLinkFromBoardResult(request: express.Request, response: express.Response) {
    const { link_id, board_result_id } = request.body as RemoveLinkFromBoardResultRequestBody

    if (!isNaN(Number(link_id)) && !isNaN(Number(board_result_id))) {
        try {
            const token = getAuthTokenFromRequest(request)
            const success = await removeLinkFromBoardResult({ link_id, board_result_id, user_id: token._id })

            if (success) {
                response.status(200).json({
                    success,
                })
            } else {
                throw new Error('Something went wrong updating your board, while removing a link.')
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
