import React from 'react'
import { Form } from '../Form/Form'
import { Input } from '../Form/Input/Input'
import { Fieldset } from '../Form/Fieldset/Fieldset'
import { Legend } from '../Form/Legend/Legend'
import './Login.scss'

interface Props {}

interface State {}

export class Login extends React.Component<Props, State> {
    public render() {
        const inputs = {
            email: {
                type: 'email',
                id: 'email-login',
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
                id: 'password-login',
                required: true,
                placeholder: 'Password',
                classname: 'Fieldset__input',
                label: {
                    text: 'Password',
                    classname: 'Fieldset__label',
                },
            },
            submit: {
                type: 'submit',
                value: 'Login',
                classname: 'Fieldset__submit input--login',
            },
        }
        const formAction = {
            action: '/',
        }
        return (
            <div className='Login'>
                <Form formAction={formAction}>
                    <Fieldset classname='Fieldset'>
                        <Legend classname='Login__header' text='Login' />
                        <Input input={inputs.email} />
                        <Input input={inputs.password} />
                        <Input input={inputs.submit} />
                    </Fieldset>
                </Form>
            </div>
        )
    }
}
