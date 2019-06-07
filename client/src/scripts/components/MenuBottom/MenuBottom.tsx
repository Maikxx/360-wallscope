import React from 'react'
import classnames from 'classnames'
import { Navigation } from '../Navigation/Navigation'
import { routes } from '../../routes'
import { NavLink } from '../Navlink/NavLink'
import { Button } from '../Button/Button'
import './MenuBottom.scss'

interface Props {
    className?: string
    // iconName?: string
    // color?: string
    // route?: string
    fullName?: string
}

export class MenuBottom extends React.Component<Props> {
    public render() {
        const { fullName } = this.props
        return (
            <Navigation className={this.getClassName()}>
                <NavLink route={routes.App.index} iconName='boards' color='#CEC7EC'>Boards</NavLink>
                <li>
                    <Button className='Button_big' styleOverride='big-button' type='button' iconName='search_big' color='#181631'/>
                </li>
                <NavLink route={routes.App.index} iconName='user' color='#CEC7EC'>{fullName}</NavLink>
            </Navigation>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('MenuBottom', { }, className)
    }

}
