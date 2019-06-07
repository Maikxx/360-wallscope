import * as React from 'react'
import classnames from 'classnames'
import { Icon, IconNames } from '../Icon/Icon'
import './Button.scss'

type ButtonType = 'button' | 'submit'
type StyleType = 'red-button' | 'blue-button' | 'round-button' | 'big-button' | 'search-button' | 'tag-red-button' | 'tag-blue-button'

interface Props {
    className?: string
    type?: ButtonType
    iconName?: IconNames
    styleOverride?: StyleType
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export class Button extends React.Component<Props> {
    public render() {
        const { children, className, iconName, styleOverride, ...restProps } = this.props

        return (
            <button className={this.getClassName()} {...restProps}>
                {iconName &&
                    <Icon iconName={iconName} className={`Link__icon`} />
                }
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
