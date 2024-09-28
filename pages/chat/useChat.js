import {
	ref,
	watchEffect,
	onMounted,
	onUnmounted,
	computed
} from 'vue';
import {
	onShow,
} from '@dcloudio/uni-app';
import {
	useChatStore
} from '@/stores';
import {
	getHot
} from '@/api'


export const useChat = () => {
	const chatStore = useChatStore();
	const sendContent = ref('');
	const submit = (val) => {
		chatStore.createChat();
		uni.navigateTo({
			url: `/pages/chat-detail/index?text=${val || sendContent.value}&isNetwork=${!!val}`
		});
	};
	const list = ref([

	]);

	// 历史记录
	const historyShow = ref(false)
	const navLeftClick = () => {
		historyShow.value = !historyShow.value
	}

	const initHot = async () => {
		const res = await getHot()
		// console.log(res)
		let t = res.split("\n").splice(0, 10);
		try {
			t = t.map(val => val.replaceAll(/^\d+./g, '').trim())
		} catch (e) {}
		list.value = t
	}
	onShow(() => {
		chatStore.initChat()
		initHot()
	})

	const pickerShow = ref(false)
	const close = () => {
		pickerShow.value = false
	}
	const confirm = (val) => {
		val.value[0].value
		chatStore.setCurrentChatModel(val.value[0].value)
		close()
	}
	return {
		historyShow,
		sendContent,
		list,
		navLeftClick,
		submit,
		pickerShow,
		close,
		confirm,
	}
}