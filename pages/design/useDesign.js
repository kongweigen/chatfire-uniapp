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
	routerUrlMap,
	modelOptions
} from '@/utils/index.js'

export const useDesign = () => {

	const menuList = ref(menuMock)
	const createItem = ref(createItemMock)
	const historyList = ref(historyMock)

	// 页面跳转
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
	// 路由匹配
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

	// 文本
	const createVal = ref('');
	const setVal = (desc) => {
		createVal.value = desc;
	};
	// 模型选择
	const modelContent = ref({
		label: 'flux-pro',
		value: 'flux-pro'
	});
	const showModelPicker = ref(false);
	const openModelPicker = () => {
		showModelPicker.value = !showModelPicker.value
	}

	const designType = ref('')
	onLoad((option) => {
		designType.value = option.type
	})

	const modelList = ref([modelOptions])
	const setModel = (model) => {
		console.log(model.value[0].value)
		modelContent.value = {
			...model.value[0]
		}
		openModelPicker()
	}


	// 图片生成
	const designPic = ref('')
	const picShow = ref(false)
	const showDesignModal = () => {
		picShow.value = !picShow.value
	}
	const imageSetting = ref({
		model: "flux-pro",
		prompt: "",
		n: 1,
		size: "500x500",
		url: "",
	})

	const text2picDesign = async () => {
		if (!createVal.value) {
			uni.showToast({
				title: '请填写创作内容',
				duration: 2000,
				icon: 'none'
			})
			return
		}
		uni.showLoading({
			mask: true,
			title: '生成中..'
		});
		imageSetting.value.model = modelContent.value.value;
		imageSetting.value.prompt = createVal.value;
		const res = await generateImage(imageSetting.value).finally(() => uni.hideLoading())
		if (res?.data[0]) {
			showDesignModal();
			designPic.value = res.data[0].url
		}
	}
	const pic2picDesign = () => {

	}

	const savePic = () => {
		uni.downloadFile({
			url: designPic.value,
			timeout: '2000',
		})
	}

	onMounted(() => {})
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
		openModelPicker,
		modelList,
		setModel,
		designPic,
		picShow,
		savePic,
		showDesignModal
	}
}