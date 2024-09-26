<template>
	<view class="page mine">
		<div class="top" @click="showLogin">
			<u-avatar :src="user.avatar" size="60"></u-avatar>
			<span class="name">{{ showName }}</span>
		</div>
		<div class="group">
			<div class="cell" @click="toSignIn">
				<div class="label">签到</div>
				<div class="value">
					<span>+50</span>
					<u-icon name="arrow-right" size="16" color="#909399"></u-icon>
				</div>
			</div>
			<u-divider></u-divider>
			<div class="cell" @click="toPay">
				<div class="label">账户</div>
				<div class="value">
					{{ userStore.account.token }}火币
					<!-- <u-icon name="arrow-right" size="20"></u-icon> -->
				</div>
			</div>
		</div>
	</view>
	<LoginPopup></LoginPopup>
</template>

<script setup>
import { useMine } from './useMine.js';
import LoginPopup from '@/components/login-popup/index.vue';

import { useUserStore } from '@/stores';
const userStore = useUserStore();
const { showName, user, showLogin, toSignIn, toPay } = useMine();
</script>

<style lang="scss" scoped>
.mine {
	background-color: #eff0f6;
	.top {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		gap: 20rpx;
		padding: 20rpx;
		height: 200rpx;
		width: 100%;
		border-radius: 20rpx;
		background: linear-gradient(to bottom, rgba(69, 180, 233, 0.3), rgba(69, 180, 233, 0.05));
		.name {
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	.info {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}
	.group {
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		.cell {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.value {
				color: #909399;
				font-size: 28rpx;
				display: flex;
			}
		}
	}
}
</style>
