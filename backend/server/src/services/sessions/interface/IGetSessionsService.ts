import {GetSessionsResponse} from "../../../responses/sessions/GetSessionsResponse";

export interface IGetSessionsService {
    run(): Promise<GetSessionsResponse>
}
