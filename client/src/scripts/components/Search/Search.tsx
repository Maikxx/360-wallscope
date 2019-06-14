import React from 'react'
import { Form } from '../Form/Form'
import { Button } from '../Button/Button'
import { Input } from '../Form/Input/Input'
import { Icon } from '../Icon/Icon'
import './Search.scss'

interface Props {
    placeholder?: string
    onChangeSearch: (searchQuestion: string) => void
    onSearch: () => void
}

interface State {}

export class Search extends React.Component<Props, State> {
    public render() {
        const { placeholder } = this.props
        return (
            <Form onSubmit={this.onSearch} className={'Form--search'}>
                <div>
                    <Input
                        type={'text'}
                        name={'search'}
                        onChange={this.onChangeSearch}
                        placeholder={placeholder}
                        styleOverride={'input-search'}
                    />
                    <Icon className={'Icon--search'} iconName={'search_small'} />
                </div>
                <Button styleOverride={'red-button'} type='submit' full>Start Searching</Button>
            </Form>
        )
    }

    private onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onChangeSearch } = this.props

        onChangeSearch(event.target.value)
    }

    private onSearch = (event: React.FormEvent<HTMLFormElement>) => {
        const { onSearch } = this.props

        onSearch()
    }
}
