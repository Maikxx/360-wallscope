import React from 'react'
import classnames from 'classnames'
import './Boards.scss'
import { Board } from './Board/Board'

interface BoardResult {
    title: string
    short_description: string
    url: string
    dataFile?: string
}

interface BoardType {
    _id: number
    name: string | null
    icon_name: string | null
    results: BoardResult[]
}

interface Props {
    className?: string
    boards?: BoardType[]
}

export class Boards extends React.Component<Props> {
    public render() {
        const { boards } = this.props

        return (
            <section className={this.getClassName()}>
                <ul className={'Boards__list'}>
                    {boards && boards.map(board => (
                        <li key={board._id} className={`Boards__list-item`}>
                            <Board board={board}/>
                        </li>
                    ))}
                </ul>
            </section>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Boards', {}, className)
    }
}
