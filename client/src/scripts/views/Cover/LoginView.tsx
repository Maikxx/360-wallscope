import { CoverView } from '../../components/CoverView/CoverView'
import { Form } from '../../components/Form/Form'
import { Fieldset } from '../../components/Form/Fieldset/Fieldset'
import { Legend } from '../../components/Form/Legend/Legend'
import { Label } from '../../components/Form/Label/Label'
import { Input } from '../../components/Form/Input/Input'
import { Button } from '../../components/Button/Button'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { onUserSignIn } from '../../services/UserService'
import { routes } from '../../routes'
import { User } from '../../types/User'

interface Props extends RouteComponentProps {
    onChangeUser: (user: User) => void
}

interface State {
    email: string
    password: string
}

export class LoginView extends React.Component<Props, State> {
    public state: State = {
        email: '',
        password: '',
    }

    public render() {
        return (
            <CoverView>
                <Form onSubmit={this.onFormSubmit}>
                    <Fieldset>
                        <Legend>
                            Login
                        </Legend>

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
                    </Fieldset>
                    <Button styleOverride='red-button' full={true} type='submit'>
                        Login
                    </Button>
                    <Button styleOverride='blue-button' full={true} type='button' onClick={() => this.props.history.push(routes.Signup.index)}>
                        Create a new account
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

        const { history, onChangeUser } = this.props
        const { ...signInData } = this.state

        const user = await onUserSignIn({ ...signInData })

        if (user) {
            onChangeUser({
                _id: user._id,
                fullName: user.full_name,
                email: user.email,
            })
            history.push(routes.App.index)
        }
    }
}
