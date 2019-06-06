import './CoverView.scss'
import React from 'react'
import classnames from 'classnames'

interface Props {
    className?: string
}

export class CoverView extends React.Component<Props> {
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

        return classnames('CoverView', {}, className)
    }
}
