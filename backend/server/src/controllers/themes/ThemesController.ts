import {Controller, Inject, Injectable, ProviderType, Service} from "@tsed/di";
import {Get} from "@tsed/schema";
import {GetThemesService} from "../../services/themes/GetThemesService";
import {GetThemesResponse} from "../../responses/themes/GetThemesResponse";
import {IGetThemesService} from "../../services/themes/interface/IGetThemesService";


@Controller('/themes')
@Injectable({type: ProviderType.CONTROLLER})
export class ThemesController {

    @Inject(GetThemesService)
    private getThemesService: IGetThemesService


    @Get('/')
    async getThemes(): Promise<GetThemesResponse> {
        return this.getThemesService.run()
    }
}
