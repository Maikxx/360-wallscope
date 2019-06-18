import express from 'express'
import { getAuthTokenFromRequest } from '../services/auth'
import { createResult } from '../orm/results/createResult'

interface CreateResultRequestBody {
    title?: string
    content?: string
    summary?: string
    data_url?: string
}

export async function onCreateResult(request: express.Request, response: express.Response) {
    const { ...params } = request.body as CreateResultRequestBody

    try {
        getAuthTokenFromRequest(request)
        const result = await createResult(params)

        if (result) {
            response.status(200).json({
                result,
            })
        } else {
            throw new Error('Something went wrong when creating a result for you.')
        }
    } catch (error) {
        response.status(500).json({
            error: error.message,
        })
    }
}
