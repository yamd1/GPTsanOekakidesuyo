import {Controller, Inject, Service} from "@tsed/di";
import {Get} from "@tsed/schema";
import {GetThemesService} from "../../services/themes/GetThemesService";
import {GetThemesResponse} from "../../responses/themes/GetThemesResponse";


@Controller('/themes')
@Service()
export class GetThemesController {

    @Inject()
    private getThemesService: GetThemesService


    @Get('/')
    async getThemes(): Promise<GetThemesResponse> {
        return this.getThemesService.run()
    }
}
