import React from 'react'
import { Form } from '../../components/Form/Form'
import { Input } from '../../components/Form/Input/Input'

interface Props {}

interface State {}

export class Home extends React.Component<Props, State> {
    public render() {
        const inputs = {
            search: {
                type: 'text',
                classname: 'input--search',
            },
        }
        const formAction = {
            action: '/',
        }
        return(
            <Form formAction={formAction}>
                <Input input={inputs.search}></Input>
            </Form>
        )
    }
}
