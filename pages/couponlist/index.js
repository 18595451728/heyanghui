// pages/coupon/index.js
var app=new getApp(); 
var r = require('../../utils/request.js'), u = app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 3,
    list: [],
  },
  tabFun(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
    this.init();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getList: function (id) {

     
  },
  onLoad: function (options) {
   this.init();
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
  init(){
    var that =this;

    r.req(u + '/api/User/couponList', { 
      token:wx.getStorageSync('token'),
      coupon_type:parseInt(that.data.tabIndex)
    },'post').then(res=>{
      console.log(res)
      that.setData({
        list:res.data.list
      })
    })
  }
})