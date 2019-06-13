import * as React from 'react'
import { Button } from '../../Button/Button'
import './ModalHeader.scss'

interface Props {
    title: string
    onClose: () => void
}

export class ModalHeader extends React.Component<Props> {

    public render() {
        const { title, onClose } = this.props

        return (
            <header className={`ModalHeader`}>
                <h1 className={`Capitalise`}>{title}</h1>
                <Button className='Button__close' styleOverride='round-button' iconName='close' color='#181631'onClick={onClose}/>
            </header>
        )
    }
}
