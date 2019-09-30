const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
  },
  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true, true],
      index = e.currentTarget.dataset.index;
    data[index] = false;
    this.setData({
      tab: data,
      page: 1,
    })
    if (index == 0) {
      this.setData({
        sorts: 0,
        showpp: false,
      })
      this.initgoods()
    }
    if (index == 1) {
      this.setData({
        showpp: !this.data.showpp,
        sorts: '0'
      })
    }
    if (index == 2) {
      this.setData({
        sorts: this.data.sorts == '3' ? '4' : '3',
        showpp: false,
      })
      this.initgoods()
    }
    if (index == 3) {
      this.setData({
        sorts: this.data.sorts == '5' ? '6' : '5',
        showpp: false,
      })
      this.initgoods()
    }
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
  onPullDownRefresh() {

  },
  goodsdetail: function (e) {
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail',
    })
  }
})