export function convertToPostgreSQLArray(array: any[]): string {
    return `{${array.join(', ')}`
}
