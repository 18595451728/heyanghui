// pages/fenxiao/index.js
var app=new getApp(); 
var r = require('../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    u:u,
    type: ["今日收益", "昨日收益", "全部收益"],
    selectindex: 0,
    list:[],
    moneyTotal:'',
    yongjin:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init();
    this.getYongjin();
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

  },
  gotixian: function () {
    wx.navigateTo({
      url: '/pages/pay/CashWithdrawalone/index',
    })
  },
  choose: function(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      selectindex: index
    })
  },
  init(){
    var that =this;
    var count=0;
    r.req(u + '/api/User/shareList', { 
      token:wx.getStorageSync('token'),
      list_row:10,
      page:1
    },'post').then(res=>{
      console.log(res)

      res.data.list.forEach(function(item,index){
        count=count+parseFloat(item.money)
      })
      that.setData({
        list:res.data.list,
        moneyTotal:count
      })
    })
  },
  getYongjin(){
    var that =this;
    r.req(u + '/api/User/userInfo', { 
      token:wx.getStorageSync('token'),
    },'post').then(res=>{
      console.log(res)

      that.setData({
        yongjin:res.data.user.distribut_money,
        shouyi: res.data.user.distribut_total
      })
    })  
  }
})