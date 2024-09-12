<template>
	<view class="mine">
		<div class="top" @click="login">
			<u-avatar :src="defaultAvatar"></u-avatar>
			<span>{{ user.name || '去登录' }}</span>
		</div>
		<div class="group">
			<div class="cell">
				<div class="label"></div>
			</div>
		</div>
		<u---input v-model="loginCode"></u---input>
		<u-button @click="login">登录</u-button>
		<input type="nickname" class="weui-input" placeholder="请输入昵称" />
	</view>
	<LoginPopup></LoginPopup>
</template>

<script setup>
import { useMine } from './useMine.js';
import LoginPopup from '@/components/login-popup/index.vue';
const { user, defaultAvatar, loginCode, login } = useMine();
</script>

<style lang="scss" scoped>
.mine {
	.top {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 20rpx;
		height: 200rpx;
		width: 100%;
		border-radius: 20rpx;
		background: linear-gradient(to bottom, rgba(69, 180, 233, 0.3), rgba(69, 180, 233, 0.05));
	}
	.info {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}
	.avatar-wrapper {
		margin: 0;
		padding: 0;
		background-color: transparent;
		border: none;
		&::after {
			border: none;
		}
	}
	.group {
		padding: 20rpx;
	}
}
</style>
