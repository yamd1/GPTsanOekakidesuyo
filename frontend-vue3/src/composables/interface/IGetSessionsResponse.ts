export interface IGetSessionsResponse {
    sessions: Array<IGetSessions>
}

export interface IGetSessions {
    id: number
    name: string
    created_at: Date
    updated_at: Date | null
}
