import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserByEmail } from '../../orm/users/getUserByEmail'
import { convertDatabaseUserToClientUser } from '../../utils/converters'

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
                throw new Error('User not found. Failed to log you in!')
            }

            const result = await bcrypt.compare(password, user.password)

            if (!result) {
                throw new Error('Email and password do not match!')
            }

            const expiresInADay = 24 * 60 * 60
            const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
                expiresIn: expiresInADay,
            })

            response.status(200).send({
                user: convertDatabaseUserToClientUser(user),
                accessToken,
                expiresIn: expiresInADay,
            })
        } catch (error) {
            response.status(500).json({
                error: error.message,
            })
        }
    } else {
        response.status(421).json({
            error: 'Please make sure to provide both an email and a password!',
        })
    }
}
