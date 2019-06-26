import express from 'express'
import path from 'path'

export const routes = [ '/', '/login', '/signup', '/boards', '/current_user', '/results' ]

export const routeRequest = (request: express.Request, response: express.Response) => {
    const { url } = request

    if (routes.includes(url.trim()) || url.includes('/boards')) {
        response.sendFile(path.join(__dirname, '/../../public/build/index.html'))
    } else if (url.includes('/build')) {
        response.sendFile(path.join(__dirname, '/../../public', url))
    } else if (url.includes('robots.txt')) {
        response.sendFile(path.join(__dirname, '/../../public', '/robots.txt'))
    } else {
        response.status(404).redirect('/')
    }
}
