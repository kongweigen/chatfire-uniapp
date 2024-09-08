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

export const useChat = () => {
	const chatStore = useChatStore();
	const sendContent = ref('');
	const submit = (val) => {
		chatStore.createChat();
		uni.navigateTo({
			url: `/pages/chat-detail/index?text=${val || sendContent.value}`
		});
	};
	const list = ref([
		'美驻华领馆工作人员散布“台独”言论',
		'女格斗运动员遭猥亵：想打他怕打残废热',
		'台风灾后恢复工作已加紧展开',
		'郑钦文晒和父母游玩九寨沟美照',
		'国足球员刘洋离开国家队热',
		'小孩姐削土豆受伤气跑4名医生',
		'男子出差回来发现家被妻子出租'
	]);

	// 历史记录
	const historyShow = ref(false)
	const navLeftClick = () => {
		historyShow.value = !historyShow.value
	}

	onMounted(() => {
		chatStore.initChat()
	})
	return {
		historyShow,
		sendContent,
		list,
		navLeftClick,
		submit
	}
}