import React from 'react'
import { routes } from '../routes'
import { Link } from './Link/Link'

interface Props {}

interface State {}

export class App extends React.Component<Props, State> {
    public render() {
        return (
            <React.Fragment>
                <Link route={routes.Login.index} iconName='user'>Login</Link>
            </React.Fragment>
        )
    }
}
