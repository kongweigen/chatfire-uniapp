<template>
	<div class="chat">
		<u-navbar title="火宝 AI" @rightClick="rightClick">
			<template class="u-nav-slot" #left>
				<u-icon name="list" size="25" @click="navLeftClick"></u-icon>
			</template>
		</u-navbar>
		<div class="homepage">
			<div class="logo">
				<image src="@/assets/logo.png"></image>
			</div>
			<div class="hot-box">
				<p class="title">今日热榜</p>
				<ul class="list">
					<li class="item" v-for="(item, index) in list" @click="submit(item)">
						<span class="sequence">{{ index + 1 }}</span>
						<span class="content u-line-2">{{ item }}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="send-box">
			<u-input ref="inputInstRef" v-model="sendContent" border="none" placeholder="请传递你的想法">
				<template #suffix>
					<div class="send-btn" @tap="submit(null)">
						<u-image width="50rpx" height="50rpx" src="@/assets/send-fill.png"></u-image>
					</div>
				</template>
			</u-input>
		</div>
	</div>
	<u-popup :show="historyShow" mode="left" safeAreaInsetTop @close="historyShow = CSSFontPaletteValuesRule">
		<History></History>
	</u-popup>
</template>

<script setup>
import { useChat } from './useChat.js';
import History from './history/index.vue';
const { historyShow, sendContent, list, submit, navLeftClick } = useChat();
</script>
<style lang="scss" scoped>
.chat {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	height: 100vh;
	padding: 20rpx 32rpx;
	background-color: #eff0f6;
	.homepage {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.logo {
			width: 230rpx;
			height: 200rpx;
			image {
				width: 230rpx;
				height: 200rpx;
			}
		}
		.hot-box {
			margin-top: 20rpx;
			padding: 20rpx;
			border-radius: 20rpx;
			width: 600rpx;
			max-height: 500rpx;
			overflow-y: auto;
			background-color: #ffffff;
			.title {
				font-weight: bold;
				margin-bottom: 10rpx;
				font-size: 32rpx;
			}
			.item {
				font-size: 28rpx;
				max-height: 90rpx;
				margin-bottom: 20rpx;
				display: flex;
				.sequence {
					display: inline-block;
					width: 20rpx;
					margin-right: 20rpx;
					color: #9c9c9c;
				}
				.content {
				}
			}
		}
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
