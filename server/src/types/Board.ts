import { QueryResult } from 'pg'

export interface DatabaseBoard {
    _id: number
    name: string
    collaborators: number[] | null
    owner: number | null
    icon_name: string | null
    results: number[] | null
    created_at: Date
}

export type BoardResultLinkType = 'no-link' | 'definate' | 'possible'

export interface BoardResultLink {
    _id: number
    type: BoardResultLinkType
    destination_board_result_id: number
    origin_board_result_id: number
}

export interface DatabaseBoardResult {
    _id: number
    result_id: number
    links: BoardResultLink[] | null
    created_at: Date
}

export interface CreatedDatabaseBoard {
    _id: number
}

export interface UpdateBoardQueryResponse extends QueryResult {
    rows: {
        _id: number
    }[]
}
