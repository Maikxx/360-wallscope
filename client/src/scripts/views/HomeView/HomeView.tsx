import { Search } from '../../components/Search/Search'
import { View } from '../../components/View/View'
import React from 'react'
import { HomeIntroduction } from '../../components/HomeIntroduction/HomeIntroduction'
import { MenuBottom } from '../../components/MenuBottom/MenuBottom'
import { User } from '../../types/User'
import { Header } from '../../components/Header/Header'
import { RouteComponentProps } from 'react-router'
import { routes } from '../../routes'

interface Props extends RouteComponentProps {
    onChangeSearch: (searchQuestion: string) => void
}

interface Props {
    user?: User
}

export class HomeView extends React.Component<Props> {
    public render() {
        const { user } = this.props

        return (
            <View>
                <Header back={false}></Header>
                <HomeIntroduction />
                <Search onSearch={this.onSearch}/>
                <MenuBottom fullName={user && user.fullName} iconName='search_big'/>
            </View >
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
