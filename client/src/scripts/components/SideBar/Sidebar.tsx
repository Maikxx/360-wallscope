import * as React from 'react'
import classnames from 'classnames'
import { Button } from '../Button/Button'
import './Sidebar.scss'

interface Props {
    className?: string
    // onClick?: React.MouseEventHandler<HTMLDivElement>
}

interface State {
    isOpen: boolean
}

export class Sidebar extends React.Component<Props, State> {
    public state: State = {
        isOpen: false,
    }

    public render() {
        const { children } = this.props

        return (
            <div
                className={this.getClassName()}
            >
                <Button
                    styleOverride='round-button'
                    iconName={this.state.isOpen ? 'close' : 'question'}
                    type='button'
                    onClick={() => {
                        this.toggleSideBar()
                    }}
                />
                <div className='Sidebar__Content'>
                    { children }
                </div>
            </div>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Sidebar', {
            'Sidebar--collapsed': !this.state.isOpen,
            'Sidebar--open': this.state.isOpen,
        }, className)
    }

    private toggleSideBar = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
}
