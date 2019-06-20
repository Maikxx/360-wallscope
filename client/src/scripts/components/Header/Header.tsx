import React from 'react'
import classnames from 'classnames'
import { Icon } from '../Icon/Icon'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'
import { Dropdown } from '../Dropdown/Dropdown'
import { Button } from '../Button/Button'
import './Header.scss'

interface Props {
    className?: string
    back: boolean
    route?: string
    more: boolean
}

export class Header extends React.Component<Props> {
    public render () {
        const { back, route, more } = this.props

        return (
            <header className={this.getClassName()}>
                {(back && route) && (
                    <Link to={route}>
                        <Icon
                            className={`Header__back-button`}
                            iconName='back'
                            color='#FFFFFF'
                        />
                    </Link>
                )}
                <Link to={routes.App.index}>
                    <Icon iconName='header_logo'/>
                </Link>
                {more && (
                    <Dropdown
                        title={'More options'}
                        renderButton={openModal => (
                            < Button
                                onClick = { openModal }
                                className='Header__more-button'
                                type='button'
                                // styleOverride='search-button'
                                iconName='more'
                                color='#ffffff'
                            />
                        )}
                    >
                        <Button styleOverride='tag-red-button' full={true}>Create new board</Button>
                        <Button styleOverride='tag-red-button' full={true}>Delete board</Button>
                        <Button styleOverride='tag-red-button' full={true}>Edit existing board</Button>
                        <Button styleOverride='tag-red-button' full={true}>Share board</Button>
                    </Dropdown>
                )}

            </header >
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Header', {}, className)
    }
}
