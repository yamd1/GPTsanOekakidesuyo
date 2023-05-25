<script setup lang="ts">
import { computed } from 'vue';
import { toRefs } from 'vue';
import useGrid from '../composables/useGrid'
import Button from '../molecules/Button.vue'
import usePostSessionApi from '../composables/usePostSessionApi'

interface Props {
    openAiResult: string
    isLoading: boolean
}

const props = withDefaults(defineProps<Props>(), {
    openAiResult: "",
    isLoading: false
})

// OpenAiからのレスポンスとリクエスト応答状態を表すフラグ変数
const { openAiResult, isLoading } = toRefs(props)

const emit = defineEmits(["update:openAiResult", "update:isLoading"])

const openAiResultComputed = computed({
    get: () => openAiResult.value,
    set: (value: string) => {
        emit("update:openAiResult", value)
    }
})

const isLoadingComputed = computed({
    get: () => isLoading.value,
    set: (value: boolean) => {
        emit("update:isLoading", value)
    }
})

// お絵かき用グリッド制御用の変数及び関数(composables/useGridにて定義)
const { grid, gridDataToString, startDrawing, draw, stopDrawing } = useGrid()

// OpenAIにリクエストを送信。応答までの間はローディング画面を表示し、画面をロックする
const callPostSessionApi = async () => {
    isLoadingComputed.value = true
    const { response } = await usePostSessionApi(gridDataToString)
    openAiResultComputed.value = response.value
    isLoadingComputed.value = false
}

</script>

<template>
    <div class="grid-button-container">
        <div class="grid-container">
            <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="grid-row">
                <div v-for="(cell, colIndex) in row" :key="colIndex" class="grid-cell" :class="{ 'cell-black': cell === 1 }"
                    @pointerdown="startDrawing(rowIndex, colIndex)" @pointerover="draw(rowIndex, colIndex)"
                    @pointerup="stopDrawing">
                </div>
            </div>
        </div>
    </div>
    <div>
        <Button v-model:event="callPostSessionApi"></Button>
    </div>
</template>

<style>
.grid-container {
    display: flex;
    flex-direction: column;
    background-color: #ddd;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.grid-row {
    display: flex;
}

.grid-cell {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
}

.cell-black {
    background-color: #000;
}

.grid-button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
