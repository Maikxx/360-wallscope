import * as React from 'react'
import Modal from 'react-modal'
import './UserMenu.scss'
import { UserMenuHeader } from './UserMenuHeader/UserMenuHeader'
import { UserMenuBody } from './UserMenuBody/UserMenuBody'

interface Props {
    renderButton: (openModal: () => void) => JSX.Element
    title: string
    onAccept?: () => void
}

interface State {
    modalIsOpen: boolean
}

Modal.setAppElement('#react-root')

export class UserMenu extends React.Component<Props, State> {
    public state: State = {
        modalIsOpen: false,
    }

    public render() {
        const { children, renderButton, title } = this.props

        return (
            <React.Fragment>
                {renderButton(this.openModal)}
                <Modal
                    overlayClassName='Overlay'
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className={`UserMenuModal`}
                >
                    <UserMenuHeader
                        fullName={title}
                        onClose={this.closeModal}
                    />
                    <UserMenuBody
                        children={children}
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
