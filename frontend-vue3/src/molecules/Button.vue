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
        <button @click="onClick">完成</button>
    </div>
</template>