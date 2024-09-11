<template>
	<view class="titleBox">
		<up-text color="#ffffff" bold="true" text="键入所想" size="26"></up-text>
		<span>发挥想象，随心所写</span>
	</view>
	<view class="stepsBox">
		<image src="/static/design03.png"></image>
	</view>
	<view class="createBox">
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
			<view style="display: flex; gap: 4px" @click="openModelPicker">
				<span style="color: rgb(30, 144, 230)">
					{{ modelContent.label }}
				</span>
				<u-icon name="arrow-right" color="rgb(30, 144, 230,0.7);" size="18"></u-icon>
			</view>
		</view>
		<view class="bottom">
			<up-button shape="circle" type="primary" color="linear-gradient(to right, #307ae4, #30e2e4);" @click="text2picDesign()">生成创作</up-button>
		</view>
	</view>
	<up-picker :show="showModelPicker" :columns="modelList" keyName="label" title="选择模型" @cancel="openModelPicker" @confirm="setModel"></up-picker>
	<up-modal class="desigModal" :show="picShow" title="作品预览" @confirm="showDesignModal">
		<view class="slot-content">
			<u-image class="designImage" :src="designPic"></u-image>
			<view class="designBtn">
				<!-- <up-button shape="circle" @click="picShow">关闭</up-button> -->
				<!-- <up-button shape="circle" type="primary" @click="savePic">保存图片</up-button> -->
			</view>
		</view>
	</up-modal>
</template>

<script setup>
import { ref } from 'vue';
import { useDesign } from './useDesign.js';
import { imageRecommendPrompt, modelOptions } from '@/utils/index.js';
const {
	showDesignModal,
	designPic,
	savePic,
	picShow,
	toPage,
	setVal,
	pic2picDesign,
	text2picDesign,
	showModelPicker,
	modelContent,
	createVal,
	openModelPicker,
	modelList,
	setModel
} = useDesign();
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
	height: 70vh;
	margin: 8px;
	top: 20vh;
	padding: 16px;
	background: rgb(255, 255, 255, 0.9);
	border-radius: 8px 8px 0 0;
	box-shadow: 0px 8px 18px 0px rgb(30, 144, 230, 0.2);
	.bottom {
		width: 82%;
		bottom: 4px;
		margin: 5%;
		position: absolute;
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
.titleBox {
	top: 10vh;
	left: 5vw;
	bottom: 4px;
	position: absolute;
	margin: 8px 0 16px 0;
	color: #fff;
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
.desigModal {
	padding: 16px !important;
	.slot-content {
		.designBtn {
			display: flex;
			padding: 14px;
			gap: 18px;
		}
		.designImage {
			border-radius: 16px !important;
			padding: 12px !important;
		}
	}
}
</style>
