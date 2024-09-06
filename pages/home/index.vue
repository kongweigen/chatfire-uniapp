<template>
	<transition name="fade" type="animation">
		<view class="content">
			<up-swiper class="bannerBox" easingFunction="easeInOutCubic" :list="list1.map((item) => item.url)" height="600" radius="0" @change="onSwiperChange"></up-swiper>
			<view class="mainMenu">
				<view class="menuItem leftHeight" :style="{ backgroundColor: btnColor }">
					<view class="leftBox boxUp" @click="showPop = true">
						<view>
							<img src="/static/add.svg" style="width: 50px; height: 50px" alt="" />
						</view>
						<view>
							<span style="font-size: 16px; color: #fff; font-weight: bold">开始创作</span>
							<br />
							<span style="font-size: 12px; color: #fff; opacity: 0.7">图片视频尽情创作</span>
						</view>
					</view>
					<view class="leftBox boxDown">
						<view>
							<span style="margin: 4px 0 0 9px; font-size: 12px; color: #fff; font-weight: bold">历史记录</span>
						</view>
						<view style="display: flex; gap: 4px; margin: 6px 0 0 14px; overflow-x: scroll; width: 150px">
							<view class="historyBox" v-for="item in historyList" :key="item">
								<img :src="item.img" style="width: 20px; height: 20px" alt="" />
							</view>
						</view>
					</view>
				</view>
				<view class="rightMenu">
					<view class="menuItem rightHeight" v-for="item in mainItems" :key="item">
						<view style="margin-left: 16px">
							<span style="font-size: 16px; font-weight: bold">{{ item.title }}</span>
							<br />
							<span style="font-size: 12px; opacity: 0.7">{{ item.content }}</span>
						</view>
						<view>
							<img :src="item.icon" style="width: 50px; height: 50px; margin-right: 4px" alt="" />
						</view>
					</view>
				</view>
			</view>
			<view>
				<swiper class="moreItem" nextMargin="20px">
					<swiper-item v-for="item in menuList" :key="item">
						<view style="display: flex; margin-left: 8px; font-size: 16px; font-weight: bold; align-items: center">
							<view class="">
								<img src="/static/chatFireLogo.png" style="width: 30px; height: 26px" alt="" />
							</view>
							<view class="">
								{{ item.itemclass }}
							</view>
						</view>
						<up-grid :border="false" col="3" gap="20px">
							<up-grid-item class="itemCard" v-for="(subItem, listIndex) in item.subItems" :key="listIndex" @click="toPage(subItem)">
								<img src="/static/chatFireLogo.png" style="width: 30px; height: 30px; padding: 4px 0 4px 0" alt="" />
								<text class="grid-text">{{ subItem.label }}</text>
							</up-grid-item>
						</up-grid>
					</swiper-item>
				</swiper>
			</view>
			<view class="bottom">
				<up-tabbar :value="value1" @change="change1" :fixed="true" :placeholder="false" :safeAreaInsetBottom="true">
					<up-tabbar-item text="首页" icon="home" @click="click1"></up-tabbar-item>
					<up-tabbar-item text="火宝" icon="photo" @click="click1"></up-tabbar-item>
					<up-tabbar-item text="我的" icon="account" @click="click1"></up-tabbar-item>
				</up-tabbar>
			</view>
		</view>
		<up-popup :show="showPop" mode="bottom" :round="8" closeOnClickOverlay @close="showPop = false" safeAreaInsetBottom>
			<view class="createPop">
				<view class="createItem" v-for="item in createItem" :key="item" @click="toPage(item.label)">
					<img :src="item.src" alt="" />
					<text class="grid-text">{{ item.label }}</text>
				</view>
			</view>
		</up-popup>
	</transition>
</template>

<script setup>
import { ref } from 'vue';
import { useHome } from './useHome.js';

const { menuList, createItem, historyList, toPage } = useHome();

const showPop = ref(false);
const list1 = ref([
	{
		url: '/static/banner11.png',
		backgroundColor: '#c1cdd1',
		btnColor: 'rgb(30,144,230)'
	}
	// 更多图片及其背景色...
]);
const mainItems = ref([
	{
		title: '智能换脸',
		content: '换成TA试试看',
		icon: '/static/face.svg'
	},
	{
		title: '音频转换',
		content: '清脆声音谁不忘',
		icon: '/static/pic.png'
	}
]);

// 当前背景色，初始化为第一个幻灯片的背景色
const currentBackgroundColor = ref(list1.value[0].backgroundColor);
const btnColor = ref(list1.value[0].btnColor);
// 轮播图切换事件处理函数
const onSwiperChange = ({ current }) => {
	// 更新当前背景色为当前幻灯片的背景色
	currentBackgroundColor.value = list1.value[current].backgroundColor;
	btnColor.value = list1.value[current].btnColor;
};
</script>

<style lang="scss">
.content {
	height: 100vh;
	background-color: #eeeeee; /* 举例背景颜色，您可以根据需要更改 */
	transition: background-color 2s ease; // 添加CSS过渡效果
	height: 100vh;
}
.bannerBox {
	height: 1200px;
}
.mainMenu {
	display: flex;
	align-items: center;
	position: absolute;
	top: 19vh;
	margin: 12px;
	width: 94vw;
	justify-content: space-between;
	z-index: 999;
	.leftHeight {
		height: 20vh !important;
		flex-direction: column;
	}
	.boxUp {
		justify-content: center;
		align-items: center;
		padding-right: 14px;
	}
	.boxDown {
		flex-direction: column;
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 8px;
		padding-top: 6px;
	}
	.leftBox {
		display: flex;
		width: 100%;
		height: 50%;
		// height: 125px;
		.historyBox {
			display: flex;
			width: 30px;
			height: 30px;
			background-color: rgba(255, 255, 255);
			border-radius: 4px;
			justify-content: center;
			align-items: center;
		}
	}
	.rightMenu {
		flex-direction: column;
		color: #333333 !important;
	}
	.menuItem {
		transition: background-color 2s ease;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 46vw;
		height: 9.5vh;
		border-radius: 8px;
		background-color: rgb(203, 240, 255, 0.5);
		margin-bottom: 8px;
	}
}
.moreItem {
	background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 0%, white 18%);
	border-radius: 8px 8px 0 0;
	width: 96vw;
	height: 45vh;
	padding: 16px 8px 0 8px;
	overflow-x: scroll;
	position: absolute;
	top: 42.5vh;
	transition: background-color 2s ease;
	.u-grid-item {
		border-radius: 8px !important;
		background-color: #eef5fb !important;
		height: 88px;
	}
	.u-grid {
		padding: 8px;
	}
}
.grid-text {
	font-size: 14px;
	color: #909399;
	padding: 10rpx 0 20rpx 0rpx;
	/* #ifndef APP-PLUS */
	box-sizing: border-box;
	/* #endif */
}
.u-popup__content {
	border-radius: 24px !important;
	margin: 8px 8px 18px 8px;
}
.createPop {
	display: flex;
	padding: 32px 16px 0px 16px;
	height: 20vh;
	justify-content: space-around;
	.createItem {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: rgb(239, 244, 247);
		border-radius: 8px;
		width: 46%;
		text {
			font-weight: bold;
			color: #333333;
		}
		image {
			width: 120px !important;
			height: 120px !important;
		}
	}
}
// 定义fade过渡效果的进入和离开状态
.fade-enter-active,
.fade-leave-active {
	transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在Vue 2.1.8+中 */ {
	opacity: 0;
}
</style>
