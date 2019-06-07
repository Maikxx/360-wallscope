import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser } from '../services/UserService'
import { DatabaseUser } from '../types/User'

interface SignUpRequestBody {
    email?: string
    password?: string
    repeatPassword?: string
    fullName?: string
}

export async function onSignup(request: express.Request, response: express.Response) {
    console.log(request.body)
    const { email, password, repeatPassword, fullName } = request.body as SignUpRequestBody

    if (
        email
        && typeof email === 'string'
        && password
        && typeof password === 'string'
        && repeatPassword
        && typeof repeatPassword === 'string'
        && fullName
        && typeof fullName === 'string'
        && repeatPassword === password
    ) {
        const saltRounds = 10

        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds)

            if (!hashedPassword) {
                return response.status(500).json({
                    error: 'Something went wrong, please try again',
                })
            }

            const user: DatabaseUser = await createUser({ email, password: hashedPassword, fullName })

            if (user) {
                const expiresInADay = 24 * 60 * 60
                const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
                    expiresIn: expiresInADay,
                })

                response.status(200).json({
                    user,
                    accessToken,
                    expiresIn: expiresInADay,
                })
            }
        } catch (error) {
            response.status(500).json({
                error: 'Something went wrong, please try again',
            })
        }
    } else {
        response.status(409).json({
            error: 'Failed signing you up. Please make sure to provide an email, password and a full name. Also make sure the passwords submitted match.',
        })
    }

    return
}
