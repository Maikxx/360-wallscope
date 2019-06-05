import * as React from 'react'
import classnames from 'classnames'
import './Button.scss'

type ButtonType = 'button' | 'submit'
type StyleType = 'red-button' | 'blue-button' | 'round-button' | 'big-button' | 'search-button' | 'tag-red-button' | 'tag-blue-button'

interface Props {
    className?: string
    type?: ButtonType
    styleOverride?: StyleType
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export class Button extends React.Component<Props> {
    public render() {
        const { children, className, styleOverride, ...restProps } = this.props

        return (
            <button className={this.getClassName()} {...restProps}>
                {children}
            </button>
        )
    }

    private getClassName() {
        const { className, styleOverride } = this.props

        return classnames('Button', {
            'Button--red': styleOverride === 'red-button',
            'Button--blue': styleOverride === 'blue-button',
            'Button--round': styleOverride === 'round-button',
            'Button--big': styleOverride === 'big-button',
            'Button--search': styleOverride === 'search-button',
            'Button--tag-red': styleOverride === 'tag-red-button',
            'Button--tag-blue': styleOverride === 'tag-blue-button',
        }, className)
    }
}
