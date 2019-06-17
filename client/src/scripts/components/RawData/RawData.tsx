import * as React from 'react'
import classnames from 'classnames'
import './RawData.scss'
import { IconNames, Icon } from '../Icon/Icon'

type dataTypes = 'pdf' | 'xml' | 'csv' | 'tsv'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLDivElement>
    title?: string
    fileTypes?: dataTypes
    iconName?: IconNames
}

export class RawData extends React.Component<Props> {
    public render() {
        const { children, className, fileTypes, title, iconName, ...restProps } = this.props

        return (
            <div className={this.getClassName()} {...restProps}>
                {iconName === fileTypes &&
                    <a href={'/'} download>
                        <Icon iconName={fileTypes}/>
                        {title}
                    </a>
                }
            </div>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('RawData', {}, className)
    }
}
