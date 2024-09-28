<template>
	<div class="send-box flex flex-col">
		<u-image src="@/assets/gpt.png" :width="20" :height="20" @click="pickerShow = true"></u-image>
		<u-input ref="inputInstRef" v-model="sendContent" border="none" placeholder="请传递你的想法">
			<template #suffix>
				<div class="send-btn" @tap="submit">
					<u-image width="50rpx" height="50rpx" src="@/assets/send-fill.png"></u-image>
				</div>
			</template>
		</u-input>
	</div>
	<u-picker :show="pickerShow" :columns="[chatStore.presetChatModels]" keyName="label" :defaultIndex="[defaultIndex]" :closeOnClickOverlay="true" @confirm="confirm"
		@close="close" @cancel="cancel"></u-picker>
</template>

<script setup>
	import {
		ref,
		watch,
		computed
	} from 'vue';
	import {
		useSend
	} from '@/hooks/useSend';
	import {
		useChatStore
	} from '@/stores';
	// import Plugins from "./Plugins.vue"

	const list = ref([]);
	const chatStore = useChatStore();
	const {
		running,
		searchContent,
		content,
		send,
		handleStop
	} = useSend(list);

	const sendContent = ref('');

	const emit = defineEmits(['submit', 'change', 'on-before', 'on-end', 'on-error']);
	const placeholder = computed(() => '传递的你的想法');

	// 监听消息响应
	watch(
		() => running.value,
		(val) => {
			if (!val) emit('on-end');
		}
	);
	watch(
		() => content.value,
		(val) => {
			if (running.value) emit('change', val);
		}
	);

	watch(
		() => searchContent.value,
		(val) => {
			if (running.value) emit('search-change', val);
		}
	);

	const showAgent = () => {
		emit('switch-agent-panel');
		setTimeout(() => {
			handleFocus();
		}, 1000);
	};

	const inputInstRef = ref();
	const handleFocus = () => {
		inputInstRef.value?.focus();
	};

	// 消息发送 ctrl + enter 换行
	const submit = async (e) => {
		if (e?.shiftKey) return;
		if (running.value || !sendContent.value) return;

		emit('on-before', sendContent.value);
		setTimeout(() => {
			setContent('');
		});
		const list = chatStore.messageList
			.filter((item) => item.content)
			.map(({
				content,
				role
			}) => {
				return {
					content,
					role
				};
			});

		let model = chatStore.currentChatModel;
		// 判断是否选择了 agent 有的话需要以 agent 为准
		if (chatStore.agent) {
			model = chatStore.agent.model;
		}
		if (isNetwork.value) model = 'glm-4-all';
		const req = {
			model,
			messages: list,
			stream: true
		};
		await send(req).finally(() => {
			// emit('on-end', sendContent.value);
		});
	};
	// 设置输入框
	const setContent = (val) => {
		sendContent.value = val;
	};

	const isNetwork = ref(false);
	const shortcut = (val, open) => {
		isNetwork.value = open === true || open === 'true';
		setContent(val);
		submit();
	};

	// 模型切换
	const defaultIndex = computed(() => {
		return chatStore.presetChatModels.findIndex(item => item.label == chatStore.currentChatModel)
	})
	const pickerShow = ref(false)
	const close = () => {
		pickerShow.value = false
	}
	const confirm = (val) => {
		val.value[0].value
		chatStore.setCurrentChatModel(val.value[0].value)
		close()
	}

	defineExpose({
		sendContent,
		shortcut,
		setContent,
		handleStop,
		running,
		handleFocus
	});
</script>
<style lang="scss" scoped>
	.send-box {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 10rpx;
		position: relative;
		border-radius: 16px;
		box-shadow: none;
		background-color: #ffffff;
		padding-left: 20rpx;

		.send-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			background-color: #efeef5;
			margin: 20rpx;
			width: 60rpx;
			height: 60rpx;
			border-radius: 40rpx;
			// transform: rotate(-20deg)
		}

		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.item {
				width: 30px;
				height: 30px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 5px;

				&:hover {
					background-color: rgba(255, 255, 255, 0.08);
				}

				&.submit {
					background-color: #5280fd;

					&:hover {
						background-color: #5280fd99;
					}
				}
			}
		}
	}
</style>