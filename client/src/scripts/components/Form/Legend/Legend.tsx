import React from 'react'

interface Props {
    classname: string,
    text: string,
}

interface State {}

export class Legend extends React.Component<Props, State> {
    public render() {
        const { text, classname } = this.props
        return (
            <fieldset className={classname}>
                {text}
            </fieldset>
        )
    }
}
