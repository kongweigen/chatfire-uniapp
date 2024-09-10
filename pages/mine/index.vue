<template>
	<view>
		我的
		<u---input v-model="loginCode"></u---input>
		<u-button @click="login">登录</u-button>
	</view>
</template>

<script setup>
import { useMine } from './useMine.js';
const { loginCode, login } = useMine();
</script>

<style></style>
