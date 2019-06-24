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

// const boardNames = new Array('Antibiotics', 'Schoolpaper', 'Hospitals', 'Antibiotics', 'Schoolpaper', 'Hospitals')

{/* <ModalBase
    title={'Add to a board'}
    firstButton={'Cancel'}
    secondButton={'Done'}
    renderButton={openModal => (
        < Button
            onClick = { openModal }
            type='button'
            styleOverride='round-button'
            iconName='add'
            color='#181631'
        />
    )}
>
    <Form action={'/'} className={'Form--search'}>
        <Fieldset>
            <Label>Create a new board
                <Input type={'text'} name={'search'} styleOverride={'input-search'} />
            </Label>
            <Button styleOverride={'ultraviolet-button'} type='button' full>Add</Button>
        </Fieldset>
        <Fieldset>
            <Label>Add to an existing board</Label>
                <Tags tags={boardNames} styleOverride={'tag-ultraviolet-button'}/>
        </Fieldset>
    </Form>
</ModalBase> */}
