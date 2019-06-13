import * as React from 'react'
import classnames from 'classnames'
import './Article.scss'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    full?: boolean
    title?: string
    summary?: string
}

export class Article extends React.Component<Props> {
    public render() {
        const { children, className, full, title, summary, ...restProps } = this.props

        return (
            <article className={this.getClassName()} {...restProps}>
                <h2>{title}</h2>
                <p>{summary}</p>
            </article>
        )
    }

    private getClassName() {
        const { className, full } = this.props

        return classnames('Article', {
            'Button--full': full === true,
        }, className)
    }
}
