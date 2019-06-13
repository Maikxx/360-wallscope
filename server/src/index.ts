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
import { onGetUserById } from './routes/user'
import { onGetBoardById, onGetBoards, onCreateBoard, onEditBoard, onRemoveBoard } from './routes/board'

(async () => {
    const app = express()
    const server = new http.Server(app)

    await setupDatabase()

    app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
        response.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization')
        next()
    })

    app.use('/build', express.static(path.join(__dirname, 'build')))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(helmet())
    app.use(cors())
    app.use(compression())

    app.get('/user/:id', onGetUserById) // Authorization Protected
    app.get('/board/:id', onGetBoardById) // Authorization Protected
    app.get('/boards', onGetBoards) // Authorization Protected
    app.get('*', routeRequest)

    app.post('/edit-board', onEditBoard) // Authorization Protected
    app.post('/create-board', onCreateBoard) // Authorization Protected
    app.post('/remove-board', onRemoveBoard) // Authorization Protected
    app.post('/login', onLogin)
    app.post('/signup', onSignup)

    server.listen(({ port: process.env.PORT || 9000 }), () => {
        console.info(`App is now open for action on port ${process.env.PORT || 9000}.`)
    })
})()
