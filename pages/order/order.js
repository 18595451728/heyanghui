// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:['全部','待付款','待收货','待评价','退款维权'],
    currentTab:0,
    orderlist:[{
      status:0
    },
      {
        status: 1
      },
      {
        status: 2
      }, {
        status: 3
      }]
  },
  changeTab:function(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      currentTab:index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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