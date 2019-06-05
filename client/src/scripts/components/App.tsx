import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../routes'

interface Props {}

interface State {}

export class App extends React.Component<Props, State> {
    public render() {
        return (
            <React.Fragment>
                <div>This is where all the React goes from now.</div>
                <Link to={routes.App.index}>OKAY</Link>
                <Link to={routes.Login.index}>Login</Link>
            </React.Fragment>
        )
    }
}
