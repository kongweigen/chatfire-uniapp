<template>
	<view class="page">
		<div class="page-body">
			<p class="title">创意描述</p>
			<u--textarea v-model="voiceSoundConfig.input" placeholder="请输入需要生成音频的内容"></u--textarea>

			<div class="audio-box">
				<view class="page-section page-section-gap" style="text-align: center">
				<!-- 	<audio v-if="resData" style="text-align: left" :src="resData" :name="voiceSoundConfig.input" :author="mockData.author" :action="audioAction"
						controls></audio> -->
					<view v-if="audioData" class="audio-progress-content">
						<image v-if="isPlay" src="@/assets/icon-pause.png" @click="controlAudio"></image>
						<image v-else src="@/assets/icon-play.png" @click="controlAudio"></image>
						<view class="audio-progress">
							<view class="progress-bar">
								<view class="bar-current" :style="{width: (currentTime / duration * 100) + '%'}"></view>
								<view class="bar-total"></view>
							</view>
							<text class="audio-duration">{{min > 9 ? min : '0' + min}}:{{sec > 9 ? sec : '0' + sec}}</text>
						</view>
					</view>
					<u-empty v-else mode="data" text="暂无音频"></u-empty>
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
	<u-picker :show="pickerShow" :columns="pickerOptions" :defaultIndex="[3]" :closeOnClickOverlay="true" @confirm="confirm" @close="close"
		@cancel="cancel"></u-picker>
</template>

<script setup>
	import {
		useVoice
	} from './useVoice';
	const {
		controlAudio,
		isPlay,
		min,
		sec,
		duration,
		currentTime,
		audioData,
		customStyle,
		voiceSoundConfig,
		pickerShow,
		pickerOptions,
		mockData,
		audioAction,
		createVoice,
		confirm,
		close,
		cancel
	} = useVoice();
</script>

<style lang="scss" scoped>
	.page {
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.title {
			margin-bottom: 20rpx;
		}

		.audio-box {
			width: 710rpx;
			margin: 20rpx 0;

			audio {
				width: 680rpx;
			}
		}

		.page-body {}
	}
</style>
<style>
	.audio-progress-content {
		width: 90vw;
		height: 112rpx;
		background-color: #fff;
		margin: 32rpx auto;
		padding: 24rpx;
		display: flex;
		border: 2rpx solid #f0f0f0;
		border-radius: 4rpx;
		align-items: center;
		box-sizing: border-box;
	}

	.audio-progress-content>image {
		width: 60rpx;
		height: 60rpx;
	}

	.audio-progress-content .audio-progress {
		flex: 1 0 auto;
		display: flex;
		align-items: center;
	}

	.audio-progress-content .audio-progress .progress-bar {
		position: relative;
		height: 4rpx;
		flex: 1 0 auto;
		margin: 0 24rpx;
	}

	.audio-progress .progress-bar .bar-total {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #ededed;
		border-radius: 2rpx;
	}

	.audio-progress .progress-bar .bar-current {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background-color: #07c160;
		border-radius: 2rpx;
		z-index: 2;
		transition: width .6s;
	}

	.audio-progress-content .audio-progress .audio-duration {
		min-width: 60rpx;
	}
</style>