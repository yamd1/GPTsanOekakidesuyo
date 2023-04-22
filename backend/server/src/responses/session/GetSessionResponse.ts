import {GetSession} from "./GetSession";

export class GetSessionResponse {
    private session: GetSession | null

    get _session(): GetSession | null {
        return this.session
    }

    set _session(session: GetSession | null) {
        this.session = session
    }
}
