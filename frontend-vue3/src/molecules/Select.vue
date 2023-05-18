<script setup lang="ts">
import { computed } from "vue";
import { ref, toRefs } from "vue";
import { IGetSessionsResponse } from "../composables/interface/IGetSessionsResponse";
interface Props {
  sessionList: IGetSessionsResponse
  session: string
}

const props = withDefaults(defineProps<Props>(), {
  sessionList: () => <IGetSessionsResponse>{},
  session: ""
})

const { sessionList, session } = toRefs(props)

const emit = defineEmits(["update:session"])

const sessionComputed = computed({
  get: () => session.value,
  set: (value: string) => {
    emit("update:session", value)
  }
})

</script>

<template>
  {{ sessionList }}
  <select v-for="session in sessionList.sessions">
    <option value="session.name">{{ session }}</option>
  </select>
</template>
