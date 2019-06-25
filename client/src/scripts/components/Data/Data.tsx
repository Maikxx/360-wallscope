import * as React from 'react'
import classnames from 'classnames'
import { RawData } from './RawData/RawData'
import './Data.scss'
import { User } from '../../types/User'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    full?: boolean
    boardNames?: string[]
    onCreateNewBoard?: () => void
    files?: FileType[]
    user?: User
}

interface FileType {
    _id: number
    title: string | null
    icon_name?: string | null
    file_type?: string | null
}

export class Data extends React.Component<Props> {
    public render() {
        const { boardNames, files, user, onCreateNewBoard } = this.props

        return (
            <ul className={this.getClassName()}>
                {files && files.map(file => (
                    <li key={file._id}>
                        <RawData
                            file={file}
                            user={user}
                            boardNames={boardNames}
                            onCreateNewBoard={onCreateNewBoard}
                        />
                    </li>
                ))}
            </ul>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Data', {}, className)
    }
}
