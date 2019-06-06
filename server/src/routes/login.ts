import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findUserByEmail } from '../services/UserService'
import { DatabaseUser } from '../types/User'

interface LoginRequestBody {
    email?: string
    password?: string
}

export async function onLogin(request: express.Request, response: express.Response) {
    const { email, password } = request.body as LoginRequestBody

    if (
        email
        && typeof email === 'string'
        && password
        && typeof password === 'string'
    ) {
        try {
            const user: DatabaseUser = await findUserByEmail(email)

            if (!user || !user.password) {
                return response.status(404).json({
                    error: 'User not found. Failed to log you in!',
                })
            }

            const result = await bcrypt.compare(password, user.password)

            if (!result) {
                return response.status(401).json({
                    error: 'Email and password do not match!',
                })
            }

            const expiresInADay = 24 * 60 * 60
            const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
                expiresIn: expiresInADay,
            })

            response.status(200).send({ user, accessToken, expiresIn: expiresInADay })
        } catch (error) {
            return response.status(500).json({
                error: 'Internal server error! Oops...',
            })
        }
    }

    return
}
