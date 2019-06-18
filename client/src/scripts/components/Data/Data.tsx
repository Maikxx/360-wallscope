import * as React from 'react'
import classnames from 'classnames'
import { RawData } from './RawData/RawData'
import './Data.scss'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    full?: boolean
    boardNames?: string[]
}

interface FileType {
    _id: number
    title: string | null
    icon_name?: string | null
    file_type?: string | null
}

interface Props {
    className?: string
    files?: FileType[]
}

export class Data extends React.Component<Props> {
    public render() {
        const { boardNames, files } = this.props

        return (
            <ul className={this.getClassName()}>
                {files && files.map(file => (
                    <li key={file._id}>
                        <RawData
                            file={file}
                            boardNames={boardNames}
                        />
                    </li>
                ))}
            </ul>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Data', { }, className)
    }
}
