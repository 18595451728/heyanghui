// pages/order/order.js
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
        name: "待收货",
        status: 2
      },
      {
        name: "待评价",
        status: 3
      },
      {
        name: "退款维权",
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
  orderdetail:function(){
    wx.navigateTo({
      url: '/pages/orderdetail/index',
    })
  },
  addevaluation:function(){
    wx.navigateTo({
      url: '/pages/addcomment/index',
    })
  },
  shouhou:function(){
    wx.navigateTo({
      url: '/pages/userserver/index',
    })
  }
})