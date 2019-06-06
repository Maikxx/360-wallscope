import React from 'react'
import { Form } from '../Form/Form'
import { Input } from '../Form/Input/Input'
import { Fieldset } from '../Form/Fieldset/Fieldset'
import { Legend } from '../Form/Legend/Legend'
import { Button } from '../Button/Button'

interface Props {}

export class SignUp extends React.Component<Props> {

    public render() {
        const formAction = {
            action: '/',
        }
        return(
        <Form formAction={formAction}>
            <Fieldset classname='Fieldset'>
                <Legend classname='Login__header' text='Login' />
                <Input input={inputs.email} />
                <Input input={inputs.password} />
                <Button styleOverride='red-button' type='submit'>Login</Button>
            </Fieldset>
        </Form>
        )
    }
}
