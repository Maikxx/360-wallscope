import React from 'react'
import classnames from 'classnames'

interface Props {
    className?: string
}

export class Navigation extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <nav className={this.getClassName()}>
                <ul>
                    {children}
                </ul>
            </nav>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Navigation', { }, className)
    }
}
