// pages/addcomment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores:['','','','',''],
    score:4,
    is_anonymous:false,
    imgs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  addimg:function(){
    var imgs = this.data.imgs,that=this
    if(imgs.length==3){
      wx.showToast({
        title: '最多上传三张图片',
        icon:'none'
      })
      return false;
    }
    wx.chooseImage({
      count:1,
      success: function(res) {
        console.log(res.tempFilePaths[0])
        imgs.push(res.tempFilePaths[0])
        that.setData({
          imgs:imgs
        })
      },
    })
  },
  dafen:function(e){
    this.setData({
      score:e.currentTarget.dataset.index+1
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
  evaluate:function(e){
    console.log(e.detail.value)
    this.setData({
      evaluate:e.detail.value
    })
  },
  checkanonymous(){
    this.setData({
      is_anonymous: !this.data.is_anonymous
    })
  },
  bto:function(){
    var d={
      score :this.data.score,
      evaluate: this.data.evaluate,
      is_anonymous: this.data.is_anonymous
    }
  }
})