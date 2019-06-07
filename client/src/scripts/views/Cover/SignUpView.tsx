import { CoverView } from '../../components/CoverView/CoverView'
import { Form } from '../../components/Form/Form'
import { Fieldset } from '../../components/Form/Fieldset/Fieldset'
import { Legend } from '../../components/Form/Legend/Legend'
import { Label } from '../../components/Form/Label/Label'
import { Input } from '../../components/Form/Input/Input'
import { Button } from '../../components/Button/Button'
import React from 'react'
import { onUserSignUp } from '../../services/UserService'
import { RouteComponentProps } from 'react-router'

interface Props extends RouteComponentProps {}

interface State {
    fullName: string
    email: string
    password: string
    repeatPassword: string
}

export class SignUpView extends React.Component<Props, State> {
    public state: State = {
        fullName: '',
        email: '',
        password: '',
        repeatPassword: '',
    }

    public render() {
        return (
            <CoverView>
                <Form onSubmit={this.onFormSubmit}>
                    <Fieldset>
                        <Legend>
                            Sign up
                        </Legend>

                        <Label htmlFor={'fullName'}>
                            Full name
                        </Label>
                        <Input
                            type={'text'}
                            onChange={this.onChangeInputValue}
                            name={'fullName'}
                            required={true}
                            placeholder={'John Doe'}
                        />

                        <Label htmlFor={'email'}>
                            Email
                        </Label>
                        <Input
                            type={'email'}
                            name={'email'}
                            onChange={this.onChangeInputValue}
                            required={true}
                            placeholder={'example@gmail.com'}
                        />

                        <Label htmlFor={'password'}>
                            Password
                        </Label>
                        <Input
                            type={'password'}
                            name={'password'}
                            onChange={this.onChangeInputValue}
                            required={true}
                            placeholder={'Strongpassword1!'}
                        />

                        <Label htmlFor={'repeatPassword'}>
                            Repeat password
                        </Label>
                        <Input
                            type={'password'}
                            name={'repeatPassword'}
                            onChange={this.onChangeInputValue}
                            required={true}
                            placeholder={'Strongpassword1!'}
                        />
                    </Fieldset>
                    <Button styleOverride='red-button' type='submit' full={true}>
                        Sign up
                    </Button>
                </Form>
            </CoverView>
        )
    }

    private onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event

        if (target && target.name) {
            this.setState({ [target.name]: target.value || '' } as any)
        }
    }

    private onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { history } = this.props
        const { ...signUpData } = this.state

        const data = await onUserSignUp({ ...signUpData })

        if (data) {
            history.push('/dashboard')
        }
    }
}
