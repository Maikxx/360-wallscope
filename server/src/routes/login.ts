import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserByEmail } from '../orm/users/getUserByEmail'

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
            const user = await getUserByEmail(email)

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
            const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
                expiresIn: expiresInADay,
            })

            response.status(200).send({
                user: {
                    _id: user._id,
                    fullName: user.full_name,
                    email: user.email,
                },
                accessToken,
                expiresIn: expiresInADay,
            })
        } catch (error) {
            return response.status(500).json({
                error: 'Internal server error! Oops...',
            })
        }
    }

    return response.status(421).json({
        error: 'Please make sure to provide both an email and a password!',
    })
}
