import {PrismaClient, PrismaPromise, sessions} from "@prisma/client";
import {Service} from "@tsed/di";
import {IOpenAiMessage} from "../../apis/interface/IOpenAiMessage";
import {OpenAiResponse} from "../../apis/responses/OpenAiResponse";
import {PostSessionRequest} from "../../requests/session/PostSessionRequest";
import {messagesWithSession} from "../messages/interface/IMessages";

@Service()
export class SessionsRepository {

    /**
     * id に合致するSessionレコードと紐づくmessageレコードを取得する
     *
     * @param prisma PrismaClient
     * @param id number
     * @return PrismaPromise<sessions | null>
     */
    findById(prisma: PrismaClient, id: number): PrismaPromise<sessions & messagesWithSession | null> {
        return prisma.sessions.findFirst({
            where: {
                "id": {
                    "equals": id
                }
            },
            include: {
                "messages": true
            }
        })
    }

    createWithMessages(prisma: PrismaClient, data: PostSessionRequest, openAiResponse: IOpenAiMessage) {
        return prisma.sessions.create({
            data: {
                name: data._name!,
                messages: {
                    create: [
                        {role: "user", content: data._message},
                        {role: openAiResponse.role, content: openAiResponse.content}
                    ]
                }

            },
            include: {
                messages: true
            }
        })
    }
}
