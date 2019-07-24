App({
	/**
	* 全局配置信息
	*/
	config: {
		apiBase: 'http://localhost',
		apiAppId: 'wxfb111111111111111',
		apiAppSecret: '81522222222222222222222222222222'
	},

	/**
	* 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
	*/
	onLaunch () {
		let that = this;
		var channels_store = wx.getStorageSync('channels')
		var token = wx.getStorageSync('token')
		var xsrf = wx.getStorageSync('xsrf')
		var channel_list = []
		if (!channels_store || !token || !xsrf) {
			wx.request({
				url: this.config.apiBase + "/",
				method:'POST',
				header: {
					'content-type': 'application/json'
				},
				success (res) {
					var cookie = res.header["Set-Cookie"];
					if (cookie != null) {
						wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
					}
					if ("state" in res.data && res.data.state==2000) {
						wx.setStorageSync("token", res.data.token);
						wx.setStorageSync("xsrf", res.data.xsrf);
						res.data.channels.forEach(function(item,index,arr){
							var tmp = item
							if (item.code==that.globalData.selected_channel_code) {
								tmp["selected"] = true
							}else{
								tmp["selected"] = false
							}
							channel_list.push(tmp)
						})
						channels_store = channel_list
						wx.setStorageSync('channels', channel_list)
					}
				}
			})
			this.globalData.channels = channel_list;
		}else{
			this.globalData.channels = channels_store;
		}
		
	},

	/**
	* 当小程序启动，或从后台进入前台显示，会触发 onShow
	*/
	onShow (options) {
		console.log('app on show', options)
	},

	/**
	* 当小程序从前台进入后台，会触发 onHide
	*/
	onHide () {
		console.log('app on hide')
	},

	/**
	* 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
	*/
	onError (msg) {
		console.log('app on error', msg)
	},
	onUnload(){
		wx.clearStorage()
	},
	globalData:{
		token:"",
		xsrf:"",
		channels:[],
		selected_channel_code:"5d2d9783e222000058000443",
		tabbarList:[
		{ icon: 'icon-appstore', active: true,txt:'首页', path:'/pages/news/index'},
		{ icon:'icon-compass',active:false,txt:'发现', path:'/pages/agreement/index'},
		{ icon: 'icon-user', active: false,txt:'我的', path:'/pages/profile/index'}
		]
	}
	})
