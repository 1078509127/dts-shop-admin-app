const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../utils/user.js');

//获取应用实例
const app = getApp();

Page({
  data: {
    setList:[
      {id:1,name:"预约查询",iconUrl:"../../static/images/jianchachaxun.png"},
      {id:2,name:"留言查看",iconUrl:"../../static/images/chakangengduo.png"},
      {id:3,name:"活动描述",iconUrl:"../../static/images/miaoshucopy.png"},
      {id:4,name:"活动推送",iconUrl:"../../static/images/tuisong.png"},
      {id:5,name:"轮播图配置",iconUrl:"../../static/images/lunbotupian.png"},
      {id:6,name:"关闭预约通道",iconUrl:"../../static/images/yansetongdao.png"},
    ],
    name:"",
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    groupons: [],
    floorGoods: [],
    banner: [],
    channel: [],
    coupon: [],
    articles: [],
    goodsCount: 0,
    indicatorDots: false,
    window: false,
    colseCoupon: false
  },
 
  bindRedirect:function(e){
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/accountLogin/accountLogin"
      });
    }
    var that = this;
    that.setData({
      name: e.currentTarget.dataset.name
    })
    if(this.data.name === '预约查询'){
      wx.navigateTo({url: '/pages/reserveInfo/reserveInfo'})
    }
  //跳转到留言查看页面
  if(this.data.name === '留言查看'){
    wx.navigateTo({url: '/pages/messageView/messageView'})
  }
  //活动描述
  if(this.data.name === '活动描述'){
    wx.navigateTo({url: '/pages/activeDesc/activeDesc'})
  }
    if(this.data.name === '活动推送'){
      wx.navigateTo({url: '/pages/activePush/activePush'})
    }
    if(this.data.name === '轮播图配置'){
      wx.navigateTo({url: '/pages/swiperSet/swiperSet'})
    }
    if(this.data.name === '关闭预约通道'){
      wx.navigateTo({url: '/pages/closeReserve/closeReserve'})
    }
  },
  onShareAppMessage: function () {
    let userInfo = wx.getStorageSync('userInfo');
    let shareUserId = 1;
    if (userInfo) {
      shareUserId = userInfo.userId;
    }
    console.log('/pages/index/index?shareUserId=' + shareUserId);
    return {
      title: '聚惠星',
      desc: '长沙市聚惠星科技与您共约',
      path: '/pages/index/index?shareUserId=' + shareUserId
    }
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getIndexData();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  getIndexData: function () {
    let that = this;
    util.request(api.selSwiper).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          banner: res.data.items,
        });
      }
    });
  },
  onLoad: function (options) {
    // this.setData({
    //   colseCoupon: false
    // });
    // //如果有分享用户，则设置
    // if (options.shareUserId) {
    //   wx.setStorageSync('shareUserId', options.shareUserId);
    // }

    // // 页面初始化 options为页面跳转所带来的参数
    // if (options.scene) {
    //   //这个scene的值存在则证明首页的开启来源于朋友圈分享的图,同时可以通过获取到的goodId的值跳转导航到对应的详情页
    //   var scene = decodeURIComponent(options.scene);
    //   console.log("scene:" + scene);

    //   let info_arr = [];
    //   info_arr = scene.split(',');
    //   let _type = info_arr[0];
    //   let id = info_arr[1];

    //   let shareUserId = null; //默认用户
    //   if (info_arr.length == 4 && info_arr[2] == 'user') {
    //     shareUserId = info_arr[3];
    //   } else if (_type == 'user') {
    //     shareUserId = id;
    //   }

    //   if (shareUserId != null) {
    //     wx.setStorageSync('shareUserId', id);
    //   }

    //   if (_type == 'goods') {
    //     wx.navigateTo({
    //       url: '../goods/goods?id=' + id
    //     });
    //   } else if (_type == 'groupon') {
    //     wx.navigateTo({
    //       url: '../goods/goods?grouponId=' + id
    //     });
    //   } else if (_type == 'brand') {
    //     wx.navigateTo({
    //       url: '../brandDetail/brandDetail?id=' + id
    //     });
    //   } else if (_type == 'topic') {
    //     wx.navigateTo({
    //       url: '../topicDetail/topicDetail?id=' + id
    //     });
    //   } else {
    //     wx.navigateTo({
    //       url: '../index/index'
    //     });
    //   }
    // }

    // // 页面初始化 options为页面跳转所带来的参数
    // if (options.grouponId) {
    //   //这个pageId的值存在则证明首页的开启来源于用户点击来首页,同时可以通过获取到的pageId的值跳转导航到对应的详情页
    //   wx.navigateTo({
    //     url: '../goods/goods?grouponId=' + options.grouponId
    //   });
    // }

    // // 页面初始化 options为页面跳转所带来的参数
    // if (options.goodId) {
    //   //这个goodId的值存在则证明首页的开启来源于分享,同时可以通过获取到的goodId的值跳转导航到对应的详情页
    //   wx.navigateTo({
    //     url: '../goods/goods?id=' + options.goodId
    //   });
    // }

    // // 页面初始化 options为页面跳转所带来的参数
    // if (options.orderId) {
    //   //这个orderId的值存在则证明首页的开启来源于订单模版通知,同时可以通过获取到的pageId的值跳转导航到对应的详情页
    //   wx.navigateTo({
    //     url: '../ucenter/orderDetail/orderDetail?id=' + options.orderId
    //   });
    // }

    this.getIndexData();
  },
  onReady: function () {
    // 页面渲染完成
    //let that = this;
    //let userInfo = wx.getStorageSync('userInfo');
    // if (!that.data.colseCoupon && userInfo && that.data.coupon.length > 0) {
    //   that.setData({
    //     window: true
    //   });
    // }
  },
  onShow: function () {
    // 每次页面显示，需获取是否用户登录，如果用户登录，则查询用户是否有优惠券，有则弹出优惠券领取窗口
    //let that = this;
    //let userInfo = wx.getStorageSync('userInfo');
    //if (!userInfo) {}
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onColse: function () {
    this.setData({
      window: false,
      colseCoupon: true
    });
  },
  // getCoupon(e) {
  //   if (!app.globalData.hasLogin) {
  //     wx.navigateTo({
  //       url: "/pages/auth/login/login"
  //     });
  //   }

  //   let couponId = e.currentTarget.dataset.index
  //   util.request(api.CouponReceive, {
  //     couponId: couponId
  //   }, 'POST').then(res => {
  //     if (res.errno === 0) {
  //       wx.showToast({
  //         title: "领取成功"
  //       })
  //     } else {
  //       util.showErrorToast(res.errmsg);
  //     }
  //   })
  // },
})