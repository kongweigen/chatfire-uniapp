<template>
	<u-popup :show="userStore.showLogin" mode="bottom" @close="close" @open="open">
		<div class="box">
			<div class="title mb25">{{ title }}</div>
			<div class="login-form">
				<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm">
					<u-form-item label="头像" prop="userInfo.avatar" borderBottom ref="item1">
						<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
							<div class="info">
								<u-avatar v-if="userInfo.avatar" :src="userInfo.avatar"></u-avatar>
								<u-avatar v-else :src="defaultAvatar"></u-avatar>
							</div>
						</button>
					</u-form-item>
					<u-form-item label="姓名" prop="userInfo.nickName" borderBottom ref="item1">
						<input id="nickName" type="nickname" v-model="userInfo.nickName" placeholder="请输入昵称" />
					</u-form-item>
				</u--form>
				<u-button class="submit-btn" type="primary" @click="submit">
					<span>登录</span>
				</u-button>
			</div>
		</div>
	</u-popup>
</template>

<script setup>
import { ref, computed } from 'vue';
import AvatarIcon from '@/assets/avatar.jpeg';
import { useUserStore } from '@/stores';
import { userLogin, updateUserInfo } from '@/api';
import { useUser } from '@/hooks/useUser.js';
import { useUpload } from '@/hooks/useUpload.js';

const emit = defineEmits(['submit']);
const userStore = useUserStore();
const { initUser } = useUser();
const { uploadFile } = useUpload();

const userInfo = ref({
	avatar: '',
	nickName: ''
});

const title = computed(() => {
	const token = uni.getStorageSync('token');
	return token ? '信息更新' : '用户登录';
});

const submit = async () => {
	const token = uni.getStorageSync('token');
	if (!token) {
		uni.login({
			async success(res) {
				console.log('res.code', res.code);
				res.code;
				// access_token
				const rsp = await userLogin(res.code);
				uni.setStorageSync('token', rsp.access_token);
				// 更新头像昵称
				await updateUserInfo(userInfo.value);
				initUser();
				uni.showToast({
					title: '登录成功',
					duration: 2000
				});
				close();
			}
		});
	} else {
		// 更新头像昵称
		await updateUserInfo(userInfo.value);
		initUser();
		uni.showToast({
			title: '更新成功',
			duration: 2000
		});
		close();
	}
};
const onChooseAvatar = async (data) => {
	console.log('onChooseAvatar ', data);
	if (data?.detail?.avatarUrl) {
		userInfo.value.avatar = data?.detail?.avatarUrl;
		const res = await uploadFile(userInfo.value.avatar);
		userInfo.value.avatar = res.url;
	}
};

const close = () => {
	userStore.setLogin(false);
};
</script>
<style lang="scss" scoped>
.info {
	display: flex;
	align-items: center;
	gap: 20rpx;
}
.avatar-wrapper {
	margin: 0;
	padding: 0;
	background-color: transparent;
	border: none;
	&::after {
		border: none;
	}
}
.box {
	padding: 25px;
	height: 100%;
	box-sizing: border-box;
	.u-field {
		width: 100%;
		height: 52px;
		background: #f4f6f9;
		border-radius: 10px;
		:deep(.u-field__body) {
			height: 100%;
		}
	}
	.login-form {
		gap: 10px;
	}
	.img-code {
		width: 100%;
		position: relative;
		img {
			width: 100px;
			position: absolute;
			top: 13px;
			right: 10px;
		}
	}

	.agreement {
		font-size: 14px;
		font-weight: 500;
		color: #7c87ae;
		.content {
			color: #376ee8;
		}
	}
	.footer {
		margin-top: 20px;
		.cancel-btn {
			width: 152px;
			height: 47px;
			color: #2b4168;
			background: #e9f0fc;
			border-radius: 10px;
		}
		.submit-btn {
			width: 152px;
			height: 47px;
			color: #ffffff;
			background: #246de5;
			border-radius: 10px;
		}
	}
}
.title {
	color: black;
	font-size: 18px;
	font-weight: bold;
}
</style>
