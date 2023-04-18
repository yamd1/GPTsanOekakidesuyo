import {Message} from "../message/Message"

export class Session {

    private id: number
    private name: string
    private messages: Array<Message>

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

    get _messages(): Array<Message> {
        return this.messages
    }

    set _messages(messages: Array<Message>) {
        this.messages = messages
    }
}
