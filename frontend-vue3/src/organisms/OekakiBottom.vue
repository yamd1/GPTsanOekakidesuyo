<script setup lang="ts">
import { computed } from 'vue';
import { toRefs } from 'vue';


interface Props {
    openAiResult: string
}

const props = withDefaults(defineProps<Props>(), {
    openAiResult: ""
})

const { openAiResult } = toRefs(props)

const emit = defineEmits(["update:openAiResult"])

const openAiResultComputed = computed({
    get: () => openAiResult.value,
    set: (value: string) => {
        emit("update:openAiResult", value)
    }
})
</script>

<template>
    <div>
        {{ openAiResult }}
    </div>
</template>

