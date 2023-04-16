import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const messages = async () => {
    await prisma.$queryRaw`SET foreign_key_checks = 0;`
    await prisma.messages.createMany({
        data: [
            {id: 1, message: "first message", sessions_id: 1, created_at: new Date('2023-04-16 10:00:00'), updated_at: null},
            {id: 2, message: "second message", sessions_id: 1, created_at: new Date('2023-04-16 10:00:00'), updated_at: null},
            {id: 3, message: "first message", sessions_id: 2, created_at: new Date('2023-04-16 10:00:00'), updated_at: null},
        ]
    })
}

