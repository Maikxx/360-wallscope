import * as React from 'react'
import classnames from 'classnames'
import './Article.scss'
import { ModalBase } from '../../Modal/ModalBase'
import { Button } from '../../Button/Button'
import { Form } from '../../Form/Form'
import { Fieldset } from '../../Form/Fieldset/Fieldset'
import { Label } from '../../Form/Label/Label'
import { Input } from '../../Form/Input/Input'
import { Tags } from '../../Tags/Tags'
import { User } from '../../../types/User'
import { Legend } from '../../Form/Legend/Legend'
import { createBoard } from '../../../services/BoardService'
import { IconRaster } from '../../IconRaster/IconRaster'
import { toast } from 'react-toastify'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    full?: boolean
    article?: any
    user?: User
    boardNames?: string[] | undefined
    onCreateNewBoard?: () => void
}

interface State {
    name: string
    icon_name: string
}

export class Article extends React.Component<Props, State> {
    public state: State = {
        name: '',
        icon_name: 'spaceship',
    }

    public render() {
        const { children, className, full, boardNames, article, user, onCreateNewBoard, ...restProps } = this.props

        return (
            <div className='ArticleWrapper'>
                <article className={this.getClassName()} {...restProps}>
                    <h2>{article.title}</h2>
                    <p>{article.short_description}</p>
                    {children}
                </article>
                <span>Article</span>
                {user && (
                    <ModalBase
                        title={'Add to a board'}
                        renderButton={openModal => (
                            <Button
                                onClick={openModal}
                                type='button'
                                styleOverride='round-button'
                                iconName='add'
                                color='#181631'
                                aria_label='add'
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
                                        styleOverride={'orange-button'}
                                        type='submit'
                                        full={true}
                                        aria_label='create'
                                    >
                                        Create
                                    </Button>
                                </Fieldset>
                                <Fieldset>
                                    <Legend>
                                        Add to an existing board
                                    </Legend>
                                    <Tags
                                        tags={boardNames}
                                        styleOverride={'tag-ultraviolet-button'}
                                        onClick={() => {
                                            toast.success('Adding results to a board does not work in the prototype.')
                                            closeModal()
                                        }}
                                    />
                                </Fieldset>
                            </Form>
                        )}
                    />
                )}
            </div>
        )
    }

    private getClassName() {
        const { className, full } = this.props

        return classnames('Article', {
            'Button--full': full === true,
        }, className)
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
