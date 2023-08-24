import {PrismaClient, PrismaPromise, sessions} from "@prisma/client";
import {IOpenAiMessage} from "../../../apis/interface/IOpenAiMessage";
import {PostSessionRequest} from "../../../requests/session/PostSessionRequest";
import {messagesWithSession} from "../../messages/interface/IMessages";

export interface ISessionsRepository {
    findAll(prisma: PrismaClient): PrismaPromise<Array<sessions>>;
    findById(prisma: PrismaClient, id: number): PrismaPromise<sessions & messagesWithSession | null>;
    createWithMessages(prisma: PrismaClient, data: PostSessionRequest, openAiResponse: IOpenAiMessage): PrismaPromise<sessions>;
}
