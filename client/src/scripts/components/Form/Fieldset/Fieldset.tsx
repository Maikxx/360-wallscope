import React from 'react'

interface Props {
    classname: string,
}

interface State {}

export class Fieldset extends React.Component<Props, State> {
    public render() {
        const { children, classname } = this.props
        return (
            <fieldset className={classname}>
                {children}
            </fieldset>
        )
    }
}
