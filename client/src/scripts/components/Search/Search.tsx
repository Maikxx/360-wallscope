import React from 'react'
import { Form } from '../Form/Form'
import { Button } from '../Button/Button'
import { Input } from '../Form/Input/Input'
import { Icon } from '../Icon/Icon'
import './Search.scss'

interface Props {
    placeholder?: string
    onSearch: (value: string) => void
}

export class Search extends React.Component<Props> {
    public render() {
        const { placeholder } = this.props

        return (
            <Form onSubmit={this.onSearch} className={'SearchForm'}>
                <div className={`SearchForm__wrapper`}>
                    <Input
                        type={'text'}
                        className={`SearchForm__input`}
                        name={'search'}
                        placeholder={placeholder}
                        styleOverride={'input-search'}
                    />
                    <Icon className={'SearchForm__search-icon'} iconName={'search_small'} />
                </div>
                <Button styleOverride={'ultraviolet-button'} type='submit' full={true}>
                    Start Searching
                </Button>
            </Form>
        )
    }

    private onSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { onSearch } = this.props

        const inputElement = document.querySelector('.SearchForm__input')

        if (inputElement) {
            onSearch((inputElement as HTMLInputElement).value)
        }
    }
}
