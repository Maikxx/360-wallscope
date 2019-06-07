import React from 'react'

interface Props {
    id?: React.HTMLAttributes<HTMLFormElement>['id']
    action?: React.FormHTMLAttributes<HTMLFormElement>['action']
}

export class Form extends React.Component<Props> {
    public render() {
        const { children, ...restProps } = this.props

        return (
            <form {...restProps}>
                { children }
            </form>
        )
    }
}
