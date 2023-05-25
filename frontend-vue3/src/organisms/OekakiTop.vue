<script setup lang="ts">
import { toRefs, onMounted, computed } from "vue"
import useGetThemesApi from "../composables/useGetThemesApi"
import useGetSessionsApi from "../composables/useGetSessionsApi"
import Select from "../molecules/Select.vue";
import { IGetSessionsResponse, IGetSessions } from "../composables/interface/IGetSessionsResponse";
import { ref } from "vue";

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

// Mountedフックでテーマを更新するための状態管理変数
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

const list = ref(new Array<string>())

const { randomTheme } = useGetThemesApi()
const { getSessionList } = useGetSessionsApi()

// 初期化時にテーマとセッションリストを取得する
onMounted(async () => {
    themeComputed.value = await randomTheme()
    sessionListComputed.value = await getSessionList()
    list.value = sessionList.value.sessions.map((value: IGetSessions) => {
        return value.name
    })
})

</script>

<template>
    <div>
        お題：{{ theme }}
    </div>
    <div>
        <Select v-model:selectedItem="sessionComputed" v-model:list="list"></Select>
    </div>
</template>


