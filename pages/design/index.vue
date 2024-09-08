<template>
	<view class="stepsBox">
		<up-steps current="1" activeIcon="checkmark" inactiveIcon="arrow-right">
			<up-steps-item title="构思创意"></up-steps-item>
			<up-steps-item title="智能生成"></up-steps-item>
			<up-steps-item title="完成创作"></up-steps-item>
		</up-steps>
	</view>
	<view class="createBox">
		<view class="">
			<span>创作内容</span>
			<up-textarea placeholder="所想即所得,输入你现在的想法吧!" border="surround" v-model="createVal" @change="change"></up-textarea>
		</view>
		<view class="templateCreate">
			<span>模板推荐</span>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { useDesign } from './useDesign.js';
const createVal = ref('');
const valChange = () => {};
</script>

<style lang="scss" scoped>
.stepsBox {
	padding: 10px 0 10px 0;
	margin: 12px;
	border-radius: 18px;
	margin: 10px !important;
	background: linear-gradient(to right, rgb(30, 144, 230, 0.3), rgb(30, 144, 180, 0.1)) !important;
	.u-text__value {
		font-weight: bold !important;
	}
}
.createBox {
	margin: 16px !important;
	label {
		line-height: 32px;
		font-weight: bold;
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
</style>
