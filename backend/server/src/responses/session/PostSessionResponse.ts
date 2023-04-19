import {PostSession} from "./PostSession";

export class PostSessionResponse {
    private session: PostSession

    get _session(): PostSession {
        return this.session
    }

    set _session(session: PostSession) {
        this.session = session
    }
}
