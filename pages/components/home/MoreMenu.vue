<template>
	<swiper class="moreItem" next-margin="20px">
		<swiper-item v-for="item in menuList" :key="item.id">
			<div style="display: flex; margin-left: 8px; font-size: 16px; font-weight: bold; align-items: center">
				<img :src="item.icon" style="width: 30px; height: 26px" alt="" />
				<div>{{ item.title }}</div>
			</div>
			<up-grid :border="false" col="3" gap="20px">
				<up-grid-item class="itemCard" v-for="(listItem, listIndex) in item.items" :key="listIndex">
					<img :src="listItem.icon" style="width: 30px; height: 30px; padding: 4px 0 4px 0" alt="" />
					<text class="grid-text">{{ listItem.name }}</text>
				</up-grid-item>
			</up-grid>
		</swiper-item>
	</swiper>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
	menuList: {
		type: Array,
		required: true
	}
});
</script>

<style scoped>
.moreItem {
	background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 0%, white 18%);
	border-radius: 8px 8px 0 0;
	width: 96vw;
	height: 45vh;
	padding: 16px 8px 0 8px;
	overflow: hidden;
}

.itemCard {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}

.grid-text {
	font-size: 14px;
	margin-top: 4px;
}
</style>
