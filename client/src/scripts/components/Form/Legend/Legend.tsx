import React from 'react'
import classnames from 'classnames'
import './Legend.scss'

interface Props {
    className?: string
}

export class Legend extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <legend className={this.getClassName()}>
                {children}
            </legend>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Legend', {}, className)
    }
}
