<template>
	<div class="image-compare">
		<div class="bottom-img" :style="{ backgroundImage: 'url(' + bottomImg + ')' }">
			<!-- <u-image :src="bottomImg" width="700rpx" height="700rpx" mode="aspectFit"></u-image> -->
		</div>
		<div class="mask">
			<div class="up-img" :style="{ backgroundImage: 'url(' + bottomImg + ')' }"></div>
		</div>
		<!-- <span class="spanHandle" :style="{ left: 'calc(' + upperImgWidth + '% - 24px)' }"></span> -->
		<!-- <input class="inputRange" type="range" v-model="upperImgWidth" min="0" max="100" /> -->
	</div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
const imgHeigth = ref('0px');
const imgWidth = ref('0px');
const upperImgWidth = ref(50);
const props = defineProps({
	bottomImg: {
		type: String,
		default: ''
	},
	upperImg: {
		type: String,
		default: ''
	},
	bottomLabel: {
		type: String,
		default: '原图'
	},
	upperLabel: {
		type: String,
		default: '效果图'
	}
});
// 跟踪底层图片的变化，因为底层图片是基础
watch(
	() => props.bottomImg,
	() => {
		getImgSize();
		upperImgWidth.value = 50;
	}
);
// 首次加载时初始化
onMounted(() => {
	getImgSize();
});
function getImgSize() {
	uni.getImageInfo({
		src: props.bottomImg,
		success: function (image) {
			imgHeigth.value = '200px';
			imgWidth.value = '400px';
		}
	});
}
</script>
<style lang="scss" scoped>
.image-compare {
	width: 700rpx;
	height: 700rpx;
	position: relative;
	overflow: hidden;
	.bottom-img {
		width: 700rpx;
		height: 700rpx;
		left: 0;
		position: absolute;
		background-size: cover;
	}
	.mask{
		border-left: 1rpx solid black;
		position: relative;
		width: 50%;
		height: 700rpx;
	}
	.up-img {
		width: 700rpx;
		height: 700rpx;
		right: 0;
		position: absolute;
		background-size: cover;
	}
}
</style>
//
<style lang="scss" scoped>
// .bottomImg {
// 	position: relative;
// 	overflow: hidden;
// }
// .upperImg {
// 	position: absolute;
// 	top: 0;
// 	right: 0;
// 	height: 100%;
// 	z-index: 1;
// 	background-position: right top;
// 	border-left: 2px solid rgb(255, 255, 255, 0.5);
// }
// .imgLabel {
// 	font-size: 20px;
// 	color: aliceblue;
// 	text-shadow: 1px 1px #533d4a, 2px 2px #533d4a;
// }
// .upperUndefined {
// 	position: absolute;
// 	top: 0;
// 	right: 0;
// 	height: 100%;
// 	z-index: 1;
// 	font-size: 60px;
// 	background-color: rgb(255, 255, 255, 0.8);
// 	background-position: right top;
// 	border-left: 2px solid rgb(255, 255, 255, 0.5);
// }
// .undefinedSpan {
// 	display: flex;
// 	width: 100%;
// 	height: 100%;
// 	align-items: center;
// 	justify-content: center;
// 	color: #999;
// 	overflow: hidden;
// }
// .inputRange {
// 	position: absolute;
// 	height: 100%;
// 	z-index: 3;
// 	left: -4px;
// 	touch-action: auto;
// 	width: calc(100% + 4px);
// 	opacity: 0;
// }
// .spanHandle {
// 	position: absolute;
// 	z-index: 2;
// 	height: 48px;
// 	width: 48px;
// 	position: center;
// 	font-size: 24px;
// 	border: 1px;
// 	border-radius: 50%;
// 	top: calc(90% - 24px);
// 	background-color: rgb(255, 255, 255, 0.5);
// }

// .spanHandle:before {
// 	left: 5px;
// 	transform: rotate(-45deg);
// }
// .spanHandle:after {
// 	right: -5px;
// 	transform: rotate(135deg);
// }
// .spanHandle:after,
// .spanHandle:before {
// 	border-left: 2px solid;
// 	border-top: 2px solid;
// 	content: '';
// 	height: 10px;
// 	position: absolute;
// 	top: 50%;
// 	transform-origin: 0 0;
// 	width: 10px;
// }
//
</style>
