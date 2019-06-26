import * as React from 'react'
import classnames from 'classnames'
import './Tags.scss'
import { Button, StyleType } from '../Button/Button'

interface Props {
    className?: string
    tags?: string[]
    styleOverride?: StyleType
    isClickable?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export class Tags extends React.Component<Props> {
    public render() {
        const { children, className, styleOverride, isClickable, onClick, tags, ...restProps } = this.props

        return (
            <ul className={this.getClassName()} {...restProps}>
                {tags && tags.map(tag => (
                    <li key={tag}>
                        <Button
                            aria_label={name}
                            styleOverride={styleOverride}
                            isClickable={isClickable}
                            type='button'
                            onClick={onClick}
                        >
                            {tag}
                        </Button>
                    </li>
                ))}
            </ul>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Tags', {}, className)
    }
}
