import React from 'react'
import { Link } from '../Link/Link'
import { IconNames } from '../Icon/Icon'
import classnames from 'classnames'

interface Props {
    className?: string
    color?: string
    iconName?: IconNames
    route: string
}

export class NavLink extends React.Component<Props> {
    public render() {
        const { children, route, color, iconName } = this.props

        return (
            <li className={this.getClassName()}>
                <Link route={route} iconName={iconName} color={color}>
                    {children}
                </Link>
            </li>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('NavLink', { }, className)
    }
}
