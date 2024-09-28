import {
	ref,
	computed
} from 'vue'
import AvatarIcon from '@/assets/avatar.jpeg'
import {
	useUser,
} from '@/hooks/useUser.js';
import {
	onShow,
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

	const showLogin = async () => {
		// const token = uni.getStorageSync("token")
		// await login()
		// await initUser()

		// 绑定昵称
		// uni.showToast({
		// 	title: " 请头像昵称",
		// 	icon: 'none'
		// })
		userStore.setLogin(true)
		// if (!user.value.nickName) {}
		// initShowName()
	}
	const toSignIn = async () => {
		await signIn()
		uni.showToast({
			icon: 'none',
			title: '签到成功',
			duration: 2000
		});
	}
	const toPay = () => {
		// userStore.setLogin(true)
	}

	const showName = ref('请登录')
	onShow(() => {
		initShowName()
	})
	const initShowName = () => {
		const token = uni.getStorageSync("token")
		if (!token) {
			showName.value = '请登录'
		} else {
			showName.value = user.value.nickName || '设置昵称'
		}
	}
	onLoad(async () => {
		await initUser()
		initShowName()
	})
	return {
		showName,
		user,
		showLogin,
		toSignIn,
		toPay
	}
}