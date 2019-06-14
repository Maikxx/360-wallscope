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
import { getCurrentUser } from '../../services/UserService'

interface Props extends RouteComponentProps {}

interface State {
    user?: User
}

export class AppView extends React.Component<Props, State> {
    public state: State = {
        user: undefined,
    }

    public async componentDidMount() {
        const user = await getCurrentUser()

        if (user) {
            this.setState({ user })
        }
    }

    public render() {
        const boards = [
            {
                _id: 0,
                name: 'Research about when it is th best time to go to A&E',
                icon_name: 'research',
                results: [
                    {
                        title: 'The best time to go to the ER, according to 17,428 healthcare professionals',
                        short_description: 'Patients receive the best care in the emergency room between 6 a.m. and noon, according to an exclusive poll of healthcare professionals around the world. The survey was conducted between Oct. 19 and Oct. 21 on Figure 1, a case-sharing platform used by more than 500,000 physicians, nurses, paramedics, and medical students in 173 countries.',
                        url: 'https://figure1.com/blog/the-best-time-to-go-to-the-er-according-to-17428-healthcare-professionals/',
                    },
                    {
                        title: 'When to go to A&E',
                        short_description: 'A&E departments offer access 24 hours a day, 365 days a year. A&E staff include paramedics, A&E nurses, diagnostic radiographers, A&E reception staff, porters, healthcare assistants and emergency medicine doctors. Medical staff are highly trained in all aspects of emergency medicine.',
                        url: 'https://www.nhs.uk/using-the-nhs/nhs-services/urgent-and-emergency-care/when-to-go-to-ae/',
                    },
                    {
                        title: `Where's your nearest A&E and when should you go?`,
                        short_description: 'Nobody likes A&E (or Accident & Emergency to use its full name), that goes without saying. Sitting for hours wondering if you’re wasting yours and everybody else’s time by being there. Sometimes though it feels like there is nothing else you can do. But when you’ve had an accident and you think it’s an emergency, checking the internet to make sure that A&E is the right destination for you is hardly something that’s on your mind.',
                        url: 'https://www.manchestereveningnews.co.uk/news/health/when-should-i-go-ae-12434202',
                    },
                ],
            },
            {
                _id: 1,
                name: 'Research about cancer admissions and deprivation',
                icon_name: 'research',
                results: [
                    {
                        title: 'Deprivation and emergency admissions for cancers',
                        short_description: 'The reasons for Pollock and Vickers’s findings about the relation between deprivation and emergency admissions for cancers remain speculative.1 To impute the differences in care to failures of primary care seems unfair at this stage. The authors discuss a range of possible explanations, but many other could also be relevant.',
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1114788/',
                    },
                    {
                        title: 'Cancer diagnosed by emergency admission in England: an observational study using the general practice research database',
                        short_description: 'Patients diagnosed with cancer by the emergency route often have more advanced diseases and poorer outcomes. Rates of cancer diagnosed through unplanned admissions vary within and between countries, suggesting potential inconsistencies in the quality of care. To reduce diagnoses by this route and improve patient outcomes, high risk patient groups must be identified. This cross-sectional observational study determined the incidence of first-ever diagnoses of cancer by emergency (unplanned) admission and identified patient-level risk factors for these diagnoses in England.',
                        url: 'https://bmchealthservres.biomedcentral.com/articles/10.1186/1472-6963-13-308',
                    },
                ],
            },
        ]

        const { user } = this.state

        const ExtendedHomeView = (props: RouteComponentProps) => <HomeView user={user} {...props}/>
        const ExtendedCurrentUserView = (props: RouteComponentProps) => <CurrentUserView onChangeUser={this.onChangeUser} {...props}/>
        const ExtendedLogInView = (props: RouteComponentProps) => <LoginView onChangeUser={this.onChangeUser} {...props}/>
        const ExtendedSignUpView = (props: RouteComponentProps) => <SignUpView onChangeUser={this.onChangeUser} {...props}/>

        return (
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
                    <Route path={routes.Login.index} component={ExtendedLogInView}/>
                    <Route path={routes.Signup.index} component={ExtendedSignUpView}/>
                </Switch>
            </View>
        )
    }

    private onChangeUser = (user: User) => {
        this.setState({ user })
    }
}
