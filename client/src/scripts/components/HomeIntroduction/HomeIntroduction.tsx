import './HomeIntroduction.scss'
import classnames from 'classnames'
import * as React from 'react'

interface Props {
    className?: string
}

export class HomeIntroduction extends React.Component<Props> {
    public render() {
        return (
            <div className={this.getClassName()}>
                <h1 className={'HomeIntroduction__header'}>
                    Hi there,
                </h1>
                <h2 className={'HomeIntroduction__subheader'}>
                    What are you researching today?
                </h2>
                <p className={'HomeIntroduction__text'}>
                    Search our Scottish medical database.
                </p>
            </div>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('HomeIntroduction', {}, className)
    }
}
