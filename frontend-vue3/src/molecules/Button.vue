<script setup lang="ts">
import { toRefs } from 'vue';

interface Props {
    event: () => void
}

const props = withDefaults(defineProps<Props>(), {
    event: () => { }
})

const { event } = toRefs(props)

const onClick = () => {
    event.value()
}

</script>

<template>
    <div>
        <!-- 更に汎用化させる場合、「完成」の文字やボタンのスタイルもPropsで受け取るようにする -->
        <button @click="onClick">完成</button>
    </div>
</template>

<style scoped>
button {
    margin: 15px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #45a049;
}
</style>