import React from 'react'
import classnames from 'classnames'

interface Props {
    htmlFor?: string
    className?: string
}

export class Label extends React.Component<Props> {
    public render() {
        const { htmlFor, children } = this.props

        return (
            <label className={this.getClassName()} htmlFor={htmlFor}>
                {children}
            </label>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Label', {}, className)
    }
}
