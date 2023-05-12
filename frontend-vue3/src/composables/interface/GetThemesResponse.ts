export interface IGetThemesResponse {
    getThemes: IGetThemes[]
}

interface IGetThemes {
    id: number
    theme: string
    created_at: Date
    updated_at: Date | null
} 
