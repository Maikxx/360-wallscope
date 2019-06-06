export interface DatabaseUser {
    id: number
    email: string | null
    password: string | null
    full_name: string | null
    created_at: Date | null
}
