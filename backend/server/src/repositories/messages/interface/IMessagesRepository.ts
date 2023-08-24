import {PrismaClient, PrismaPromise} from "@prisma/client";
import {IOpenAiMessage} from "../../../apis/interface/IOpenAiMessage";
import {RoleContent} from "../../../services/session/interface/IPostSessionService";

export interface IMessagesRepository {
    createMany(prisma: PrismaClient, sessionId: number, userMessage: RoleContent, openAiResponse: IOpenAiMessage): PrismaPromise<{count: number}>
}
