// pages/mine/mine.js
const app = getApp(), r = require('../../utils/request.js'),
  l = require('../../utils/login.js'),u=app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haslogin:!1
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
  myorder:function(e){
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },
  mycoupon:function(){
    wx.navigateTo({
      url: '/pages/couponlist/index'
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