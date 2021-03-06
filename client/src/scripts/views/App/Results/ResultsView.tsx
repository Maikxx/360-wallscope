
import React from 'react'
import { View } from '../../../components/View/View'
import { Header } from '../../../components/Header/Header'
import { SearchQuery } from '../../../components/SearchQuery/SearchQuery'
import { Accordion } from '../../../components/Accordion/Accordion'
import { MenuBottom } from '../../../components/MenuBottom/MenuBottom'
import { RouteComponentProps } from 'react-router'
import { Articles } from '../../../components/Articles/Articles'
import { Data } from '../../../components/Data/Data'
import { Tags } from '../../../components/Tags/Tags'
import { getBoardsForCurrentUser } from '../../../services/BoardService'
import { Board } from '../../../types/Board'
import { toast } from 'react-toastify'
import { CurrentUserContext, checkTokenValidity } from '../../../services/UserService'
import './ResultsView.scss'

interface Props extends RouteComponentProps {
    searchQuestion?: string
}

interface State {
    boards: Board[]
}

export class ResultsView extends React.Component<Props, State> {
    public state: State = {
        boards: [],
    }

    public async componentDidMount() {
        const token = await checkTokenValidity()

        if (token) {
            const boards = await getBoardsForCurrentUser()

            if (boards) {
                this.setState({ boards })
            }
        }
    }

    public render() {
        const { searchQuestion } = this.props
        const { boards } = this.state

        const data = [
            {
                _id: 1,
                title: 'The best time to go to the ER, according to 17,428 healthcare professionals',
                short_description: 'Patients receive the best care in the emergency room between 6 a.m. and noon, according to an exclusive poll of healthcare professionals around the world. The survey was conducted between Oct. 19 and Oct. 21 on Figure 1, a case-sharing platform used by more than 500,000 physicians, nurses, paramedics, and medical students in 173 countries.',
                content: '',
                url: 'https://figure1.com/blog/the-best-time-to-go-to-the-er-according-to-17428-healthcare-professionals/',
            },
            {
                _id: 2,
                title: 'When to go to A&E',
                short_description: 'A&E departments offer access 24 hours a day, 365 days a year. A&E staff include paramedics, A&E nurses, diagnostic radiographers, A&E reception staff, porters, healthcare assistants and emergency medicine doctors. Medical staff are highly trained in all aspects of emergency medicine.',
                content: '',
                url: 'https://www.nhs.uk/using-the-nhs/nhs-services/urgent-and-emergency-care/when-to-go-to-ae/',
            },

            {
                _id: 3,
                title: `Where's your nearest A&E and when should you go?`,
                short_description: 'Nobody likes A&E (or Accident & Emergency to use its full name), that goes without saying. Sitting for hours wondering if you’re wasting yours and everybody else’s time by being there. Sometimes though it feels like there is nothing else you can do. But when you’ve had an accident and you think it’s an emergency, checking the internet to make sure that A&E is the right destination for you is hardly something that’s on your mind.',
                content: '',
                url: 'https://www.manchestereveningnews.co.uk/news/health/when-should-i-go-ae-12434202',
            },
            {
                _id: 4,
                title: 'Deprivation and emergency admissions for cancers',
                short_description: 'The reasons for Pollock and Vickers’s findings about the relation between deprivation and emergency admissions for cancers remain speculative.1 To impute the differences in care to failures of primary care seems unfair at this stage. The authors discuss a range of possible explanations, but many other could also be relevant.',
                content: '',
                url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1114788/',
            },
            {
                _id: 5,
                title: 'Cancer diagnosed by emergency admission in England: an observational study using the general practice research database',
                short_description: 'Patients diagnosed with cancer by the emergency route often have more advanced diseases and poorer outcomes. Rates of cancer diagnosed through unplanned admissions vary within and between countries, suggesting potential inconsistencies in the quality of care. To reduce diagnoses by this route and improve patient outcomes, high risk patient groups must be identified. This cross-sectional observational study determined the incidence of first-ever diagnoses of cancer by emergency (unplanned) admission and identified patient-level risk factors for these diagnoses in England.',
                content: '',
                url: 'https://bmchealthservres.biomedcentral.com/articles/10.1186/1472-6963-13-308',
            },
            {
                _id: 6,
                title: 'Effect of social deprivation on the admission rate and outcomes of adult respiratory emergency admissions',
                short_description: 'Background: Patients with respiratory disorders constitute a major source of activity for Acute Medicine. We have examined the impact of Socio-Economic Status (SES) and weather factors on the outcomes (30-day in-hospital mortality) of emergency hospitalisations with a respiratory presentation.',
                content: '',
                url: 'https://www.researchgate.net/publication/312476720_Effect_of_social_deprivation_on_the_admission_rate_and_outcomes_of_adult_respiratory_emergency_admissions',
                dataFile: 'https://www.researchgate.net/publication/312476720_Effect_of_social_deprivation_on_the_admission_rate_and_outcomes_of_adult_respiratory_emergency_admissions/download',
            },
        ]

        const fileData = [
            {
                _id: 1,
                title: 'Cancer',
                icon_name: 'pdf',
                file_type: 'pdf',
            },
            {
                _id: 2,
                title: 'Antibiotics',
                icon_name: 'csv',
                file_type: 'csv',
            },
            {
                _id: 3,
                title: 'A&E waiting times',
                icon_name: 'tsv',
                file_type: 'tsv',
            },
            {
                _id: 4,
                title: 'Alcohol',
                icon_name: 'xml',
                file_type: 'xml',
            },
            {
                _id: 5,
                title: 'Drug abuse',
                icon_name: 'csv',
                file_type: 'csv',
            },
        ]

        const boardNames = boards.map(board => board.name)
        const query = new Array('2019', 'Oncology', 'Radiology', 'Neurology', 'ICU', 'Dermatology')

        return (
            <CurrentUserContext.Consumer>
                {user => (
                    <View>
                        <Header back={false} more={false}/>
                        <SearchQuery searchWords={searchQuestion}/>
                        <Tags
                            className='SearchQueryTags'
                            tags={query}
                            styleOverride='tag-ultraviolet-button'
                            isClickable={true}
                            onClick={() => {
                                toast.success('New results would be rendered, but not in this prototype.')
                            }}
                        />
                        <span className='Info'>Keywords that relate to your search. Click to dive deeper into the data.</span>
                        <Accordion title='Articles'>
                            <Articles
                                articles={data}
                                user={user || undefined}
                                onCreateNewBoard={this.onNewBoardAdded}
                                boardNames={boardNames}
                            />
                        </Accordion>
                        <Accordion title='Datasets'>
                            <Data
                                files={fileData}
                                boardNames={boardNames}
                                onCreateNewBoard={this.onNewBoardAdded}
                                user={user || undefined}
                            />
                        </Accordion>
                        <MenuBottom fullName={user && user.fullName} iconName='search_big'/>
                    </View>
                )}
            </CurrentUserContext.Consumer>
        )
    }

    private onNewBoardAdded = async () => {
        const boards = await getBoardsForCurrentUser()

        if (boards) {
            this.setState({ boards })
            toast.success('Successfully created a new board! Right now it is not fully working in the prototype.')
        }
    }
}
