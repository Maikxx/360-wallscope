import React from 'react'
import classnames from 'classnames'
import './Input.scss'

interface Props {
    type: string
    name: string
    required?: boolean
    placeholder?: React.HTMLAttributes<HTMLInputElement>['placeholder']
    className?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    defaultValue?: React.HTMLAttributes<HTMLInputElement>['defaultValue']
}

export class Input extends React.Component<Props> {
    public render() {
        const { type, name, required, placeholder, defaultValue, onChange } = this.props

        return (
            <input
                type={type}
                defaultValue={defaultValue}
                name={name}
                id={name}
                onChange={onChange}
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
