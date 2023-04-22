import {Service} from "@tsed/di";
import {BadRequest} from "@tsed/exceptions";
import {Axios, AxiosResponse} from "axios";
import {IOpenAiMessage} from "../interface/IOpenAiMessage";
import {OpenAiRequest} from "../requests/OpenAiRequest";
import {OpenAiResponse} from "../responses/OpenAiResponse";
import {IOpenAiRawResponse} from "./interface/IOpenAiRawResponse";
import {IOpenAiService} from "./interface/IOpenAiService";

@Service()
export class OpenAiService implements IOpenAiService {


    /**
     * 実行関数
     */
    async run(request: OpenAiRequest): Promise<OpenAiResponse> {

        const response = await this.callChatGptApi(request)
            .catch((error: Error) => {
                throw new BadRequest(error.message)
            })

        return await this.createResponse(response.data)
    }


    /**
     * OpenAI API へHTTPリクエストを送信する
     */
    private async callChatGptApi(request: OpenAiRequest): Promise<AxiosResponse<IOpenAiRawResponse, Error>> {
        const axios = new Axios()
        const response = await axios.post(
            process.env['OPENAI_API_ENDPOINT']!,
            await this.createPostData(request),
            await this.createHeaders()
        )

        return response
    }


    /**
     * OpenAI API へ送信するリクエストデータを生成する
     */
    private async createPostData(request: OpenAiRequest) {
        return {
            "data": {
                "model": request._model,
                "messages": request._messages,
                "temperature": request._temperture
            }
        }
    }


    /**
     * OpenAI API へ送信するリクエストヘッダを生成する
     */
    private async createHeaders() {
        return {
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env['OPENAI_API_KEY']}`
            }
        }
    }


    /**
     * メインロジックへ返却するレスポンスデータを生成する
     */
    private async createResponse(response: IOpenAiRawResponse): Promise<OpenAiResponse> {
        const openAiResponse = new OpenAiResponse()
        openAiResponse._message = {
            "role": response.choices[0].message.role,
            "content": response.choices[0].message.content
        }
        return openAiResponse
    }
}
