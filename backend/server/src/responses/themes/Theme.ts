export class Theme {
    private id: number
    private theme: string
    private created_at: Date
    private updated_at: Date | null

    get _id(): number {
        return this.id
    }

    set _id(id: number) {
        this.id = id
    }

    get _theme(): string {
        return this.theme
    }

    set _theme(theme: string) {
        this.theme = theme
    }

    get _created_at(): Date {
        return this.created_at
    }

    set _created_at(created_at: Date) {
        this.created_at = created_at
    }

    get _updated_at(): Date | null {
        return this.updated_at
    }

    set _updated_at(updated_at: Date | null) {
        this.updated_at = updated_at
    }
}
