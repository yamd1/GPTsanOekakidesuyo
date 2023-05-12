import {IGetThemesResponse} from "./interface/GetThemesResponse"
import {ref} from "vue"
import axios from "axios"

export default function useGetThemesApi() {
    const themes = ref<IGetThemesResponse[]>([])
    // const getThemes = async () => {
    //     const res = await fetch('http://localhost:3000/themes')
    //     themes.value = await res.json()
    // }

    const getThemes = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_APP_API_URL + import.meta.env.VITE_APP_API_THEMES)
            themes.value = response.data
        } catch (error) {
            console.error(error)
        }
    }

    const randomTheme = () => {
        getThemes()
            .then(() => {
                const random = Math.floor(Math.random() * themes.value.length)
                return themes.value[random]
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return {randomTheme}
}
