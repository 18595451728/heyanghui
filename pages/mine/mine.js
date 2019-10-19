// pages/mine/mine.js
const app = getApp(), r = require('../../utils/request.js'),
  l = require('../../utils/login.js'),u=app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haslogin:!1,
    item: [{
      icon: '/images/o1.png',
      name: '全部',
      path: '/pages/order/order?=status' + 0
    },{
      icon: '/images/o2.png',
        name: '待付款',
        path: '/pages/order/order?status=' + 1
    }, {
      icon: '/images/o3.png',
        name: '待发货',
        path: '/pages/order/order?status=' + 2
    }, {
      icon: '/images/o4.png',
        name: '待收货',
        path: '/pages/order/order?status=' + 3
    }, {
        icon: '/images/o5.png',
        name: '待评价',
        path: '/pages/order/order?status=' + 4
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this,haslogin=wx.getStorageSync('haslogin')
    that.setData({
      haslogin: haslogin
    })
    that.getinfo();
  },
  bindGetUserInfo: function (e) {
    var that = this
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
      l.login(function (t) {
        console.log(t)
        wx.setStorageSync('token', t)
        wx.setStorageSync('haslogin', !0)
        that.setData({
          haslogin: !0
        })
        that.getinfo();
      });
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  getinfo:function(){
    var t = wx.getStorageSync('token'),that=this
    r.req(u + '/api/User/userInfo', {
      token: t
    }, 'post').then(res => {
      console.log(res)
      that.setData({
        user:res.data.user,
        countList: res.data.countList
      })
    })
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
    this.getinfo();
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
  gotodetail:function(e){
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },

  myorder: function (e) {
    var path = e.currentTarget.dataset.path
    wx.removeStorage({
      key: 'coupon',
      success: function (res) {
        console.log(res)
      },
    })
    if (path != '') {
      wx.navigateTo({
        url: path,
      })
    }
  },

  mycoupon:function(){
    wx.navigateTo({
      url: '/pages/couponlist/index'
    })
  },
  myintegral: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/fenxiao/index?id=' + id
    })
  },
  mymoney:function(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/money/index?id='+id
    })
  },
  address:function(){
    wx.navigateTo({
      url: '/pages/address/index'
    })
  },
  volunteer:function(){
    wx.navigateTo({
      url: '/pages/volunteer/index'
    })
  },
  huiyuan:function(){
    wx.navigateTo({
      url: '/pages/pay/member/index'
    })
  },
  myshare:function(){
    wx.navigateTo({
      url: '/pages/pay/InvitePrizes/index'
    })
  },
  usermsg:function(){
    wx.navigateTo({
      url: '/pages/address/update/index'
    })
  },
  fuwu:function(){
    wx.navigateTo({
      url: '/pages/service_centre/index'
    })
  }
})