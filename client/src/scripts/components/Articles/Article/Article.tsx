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

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    full?: boolean
    title?: string
    summary?: string
    boardNames?: string[] | undefined
}

export class Article extends React.Component<Props> {
    public render() {
        const { children, className, full, boardNames, title, summary, ...restProps } = this.props

        return (
            <div className='ArticleWrapper'>
                <article className={this.getClassName()} {...restProps}>
                    <h2>{title}</h2>
                    <p>{summary}</p>
                    {children}
                </article>
                <ModalBase
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
                            <Button styleOverride={'red-button'} type='button' full>Add</Button>
                        </Fieldset>
                        <Fieldset>
                            <Label>Add to an existing board</Label>
                                <Tags tags={boardNames} styleOverride={'tag-red-button'}/>
                        </Fieldset>
                    </Form>
                </ModalBase>
            </div>
        )
    }

    private getClassName() {
        const { className, full } = this.props

        return classnames('Article', {
            'Button--full': full === true,
        }, className)
    }
}
