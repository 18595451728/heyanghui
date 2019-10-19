// pages/pay/CashWithdrawalone/index.js
const app = getApp()
var r = require('../../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yongjin:'',
    jine:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
  allSubmit(){
    this.setData({
      jine:this.data.yongjin
    })
    this.submit();
  },
  submit:function(){
    let that=this;
    if(this.data.jine>this.data.yongjin){
      wx.showModal({
        title:'提示',
        content:'提现金额超过可提现最大额度',
        showCancel:false,
        success:function(res){
          if(res){

            that.setData({
              jine:''
            })
          }
        }
      })
    }else if(this.data.jine==''){
      wx.showModal({
        title:'提示',
        content:'提现金额不能为空',
        showCancel:false
      })
    }
    else{

      r.req(u + '/api/Withdraw/withdraw', { 
        token:wx.getStorageSync('token'),
        type:2,
        money:that.data.jine
      },'post').then(res=>{
        wx.navigateTo({
        url: '/pages/pay/CashWithdrawal/index',
      })
      }) 
    }

  },
  cashInput(e){

    this.setData({
      jine:e.detail.value
    })
  },
  init(){
    var that =this;
    r.req(u + '/api/User/userInfo', { 
      token:wx.getStorageSync('token'),
    },'post').then(res=>{
      that.setData({
        yongjin:res.data.user.distribut_money
      })
    }) 
  }
})