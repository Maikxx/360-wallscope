import React from 'react'
import classnames from 'classnames'

interface Props {
    htmlFor?: string
    className?: string
    isNative?: boolean
}

export class Label extends React.Component<Props> {
    public static defaultProps: Props = {
        isNative: true,
    }

    public render() {
        const { htmlFor, children, isNative } = this.props
        const Component = isNative ? 'label' : 'div'

        return (
            <Component className={this.getClassName()} htmlFor={htmlFor}>
                {children}
            </Component>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Label', {}, className)
    }
}
