import * as React from 'react'
import { View } from '../../components/View/View'
import { RouteComponentProps, Switch, Route } from 'react-router'
import { routes } from '../../routes'
import { HomeView } from '../HomeView/HomeView'
import { LoginView } from '../Cover/LoginView'
import { SignUpView } from '../Cover/SignUpView'
import { User } from '../../types/User'
import { ToastContainer } from 'react-toastify'

interface Props extends RouteComponentProps {}

interface State {
    user?: User
}

export class AppView extends React.Component<Props, State> {
    public state: State = {
        user: undefined,
    }

    public render() {
        const { user } = this.state

        const ExtendedHomeView = (props: RouteComponentProps) => <HomeView user={user} {...props}/>
        const ExtendedLogInView = (props: RouteComponentProps) => <LoginView onChangeUser={this.onChangeUser} {...props}/>
        const ExtendedSignUpView = (props: RouteComponentProps) => <SignUpView onChangeUser={this.onChangeUser} {...props}/>

        return (
            <View className={`AppView`}>
                <ToastContainer position={'bottom-right'} />
                <Switch>
                    <Route path={routes.App.index} exact={true} component={ExtendedHomeView}/>
                    <Route path={routes.Login.index} component={ExtendedLogInView}/>
                    <Route path={routes.Signup.index} component={ExtendedSignUpView}/>
                </Switch>
            </View>
        )
    }

    private onChangeUser = (user: User) => {
        this.setState({ user: user })
    }
}
