import express from 'express'
import { removeLinkFromBoardResult } from '../orm/links/removeLinkFromBoardResult'
import { getAuthTokenFromRequest } from '../services/auth'
import { BoardResultLinkType } from '../types/Board'
import { createLink } from '../orm/links/createLink'

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

interface CreateLinkRequestBody {
    board_result_id: number
    destination_board_result_id: number
    type: BoardResultLinkType
}

export async function onCreateLink(request: express.Request, response: express.Response) {
    const { board_result_id, destination_board_result_id, type } = request.body as CreateLinkRequestBody

    if (
        !isNaN(Number(destination_board_result_id))
        && !isNaN(Number(board_result_id))
        && typeof type === 'string'
        && (type === 'definate' || type === 'no-link' || type === 'possible')
    ) {
        try {
            const token = getAuthTokenFromRequest(request)
            const link = await createLink({ destination_board_result_id, board_result_id, user_id: token._id, type })

            if (link) {
                response.status(200).json({
                    link,
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
