<template>
	<view>
		<!-- <uni-collapse>
		    <uni-collapse-item title="默认开启" :open="true">
		        <text>折叠内容</text>
		    </uni-collapse-item>
		    <uni-collapse-item title="折叠内容">
		            <text>折叠内容</text>
		    </uni-collapse-item>
		    <uni-collapse-item title="禁用状态" disabled>
		        <text>折叠内容</text>
		    </uni-collapse-item>
		</uni-collapse> -->
		<image :src="images[0].url" mode="scaleToFill"></image>
		<button type="default" @click="upload">上传</button>
		<button type="default" @click="handleUsersCode">下载</button>
		<view>
		<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="popup-content">
					<image 
					class="code-image" 
					id="codeimage"
					:src="share_qrcode_url"></image>
					<view class="bottom-code">
						<view class="code-view" @click="saveCodeImage()">
							<!-- <image src="@/static/person/my_icon_download.png"></image> -->
							<view class="title-code">点击保存图片</view>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	// import uniCollapse from '@/component/uni-collapse/components/uni-collapse/uni-collapse'
	// import uniCollapse from '../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue'
	// import uniPopup from '../../../component/uni-popup/components/uni-popup/uni-popup.vue'
	import http from '../../../network/api.js'
	export default {
		data() {
			return {
				images: [
					{name: '', url: ''}
				],
				share_qrcode_url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
			}
		},
		components: {
			// uniPopup
			// uniCollapse
		}, 
		methods: {
			onClick() {},
			// 下载demo
			change () {},
			handleUsersCode() {
				this.$refs.popup.open('center');
			},
			saveCodeImage () {
				uni.downloadFile({
					url: this.share_qrcode_url,
					success: (res) => {
						if (res.statusCode === 200){
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存图片成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
								    });
							    }
						    });
					    }
					}
				})
			},
			// 上传 demo
			upload() {
				let _self = this;
				uni.chooseImage({
					count: 1,
					success: res => {
						// 返回的res为{ errMsg: '', tempFiles: Array[]}
						console.log(res);
						// 大小限制
						if (res && res.tempFiles[0].size >= 1024 * 1024 * 10) {
							uni.showToast({
								title: '单个文件不超过10M',
								icon: 'none'
							})
						} else {
							_self.uploadImage(res.tempFilePaths[0]);
						}
					}
				})
			},
			uploadImage(path) {
				let _self = this;
				uni.showLoading({
					title: '正在上传...'
				});
				// console.log(http.uploadApi())
				uni.uploadFile({
					// formData: { path },
					url: 'http://localhost:3000/thirdService/upload',
					filePath: path,
					name: 'file',
					fileType: 'image',
					success: (res) => {
						// _self.images = res.data
						console.log('上传后返回结果', res);
						if (res.statusCode === 200 && res.data) {
							_self.images = JSON.parse(res.data).data;
						} else {
							uni.showToast({
								icon: 'none',
								title: '图片上传失败'
							});
						}
					},
					fail: res => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '图片上传失败'
						});
						console.log(res);
					},
					complete() {
						setTimeout(function() {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '图片上传成功'
							});
											
						}, 1500);
					}
				})
			},
		}
	}
</script>

<style>

</style>
