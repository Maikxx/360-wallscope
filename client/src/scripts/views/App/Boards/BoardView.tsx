import * as React from 'react'
import { View } from '../../../components/View/View'
import { RouteComponentProps } from 'react-router'
import { User } from '../../../types/User'
import { Header } from '../../../components/Header/Header'
import { MenuBottom } from '../../../components/MenuBottom/MenuBottom'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { capitalize } from '../../../utils/capitalize'
import { getBoardById } from '../../../services/BoardService'
import { Board } from '../../../types/Board'

export interface BoardViewRouteParams {
    id: string
}

interface Props extends RouteComponentProps<BoardViewRouteParams> {
    user?: User
}

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
        const { user } = this.props
        const { board } = this.state

        if (!user || !board) {
            return 'Loading...'
        }

        return (
            <View>
                <Header back={false}/>
                <PageTitle>Board: {capitalize(board.name)}</PageTitle>
                <MenuBottom fullName={user.fullName}/>
            </View>
        )
    }
}
