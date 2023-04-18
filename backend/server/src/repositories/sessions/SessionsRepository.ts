import {messages, PrismaClient, PrismaPromise, sessions} from "@prisma/client";
import {Service} from "@tsed/di";
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
}
