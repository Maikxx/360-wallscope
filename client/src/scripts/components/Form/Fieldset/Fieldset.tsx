import React from 'react'

interface Props {
    classname: string,
}

export class Fieldset extends React.Component<Props> {
    public render() {
        const { children, classname } = this.props
        return (
            <fieldset className={classname}>
                {children}
            </fieldset>
        )
    }
}
