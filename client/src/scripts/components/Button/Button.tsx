import * as React from 'react'
import classnames from 'classnames'
import { Icon, IconNames } from '../Icon/Icon'
import './Button.scss'

type ButtonType = 'button' | 'submit'
export type StyleType = 'ultraviolet-button' | 'orange-button' | 'round-button' | 'big-button' |
    'search-button' | 'tag-ultraviolet-button' | 'tag-orange-button' | 'tag-border-button' | 'tag-orange-button'

interface Props {
    className?: string
    type?: ButtonType
    iconName?: IconNames
    styleOverride?: StyleType
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    color?: string
    full?: boolean
}

interface State {
    isSelected: boolean
}

export class Button extends React.Component<Props, State> {
    public state: State = {
        isSelected: false,
    }

    public render() {
        const { children, className, iconName, styleOverride, color, full, ...restProps } = this.props

        return (
            <button
                className={this.getClassName()}
                onClick={() => {
                    this.selectTag()
                }
                } {...restProps}
            >
                {iconName &&
                    <Icon iconName={iconName} color={color} className={`Link__icon`} />
                }
                {children}
            </button>
        )
    }

    private getClassName() {
        const { className, styleOverride, full } = this.props

        return classnames('Button', {
            'Button--full': full === true,
            'Button--ultraviolet': styleOverride === 'ultraviolet-button',
            'Button--orange': styleOverride === 'orange-button',
            'Button--round': styleOverride === 'round-button',
            'Button--big': styleOverride === 'big-button',
            'Button--search': styleOverride === 'search-button',
            'Button--tag-ultraviolet': styleOverride === 'tag-ultraviolet-button',
            'Button--tag-orange': styleOverride === 'tag-orange-button',
            'Button--tag-border': styleOverride === 'tag-border-button',
            'Button--tag-orange-border': this.state.isSelected,
        }, className)
    }

    private selectTag = () => {
        this.setState({ isSelected: !this.state.isSelected })
    }
}
