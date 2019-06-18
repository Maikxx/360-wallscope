import * as React from 'react'
import { View } from '../../../components/View/View'
import { RouteComponentProps } from 'react-router'
import { Header } from '../../../components/Header/Header'
import { MenuBottom } from '../../../components/MenuBottom/MenuBottom'
import { getCurrentUser, logout, onEditUser } from '../../../services/UserService'
import { User } from '../../../types/User'
import { Form } from '../../../components/Form/Form'
import { Fieldset } from '../../../components/Form/Fieldset/Fieldset'
import { Legend } from '../../../components/Form/Legend/Legend'
import { Label } from '../../../components/Form/Label/Label'
import { Input } from '../../../components/Form/Input/Input'
import { Button } from '../../../components/Button/Button'
import { routes } from '../../../routes'

interface Props extends RouteComponentProps {
    onChangeUser: (user: User) => void
}

interface State {
    user?: User
    loading?: boolean
    email?: string | null
    fullName?: string | null
}

export class CurrentUserView extends React.Component<Props, State> {
    public state: State = {
        user: undefined,
        loading: true,
        email: null,
        fullName: null,
    }

    public async componentDidMount() {
        const { history } = this.props
        const user = await getCurrentUser()

        if (!user) {
            history.push('/login')
        } else {
            this.setState({ user, loading: false, email: user.email, fullName: user.fullName })
        }
    }

    public render() {
        const { user, loading } = this.state

        return (
            <View>
                <Header back={false}/>
                {loading && 'Loading...'}
                {(user && !loading) && (
                    <Form onSubmit={this.onFormSubmit}>
                        <Fieldset>
                            <Legend>
                                User profile
                            </Legend>

                            <Label htmlFor={'fullName'}>
                                Full name
                            </Label>
                            <Input
                                type={'text'}
                                name={'fullName'}
                                defaultValue={user.fullName}
                                onChange={this.onChangeInputValue}
                                required={true}
                            />

                            <Label htmlFor={'email'}>
                                Email
                            </Label>
                            <Input
                                type={'email'}
                                name={'email'}
                                defaultValue={user.email}
                                onChange={this.onChangeInputValue}
                                required={true}
                            />
                        </Fieldset>
                        <div className='Row'>
                            <Button full={true} styleOverride='red-button' type='button' onClick={() => this.props.history.push(routes.App.index)}>
                                Cancel
                            </Button>
                            <Button styleOverride='red-button' type='submit' className='SecondButton'>
                                Update profile
                            </Button>
                        </div>
                        <Button full={true} styleOverride='blue-button' type='button' onClick={this.onLogOut}>
                            Log out
                        </Button>
                    </Form>
                )}
                <MenuBottom fullName={user && user.fullName}/>
            </View>
        )
    }

    private onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event

        if (target && target.name) {
            this.setState({ [target.name]: target.value || '' } as any)
        }
    }

    private onLogOut = () => {
        logout()

        if (window.location) {
            window.location.replace(routes.App.index)
        }
    }

    private onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { history, onChangeUser } = this.props
        const { email, fullName, user } = this.state

        if (user && fullName && email) {
            const updatedUser = await onEditUser({ email, fullName, id: (user as User)._id })

            if (updatedUser) {
                onChangeUser(updatedUser)
                history.push(routes.App.index)
            }
        }

    }
}
