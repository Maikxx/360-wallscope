import { DatabaseUser, ClientUser } from '../types/User'

export function convertToPostgreSQLArray(array: any[]): string {
    return `{${array.join(', ')}`
}

export function convertDatabaseUserToClientUser({ _id, full_name, email }: DatabaseUser): ClientUser {
    return {
        _id,
        fullName: full_name,
        email,
    }
}
