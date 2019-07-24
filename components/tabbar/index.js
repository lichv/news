var app = getApp();

Component({

	/* 开启全局样式设置 */
	options: {
		styleIsolation: 'apply-shared'
	},

	/* 组件的属性列表 */
	properties: {
		
	},

	/* 组件的初始数据 */
	data: {
		tabbarList:[]
	},

	/* 组件声明周期函数 */
	lifetimes: {
		attached: function () {
			this.onload()
		},
		moved: function () {

		},
		detached: function () {

		},
	},

	/* 组件的方法列表 */
	methods: {
		onload(){
			this.setData({tabbarList : app.globalData.tabbarList});
		},
		fbTapFn (e){
			var selected = e.currentTarget.dataset.item
			this.data.tabbarList.forEach(function(item,index,arr){
				if (item.icon==selected.icon) {
					item.active = true
				}else{
					item.active = false
				}
			})
			app.globalData.tabbarList = this.data.tabbarList;
			this.setData({tabbarList : app.globalData.tabbarList});
			wx.redirectTo({
				url: selected.path
			})
		},
	}

})