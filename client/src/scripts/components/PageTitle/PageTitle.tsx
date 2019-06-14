import * as React from 'react'
import classnames from 'classnames'
import './PageTitle.scss'

interface Props {
    className?: string
}

export class PageTitle extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <div className={this.getClassName()}>
                {children}
            </div>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('PageTitle', {}, className)
    }
}
