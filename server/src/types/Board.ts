export interface DatabaseBoard {
    _id: number
    name: string
    collaborators: number[] | null
    owner: number | null
    results: number[] | null
    created_at: Date
}

export interface CreatedDatabaseBoard {
    _id: number
}
