import 'babel-polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { LoginView } from './views/Cover/LoginView'
import { BrowserRouter, Route } from 'react-router-dom'
import { routes } from './routes'
import { SignUpView } from './views/Cover/SignupView'
import { HomeView } from './views/HomeView/HomeView'

ReactDOM.render(
    <BrowserRouter>
        <Route path={routes.App.index} exact={true} component={HomeView}/>
        <Route path={routes.Login.index} component={LoginView}/>
        <Route path={routes.Signup.index} component={SignUpView}/>
    </BrowserRouter>,
    document.getElementById('react-root')
)
