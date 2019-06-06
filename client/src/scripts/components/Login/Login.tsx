import React from 'react'
import { Form } from '../Form/Form'
import { Input } from '../Form/Input/Input'
import { Fieldset } from '../Form/Fieldset/Fieldset'
import { Legend } from '../Form/Legend/Legend'
import { Button } from '../Button/Button'
import { Label } from '../Form/Label/Label'
import './Login.scss'

interface Props {}

export class Login extends React.Component<Props> {
    public render() {
        const formAction = '/'
        return (
            <div className='Login'>
                <Form formAction={formAction}>
                    <Fieldset className={'Fieldset'}>
                        <Legend className={'Login__header'} text={'Login'} />
                        <Label htmlFor={'email'} className={'Fieldset__label'} >Email</Label>
                        <Input type={'email'} name={'email'} required={true} placeholder={'Email'} className={'Fieldset__input'} />
                        <Label htmlFor={'password'} className={'Fieldset__label'} >Password</Label>
                        <Input type={'password'} name={'password'} required={true} className={'Fieldset__input'} placeholder={'password'}/>
                    </Fieldset>
                    <Button styleOverride='red-button' type='submit'>Login</Button>
                </Form>
            </div>
        )
    }
}
