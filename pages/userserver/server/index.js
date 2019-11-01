// pages/userserver/server/index.js
const app = getApp()
var r = require('../../../utils/request.js'), u = app.globalData.url
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkReason: "请选择",
    checkServer: "请选择",
    checkReceive: "请选择",
    isReceive: false,
    imagelist:[],
    imageshowlist:[],
    images: ["", '', '', '', ''],
    showmodal: false,
   
    showwuliu: false,
    showreason: false,
    imageshowlist: [],
    options1: [
      {
        value: "多拍/拍错/不想要",
        index: 0
      },
      {
        value: "快递一直没送达",
        index: 1
      },
      {
        value: "未按约定时间发货",
        index: 2
      },
      {
        value: "快递无追踪记录",
        index: 3
      },
      {
        value: "空包裹/少货",
        index: 4
      },
      {
        value: "其他",
        index: 5
      },
    ],


    options3: [
      {
        value: "未收到",
        index: 0
      },
      {
        value: "已收到",
        index: 1
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      refund_type: options.fundtype,
      order_goods_id: options.ordergoodid,
    })
    // console.log(options.fundtype)
    r.req(u + '/api/Order/refundGoods', {
      // order_goods_id: app.globalData.order_goods_id,
      order_goods_id: options.ordergoodid,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      wx.hideLoading();
      that.setData({
        refundGoods: res.data,
      })
      console.log(res.data)
    })
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
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showmodal: false,
      showwuliu: false,
      showreason: false,
    });
  },
  showreason: function() {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(1000).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      showreason: true,
      showmodal: true,
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动 滑动时间
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        clearcart: false
      })
    }, 10)
  },
  receive: function(e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(1000).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      showwuliu: true,
      showmodal: true,
      // isReceive: !this.data.isReceive
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动 滑动时间
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        clearcart: false
      })
    }, 10)
  },

  // receive: function () {
  //   this.setData({
  //     isReceive: !this.data.isReceive
  //   })
  // },


  tklyChoose: function (e) {
    this.setData({
      showreason: true,
      checkReason: this.data.options1[e.currentTarget.dataset.index].value
    })
  },

  receiveChoose: function (e) {
    this.setData({
      checkReceive: this.data.options3[e.currentTarget.dataset.index].value,
      receiveIndex: e.currentTarget.dataset.index,
      isReceive: !this.data.isReceive
    })
    console.log(this.data.isReceive)
  },

  tksm: function (e) {
    this.setData({
      number: e.detail.value
    })
  },
  tkprice: function (e) {
    this.setData({
      price: e.detail.value
    })
  },
  cc: function () {
    console.log("失去焦点")
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
            that.data.imageshowlist.push('http://www.heyanghui.com' + res.data.pic)
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
    r.req(u + '/api/Order/applyAfterSales', {
      refund_type: this.data.refund_type,
      refund_hw_status: this.data.receiveIndex,
      refund_tkyy: this.data.checkReason,
      price: this.data.price,
      refund_tksm: this.data.number,
      order_goods_id: this.data.order_goods_id,
      token: wx.getStorageSync('token')
    }, 'post').then((res) => {
      wx.hideLoading();
      if (res.status == 1) {
        wx.showToast({
          title: '退款成功',
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

  },


 

})