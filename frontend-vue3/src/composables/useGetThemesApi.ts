import {IGetThemesResponse} from "./interface/GetThemesResponse"
import {ref} from "vue"
import axios from "axios"

export default function useGetThemesApi() {
    const themes = ref<IGetThemesResponse>()

    const getThemes = async () => {
        try {
            // const response = await axios.get(import.meta.env.VITE_APP_API_BASE + import.meta.env.VITE_APP_API_THEMES)
            const response = await axios.get("http://localhost:8000/themes")
            // console.log(`${import.meta.env.VITE_APP_API_URL}${import.meta.env.VITE_APP_API_THEMES}`)
            themes.value = response.data
        } catch (error) {
            console.error(error)
        }
    }

    const randomTheme = async () => {
        await getThemes()
        if (themes.value === undefined) return console.error("themes is undefined")
        const random = Math.floor(Math.random() * themes.value.themes.length)
        return themes.value.themes[random].theme
    }

    return {randomTheme}
}
