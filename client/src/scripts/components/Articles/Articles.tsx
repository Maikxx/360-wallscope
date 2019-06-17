import * as React from 'react'
import classnames from 'classnames'
import { Article } from './Article/Article'
import './Articles.scss'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    full?: boolean
    boardNames?: string[]
}

interface ArticleType {
    _id: number
    title: string | null
    short_description: string | null
    content: string | null
    url?: string | null
    dataFile?: string | null
}

interface Props {
    className?: string
    articles?: ArticleType[]
}

export class Articles extends React.Component<Props> {
    public render() {
        const { boardNames, articles } = this.props

        return (
            <ul className={this.getClassName()}>
                {articles && articles.map(article => (
                    <li key={article._id}>
                        <Article
                            article={article}
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
