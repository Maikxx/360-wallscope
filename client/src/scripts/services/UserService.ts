import { User } from '../types/User'

interface UserSignUpResponse {
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
        const data = await fetch(url, { method: 'POST', body: JSON.stringify(userSignUpBody) })
        const { error, user, accessToken, expiresIn }: UserSignUpResponse = await data.json()

        if (!error && accessToken && user && expiresIn) {
            // TODO: Integrate accesstoken authentication
            console.info('Successfully created a new user!')
            return user
        } else {
            // TODO: Error handling
            console.error(error)
            return null
        }
    } catch (error) {
        // TODO: Error handling
        console.error(error.message)
        return null
    }
}
