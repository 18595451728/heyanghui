const app = getApp()
var r = require('../../utils/request.js'), u = app.globalData.url
Page({
  data: {
    delBtnWidth: 120, //删除按钮宽度单位（rpx） 
    // 列表数据
    list: [],
    is_default:'',

  },

  onLoad: function(options) {
    this.initEleWidth();
    var that = this;
    r.req(u + '/api/User/addressList', { token: wx.getStorageSync('token') }, 'post').then((res) => {
      console.log(res)
      that.setData({
        list: res.data.list,
      });
      console.log(res.data.list);
    })
 
  
  },
  chooseaddress:function(e){
    var c = wx.getStorageSync('chooseaddress')
    if(c){
      var index=e.currentTarget.dataset.index,list=this.data.list
      console.log(list[index])
      wx.setStorageSync('chooseaddress', !1)
      wx.setStorageSync('address', list[index])
      wx.navigateBack({
        
      })
      
    }
  },
  // 开始滑动事件
  touchS: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置 
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function(e) {
    var that = this;
    // initdata(that)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置 
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值 
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      // var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变 
        // txtStyle = "left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离 
        // txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度 
          // txtStyle = "left:-" + delBtnWidth + "px";
        }
      }

    }
  },
  // 滑动中事件
  touchE: function(e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置 
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离 
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮 
      var txtStyle = "";
      txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项 
      var index = e.currentTarget.dataset.index;
      var list = this.data.list;
      list[index].shows = txtStyle;
      console.log("1", list[index].shows);
      //更新列表的状态 
      this.setData({
        list: list
      });
    } else {
      console.log("2");
    }
  },
  //获取元素自适应后的实际宽度 
  getEleWidth: function(w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      // console.log(scale); 
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error 
    }
  },
  initEleWidth: function() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },

  // 删除地址
  delAddress: function (e) {

    var that = this;
    console.log(e)
    var address_id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      
      success: function (res) {
        if (res.confirm) {
          r.req(u + '/api/User/addressDel', { address_id: address_id, token: wx.getStorageSync('token') }, 'post').then((res) => {
            that.onLoad();
           })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  editAddress: function (e) {
    var id = e.currentTarget.dataset.id
   
    wx.navigateTo({
      url: '/pages/addaddress/addaddress?id='+id
    })
  },
  // // 编辑地址
  // editAddress: function (e) {
  //   wx.navigateTo({
  //     url: "/pages/addaddress/addaddress?id=" + e.currentTarget.dataset.id
  //   })
  // },

  create:function(){
    wx.navigateTo({
      url: '/pages/addaddress/addaddress',
    })
  },
  onShow:function(){
    var that = this;
    r.req(u + '/api/User/addressList', { token: wx.getStorageSync('token') }, 'post').then((res) => {
      console.log(res)
      that.setData({
        list: res.data.list,
      });
      console.log(res.data.list);
    })
  },
  inputName(e){
    this.setData({

    })
  },

})