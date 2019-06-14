import React from 'react'
import classnames from 'classnames'
import './TextArea.scss'

type StyleType = 'textarea-search' | 'textarea-text'

interface Props {
    name: string
    required?: boolean
    placeholder?: React.HTMLAttributes<HTMLTextAreaElement>['placeholder']
    className?: string
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    defaultValue?: React.HTMLAttributes<HTMLTextAreaElement>['defaultValue']
    styleOverride ?: StyleType
    wrap?: string
}

export class TextArea extends React.Component<Props> {
    public render() {
        const { wrap, name, className, styleOverride, ...restProps } = this.props

        return (
            <textarea
                id={name}
                className={this.getClassName()}
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
