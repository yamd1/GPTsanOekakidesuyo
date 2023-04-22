import {Controller, Inject, Service} from "@tsed/di";
import {Get} from "@tsed/schema";
import {GetSessionsResponse} from "../../responses/sessions/GetSessionsResponse";
import {GetSessionsService} from "../../services/sessions/GetSessionsServie";

@Controller('/sessions')
@Service()
export class SessionsController {

    @Inject()
    private getSessionsService: GetSessionsService

    @Get('/')
    getSessions(): Promise<GetSessionsResponse> {
        return this.getSessionsService.run()
    }
}
