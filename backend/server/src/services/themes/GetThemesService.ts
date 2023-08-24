import {PrismaClient, themes} from "@prisma/client";
import {Inject, Injectable, ProviderType} from "@tsed/di";
import {IThemesRepository} from "../../repositories/themes/interface/IThemesRepository";
import {ThemesRepository} from "../../repositories/themes/ThemesRepository";
import {GetThemesResponse} from "../../responses/themes/GetThemesResponse";
import {Theme} from "../../responses/themes/Theme";
import {IGetThemesService} from "./interface/IGetThemesService";


@Injectable({type: ProviderType.PROVIDER})
export class GetThemesService implements IGetThemesService {

    @Inject(ThemesRepository)
    private themesRepository: IThemesRepository

    /**
     * themesテーブルの全レコードを取得し、返却する
     */
    async run(): Promise<GetThemesResponse> {
        const prisma = new PrismaClient()
        return prisma.$transaction(async (prisma: PrismaClient) => {

            // TODO: ランダムなテーマを取得するように変更
            const themes = await this.themesRepository.findAll(prisma)

            return this.createResponse(themes)
        })
    }

    /**
     * GetThemesResponseを生成する
     * @param {Array<themes>} themes
     * @returns {Promise<GetThemesResponse>}
     */
    async createResponse(themes: Array<themes>): Promise<GetThemesResponse> {
        const responses = new Array<Theme>()

        for (const theme of themes) {
            const response = new Theme()
            response._id = theme.id
            response._theme = theme.theme
            response._created_at = theme.created_at
            response._updated_at = theme.updated_at

            responses.push(response)
        }

        const getThemesResponse = new GetThemesResponse()
        getThemesResponse._themes = responses
        return getThemesResponse
    }
}
