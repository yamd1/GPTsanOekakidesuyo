import {Controller, Inject, Injectable, ProviderType, Service} from "@tsed/di";
import {BodyParams, PathParams} from "@tsed/platform-params";
import {Get, Post} from "@tsed/schema";
import {PostSessionRequest} from "../../requests/session/PostSessionRequest";
import {GetSessionResponse} from "../../responses/session/GetSessionResponse";
import {PostSessionResponse} from "../../responses/session/PostSessionResponse";
import {GetSessionService} from "../../services/session/GetSessionService";
import {IGetsessionService} from "../../services/session/interface/IGetSessionService";
import {IPostSessionService} from "../../services/session/interface/IPostSessionService";
import {PostSessionService} from "../../services/session/PostSessionService";

@Controller('/session')
@Injectable({type: ProviderType.CONTROLLER})
export class SessionController {

    @Inject(GetSessionService)
    private getSessionService: IGetsessionService
    @Inject(PostSessionService)
    private postSessionService: IPostSessionService

    @Get('/:id')
    getSession(@PathParams("id", Number) id: number): Promise<GetSessionResponse> {
        return this.getSessionService.run(id)
    }

    @Post('/')
    postSession(@BodyParams(PostSessionRequest) postSessionRequest: PostSessionRequest): Promise<PostSessionResponse> {
        return this.postSessionService.run(postSessionRequest)
    }
}
