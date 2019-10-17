// pages/addUrl/addUrl.js
// var commonCityData = require('../../utils/city.js')
var model = require('../model/model.js')
var show = false;
var item = {};
const app = getApp()
var r = require('../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      show: show
    },
    province: [],
    city: [],
    district: [],
    province_id: 0,
    city_id: 0,
    district_id: 0,
    addressData: [],
    is_default: '',
    address_id: null
  },

  //生命周期函数--监听页面初次渲染完成
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    console.log("id = " + e.target.dataset.id)
    model.animationEvents(this, 200, false, 400);
    //点击确定按钮更新数据(id=444是背后透明蒙版 id=555是取消按钮)
    if (e.target.dataset.id == 666) {
      this.updateShowData()
    }
  },
  //更新顶部展示的数据
  updateShowData: function (e) {
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      district: item.countys[item.value[2]].name,
      province_id: item.provinces[item.value[0]].id,
      city_id: item.citys[item.value[1]].id,
      district_id: item.countys[item.value[2]].id
    });
    //console.log(this.data.province_id);
    console.log(this.data.city_id);
    //console.log(this.data.district_id);
  },

  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    //如果想滑动的时候不实时更新，只点确定的时候更新，注释掉下面这行代码即可。
    this.updateShowData()
  },


  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },

  bindCancel: function () {
    wx.navigateBack({})
  },


  bindSave: function (e) {
    console.log(e)
    var that = this
    var token = app.globalData.token;
    var url = app.globalData.url;

    var province = that.data.province_id;
    var city = that.data.city_id;
    var district = that.data.district_id;

    var consignee = e.detail.value.consignee;
    var address = e.detail.value.address;
    var telephone = e.detail.value.telephone;
    var code = e.detail.value.code;

    if (consignee == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (telephone == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }

    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(telephone))) {
      wx.showModal({
        title: '提示',
        content: '手机号格式错误',
        showCancel: false
      })
      return
    }
    if (province == "") {
      wx.showModal({
        title: '提示',
        content: '请填写地区',
        showCancel: false
      })
      return
    }


    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }

    // var apiAddoRuPDATE = "add";

    r.req(u + '/api/User/addAddress', { 
      province: that.data.province,
      city: that.data.city,
      district: that.data.district,
      province_id: province,
      city_id: city,
      district_id: district,
      consignee: consignee,
      address: address,
      telephone: telephone,
      is_default: that.data.is_default,
      address_id: that.data.address_id,
      token: wx.getStorageSync('token')
       }, 'post').then((res) => {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '保存成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({})
            }
            // else{
            //   setTimeout(function () {
            //     wx.navigateBack({})
            //   }, 3000)
            // } 
          }

        })
        
      })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    console.log(1235656)
    let that = this;
    if (e.id != null) {
      r.req(u + '/api/User/addressInfo', { address_id: e.id,token: wx.getStorageSync('token') }, 'post').then((res) => {
        console.log(res)
        let data = res.data.data
        that.setData({
          addressData: res.data.list,
          province: res.data.list.province,
          city: res.data.list.city,
          district: res.data.list.district,
          address_id: res.data.list.address_id,
          province_id: res.data.list.province_id,
          city_id: res.data.list.city_id,
          district_id: res.data.list.district_id,
          is_default: res.data.list.is_default
        })
        console.log(that.data.is_default)
      })

    }


  },

})