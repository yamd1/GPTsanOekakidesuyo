import {IOpenAiMessage} from "../interface/IOpenAiMessage";

export class OpenAiResponse {
    private messages: Array<IOpenAiMessage>

    get _messages(): Array<IOpenAiMessage> {
        return this._messages
    }

    set _messages(messages: Array<IOpenAiMessage>) {
        this.messages = messages
    }
}
