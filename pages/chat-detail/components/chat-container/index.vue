<template>
	<div class="chat_container">
		<div class="body _message_list pt-10">
			<scroll-view class="scroll-view" :scroll-into-view="scrollId" scroll-y>
				<div>
					<MsgItem :item="{
					role: 'system',
					content: '您好，我是火宝，快来提问试试吧！'
				}" role="gpt" position="left"></MsgItem>
					<MsgItem v-for="item in chatStore.messageList" :key="item" :item="item" :position="item.role == 'user' ? 'right' : 'left'" role="gpt"></MsgItem>
					<!-- <div :id="scrollId"></div> -->
					<div id="scrollBtn"></div>
				</div>
			</scroll-view>
			<!-- v-if="sendRef?.running" -->
			<!-- <div class="actions">
				<u-button v-if="sendRef?.running" class="mb-4" width="100rpx" size="small" shape="circle" @click="sendRef?.handleStop">停止接收</u-button>
			</div> -->
		</div>
		<div class="footer">
			<!-- <AgentPanel ref="agentPanelRef"></AgentPanel> -->
			<Send class="w-full" ref="sendRef" @search-change="searchMsgChange" @change="msgChange" @on-before="beforeSend" @on-end="endSend" @on-error="onError"
				@switch-agent-panel="switchAgentPanel"></Send>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance,
		watchEffect,
		onMounted,
		onUnmounted,
		computed
	} from 'vue';
	import Send from './Send.vue';
	import MsgItem from './MsgItem.vue';
	import {
		generateUUID
	} from '@/utils';
	import {
		useChatStore
	} from '@/stores';
	// import AgentPanel from "./AgentPanel.vue"
	import {
		useAgent
	} from './useAgent';

	const showLogo = computed(() => !chatStore.messageList || chatStore.messageList.length == 0);
	const chatStore = useChatStore();
	const sendRef = ref();
	const {
		sendContent,
		agentPanelRef,
		switchAgentPanel
	} = useAgent(sendRef);


	const scrollId = ref('')

	function throttle(func, limit) {
		let inThrottle;
		return function() {
			const args = arguments;
			const context = this;
			if (!inThrottle) {
				func.apply(context, args);
				inThrottle = true;
				setTimeout(() => inThrottle = false, limit);
			}
		};
	}
	const positionDomViewBottom = () => {
		// scrollId.value = generateUUID()
	}
	const throttledScrollEvent = throttle(positionDomViewBottom, 300);


	const props = defineProps({
		text: String,
		isNetwork: Boolean
	});

	const selectPrompt = (val) => {
		sendRef.value.setContent(val);
	};

	const beforeSend = async (val) => {
		chatStore.addMessage(val);
		throttledScrollEvent();
	};
	const onError = () => {
		chatStore.updateLastMessage('', 'success');
	};
	const endSend = () => {
		chatStore.updateLastMessage('', 'success');
	};

	const searchMsgChange = (val) => {
		chatStore.updateLastMessage('', 'loading', val);
		throttledScrollEvent();
	};

	const msgChange = (val) => {
		sendContent.value = val;
		chatStore.updateLastMessage(val, 'loading');
		throttledScrollEvent();
	};

	let handleStop;
	onMounted(() => {
		console.log('加载');
		handleStop = sendRef.value?.handleStop;
		if (props.text) {
			sendRef.value?.shortcut(props.text, props.isNetwork);
		}
		// setTimeout(() => {
		// 	scrollId.value = 'scrollBtn'
		// }, 200)
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
			height: calc(100% - 60px);
			overflow: hide;

			.scroll-view {
				height: 100%;
			}
		}

		.actions {
			margin-left: 40rpx;
			display: flex;
			width: 100rpx;
		}

		.footer {
			position: relative;
		}
	}
</style>