// pages/orderdetail/index.js
const app = getApp()
var r = require('../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {

    },
    order: {

    },
    goodsList: [],
    allshopPrice: "",
    couponLength: null
  },
  // 查看物流
  goLogistics: function (event) {
    wx.navigateTo({
      url: '/pages/wuliu/index?orderno=' + event.currentTarget.dataset.orderno
    })
  }, 
  // 收货地址
  // goAddress: function (event) {
  //   wx.navigateTo({
  //     url: '/pages/address/index',
  //   })
  // }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    let sum = 0;
    r.req(u + '/api/Order/orderDetail', {
       order_no: options.orderno,
       token: wx.getStorageSync('token')
    }, 'post').then((res) => {
        console.log(res)
        that.setData({
          orderDetail: res.data.address_info,
          order: res.data.order,
          goodsList: res.data.goods_list.list
        })
      console.log(res.data.goods_list.list)
        res.data.goods_list.list.forEach(function (item, index) {
          sum += item.goods_allprice
        })
        that.setData({
          allshopPrice: sum
        })
  
      
            })
    },
  // 取消订单
  cancelOrder: function (e) {
    var that = this
    r.req(u + '/api/Order/cancelOrder', {
      order_no: e.currentTarget.dataset.orderno,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      wx.hideLoading();
      wx.showModal({
        title: '取消成功',
        icon: 'success',
        duration: 1000
      })
      that.onReady();
      console.log(data)
    })

  },

  // 添加评论
  addevaluation: function () {
    app.globalData.commentNo = e.currentTarget.dataset.orderno,
      app.globalData.commentGoodsid = e.currentTarget.dataset.ordergoodsid,
      wx.navigateTo({
        url: '/pages/addcomment/index',
      })
  },
  // 去付款
  payOrder: function (e) {
    var order = e.currentTarget.dataset.no
    r.req(u + '/api/pay/toPay', {
      token: wx.getStorageSync('token'),
      order_no: e.currentTarget.dataset.orderno
    }, 'post').then(function (res) {
      console.log(res)
      r.req(u + '/api/Pay/wxPay', {
        order_no: e.currentTarget.dataset.orderno,
        token: wx.getStorageSync('token')
      }, 'post').then(re => {
        console.log(re)
        wx.requestPayment({
          timeStamp: re.data.timeStamp.toString(),
          nonceStr: re.data.nonceStr,
          package: re.data.package,
          signType: re.data.signType,
          paySign: re.data.paySign,
          success: function (cc) {
            console.log(cc)
          }
        })
      })
    })
    // wx.navigateTo({
    //   url: '/pages/confirm/confirm?orderid=' + e.currentTarget.dataset.orderno,
    // })


  },

  // 确认收货
  sureOrder: function (e) {
    var that = this
    r.req(u + '/api/Order/confirmOrder', {
      order_no: e.currentTarget.dataset.orderno,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      wx.hideLoading();
      wx.showToast({
        title: '确认成功',
        icon: 'success',
        duration: 1000
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/tabbar/shopcart/index',
        })
      }, 1000)

    })
  },

  // 去退款
  refund: function (e) {
    app.globalData.refundNo = e.currentTarget.dataset.ordergoodsid;
    wx.navigateTo({
      url: '/pages/userserver/index',
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

  }
})