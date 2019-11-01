// pages/tabbar/fenlei/index.js
const app = getApp(), r = require('../../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class:[
 
    ],
    is_index:0,
    is_id:'',
    goodslist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    this.init();

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
  init(){
    let that=this;
    wx.request({
      url: app.globalData.url+'/api/Goods/goodsCate',
      data: {
        token:wx.getStorageSync('token')
      },
      method: 'post', 
      success: function(res){
        console.log(res)
        that.setData({
          class:res.data.data.goodsCate,
          is_id:res.data.data.goodsCate[0].id
        })
        that.initList();
      },

    })
  },
  initList(){
    let that=this;
    r.req(u + '/api/Goods/goodsList', { list_row: 10, page: 1, sorts:0,cate_id:that.data.is_id}, 'post').then(res => {
      console.log(res)
      that.setData({
        goodslist: res.data.list
      })
    })
  },
  changeIndex(e){
    this.setData({
      is_index:e.currentTarget.dataset.index,
      is_id:e.currentTarget.dataset.id
    })
    this.initList();
  },
  goClass(){
    wx.navigateTo({
      url: '/pages/tabbar/classify/index',
    })
  }
})