// pages/volunteermsg/index.js
const app = getApp(),
  u = app.globalData.url,
  r = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  names: function(e) {
    this.setData({
      names: e.detail.value
    })
  },
  tel: function(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  area: function(e) {
    this.setData({
      area: e.detail.value
    })
  },
  reason: function(e) {
    this.setData({
      reason: e.detail.value
    })
  },
  submit: function() {
    if (!this.data.names) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false;
    }
    if (!this.data.tel) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false;
    }

    if (!(/^1[3456789]\d{9}$/.test(this.data.tel))) { 
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return false;
    }

    if (!this.data.area) {
      wx.showToast({
        title: '请输入地址',
        icon: 'none'
      })
      return false;
    }
    if (!this.data.reason) {
      wx.showToast({
        title: '请输入原因',
        icon: 'none'
      })
      return false;
    }
    r.req(u + '/api/User/volunteerAudit', {
      name: this.data.names,
      telephone: this.data.tel,
      address: this.data.area,
      reason: this.data.reason,
      token: wx.getStorageSync('token')
    }, 'post').then(res => {
      console.log(res)
      if (res.status == 1) {
        wx.navigateTo({
          url: 'backmsg/index',
        })
      }
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})