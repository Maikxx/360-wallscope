import React from 'react'
import { Form } from '../../components/Form/Form'
import { Input } from '../../components/Form/Input/Input'

interface Props {}

interface State {}

export class Home extends React.Component<Props, State> {
    public render() {
        return(
            <Form action={'/'}>
                <Input type={'text'} name={'search'} />
            </Form>
        )
    }
}
