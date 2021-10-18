module.exports = {
	http (url, method, params) {
		let token = ''
		let sign = ''
		let data = { token, sign }
		if (params.data) {
			for (let key in params.data) { // 在这里判断传过来的参数值为null，就删除这个属性
			    if (params.data[key] == null || params.data[key] == 'null') {
			        delete params.data[key]
			    }
			}
			data = {...data,...params.data}
		}
		wx.request({
			url: 'http://localhost:3000' + url,
			method: method,
			data: data,
			header: {
				'content-type': 'application/json'
			},
			success(res) {
				params.success && params.success(res.data)
			},
			fail(error) {
				params.fail && params.fail(error)
			}
		})
	}
}