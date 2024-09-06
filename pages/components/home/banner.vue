<template>
	<swiper class="bannerBox" :options="swiperOptions" @change="onSwiperChange">
		<swiper-slide v-for="(url, index) in urls" :key="index">
			<img :src="url" alt="" />
		</swiper-slide>
	</swiper>
</template>

<script setup>
import { ref, watch } from 'vue';

defineProps({
	list: {
		type: Array,
		required: true
	},
	height: {
		type: String,
		default: '600px'
	}
});

const urls = ref([]);
const swiperOptions = {
	slidesPerView: 1,
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
	height: ref(height)
};

watch(
	() => props.list,
	(newList) => {
		urls.value = newList.map((item) => item.url);
	}
);

const emit = defineEmits(['change']);

const onSwiperChange = (swiper) => {
	emit('change', swiper.activeIndex);
};
</script>

<style scoped>
.bannerBox {
	height: 1200px;
}
</style>
