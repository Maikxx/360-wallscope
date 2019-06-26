import * as React from 'react'
import './UserMenuHeader.scss'
import { Button } from '../../Button/Button'

interface Props {
    onClose: () => void
    fullName?: string | null
}

export class UserMenuHeader extends React.Component<Props> {

    public render() {
        const { onClose, fullName } = this.props

        return (
            <header className={`UserMenuHeader`}>
                <span className={`UserMenuHeader__title`}>
                    {fullName || 'Login'}
                </span>
                <Button
                    className='Button__close'
                    styleOverride='round-button'
                    iconName='close'
                    color='#181631'
                    onClick={onClose}
                />
            </header>
        )
    }
}
