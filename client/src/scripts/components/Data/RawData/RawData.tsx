import * as React from 'react'
import classnames from 'classnames'
import './RawData.scss'
import { IconNames, Icon } from '../../Icon/Icon'
import { ModalBase } from '../../Modal/ModalBase'
import { Button } from '../../Button/Button'
import { Form } from '../../Form/Form'
import { Fieldset } from '../../Form/Fieldset/Fieldset'
import { Label } from '../../Form/Label/Label'
import { Input } from '../../Form/Input/Input'
import { Tags } from '../../Tags/Tags'
import { User } from '../../../types/User'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLDivElement>
    file?: any
    user?: User
    iconName?: IconNames
    boardNames?: string[]
}

export class RawData extends React.Component<Props> {
    public render() {
        const { children, className, iconName, file, boardNames, user, ...restProps } = this.props

        return (
            <div className={`DataWrapper`} >
                <div className={this.getClassName()} {...restProps}>
                    {file.file_type === file.file_type &&
                        <a href={'/'} download>
                            <Icon className={`FileIcons`} iconName={file.icon_name}/>
                            {file.title}
                        </a>
                    }
                    <span>Raw data</span>
                    {user && (
                        <ModalBase
                            title={'Add to a board'}
                            firstButton={'Cancel'}
                            secondButton={'Done'}
                            renderButton={openModal => (
                                <Button
                                    onClick={openModal}
                                    type='button'
                                    styleOverride='round-button'
                                    iconName='add'
                                    color='#181631'
                                />
                            )}
                        >
                            <Form>
                                <Fieldset>
                                    <Label>
                                        Create a new board
                                        <Input type={'text'} name={'search'} styleOverride={'input-search'} />
                                    </Label>
                                    <Button styleOverride={'ultraviolet-button'} type='button' full={true}>
                                        Add
                                    </Button>
                                </Fieldset>
                                <Fieldset>
                                    <Label>
                                        Add to an existing board
                                    </Label>
                                    <Tags tags={boardNames} styleOverride={'tag-ultraviolet-button'}/>
                                </Fieldset>
                            </Form>
                        </ModalBase>
                    )}
                </div>
            </div >
        )
    }

    private getClassName() {
        const { className } = this.props

        return classnames('RawData', {}, className)
    }
}
