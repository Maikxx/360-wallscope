import * as React from 'react'
import Modal from 'react-modal'
import { ModalHeader } from './ModalHeader/ModalHeader'
import { ModalBody } from './ModalBody/ModalBody'
import { ModalFooter } from './ModalFooter/ModalFooter'
import './ModalBase.scss'

interface Props {
    renderButton: (openModal: () => void) => JSX.Element
    title: string
    firstButton: string
    secondButton: string
    onAccept?: () => void
}

interface State {
    modalIsOpen: boolean
}

Modal.setAppElement('#react-root')

export class ModalBase extends React.Component<Props, State> {

    public state: State = {
        modalIsOpen: false,
    }

    public render() {
        const { children, renderButton, title, firstButton, secondButton } = this.props
        return (
            <React.Fragment>
                {renderButton(this.openModal)}
                <Modal
                    overlayClassName='Overlay'
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className={`BaseModal`}
                >
                    <ModalHeader
                        title={title}
                        onClose={this.closeModal}
                    />
                    <ModalBody
                        children={children}
                    />
                    <ModalFooter
                        firstButton={firstButton}
                        secondButton={secondButton}
                        onClose={this.closeModal}
                        onAccept={this.onAccept}
                    />
                </Modal>
            </React.Fragment>
        )
    }

    private onAccept = () => {
        const { onAccept } = this.props

        if (onAccept) {
            onAccept()
            this.closeModal()
        }
    }

    private openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    private closeModal = () => {
        this.setState({ modalIsOpen: false })
    }
}
