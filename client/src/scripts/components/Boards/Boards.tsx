import React from 'react'
import classnames from 'classnames'
import './Boards.scss'
import { Board as BoardType } from '../../types/Board'
import { Board } from './Board/Board'
import { SearchOnInput } from '../Search/SearchOnInput'
import { getBoardsForCurrentUser } from '../../services/BoardService'

interface Props {
    className?: string
    boards: BoardType[]
}

export class Boards extends React.Component<Props> {
    public render() {
        const { boards } = this.props

        return (
            <section className={this.getClassName()}>
                <header className={`Boards__header`}>
                    <SearchOnInput
                        name={`boardName`}
                        type={`text`}
                        onSearch={this.onSearch}
                    />
                </header>
                <ul className={'Boards__list'}>
                    {boards && boards.length > 0 && boards.map((board, i) => (
                        <li key={i} className={`Boards__list-item`}>
                            <Board board={board}/>
                        </li>
                    ))}
                </ul>
            </section>
        )
    }

    private onSearch = async (value: string) => {
        const boards = await getBoardsForCurrentUser(value)
        console.log(boards)
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Boards', {}, className)
    }
}
