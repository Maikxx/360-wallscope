import * as React from 'react'
import './UserMenuHeader.scss'
import { NavLink } from '../../NavLink/NavLink'
import { routes } from '../../../routes'
import { Button } from '../../Button/Button'

interface Props {
    onClose: () => void
    fullName?: string | null
}

export class UserMenuHeader extends React.Component<Props> {

    public render() {
        const { onClose, fullName } = this.props
        const isLoggedIn = fullName ? true : false

        return (
            <header className={`UserMenuHeader`}>
                <NavLink
                    route={isLoggedIn ? routes.App.CurrentUser.index : routes.Login.index}
                    iconName='user'
                    color='#171631'
                >
                    {fullName || 'Login'}
                </NavLink>
                <Button className='Button__close' styleOverride='round-button' iconName='close' color='#181631'onClick={onClose}/>
            </header>
        )
    }
}
