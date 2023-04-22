import {PrismaClient} from "@prisma/client"
import {messages} from "./Messages"
import {sessions} from "./Sessions"
import {themes} from "./Themes"


const prisma = new PrismaClient()
const main = async () => {

    // Reset Databases
    prisma.themes.deleteMany()
    prisma.sessions.deleteMany()
    prisma.messages.deleteMany()

    // Import seed data
    themes()
    sessions()
    messages()
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
