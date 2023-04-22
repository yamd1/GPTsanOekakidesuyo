import util from 'util'
import {PlatformTest} from "@tsed/common"
import {PostSessionResponse} from '../../src/responses/session/PostSessionResponse'
import {PostSessionService} from '../../src/services/session/PostSessionService'
import {PostSession} from '../../src/responses/session/PostSession'
import {PostSessionRequest} from '../../src/requests/session/PostSessionRequest'


describe("PostSessionService", () => {
    beforeEach(PlatformTest.create)
    afterEach(async () => {
        const exec = util.promisify(require('child_process').exec)
        await exec('./node_modules/.bin/prisma db')
    })
    afterEach(PlatformTest.reset)

    let request: PostSessionRequest
    let response: PostSessionResponse
    let session: PostSession

    /**
     * テストケース1
     * 過去のやり取りを引き継いでOpenAIにPostできることを確認する
     */
    it("PostSessionService テスト1", async () => {

        const service = PlatformTest.get<PostSessionService>(PostSessionService);

        // リクエストパラメータの設定
        request = new PostSessionRequest()
        request._id = 2
        request._name = "ゲーム2"
        request._message = "傘を英語でいうとなんですか？"

        // テスト期待値の設定
        session = new PostSession()
        session._id = 2
        session._name = "ゲーム2"
        session._response = expect.any(String)

        response = new PostSessionResponse()
        response._session = session

        // テスト対象の呼び出し
        const result = await service.run(request)

        expect(result).toEqual(response)
    })


    /**
     * テストケース2
     * 新規でセッションを作成したうえでOpenAIにPostできることを確認する
     */
    it("PostSessionService テスト2", async () => {

        const service = PlatformTest.get<PostSessionService>(PostSessionService);

        // リクエストパラメータの設定
        request = new PostSessionRequest()
        request._name = "ゲーム3"
        request._message = "傘を英語でいうとなんですか？"

        // テスト期待値の設定
        session = new PostSession()
        session._id = expect.any(Number)
        session._name = "ゲーム3"
        session._response = expect.any(String)

        response = new PostSessionResponse()
        response._session = session

        // テスト対象の呼び出し
        const result = await service.run(request)

        expect(result).toEqual(response)
    })


    /**
     * テストケース
     * セッションIDが存在しない場合、エラーが発生することを確認する
     */
    it("PostSessionService テスト3", async () => {

        const service = PlatformTest.get<PostSessionService>(PostSessionService);

        // リクエストパラメータの設定
        request = new PostSessionRequest()
        request._id = 999
        request._name = "ゲーム3"
        request._message = "傘を英語でいうとなんですか？"

        // テスト対象の呼び出し
        expect(service.run(request)).rejects.toThrowError()
    })

})

