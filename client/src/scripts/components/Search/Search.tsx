import React from 'react'
import { Form } from '../Form/Form'
import { Button } from '../Button/Button'
import { Input } from '../Form/Input/Input'
import './Search.scss'

interface Props {
    placeholder ?: string,
}

interface State {}

export class Search extends React.Component<Props, State> {
    public render() {
        const { placeholder } = this.props
        return(
            <Form action={'/'} className={'Form--search'}>
                <Input type={'text'} name={'search'} placeholder={placeholder} styleOverride={'input-search'} />
                <Button styleOverride={'red-button'}>Start Searching</Button>
            </Form>
        )
    }
}
