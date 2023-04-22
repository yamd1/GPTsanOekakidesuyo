import {PostSessionRequest} from "../../../requests/session/PostSessionRequest";
import {PostSessionResponse} from "../../../responses/session/PostSessionResponse";

export interface IPostSessionService {
    run(request: PostSessionRequest): Promise<PostSessionResponse>
}

export interface RoleContent {
    role: string
    content: string
}
