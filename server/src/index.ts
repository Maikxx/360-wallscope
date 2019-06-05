require('dotenv').config()
import express from 'express'
import http from 'http'
import path from 'path'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'
// import expressJWT from 'express-jwt'
import { routeRequest } from './services/router'
import { connectToMongo } from './services/database'

; (async () => {
    const app = express()
    const server = new http.Server(app)
    await connectToMongo()

    // const jwt = expressJWT({
    //     secret: process.env.JWT_SECRET as string,
    // })

    app.use((request, response, next) => {
        response.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization')
        next()
    })

    app.use('/build', express.static(path.join(__dirname, 'build')))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(helmet())
    app.use(compression())

    app.get('*', routeRequest)

    server.listen(({ port: process.env.PORT || 9000 }), () => {
        console.info(`App is now open for action on port ${process.env.PORT || 9000}.`)
    })
})()
