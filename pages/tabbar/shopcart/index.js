const app = getApp()
var myrequest = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: !1,
    cartlist: [{
      check: !0,
      num: 5,
      price: '57.30'
    }, {
      check: !0,
      num: 2,
      price: '57.30'
    }, {
      check: !1,
      num: 3,
      price: '57.30'
    }],
    chooseall: !1,
    allprice: '0.00',
    allnum: 0,
    tabbar: {},
  },
  chooseall: function() {
    var cartlist = this.data.cartlist,
      chooseall = !this.data.chooseall
    this.setData({
      chooseall: chooseall
    })
    if (chooseall) {
      for (var i = 0; i < cartlist.length; i++) {
        cartlist[i].check = !0
      }
    } else {
      for (var i = 0; i < cartlist.length; i++) {
        cartlist[i].check = !1
      }
    }
    this.setData({
      cartlist: cartlist
    })
    this.getAllPrice();
  },
  choose: function(e) {
    var index = e.currentTarget.dataset.index,
      cartlist = this.data.cartlist
    cartlist[index].check = !cartlist[index].check
    this.setData({
      cartlist: cartlist
    })
    this.getAllPrice();
    for (var i = 0; i < cartlist.length; i++) {
      if (!cartlist[i].check) {
        this.setData({
          chooseall: !1
        })
        return false;
      }
    }
    this.setData({
      chooseall: !0
    })

  },
  reduce: function(e) {
    var index = e.currentTarget.dataset.index,
      cartlist = this.data.cartlist
    if (cartlist[index].num == 1) return false;
    cartlist[index].num--;
    this.setData({
      cartlist: cartlist
    })
    this.getAllPrice();
  },
  add: function(e) {
    var index = e.currentTarget.dataset.index,
      cartlist = this.data.cartlist
    cartlist[index].num++;
    this.setData({
      cartlist: cartlist
    })
    this.getAllPrice();
  },

  jiesuan: function() {
    if (this.data.edit) {
      var cartlist = this.data.cartlist
      if (this.data.edit) {
        for (var i = 0; i < cartlist.length; i++) {
          if (cartlist[i].check) {
            console.log(i)
            cartlist.splice(i, 1)
            i--;
            // delete cartlist[i]
          }
        }
        this.setData({
          cartlist: cartlist
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/confirm/confirm'
      })
    }
  },

  getAllPrice: function() {
    var cartlist = this.data.cartlist,
      allprice = 0,
      allnum = 0
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].check) {
        allprice += cartlist[i].num * cartlist[i].price
        allnum += cartlist[i].num
      }
    }
    this.setData({
      allprice: allprice.toFixed(2),
      allnum: allnum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAllPrice();
  },
  edit: function() {
    this.setData({
      edit: !this.data.edit
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.editTabbar();
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
        list: app.globalData.tabBar
      })
    }
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

})