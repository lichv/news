const app = getApp()
const fetch = require('../../utils/fetch.js')

Page({

	/**
	 * 页面的初始数据
	 */
	 data: {
	 	code:"",
	 	news: {
	 		"newssource": "IT之家",
	 		"newsauthor": "弥尘",
	 		"detail": '<p>泰国原产/抗螨抑菌，nittaya旗舰店进口天然乳胶枕报价239元，限时限量90元券，实付149元包邮，</p><p>不同造型不同设计，适合不同睡眠需求人群，天然乳胶，蜂窝排气，透气舒适，配有内外枕套，外层天丝棉针织面料，亲肤舒适。</p><p>泰国原装进口，原产地制造，泰国本土知名品牌，泰国商业部推荐，前泰国驻华公使倾力推荐。妮泰雅乳胶枕采用天然乳胶材质，取自泰国南部明珠普吉府乳胶黄金产区，自有橡胶林纯天然乳胶。</p><p>•&nbsp;乳胶枕的体验</p><p>乳胶枕头近年来很受欢迎，有些入睡难，睡觉容易醒的人换乳胶枕后，确实有明显的睡眠质量改善。枕头这东西因人而异，和身体状态、睡眠习惯都有关系，本质差别就是枕芯的材质，大类上分为颗粒物填充、羽绒枕、慢性回弹枕等。</p><p>乳胶枕多是整体切割的一整块，表面具有多气孔结构，看着像海绵，但远比工业合成胶透气，并且质地柔软、弹性支撑适中，不易变形，还具有抗菌性，寿命长久，可长久使用。可做成符合人体工程的等高曲面、舌形曲面等，缺点是高度不可调，有人觉得比较高。<img src="http://img.ithome.com/newsuploadfiles/2016/11/20161125_172341_397.png" width="100%"/>',
	 	},
	 },

	/**
	 * 生命周期函数--监听页面加载
	 */
	 onLoad: function (params) {
	 	this.setData({code:params.code})
	 },

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	 onReady: function () {
	 	this.getDetail(this.data.code)
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
	 getDetail(code){
	 	let that = this;
	 	if (code) {
	 		fetch('/detail',{"code":code})
	 		.then(res => {
	 			if (res.data.state==2000) {
	 				that.setData({ news: res.data.data })
	 			}
	 		})
	 	}
	 	
	 },
	})