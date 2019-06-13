import React from 'react'
import { Form } from '../Form/Form'
import { Button } from '../Button/Button'
import { Input } from '../Form/Input/Input'
import { Icon } from '../Icon/Icon'
import './Search.scss'

interface Props {
    placeholder ?: string,
}

interface State {}

export class Search extends React.Component<Props, State> {
    public render() {
        const { placeholder } = this.props
        return (
            <Form action={'/'} className={'Form--search'}>
                <div>
                    <Input type={'text'} name={'search'} placeholder={placeholder} styleOverride={'input-search'} />
                    <Icon className={'Icon--search'} iconName={'search_small'} />
                </div>
                <Button styleOverride={'red-button'} type='button' full>Start Searching</Button>
            </Form>
        )
    }
}
