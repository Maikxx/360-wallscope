require('dotenv').config()
import express from 'express'
import jwt from 'jsonwebtoken'

interface VerifyTokenRequestBody {
    token?: string
}

export async function onVerifyToken(request: express.Request, response: express.Response) {
    const { token } = request.body as VerifyTokenRequestBody

    try {
        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)

            if (decodedToken) {
                response.status(200).json({
                    token: decodedToken,
                })
            } else {
                throw new Error('Your token seems to be invalid or expired!')
            }
        } else {
            throw new Error('Please pass a token with this request to verify!')
        }
    } catch (error) {
        response.status(500).json({
            error: error.message,
        })
    }
}
