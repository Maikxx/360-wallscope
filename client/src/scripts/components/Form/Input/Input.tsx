import React from 'react'
import './Input.scss'

interface Props {
    type: string,
    name: string,
    required ?: boolean,
    placeholder ?: string,
    className: string,
    value ?: string,
}

export class Input extends React.Component<Props> {
    public render() {
        const { type, name, required, placeholder, className, value } = this.props
        return (
            <input type={type} value={value} name={name} id={name} className={className} placeholder={placeholder} required={required}/>
        )
    }
}
