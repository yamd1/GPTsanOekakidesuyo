<script setup lang="ts">
import { ref, computed } from "vue";
import OekakiTop from "../organisms/OekakiTop.vue";
import OekakiMiddle from "../organisms/OekakiMiddle.vue";
import OekakiBottom from "../organisms/OekakiBottom.vue";
import { IGetSessionsResponse } from "../composables/interface/IGetSessionsResponse";

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
const sessionList = ref(<IGetSessionsResponse>{})
const sessionListComputed = computed({
    get: () => sessionList.value,
    set: (value: any) => {
        sessionList.value = value
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
    <div class="top-container">
        <OekakiTop v-model:theme="themeComputed" v-model:session="sessionComputed"
            v-model:sessionList="sessionListComputed" />
    </div>
    <div>
        <OekakiMiddle v-model:openAiResult="openAiResultComputed" />
    </div>
    <div>
        <OekakiBottom v-model:openAiResult="openAiResultComputed" />
    </div>
</template>

<style scoped>
.top-container {
    margin-bottom: 10px;
}
</style>
