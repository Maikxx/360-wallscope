
import React from 'react'
import { View } from '../../../components/View/View'
import { User } from '../../../types/User'
import { Header } from '../../../components/Header/Header'
import { SearchQuery } from '../../../components/SearchQuery/SearchQuery'
import { Accordion } from '../../../components/Accordion/Accordion'
import { Article } from '../../../components/Articles/Article/Article'
import { RawData } from '../../../components/RawData/RawData'
import { MenuBottom } from '../../../components/MenuBottom/MenuBottom'
import { RouteComponentProps } from 'react-router'

interface Props extends RouteComponentProps {
    user?: User
    searchQuestion?: string
}

export class ResultsView extends React.Component<Props> {
    public render() {
        const { user, searchQuestion } = this.props

        const boardNames = new Array('Antibiotics', 'Schoolpaper', 'Hospitals', 'Antibiotics', 'Schoolpaper', 'Hospitals')
        const tags = new Array('Location', 'A&E', 'Time')

        return (
            <View>
                <Header back={false}></Header>
                <SearchQuery
                    searchWords={searchQuestion}
                    tags={tags}
                />

                <Accordion title='Articles'>
                    <Article
                        title='Antibiotics'
                        summary='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada ante tincidunt justo condimentum mollis.'
                        boardNames={boardNames}
                    />
                    <Article
                        title='Antibiotics'
                        summary='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada ante tincidunt justo condimentum mollis.'
                        boardNames={boardNames}
                    />
                    <Article
                        title='Antibiotics'
                        summary='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada ante tincidunt justo condimentum mollis.'
                        boardNames={boardNames}
                    />
                    <Article
                        title='Antibiotics'
                        summary='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada ante tincidunt justo condimentum mollis.'
                        boardNames={boardNames}
                    />
                    <Article
                        title='Antibiotics'
                        summary='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada ante tincidunt justo condimentum mollis.'
                        boardNames={boardNames}
                    />
                </Accordion>
                <Accordion title='Raw data'>
                    <RawData fileTypes='pdf' iconName='pdf'/>
                    <RawData fileTypes='pdf' iconName='pdf'/>
                    <RawData fileTypes='pdf' iconName='pdf'/>
                    <RawData fileTypes='pdf' iconName='pdf'/>
                </Accordion>
                <MenuBottom fullName={user && user.fullName}/>
            </View >
        )
    }
}
