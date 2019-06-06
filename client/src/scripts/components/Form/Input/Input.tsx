import React from 'react'
import classnames from 'classnames'
import './Input.scss'

interface Props {
    type: string
    name: string
    required?: boolean
    placeholder?: React.HTMLAttributes<HTMLInputElement>['placeholder']
    className?: string
    defaultValue?: React.HTMLAttributes<HTMLInputElement>['defaultValue']
}

export class Input extends React.Component<Props> {
    public render() {
        const { type, name, required, placeholder, defaultValue } = this.props

        return (
            <input
                type={type}
                defaultValue={defaultValue}
                name={name}
                id={name}
                className={this.getClassName()}
                placeholder={placeholder}
                required={required}
            />
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Input', {}, className)
    }
}
