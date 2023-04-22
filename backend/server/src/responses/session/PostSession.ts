export class PostSession {
    private id: number
    private name: string
    private response: string

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

    get _response(): string {
        return this.response
    }

    set _response(response: string) {
        this.response = response
    }
}
