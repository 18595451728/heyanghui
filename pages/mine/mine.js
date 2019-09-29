// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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