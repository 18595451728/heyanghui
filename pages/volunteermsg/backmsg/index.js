// pages/volunteermsg/backmsg/index.js
const app = getApp(),
  u = app.globalData.url,
  r = require('../../../utils/request.js')
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
    r.req(u + '/api/User/volunteerStatus', { token: wx.getStorageSync('token') }, 'post').then(res => {
      console.log(res.data.audit_status)
      var status = res.data.audit_status
      status == 0 ? that.setData({ status: '审核中' }) : status == 1 ? that.setData({ status: '已通过' }) : that.setData({ status: '已驳回' })
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
  gotohome: function () {
    wx.switchTab({
      url: '/pages/home/index',
    })
  }
})