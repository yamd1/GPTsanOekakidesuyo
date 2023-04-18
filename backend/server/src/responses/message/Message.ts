export class Message {
    private id: number
    private role: string
    private content: string

    get _id(): number {
        return this.id
    }

    set _id(id: number) {
        this.id = id
    }

    get _role(): string {
        return this.role
    }

    set _role(role: string) {
        this.role = role
    }

    get _content(): string {
        return this.content
    }

    set _content(content: string) {
        this.content = content
    }
}
