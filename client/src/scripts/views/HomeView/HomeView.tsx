import { Search } from '../../components/Search/Search'
import { View } from '../../components/View/View'
import React from 'react'
import { HomeIntroduction } from '../../components/HomeIntroduction/HomeIntroduction'
import { MenuBottom } from '../../components/MenuBottom/MenuBottom'
import { Header } from '../../components/Header/Header'
import { RouteComponentProps } from 'react-router'
import { routes } from '../../routes'
import { CurrentUserContext } from '../../services/UserService'
import { Sidebar } from '../../components/SideBar/Sidebar'

interface Props extends RouteComponentProps {
    onChangeSearch: (searchQuestion: string) => void
}

interface Props extends RouteComponentProps {}

export class HomeView extends React.Component<Props> {
    public render() {
        return (
            <CurrentUserContext.Consumer>
                {user => (
                    <View>
                        <Header back={false} more={false}/>
                        <Sidebar>
                            <h1>Welcome to RAIN!</h1>
                            <p>
                                Rain is an application, where you can browse
                                through medical data from ISD Scotland.
                            </p>
                            <ol>
                                <li>Just search for information like you normally do.</li>
                                <li>To access more features create an account or log in.</li>
                                <li>Add articles or datasets to your own personal boards.</li>
                                <li>
                                    Create your own research by linking data to one another,
                                    where you think there might be any correlation.
                                </li>
                                <li>Collaborate with other users and expand your research!</li>
                            </ol>
                        </Sidebar >
                        <HomeIntroduction />
                        <Search onSearch={this.onSearch}/>
                        <MenuBottom fullName={user && user.fullName} iconName='search_big'/>
                    </View >
                )}
            </CurrentUserContext.Consumer>
        )
    }

    private onSearch = (value: string) => {
        const { history, onChangeSearch } = this.props

        if (onChangeSearch) {
            onChangeSearch(value)
        }

        history.push(routes.App.Results.index)
    }
}
