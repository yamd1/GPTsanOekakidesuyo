import {IsNumberString, IsOptional, IsString} from "class-validator";

export class PostSessionRequest {
    @IsNumberString()
    @IsOptional()
    private id?: number

    @IsString()
    @IsOptional()
    private name?: string

    @IsString()
    private message: string

    get _id(): number | undefined {
        return this.id
    }

    set _id(id: number | undefined) {
        this.id = id
    }

    get _name(): string | undefined {
        return this.name
    }

    set _name(name: string | undefined) {
        this.name = name
    }

    get _message(): string {
        return this.message
    }

    set _message(message: string) {
        this.message = message
    }
}
