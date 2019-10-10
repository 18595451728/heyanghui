// pages/confirm/confirm.js
const app = getApp()
var r = require('../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasaddress: !0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this, cart_type = options.cart_type
    r.req(u + '/api/Order/cartOrder', { cart_type: cart_type, token: wx.getStorageSync('token') }, 'post').then((res) => {
      console.log(res)
      var allprice = 0
      for (var i in res.data.cartList) {
        res.data.cartList[i].goods_fee = res.data.cartList[i].goods_fee.toFixed(2)
        allprice += parseFloat(res.data.cartList[i].goods_fee)
      }
      that.setData({
        address: res.data.address,
        cartList: res.data.cartList,
        allprice: allprice.toFixed(2),
        total_num: res.data.total_num,
        cart_type: cart_type
      })
    })
  },
  remark: function (e) {
    console.log(e.detail.value)
    this.setData({
      remark: e.detail.value
    })
  },
  sendOrder: function () {
    var t = this
    r.req(u + '/api/Order/addOrder', { cart_type: this.data.cart_type, address_id: this.data.address.id, token: wx.getStorageSync('token'), source: 0, remark: this.data.remark }, 'post').then((res) => {
      console.log(res)
      var order_no = res.data.order_no
      r.req(u + '/api/pay/toPay', { order_no: order_no,token:wx.getStorageSync('token')},'post').then((rs)=>{
        console.log(rs)
        r.req(u + '/api/Pay/wxPay', { order_no:rs.data.order_no,token:wx.getStorageSync('token')},'post').then((r)=>{
          console.log(r)
        })
      })
      t.setData({
        order_no: order_no
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
  address: function () {
    wx.navigateTo({
      url: '/pages/address/index',
    })
  }
})