import * as React from 'react'
import classnames from 'classnames'
import { Input, InputProps } from '../Form/Input/Input'

interface Props extends InputProps {
    onSearch: (value: string) => Promise<void>
}

export class SearchOnInput extends React.Component<Props> {
    public render() {
        const { className, onSearch, ...restProps } = this.props

        return (
            <Input
                onChange={this.onChange}
                className={this.getClassName()}
                placeholder={`Search by name`}
                {...restProps}
            />
        )
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onSearch } = this.props

        if (event.target && event.target.value) {
            onSearch(event.target.value)
        }
    }

    private getClassName() {
        const { className } = this.props

        return classnames('SearchOnInput', {}, className)
    }
}
