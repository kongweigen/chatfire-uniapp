<template>
	<view class="page">
		<div class="header">
			<p class="title">{{ title }}</p>
			<p class="desc">{{ subTitle }}</p>
		</div>
		<div class="main">
			<image v-if="!sourceImage.url && !imageUrl" mode="aspectFit" src="@/assets/bg-image.png"></image>
			<image v-if="!imageUrl && sourceImage.url" :src="sourceImage.url" mode="aspectFit"></image>
			<image v-if="imageUrl" :src="imageUrl" mode="aspectFit"></image>
		</div>
		<div class="footer">
			<u-button v-if="sourceImage.url" :customStyle="customStyle" text="生成图片" @click="generate"></u-button>
			<u-button v-else :customStyle="customStyle" text="点击上传" @click="uploadImage"></u-button>
		</div>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		usePcedit
	} from './usePcedit.js';
	const {
		title,
		subTitle,
		designType,
		customStyle,
		sourceImage,
		imageUrl,
		uploadImage,
		generate
	} = usePcedit();
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

			image {
				height: 400px;
				width: 100%;
				border-radius: 10px;
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