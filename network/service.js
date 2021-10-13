/*
 *	存储用户登录信息，提供网络请求使用
 */
const USERS_KEY = 'WJDZ_USERS_KEY';
const STATE_KEY = 'STATE_KEY';
const ADDRESS_KEY = 'ADDRESS_KEY';
const SYSTEM_PARAMS = 'SYSTEM_PARAMS';
const WX_AUTH_INFO_KEY = 'WX_AUTH_INFO_KEY';
const WX_USER_INFO_KEY = 'WX_USER_INFO_KEY';
const SHARE_USER_INFO_KEY = 'SHARE_USER_INFO_KEY';

const getUsers = function() {
	let userInfo = '';
	userInfo = uni.getStorageSync(USERS_KEY);
	if (!userInfo) {
		userInfo = '{}';
	}
	return JSON.parse(userInfo);
}

const addUser = function(data) {
	let userInfo = {
		isAuth: true,
		audit_status: data.audit_status,
		credit_code: data.credit_code,
		enterprise_code: data.enterprise_code,
		gender: data.gender,
		login_pwd: data.login_pwd,
		mobile: data.mobile,
		name: data.name,
		nickname: data.name,
		openid: data.openid,
		org_custid: data.openid,
		org_custlevel: data.org_custlevel,
		org_custstatus: data.org_custstatus,
		org_custtype: data.org_custtype,
		org_name: data.org_name,
		orgid: data.orgid,
		role_id: data.role_id,
		role_name: data.role_name,
		role_type: data.role_type,
		session: data.session,
		trade_pwd: data.user_code,
		user_code: data.user_code,
		user_custid: data.user_custid,
		user_custlevel: data.user_custlevel,
		user_custstatus: data.user_custstatus,
		user_custtype: data.user_custtype,
		userid: data.userid,
		hx_code: data.hx_code,
		hx_pwd: data.hx_pwd,
		avatarUrl: data.photo_url
	}
	uni.setStorageSync(USERS_KEY, JSON.stringify(userInfo));
	// console.log('userInfo=', JSON.stringify(userInfo));
}

const clearUser = function() {
	// #ifdef MP-WEIXIN
	let info = {
		avatarUrl: '',
		city: '',
		country: '',
		gender: '',
		genderText: '男',
		language: '',
		nickName: '',
		province: '',
	}
	uni.setStorageSync(WX_USER_INFO_KEY, JSON.stringify(info));
	let authInfo = {
		user_custid: '',
		session: '',
		hx_code: '',
		hx_pwd: '',
		nickname: '',
		avatarUrl: '',
		sex: '',
		sexText: '男',
		mobile: '',
		userid: '',
		isAuth: false,
		user_custstatus: '',
	}
	uni.setStorageSync(WX_AUTH_INFO_KEY, JSON.stringify(authInfo));
	// #endif
	// #ifdef APP-PLUS
	let userInfo = {
		user_custid: '',
		session: '',
		userid: '',
		login_pwd: '',
		nickName: '',
		isAuth: false
	}
	uni.setStorageSync(USERS_KEY, JSON.stringify(userInfo));
	// #endif
}

// 缓存一下收货地址， 下次进到下单页面， 直接使用这个缓存地址
const setAddDefaultAddress = function(address) {
	uni.setStorageSync(ADDRESS_KEY, JSON.stringify(address));
}
const getDefaultAddress = function() {
	let address = '';
	address = uni.getStorageSync(ADDRESS_KEY);
	if (!address) {
		address = "{}";
	}
	return JSON.parse(address);
}

// 获取微信授权后的用户信息，
const getWXUserInfo = function() {
	let info = '';
	info = uni.getStorageSync(WX_USER_INFO_KEY);
	if (!info) {
		info = '{}';
	}
	return JSON.parse(info);
}
const setWXUserInfo = function(data) {
	let info = {
		avatarUrl: data.avatarUrl,
		city: data.city,
		country: data.country,
		gender: data.gender,
		genderText: data.gender == 1 ? '男' : '女',
		language: data.language,
		nickName: data.nickName,
		province: data.province,
	}
	uni.setStorageSync(WX_USER_INFO_KEY, JSON.stringify(info));
}

// 获取微信授权手机号及lbm返回的公参，
const getWXAuthInfo = function() {
	let info = '';
	info = uni.getStorageSync(WX_AUTH_INFO_KEY);
	if (!info) {
		info = {
			isAuth: false
		};
		info = JSON.stringify(info)
	}
	return JSON.parse(info);
}
const setWXAuthInfo = function(data) {
	let info = {
		user_custid: data.cust_id,
		session: data.custsession,
		hx_code: data.hx_code,
		hx_pwd: data.hx_pwd,
		nickname: data.nikename,
		avatarUrl: data.photo_url,
		sex: data.sex,
		sexText: data.sex === '1' ? '男' : '女',
		mobile: data.mobile,
		userid: data.userid,
		isAuth: true,
		user_custstatus: data.user_custstatus
	}
	uni.setStorageSync(WX_AUTH_INFO_KEY, JSON.stringify(info));
}

// 获取分享人cust_id
const getShareUserInfo = function() {
	let info = '';
	info = uni.getStorageSync(SHARE_USER_INFO_KEY);
	if (!info) {
		info = {
			user_custid: ''
		};
		info = JSON.stringify(info)
	}
	return JSON.parse(info);
}
const setShareUserInfo = function(data) {
	let info = {
		user_custid: data.user_custid
	}
	uni.setStorageSync(SHARE_USER_INFO_KEY, JSON.stringify(info));
}

const setWXAuthBaseInfo = function(avatarUrl, nickname, sex) {
	let info = Object;
	// #ifdef MP-WEIXIN
	info = getWXAuthInfo();
	info.avatarUrl = avatarUrl;
	info.nickname = nickname;
	info.genderText = sex === '1' ? '男' : '女';
	info.gender = sex;
	uni.setStorageSync(WX_AUTH_INFO_KEY, JSON.stringify(info));
	// #endif
	// #ifdef APP-PLUS
	info = getUsers();
	info.avatarUrl = avatarUrl;
	info.nickname = nickname;
	info.genderText = sex === '1' ? '男' : '女';
	info.gender = sex;
	uni.setStorageSync(USERS_KEY, JSON.stringify(info));
	// #endif
}

const setuserCustStatusInfo = function(status) {
	let info = Object;
	// #ifdef MP-WEIXIN
	info = getWXAuthInfo();
	info.user_custstatus = status;
	uni.setStorageSync(WX_AUTH_INFO_KEY, JSON.stringify(info));
	// #endif
	// #ifdef APP-PLUS
	info = getUsers();
	info.user_custstatus = status;
	uni.setStorageSync(USERS_KEY, JSON.stringify(info));
	// #endif
}

export default {
	getUsers, // 获取登录用户信息
	addUser, // 保存登录用户信息
	clearUser, // 清除当前用户信息
	setAddDefaultAddress,
	getDefaultAddress,
	setWXAuthBaseInfo, // 更改用户信息的时候，保存昵称、头像链接
	setWXAuthInfo, // 保存授权用户的手机号、公参
	getWXAuthInfo, // 获取授权用户的手机号、公参
	getWXUserInfo, // 获取授权用户昵称、头像
	setWXUserInfo, // 保存授权用户昵称、头像
	getShareUserInfo,// 获取分享人信息
	setShareUserInfo, // 保存分享人信息,
	setuserCustStatusInfo
}
