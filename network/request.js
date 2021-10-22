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
				// 'content-type': 'application/x-www-form-urlencoded'
			},
			success(res, statusCode) {
				console.log('req-statusCode', statusCode)
				params.success && params.success(res.data)
			},
			fail(error) {
				params.fail && params.fail(error)
			}
		})
	}
}