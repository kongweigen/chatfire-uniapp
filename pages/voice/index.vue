<template>
	<view class="page">
		<div class="page-body">
			<span>创意描述</span>
			<u--textarea v-model="voiceSoundConfig.input" placeholder="请输入需要生成音频的内容"></u--textarea>

			<div class="audio-box">
				<u-empty mode="data"></u-empty>
				<view class="page-section page-section-gap" style="text-align: center">
					<audio style="text-align: left" :src="mockData.src" :poster="mockData.poster" :name="mockData.name" :author="mockData.author" :action="audioAction" controls></audio>
				</view>
			</div>
			<u-cell-group>
				<u-cell size="large" title="选择音色" :value="voiceSoundConfig.voice" isLink @click="pickerShow = true"></u-cell>
			</u-cell-group>
		</div>
		<div class="footer">
			<u-button :customStyle="customStyle" text="生成音频" @click="createVoice"></u-button>
		</div>
	</view>
	<u-picker :show="pickerShow" :columns="pickerOptions" :defaultIndex="[3]" :closeOnClickOverlay="true" @confirm="confirm" @close="close" @cancel="cancel"></u-picker>
</template>

<script setup>
import { useVoice } from './useVoice';
const { customStyle, voiceSoundConfig, pickerShow, pickerOptions, mockData, audioAction, createVoice, confirm, close, cancel } = useVoice();
</script>

<style lang="scss" scoped>
.page {
	padding: 10rpx 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.audio-box {
		margin: 20rpx 0;
	}
	.page-body {
	}
}
</style>
