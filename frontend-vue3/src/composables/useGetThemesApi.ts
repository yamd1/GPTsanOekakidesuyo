import { IGetThemesResponse } from "./interface/IGetThemesResponse"
import { ref } from "vue"
import axios from "axios"
import { ErrorConsts } from "../consts/ErrorConsts"

export default function useGetThemesApi() {
    const themes = ref<IGetThemesResponse>()

    // テーマ取得
    const getThemes = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_BASE + import.meta.env.VITE_API_THEMES)
            themes.value = response.data
        } catch (error) {
            console.error(error)
        }
    }

    // 取得したテーマからランダムに一つ選択する
    const randomTheme = async () => {
        await getThemes()
        if (themes.value === undefined) throw new Error(ErrorConsts.ERROR_UNDEFINED_THEME)
        const random = Math.floor(Math.random() * themes.value.themes.length)
        return themes.value.themes[random].theme
    }

    return { randomTheme }
}
