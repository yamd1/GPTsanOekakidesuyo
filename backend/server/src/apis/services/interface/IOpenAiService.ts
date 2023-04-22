import {OpenAiRequest} from "../../requests/OpenAiRequest";
import {OpenAiResponse} from "../../responses/OpenAiResponse";

export interface IOpenAiService {
    run(request: OpenAiRequest): Promise<OpenAiResponse>
}
