import React from 'react'
import classnames from 'classnames'
import { Icon } from '../Icon/Icon'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'
import './Header.scss'

interface Props {
    className?: string
    back: boolean
    route?: string
}

export class Header extends React.Component<Props> {
    public render () {
        const { back, route } = this.props

        return (
            <header className={this.getClassName()}>
                {(back && route) && (
                    <Link to={route}>
                        <Icon
                            className={`Header__back-button`}
                            iconName='back'
                            color='#FFFFFF'
                        />
                    </Link>
                )}
                <Link to={routes.App.index}>
                    <Icon iconName='header_logo'/>
                </Link>
            </header >
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Header', {}, className)
    }
}
