export interface IOpenAiMessage {
    role: "system" | "user" | "assistant"
    content: string
}
