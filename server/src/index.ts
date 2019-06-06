require('dotenv').config()
import express from 'express'
import http from 'http'
import cors from 'cors'
import path from 'path'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'
import { onLogin } from './routes/login'
import { routeRequest } from './services/router'
import { setupDatabase } from './services/database'
import { onSignup } from './routes/signup'

; (async () => {
    const app = express()
    const server = new http.Server(app)

    await setupDatabase()

    app.use((request, response, next) => {
        response.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization')
        next()
    })

    app.use('/build', express.static(path.join(__dirname, 'build')))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(helmet())
    app.use(cors())
    app.use(compression())

    app.get('*', routeRequest)

    app.post('/login', onLogin)
    app.post('/signup', onSignup)

    server.listen(({ port: process.env.PORT || 9000 }), () => {
        console.info(`App is now open for action on port ${process.env.PORT || 9000}.`)
    })
})()
