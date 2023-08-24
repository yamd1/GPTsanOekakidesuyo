import {PrismaClient, PrismaPromise, themes} from "@prisma/client";
import {Injectable, ProviderType, Service} from "@tsed/di";
import {IThemesRepository} from "./interface/IThemesRepository";


@Injectable({type: ProviderType.PROVIDER})
export class ThemesRepository implements IThemesRepository {
    findAll(prisma: PrismaClient): PrismaPromise<Array<themes>> {
        return prisma.themes.findMany({})
    }
}
