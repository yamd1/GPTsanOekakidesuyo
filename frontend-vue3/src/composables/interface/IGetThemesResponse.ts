export interface IGetThemesResponse {
    themes: IGetThemes[]
}

interface IGetThemes {
    id: number
    theme: string
    created_at: Date
    updated_at: Date | null
} 
