import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const themes = async () => {
    await prisma.$queryRaw`SET foreign_key_checks = 0;`
    await prisma.themes.createMany({
        data: [
            {id: 1, theme: "ダイア", created_at: new Date('2023-04-16 10:00:00'), updated_at: null},
            {id: 2, theme: "ハート", created_at: new Date('2023-04-16 10:00:00'), updated_at: null},
            {id: 3, theme: "スペード", created_at: new Date('2023-04-16 10:00:00'), updated_at: null},
            {id: 4, theme: "クローバー", created_at: new Date('2023-04-16 10:00:00'), updated_at: null}
        ]
    })
}

