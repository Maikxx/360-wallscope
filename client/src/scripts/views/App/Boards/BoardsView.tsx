import * as React from 'react'
import { View } from '../../../components/View/View'
import { RouteComponentProps } from 'react-router'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { Header } from '../../../components/Header/Header'
import { MenuBottom } from '../../../components/MenuBottom/MenuBottom'
import { Boards } from '../../../components/Boards/Boards'
import { getBoardsForCurrentUser } from '../../../services/BoardService'
import { Board } from '../../../types/Board'
import { CurrentUserContext } from '../../../services/UserService'

interface Props extends RouteComponentProps {}

interface State {
    boards: Board[]
}

export class BoardsView extends React.Component<Props, State> {
    public state: State = {
        boards: [],
    }

    public async componentDidMount() {
        const boards = await getBoardsForCurrentUser()

        if (boards && boards.length > 0) {
            this.setState({ boards })
        }
    }

    public render() {
        const { history } = this.props
        const { boards } = this.state

        return (
            <CurrentUserContext.Consumer>
                {user => {
                    if (!user) {
                        return null
                    }

                    return (
                        <View>
                            <Header
                                back={false}
                                more={true}
                                onCreateNewBoard={(id: number) => history.push(`/boards/${id}`)}
                            />
                            <PageTitle>Boards</PageTitle>
                            <Boards boards={boards} />
                            <MenuBottom
                                fullName={user.fullName}
                                iconName='search_big'
                            />
                        </View>
                    )
                }}
            </CurrentUserContext.Consumer>
        )
    }
}
