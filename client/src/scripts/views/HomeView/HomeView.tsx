import { Search } from '../../components/Search/Search'
import { View } from '../../components/View/View'
import React from 'react'
import { HomeIntroduction } from '../../components/HomeIntroduction/HomeIntroduction'
import { MenuBottom } from '../../components/MenuBottom/MenuBottom'
import { User } from '../../types/User'

interface Props {
    user?: User
}

interface State {}

export class HomeView extends React.Component<Props, State> {
    public render() {
        const { user } = this.props

        return (
            <View>
                {/* insert header */}
                <HomeIntroduction />
                <Search />
                <MenuBottom fullName={user && user.fullName}/>
            </View>
        )
    }
}