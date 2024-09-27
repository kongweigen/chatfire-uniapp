<template>
	<view class="page">
		<div class="main">
			<u--image v-if="!sourceImage.url && !imageUrl"
				src="https://sf-maas-uat-prod.oss-cn-shanghai.aliyuncs.com/outputs/201b7bc3-c183-472c-a4bf-c8c7c2127661_0.png" height="700rpx" width="700rpx"
				radius="10"></u--image>

			<u--image v-if="!imageUrl && sourceImage.url" :src="sourceImage.url" height="700rpx" width="700rpx" radius="10"></u--image>
			<u--image v-if="imageUrl" :src="imageUrl" height="700rpx" width="700rpx" radius="10"></u--image>

			<u-cell-group>
				<u-cell size="large" title="选择尺寸" :value="idPhotoSettings.size" isLink @click="showSizePicker = true"></u-cell>
			</u-cell-group>
			<u-cell-group>
				<u-cell size="large" title="选择背景" :value="idPhotoSettings.backgroundColor" isLink @click="showbgColorPicker = true"></u-cell>
			</u-cell-group>


		</div>
		<div class="footer">
			<u-button v-if="sourceImage.url" :customStyle="customStyle" text="生成图片" @click="generate"></u-button>
			<u-button v-else :customStyle="customStyle" text="点击上传" @click="uploadImage"></u-button>
		</div>
		<up-picker :show="showSizePicker" :columns="sizeOptions" keyName="label" title="选择尺寸" @cancel="sizePickerCancel" @confirm="sizePickerConfirm"></up-picker>
		<up-picker :show="showbgColorPicker" :columns="bgColorOptions" keyName="label" title="选择背景" @cancel="bgColorPickerCancel"
			@confirm="bgColorPickerConfirm"></up-picker>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		useIdPhoto
	} from './useIdPhoto.js';
	const {
		customStyle,
		showSizePicker,
		showbgColorPicker,
		sizeOptions,
		bgColorOptions,
		idPhotoSettings,
		designType,
		sourceImage,
		imageUrl,
		uploadImage,
		generate,
		sizePickerConfirm,
		sizePickerCancel,
		bgColorPickerCancel,
		bgColorPickerConfirm,
	} = useIdPhoto();
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