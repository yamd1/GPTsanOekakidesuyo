<script setup lang="ts">
import { ref, computed } from "vue";
import OekakiTop from "../organisms/OekakiTop.vue";
import OekakiMiddle from "../organisms/OekakiMiddle.vue";
import OekakiBottom from "../organisms/OekakiBottom.vue";

// お題を管理する状態管理変数
const theme = ref("")
const themeComputed = computed({
    get: () => theme.value,
    set: (value: string) => {
        theme.value = value
    }
})

// 選択されたセッションを保持する状態管理変数
const session = ref("")
const sessionComputed = computed({
    get: () => session.value,
    set: (value: string) => {
        session.value = value
    }
})

// 過去のセッション一覧を保持する状態管理変数
const sessionList = ref(new Array<string>())
const sessionListComputed = computed({
    get: () => sessionList.value,
    set: (value: Array<string>) => {
        sessionList.value = value
    }
})

// 入力されたバイナリを保持する状態管理変数
const binaries = ref("")
const binariesComputed = computed({
    get: () => binaries.value,
    set: (value: string) => {
        binaries.value = value
    }
})

// OpenAiから返却された結果を保持する状態管理変数
const openAiResult = ref("")
const openAiResultComputed = computed({
    get: () => openAiResult.value,
    set: (value: string) => {
        openAiResult.value = value
    }
})

</script>

<template>
    <H1>GPTさんお絵かきですよ</H1>
    <OekakiTop v-model:theme="themeComputed" v-model:session="sessionComputed" v-model:sessionList="sessionListComputed" />
    <OekakiMiddle v-model:binaries="binariesComputed" />
    <OekakiBottom v-model:binaries="binariesComputed" v-model:openAiResult="openAiResultComputed" />
</template>

