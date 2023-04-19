import {BadRequest} from "@tsed/exceptions";
import {Axios, AxiosResponse} from "axios";
import {OpenAiRequest} from "../requests/OpenAiRequest";
import {OpenAiResponse} from "../responses/OpenAiResponse";
import {IOpenAiRawResponse} from "./interface/IOpenAiRawResponse";
import {IOpenAiService} from "./interface/IOpenAiService";

export class OpenAiService implements IOpenAiService {

    async run(request: OpenAiRequest): Promise<OpenAiResponse> {
        const response = await this.callChatGptApi(request)
            .catch((error: Error) => {
                throw new Error(BadRequest.name)
            })

        return await this.createResponse(response.data)
    }

    async callChatGptApi(request: OpenAiRequest): Promise<AxiosResponse<IOpenAiRawResponse, Error>> {
        const axios = new Axios()
        const response = await axios.post(
            process.env['OPENAI_API_ENDPOINT']!,
            await this.createPostData(request),
            await this.createHeaders()
        )

        return response
    }

    async createPostData(request: OpenAiRequest) {
        return {
            "data": {
                "model": request._model,
                "messages": request._messages,
                "temperature": request._temperture
            }
        }
    }

    async createHeaders() {
        return {
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env['OPENAI_API_KEY']}`
            }
        }
    }

    async createResponse(response: IOpenAiRawResponse): Promise<OpenAiResponse> {
        const openAiResponse = new OpenAiResponse()
        const messages = {
            "role": response.choices[0].message.role,
            "content": response.choices[0].message.content
        }
        openAiResponse._messages = messages


        return openAiResponse
    }
}
