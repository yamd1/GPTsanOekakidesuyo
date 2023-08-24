import {PrismaClient, sessions} from "@prisma/client";
import {Inject, Injectable, ProviderType} from "@tsed/di";
import {ISessionsRepository} from "../../repositories/sessions/interface/ISessionsRepositoy";
import {SessionsRepository} from "../../repositories/sessions/SessionsRepository";
import {GetSessions} from "../../responses/sessions/GetSessions";
import {GetSessionsResponse} from "../../responses/sessions/GetSessionsResponse";
import {IGetSessionsService} from "./interface/IGetSessionsService";

@Injectable({type: ProviderType.PROVIDER})
export class GetSessionsService implements IGetSessionsService {

    @Inject(SessionsRepository)
    private sessionsRepository: ISessionsRepository

    /**
     * セッション一覧を取得する 
     * @returns {Promise<GetSessionsResponse>}
     */
    run(): Promise<GetSessionsResponse> {

        const prisma = new PrismaClient()
        return prisma.$transaction(async (prisma: PrismaClient) => {

            const sessions = await this.sessionsRepository.findAll(prisma)
            return await this.createResponse(sessions)
        })
    }



    /**
     * レスポンスを生成する
     * @param {Array<sessions>} sessions
     * @returns {Promise<GetSessionsResponse>}
     */
    async createResponse(sessions: Array<sessions>): Promise<GetSessionsResponse> {
        const getSessionsResponse = new GetSessionsResponse()
        getSessionsResponse._sessions = await this.createGetSessions(sessions)

        return getSessionsResponse
    }


    /**
     * GetSessionsを生成する
     * @param {Array<sessions>} sessions
     * @returns {Promise<Array<GetSessions>>}
     */
    async createGetSessions(sessions: Array<sessions>): Promise<Array<GetSessions>> {
        const getSessionsArray = new Array<GetSessions>()

        for (const session of sessions) {
            const getSessions = new GetSessions()
            getSessions._id = session.id
            getSessions._name = session.name
            getSessions._created_at = session.created_at
            getSessions._updated_at = session.updated_at
            getSessionsArray.push(getSessions)
        }
        return getSessionsArray
    }
}





