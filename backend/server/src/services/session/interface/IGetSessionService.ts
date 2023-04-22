import {GetSessionResponse} from "../../../responses/session/GetSessionResponse";

export interface IGetsessionService {
    run(id: number): Promise<GetSessionResponse>
}
