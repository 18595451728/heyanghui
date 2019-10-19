// pages/couponChoose/index.js

var app=new getApp(); 
var r = require('../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_index:-1,
    tip:'请选择一张优惠券'  
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
    this.init();
    if(wx.getStorageSync('couponIndex')!='-1'){
        this.setData({
          is_index:parseInt(wx.getStorageSync('couponIndex')),
          tip:'确定'
        })
    }
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

    r.req(u + '/api/Order/cartOrder', { 
      token:wx.getStorageSync('token'),
      cart_type:1
    },'post').then(res=>{
      console.log(res)
      that.setData({
        list:res.data.coupon_list
      })
    })
  },
  choose(e){
    if(e.currentTarget.dataset.index==this.data.is_index){
      this.setData({
        is_index:-1,
        tip:'确定'
      })
    }else{
      this.setData({
        is_index:e.currentTarget.dataset.index,
        tip:'确定'
      })
    }

  },
  return(){
    console.log(this.data.is_index)
    if(this.data.is_index!=-1){
      wx.setStorageSync('couponIndex', this.data.is_index)
    }else{

      wx.setStorageSync('couponIndex','-1')
    }
    wx.navigateBack({
      delta: 1
    })
  }
})