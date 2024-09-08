<template>
	<div class="chat h-full w-full flex">
		<!-- <Nav></Nav> -->
		<div class="main h-full w-full flex flex-col">
			<!-- <Header v-if="chatStore.navType === '1'"></Header> -->
			<div class="chat-content flex-1 w-full h-full">
				<ChatContainer :text="askText"></ChatContainer>
				<!-- <History v-if="chatStore.navType === '2'"></History>
        <Agents v-if="chatStore.navType === '3'"></Agents> -->
			</div>
		</div>
		<!-- <Panel ref="panelRef"></Panel> -->
	</div>
</template>
<script setup>
import { onLoad, onShow, onReady, onError, onHide, onUnload } from '@dcloudio/uni-app';
// import Nav from "./layout/Nav.vue"
// import Header from "./layout/Header.vue"
// import Panel from "./layout/Panel.vue"
import ChatContainer from './components/chat-container/index.vue';
// import History from "./components/history/index.vue"
// import Agents from "./components/agents/index.vue"
// import { useChatStore } from "@/stores"
import { ref } from 'vue';

// const chatStore = useChatStore()
// onMounted(() => {
//   chatStore.initChat()
// })
const askText = ref('');
onLoad((option) => {
	askText.value = option.text;
});
</script>
<style lang="scss" scoped>
.chat {
	// background-color: #292932;
	.chat-content {
		transition: all 0.2s ease;
		width: 750rpx;
	}
}
</style>
