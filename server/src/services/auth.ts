require('dotenv').config()
import express from 'express'
import jwt from 'jsonwebtoken'
import { Token } from '../types/Token'

export function getAuthTokenFromRequest(request: express.Request): Token {
    const token = request.headers.authorization && request.headers.authorization.replace('Token ', '')

    if (token) {
        let decodedToken

        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)
        } catch (error) {
            throw new Error(`You don't seem to be logged in, send a valid token to access this request!`)
        }

        if (decodedToken) {
            return decodedToken as Token
        }
    }

    throw new Error(`You don't seem to be logged in, send a valid token to access this request!`)
}
