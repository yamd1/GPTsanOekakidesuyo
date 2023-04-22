import {PrismaClient, PrismaPromise, themes} from "@prisma/client";
import {Service} from "@tsed/di";


@Service()
export class ThemesRepository {
    findAll(prisma: PrismaClient): PrismaPromise<Array<themes>> {
        return prisma.themes.findMany({})
    }
}
