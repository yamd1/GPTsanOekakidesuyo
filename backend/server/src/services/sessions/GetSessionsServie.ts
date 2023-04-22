import {PrismaClient, sessions} from "@prisma/client";
import {Inject, Service} from "@tsed/di";
import {SessionsRepository} from "../../repositories/sessions/SessionsRepository";
import {GetSessions} from "../../responses/sessions/GetSessions";
import {GetSessionsResponse} from "../../responses/sessions/GetSessionsResponse";
import {IGetSessionsService} from "./interface/IGetSessionsService";

@Service()
export class GetSessionsService implements IGetSessionsService {

    @Inject()
    private sessionsRepository: SessionsRepository

    run(): Promise<GetSessionsResponse> {

        const prisma = new PrismaClient()
        return prisma.$transaction(async (prisma: PrismaClient) => {

            const sessions = await this.sessionsRepository.findAll(prisma)
            return await this.createResponse(sessions)
        })
    }



    async createResponse(sessions: Array<sessions>): Promise<GetSessionsResponse> {
        const getSessionsResponse = new GetSessionsResponse()
        getSessionsResponse._sessions = await this.createGetSessions(sessions)

        return getSessionsResponse
    }

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





