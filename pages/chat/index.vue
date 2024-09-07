<template>
	<div class="chat_container">
		<div class="homepage">
			<u-image src="@/assets/logo.png" height="500rpx"></u-image>
		</div>
		<div class="footer">
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
