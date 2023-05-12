<script setup lang="ts">
import { toRefs } from "vue"

// pages/Oekaki.vueから受け取る状態管理変
interface Props {
    theme: string
    session: string
    sessionList: Array<string>
}

// 状態管理変数のデフォルト値を設定
/* const props = widthDefaults<Props>(defineProps<Props>(), { */
/*     theme: "a", */
/*     session: "b", */
/*     sessionList: ["c"] */
/* }) */
const props = defineProps<Props>()

const { theme, session, sessionList } = toRefs(props)

// 変更時にpages/Oekaki.vueに通知するためのイベント
const emit = defineEmits(["update:theme", "update:session", "update:sessionList"])

</script>

<template>
<H2>OekakiTop</H2>
{{theme.value}}
{{session}}
{{sessionList.value}}


</template>


