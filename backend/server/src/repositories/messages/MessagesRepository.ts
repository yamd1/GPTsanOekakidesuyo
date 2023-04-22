import {PrismaClient} from "@prisma/client";
import {Service} from "@tsed/di";
import {IOpenAiMessage} from "../../apis/interface/IOpenAiMessage";
import {RoleContent} from "../../services/session/interface/IPostSessionService";

@Service()
export class MessagesRepository {

    createMany(prisma: PrismaClient, sessionId: number, userMessage: RoleContent, openAiResponse: IOpenAiMessage) {
        return prisma.messages.createMany({
            data: [
                {
                    role: userMessage.role,
                    content: userMessage.content,
                    sessions_id: sessionId
                },
                {
                    role: openAiResponse.role,
                    content: openAiResponse.content,
                    sessions_id: sessionId
                }
            ]
        })
    }
}
