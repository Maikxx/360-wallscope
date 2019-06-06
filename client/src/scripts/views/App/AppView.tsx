import React from 'react'
import { routes } from '../../routes'
import { Link } from '../../components/Link/Link'

interface Props {}

export class AppView extends React.Component<Props> {
    public render() {
        return (
            <React.Fragment>
                Redirect by authentication from here!

                <Link route={routes.App.index}>App</Link>
                <Link route={routes.Login.index} iconName='user'>Login</Link>
                <Link route={routes.Signup.index}>Signup</Link>
            </React.Fragment>
        )
    }
}
