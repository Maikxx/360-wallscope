export interface User {
    _id: number
    fullName: string | null
    email: string | null
}

export interface DatabaseUser {
    _id: number
    full_name: string | null
    email: string | null
    password: string | null
}
