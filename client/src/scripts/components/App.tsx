import React from 'react'
import { routes } from '../routes'
import { Link } from './Link/Link'

interface Props {}

interface State {}

export class App extends React.Component<Props, State> {
    public render() {
        return (
            <React.Fragment>
                <div>This is where all the React goes from now.</div>
                <Link route={routes.App.index}>OKAY</Link>
            </React.Fragment>
        )
    }
}
