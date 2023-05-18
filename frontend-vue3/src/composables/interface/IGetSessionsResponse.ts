export interface IGetSessionsResponse {
    sessions: Array<IGetSessions>
}

interface IGetSessions {
    id: number
    name: string
    created_at: Date
    updated_at: Date | null
}
