<template>
	<u-modal :show="show" title="今日签到" :showConfirmButton="false" closeOnClickOverlay>
		<view class="slot-content">
			<p class="tips"></p>
			<div class="glod-box">
				<div class="item" :class="{ disabled: item.disabled }" v-for="item in list">
					<u-image src="@/assets/ic-tokens.png" width="60rpx" height="60rpx"></u-image>
				</div>
			</div>
			<div class="btn">立即签到</div>
		</view>
	</u-modal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const list = ref([
	{ label: '1天', count: 50, disabled: false },
	{ label: '2天', count: 50, disabled: false },
	{ label: '3天', count: 50, disabled: false },
	{ label: '4天', count: 50, disabled: false },
	{ label: '5天', count: 50, disabled: false },
	{ label: '6天', count: 50, disabled: false },
	{ label: '7天', count: 50, disabled: false }
]);

const signIn = (item) => {
	item.disabled = true;
};

const show = ref(false)
onMounted(() => {
	// show.value = true
});
</script>

<style lang="scss" scoped>
.slot-content {
	.glod-box{
		display: flex;
		gap: 10rpx;
		.item{
			background-color: #c3c3c3;
			border-radius: 10rpx;
			width: 65rpx;
			height: 60rpx;
		}
	}
	.btn {
		margin: auto;
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
		padding: 10rpx 20rpx;
		border-radius: 40rpx;
		width: 200rpx;
		color: #3a2f1f;
		background: linear-gradient(to bottom, #ffe8a0, #ffe8a0, #fcc770);
		// linear-gradient(to bottom, #ffe8a0, #ffe8a0, #fcc770);
	}
}
</style>
