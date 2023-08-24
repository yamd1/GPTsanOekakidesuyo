import {Controller, Inject, Injectable, ProviderType, Service} from "@tsed/di";
import {Get} from "@tsed/schema";
import {GetSessionsResponse} from "../../responses/sessions/GetSessionsResponse";
import {GetSessionsService} from "../../services/sessions/GetSessionsServie";
import {IGetSessionsService} from "../../services/sessions/interface/IGetSessionsService";

@Controller('/sessions')
@Injectable({type: ProviderType.CONTROLLER})
export class SessionsController {

    @Inject(GetSessionsService)
    private getSessionsService: IGetSessionsService

    @Get('/')
    getSessions(): Promise<GetSessionsResponse> {
        return this.getSessionsService.run()
    }
}
