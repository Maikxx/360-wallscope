import * as React from 'react'
import classnames from 'classnames'
import { Link as RouterLink } from 'react-router-dom'
import { Icon, IconNames } from '../Icon/Icon'
import './Link.scss'

interface Props {
    className?: string
    iconName?: IconNames
    route: string
    color?: string
}

export class Link extends React.Component<Props> {
    public render() {
        const { children, className, route, color, iconName, ...restProps } = this.props

        return (
            <RouterLink className={this.getClassName()} {...restProps} to={route}>
                {iconName &&
                    <Icon iconName={iconName} color={color} className={`Link__icon`}/>
                }
                {children}
            </RouterLink>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Link', { }, className)
    }
}
