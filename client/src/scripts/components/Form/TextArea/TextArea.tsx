import React from 'react'
import classnames from 'classnames'
import './TextArea.scss'

interface Props {
    name: string
    required?: boolean
    placeholder?: React.HTMLAttributes<HTMLTextAreaElement>['placeholder']
    className?: string
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    defaultValue?: React.HTMLAttributes<HTMLTextAreaElement>['defaultValue']
    wrap?: string
}

export class TextArea extends React.Component<Props> {
    public render() {
        const { wrap, name, className, ...restProps } = this.props

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
        const { className } = this.props

        return classnames('TextArea', {}, className)
    }
}
