const app = getApp()
var r=require('../../../utils/request.js'),u=app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: !1,
    cartlist: [],
    chooseall: !1,
    allprice: '0.00',
    allnum: 0,
    tabbar: {},
  },
  chooseall: function() {
    var cartlist = this.data.cartlist,
      chooseall = !this.data.chooseall,arr=[]
    this.setData({
      chooseall: chooseall
    })
    if (chooseall) {
      for (var i = 0; i < cartlist.length; i++) {
        cartlist[i].selected = !0
        arr.push(cartlist[i].id)
      }
    } else {
      for (var i = 0; i < cartlist.length; i++) {
        cartlist[i].selected = !1
        arr.push(cartlist[i].id)
      }
    }

    r.req(u + '/api/Cart/selected', { cart_id: arr, token: wx.getStorageSync('token'), selected: chooseall ? 1 : 0, type: 1 }, 'post').then((res) => {
      console.log(res)
      
      this.setData({
        cartlist: cartlist
      })
      console.log(cartlist)
      this.getAllPrice();
    })


    
  },
  choose: function(e) {
    var index = e.currentTarget.dataset.index,
      cartlist = this.data.cartlist
    cartlist[index].selected = !cartlist[index].selected
    r.req(u + '/api/Cart/selected', { cart_id: [cartlist[index].id], token: wx.getStorageSync('token'), selected: cartlist[index].selected?1:0, type:0},'post').then((res)=>{
      console.log(res)
      this.setData({
        cartlist: cartlist
      })
      this.getAllPrice();
      for (var i = 0; i < cartlist.length; i++) {
        if (!cartlist[i].selected) {
          this.setData({
            chooseall: !1
          })
          return false;
        }
      }
      this.setData({
        chooseall: !0
      })
    })
  },
  reduce: function(e) {
    var index = e.currentTarget.dataset.index,
      cartlist = this.data.cartlist,that=this
    if (cartlist[index].goods_num == 1) return false;
    cartlist[index].goods_num--;
    r.req(u + '/api/Cart/editCart', { cart_id: cartlist[index].id, goods_num: cartlist[index].goods_num, token:wx.getStorageSync('token')},'post').then((res)=>{
      console.log(res)
      that.setData({
        cartlist: cartlist
      })
      that.getAllPrice();
    })
    
  },
  add: function(e) {
    var index = e.currentTarget.dataset.index,
      cartlist = this.data.cartlist, that = this
    cartlist[index].goods_num++;
    r.req(u + '/api/Cart/editCart', { cart_id: cartlist[index].id, goods_num: cartlist[index].goods_num, token: wx.getStorageSync('token') }, 'post').then((res) => {
      console.log(res)
      that.setData({
        cartlist: cartlist
      })
      that.getAllPrice();
    })
  },
  delete:function(e){
    var index = e.currentTarget.dataset.index, cartlist = this.data.cartlist, id = cartlist[index].id,that=this


    r.req(u + '/api/Cart/delCart', { cart_id: [id],token:wx.getStorageSync('token')},'post').then((res)=>{
      console.log(res)
      cartlist.splice(index, 1)
      that.setData({
        cartlist: cartlist
      })
      that.getAllPrice();
    })
  },
  jiesuan: function() {
    var that =this
    if (this.data.edit) {
      var cartlist = this.data.cartlist,arr=[]
      if (this.data.edit) {
        for (var i = 0; i < cartlist.length; i++) {
          if (cartlist[i].selected) {
            arr.push(cartlist[i].id)
            console.log(cartlist[i])
            cartlist.splice(i, 1)
            i--;
            // delete cartlist[i]
          }
        }

        r.req(u + '/api/Cart/delCart', { cart_id:arr,token:wx.getStorageSync('token')},'post').then((res)=>{
          console.log(res)
          that.setData({
            cartlist: cartlist,
            edit:!1
          })
          that.getAllPrice();
        })
        
      }
    } else {
      var cartlist = this.data.cartlist
      if(cartlist.length !=0){
        wx.navigateTo({
          url: '/pages/confirm/confirm?cart_type=0'
        })
      }
     
    }
  },

  getAllPrice: function() {
    var cartlist = this.data.cartlist,
      allprice = 0,
      allnum = 0
    for (var i = 0; i < cartlist.length; i++) {
      if (cartlist[i].selected) {
        allprice += cartlist[i].goods_num * cartlist[i].goods_price
        allnum += cartlist[i].goods_num
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

    var that = this
    this.setData({
      chooseall:!1
    })
    r.req(u + '/api/Cart/cartList', { token: wx.getStorageSync('token') }, 'post').then((res) => {
      console.log(res)
      that.setData({
        cartlist: res.data.cartList
      })
      this.chooseall();
    })


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