import React from 'react'

interface Props {
    classname: string,
    text: string,
}

export class Legend extends React.Component<Props> {
    public render() {
        const { text, classname } = this.props
        return (
            <fieldset className={classname}>
                {text}
            </fieldset>
        )
    }
}
