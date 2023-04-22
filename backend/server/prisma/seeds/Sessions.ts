import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const sessions = async () => {
    await prisma.$queryRaw`SET foreign_key_checks = 0;`
    await prisma.sessions.createMany({
        data: [
            {id: 1, name: "ダイア", created_at: new Date('2023-04-16 10:00:00'), updated_at: null},
            {id: 2, name: "ハート", created_at: new Date('2023-04-16 10:00:00'), updated_at: null},
            {id: 3, name: "スペード", created_at: new Date('2023-04-16 10:00:00'), updated_at: null},
            {id: 4, name: "クローバー", created_at: new Date('2023-04-16 10:00:00'), updated_at: null}
        ]
    })
}

