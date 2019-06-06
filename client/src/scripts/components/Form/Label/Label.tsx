import React from 'react'

interface Props {
    htmlFor: string,
    className: string,
}

export class Label extends React.Component<Props> {
    public render() {
        const { htmlFor, className, children } = this.props
        return (
            <label className={className} htmlFor={htmlFor}>
                {children}
            </label>
        )
    }
}
