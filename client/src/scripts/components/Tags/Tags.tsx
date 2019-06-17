import * as React from 'react'
import classnames from 'classnames'
import './Tags.scss'
import { Button, StyleType } from '../Button/Button'

interface Props {
    className?: string
    tags?: string[]
    styleOverride?: StyleType
}

export class Tags extends React.Component<Props> {
    public render() {
        const { children, className, styleOverride, tags, ...restProps } = this.props

        return (
            <ul className={this.getClassName()} {...restProps}>
                {tags && tags.map(tag => {
                    return (
                        <li key={tag}>
                            <Button styleOverride={styleOverride} type='button'>{tag}</Button>
                        </li>
                    )
                })}
            </ul>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Tags', {}, className)
    }
}
