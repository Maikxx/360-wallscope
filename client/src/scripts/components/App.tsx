import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../routes'

interface Props {}

interface State {}

export class App extends React.Component<Props, State> {
    public render() {
        return (
            <React.Fragment>
                <Link to={routes.App.index}>App</Link>
                <Link to={routes.Login.index}>Login</Link>
                <Link to={routes.Signup.index}>Signup</Link>
            </React.Fragment>
        )
    }
}
