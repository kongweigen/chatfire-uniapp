<template>
	<view class="tabbar">
		<view class="tabbar-item" v-for="(item, index) in items" :key="item.id" @click="onTabClick(index)">
			<image :src="item.icon" alt="" class="tabbar-icon"></image>
			<text class="tabbar-label">{{ item.label }}</text>
		</view>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';

defineProps({
	value: {
		type: Number,
		required: true
	},
	items: {
		type: Array,
		required: true
	}
});

const currentIndex = ref(props.value);

watch(
	() => props.value,
	(newValue) => {
		currentIndex.value = newValue;
	}
);

const emit = defineEmits(['change']);

const onTabClick = (index) => {
	currentIndex.value = index;
	emit('change', index);
};
</script>

<style scoped>
.tabbar {
	display: flex;
	justify-content: space-around;
	background-color: #f5f5f5;
	padding: 10px 0;
	border-top: 1px solid #e0e0e0;
}

.tabbar-item {
	text-align: center;
}

.tabbar-icon {
	width: 24px;
	height: 24px;
}

.tabbar-label {
	font-size: 12px;
	color: #666;
}
</style>
