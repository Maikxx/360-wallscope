import { User } from '../types/User'
import jwt from 'jsonwebtoken'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface UserAuthorizationResponse {
    error?: string
    user?: User
    accessToken?: string
    expiresIn?: number
}

interface UserSignUpBody {
    fullName: string
    email: string
    password: string
    repeatPassword: string
}

export async function onUserSignUp(userSignUpBody: UserSignUpBody) {
    const url = `${window.location.origin}/signup`

    try {
        const data = await fetch(url, { method: 'POST', body: JSON.stringify(userSignUpBody), headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }})
        const { error, user, accessToken }: UserAuthorizationResponse = await data.json()

        if (!error && accessToken && user) {
            setAuthorizationToken(accessToken)
            toast.success('Successfully created a new user!')
            return user
        } else {
            // TODO: Error handling
            toast.error(error)
            return null
        }
    } catch (error) {
        // TODO: Error handling
        toast.error(error.message)
        return null
    }
}

interface UserSignInBody {
    email: string
    password: string
}

export async function onUserSignIn(userSignInBody: UserSignInBody) {
    const url = `${window.location.origin}/login`

    try {
        const data = await fetch(url, { method: 'POST', body: JSON.stringify(userSignInBody), headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }})
        const { error, user, accessToken }: UserAuthorizationResponse = await data.json()

        if (!error && accessToken && user) {
            setAuthorizationToken(accessToken)
            return user
        } else {
            // TODO: Error handling
            toast.error(error)
            return null
        }
    } catch (error) {
        // TODO: Error handling
        toast.error(error.message)
        return null
    }
}

export function setAuthorizationToken(token: string) {
    if (window.localStorage) {
        window.localStorage.setItem('authToken', token)
    } else {
        toast.error('You are using a crappy browser, go away!')
        throw new Error('You are using a crappy browser, go away!')
    }
}

export function getAuthorizationToken() {
    const token = window.localStorage.getItem('authToken')

    if (window.localStorage && token) {
        if (token) {
            return token
        } else {
            return null
        }
    } else {
        // TODO: Error handling
        toast.error('Something went wrong while getting the user token!')
        return null
    }
}

export function checkTokenValidity() {
    const token = getAuthorizationToken()

    if (token) {
        // TODO: Fix this security issue
        try {
            const decodedToken = jwt.verify(token, `entersecrethere`)

            if (decodedToken) {
                return decodedToken
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    } else {
        // TODO: Error handling
        toast.error('No token could be found!')
        return false
    }
}
