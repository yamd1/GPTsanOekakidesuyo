import {PrismaClient} from "@prisma/client";
import {Service} from "@tsed/di";
import {IOpenAiMessage} from "../../apis/interface/IOpenAiMessage";
import {RoleContent} from "../../services/session/interface/IPostSessionService";

@Service()
export class MessagesRepository {

    create(prisma: PrismaClient, sessionId: number, roleContent: RoleContent | IOpenAiMessage) {
        return prisma.messages.create({
            data: {
                role: roleContent.role,
                content: roleContent.content,
                sessions: {
                    connect: {
                        id: sessionId
                    }
                },
            },
            include: {
                sessions: true
            }
        })
    }
}
