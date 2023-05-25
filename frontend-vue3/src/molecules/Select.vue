<script setup lang="ts">
import { computed } from "vue";
import { toRefs } from "vue";

interface Props {
  list: Array<string>
  selectedItem: string
}

const props = withDefaults(defineProps<Props>(), {
  list: () => new Array<string>(),
  selectedItem: ""
})

// セレクトボックス・選択された値を保持するための変数
const { list, selectedItem } = toRefs(props)

const emit = defineEmits(["update:selectedItem"])

// 選択された値を親コンポーネントへ渡すための状態管理変数
const selectedItemComputed = computed({
  get: () => selectedItem.value,
  set: (value: string) => {
    emit("update:selectedItem", value)
  }
})

</script>

<template>
  <select v-model="selectedItemComputed">
    <option v-for="item in list" :value="item">{{ item }}</option>
  </select>
</template>
