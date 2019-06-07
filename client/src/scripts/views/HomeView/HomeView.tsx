import { Search } from '../../components/Search/Search'
import { View } from '../../components/View/View'
import React from 'react'
import { HomeIntroduction } from '../../components/HomeIntroduction/HomeIntroduction'
interface Props {}

interface State {}

export class HomeView extends React.Component<Props, State> {
    public render() {
        return(
            <View>
                {/* insert header */}
                <HomeIntroduction />
                <Search />
                {/* insert bottom menu */}
            </View>
        )
    }
}
