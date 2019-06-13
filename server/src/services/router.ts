import express from 'express'
import path from 'path'

export const routes = [ '/', '/login', '/signup', '/dashboard', '/current_user' ]

export const routeRequest = (request: express.Request, response: express.Response) => {
    const { url } = request

    if (routes.includes(url.trim())) {
        response.sendFile(path.join(__dirname, '/../../public/build/index.html'))
    } else if (url.includes('/build')) {
        response.sendFile(path.join(__dirname, '/../../public', url))
    } else {
        response.status(404).redirect('/')
    }
}
