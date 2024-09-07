<template>
	<div class="chat_container">
		<div class="body _message_list pt-10">
			<MsgItem
				:item="{
					role: 'system',
					content: '您好，我是火宝，快来提问试试吧！'
				}"
				role="gpt"
				position="left"
			></MsgItem>
			<MsgItem v-for="item in chatStore.messageList" :key="item" :item="item" :position="item.role == 'user' ? 'right' : 'left'" role="gpt"></MsgItem>
			<!-- v-if="sendRef?.running" -->
			<div class="actions">
				<u-button v-if="sendRef?.running" class="mb-4" width="100rpx" size="small" shape="circle" @click="sendRef?.handleStop">停止接收</u-button>
			</div>
		</div>
		<div class="footer">
			<!-- <AgentPanel ref="agentPanelRef"></AgentPanel> -->
			<Send class="w-full" ref="sendRef" @change="msgChange" @on-before="beforeSend" @on-end="endSend" @on-error="onError" @switch-agent-panel="switchAgentPanel"></Send>
		</div>
	</div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted, computed } from 'vue';
import Send from './Send.vue';
import MsgItem from './MsgItem.vue';
import { positionDomViewBottom } from '@/utils';
import { useChatStore } from '@/stores';
// import AgentPanel from "./AgentPanel.vue"
import { useAgent } from './useAgent';

const showLogo = computed(() => !chatStore.messageList || chatStore.messageList.length == 0);
const chatStore = useChatStore();
const sendRef = ref();
const { sendContent, agentPanelRef, switchAgentPanel } = useAgent(sendRef);

const props = defineProps({
	text: String
});

// watchEffect(() => {
//   const { id } = route.params
//   chatStore.initMessage(id)
//   positionDomViewBottom()
// })

const selectPrompt = (val) => {
	sendRef.value.setContent(val);
};

let newId = '';
const beforeSend = async (val) => {
	// 首页问答需要先新增
	// let { id } = route.params
	// if (!id) {
	//   id = chatStore.createChat()
	//   newId = id
	// }
	chatStore.addMessage(val);
	positionDomViewBottom();
};
const onError = () => {
	chatStore.updateLastMessage('', 'success');
};
const endSend = () => {
	chatStore.updateLastMessage('', 'success');
	// if (newId) {
	//   router.push({ name: "chat", params: { id: newId } })
	//   newId = undefined
	// }
};

const msgChange = (val) => {
	sendContent.value = val;
	chatStore.updateLastMessage(val);
	positionDomViewBottom();
};

let handleStop;
onMounted(() => {
	console.log('加载');
	handleStop = sendRef.value?.handleStop;
	sendRef.value?.shortcut(props.text)
});
onUnmounted(() => {
	console.log('卸载');
	// 切换问答，终止流
	endSend();
	handleStop?.();
});
</script>
<style lang="scss" scoped>
.chat_container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	height: 100vh;
	padding: 20rpx 32rpx;
	background-color: #eff0f6;
	.homepage {
		display: flex;
		justify-content: center;
	}

	.body {
		flex: 1;
		overflow: auto;
	}
	.actions {
		margin-left: 40rpx;
		display: flex;
		width: 100rpx;
	}
	.footer {
		position: relative;
		max-height: 145px;
	}
}
</style>
