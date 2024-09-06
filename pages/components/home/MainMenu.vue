<template>
	<div class="mainMenu">
		<div class="menuItem leftHeight" :style="{ backgroundColor: btnColor }">
			<div class="leftBox boxUp" @click="showPopup = true">
				<img :src="addIconSrc" style="width: 50px; height: 50px" alt="" />
				<div>
					<span style="font-size: 16px; color: #fff; font-weight: bold">开始创作</span>
					<br />
					<span style="font-size: 12px; color: #fff; opacity: 0.7">图片视频尽情创作</span>
				</div>
			</div>
			<div class="leftBox boxDown">
				<div>
					<span style="margin: 4px 0 0 9px; font-size: 12px; color: #fff; font-weight: bold">历史记录</span>
				</div>
				<div style="display: flex; gap: 4px; margin: 6px 0 0 14px; overflow-x: scroll; width: 150px">
					<div class="historyBox" v-for="item in historyList" :key="item">
						<img :src="item.img" style="width: 20px; height: 20px" alt="" />
					</div>
				</div>
			</div>
		</div>
		<div class="rightMenu">
			<div class="menuItem rightHeight" v-for="item in mainItems" :key="item">
				<div style="margin-left: 16px">
					<span style="font-size: 16px; font-weight: bold">{{ item.title }}</span>
					<br />
					<span style="font-size: 12px; opacity: 0.7">{{ item.content }}</span>
				</div>
				<div>
					<img :src="item.icon" style="width: 50px; height: 50px; margin-right: 4px" alt="" />
				</div>
			</div>
		</div>
		<CreatePopup :show="showPopup" :createItem="createItem" @close="showPopup = false" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import CreatePopup from './CreatePopup.vue';

defineProps({
	btnColor: {
		type: String,
		required: true
	},
	historyList: {
		type: Array,
		required: true
	},
	mainItems: {
		type: Array,
		required: true
	},
	createItem: {
		type: Array,
		required: true
	}
});

const showPopup = ref(false);
const addIconSrc = '/static/add.svg';
</script>

<style scoped>
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
</style>
