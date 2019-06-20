import * as React from 'react'
import './DropdownBody.scss'

interface Props { }

export class DropdownBody extends React.Component<Props> {

    public render() {
        const { children } = this.props

        return (
            <section className={`DropdownBody`}>
                {children}
            </section>
        )
    }
}
