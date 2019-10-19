// pages/shopDetail/shopDetail.js
const app = getApp(), r = require('../../utils/request.js'), u = app.globalData.url
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
    var that = this,id=options.id,share=options.share,sharetoken=options.token,token=wx.getStorageSync('token')
    if(share){
      
    }
    var d = { goods_id: id, token: wx.getStorageSync('token') }
    share ? token ? d = { goods_id: id, token: wx.getStorageSync('token'), c_token: sharetoken } : wx.setStorageSync('sharetoken', sharetoken):''
    console.log(options,id)
      that.setData({
        goodsid:id
      })
    r.req(u + '/api/Goods/goodsDetail', d, 'post').then(res => {
      console.log(res)
      var spec = res.data.filter_spec
      if(spec.length!=0){
        for(var i=0;i<spec.length;i++){
          spec[i].cid=0
        }
      }
      that.setData({
        commentStatistics: res.data.commentStatistics,
        list: res.data.list,
        sku_data: res.data.sku_data,
        spec: spec,
      })
      if(res.data.sku_data.length!=0){
        var arr = [];
        for(var i=0;i<spec.length;i++){
          arr.push(spec[i].list[spec[i].cid].item_id)
        }
        arr = arr.join('_')
        console.log(arr)
        that.setData({
          gg:res.data.sku_data[arr],
          thumbpic: res.data.sku_data[arr].sku_logo
        })
      }
    })

    r.req(u + '/api/Goods/goodsComment', { list_row: 1, page: 1, is_pic: 0, goods_id: id, rate:0},'post').then((res)=>{
      console.log(res)
      that.setData({
        comment:res.data.list
      })
    })
  },
  changeSlide:function(e){
    this.setData({
      current: e.detail.current + 1
    })
  },

  chooseguige:function(e){
    var index = e.currentTarget.dataset.index,idx= e.currentTarget.dataset.idx,spec=this.data.spec
    console.log(index,idx)
    spec[index].cid=idx
    this.setData({
      spec:spec
    })
    console.log(spec)
    var arr = []
    for(var i=0;i<spec.length;i++){
      console.log(spec[i].list[spec[i].cid].item_id)
      arr.push(spec[i].list[spec[i].cid].item_id)
    }
    arr= arr.join('_')
    this.setData({
      gg:this.data.sku_data[arr],
      thumbpic: this.data.sku_data[arr].sku_logo
    })
  },
  sort: function (arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          var hand = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = hand;
        }
      }
    }
    return arr;
  },
  addcart:function(e){
    var t = this, c = t.data.count, s = t.data.spec, g = t.data.goodsid,a=new Array(),type=e.currentTarget.dataset.type;
    for(var i in s){
      a.push(s[i].list[s[i].cid].item_id)
    }
    console.log(a)
    var arr = t.sort(a)
    r.req(u +'/api/Cart/addCart',{
      goods_id:g,
      goods_num:c,
      cart_type:type,
      token:wx.getStorageSync('token'),
      sku_id:arr.join('_')
    },'post').then((res)=>{
      console.log(res)
      if(res.status==1){
        t.setData({
          is_guige: !this.data.is_guige
        })
        if (type == 0) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        } else {
          wx.navigateTo({
            url: '/pages/confirm/confirm?cart_type=1',
          })
        }
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        return false;
      }
      
      
      
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
    if(this.shared){
      this.shared = !1
      wx.showToast({
        title: '分享成功',
        icon:'none'
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
    var t = this,l=t.data.list
    console.log(l)
    this.shared=!0;
    return {
      title: l.goods_name,
      path:'pages/shopDetail/shopDetail?id='+l.id+'&token='+wx.getStorageSync('token')+'&share=!0',
      imageUrl:l.goods_logo
    }
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
      url: '/pages/confirm/confirm?cart_type=1',
    })
  },
  shopcart:function(){
    wx.switchTab({
      url: '/pages/tabbar/shopcart/index',
    })
  }
})