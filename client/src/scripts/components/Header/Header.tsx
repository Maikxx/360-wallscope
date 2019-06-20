import React from 'react'
import classnames from 'classnames'
import { Icon } from '../Icon/Icon'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'
import { Dropdown } from '../Dropdown/Dropdown'
import { Button } from '../Button/Button'
import './Header.scss'
import { ModalBase } from '../Modal/ModalBase'
import { Form } from '../Form/Form'
import { Fieldset } from '../Form/Fieldset/Fieldset'
import { Label } from '../Form/Label/Label'
import { Input } from '../Form/Input/Input'
import { createBoard } from '../../services/BoardService'

interface Props {
    className?: string
    back: boolean
    route?: string
    more: boolean
    onCreateNewBoard?: (id: number) => void
}

interface State {
    name: string
}

export class Header extends React.Component<Props, State> {
    public state: State = {
        name: '',
    }

    public render () {
        const { back, route, more } = this.props

        return (
            <header className={this.getClassName()}>
                {(back && route) && (
                    <Link to={route}>
                        <Icon
                            className={`Header__back-button`}
                            iconName='back'
                            color='#FFFFFF'
                        />
                    </Link>
                )}
                <Link to={routes.App.index}>
                    <Icon iconName='header_logo'/>
                </Link>
                {more && (
                    <Dropdown
                        title={'More options'}
                        renderButton={openModal => (
                            <Button
                                onClick={openModal}
                                className='Header__more-button'
                                type='button'
                                iconName='more'
                                color='#ffffff'
                            />
                        )}
                    >
                        <ModalBase
                            title={'Create new board'}
                            renderButton={openModal => (
                                <Button styleOverride='tag-red-button' full={true} onClick={openModal}>
                                    Create new board
                                </Button>
                            )}
                        >
                            <Form onSubmit={this.onCreateNewBoard}>
                                <Fieldset>
                                    <Label>
                                        Board name
                                        <Input type={'text'} name={'name'} onChange={event => this.setState({ name: event.target.value })}/>
                                    </Label>
                                    <Button styleOverride={`blue-button`} type='button' full={true}>
                                        Cancel
                                    </Button>
                                    <Button styleOverride={'red-button'} type='submit' full={true}>
                                        Create
                                    </Button>
                                </Fieldset>
                            </Form>
                        </ModalBase>
                        <Button styleOverride='tag-red-button' full={true}>Delete board</Button>
                        <Button styleOverride='tag-red-button' full={true}>Edit existing board</Button>
                        <Button styleOverride='tag-red-button' full={true}>Share board</Button>
                    </Dropdown>
                )}

            </header >
        )
    }

    private onCreateNewBoard = async() => {
        const { name } = this.state
        const { onCreateNewBoard } = this.props

        if (name) {
            const board = await createBoard({ name })

            if (board && onCreateNewBoard) {
                onCreateNewBoard(board._id)
            }
        }
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Header', {}, className)
    }
}
