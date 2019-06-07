import React from 'react'
import { Search } from '../../components/Search/Search'
import { CoverView } from '../../components/CoverView/CoverView'
interface Props {}

interface State {}

export class Home extends React.Component<Props, State> {
    public render() {
        return(
            <CoverView>
                {/* insert header */}
                <div>
                    <h1>Hi there,</h1>
                    <h2>What are you looking for?</h2>
                </div>
                <Search />
                {/* insert bottom menu */}
            </CoverView>
        )
    }
}
