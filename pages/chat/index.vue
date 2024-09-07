<template>
	<div class="chat_container">
		<div class="homepage">
			<u-image src="@/assets/logo.png" height="500rpx"></u-image>
		</div>
		<div class="send-box">
			<u-input ref="inputInstRef" v-model="sendContent" border="none" placeholder="请传递你的想法">
				<template #suffix>
					<div class="send-btn" @tap="submit">
						<u-image width="50rpx" height="50rpx" src="@/assets/send-fill.png"></u-image>
					</div>
				</template>
			</u-input>
		</div>
	</div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted, computed } from 'vue';
const sendContent = ref('');
const submit = () => {
	uni.navigateTo({
		url: `/pages/chat-detail/index?text=${sendContent.value}`
	});
};
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
	.send-box {
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
	}
}
</style>
