import * as React from 'react'
import { View } from '../../components/View/View'
import { RouteComponentProps, Switch, Route } from 'react-router'
import { routes } from '../../routes'
import { HomeView } from '../HomeView/HomeView'
import { LoginView } from '../Cover/LoginView'
import { SignUpView } from '../Cover/SignUpView'
import { User } from '../../types/User'
import { ToastContainer } from 'react-toastify'
import { CurrentUserView } from './User/CurrentUserView'
import { getCurrentUser, CurrentUserContext } from '../../services/UserService'
import { BoardsView } from './Boards/BoardsView'
import { ResultsView } from './Results/ResultsView'
import { BoardView } from './Boards/BoardView'

interface Props extends RouteComponentProps {}

interface State {
    user?: User
    searchQuestion?: string
}

export class AppView extends React.Component<Props, State> {
    public state: State = {
        user: undefined,
        searchQuestion: undefined,
    }

    public async componentDidMount() {
        const user = await getCurrentUser()

        if (user) {
            this.setState({ user })
        }
    }

    public render() {
        const { user, searchQuestion } = this.state

        const ExtendedHomeView = (props: RouteComponentProps) => <HomeView onChangeSearch={this.onChangeSearch} {...props}/>
        const ExtendedResultsView = (props: RouteComponentProps) => <ResultsView searchQuestion={searchQuestion} {...props}/>
        const ExtendedCurrentUserView = (props: RouteComponentProps) => <CurrentUserView onChangeUser={this.onChangeUser} {...props}/>
        const ExtendedLogInView = (props: RouteComponentProps) => <LoginView onChangeUser={this.onChangeUser} {...props}/>
        const ExtendedSignUpView = (props: RouteComponentProps) => <SignUpView onChangeUser={this.onChangeUser} {...props}/>

        return (
            <CurrentUserContext.Provider value={user || null}>
                <View className={`AppView`}>
                    <ToastContainer
                        position='bottom-right'
                        className='toast-container'
                        autoClose={5000}
                        hideProgressBar={true}
                    />
                    <Switch>
                        <Route path={routes.App.index} exact={true} component={ExtendedHomeView}/>
                        <Route path={routes.App.CurrentUser.index} exact={true} component={ExtendedCurrentUserView}/>
                        <Route path={routes.App.Boards.index} exact={true} component={BoardsView}/>
                        <Route path={routes.App.Boards.detail} component={BoardView}/>
                        <Route path={routes.App.Results.index} exact={true} component={ExtendedResultsView}/>
                        <Route path={routes.Login.index} component={ExtendedLogInView}/>
                        <Route path={routes.Signup.index} component={ExtendedSignUpView}/>
                    </Switch>
                </View>
            </CurrentUserContext.Provider>
        )
    }

    private onChangeUser = (user: User) => {
        this.setState({ user })
    }

    private onChangeSearch = (searchQuestion: string) => {
        this.setState({ searchQuestion })
    }
}
