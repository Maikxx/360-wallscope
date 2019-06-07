import './Fieldset.scss'
import React from 'react'
import classnames from 'classnames'

interface Props {
    className?: string
}

export class Fieldset extends React.Component<Props> {
    public render() {
        const { children } = this.props
        return (
            <fieldset className={this.getClassName()}>
                {children}
            </fieldset>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Fieldset', {}, className)
    }
}
