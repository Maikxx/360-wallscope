import React from 'react'

interface Props {
    className: string,
}

export class Fieldset extends React.Component<Props> {
    public render() {
        const { children, className } = this.props
        return (
            <fieldset className={className}>
                {children}
            </fieldset>
        )
    }
}
