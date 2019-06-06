import React from 'react'
import './Form.scss'

interface FormAction {
    action: string
}

interface Props {
    formAction: FormAction
}

export class Form extends React.Component<Props> {
    public render() {
        const { children, formAction } = this.props
        return (
            <form id='Form' action={formAction.action}>
                { children }
            </form>
        )
    }
}
