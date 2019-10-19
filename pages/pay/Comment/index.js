// pages/pay/Comment/index.js
const app = getApp()
var r = require('../../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentOrder: {},
    isCheck: false,
    imagelist: [],
    imageshowlist: [],
    imgbase: "",
    starSrc: "../../../images/score.png",
    isFlag: 0,
    isFlag2: 0,
    isFlag3: 0,
    isFlag4: 0,
    isFlag5: 0,
    commentLength: 0,
    isNiming: 0,
    commentContent: '',
    scores: ['', '', '', '', ''],
    score: 4,
    is_anonymous: false,
    imgs: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    this.setData({
      order_no: options.orderno,
      order_goods_id: options.ordergoodid,
    })
    console.log(options)
    wx.showLoading({
      title: '加载中',
    })

    r.req(u + '/api/Order/commentGoods', {
      order_no: options.orderno,
      order_goods_id: options.ordergoodid,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      wx.hideLoading();
      that.setData({
        commentOrder: res.data,
      })
      console.log(res.data)
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
  changeStar: function (e) {
    this.setData({
      isFlag: e.currentTarget.dataset.index
    })
  },
  changeStar2: function (e) {
    this.setData({
      isFlag2: e.currentTarget.dataset.index
    })
  },
  changeStar3: function (e) {
    this.setData({
      isFlag3: e.currentTarget.dataset.index
    })
  },
  changeStar4: function (e) {
    this.setData({
      isFlag4: e.currentTarget.dataset.index
    })
  },
  changeStar5: function (e) {
    this.setData({
      isFlag5: e.currentTarget.dataset.index
    })
  },

  textareaInput: function (e) {
    this.setData({
      commentLength: e.detail.value.length,
      commentContent: e.detail.value
    })
  },
  changeIscheck: function () {
    if (this.data.isNiming == 0) {
      this.setData({
        isNiming: 1
      })
    } else {
      this.setData({
        isNiming: 0
      })
    }
    this.setData({
      isCheck: !this.data.isCheck
    })
  },


  addPhoto: function () {
    let that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          imgbase: wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64")
        })
        var url = u + '/api/Index/uploadImg'
        var data = {
          img_str: 'data:image/png;base64,' + that.data.imgbase + '',
          path: 'comment'
        }
        r.req(url, data, 'POST').then(function (res) {
          if (that.data.imagelist.length < 3) {
            that.data.imagelist.push(
              res.data.pic
            )

            that.data.imageshowlist.push(u + res.data.pic)
            that.setData({
              imagelist: that.data.imagelist,
              imageshowlist: that.data.imageshowlist
            })
          }
        })
      }
    })
  },
  submit: function (e) {
    var that = this;
    r.req(u + '/api/Order/commentOrder', {
      order_goods_id: that.data.order_goods_id,
      order_no: that.data.order_no,
      desc_star: parseInt(this.data.isFlag5) + 1,    //描述
      content: this.data.commentContent,
      slide_img: this.data.imagelist,
      is_name: this.data.isNiming,
      quality_star: parseInt(this.data.isFlag) + 1,    //效果
      service_star: parseInt(this.data.isFlag3) + 1,    //外观
      safe_star: parseInt(this.data.isFlag2) + 1,      //安全

      use_star: parseInt(this.data.isFlag4) + 1,      //使用
   
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      console.log(res)
      if (res.status == 1) {
        wx.showToast({
          title: '评价成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '../orderer/order',
          })
        }, 1000)
      }
    })
  }
})

