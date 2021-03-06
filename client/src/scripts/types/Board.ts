import { User } from './User'

export interface Board {
    _id: number
    name: string
    collaborators: User[] | null
    owner: User | null
    results: BoardResult[] | null
    is_default_board: boolean | null
    icon_name: string | null
    created_at: Date
}

export type BoardResultLinkType = 'no-link' | 'definate' | 'possible'

export interface BoardResultLink {
    _id: number
    type: BoardResultLinkType
    destination_board_result_id: number
    origin_board_result_id: number
}

export interface BoardResult {
    _id: number
    result: number
    links: BoardResultLink[] | null
    created_at: Date
}
