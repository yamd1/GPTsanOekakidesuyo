import {PrismaClient} from "@prisma/client"
import {messages} from "./Messages"
import {sessions} from "./Sessions"
import {themes} from "./Themes"


const prisma = new PrismaClient()

const main = async () => {

    await prisma.$queryRaw`SET foreign_key_checks = 0;`

    // Reset Databases
    await prisma.themes.deleteMany()
    await prisma.sessions.deleteMany()
    await prisma.messages.deleteMany()

    // Import seed data
    await themes()
    await sessions()
    await messages()
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
