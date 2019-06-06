import React from 'react'

interface Props {
    className: string,
    text: string,
}

export class Legend extends React.Component<Props> {
    public render() {
        const { text, className } = this.props
        return (
            <legend className={className}>
                {text}
            </legend>
        )
    }
}
