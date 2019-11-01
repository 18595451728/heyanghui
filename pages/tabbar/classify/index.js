const app = getApp(), r = require('../../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    tab: [false, true, true, true,true],
    page: 1,
    sorts: 0,
    showpp: false,
    is_active:false,
    fenleiSrc:'/images/fenlei_change.jpg'
  },
  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true, true,true],
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that =this
    r.req(u + '/api/Goods/goodsList', { list_row: 10, page: 1, sorts:0}, 'post').then(res => {
      console.log(res)
      that.setData({
        goodslist: res.data.list
      })
    })
  },

getgoodlist:function(){
  var that=this
  r.req(u +'/api/Goods/goodsList',{
    list_row: 10,
    page: 1,
    sorts: this.data.sorts
  },'post').then(function(res){
    console.log(res)
    that.setData({
      goodslist: res.data.list
    })
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
    // app.editTabbar();
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
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail?id='+id
    })
  },
  change_fenlei(){
    this.setData({
      is_active:!this.data.is_active,
    })
    this.setData({
      fenleiSrc:this.data.is_active ? '/images/fenlei_change2.jpg' : '/images/fenlei_change.jpg'
    })
  }
})