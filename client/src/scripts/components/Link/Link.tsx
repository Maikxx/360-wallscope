import * as React from 'react'
import classnames from 'classnames'
import { Link as RouterLink } from 'react-router-dom'
import { Icon } from '../Icon/Icon'
import './Link.scss'

type StyleType = 'horizontal-link' | 'vertical-link'

interface Props {
    className?: string
    styleOverride?: StyleType
    iconName?: string
    route: string
}

export class Link extends React.Component<Props> {
    public render() {
        const { children, className, route, styleOverride, iconName, ...restProps } = this.props

        return (
            <RouterLink className={this.getClassName()} {...restProps} to={route}>
                { iconName &&
                    <Icon name={iconName} className={`Link__icon`}/>
                }
                {children}
            </RouterLink>
        )
    }

    private getClassName() {
        const { className, styleOverride } = this.props

        return classnames('Button', {
            'Button--vertical': styleOverride === 'vertical-link',
            'Button--hoirzontal': styleOverride === 'horizontal-link',
        }, className)
    }
}
