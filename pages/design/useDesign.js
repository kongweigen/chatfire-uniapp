import {
	queryUser,
	generateImage
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

export const useDesign = () => {

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

	const imageSetting = ref({
		model: "flux-pro",
		prompt: "",
		n: 1,
		size: "1024x1024",
		url: "",
	})

	const text2picDesign = async (designText) => {
		debugger
		uni.showToast({
			title: '请稍后,图片生成中..',
			duration: 2000,
			mask: true,
			icon: 'loading'
		})
		imageSetting.value.prompt = designText;
		const res = await generateImage(imageSetting).catch(e => uni.hideToast())
		if (res.data) {
			uni.hideToast();

		}
	}
	const pic2picDesign = () => {

	}

	const createVal = ref('');

	const setVal = (desc) => {
		createVal.value = desc;
	};

	const modelContent = ref('123');
	const showModelPicker = ref(false);

	const selModel = () => {
		showModelPicker.value = true
	}

	const designType = ref('')
	onLoad((option) => {
		designType.value = option.type
	})
	return {
		createItem,
		historyList,
		menuList,
		toPage,
		pic2picDesign,
		text2picDesign,
		showModelPicker,
		modelContent,
		createVal,
		setVal,
		selModel
	}
}