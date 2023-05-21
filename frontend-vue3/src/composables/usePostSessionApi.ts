import axios, { AxiosError, AxiosResponse } from "axios";
import { ref } from "vue";

export default function usePostSessionApi(message: () => string, id?: () => number) {
    const response = ref("")
    axios.post(
        `${import.meta.env.VITE_API_BASE}${import.meta.env.VITE_API_SESSION}`,
        { name: ""/** TODO: */, message: message() }
    ).then((res: AxiosResponse) => {
        response.value = res.data.session.response;
    }).catch((err: AxiosError) => {
        console.error(err)
    })

    return { response }
}