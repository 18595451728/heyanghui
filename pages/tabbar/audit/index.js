const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.editTabbar();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  gotobuy:function(){
    wx.navigateTo({
      url: '/pages/confirm/confirm',
    })
  },
  goodsdetail: function (e) {
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail',
    })
  }
})