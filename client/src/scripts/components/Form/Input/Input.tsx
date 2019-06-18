import React from 'react'
import classnames from 'classnames'
import './Input.scss'

type StyleType = 'input-search' | 'input-text'

export interface InputProps {
    type: string
    name: string
    required?: boolean
    placeholder?: React.HTMLAttributes<HTMLInputElement>['placeholder']
    className?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
    defaultValue?: React.HTMLAttributes<HTMLInputElement>['defaultValue'] | null
    styleOverride?: StyleType
    value?: string
}

export class Input extends React.Component<InputProps> {
    public render() {
        const { type, name, required, placeholder, defaultValue, className, styleOverride, onChange, ...restProps } = this.props

        return (
            <input
                type={type}
                defaultValue={defaultValue || undefined}
                name={name}
                id={name}
                onChange={onChange}
                className={this.getClassName()}
                placeholder={placeholder}
                required={required}
                {...restProps}
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
