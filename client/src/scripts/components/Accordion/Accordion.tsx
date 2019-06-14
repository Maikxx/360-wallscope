import * as React from 'react'
import classnames from 'classnames'
import './Accordion.scss'

interface Props {
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    title: string
}

interface State {
    isOpen: boolean
}

export class Accordion extends React.Component<Props, State> {
    public state: State = {
        isOpen: false,
    }

    private accordionItem = React.createRef <HTMLLIElement>()

    public render() {
        const { children, title } = this.props

        return (
            <ul className={this.getClassName()}
                onClick={() => {
                    this.animateCollapse()
                    this.toggleAccordion()
                    // const list = document.querySelector('.accordion')
                    // const arrow = document.querySelector('.arrow')
                    // if (list && arrow) {
                    //     list.classList.toggle('collapsed')
                    //     arrow.classList.toggle('up')
                    // }
                }}
            > {title}

                <li className='AccordionItem' ref={this.accordionItem}>
                    {children}
                </li>
                <div className='Arrow'></div>
            </ul>
        )
    }

    private getClassName() {
        const { className } = this.props
        return classnames('Accordion', {
            'Accordion--colapsed': !this.state.isOpen,
            'Accordion--up': this.state.isOpen,
        }, className)
    }

    private animateCollapse() {
        const listItem = this.accordionItem.current
        if (listItem) {
            if (listItem.clientHeight) {
                (listItem as HTMLElement).style.height = '0'
            } else {

                (listItem as HTMLElement).style.height = `${listItem.scrollHeight}px`
            }
        }
    }

    private toggleAccordion = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

}
