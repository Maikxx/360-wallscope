import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'
import { Home } from '../Home/Home'

interface Props {}

export class AppView extends React.Component<Props> {
    public render() {
        return (
            <React.Fragment>
                Redirect by authentication from here!

                <Link to={routes.App.index}>App</Link>
                <Link to={routes.Login.index}>Login</Link>
                <Link to={routes.Signup.index}>Signup</Link>

                <Home />

            </React.Fragment>
        )
    }
}
