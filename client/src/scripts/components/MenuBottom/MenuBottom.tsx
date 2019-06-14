import React from 'react'
import classnames from 'classnames'
import { Navigation } from '../Navigation/Navigation'
import { routes } from '../../routes'
import { NavLink } from '../NavLink/NavLink'
import { Button } from '../Button/Button'
import './MenuBottom.scss'

interface Props {
    className?: string
    fullName?: string | null
}

export class MenuBottom extends React.Component<Props> {
    public render() {
        const { fullName } = this.props
        const isLoggedIn = fullName ? true : false

        return (
            <Navigation className={this.getClassName()}>
                <NavLink
                    route={isLoggedIn ? routes.App.Boards.index : routes.App.index}
                    iconName='boards'
                    color='#CEC7EC'
                >
                    {isLoggedIn ? 'Boards' : 'Home'}
                </NavLink>
                <li>
                    <Button
                        className='Button_big'
                        styleOverride='big-button'
                        type='button'
                        iconName='search_big'
                        color='#181631'
                    />
                </li>
                <NavLink
                    route={isLoggedIn ? routes.App.CurrentUser.index : routes.Login.index}
                    iconName='user'
                    color='#CEC7EC'
                >
                    {fullName || 'Login'}
                </NavLink>
            </Navigation>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('MenuBottom', { }, className)
    }
}
