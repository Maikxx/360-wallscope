import React from 'react'
import classnames from 'classnames'
import './Input.scss'

type StyleType = 'input-search' | 'input-text'

interface Props {
    type: string
    name: string
    required?: boolean
    placeholder?: React.HTMLAttributes<HTMLInputElement>['placeholder']
    className?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    defaultValue?: React.HTMLAttributes<HTMLInputElement>['defaultValue'] | null
    styleOverride ?: StyleType
}

export class Input extends React.Component<Props> {
    public render() {
        const { type, name, required, placeholder, defaultValue, styleOverride, onChange, ...restProps } = this.props

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
