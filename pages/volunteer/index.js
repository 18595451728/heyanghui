// pages/volunteer/index.js
const app = getApp()
var r = require('../../utils/request.js'), u = app.globalData.url, WxParse = require('../../wxParse/wxParse.js')
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
    r.req(u + '/api/Index/volunteerInfo', { token: wx.getStorageSync('token') }, 'post').then(res => {
      console.log(res)
      that.setData({
        contentbox: res.data.content
      })
      WxParse.wxParse('article', 'html', res.data.content, that, 0);

      console.log(res.data.content)
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
  agree: function () {
    r.req(u + '/api/User/volunteerStatus', { token: wx.getStorageSync('token') }, 'post').then(res => {
      var status = res.data.audit_status
      console.log(res)
      status == -1 ? wx.navigateTo({
        url: '/pages/volunteermsg/index'
      }) : wx.navigateTo({
        url: '/pages/volunteermsg/backmsg/index'
      })
    })

  }
})