import * as React from 'react'
import classnames from 'classnames'
import { Icon } from '../../Icon/Icon'
import { Board as BoardType } from '../../../types/Board'
import './Board.scss'
import { CurrentUserContext } from '../../../services/UserService'

interface Props {
    board: BoardType
    className?: string
    color?: string
}

export class Board extends React.Component<Props> {
    public render() {
        const { color, board } = this.props

        return (
            <CurrentUserContext.Consumer>
                {user => {
                    if (!user) {
                        return null
                    }

                    return (
                        <a href={`https://wallscope.thunderchicken.nl/?fullname=${user.fullName}`}>
                            <div className='Back-board'>
                                <span>Articles: {Math.floor(Math.random() * 20)}</span>
                                <span>Data: {Math.floor(Math.random() * 20)}</span>
                            </div>
                            <article className={this.getClassName()}>
                                {board.icon_name && (
                                    <Icon iconName={board.icon_name as any} color={color} />
                                )}
                                <h2 className={`Board__title`}>
                                    {board.name}
                                </h2>
                            </article>
                        </a>
                    )
                }}
            </CurrentUserContext.Consumer>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Board', {}, className)
    }
}
