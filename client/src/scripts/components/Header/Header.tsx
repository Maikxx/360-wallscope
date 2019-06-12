import React from 'react'
import './Header.scss'
import classnames from 'classnames'
import { Icon } from '../Icon/Icon'
import { Link } from 'react-router-dom'

interface Props {
    className?: string,
    back: boolean,
    route: string
}

export class Header extends React.Component<Props> {
    public render () {
        const { children, back, route } = this.props
        return (
            <header className={this.getClassName()}>
                <Link
                to={route}
                >
                   {back && <Icon iconName='back' color='#FFFFFF' ></Icon>}
                </Link>
                {children}
            </header>
        )
    }

    private getClassName() {
        const { className } = this.props
        return classnames('Header', {}, className)
    }
}
