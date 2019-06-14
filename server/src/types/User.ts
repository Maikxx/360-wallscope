export interface DatabaseUser {
    _id: number
    email: string | null
    password: string | null
    full_name: string | null
    created_at: Date | null
}

export interface ClientUser {
    _id: number
    email: string | null
    fullName: string | null
}
