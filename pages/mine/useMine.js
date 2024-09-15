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
		initUser,
		login
	} = useUser();


	const user = computed(() => {
		let t = userStore.user
		t.avatar = t.avatar || AvatarIcon
		return t
	})

	const name = computed(() => {
		const token = uni.getStorageSync("token")
		let t = ''
		if (!token) {
			t = '请登录'
		} else {
			t = user.value.nickName || '设置昵称'
		}
		return t
	})

	const showLogin = async () => {
		const token = uni.getStorageSync("token")
		if (token) userStore.setLogin(true)
		else await login()
	}
	const toSignIn = async () => {
		await signIn()
		uni.showToast({
			icon:'none',
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
		name,
		user,
		showLogin,
		toSignIn,
		toPay
	}
}