<template>
	<div class="history px-4">
		<div v-if="chatStore.chatList.length > 0" class="list">
			<ChatItem v-for="item in chatStore.chatList" class="mb-2" :item="item"></ChatItem>
		</div>
		<u-empty v-else mode="message"></u-empty>
	</div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useChatStore } from '@/stores';
import ChatItem from './Item.vue';

const chatStore = useChatStore();
onMounted(() => {});
</script>
<style lang="scss" scoped>
.history {
	width: 500rpx;
	margin-top: 20rpx;
	padding: 0 20rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 80rpx);
	.list {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
}
</style>
