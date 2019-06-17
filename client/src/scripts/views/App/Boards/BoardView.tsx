import * as React from 'react'
import { View } from '../../../components/View/View'
import { RouteComponentProps } from 'react-router'
import { User } from '../../../types/User'
import { Header } from '../../../components/Header/Header'
import { MenuBottom } from '../../../components/MenuBottom/MenuBottom'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { capitalize } from '../../../utils/capitalize'

export interface BoardViewRouteParams {
    id: string
}

interface Props extends RouteComponentProps<BoardViewRouteParams> {
    user?: User
}

export class BoardView extends React.Component<Props> {
    public render() {
        const { user } = this.props

        const data = [
            {
                _id: 0,
                name: 'Waiting times ',
                icon_name: 'clock',
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
                name: 'Research',
                icon_name: 'search',
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
                    {
                        title: 'Effect of social deprivation on the admission rate and outcomes of adult respiratory emergency admissions',
                        short_description: 'Background: Patients with respiratory disorders constitute a major source of activity for Acute Medicine. We have examined the impact of Socio-Economic Status (SES) and weather factors on the outcomes (30-day in-hospital mortality) of emergency hospitalisations with a respiratory presentation.',
                        url: 'https://www.researchgate.net/publication/312476720_Effect_of_social_deprivation_on_the_admission_rate_and_outcomes_of_adult_respiratory_emergency_admissions',
                        dataFile: 'https://www.researchgate.net/publication/312476720_Effect_of_social_deprivation_on_the_admission_rate_and_outcomes_of_adult_respiratory_emergency_admissions/download',
                    },
                ],
            },
            {
                _id: 1,
                name: 'Favorites',
                icon_name: 'star',
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
                    {
                        title: 'Effect of social deprivation on the admission rate and outcomes of adult respiratory emergency admissions',
                        short_description: 'Background: Patients with respiratory disorders constitute a major source of activity for Acute Medicine. We have examined the impact of Socio-Economic Status (SES) and weather factors on the outcomes (30-day in-hospital mortality) of emergency hospitalisations with a respiratory presentation.',
                        url: 'https://www.researchgate.net/publication/312476720_Effect_of_social_deprivation_on_the_admission_rate_and_outcomes_of_adult_respiratory_emergency_admissions',
                        dataFile: 'https://www.researchgate.net/publication/312476720_Effect_of_social_deprivation_on_the_admission_rate_and_outcomes_of_adult_respiratory_emergency_admissions/download',
                    },
                ],
            },
        ]

        const { id } = this.props.match.params
        const board = data.find(board => board._id === Number(id))

        if (!user || !board) {
            return 'Loading...'
        }

        return (
            <View>
                <Header back={false}/>
                <PageTitle>Board: {capitalize(board.name)}</PageTitle>
                <MenuBottom fullName={user.fullName}/>
            </View>
        )
    }
}
