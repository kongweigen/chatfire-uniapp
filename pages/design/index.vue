<template>
	<view class="stepsBox">
		<image src="/static/design03.png"></image>
	</view>
	<view class="createBox">
		<view class="titleBox">
			<up-text bold="true" text="01 键入所想" size="26"></up-text>
			<span>发挥想象，随心所写</span>
		</view>
		<up-textarea placeholder="所想即所得,输入你现在的想法吧!" border="surround" v-model="createVal" @change="change"></up-textarea>
		<view class="templateContent">
			<span>模板推荐</span>
			<view class="templateBox">
				<view class="templateItem" v-for="item in imageRecommendPrompt" :key="item">
					<view @click="setVal(item.desc)">
						<span style="font-size: 12px; opacity: 0.7">{{ item.label }}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="modelClass templateContent templateBox">
			<span>当前模型</span>
			<view style="display: flex; gap: 4px" @click="selModel">
				<span style="color: rgb(30, 144, 230)">
					{{ modelContent }}
				</span>
				<u-icon name="arrow-right" color="rgb(30, 144, 230,0.7);" size="18"></u-icon>
			</view>
		</view>
	</view>
	<view class="bottom">
		<up-button type="primary" @click="text2picDesign(modelContent)">生成创作</up-button>
	</view>
	<!-- <up-select v-model="showModelPicker" :list="modelOptions"></up-select> -->
</template>

<script setup>
import { ref } from 'vue';
import { useDesign } from './useDesign.js';
import { imageRecommendPrompt, modelOptions } from '@/utils/constant.js';
const { toPage, setVal, pic2picDesign, text2picDesign, showModelPicker, modelContent, createVal, selModel } = useDesign();
</script>

<style lang="scss" scoped>
.stepsBox image {
	width: 100%;
	height: 44vh;
	background-size: cover;
	background-position: center;
	// background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}
.createBox {
	position: absolute;
	width: calc(100% - 48px);
	height: 60vh;
	margin: 8px;
	top: 25vh;
	padding: 16px;
	background: #fff;
	border-radius: 8px 8px 0 0;
	.titleBox {
		margin: 8px 0 16px 0;
	}
	label {
		line-height: 32px;
		// font-weight: bold;
	}
	textarea {
		background: linear-gradient(to bottom, rgb(30, 144, 230, 0.3), rgb(30, 144, 180, 0.1)) !important;
	}
	::v-deep .u-border,
	.up-border {
		border-width: 1px !important;
		border-color: linear-gradient(to bottom, rgb(30, 144, 230, 0.3), rgb(30, 144, 180, 0.1)) !important;
	}
}
.templateContent {
	margin: 16px 0 8px 0;
	font-weight: bold;
	.templateBox {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 80px;
		overflow-x: scroll;
		.templateItem {
			display: flex;
			flex-direction: column;
			justify-content: center;
			color: rgb(30, 144, 230);
			font-size: 14px;
			align-items: center;
			background-color: rgb(30, 144, 230, 0.1);
			margin-left: 6px;
			border-radius: 8px;
			width: 120px;
			height: 60px;
		}
	}
}
.modelClass {
	display: flex;
	justify-content: space-between;
}
.bottom {
	width: 90%;
	height: 44px;
	bottom: 20px;
	margin: 5%;
	position: absolute;
	.u-button {
		border-radius: 18px !important;
	}
}
</style>
