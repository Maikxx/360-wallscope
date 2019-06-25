import * as React from 'react'
import classnames from 'classnames'
import './RawData.scss'
import { IconNames, Icon } from '../../Icon/Icon'
import { ModalBase } from '../../Modal/ModalBase'
import { Button } from '../../Button/Button'
import { Form } from '../../Form/Form'
import { Fieldset } from '../../Form/Fieldset/Fieldset'
import { Label } from '../../Form/Label/Label'
import { Input } from '../../Form/Input/Input'
import { Tags } from '../../Tags/Tags'
import { User } from '../../../types/User'
import { Legend } from '../../Form/Legend/Legend'
import { IconRaster } from '../../IconRaster/IconRaster'
import { createBoard } from '../../../services/BoardService'
import { toast } from 'react-toastify'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLDivElement>
    file?: any
    user?: User
    iconName?: IconNames
    boardNames?: string[]
    onCreateNewBoard?: () => void
}

interface State {
    name: string
    icon_name: string
}

export class RawData extends React.Component<Props, State> {
    public state: State = {
        name: '',
        icon_name: 'spaceship',
    }

    public render() {
        const { children, className, iconName, file, boardNames, user, ...restProps } = this.props

        return (
            <div className={`DataWrapper`} >
                <div className={this.getClassName()} {...restProps}>
                    {file.file_type === file.file_type &&
                        <a href={'/'} download>
                            <Icon className={`FileIcons`} iconName={file.icon_name}/>
                            {file.title}
                        </a>
                    }
                    <span>Raw data</span>
                    {user && (
                        <ModalBase
                            title={'Add to a board'}
                            firstButton={'Cancel'}
                            secondButton={'Done'}
                            renderButton={openModal => (
                                <Button
                                    onClick={openModal}
                                    type='button'
                                    styleOverride='round-button'
                                    iconName='add'
                                    color='#181631'
                                />
                            )}
                            render={closeModal => (
                                <Form onSubmit={event => this.onCreateNewBoard(event, closeModal)}>
                                    <Fieldset>
                                        <Legend>
                                            Create a new board
                                        </Legend>
                                        <Label>
                                            Name
                                            <Input
                                                type={'text'}
                                                name={'name'}
                                                onChange={event => this.setState({ name: event.target.value })}
                                                styleOverride={'input-search'}
                                            />
                                        </Label>
                                        <Label isNative={false}>
                                            Icon
                                            <IconRaster
                                                name={`icon_name`}
                                                onChange={value => this.setState({ icon_name: value })}
                                            />
                                        </Label>
                                        <Button
                                            styleOverride={'ultraviolet-button'}
                                            type='submit'
                                            full={true}
                                            onClick={() => {
                                                toast.success('Adding results to a board does not work in the prototype.')
                                                closeModal()
                                            }}
                                        >
                                            Create
                                        </Button>
                                    </Fieldset>
                                    <Fieldset>
                                        <Legend>
                                            Add to an existing board
                                        </Legend>
                                        <Tags tags={boardNames} styleOverride={'tag-ultraviolet-button'}/>
                                    </Fieldset>
                                </Form>
                            )}
                        />
                    )}
                </div>
            </div >
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('RawData', {}, className)
    }

    private onCreateNewBoard = async (event: React.FormEvent<HTMLFormElement>, closeModal: () => void) => {
        event.preventDefault()
        const { name, icon_name } = this.state
        const { onCreateNewBoard } = this.props

        if (name) {
            const board = await createBoard({ name, iconName: icon_name })

            if (board && onCreateNewBoard) {
                onCreateNewBoard()
                closeModal()
            }
        }
    }
}
