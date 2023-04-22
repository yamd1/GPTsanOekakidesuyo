import {IOpenAiMessage} from "../interface/IOpenAiMessage";

export class OpenAiResponse {
    private message: IOpenAiMessage

    get _message(): IOpenAiMessage {
        return this.message
    }

    set _message(message: IOpenAiMessage) {
        this.message = message
    }
}
