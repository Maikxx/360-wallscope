import React from 'react'
import classnames from 'classnames'
import './Input.scss'

type InputTypes = 'input-search' | 'input-text'

interface Props {
    type: string
    name: string
    required?: boolean
    placeholder?: React.HTMLAttributes<HTMLInputElement>['placeholder']
    className?: string
    defaultValue?: React.HTMLAttributes<HTMLInputElement>['defaultValue']
    styleOverride ?: InputTypes
}

export class Input extends React.Component<Props> {
    public render() {
        const { type, name, required, placeholder, defaultValue, styleOverride } = this.props

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
        const { className, styleOverride } = this.props

        return classnames('Input', {
            'Input--search': styleOverride === 'input-search',
            'Input--text': styleOverride === 'input-text',
        }, className)
    }
}
