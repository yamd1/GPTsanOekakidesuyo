import {PrismaClient, sessions} from "@prisma/client";
import {Inject, Injectable, ProviderType, Service} from "@tsed/di";
import {GetSessionResponse} from "../../responses/session/GetSessionResponse";
import {Message} from "../../responses/message/Message";
import {GetSession} from "../../responses/session/GetSession";
import {IGetsessionService} from "./interface/IGetSessionService";
import {SessionsRepository} from "../../repositories/sessions/SessionsRepository";
import {messagesWithSession} from "../../repositories/messages/interface/IMessages";
import {ISessionsRepository} from "../../repositories/sessions/interface/ISessionsRepositoy";

@Injectable({type: ProviderType.PROVIDER})
export class GetSessionService implements IGetsessionService {

    @Inject(SessionsRepository)
    private sessionsRepository: ISessionsRepository

    /**
     * QueryParamで受け取ったidをベースにレコードを取得
     * @param id: number
     * @return GetSessionResponse
     */
    run(id: number): Promise<GetSessionResponse> {
        const prisma = new PrismaClient()
        return prisma.$transaction(async (prisma: PrismaClient) => {
            const session = await this.sessionsRepository.findById(prisma, id)

            return await this.createResponse(session)
        })
    }


    /**
     * レスポンスを生成
     * @param record DBから返却されたレコード
     * @return 返却するレスポンス
     */
    private async createResponse(record: sessions & messagesWithSession | null): Promise<GetSessionResponse> {

        const getSessionResponse = new GetSessionResponse()
        if (record === null) {
            getSessionResponse._session = null
            return getSessionResponse
        }
        getSessionResponse._session = await this.createSession(record)

        return getSessionResponse
    }

    /**
     * レスポンス内部の要素をを生成
     * @param record DBから返却されたレコード
     * @return Session
     */
    private async createSession(record: sessions & messagesWithSession): Promise<GetSession> {

        const session = new GetSession()
        session._id = record.id
        session._name = record.name
        session._messages = await this.createMessages(record)

        return session
    }

    /**
     * レスポンス内部の要素を生成
     * @param record DBから返却されたレコード
     * @return Array<Message>
     */
    private async createMessages(record: sessions & messagesWithSession): Promise<Array<Message>> {

        const messages = new Array<Message>()
        for (const message of record.messages) {
            const response = new Message()
            response._id = message.id
            response._role = message.role
            response._content = message.content

            messages.push(response)
        }

        return messages
    }
}
