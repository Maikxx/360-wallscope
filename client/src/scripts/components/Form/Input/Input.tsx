import React from 'react'
import './Input.scss'

interface Label {
    text: string,
    classname: string,
}

interface Inputprops {
    type: string,
    id ?: string,
    required ?: boolean,
    placeholder ?: string,
    classname: string,
    value ?: string,
    label ?: Label,
}

interface Props {
    view: string,
    input: Inputprops
}

interface State {}

export class Input extends React.Component<Props, State> {
    public render() {
        const { type, id, required, placeholder, classname, value, label } = this.props.input
        const { view } = this.props
        return (
            <React.Fragment>
                { label &&
                    <label className={label.classname} htmlFor={id}>{label.text}</label>
                }
                <input type={type} value={value} id={id} className={`${classname} ${view === 'login' ? `button--login` : `button-signup`}`} placeholder={placeholder} required={required}/>
            </React.Fragment>
        )
    }
}
