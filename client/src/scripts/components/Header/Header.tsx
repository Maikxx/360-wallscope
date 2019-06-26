import React from 'react'
import classnames from 'classnames'
import { Icon } from '../Icon/Icon'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'
import { Dropdown } from '../Dropdown/Dropdown'
import { Button } from '../Button/Button'
import { ModalBase } from '../Modal/ModalBase'
import { Form } from '../Form/Form'
import { Fieldset } from '../Form/Fieldset/Fieldset'
import { Label } from '../Form/Label/Label'
import { Input } from '../Form/Input/Input'
import { createBoard } from '../../services/BoardService'
import './Header.scss'
import { IconRaster } from '../IconRaster/IconRaster'

interface Props {
    className?: string
    back: boolean
    route?: string
    more: boolean
    onCreateNewBoard?: (id: number) => void
}

interface State {
    name: string
    icon_name: string
}

export class Header extends React.Component<Props, State> {
    public state: State = {
        name: '',
        icon_name: '',
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
                                aria_label='more options'
                            />
                        )}
                        render={closeDropdown => (
                            <React.Fragment>
                                <ModalBase
                                    title={'Create new board'}
                                    renderButton={openModal => (
                                        <Button styleOverride='tag-ultraviolet-button' full={true} onClick={openModal} aria_label='create new board'>
                                            Create new board
                                        </Button>
                                    )}
                                    render={closeModal => (
                                        <Form onSubmit={this.onCreateNewBoard}>
                                            <Fieldset>
                                                <Label>
                                                    Board name
                                                    <Input type={'text'} name={'name'} onChange={event => this.setState({ name: event.target.value })}/>
                                                </Label>
                                                <Label isNative={false}>
                                                    Icon
                                                    <IconRaster
                                                        name={`icon_name`}
                                                        onChange={value => this.setState({ icon_name: value })}
                                                    />
                                                </Label>
                                                <Button styleOverride={'ultraviolet-button'} type='submit' aria_label='create' full={true}>
                                                    Create
                                                </Button>
                                                <Button styleOverride={`orange-button`} type='button' full={true} aria_label='cancel' onClick={() => {
                                                    closeModal()
                                                    closeDropdown()
                                                }}>
                                                    Cancel
                                                </Button>
                                            </Fieldset>
                                        </Form>
                                    )}
                                />
                            </React.Fragment>
                        )}
                    >
                    </Dropdown>
                )}
            </header >
        )
    }

    private onCreateNewBoard = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { name, icon_name } = this.state
        const { onCreateNewBoard } = this.props

        if (name) {
            const board = await createBoard({ name, iconName: icon_name })

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
