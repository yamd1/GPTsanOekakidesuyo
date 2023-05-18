<script setup lang="ts">
import { toRefs, onMounted, computed } from "vue"
import useGetThemesApi from "../composables/useGetThemesApi"
import useGetSessionsApi from "../composables/useGetSessionsApi"
import Select from "../molecules/Select.vue";
import { IGetSessionsResponse } from "../composables/interface/IGetSessionsResponse";

// pages/Oekaki.vueから受け取る状態管理変
interface Props {
    theme: string
    session: string
    sessionList: IGetSessionsResponse
}

// 状態管理変数のデフォルト値を設定
const props = withDefaults(defineProps<Props>(), {
    theme: "",
    session: "",
    sessionList: () => <IGetSessionsResponse>{}
})

const { theme, session, sessionList } = toRefs(props)

// 変更時にpages/Oekaki.vueに通知するためのイベント
const emit = defineEmits(["update:theme", "update:session", "update:sessionList"])

const themeComputed = computed({
    get: () => theme.value,
    set: (value: string) => {
        emit("update:theme", value)
    }
})

const sessionComputed = computed({
    get: () => session.value,
    set: (value: string) => {
        emit("update:session", value)
    }
})

const sessionListComputed = computed({
    get: () => sessionList.value,
    set: (value: any) => {
        emit("update:sessionList", value)
    }
})

const { randomTheme } = useGetThemesApi()
const { getSessionList } = useGetSessionsApi()

onMounted(async () => {
    themeComputed.value = await randomTheme()
    sessionListComputed.value = await getSessionList()
})

</script>

<template>
    <div>
        お題：{{ theme }}
    </div>
    <div>
        <Select v-model:session="sessionComputed" v-model:sessionList="sessionListComputed"></Select>
    </div>
</template>


