import 'babel-polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { AppView } from './views/App/AppView'
import { routes } from './routes'

ReactDOM.render(
    <BrowserRouter>
        <Route route={routes.App.index} component={AppView}/>
    </BrowserRouter>,
    document.getElementById('react-root')
)
