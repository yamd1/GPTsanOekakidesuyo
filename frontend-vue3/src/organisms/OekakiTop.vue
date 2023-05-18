<script setup lang="ts">
import { computed } from "vue";
import { toRefs } from "vue"
import  useGetThemesApi  from "../composables/useGetThemesApi.ts"

// pages/Oekaki.vueから受け取る状態管理変
interface Props {
    theme: string
    session: string
    sessionList: Array<string>
}

// 状態管理変数のデフォルト値を設定
const props = withDefaults(defineProps<Props>(), {
    theme: "",
    session: "",
    sessionList: () => []
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

const { randomTheme } = useGetThemesApi()

const click = async () => {
    themeComputed.value = await randomTheme()
}

</script>

<template>
    <H2>OekakiTop</H2>
    <button @click="click">buttun</button>
    {{ theme }}
    {{ session }}
    {{ sessionList }}
</template>


