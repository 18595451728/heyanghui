// pages/confirm/confirm.js
const app = getApp()
var r = require('../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasaddress: !0,
    currenCoupon:'',
    jine:'',
    user:'',
    isChoose:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var that = this, cart_type = options.cart_type
    r.req(u + '/api/Order/cartOrder', { cart_type: cart_type, token: wx.getStorageSync('token') }, 'post').then((res) => {
      console.log(res)
      var allprice = 0
      for (var i in res.data.cartList) {
        res.data.cartList[i].goods_fee = res.data.cartList[i].goods_fee.toFixed(2)
        allprice += parseFloat(res.data.cartList[i].goods_fee)
      }
      that.setData({
        address: res.data.address,
        cartList: res.data.cartList,
        allprice: allprice.toFixed(2),
        total_num: res.data.total_num,
        cart_type: cart_type,
        coupon_list: res.data.coupon_list,
        integral_exchange: res.data.integral_exchange,
        integral_one_buy:res.data.integral_one_buy,
        realpay:allprice.toFixed(2),
        jine:allprice.toFixed(2)
      })
      

    

    })

    this.getinfo();
  },
  remark: function (e) {
    console.log(e.detail.value)
    this.setData({
      remark: e.detail.value
    })
  },
  sendOrder: function () {
    var t = this
    console.log(t.data.currenCoupon.cou_id)
    if(!this.data.address){
      wx.showToast({
        title: '请先选择收货地址',
        icon:'none'
      })
      return false;
    }
    r.req(u + '/api/Order/addOrder', { cart_type: this.data.cart_type, 
      address_id: this.data.address.id, 
      token: wx.getStorageSync('token'), 
      source: 0, 
      remark: this.data.remark,
      pay_integral:t.data.isChoose==true ? parseInt(t.data.integral_one_buy) : 0,
      coupon_id:t.data.currenCoupon.cou_id

    }, 'post').then((res) => {
      console.log(res)
      var order_no = res.data.order_no
      r.req(u + '/api/pay/toPay', { order_no: order_no,token:wx.getStorageSync('token')},'post').then((rs)=>{
        console.log(rs)
        if(rs.msg=='订单号不存在'){
          wx.showToast({
            title: '订单已提交，请前往订单页面支付',
            icon:'none'
          })
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/order/order',
            })
            return false;
          },1500)
        }
        r.req(u + '/api/Pay/wxPay', { order_no:rs.data.order_no,token:wx.getStorageSync('token')},'post').then((r)=>{
          console.log(r)
          if(r.status==1){
            wx.requestPayment({
              timeStamp: r.data.timeStamp.toString(),
              nonceStr: r.data.nonceStr,
              package: r.data.package,
              signType: r.data.signType,
              paySign: r.data.paySign,
              success:function(cc){
                console.log(cc)
              }
            })
          }
        })
      })
      t.setData({
        order_no: order_no
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


    var address = wx.getStorageSync('address')

    if(address){

      this.setData({
        address:address
      })
      wx.setStorageSync('address', '')
    }


    if(wx.getStorageSync('couponIndex')!='-1'){
      this.getCoupon();
 
    }else{
      console.log("空的")
      this.setData({
        currenCoupon:'',
        realpay:this.data.jine
      })
    }
      


 
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
    wx.setStorageSync('couponIndex','-1')
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
  getinfo:function(){
    var t = wx.getStorageSync('token'),that=this
    r.req(u + '/api/User/userInfo', {
      token: t
    }, 'post').then(res => {
      that.setData({
        user:res.data.user
      })
    })
  },
  address: function () {
    wx.setStorageSync('chooseaddress', !0)
    wx.navigateTo({
      url: '/pages/address/index',
    })
  },
  chooseCoupon(){
    if(this.data.coupon_list.length!=0){
      wx.navigateTo({
        url: '/pages/couponChoose/index',
      })
    }

  },
  getCoupon(){
    let that=this;
    r.req(u + '/api/Order/cartOrder', { 
      token:wx.getStorageSync('token'),
      cart_type:1
    },'post').then(res=>{
        that.setData({
         currenCoupon:res.data.coupon_list[parseInt(wx.getStorageSync('couponIndex'))]
        })
        that.getPrice();   
    })
  },
  getPrice(){
    let that=this;
    console.log(that.data.isChoose)
    r.req(u + '/api/Order/orderBuy', { 
      token:wx.getStorageSync('token'),
      pay_integral:that.data.isChoose==true ? parseInt(that.data.integral_one_buy) : 0,
      coupon_id:that.data.currenCoupon.cou_id,
      address_id:that.data.address.id,
      cart_type:1
    },'post').then(res=>{
      console.log(res)
      that.setData({
        realpay:res.data.order_amount
      })
    })
  },
  changeChoose(e){
    console.log(e.detail.value)
      this.setData({
        isChoose:e.detail.value
      })
      this.getPrice();
  }

})