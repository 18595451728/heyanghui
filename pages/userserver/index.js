// pages/userserver/index.js
const app = getApp()
var r = require('../../utils/request.js'), u = app.globalData.url
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
    var that = this
    this.setData({
      order_no: options.orderno,
      order_goods_id: options.ordergoodid,
    })
    r.req(u + '/api/Order/refundGoods', {
      order_goods_id: options.ordergoodid,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      wx.hideLoading();
      that.setData({
        refundGoods: res.data,
      })
      console.log(res.data)
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
  goserver:function(e){
    var that = this
    console.log(e.currentTarget.dataset.type)
    wx.navigateTo({
      url: 'server/index?ordergoodid=' + that.data.order_goods_id + '&fundtype=' + e.currentTarget.dataset.type,
    })
  }
})