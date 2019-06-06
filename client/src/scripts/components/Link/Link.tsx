import * as React from 'react'
import classnames from 'classnames'
import { Link as RouterLink } from 'react-router-dom'
import { Icon } from '../Icon/Icon'
import './Link.scss'

interface Props {
    className?: string
    iconName?: string
    route: string
}

export class Link extends React.Component<Props> {
    public render() {
        const { children, className, route, iconName, ...restProps } = this.props

        return (
            <RouterLink className={this.getClassName()} {...restProps} to={route}>
                { iconName &&
                    <Icon iconName={iconName} className={`Link__icon`}/>
                }
                {children}
            </RouterLink>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Button', { }, className)
    }
}
