import * as React from 'react'
import Modal from 'react-modal'
import { ModalHeader } from './ModalHeader/ModalHeader'
import { ModalBody } from './ModalBody/ModalBody'
import './ModalBase.scss'

interface Props {
    renderButton: (openModal: () => void) => JSX.Element
    title: string
    firstButton?: string
    secondButton?: string
    onAccept?: () => void
    render?: (closeModal: () => void) => JSX.Element
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
        const { children, renderButton, title, render } = this.props
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
                        children={render ? render(this.closeModal) : children}
                    />
                </Modal>
            </React.Fragment>
        )
    }

    private openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    private closeModal = () => {
        this.setState({ modalIsOpen: false })
    }
}
