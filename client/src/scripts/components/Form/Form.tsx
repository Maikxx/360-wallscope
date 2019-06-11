import React from 'react'
import classnames from 'classnames'

interface Props {
    id?: React.HTMLAttributes<HTMLFormElement>['id']
    action?: React.FormHTMLAttributes<HTMLFormElement>['action']
    className?: React.HTMLAttributes<HTMLFormElement>['className']
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

export class Form extends React.Component<Props> {
    public render() {
        const { children, ...restProps } = this.props

        return (
            <form className={this.getClassName()} {...restProps}>
                { children }
            </form>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Form', {}, className)
    }
}
