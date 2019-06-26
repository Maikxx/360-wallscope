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

    private accordionItem = React.createRef<HTMLDivElement>()

    public render() {
        const { children, title } = this.props

        return (
            <section className={this.getClassName()}>
                <h2 className={`Accordion__title`}>
                    {title}
                </h2>
                <div className='Accordion__list' ref={this.accordionItem}>
                    {children}
                </div>
                <div
                    className='Accordion__arrow'
                    onClick={() => {
                        this.animateCollapse()
                        this.toggleAccordion()
                    }}
                />
            </section>
        )
    }

    private getClassName() {
        const { className } = this.props
        return classnames('Accordion', {
            'Accordion--collapsed': !this.state.isOpen,
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
