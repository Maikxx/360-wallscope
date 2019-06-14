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

interface State {}

export class HomeView extends React.Component<Props, State> {
    public render() {
        const { user, onChangeSearch } = this.props

        return (
            <View>
                <Header back={false}></Header>
                <HomeIntroduction />
                <Search
                    onChangeSearch={onChangeSearch}
                    onSearch={this.onSearch}
                />
                <MenuBottom fullName={user && user.fullName}/>
            </View >
        )
    }

    private onSearch = () => {
        const { history } = this.props

        history.push(routes.App.Results.index)
    }
}
