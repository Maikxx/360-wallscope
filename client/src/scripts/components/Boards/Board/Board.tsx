import * as React from 'react'
import classnames from 'classnames'
import { Icon } from '../../Icon/Icon'
import './Board.scss'
import { Link } from 'react-router-dom'

interface Props {
    board?: any
    className?: string
    color?: string
    articles?: number
    data?: number
}

export class Board extends React.Component<Props> {
    public render() {
        const { color, board, articles, data } = this.props

        return (
            <React.Fragment>
            <div className='back-board'>
                <span>Articles:{articles}</span>
                <span>Data:{data}</span>
            </div>
            <article className={this.getClassName()}>
                <Link to={`/boards/${board._id}`}>
                    {board.icon_name &&
                        <Icon iconName={board.icon_name} color={color} />
                    }
                    <h2 className={`Board__title`}>{board.name}</h2>
                </Link>
            </article>
            </React.Fragment>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Board', {}, className)
    }
}
