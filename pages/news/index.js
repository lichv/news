const app = getApp()
const fetch = require('../../utils/fetch.js')

Page({

	/**
	 * 页面的初始数据
	 */
	 data: {
		query:{
			channel:"",
			page:1,
			size:10
		},
		channels:[],
		banners:[],
		list:[],
		tabbarList:[
		{ icon: 'icon-appstore', active: false,txt:'首页'},
		{ icon:'icon-compass',active:false,txt:'发现'},
		{ icon: 'icon-user', active: true,txt:'我的'}
		]
	 },

	/**
	 * 生命周期函数--监听页面加载
	 */
	 onLoad: function (options) {
		this.setData({channels : app.globalData.channels});
		var query = this.data.query;
		query.channel = app.globalData.selected_channel_code;
		this.setData({query:query})
		this.getPage(1)
	 },

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	 onReady: function () {

	 },

	/**
	 * 生命周期函数--监听页面显示
	 */
	 onShow: function () {

	 },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	 onHide: function () {

	 },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	 onUnload: function () {

	 },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	 onPullDownRefresh: function () {

	 },

	/**
	 * 页面上拉触底事件的处理函数
	 */
	 onReachBottom: function () {

	 },

	/**
	 * 用户点击右上角分享
	 */
	 onShareAppMessage: function () {

	 },

	 getPage(page){
		let that = this;
		var list = this.data.list;
		this.data.query.page = page;
		fetch('/news',this.data.query)
		.then(res => {
			if (res.data.state==2000) {
				if (page==1) {
					list = [];
					that.setData({ banners: res.data.banners })
				}
				res.data.data.forEach(function(item,index,arr){
					list.push(item)
				})
				that.data.page = res.data.page;
				if (res.data.page.page < res.data.page.last) {
					that.data.query.page = res.data.page + 1;
				}
				that.setData({ list: list })
			}
		})
	 },
	 reset(){
		this.getPage(1)
	 },
	 selectChannel(event){
		let that = this;
		var channel_list = [];

		this.data.channels.forEach(function(item,index,arr){
			var tmp = item
			if (item.code==event.target.dataset.code) {
				tmp["selected"] = true
			}else{
				tmp["selected"] = false
			}
			channel_list.push(tmp)
		})
		this.setData({channels:channel_list})
		app.globalData.channels = channel_list;
		app.globalData.selected_channel_code = event.target.dataset.code;
		wx.redirectTo({
			url: `/pages/news/index`,
		})
	 },
	})