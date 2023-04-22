import util from 'util'
import {PlatformTest} from "@tsed/common"
import {GetSessionResponse} from '../../src/responses/session/GetSessionResponse'
import {GetSessionService} from '../../src/services/session/GetSessionService'
import {GetSession} from '../../src/responses/session/GetSession'
import {Message} from '../../src/responses/message/Message'


describe("GetSessionService", () => {
    beforeEach(PlatformTest.create)
    afterEach(async () => {
        const exec = util.promisify(require('child_process').exec)
        await exec('./node_modules/.bin/prisma db')
    })
    afterEach(PlatformTest.reset)

    let response: GetSessionResponse
    let session: GetSession
    let message1: Message
    let messages: Array<Message>

    /**
     * テストケース1
     * データが取得できることを確認する
     */
    it("GetSessionService テスト1", async () => {

        const service = PlatformTest.get<GetSessionService>(GetSessionService);

        // リクエストパラメータの設定
        const requestId = 2

        // テスト期待値の設定
        messages = new Array<Message>()
        message1 = new Message()
        message1._id = 3
        message1._role = "user"
        message1._content = "first message"
        messages.push(message1)

        session = new GetSession()
        session._id = 2
        session._name = "ゲーム2"
        session._messages = messages

        response = new GetSessionResponse()
        response._session = session

        // テスト対象の呼び出し
        const result = await service.run(requestId)

        expect(result).toEqual(response)
    })

    /**
     * テストケース2
     * データが取得できなかった場合のテスト
     */
    it("GetSessionService テスト2", async () => {

        const service = PlatformTest.get<GetSessionService>(GetSessionService);

        // リクエストパラメータの設定
        const requestId = 3

        // テスト期待値の設定
        response = new GetSessionResponse()
        response._session = null

        // テスト対象の呼び出し
        const result = await service.run(requestId)

        expect(result).toEqual(response)
    })
})
