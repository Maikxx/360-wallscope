import * as React from 'react'
import { Button } from '../../Button/Button'
import './ModalFooter.scss'

interface Props {
    firstButton: string
    secondButton: string
    onClose: () => void
    onAccept?: () => void
}

export class ModalFooter extends React.Component<Props> {
    public render() {
        const { firstButton, secondButton, onClose, onAccept } = this.props

        return (
            <footer className={`ModalFooter`}>
                <Button className='firstButton' styleOverride='red-button' onClick={onClose}>{firstButton}</Button>
                <Button className='secondButton' styleOverride='blue-button' onClick={onAccept}>{secondButton}</Button>
            </footer>
        )
    }
}
