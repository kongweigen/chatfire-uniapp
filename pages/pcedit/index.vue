<template>
	<view class="page">
		<ImageClear></ImageClear>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import ImageClear from './image-clear/index.vue';
import { usePcedit } from './usePcedit.js';
usePcedit();
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
	width: calc(100% - 32px);
	height: 60vh;
	top: 38vh;
	padding: 16px;
	background: #fff;
	border-radius: 8px 8px 0 0;
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
		margin-left: 4px;
		border-radius: 8px;
		width: 120px;
		height: 60px;
	}
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
