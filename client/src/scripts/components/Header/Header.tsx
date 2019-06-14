import React from 'react'
import './Header.scss'
import classnames from 'classnames'
import { Icon } from '../Icon/Icon'
import { Link } from 'react-router-dom'

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
                <Icon iconName='header_logo'/>
            </header>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Header', {}, className)
    }
}
