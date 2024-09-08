import {
	queryUser
} from '@/api';
import {
	ref,
	onMounted
} from 'vue';
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
	const toPage = (item) => {
		switch (item.value) {
			case 'clear':
				toRoute(routerUrlMap['clear'])
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
	const toRoute = (urlInfo) => {
		uni.navigateTo({
			url: urlInfo
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