import {PrismaClient, PrismaPromise, themes} from "@prisma/client";

export interface IThemesRepository {
    findAll(prisma: PrismaClient): PrismaPromise<Array<themes>>;
}
