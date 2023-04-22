import util from 'util'
import {PlatformTest} from "@tsed/common"
import {GetThemesResponse} from '../../src/responses/themes/GetThemesResponse'
import {GetThemesService} from '../../src/services/themes/GetThemesService'
import {Theme} from '../../src/responses/themes/Theme'


describe("GetThemesService", () => {
    beforeEach(PlatformTest.create)
    afterEach(async () => {
        const exec = util.promisify(require('child_process').exec)
        await exec('./node_modules/.bin/prisma db')
    })
    afterEach(PlatformTest.reset)

    let response: GetThemesResponse
    let themes: Array<Theme>
    let theme1: Theme
    let theme2: Theme
    let theme3: Theme
    let theme4: Theme

    /**
     * テストケース1
     * データが取得できることを確認する
     */
    it("GetThemesService テスト1", async () => {

        const service = PlatformTest.get<GetThemesService>(GetThemesService);

        // テスト期待値の設定
        themes = new Array<Theme>()

        theme1 = new Theme()
        theme1._id = 1
        theme1._theme = "ダイア"
        theme1._created_at = new Date("2023-04-16 10:00:00")
        theme1._updated_at = null
        themes.push(theme1)

        theme2 = new Theme()
        theme2._id = 2
        theme2._theme = "ハート"
        theme2._created_at = new Date("2023-04-16 10:00:00")
        theme2._updated_at = null
        themes.push(theme2)

        theme3 = new Theme()
        theme3._id = 3
        theme3._theme = "スペード"
        theme3._created_at = new Date("2023-04-16 10:00:00")
        theme3._updated_at = null
        themes.push(theme3)

        theme4 = new Theme()
        theme4._id = 4
        theme4._theme = "クローバー"
        theme4._created_at = new Date("2023-04-16 10:00:00")
        theme4._updated_at = null
        themes.push(theme4)


        response = new GetThemesResponse()
        response._themes = themes

        // テスト対象の呼び出し
        const result = await service.run()

        expect(result).toEqual(response)
    })
})
