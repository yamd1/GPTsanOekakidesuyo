<script setup lang="ts">
import { computed } from 'vue';
import { toRefs } from 'vue';
import useGrid from '../composables/useGrid'

interface Props {
    binaries: string
}

const props = withDefaults(defineProps<Props>(), {
    binaries: ""
})

const { binaries } = toRefs(props)

const emit = defineEmits(["update:binaries"])

const binariesComputed = computed({
    get: () => binaries.value,
    set: (value: string) => {
        emit("update:binaries", value)
    }
})

const { isDrawing, grid, gridDataToString, startDrawing, draw, stopDrawing } = useGrid()

// TODO: gridDataToStringを発火させるタイミングを決める
// 1，描画が終わったタイミングで毎回文字列に変換して、binariesで保持する
// 2，OekakiBottomコンポーネントで「完成」ボタンが押下されたタイミングで文字列に変換する

</script>

<template>
    <H2>OekakiMiddle</H2>
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
