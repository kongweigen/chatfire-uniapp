<!-- 消息列表卡片 -->
<template>
	<div class="chat-item" :class="{ 'is-active': active }" @click="selectChat">
		<span class="title u-line-1">{{ item.name }}</span>
		<div class="actions"></div>
	</div>
</template>

<script setup>
import { useChatStore } from '@/stores';

const chatStore = useChatStore();
const emit = defineEmits(['on-remove']);
const props = defineProps({
	active: Boolean,
	item: Object
});
const selectChat = async () => {
	chatStore.setChat(props.item);
	chatStore.initMessage(props.item.id);
	//   positionDomViewBottom()
	uni.navigateTo({
		url: `/pages/chat-detail/index`
	});
};
</script>
<style lang="scss" scoped>
.chat-item {
	background-color: #eff0f6;
	border-radius: 8rpx;
	padding: 20rpx;
	box-sizing: border-box;
	font-size: 24rpx;
	margin-bottom: 10rpx;
	.actions {
		opacity: 0;
	}
	&:hover,
	&.is-active {
		.right {
			display: flex;
		}
		.actions {
			opacity: 1;
		}
	}
}
</style>
