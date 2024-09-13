import {
	ref,
	computed
} from 'vue'
import AvatarIcon from '@/assets/avatar.jpeg'
import {
	useUser,

} from '@/hooks/useUser.js';
import {
	onLoad,
} from '@dcloudio/uni-app';

import {
	useUserStore
} from '@/stores';
import {
	signIn
} from '@/api'
export const useMine = () => {
	const defaultAvatar = ref(AvatarIcon)
	const loginCode = ref("")
	const userStore = useUserStore();
	const {
		initUser
	} = useUser();


	const user = computed(() => {
		let t = userStore.user
		t.avatar = t.avatar || AvatarIcon
		return t
	})
	const login = () => {
		userStore.setLogin(true)
	}
	const toSignIn = async () => {
		await signIn()
		uni.showToast({
			title: '签到成功',
			duration: 2000
		});
	}
	const toPay = () => {
		userStore.setLogin(true)
	}

	onLoad(() => {
		initUser()
	})
	return {
		user,
		login,
		toSignIn,
		toPay
	}
}