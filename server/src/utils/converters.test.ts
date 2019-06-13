import { convertToPostgreSQLArray, convertDatabaseUserToClientUser } from './converters'
import { expect } from 'chai'
import 'mocha'

describe('ConvertToPostgreSQLArray', () => {
    it('Should convert a regular one-dimensional array of items into a PostgreSQL array format', () => {
        const oneDimension = convertToPostgreSQLArray([ 1, 2, 3 ])
        expect(oneDimension).to.equal(`{1, 2, 3}`)

        const multiDimensional = convertToPostgreSQLArray([ 1, 2, 3, [ 1, 2, 3 ]])
        expect(multiDimensional).to.equal(`{1, 2, 3, 1,2,3}`)
    })
})

describe('ConvertDatabaseUserToClientUser', () => {
    it('Should convert a database user object into a client usable user object', () => {
        const result = convertDatabaseUserToClientUser({
            _id: 1,
            full_name: 'Test User',
            email: 'test@rain.com',
            password: 'Strongpassword1!',
            created_at: new Date(),
        })
        expect(result).to.deep.equal({ _id: 1, fullName: 'Test User', email: 'test@rain.com' })
    })
})
