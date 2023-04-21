import {Controller, Inject, Service} from "@tsed/di";
import {BodyParams, PathParams} from "@tsed/platform-params";
import {Get, Post} from "@tsed/schema";
import {PostSessionRequest} from "../../requests/session/PostSessionRequest";
import {GetSessionResponse} from "../../responses/session/GetSessionResponse";
import {PostSessionResponse} from "../../responses/session/PostSessionResponse";
import {GetSessionService} from "../../services/session/GetSessionService";
import {PostSessionService} from "../../services/session/PostSessionService";

@Controller('/session')
@Service()
export class SessionController {

    @Inject()
    private getSessionService: GetSessionService
    @Inject()
    private postSessionService: PostSessionService

    @Get('/:id')
    getSession(@PathParams("id", Number) id: number): Promise<GetSessionResponse> {
        return this.getSessionService.run(id)
    }

    @Post('/')
    postSession(@BodyParams('postSessionRequest', PostSessionRequest) postSessionRequest: PostSessionRequest): Promise<PostSessionResponse> {
        console.log(postSessionRequest)
        return this.postSessionService.run(postSessionRequest)
    }
}
