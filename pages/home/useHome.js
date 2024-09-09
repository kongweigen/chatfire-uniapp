import {
	queryUser
} from '@/api';
import {
	ref,
	onMounted
} from 'vue';

import {
	onLoad,
} from '@dcloudio/uni-app';
import {
	menuMock,
	createItemMock,
	historyMock,
	routerUrlMap
} from '@/utils/index.js'

export const useHome = () => {

	const menuList = ref(menuMock)
	const createItem = ref(createItemMock)
	const historyList = ref(historyMock)
	const toPage = (item, routerType) => {
		debugger
		const urlName = item.value || item;
		switch (urlName) {
			case 'clear':
				toRoute(routerUrlMap['clear'], 'clear')
				break;
			case '图片创作':
				toRoute(routerUrlMap['picDesign'])
				break;
			case '视频创作':
				toRoute(routerUrlMap['videoDesign'])
				break;
			case 'fireChat':
				toRoute(routerUrlMap['fireChat'])
				break;
			default:
				toRoute(routerUrlMap['picDesign'])
				break;
		}

	}
	
	const toRoute = (url, type) => {
		// debugger
		// if (routerType === 'tab') {
		// 	uni.switchTab({
		// 		url: urlInfo
		// 	})
		// } else {
		// 	uni.navigateTo({
		// 		url: `/pages/design/index?type=${type}`
		// 	});
		// }
		uni.navigateTo({
			url: `/pages/design/index?type=${type}`
		});
	}
	onMounted(() => {
		queryUser()
	})
	return {
		createItem,
		historyList,
		menuList,
		toPage
	}
}