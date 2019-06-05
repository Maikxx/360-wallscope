require('dotenv').config()
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const { MONGO_ATLAS_USERNAME, MONGO_ATLAS_PASSWORD } = process.env
const uri = `mongodb+srv://${MONGO_ATLAS_USERNAME}:${MONGO_ATLAS_PASSWORD}@cluster0-ipoy6.mongodb.net/test?retryWrites=true&w=majority`

export const client = new MongoClient(uri, { useNewUrlParser: true })
export const databaseClient = client.db('wallscope')
export const userCollection = databaseClient.collection('users')

export function connectToMongo() {
    try {
        client.connect()
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message)
    }
}
