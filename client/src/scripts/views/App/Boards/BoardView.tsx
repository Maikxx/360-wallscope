import * as React from 'react'
import { View } from '../../../components/View/View'
import { RouteComponentProps } from 'react-router'
import { Header } from '../../../components/Header/Header'
import { MenuBottom } from '../../../components/MenuBottom/MenuBottom'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { capitalize } from '../../../utils/capitalize'
import { getBoardById } from '../../../services/BoardService'
import { Board } from '../../../types/Board'
import { routes } from '../../../routes'
import { CurrentUserContext } from '../../../services/UserService'

export interface BoardViewRouteParams {
    id: string
}

interface Props extends RouteComponentProps<BoardViewRouteParams> {}

interface State {
    board: Board | null
}

export class BoardView extends React.Component<Props, State> {

    public state: State = {
        board: null,
    }

    public async componentDidMount() {
        const { id } = this.props.match.params
        const board = await getBoardById(Number(id))

        if (board) {
            this.setState({ board })
        }
    }

    public render() {
        const { board } = this.state

        return (
            <CurrentUserContext.Consumer>
                {user => {
                    if (!user || !board) {
                        return null
                    }

                    return (
                        <View>
                            <Header back={true} route={routes.App.Boards.index} more={false}/>
                            <PageTitle>Board: {capitalize(board.name)}</PageTitle>
                            <MenuBottom fullName={user.fullName} iconName='pen'/>
                        </View>
                    )
                }}
            </CurrentUserContext.Consumer>
        )
    }
}
