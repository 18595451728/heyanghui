// pages/sugges_conter/index.js
var app =new getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    content:'',
    imgbase:'',
    imgArr:[]
  },
  // 删除图片
  clearImg: function (e) {
    var nowList = [];//新数据
    var uploaderList = this.data.uploaderList;//原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);


        if (uploaderList.length == 9) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })

        that.setData({
          imgbase:'data:image/png;base64,'+wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64")
        })
        that.uploadImg();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  uploadImg(){
    let that=this;
    var arr=this.data.imgArr;
    wx.request({
      url: app.globalData.url+'/api/Index/uploadImg',
      data: {
        token: wx.getStorageSync('token') ,
        img_str:that.data.imgbase,
        path:'/headimg'
      },
      method: 'POST', 
      success: function(res){
        arr.push(app.globalData.url+''+res.data.pic)
        that.setData({
          'imgArr':arr
        })
      },

    })
  },
  suggest(e){
    this.setData({
      content:e.detail.value
    })
  },
  submit(){
    let that=this;
    if(this.data.content=='' || this.data.img_arr==''){
      wx.showModal({
        title:'提示',
        content:'请完整填写信息',
        showCancel:false
      })
    }else{
      wx.request({
        url: app.globalData.url+'/api/User/suggestAdd',
        data: {
          token:wx.getStorageSync('token'),
          msg:that.data.content,
          img_arr:that.data.imgArr
        },
        method: 'POST', 
        success: function(res){
          console.log(res)
   
  
          if(res.data.status==1){
            wx.showToast({
              title:'提交成功',
              icon:'none',
              duration:1500
            })
            setTimeout(function(){
              wx.navigateBack({
                delta: 1, 
    
              })
            },1500)
  
          }
        },
  
      })
    }

  }
  
})