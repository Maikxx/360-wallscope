import * as React from 'react'
import classnames from 'classnames'
import { Article } from './Article/Article'
import './Articles.scss'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    full?: boolean
    title?: string
    summary?: string
    boardNames?: string[]
    identifiers?: any[]
}

export class Articles extends React.Component<Props> {
    public render() {
        const { boardNames, title, summary, identifiers } = this.props

        return (
            <ul className={this.getClassName()}>
                {identifiers && identifiers.map(id => (
                    <li key={id}>
                        <Article
                            title={title}
                            summary={summary}
                            boardNames={boardNames}
                        />
                    </li>
                ))}
            </ul>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Articles', { }, className)
    }
}
