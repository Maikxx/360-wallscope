import { CoverView } from '../../components/CoverView/CoverView'
import { Form } from '../../components/Form/Form'
import { Fieldset } from '../../components/Form/Fieldset/Fieldset'
import { Legend } from '../../components/Form/Legend/Legend'
import { Label } from '../../components/Form/Label/Label'
import { Input } from '../../components/Form/Input/Input'
import { Button } from '../../components/Button/Button'
import React from 'react'

interface Props {}

interface State {}

export class LoginView extends React.Component<Props, State> {
    public render() {
        return (
            <CoverView>
                <Form>
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
                            required={true}
                            placeholder={'example@gmail.com'}
                        />

                        <Label htmlFor={'password'}>
                            Password
                        </Label>
                        <Input
                            type={'password'}
                            name={'password'}
                            required={true}
                            placeholder={'Strongpassword1!'}
                        />
                    </Fieldset>
                    <Button styleOverride='red-button' type='submit'>
                        Login
                    </Button>
                </Form>
            </CoverView>
        )
    }
}
