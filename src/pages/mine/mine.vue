<template>
	<view>
		<view class="login" @click="login">登录</view>
	</view>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			async login() {
				console.log('123');
				// 密码处理
				// let pwd = Md5.hashStr(Md5.hashStr(userInfo.password) + '123456789')
				const params = {
				    // email: userInfo.email,
				    // password: userInfo.password
					email: '1766676238@qq.com',
					password: '123456'
				}
				// 登录接口
				const data = await axios.post('http://localhost:3000/users/login', params);
				console.log(data);
			}
		}
	}
</script>

<style>

</style>
