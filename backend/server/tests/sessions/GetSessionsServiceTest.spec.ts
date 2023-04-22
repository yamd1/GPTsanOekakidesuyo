import util from 'util'
import {PlatformTest} from "@tsed/common";
import {GetSessionsResponse} from '../../src/responses/sessions/GetSessionsResponse'
import {GetSessions} from '../../src/responses/sessions/GetSessions'
import {GetSessionsService} from '../../src/services/sessions/GetSessionsServie'


describe("GetSessionsServie", () => {
    beforeEach(PlatformTest.create);
    afterEach(async () => {
        const exec = util.promisify(require('child_process').exec);
        await exec('./node_modules/.bin/prisma db')
    });
    afterEach(PlatformTest.reset);

    let response: GetSessionsResponse
    let sessions: Array<GetSessions>
    let session1: GetSessions
    let session2: GetSessions

    /**
     * テストケース1
     * データが取得できることを確認する
     */
    it("GetSessionsService テスト1", async () => {

        const service = PlatformTest.get<GetSessionsService>(GetSessionsService);
        // テスト期待値の設定
        sessions = new Array<GetSessions>()

        session1 = new GetSessions()
        session1._id = 1
        session1._name = "ゲーム1"
        session1._created_at = new Date('2023-04-16 10:00:00')
        session1._updated_at = null
        sessions.push(session1)

        session2 = new GetSessions()
        session2._id = 2
        session2._name = "ゲーム2"
        session2._created_at = new Date('2023-04-16 10:00:00')
        session2._updated_at = null
        sessions.push(session2)

        response = new GetSessionsResponse()
        response._sessions = sessions

        // テスト対象の呼び出し
        const result = await service.run()

        expect(result).toEqual(response);
    });
});
