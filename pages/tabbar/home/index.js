const app = getApp(),r=require('../../../utils/request.js'),u=app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    banner: [
      '/images/zhongyao.jpg',
      '/images/zhongyao.jpg',
      '/images/zhongyao.jpg',
    ],
    goodslist:['','','']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that =this
    r.req(u + '/api/Goods/goodsList', { list_row: 10, page: 1, is_hot:1},'post').then(res=>{
      console.log(res)
      that.setData({
        goodslist:res.data.list
      })
    })

    r.req(u + '/api/Goods/goodsBanner', {}, 'post').then(res => {
      console.log(res)
      that.setData({
        banner: res.data.banner
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.editTabbar();
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
  goodsdetail:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail?id='+id,
    })
  }
})