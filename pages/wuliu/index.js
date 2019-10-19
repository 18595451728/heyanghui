// pages/wuliu/index.js
const app = getApp()
var r = require('../../utils/request.js'),
  u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    r.req(u + '/api/Order/orderExpress', {
      order_no: options.orderno,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
<<<<<<< HEAD
      that.setData({
       expressList: res.data,
       express_data: res.data.express_data,
        phone: res.data.express_tel
      })
      console.log(res.data)
=======
 console.log(res)
>>>>>>> ebb68081e5634e402f291c3acd95f5a964d82374
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
  // 确认收货
  sureOrder: function (e) {
    var that = this
    r.req(u + '/api/Order/confirmOrder', {
      order_no: e.orderno,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      wx.hideLoading();
      that.onReady();
    })
  },

  // tel: function () {
  //   wx.makePhoneCall({
  //     phoneNumber: app.globalData.phoneNumber,
  //   })
  // },
  tapTel: function () {
    console.log(123);
     wx.makePhoneCall({
       phoneNumber: this.data.phone 
        }) 
      },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})