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
        const inputs = {
            email: {
                type: 'email',
                id: 'email-signup',
                required: true,
                placeholder: 'Email',
                classname: 'Fieldset__input',
                label: {
                    text: 'Email',
                    classname: 'Fieldset__label',
                },
            },
            password: {
                type: 'password',
                id: 'password-signup',
                required: true,
                placeholder: 'Password',
                classname: 'Fieldset__input',
                label: {
                    text: 'Password',
                    classname: 'Fieldset__label',
                },
            },
            password_repeat: {
                type: 'password',
                id: 'password-repeat-signup',
                required: true,
                placeholder: 'Repeat Password',
                classname: 'Fieldset__input',
                label: {
                    text: 'Repeat Password',
                    classname: 'Fieldset__label',
                },
            },
        }
        return(
        <Form formAction={formAction}>
            <Fieldset classname='Fieldset'>
                <Legend classname='Login__header' text='Login' />
                <Input input={inputs.email} />
                <Input input={inputs.password} />
                <Input input={inputs.password_repeat} />
                <Button styleOverride='red-button' type='submit'>Login</Button>
            </Fieldset>
        </Form>
        )
    }
}
