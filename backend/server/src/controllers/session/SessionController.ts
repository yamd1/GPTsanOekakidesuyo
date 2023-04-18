import {Controller, Inject, Service} from "@tsed/di";
import {PathParams} from "@tsed/platform-params";
import {Get} from "@tsed/schema";
import {GetSessionResponse} from "../../responses/session/GetSessionResponse";
import {GetSessionService} from "../../services/session/GetSessionService";

@Controller('/session')
@Service()
export class SessionController {

    @Inject()
    private getSessionService: GetSessionService

    @Get('/:id')
    getSession(@PathParams("id", Number) id: number): Promise<GetSessionResponse> {
        return this.getSessionService.run(id)
    }
}
