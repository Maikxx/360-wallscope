import { Search } from '../../components/Search/Search'
import { View } from '../../components/View/View'
import React from 'react'
import { HomeIntroduction } from '../../components/HomeIntroduction/HomeIntroduction'
import { MenuBottom } from '../../components/MenuBottom/MenuBottom'
import { Header } from '../../components/Header/Header'
import { RouteComponentProps } from 'react-router'
import { routes } from '../../routes'
import { CurrentUserContext } from '../../services/UserService'

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
