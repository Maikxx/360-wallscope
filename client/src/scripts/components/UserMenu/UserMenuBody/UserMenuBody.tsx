import * as React from 'react'
import './UserMenuBody.scss'

interface Props { }

export class UserMenuBody extends React.Component<Props> {

    public render() {
        const { children } = this.props

        return (
            <section className={`UserMenuBody`}>
                {children}
            </section>
        )
    }
}
