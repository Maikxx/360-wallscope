import 'babel-polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'
import { BrowserRouter, Route } from 'react-router-dom'
import { routes } from './routes'

ReactDOM.render(
    <BrowserRouter>
        <Route path={routes.App.index} component={App}/>
    </BrowserRouter>,
    document.getElementById('react-root')
)
