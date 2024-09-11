import {
	ref,
	watchEffect,
	onMounted,
	onUnmounted,
	computed
} from 'vue';
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
		console.log(res)
		let t = res.split("\n").splice(0, 10);
		try {
			t = t.map(val => val.replaceAll(/^\d+./g, '').trim())
		} catch (e) {
			//TODO handle the exception
		}
		list.value = t
	}
	onMounted(() => {
		chatStore.initChat()
		initHot()
	})
	return {
		historyShow,
		sendContent,
		list,
		navLeftClick,
		submit
	}
}