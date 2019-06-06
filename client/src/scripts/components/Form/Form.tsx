import React from 'react'
import './Form.scss'

interface FormAction {
    action: string,
}

interface Props {
    formAction: FormAction,
}

interface State {}

export class Form extends React.Component<Props, State> {
    public render() {
        const { children, action } = this.props
        return (
            <form id='Form' action={action}>
                { children }
            </form>
        )
    }
}
