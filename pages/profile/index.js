const fetch = require('../../utils/fetch.js')

Page({
	data: {
		userInfo: null
	},
	getUserInfo (e) {
		console.log(e.detail)
		if (e.detail.userInfo){
			console.log("用户按了允许授权按钮")
			fetch("/third",{"encryptedData":e.detail.encryptedData,"iv":e.detail.iv},"POST")
			.then(res => {
				wx.setNavigationBarTitle({ title: res.data.name })
			})
		} else {
			console.log("用户按了拒绝按钮")
		}
	}
})
