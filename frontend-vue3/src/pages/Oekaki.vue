<script setup lang="ts">
import OekakiTop from "../organisms/OekakiTop.vue";
import OekakiMiddle from "../organisms/OekakiMiddle.vue";
import OekakiBottom from "../organisms/OekakiBottom.vue";

// お題を管理する状態管理変数
const theme = ref("")
const themeComputed = {
    get: () => theme.value,
    set: (value: string) => {
        theme.value = value
    }
}

// 選択されたセッションを保持する状態管理変数
const session = ref("")
const sessionComputed = {
    get: () => session.value,
    set: (value: string) => {
        session.value = value
    }
}

// 過去のセッション一覧を保持する状態管理変数
const sessionList = ref([])
const sessionListComputed = {
    get: () => sessionList.value,
    set: (value: Array<string>) => {
        sessionList.value = value
    }
}

// 入力されたバイナリを保持する状態管理変数
const binaries = ref("")
const binariesComputed = {
    get: () => binaries.value,
    set: (value: string) => {
        binaries.value = value
    }
}

// OpenAiから返却された結果を保持する状態管理変数
const openAiResult = ref("")
const openAiResultComputed = {
    get: () => openAiResult.value,
    set: (value: string) => {
        openAiResult.value = value
    }
}

</script>

<template>
<H1>Hello Pages</H1>
<OekakiTop />
<OekakiMiddle />
<OekakiBottom />
</template>

