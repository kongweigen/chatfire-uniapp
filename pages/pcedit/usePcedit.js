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

export const usePcedit = () => {

	const menuList = ref(menuMock)
	const createItem = ref(createItemMock)
	const historyList = ref(historyMock)
	const toPage = (item, routerType) => {
		const urlName = item.value || item;
		switch (urlName) {
			case 'clear':
				toRoute(routerUrlMap['clear'], routerType)
				break;
			case '图片创作':
				toRoute(routerUrlMap['picDesign'], routerType)
				break;
			case '视频创作':
				toRoute(routerUrlMap['videoDesign'], routerType)
				break;
			case 'fireChat':
				toRoute(routerUrlMap['fireChat'], routerType)
				break;
			default:
				toRoute(routerUrlMap['picDesign'], routerType)
				break;
		}

	}
	const toRoute = (urlInfo, routerType) => {
		if (routerType === 'tab') {
			uni.switchTab({
				url: urlInfo
			})
		} else {
			uni.navigateTo({
				url: urlInfo
			});
		}
	}

	const designType = ref('')
	onLoad((option) => {
		designType.value = option.type
	})
	return {
		createItem,
		historyList,
		menuList,
		toPage
	}
}