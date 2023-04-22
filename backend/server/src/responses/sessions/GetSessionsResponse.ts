import {GetSessions} from "./GetSessions";

export class GetSessionsResponse {
    private sessions: Array<GetSessions>

    get _sessions(): Array<GetSessions> {
        return this.sessions
    }

    set _sessions(sessions: Array<GetSessions>) {
        this.sessions = sessions
    }
}
