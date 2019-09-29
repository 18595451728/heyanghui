// pages/shopDetail/shopDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_peisong:false,
    is_guige:false,
    count:1,
    current:1,
    banner: ['/images/goodsimg.png', '/images/goodsimg.png', '/images/goodsimg.png', '/images/goodsimg.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeSlide:function(e){
    console.log(e.detail.current+1)
    this.setData({
      current: e.detail.current + 1
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

  },
  jia(){
    let c=this.data.count+1
    this.setData({
      count:c
    })
  },
  jian(){
    let c=this.data.count-1
    if(c>=0)
    this.setData({
      count:c
    })
  },
  peisong(){
    this.setData({
      is_peisong:this.data.is_peisong==true ? false : true
    })
  },
  guige(){
    this.setData({
      is_guige:this.data.is_guige==true ? false : true
    })
  },
  close(){
    this.setData({
      is_guige:this.data.is_guige==true ? false : true
    })
  },
  evaluationlist: function () {
    wx.navigateTo({
      url: '/pages/evaluationlist/index',
    })
  },
  gotobuy:function(){
    wx.navigateTo({
      url: '/pages/confirm/confirm',
    })
  },
  shopcart:function(){
    wx.switchTab({
      url: '/pages/tabbar/shopcart/index',
    })
  }
})