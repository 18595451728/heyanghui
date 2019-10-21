// pages/evaluationlist/index.js
const app = getApp(), r = require('../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores:['','','','',''],
    type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.setData({
      id:id
    })
    this.init(0);
  },
  choosecomment:function(e){
    var type=e.currentTarget.dataset.type
    this.setData({
      type:type
    })
    this.init(type)
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
  init:function(e){
    var that =this
    r.req(u +'/api/Goods/goodsComment',{
      list_row:10,
      page:1,
      is_pic:0,
      goods_id:this.data.id,
      rate:e
    },'post').then(function(res){
      console.log(res)
      if(res.status==1){
        that.setData({
          data:res.data
        })
        e==0?that.setData({
          all: res.data.totalCount
        }) : e == 1 ? that.setData({
          goodcomment: res.data.totalCount
        }):''
      }
    })  
  }
})