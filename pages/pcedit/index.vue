<template>
	<view class="page">
		<div class="header">
			<p class="title">{{ title }}</p>
			<p class="desc">{{ subTitle }}</p>
		</div>
		<div class="main">
			<u--image
				v-if="!sourceImage.url && !imageUrl"
				src="https://sf-maas-uat-prod.oss-cn-shanghai.aliyuncs.com/outputs/201b7bc3-c183-472c-a4bf-c8c7c2127661_0.png"
				height="700rpx"
				width="700rpx"
				radius="10"
			></u--image>

			<u--image v-if="!imageUrl && sourceImage.url" :src="sourceImage.url" height="700rpx" width="700rpx" radius="10"></u--image>
			<u--image v-if="imageUrl" :src="imageUrl" height="700rpx" width="700rpx" radius="10"></u--image>
		</div>
		<div class="footer">
			<u-button v-if="sourceImage.url" :customStyle="customStyle" text="一键清晰" @click="generate"></u-button>
			<u-button v-else :customStyle="customStyle" text="点击上传" @click="uploadImage"></u-button>
		</div>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { usePcedit } from './usePcedit.js';
const { title, subTitle, designType, customStyle, sourceImage, imageUrl, uploadImage, generate } = usePcedit();
</script>

<style lang="scss" scoped>
.page {
	padding: 0 25rpx;
	box-sizing: border-box;
	height: 100vh;
	background: linear-gradient(to bottom, #ffffff, #f5ebcc);
	position: relative;
	overflow: auto;

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.title {
			margin-top: 40rpx;
			font-size: 40rpx;
			width: 100%;
			text-align: center;
		}
		.desc {
			font-size: 24rpx;
			font-weight: 100rpx;
		}
	}
	.main {
		margin-top: 80rpx;
		:deep(.u-transition) {
			display: flex;
			justify-content: center;
		}
	}
	.footer {
		position: fixed;
		bottom: 40rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
	}
}
</style>
