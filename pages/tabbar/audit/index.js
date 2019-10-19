const app = getApp(), u = app.globalData.url, r = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    tab: [false, true, true, true, true],
    page: 1,
    sorts: 0,
    showpp: false
  },
  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true, true, true],
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

    }
    if (index == 1) {
      this.setData({
        sorts: this.data.sorts == '1' ? '2' : '1',
        showpp: false,
      })
    }
    if (index == 2) {
      this.setData({
        sorts: this.data.sorts == '3' ? '4' : '3',
        showpp: false,
      })

    }
    // if (index == 3) {
    //   this.setData({
    //     sorts: this.data.sorts == '5' ? '6' : '5',
    //     showpp: false,
    //   })

    // }
    if (index == 3) {
      this.setData({
        sorts: this.data.sorts == '5' ? '6' : '5',
        showpp: false,
      })

    }

    this.getgoodlist();
  },
  getgoodlist: function () {
    var that = this
    r.req(u + '/api/Goods/goodsList', {
      list_row: 10,
      page: 1,
      sorts: this.data.sorts
    }, 'post').then(function (res) {
      console.log(res)
      that.setData({
        goodslist: res.data.list
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    r.req(u + '/api/Goods/goodsList', {
      list_row: 10,
      page: 1,
      is_auidt: 1
    }, 'post').then(res => {
      console.log(res)
      that.setData({
        goodslist: res.data.list
      })
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
    app.editTabbar();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gotobuy: function () {
    wx.navigateTo({
      url: '/pages/confirm/confirm',
    })
  },
  goodsdetail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/details/details?id=' + id,
    })
  }
})