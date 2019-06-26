import * as React from 'react'
import classnames from 'classnames'
import './SearchQuery.scss'
import { Form } from '../Form/Form'
import { Button } from '../Button/Button'
import { TextArea } from '../Form/TextArea/TextArea'
import { toast } from 'react-toastify'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLDivElement>
    title?: string
    searchWords?: string
}

export class SearchQuery extends React.Component<Props> {
    public render() {
        const { children, className, searchWords, title, ...restProps } = this.props

        return (
            <div className={this.getClassName()} {...restProps}>
                <Form onSubmit={this.onSubmit} className={'SearchQuery__form'}>
                    <TextArea
                        name='search'
                        className={`SearchQuery__input`}
                        placeholder={searchWords}
                        defaultValue={searchWords}
                        aria-label='search input'
                    />
                    <Button
                        className={`SearchQuery__button`}
                        styleOverride='search-button'
                        type='submit'
                        iconName='search_small'
                        color='#ffffff'
                        aria_label='search'
                    />
                </Form>
            </div >
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('SearchQuery', {}, className)
    }

    private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        toast.warning(`The data served is static, so changing this won't affect the results in the prototype.`)
    }
}
