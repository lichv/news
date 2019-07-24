const stringify = require('./stringify.js')
const app = getApp()

module.exports = function (url, data, method = 'POST', header = {}) {
	wx.showLoading({ title: 'Loading...' })
	header = Object.assign({
		"X-Requested-With":"XMLHttpRequest",
		"X-XSRFToken":wx.getStorageSync("xsrf"),
		"X-TOKEN":wx.getStorageSync("token"),
		"Content-Type":"application/x-www-form-urlencoded",
		"cookie": wx.getStorageSync("sessionid")
	}, header);

	return new Promise((resolve, reject) => {
		wx.request({
			url: app.config.apiBase + url,
			data: stringify(data),
			header,
			method,
			dataType: 'json',
			fail: reject,
			success(res) {
				var cookie = res.header["Set-Cookie"];
				if (cookie != null) {
					wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
				}
				wx.hideLoading()
				resolve(res);
			},
			complete(res) {
				wx.hideLoading()
				reject(res);
			}
		})
	})
}