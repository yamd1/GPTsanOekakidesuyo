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

const isLoading = ref(false)
const isLoadingComputed = computed({
    get: () => isLoading.value,
    set: (value: boolean) => {
        isLoading.value = value
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
        <OekakiMiddle v-model:openAiResult="openAiResultComputed" v-model:isLoading="isLoadingComputed" />
    </div>
    <div>
        <OekakiBottom v-model:openAiResult="openAiResultComputed" />
    </div>

    <!-- ローディングを出現させる -->
    <div class="loading-overlay" v-if="isLoading">
        <div class="loading-spinner"></div>
    </div>
</template>

<style scoped>
.top-container {
    margin-bottom: 10px;
}

.loading-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.loading-spinner {
    width: 80px;
    height: 80px;
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
