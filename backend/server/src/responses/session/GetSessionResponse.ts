import {Session} from "./Session";

export class GetSessionResponse {
    private session: Session | null

    get _session(): Session | null {
        return this.session
    }

    set _session(session: Session | null) {
        this.session = session
    }
}
