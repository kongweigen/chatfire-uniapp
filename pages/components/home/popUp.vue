<template>
	<view class="popup" v-if="show">
		<view class="popup-content">
			<view class="popup-header">
				<text class="popup-title">{{ createItem.title }}</text>
				<button @click="closePopup" class="popup-close">X</button>
			</view>
			<view class="popup-body">
				<text class="popup-description">{{ createItem.description }}</text>
				<view class="popup-actions">
					<button @click="handleAction" class="popup-action-button">{{ createItem.actionText }}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
	show: {
		type: Boolean,
		required: true
	},
	createItem: {
		type: Object,
		required: true
	}
});

const emit = defineEmits(['close']);

const closePopup = () => {
	emit('close');
};

const handleAction = () => {
	// Handle action logic here
	closePopup();
};
</script>

<style scoped>
.popup {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

.popup-content {
	background-color: #fff;
	padding: 20px;
	border-radius: 8px;
	width: 80%;
	max-width: 400px;
}

.popup-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.popup-title {
	font-size: 18px;
	font-weight: bold;
}

.popup-close {
	background: none;
	border: none;
	cursor: pointer;
}

.popup-description {
	margin-bottom: 20px;
}

.popup-actions {
	display: flex;
	justify-content: flex-end;
}

.popup-action-button {
	background-color: #007bff;
	color: #fff;
	padding: 10px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
</style>
