import { User } from '../types/User'
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

interface UserAuthorizationToken {
    _id: number
    iat: number
    exp: number
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
            toast.error(error)
            return null
        }
    } catch (error) {
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
            toast.error(error)
            return null
        }
    } catch (error) {
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
    if (window.localStorage) {
        const token = window.localStorage.getItem('authToken')

        if (token) {
            return token
        } else {
            return null
        }
    } else {
        toast.error(`You don't seem to have localStorage turned on, please turn it on or leave.`)
        throw new Error(`You don't seem to have localStorage turned on, please turn it on or leave.`)
    }
}

export async function checkTokenValidity() {
    const token = getAuthorizationToken()

    if (token) {
        try {
            const url = `${window.location.origin}/verify-token`
            const data = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                }),
            })

            const { error, token: decodedToken } = await data.json()

            if (!error && decodedToken) {
                return decodedToken
            } else if (error) {
                return false
            }
        } catch (error) {
            return false
        }
    } else {
        return false
    }
}

interface GetUserByIdResponse {
    user?: User
    error?: string
}

export async function getUserById(id: number) {
    const url = `${window.location.origin}/get-user/${id}`

    try {
        const token = getAuthorizationToken()

        const data = await fetch(url, { method: 'GET', headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }})

        const { error, user }: GetUserByIdResponse = await data.json()

        if (!error && user) {
            return user
        } else if (error) {
            toast.error(error)
        }

        return null
    } catch (error) {
        toast.error(error.message)
        return null
    }
}

export async function getCurrentUser() {
    try {
        const token = await checkTokenValidity() as UserAuthorizationToken | boolean

        if (token) {
            const user = await getUserById((token as UserAuthorizationToken)._id)

            return user
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

export async function logout() {
    try {
        window.localStorage.removeItem('authToken')
    } catch (error) {
        toast.error('Failed to log you out...')
    }
}

interface EditUserParams {
    id: number
    fullName: string
    email: string
}

interface EditUserResponse {
    user?: User
    error?: string
}

export async function onEditUser(params: EditUserParams) {
    const { id } = params
    const url = `${window.location.origin}/user/${id}`

    try {
        const token = getAuthorizationToken()

        const data = await fetch(url, { body: JSON.stringify(params), method: 'POST', headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }})

        const { error, user }: EditUserResponse = await data.json()

        if (!error && user) {
            return user
        } else if (error) {
            toast.error(error)
        }

        return null
    } catch (error) {
        toast.error(error.message)
        return null
    }
}
