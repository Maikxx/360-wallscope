import React from 'react'
import classnames from 'classnames'
import { Navigation } from '../Navigation/Navigation'
import { routes } from '../../routes'
import { NavLink } from '../NavLink/NavLink'
import { Button } from '../Button/Button'
import './MenuBottom.scss'
import { IconNames, Icon } from '../Icon/Icon'

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
                <NavLink
                    route={isLoggedIn ? routes.App.Boards.index : routes.App.CurrentUser.index}
                    iconName='boards'
                    color='#CEC7EC'
                >
                    {isLoggedIn ? 'Boards' : 'Login for more fun features'}
                </NavLink>
                <li className='Middle'>
                    {iconName === 'pen' ?
                    <React.Fragment>
                        <div className='menu'>
                            <input type='checkbox' className='menu-open' name='menu-open' id='menu-open'/>
                            <label className='menu-open-button' htmlFor='menu-open'>
                                <Icon iconName='pen' color='#181631'/>
                            </label>
                            <a className='menu-item'>
                                <Icon iconName='pen' color='#181631'/>
                            </a>
                            <a className='menu-item'>
                                <Icon iconName='pen' color='#181631'/>
                            </a>
                            <a className='menu-item'>
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
                        <Button
                            className='Button_big'
                            styleOverride='big-button'
                            type='button'
                            iconName={iconName}
                            color='#181631'
                        />
                    }
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
