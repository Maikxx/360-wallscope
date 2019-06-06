import React from 'react'
import './Form.scss'

interface Props {
    formAction: string,
}

export class Form extends React.Component<Props> {
    public render() {
        const { children, formAction } = this.props
        return (
            <form id='Form' action={formAction}>
                { children }
            </form>
        )
    }
}
