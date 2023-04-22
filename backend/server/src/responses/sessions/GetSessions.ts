export class GetSessions {
    private id: number
    private name: string
    private created_at: Date
    private updated_at: Date | null

    get _id(): number {
        return this.id
    }

    set _id(id: number) {
        this.id = id
    }

    get _name(): string {
        return this.name
    }

    set _name(name: string) {
        this.name = name
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
