import 'babel-polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/App'
import { LoginView } from './views/LoginView/LoginView'
import { BrowserRouter, Route } from 'react-router-dom'
import { routes } from './routes'

ReactDOM.render(
    <BrowserRouter>
        <Route path={routes.App.index} component={App}/>
        <Route path={routes.Login.index} component={LoginView}/>
    </BrowserRouter>,
    document.getElementById('react-root')
)
