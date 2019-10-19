// pages/order/order.js
const app = getApp()
var r = require('../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_nav: 0,
    control: 0,
    ordernav: [
      {
        name: "全部",
        status: 0
      },
      {
        name: "待付款",
        status: 1
      },
      {
        name: "待发货",
        status: 2
      },
      {
        name: "待收货",
        status: 3
      },
      {
        name: "待评价",
        status: 4
      },

    ],
    orderList: [],
    orderPriceList: []
  },

  // changeTab:function(e){
  //   var index = e.currentTarget.dataset.index
  //   this.setData({
  //     currentTab:index
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this
    console.log(options)
  
    if (options.status != null) {
      that.setData({
        current_nav: options.status
      })
    }
    if (parseInt(options.status) > 4) {
      this.next();
      this.data.ordernav2.forEach(function (item, index) {
        if (item.status == options.status) {
          that.setData({
            current_nav: index
          })

        }
      })

    }
  },


  // onLoad: function (options) {

  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      orderPriceList: []
    })
    var that = this;
    r.req(u + '/api/Order/orderLIst', {
      status: that.data.ordernav[that.data.current_nav].status, 
      list_row: 10,
      page: 1,token: wx.getStorageSync('token') }, 'post').then((res) => {
      console.log(res)
        wx.hideLoading();
        that.setData({
          orderList: res.data.list
        })
      console.log(res.data.list);

    })




   
  
    // myrequest.post(url, data, 'POST').then(function (data) {
    //   wx.hideLoading();
    //   console.log(data.data)
    //   that.setData({
    //     orderList: data.data.list
    //   })

    //   data.data.list.forEach(function (item, index) {
    //     let sum = 0;
    //     item.goods_list.forEach(function (item2, index) {
    //       sum = sum + item2.goods_price * item2.goods_num
    //     })
    //     that.data.orderPriceList.push(sum)
    //     that.setData({
    //       orderPriceList: that.data.orderPriceList
    //     })
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onReady();
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

  changeNav: function (e) {
    this.setData({
      current_nav: e.currentTarget.dataset.index
    })
    this.onReady();
  },
  // 查看物流
  see_wuliu: function (event) {
    wx.navigateTo({
      url: '/pages/wuliu/index?orderno=' + event.currentTarget.dataset.orderno
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
// 查看订单
  lookDetail: function (e) {
     wx.navigateTo({
        url: "/pages/orderdetail/index?orderno=" + e.currentTarget.dataset.orderno
      })
  },
  // 确认收货
  sureOrder: function (e) {
    var that = this
    r.req(u + '/api/Order/confirmOrder', {
      order_no: e.currentTarget.dataset.orderno,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      wx.hideLoading();
      that.onReady();
    })
  },
  // 去退款
  refund: function (e) {
    app.globalData.refundNo = e.currentTarget.dataset.ordergoodsid;
    wx.navigateTo({
      url: '/pages/userserver/index',
    })
  },

// 去付款
  payOrder: function (e) {
    // wx.navigateTo({
    //   url: '/pages/confirm/confirm?cart_type=1'
    // })
    var order = e.currentTarget.dataset.no
    r.req(u +'/api/pay/toPay',{
      token:wx.getStorageSync('token'),
      order_no:order
    },'post').then(function(res){
      console.log(res)
      r.req(u +'/api/Pay/wxPay',{
        order_no: order,
        token: wx.getStorageSync('token')
      },'post').then(re=>{
        console.log(re)
        wx.requestPayment({
          timeStamp: re.data.timeStamp.toString(),
          nonceStr: re.data.nonceStr,
          package: re.data.package,
          signType:re.data.signType,
          paySign: re.data.paySign,
          success:function(cc){
            console.log(cc)
          }
        })
      })
    })
  },

// 删除订单
  delOrder: function (e) {
    var that = this;
    r.req(u + '/api/Order/delOrder', {
      order_no: e.currentTarget.dataset.orderno,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      wx.hideLoading();
      wx.showModal({
        title: '删除成功',
        icon: 'success',
        duration: 1000
      })
      that.onReady();
    })
  },
// 添加评论
  addevaluation:function(e){

    if (e.currentTarget.dataset.type==2){
      wx.navigateTo({
        url: '/pages/addcomment/index?orderno=' + e.currentTarget.dataset.orderno + '&ordergoodid=' + e.currentTarget.dataset.ordergoodsid,
      })
    }else{
      wx.navigateTo({
        url: '/pages/pay/Comment/index?orderno=' + e.currentTarget.dataset.orderno + '&ordergoodid=' + e.currentTarget.dataset.ordergoodsid,
      })
    }

  
  },
 
})