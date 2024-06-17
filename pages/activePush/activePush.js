// pages/activePush/activePush.js
var util = require('../../utils/util.js');
var check = require('../../utils/check.js');
var api = require('../../config/api.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme:"",
    time:"",
    provider:"",
    site:"",
    organ:"",
    content:""
  },
  bindTheme:function(e){
    this.setData({
      theme:e.detail.value
    })
    console.log(this.data.theme)
  },
  bindTIme:function(e){
    console.log(e.detail.value)
    this.setData({
      time:e.detail.value
    })
  },
  bindProvider:function(e){
    console.log(e.detail.value)
    this.setData({
      provider:e.detail.value
    })
  },
  bindSite:function(e){
    console.log(e.detail.value)
    this.setData({
      site:e.detail.value
    })
  },
  bindOrgan:function(e){
    console.log(e.detail.value)
    this.setData({
      organ:e.detail.value
    })
  },
  bindContent:function(e){
    console.log(e.detail.value)
    this.setData({
      content:e.detail.value
     })
    
  },
  submitBtn:function(e){
    console.log(123)
    if (this.data.theme == '') {
      util.showErrorToast('请输入活动主题');
      return false;
    }
    if (this.data.time == '') {
      util.showErrorToast('请输入活动时间');
      return false;
    }
    if (this.data.provider == '') {
      util.showErrorToast('请输入发布者');
      return false;
    }
    if (this.data.site == '') {
      util.showErrorToast('请输入活动地点');
      return false;
    }
    if (this.data.organ == '') {
      util.showErrorToast('请输入组织机构');
      return false;
    }
    if (this.data.content == '') {
      util.showErrorToast('请输入详情');
      return false;
    }
    debugger
    // util.request(api.activePush, {message:''}, 'GET').then(res => {
    //     console.log(res)
    // })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})