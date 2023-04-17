export class Theme {
    private _id: number
    private _theme: string
    private _created_at: Date
    private _updated_at: Date | null

    get id(): number {
        return this._id
    }

    set id(_id: number) {
        this._id = _id
    }

    get theme(): string {
        return this._theme
    }

    set theme(_theme: string) {
        this._theme = _theme
    }

    get created_at(): Date {
        return this._created_at
    }

    set created_at(_created_at: Date) {
        this._created_at = _created_at
    }

    get updated_at(): Date | null {
        return this._updated_at
    }

    set updated_at(_updated_at: Date | null) {
        this._updated_at = _updated_at
    }
}
