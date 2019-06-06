import React from 'react'
import './Header.scss'
import classnames from 'classnames'

interface Props {
    className?: string
}

export class Header extends React.Component<Props> {
    public render () {
        const { children, className } = this.props
        return (
            <header className={this.getClassName()}>
                {children}
            </header>
        )
    }

    private getClassName() {
        const { className } = this.props
        return classnames('Header', {}, className)
    }
}
