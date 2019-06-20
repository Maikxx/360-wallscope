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
                >
                    {isLoggedIn ? 'Search' : 'Login for more fun features'}
                </NavLink>
            :
               <NavLink
                    route={isLoggedIn ? routes.App.Boards.index : routes.App.CurrentUser.index}
                    iconName='boards'
                    color='#CEC7EC'
                >
                    {isLoggedIn ? 'Boards' : 'Please login'}
                </NavLink>
            }
                <li className='Middle'>
                    {iconName === 'pen' ?
                    <React.Fragment>
                        <div className='Menu'>
                            <input type='checkbox' className='Menu-open' name='Menu-open' id='Menu-open'/>
                            <label className='Menu-open-button' htmlFor='Menu-open'>
                                <Icon iconName='pen' color='#181631'/>
                            </label>
                            <a className='Menu-item'>
                                <Icon iconName='pen' color='#181631'/>
                            </a>
                            <a className='Menu-item'>
                                <Icon iconName='pen' color='#181631'/>
                            </a>
                            <a className='Menu-item'>
                                <Icon iconName='pen' color='#181631'/>
                            </a>
                        </div>

                        <svg xmlns='http://www.w3.org/2000/svg' version='1.1'>
                            <defs>
                              <filter id='shadowed-goo'>

                                  <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='10' />
                                  <feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7' result='goo' />
                                  <feGaussianBlur in='goo' stdDeviation='3' result='shadow' />
                                  <feColorMatrix in='shadow' mode='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2' result='shadow' />
                                  <feOffset in='shadow' dx='1' dy='1' result='shadow' />
                                  <feComposite in2='shadow' in='goo' result='goo' />
                                  <feComposite in2='goo' in='SourceGraphic' result='mix' />
                              </filter>
                              <filter id='goo'>
                                  <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='10' />
                                  <feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7' result='goo' />
                                  <feComposite in2='goo' in='SourceGraphic' result='mix' />
                              </filter>
                            </defs>
                        </svg>
                    </React.Fragment>
                    :
                    <Link
                        to={routes.App.index}
                    >
                        <Button
                                className='Button_big'
                                styleOverride='big-button'
                                type='button'
                                iconName={iconName}
                                color='#181631'
                        />
                    </Link>
                    }
                </li>
                <UserMenu
                title={fullName || 'Login'}
                renderButton={openModal => (
                    <Button
                        onClick = { openModal }
                        type='button'
                        // styleOverride='round-button'
                        iconName='user'
                        color='#cec7ec'
                    >{fullName || 'Login'}</Button>
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

            </Navigation>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('MenuBottom', { }, className)
    }
}
