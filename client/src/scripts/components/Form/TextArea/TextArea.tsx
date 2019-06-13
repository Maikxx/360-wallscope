import React from 'react'
import classnames from 'classnames'
import './TextArea.scss'

type StyleType = 'textarea-search' | 'textarea-text'

interface Props {
    name: string
    required?: boolean
    placeholder?: React.HTMLAttributes<HTMLInputElement>['placeholder']
    className?: string
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    defaultValue?: React.HTMLAttributes<HTMLInputElement>['defaultValue']
    styleOverride ?: StyleType
    wrap?: string
}

export class TextArea extends React.Component<Props> {
    public render() {
        const { wrap, name, required, placeholder, defaultValue, styleOverride, onChange, ...restProps } = this.props

        return (
            <textarea
                defaultValue={defaultValue}
                name={name}
                id={name}
                onChange={onChange}
                className={this.getClassName()}
                placeholder={placeholder}
                required={required}
                wrap={wrap}
                {...restProps}
            >
            </textarea>
        )
    }

    private getClassName() {
        const { className, styleOverride } = this.props

        return classnames('TextArea', {
            'Textara--search': styleOverride === 'textarea-search',
            'Textarea--text': styleOverride === 'textarea-text',
        }, className)
    }
}
