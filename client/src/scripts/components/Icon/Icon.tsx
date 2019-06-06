import * as React from 'react'
import classnames from 'classnames'
import './Icon.scss'

interface Props {
    className?: string
    iconName?: string
}

export class Icon extends React.Component<Props> {
    public render() {
        const { iconName } = this.props

        let icon

        const IconType = {
            search_big:
                `<svg className={'Icon__search_big'} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 57 57">
                    <path d="M55.1 51.9L41.6 37.8A23 23 0 0 0 24 0a23 23 0 1 0 13.2 41.8L50.8 56a3 3 0 0 0 4.3.1 3 3 0 0 0 0-4.2zM24 6a17 17 0 1 1 0 34 17 17 0 0 1 0-34z"/>
                </svg>`,
            search_small: `
                <svg className={'Icon__search_small'} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 57 57">
                    <path d="M55.1 51.9L41.6 37.8A23 23 0 0 0 24 0a23 23 0 1 0 13.2 41.8L50.8 56a3 3 0 0 0 4.3.1 3 3 0 0 0 0-4.2zM24 6a17 17 0 1 1 0 34 17 17 0 0 1 0-34z"/>
                </svg>`,
            user: `<svg className={'Icon__user'} xmlns="http://www.w3.org/2000/svg" width="32" height="32" s>
                <path d="M175 171c39 0 70-38 70-85 0-48-10-86-70-86s-70 38-70 86c0 47 31 85 70 85zM42 302c0-3 0-1 0 0zM308 304c0-1 0-5 0 0zM308 298c-1-82-12-105-94-120 0 0-12 15-39 15s-39-15-39-15c-81 14-92 38-94 118v15s20 39 133 39 133-39 133-39a3131 3131 0 0 1 0-13z"/>
                </svg>`,
            topics: `<svg className={'Icon__topics'}></svg>`,
            menu: `<svg className={'Icon__menu'}></svg>`,
            settings: `<svg className={'Icon__settings'}></svg>`,
            light: `<svg className={'Icon__light'}></svg>`,
            pen: `<svg className={'Icon__pen}></svg>`,
        }

        if (iconName) {
            icon = IconType[iconName]

            return (
                <i className={this.getClassName()} dangerouslySetInnerHTML={{ __html: icon }}/>
            )
        } else {
            return null
        }
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Icon', { }, className)
    }
}
