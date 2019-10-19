// pages/address/update/index.js
const app = getApp()
var r = require('../../../utils/request.js'), u = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['男', '女'],
    sexindex:0,
    region: [],
    date: '',
    user:'',
    imgbase:'',
    provinceName:'',
    cityName:'',
    districeName:'',
    areaId:0,
    province_id:'',
    city_id:'',
    district_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.init();
    this.setData({
      areaId: 0
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  bto:function(){
    r.req(u +'/api/User/setInfo',{
      token:wx.getStorageSync('token'),
      nickname:'',
      telephone:'',
      sex:'',
      email:'',
      head_img:'',
      birth:'',
      province_id:'',
      city_id:'',
      district_id:'',
      detail:''
    },'post').then(res=>{
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.init();
    this.setData({
      areaId:0
    })
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
  init(){
    var that =this
    r.req(u + '/api/User/userInfo', { token:wx.getStorageSync('token')},'post').then(res=>{
      console.log(res)
      that.setData({
        user:res.data.user,
        date:res.data.user.birth,
        sexindex:res.data.user.sex-1
      })
      console.log(this.data.user)
      that.getArea();
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexindex: parseInt(e.detail.value)
    })
    console.log(this.data.sexindex)
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region:e.detail.value
    })
    this.setData({
      provinceName: e.detail.value[0],
      cityName:e.detail.value[1],
      districtName:e.detail.value[2],
      areaId:0
    })
this.changeArea();

  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  inputName(e){
    this.setData({
      ['user.nickname']:e.detail.value
    })

  },
  inputTel(e){

    this.setData({
      ['user.telephone']:e.detail.value
    })
  },
  inputAddress(e){
    this.setData({
      ['user.detail']:e.detail.value
    })
  },
  submit(){
    var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;

    if(this.data.user.nickname==''|| this.data.user.telephone==''  || this.data.province_id=='' || this.data.user.detail==''){
      wx.showModal({
        title:'提示',
        content:'请完整填写信息',
        showCancel:false
      })
    }else if(TEL_REGEXP.test(this.data.user.telephone)!=true){
      wx.showModal({
        title:'提示',
        content:'请输入正确格式的手机号',
        showCancel:false
      })
    }else {
      let that=this;

      r.req(u + '/api/User/setInfo', { 
        token: wx.getStorageSync('token') ,
        nickname:that.data.user.nickname,
        telephone:that.data.user.telephone,
        sex:parseInt(that.data.sexindex)+1, 
        email:"",
        head_img:that.data.user.head_img,
        birth:that.data.date,
        province_id:that.data.province_id,
        city_id:that.data.city_id,
        district_id:that.data.district_id,
        detail:that.data.user.detail
      }, 'post').then((res) => {
 
        if(res.status==1){
          that.setData({
            areaId:0
          })
          that.getArea();

          setTimeout(function() {
            wx.reLaunch({
              url: '/pages/mine/mine',
            })
          },0)
        }
      })
    
    }

  },
  chooseImg(){
    let that=this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: function(res){

        that.setData({
          imgbase:'data:image/png;base64,'+wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64")
        })
        that.uploadImg();
      },

    })
  },
  uploadImg(){
    let that=this;

    r.req(u + '/api/Index/uploadImg', { 
      token: wx.getStorageSync('token') ,
      img_str:that.data.imgbase,
      path:'/headimg'
    }, 'post').then((res) => {
   
      that.setData({
        ['user.head_img']:app.globalData.url+''+res.data.pic
      })
    })
  },
  getArea(){
    let that=this;

    r.req(u + '/api/Index/getRegion', { 
      parent_id:that.data.areaId
    }, 'post').then((res) => {
    
      console.log(res)
      res.data.forEach(function(item,index){
        if(item.id==that.data.user.province_id){

            that.setData({
              provinceName:item.name,
              areaId:item.id,
              province_id:item.id
            })
            that.getArea();

        }else if(item.id==that.data.user.city_id){
          that.setData({
            cityName:item.name,
            areaId:item.id,
            city_id:item.id
          })   
          that.getArea();
        }else if(item.id==that.data.user.district_id){
          that.setData({
            districtName:item.name,
            district_id:item.id
          })    
          that.setData({
            region:[0]
          })
        
        }
      })
    })
 
  },
  changeArea(){
    let that=this;
  
    r.req(u + '/api/Index/getRegion', { 
      parent_id:that.data.areaId
    }, 'post').then((res) => {

      res.data.forEach(function(item,index){
        if(item.name.indexOf(that.data.provinceName)!=-1 || that.data.provinceName.indexOf(item.name)!=-1){

            that.setData({
              province_id:item.id,
              areaId:item.id
            })
            that.changeArea();
        }else if(item.name.indexOf(that.data.cityName)!=-1 || that.data.cityName.indexOf(item.name)!=-1){
          that.setData({
            city_id:item.id,
            areaId:item.id
          })   
          that.changeArea();
        }else if(item.name.indexOf(that.data.districtName)!=-1 || that.data.districtName.indexOf(item.name)!=-1){
          that.setData({
            district_id:item.id,
            areaId:item.id
          })    
        }
      })
    })
  }
})