import {GetThemesResponse} from "src/responses/themes/GetThemesResponse";

export interface IGetThemesService {
    run(): Promise<GetThemesResponse>
}
