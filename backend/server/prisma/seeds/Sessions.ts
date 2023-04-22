import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const sessions = async () => {
    await prisma.$queryRaw`SET foreign_key_checks = 0;`
    await prisma.sessions.createMany({
        data: [
            {id: 1, name: "ゲーム1", created_at: new Date('2023-04-16 10:00:00'), updated_at: null},
            {id: 2, name: "ゲーム2", created_at: new Date('2023-04-16 10:00:00'), updated_at: null},
            {id: 3, name: "ゲーム3", created_at: new Date('2023-04-16 10:00:00'), updated_at: null},
            {id: 4, name: "ゲーム4", created_at: new Date('2023-04-16 10:00:00'), updated_at: null}
        ]
    })
}

