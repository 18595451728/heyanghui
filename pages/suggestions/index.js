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
    list:[],
    currentPage:1,
    total:-1,
    tip:'没有更多了'
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
    this.setData({
      currentPage:this.data.currentPage<this.data.total ? this.data.currentPage+1 : 1,
      tip:(this.data.currentPage)==this.data.total ? '没有更多了' : '下拉查看更多',
    })

    if(this.data.currentPage<this.data.total){
      this.init();
    }
   
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
      page:that.data.currentPage
    },'post').then(res=>{
        that.setData({
          list:that.data.list.length==0 ? res.data.list : that.data.list.concat(res.data.list),
          tip:res.data.pageCount==1 ? '没有更多了' : '下拉查看更多',
          total:res.data.pageCount
        })
       
    })
  }
})