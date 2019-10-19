// pages/suggestions/index.js
const app = getApp()
var r = require('../../utils/request.js'), u = app.globalData.url
Page({
  goFeedback: function(event) {
    wx.navigateTo({
      url: '/pages/sugges_conter/index',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.init();
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

  },
  init(){
    let that=this;
    r.req(u + '/api/User/suggestList', { 
      token:wx.getStorageSync('token'),
      list_row:10,
      page:1
    },'post').then(res=>{
    that.setData({
      list:res.data.list
    })

    })
  }
})