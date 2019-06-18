import * as React from 'react'
import classnames from 'classnames'
import './SearchQuery.scss'
import { Tags } from '../Tags/Tags'
import { Form } from '../Form/Form'
import { Button } from '../Button/Button'
import { TextArea } from '../Form/TextArea/TextArea'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLDivElement>
    title?: string
    tags: string[]
    searchWords?: string
}

export class SearchQuery extends React.Component<Props> {
    public render() {
        const { children, className, searchWords, title, tags, ...restProps } = this.props

        return (
            <div className={this.getClassName()} {...restProps}>
                <Tags styleOverride={'tag-border-button'} tags={tags}/>
                <Form onSubmit={this.onSubmit} className={'SearchQuery__form'}>
                    <TextArea
                        name='search'
                        className={`SearchQuery__input`}
                        placeholder={searchWords}
                        defaultValue={searchWords}
                    />
                    <Button
                        className={`SearchQuery__button`}
                        styleOverride='search-button'
                        type='submit'
                        iconName='search_small'
                        color='#ffffff'>
                    </Button>
                </Form>
            </div >
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('SearchQuery', {}, className)
    }

    private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log('TODO')
    }
}
