var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {
        name: '点击登录',
        avatarUrl: '/static/images/avatar.png'
      },
      order: {
        unpaid: 0,
        unship: 0,
        unrecv: 0,
        uncomment: 0
      },
    MyMenus: [
      // { url: "/pages/ucenter/collect/collect", pic:"icon_collect.png",name:"商品收藏"},
      // { url: "/pages/ucenter/footprint/footprint", pic: "footprint.png", name: "浏览足迹" },
      // { url: "/pages/groupon/myGroupon/myGroupon", pic: "group.png", name: "我的拼团" },
      // { url: "/pages/ucenter/address/address", pic: "address.png", name: "地址管理" },
      //{ url: "/pages/ucenter/feedback/feedback", pic: "feedback.png", name: "意见反馈" },
      { url: "/pages/about/about", pic: "about_us.png", name: "关于我们" }
      // *,{ url: "/pages/about/about", pic: "comment.png", name: "使用帮助" }
      ],
      hasLogin: false,
      totalAmount: 0.00
  },

  /**
   * 页面跳转
  */
  goPages:function(e){
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url+"?userInfo="+JSON.stringify(this.data.userInfo)
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/accountLogin/accountLogin"
      });
    };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
  onShow:function(){
    //获取用户的登录信息
    let that = this;
    if (app.globalData.hasLogin) {
      wx.request({
        url: api.UserInfo,
        method: 'GET',
        data: {},
        header: {
          'X-Dts-Admin-Token': wx.getStorageSync("X-Dts-Admin-Token")
        },
        success: function (res) {
          if(res.statusCode == 200){
            that.setData({
              userInfo: res.data.data,
              hasLogin: true
            });
          }else{
            console.log("123",this.data.userInfo)
          }
        },
      });
    }
  },

  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {

  },
  goLogin() {
    if (!this.data.hasLogin) {
      wx.navigateTo({
        //url: "/pages/auth/login/login"
        url: "/pages/auth/accountLogin/accountLogin"
      });
    }
  },
  goBrokerage() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/brokerage/main/main"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goOrder() {
    if (this.data.hasLogin) {
      try {
        wx.setStorageSync('tab', '0');
      } catch (e) {
      }
      wx.navigateTo({
        url: "/pages/ucenter/order/order"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/accountLogin/accountLogin"
      });
    }
  },
  goOrderIndex(e) {
    if (this.data.hasLogin) {
      let tab = e.currentTarget.dataset.index
      let route = e.currentTarget.dataset.route
      try {
        wx.setStorageSync('tab', tab);
      } catch (e) {

      }
      wx.navigateTo({
        url: route,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
  goAfterSale: function () {
    wx.showToast({
      title: '目前不支持',
      icon: 'none',
      duration: 2000
    });
  }
})