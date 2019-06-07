import React from 'react'
import { Search } from '../../components/Search/Search'
import { CoverView } from '../../components/CoverView/CoverView'
import './Home.scss'
interface Props {}

interface State {}

export class Home extends React.Component<Props, State> {
    public render() {
        return(
            <CoverView className={'Home'}>
                {/* insert header */}
                <div className={'Home__container'}>
                    <h1 className={'Home__header'}>Hi there,</h1>
                    <h2 className={'Home__subheader'}>What are you looking for?</h2>
                </div>
                <Search />
                {/* insert bottom menu */}
            </CoverView>
        )
    }
}
