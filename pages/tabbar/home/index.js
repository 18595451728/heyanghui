const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    banner: [
      '/images/zhongyao.jpg',
      '/images/zhongyao.jpg',
      '/images/zhongyao.jpg',
    ],
    goodslist:['','','']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.editTabbar();
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
  onPullDownRefresh() {

  },
  goodsdetail:function(e){
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail',
    })
  }
})