import * as React from 'react'
import classnames from 'classnames'
import './IconRaster.scss'
import { IconType, Icon } from '../Icon/Icon'

interface Props {
    className?: string
    name: string
    onChange: (value: string) => void
}

export class IconRaster extends React.Component<Props> {
    public render() {
        const { name, onChange } = this.props
        const icons = Object.keys(IconType)
            .map(key => ({ name: key, icon: IconType[key] }))
            .filter(({ name }) => name === 'spaceship'
                || name === 'search_small'
                || name === 'medication'
                || name === 'test_tubes'
                || name === 'city'
                || name === 'stethoscope'
                || name === 'syringe'
                || name === 'light_bulb'
                || name === 'atom'
            )

        return (
            <div className={this.getClassName()}>
                {icons.map(icon => (
                    <label className={`IconRaster__row`} key={icon.name}>
                        <input
                            type='radio'
                            name={name}
                            defaultChecked={icon.name === 'spaceship'}
                            value={icon.name}
                            className={`IconRaster__input`}
                            onClick={event => onChange((event.target as HTMLInputElement).value)}
                        />
                        <Icon key={icon.name} iconName={icon.name as any}/>
                    </label>
                ))}
            </div>
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('IconRaster', {}, className)
    }
}
