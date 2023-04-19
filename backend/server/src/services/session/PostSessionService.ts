import {PrismaClient} from "@prisma/client";
import {Inject, Service} from "@tsed/di";
import {SessionsRepository} from "../../repositories/sessions/SessionsRepository";
import {PostSessionRequest} from "../../requests/session/PostSessionRequest";
import {PostSessionResponse} from "../../responses/session/PostSessionResponse";
import {IPostSessionService} from "./interface/IPostSessionService";

@Service()
export class PostSessionService implements IPostSessionService {
    @Inject()
    private sessionsRepository: SessionsRepository

    run(request: PostSessionRequest): Promise<PostSessionResponse> {
        const prisma = new PrismaClient()
        return prisma.$transaction(async (prisma: any) => {

            return new PostSessionResponse()
        })
    }
}
