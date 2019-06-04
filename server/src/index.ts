require('dotenv').config()
import express from 'express'
import http from 'http'
import path from 'path'
import helmet from 'helmet'
import compression from 'compression'

; (async () => {
    const app = express()
    const server = new http.Server(app)

    app.use('/build', express.static(path.join(__dirname, 'build')))
    app.use(helmet())
    app.use(compression())

    app.get('*', ({ url }, response) => {
        if (url.trim() === '/') {
            response.sendFile(path.join(__dirname, '/../public/build/index.html'))
        } else if (url.includes('/build')) {
            response.sendFile(path.join(__dirname, '/../public', url))
        }
    })

    server.listen(({ port: process.env.PORT || 9000 }), () => {
        console.info(`App is now open for action on port ${process.env.PORT || 9000}.`)
    })
})()
