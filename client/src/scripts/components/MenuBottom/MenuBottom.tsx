import React from 'react'
import classnames from 'classnames'
import { Navigation } from '../Navigation/Navigation'
import { routes } from '../../routes'
import { NavLink } from '../NavLink/NavLink'
import { Button } from '../Button/Button'
import { UserMenu } from '../UserMenu/UserMenu'
import './MenuBottom.scss'
import { IconNames, Icon } from '../Icon/Icon'
import { Link } from 'react-router-dom'

interface Props {
    className?: string
    fullName?: string | null
    iconName?: IconNames
}

interface State {
    isOpen?: boolean
}

export class MenuBottom extends React.Component<Props, State> {
    public state = {
        isOpen: false,
    }

    public render() {
        const { fullName, iconName } = this.props
        const isLoggedIn = fullName ? true : false

        return (
            <Navigation className={this.getClassName()}>
            {iconName === 'pen' ?
                <NavLink
                    route={isLoggedIn ? routes.App.index : routes.App.CurrentUser.index}
                    iconName='search_small'
                    color='#CEC7EC'
                    className='MenuStyleHoverFirst'
                >
                    {isLoggedIn ? 'Search' : 'Login for more fun features'}
                </NavLink>
            :
               <NavLink
                    route={isLoggedIn ? routes.App.Boards.index : routes.App.CurrentUser.index}
                    iconName='boards'
                    color={isLoggedIn ? '#CEC7EC' : '#6D6789'}
                    className='MenuStyleHoverFirst'
                >
                    {isLoggedIn ? 'Boards' : 'Please login'}
                </NavLink>
            }
                <li className='Middle'>
                    <Link
                        to={routes.App.index}
                        className='NoHover'
                    >
                        <Button
                            className='Button_big'
                            styleOverride='big-button'
                            type='button'
                            iconName={iconName}
                            color='#181631'
                        />
                    </Link>
                </li>
                { isLoggedIn
                    ? <UserMenu
                    title={fullName || 'Login'}
                    renderButton={openModal => (
                        <Button
                            className='MenuStyleHoverLast'
                            onClick = { openModal }
                            type='button'
                            // styleOverride='round-button'
                            iconName='user'
                            color='#cec7ec'
                        >
                            {fullName || 'Login'}
                        </Button>
                    )}
                    >
                    <NavLink
                        route={'/'}
                        iconName='spaceship'
                        color='#CEC7EC'
                        preventDefault={true}
                    >
                        Settings
                    </NavLink>
                    <NavLink
                        route={isLoggedIn ? routes.App.CurrentUser.index : routes.Login.index}
                        iconName='light'
                        color='#CEC7EC'
                        preventDefault={true}
                    >
                        Light Mode
                    </NavLink>
                    </UserMenu>
                    :
                    <NavLink
                        route={routes.Login.index}
                        iconName='user'
                        color='#CEC7EC'
                        className='MenuStyleHoverLast'
                    >
                        {fullName || 'Login'}
                    </NavLink>
                }
            </Navigation>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('MenuBottom', { }, className)
    }
}
