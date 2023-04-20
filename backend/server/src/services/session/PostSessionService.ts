import {PrismaClient, sessions} from "@prisma/client";
import {Inject, Service} from "@tsed/di";
import {BadRequest} from "@tsed/exceptions";
import {IOpenAiMessage} from "../../apis/interface/IOpenAiMessage";
import {OpenAiRequest} from "../../apis/requests/OpenAiRequest";
import {OpenAiResponse} from "../../apis/responses/OpenAiResponse";
import {OpenAiService} from "../../apis/services/OpenAiService";
import {ErrorConst} from "../../Consts/ErrorConst";
import {messagesWithSession} from "../../repositories/messages/interface/IMessages";
import {MessagesRepository} from "../../repositories/messages/MessagesRepository";
import {SessionsRepository} from "../../repositories/sessions/SessionsRepository";
import {PostSessionRequest} from "../../requests/session/PostSessionRequest";
import {PostSession} from "../../responses/session/PostSession";
import {PostSessionResponse} from "../../responses/session/PostSessionResponse";
import {IPostSessionService, RoleContent} from "./interface/IPostSessionService";

@Service()
export class PostSessionService implements IPostSessionService {

    @Inject()
    private sessionsRepository: SessionsRepository
    @Inject()
    private messagesRepository: MessagesRepository
    @Inject()
    private openAiService: OpenAiService


    /**
     * 処理の流れはシーケンス図に記載
     * /docs/PostSession.svg
     */
    run(request: PostSessionRequest): Promise<PostSessionResponse> {
        const prisma = new PrismaClient()
        return prisma.$transaction(async (prisma: any) => {

            // 過去のゲームが存在する場合
            if (request._id !== undefined) {
                const session = await this.sessionsRepository.findById(prisma, request._id)

                if (session === null) {
                    throw new BadRequest(ErrorConst.NOT_FOUND_TARGET)
                }

                // 新たに受信したリクエストメッセージ
                const userMessage = await this.createUserMessage(request)

                // 過去のやり取りをマージして、OpenAIへ送信するリクエストを構築・送信
                const openAiRequest = await this.createRequestWithSessionOpenAi(session, userMessage)
                const openAiResponse = await this.openAiService.run(openAiRequest)

                // messagesテーブルへ保存
                await this.saveMessagesTable(prisma, session.id, userMessage, openAiResponse._message)
                return await this.createResponse(openAiResponse, session)
            }

            // 新規でゲームがスタートする場合
            if (request._id === undefined) {
                const userMessage = await this.createUserMessage(request)
                const openAiRequest = await this.createRequestOpenAi(userMessage)
                const openAiResponse = await this.openAiService.run(openAiRequest)

                // sessions / messages テーブルへ保存
                const session = await this.saveSessionsAndMessagesTable(prisma, request, openAiResponse._message)
                return await this.createResponse(openAiResponse, session)
            }

            return new PostSessionResponse()
        })
    }


    /**
     * messagesテーブルへデータを登録する
     */
    async saveMessagesTable(prisma: PrismaClient, sessionId: number, userMessage: RoleContent, openAiResponse: IOpenAiMessage) {
        this.messagesRepository.create(prisma, sessionId, userMessage)
        this.messagesRepository.create(prisma, sessionId, openAiResponse)
    }


    /**
     * sessions / messages テーブルへデータを登録する
     */
    async saveSessionsAndMessagesTable(prisma: PrismaClient, postSessionRequest: PostSessionRequest, openAiResponse: IOpenAiMessage) {
        return this.sessionsRepository.createWithMessages(prisma, postSessionRequest, openAiResponse)
    }


    /**
     * ユーザーからのメッセージを整形する
     */
    async createUserMessage(request: PostSessionRequest) {
        return {role: "user", "content": request._message}
    }


    /**
     * 過去のゲーム履歴を元に、OpenAIに対してリクエストを整形する
     */
    async createRequestWithSessionOpenAi(session: sessions & messagesWithSession, newUserMessage: RoleContent): Promise<OpenAiRequest> {
        const messages = new Array<IOpenAiMessage>()
        for (const message of session.messages) {
            messages.push({role: message.role, content: message.content})
        }

        messages.push(newUserMessage)

        const openAiRequest = new OpenAiRequest()
        openAiRequest._messages = messages
        openAiRequest._model = process.env['OPENAI_CHAT_MODEL']!
        openAiRequest._temperture = Number(process.env['OPENAI_CHAT_TEMPERTURE']!)

        return openAiRequest
    }


    /**
     * 新規ゲーム時に、OpenAIに対してリクエストを整形する
     */
    async createRequestOpenAi(userMessage: RoleContent): Promise<OpenAiRequest> {
        const openAiRequest = new OpenAiRequest()
        openAiRequest._messages = new Array(userMessage)
        openAiRequest._model = process.env['OPENAI_CHAT_MODEL']!
        openAiRequest._temperture = Number(process.env['OPENAI_CHAT_TEMPERTURE']!)
        return openAiRequest
    }


    /**
     * ユーザーへ返却するレスポンスを整形する
     */
    async createResponse(response: OpenAiResponse, session: sessions): Promise<PostSessionResponse> {
        const postSessionResponse = new PostSessionResponse()
        postSessionResponse._session = await this.createResponseSession(response, session)
        return postSessionResponse
    }


    /**
     * レスポンス内部のsession情報を整形する
     */
    async createResponseSession(response: OpenAiResponse, session: sessions): Promise<PostSession> {
        const postSession = new PostSession()
        postSession._id = session.id
        postSession._name = session.name
        postSession._response = response._message.content
        return postSession
    }

}
