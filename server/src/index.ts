require('dotenv').config()
import express from 'express'
import http from 'http'
import path from 'path'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'
// import expressJWT from 'express-jwt'
import { onLogin } from './routes/login'
import { routeRequest } from './services/router'
import { setupDatabase } from './services/database'

; (async () => {
    const app = express()
    const server = new http.Server(app)

    await setupDatabase()

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

    app.post('/login', onLogin)

    server.listen(({ port: process.env.PORT || 9000 }), () => {
        console.info(`App is now open for action on port ${process.env.PORT || 9000}.`)
    })
})()
