import * as React from 'react'
import classnames from 'classnames'
import './Icon.scss'

export type IconNames =
    'user' | 'search_big' | 'search_small' | 'pen' | 'settings'|
    'light_dark' | 'boards' | 'back' | 'pdf' | 'xml' | 'tsv' | 'csv' | 'header_logo'

interface Props {
    className?: string
    iconName?: IconNames
    color?: string
}

export class Icon extends React.Component<Props> {
    public render() {
        const { iconName, color } = this.props

        let icon

        const IconType = {
            header_logo:
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 137.44 41.32" width="90" height="50">
                <defs>
                    <style>.cls-1{fill:#fff;}.cls-2{fill:#4fbad9;}</style>
                </defs>
                <title>logo-w-blue</title>
                <g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                <path class="cls-1" d="M26.89,41.32H22.57L12.93,20.66l.88-.43c.08,0,.46-.23,1.13-.55s1.06-.52,1.3-.67.67-.4,1.25-.78a4.85,4.85,0,0,0,1.11-.91c.29-.35.61-.76,1-1.24a4.06,4.06,0,0,0,.64-1.34A6.33,6.33,0,0,0,20.42,13a5.31,5.31,0,0,0-3.29-5.06A20.24,20.24,0,0,0,8,6.12H3.92v35.2H0V2.2H8c5.22,0,9.25.94,12,2.8a9.21,9.21,0,0,1,4.31,8,8.71,8.71,0,0,1-2.23,5.87,14.46,14.46,0,0,1-4.17,3.3Z"/>
                <polygon class="cls-2" points="42.82 37.4 63.17 37.4 51.56 10.05 38.27 41.32 34.05 41.32 51.56 0 69.07 41.32 42.82 41.32 42.82 37.4"/>
                <rect class="cls-1" x="80.26" y="2.2" width="3.92" height="39.12"/><polygon class="cls-1" points="127.44 2.2 127.44 41.32 123.96 41.32 104.66 10.17 104.66 41.32 100.74 41.32 100.74 2.2 104.22 2.2 123.52 33.29 123.52 2.2 127.44 2.2"/>
                <rect class="cls-1" x="133.96" y="37.84" width="3.48" height="3.48"/></g></g></svg>`,
            search_big:
                `<svg className='Icon__search_big' xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 57 57">
                    <path fill=${color ? color : '#fff'} d="M55.1 51.9L41.6 37.8A23 23 0 0 0 24 0a23 23 0 1 0 13.2 41.8L50.8 56a3 3 0 0 0 4.3.1 3 3 0 0 0 0-4.2zM24 6a17 17 0 1 1 0 34 17 17 0 0 1 0-34z"/>
                </svg>`,
            search_small: `
                <svg className='Icon__search_small' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 57 57">
                    <path fill=${color ? color : '#fff'} d="M55.1 51.9L41.6 37.8A23 23 0 0 0 24 0a23 23 0 1 0 13.2 41.8L50.8 56a3 3 0 0 0 4.3.1 3 3 0 0 0 0-4.2zM24 6a17 17 0 1 1 0 34 17 17 0 0 1 0-34z"/>
                </svg>`,
            user:
                `<svg className='Icon__user' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 350 350">
                    <path fill=${color ? color : '#fff'} d="M175 171c39 0 70-38 70-85 0-48-10-86-70-86s-70 38-70 86c0 47 31 85 70 85zM42 302c0-3 0-1 0 0zM308 304c0-1 0-5 0 0zM308 298c-1-82-12-105-94-120 0 0-12 15-39 15s-39-15-39-15c-81 14-92 38-94 118v15s20 39 133 39 133-39 133-39a3131 3131 0 0 1 0-13z"/>
                </svg>`,
            pen:
                `<svg className='Icon__pen' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 529 529">
                    <path fill=${color ? color : '#fff'} d="M329 89l107 108-272 272L57 361 329 89zm189-26l-48-48a48 48 0 0 0-67 0l-46 46 108 108 53-54c14-14 14-37 0-52zM0 513c-2 9 6 16 15 14l120-29L27 391 0 513z"/>
                </svg>`,
            settings:
                `<svg className='Icon__settings' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                    <path fill=${color ? color : '#fff'} d="M75 328c-3 6-2 13 3 17l3 4 38-41 3-3-23-23-24 46zm0 0M204 393l-41 38 5 5c4 4 12 5 17 2 8-4 20-9 46-24l-24-24-3 3zm0 0M196 316c-11-11-41-1-56 13-48 48-69 82-79 102a15 15 0 0 0 20 20c20-9 53-31 102-79 16-16 23-46 13-56zm0 0M47 200L4 242a15 15 0 0 0 15 25c23-6 43-9 57-5 19-34 40-66 62-95-13-8-55-3-91 33zm0 0M254 510c6 3 13 2 17-2l43-43c33-33 38-75 31-89-32 25-65 45-95 62 2 12 1 23-4 57-1 6 2 13 8 15zm0 0M298 150a45 45 0 1 0 64 64 45 45 0 0 0-64-64zm0 0M511 15c0-8-6-14-14-14-37-3-73 2-109 13 2 24 15 51 37 73s50 35 75 37c9-34 14-70 11-109zm0 0"/>
                    <path fill=${color ? color : '#fff'} d="M404 108c-25-25-40-55-45-84a544 544 0 0 0-245 231l34 34c23-10 51-12 69 6s16 46 6 69l35 35c87-53 189-136 232-246-30-4-61-20-86-45zm-21 127a75 75 0 1 1-106-106 75 75 0 0 1 106 106zm0 0"/>
                </svg>`,
            light_dark:
                `<svg className='Icon__light' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 414 512">
                    <defs>
                      <style>
                        .cls-2{fill:#9d96b9}.cls-5{fill:#cec6e4}
                      </style>
                    </defs>
                    <g id="Laag_2" data-name="Laag 2">
                      <g id="Laag_2-2" data-name="Laag 2">
                        <path fill=${color ? color : '#fff'} d="M185 393h70v72h-70v-72z" fill="#6d6889"/>
                        <path fill=${color ? color : '#fff'} class="cls-2" d="M224 501a40 40 0 0 0 31-39h-65a40 40 0 0 0 34 39z"/>
                        <path fill=${color ? color : '#fff'} d="M116 215a132 132 0 0 0 45 100 112 112 0 0 1 38 78h56v-1c0-33 14-64 38-85a132 132 0 0 0-40-224h-4c-73-1-133 59-133 132z" fill="#413c5b"/>
                        <path fill=${color ? color : '#fff'} d="M207 329a20 20 0 0 0-20 20v44h40v-44a20 20 0 0 0-20-20z" fill="#fff"/>
                        <path fill=${color ? color : '#fff'} class="cls-5" d="M308 107a142 142 0 1 0-194 207c22 20 35 48 35 77v71a50 50 0 0 0 50 50h17a50 50 0 0 0 49-50v-70c0-30 13-58 35-77a142 142 0 0 0 8-208zM207 279h-7a7 7 0 1 1 7-6zm0 60a10 10 0 0 1 10 10v34h-20v-34a10 10 0 0 1 10-10zm38 64v14h-76v-14zm-76 34h76v15h-76v-15zm47 55h-17a30 30 0 0 1-28-20h73a30 30 0 0 1-28 20zm71-192a121 121 0 0 0-41 83h-9v-34a30 30 0 0 0-10-23v-33a32 32 0 0 0 14-26v-16a39 39 0 0 0-39-38h-18a10 10 0 0 0 0 20h18a19 19 0 0 1 19 18v4a27 27 0 1 0-21 44h7v20a30 30 0 0 0-30 30v34h-8a122 122 0 0 0-42-84 122 122 0 0 1 82-214c66 1 120 56 120 122a122 122 0 0 1-42 93z"/>
                        <path fill=${color ? color : '#fff'} class="cls-2" d="M209 114a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM253 126a10 10 0 0 0-10 17 73 73 0 0 1 38 64 10 10 0 0 0 20 0 93 93 0 0 0-48-81z"/>
                        <path fill=${color ? color : '#fff'} class="cls-5" d="M207 47a10 10 0 0 0 10-10V10a10 10 0 0 0-20 0v27a10 10 0 0 0 10 10zM404 197h-27a10 10 0 0 0 0 20h27a10 10 0 0 0 0-20zM37 197H10a10 10 0 0 0 0 20h27a10 10 0 0 0 0-20zM335 320a10 10 0 0 0-14 14l19 20a10 10 0 0 0 14 0 10 10 0 0 0 0-14zM80 94a10 10 0 0 0 7 3 10 10 0 0 0 7-3 10 10 0 0 0 0-14L75 61a10 10 0 1 0-14 14zM340 61l-20 19a10 10 0 0 0 0 14 10 10 0 0 0 7 3 10 10 0 0 0 8-3l19-19a10 10 0 0 0 0-14 10 10 0 0 0-14 0zM80 320l-19 20a10 10 0 0 0 0 14 10 10 0 0 0 14 0l19-19a10 10 0 0 0 0-15 10 10 0 0 0-14 0z"/>
                      </g>
                    </g>
                </svg>`,
            boards:
                `<svg className='Icon__boards' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" >
                    <defs>
                      <style>
                        .cls-1{fill:#cec7ec}
                      </style>
                    </defs>
                    <g id="Laag_2" data-name="Laag 2">
                      <g id="Laag_1-2" data-name="Laag 1">
                        <path fill=${color ? color : '#fff'} class="cls-1" d="M197 0H37A37 37 0 0 0 0 37v96a37 37 0 0 0 37 38h160a37 37 0 0 0 38-38V37a37 37 0 0 0-38-37zM197 213H37a37 37 0 0 0-37 38v224a37 37 0 0 0 37 37h160a37 37 0 0 0 38-37V251a37 37 0 0 0-38-38zM475 341H315a37 37 0 0 0-38 38v96a37 37 0 0 0 38 37h160a37 37 0 0 0 37-37v-96a37 37 0 0 0-37-38zM475 0H315a37 37 0 0 0-38 37v224a37 37 0 0 0 38 38h160a37 37 0 0 0 37-38V37a37 37 0 0 0-37-37z"/>
                        <path fill=${color ? color : '#fff'} class="cls-1" d="M197 171H37a37 37 0 0 1-37-38V37A37 37 0 0 1 37 0h160a37 37 0 0 1 38 37v96a37 37 0 0 1-38 38zM37 32a5 5 0 0 0-5 5v96a5 5 0 0 0 5 6h160a5 5 0 0 0 6-6V37a5 5 0 0 0-6-5zM197 512H37a37 37 0 0 1-37-37V251a37 37 0 0 1 37-38h160a37 37 0 0 1 38 38v224a37 37 0 0 1-38 37zM37 245a5 5 0 0 0-5 6v224a5 5 0 0 0 5 5h160a5 5 0 0 0 6-5V251a5 5 0 0 0-6-6zM475 512H315a37 37 0 0 1-38-37v-96a37 37 0 0 1 38-38h160a37 37 0 0 1 37 38v96a37 37 0 0 1-37 37zM315 373a5 5 0 0 0-6 6v96a5 5 0 0 0 6 5h160a5 5 0 0 0 5-5v-96a5 5 0 0 0-5-6zM475 299H315a37 37 0 0 1-38-38V37a37 37 0 0 1 38-37h160a37 37 0 0 1 37 37v224a37 37 0 0 1-37 38zM315 32a5 5 0 0 0-6 5v224a5 5 0 0 0 6 6h160a5 5 0 0 0 5-6V37a5 5 0 0 0-5-5z"/>
                      </g>
                    </g>
                </svg>`,
            back:
                `<svg className='Icon__back' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 31.494 31.494">
                    <path fill=${color ? color : '#fff'} d="M10.273 5.009c.444-.444 1.143-.444 1.587 0 .429.429.429 1.143 0 1.571l-8.047 8.047h26.554c.619 0 1.127.492 1.127 1.111s-.508 1.127-1.127 1.127H3.813l8.047 8.032c.429.444.429 1.159 0 1.587-.444.444-1.143.444-1.587 0L.321 16.532c-.429-.429-.429-1.143 0-1.571l9.952-9.952z" fill="#1e201d"/>
                </svg>`,
            pdf:
                `<svg className='Icon__pdf' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 270.6 309.3">
                    <g data-name="Laag 2">
                        <g data-name="Layer 1">
                            <path d="M19.3 0h164.3l87 86.7V290a19.3 19.3 0 0 1-19.3 19.4h-232A19.3 19.3 0 0 1 0 289.9V19.3A19.3 19.3 0 0 1 19.3 0z" fill="#e5565b"/>
                            <path d="M270.3 87H203a19.3 19.3 0 0 1-19.3-19.3V.2z" fill="#c23641"/>
                            <text transform="translate(56.5 242)" font-size="72" fill="#fff" font-family="Montserrat-Bold,Montserrat" font-weight="700">
                                <tspan letter-spacing="0em">P</tspan><tspan x="52" y="0">DF</tspan>
                            </text>
                        </g>
                    </g>
                </svg>`,
            xml:
                `<svg className='Icon__xml' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 270.6 309.3">
                    <g data-name="Laag 2">
                        <g data-name="Layer 1">
                            <path d="M19.3 0h164.3l87 86.7V290a19.3 19.3 0 0 1-19.3 19.4h-232A19.3 19.3 0 0 1 0 289.9V19.3A19.3 19.3 0 0 1 19.3 0z" fill="#c23641"/>
                            <path d="M270.3 87H203a19.3 19.3 0 0 1-19.3-19.3V.2z" fill="#a00c28"/>
                            <text transform="translate(54.2 242)" font-size="72" fill="#fff" font-family="Montserrat-Bold,Montserrat" font-weight="700">
                                <tspan letter-spacing="0em">X</tspan><tspan x="49.8" y="0">ML</tspan>
                            </text>
                        </g>
                    </g>
                </svg>`,
            tsv:
                `<svg className='Icon__tsv' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 270.6 309.3">
                    <g data-name="Laag 2">
                        <g data-name="Layer 1">
                            <path d="M19.3 0h164.3l87 86.7V290a19.3 19.3 0 0 1-19.3 19.4h-232A19.3 19.3 0 0 1 0 289.9V19.3A19.3 19.3 0 0 1 19.3 0z" fill="#1294b2"/>
                            <path d="M270.3 87H203a19.3 19.3 0 0 1-19.3-19.3V.2z" fill="#00708c"/>
                            <text transform="translate(63.3 242)" font-size="72" fill="#fff" font-family="Montserrat-Bold,Montserrat" font-weight="700">
                                <tspan letter-spacing="0">T</tspan><tspan x="44.1" y="0">SV</tspan>
                            </text>
                        </g>
                    </g>
                </svg>`,
            csv:
                `<svg className='Icon__csv' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 270.6 309.3">
                    <g data-name="Laag 2">
                        <g data-name="Layer 1">
                            <path d="M19.3 0h164.3l87 86.7V290a19.3 19.3 0 0 1-19.3 19.4h-232A19.3 19.3 0 0 1 0 289.9V19.3A19.3 19.3 0 0 1 19.3 0z" fill="#4fbad9"/>
                            <path d="M270.3 87H203a19.3 19.3 0 0 1-19.3-19.3V.2z" fill="#1294b2"/>
                            <text transform="translate(59.2 242)" font-size="72" fill="#fff" font-family="Montserrat-Bold,Montserrat" font-weight="700">
                                <tspan letter-spacing="0em">C</tspan><tspan x="52.3" y="0">SV</tspan>
                            </text>
                        </g>
                    </g>
                </svg>`,
        }

        if (iconName) {
            icon = IconType[iconName]

            return (
                <i className={this.getClassName()} dangerouslySetInnerHTML={{ __html: icon }}/>
            )
        } else {
            return null
        }
    }

    private getClassName() {
        const { className } = this.props

        return classnames('Icon', { }, className)
    }
}
