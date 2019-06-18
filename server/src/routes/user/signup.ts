import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { DatabaseUser } from '../../types/User'
import { createUser } from '../../orm/users/createUser'
import { convertDatabaseUserToClientUser } from '../../utils/converters'

interface SignUpRequestBody {
    email?: string
    password?: string
    repeatPassword?: string
    fullName?: string
}

export async function onSignup(request: express.Request, response: express.Response) {
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
                throw new Error('A wild error occurred while creating your account!')
            }

            const user: DatabaseUser = await createUser({ email, password: hashedPassword, fullName })

            if (user) {
                const expiresInADay = 24 * 60 * 60
                const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
                    expiresIn: expiresInADay,
                })

                response.status(200).json({
                    user: convertDatabaseUserToClientUser(user),
                    accessToken,
                    expiresIn: expiresInADay,
                })
            } else {
                throw new Error('User could not be retreived from the database.')
            }
        } catch (error) {
            response.status(500).json({
                error: error.message,
            })
        }
    } else {
        response.status(409).json({
            error: 'Failed signing you up. Please make sure to provide an email, password and a full name. Also make sure the passwords submitted match.',
        })
    }
}
