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
    input: Inputprops,
}

export class Input extends React.Component<Props> {
    public render() {
        const { type, id, required, placeholder, classname, value, label } = this.props.input
        return (
            <React.Fragment>
                { label &&
                    <label className={label.classname} htmlFor={id}>{label.text}</label>
                }
                <input type={type} value={value} id={id} className={classname} placeholder={placeholder} required={required}/>
            </React.Fragment>
        )
    }
}
