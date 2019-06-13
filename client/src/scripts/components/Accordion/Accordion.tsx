import * as React from 'react'
import classnames from 'classnames'
import './Accordion.scss'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    title: string
}

export class Accordion extends React.Component<Props> {
    public render() {
        return (
            <ul className={this.getClassName()}
            onClick={() => {
                this.animateCollapse()
                const list = document.querySelector('.accordion')
                const arrow = document.querySelector('.arrow')
                if (list && arrow) {
                    list.classList.toggle('collapsed')
                    arrow.classList.toggle('up')
                }
            }}
            > {this.props.title}
                <li className='accordion-item'>
                    {this.props.children}
                </li>
                <div className='arrow'></div>
            </ul>
        )
    }

    private getClassName() {
        const { className } = this.props
        return classnames('collapsed accordion', {}, className)
    }

    private animateCollapse() {
        const listItem = document.querySelector('.accordion-item')
        if (listItem) {
            if (listItem.clientHeight) {
                (listItem as HTMLElement).style.height = '0'
            } else {

                (listItem as HTMLElement).style.height = `${listItem.scrollHeight}px`
            }
        }
    }

}
