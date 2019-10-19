//app.js
App({
  onLaunch: function () {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    var that = this
    wx.getStorage({
      key: 'token',
      success(res) {
        that.globalData.token = res.data,
          that.globalData.is_login = true
      },
    })
    // 展示本地存储能力
    //隐藏系统tabbar
    wx.hideTabBar();
    //获取设备信息
    this.getSystemInfo();
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function (options) {
    wx.hideTabBar();
  },
  editTabbar: function () {
    let tabbar = {
      backgroundColor: "#fcfcfc",
      color: "#979795",
      selectedColor: "#000000",
      list: [{
        "pagePath": "/pages/home/index",
        "iconPath": "icon/home_off.png",
        "selectedIconPath": "icon/home_on.png",
        "text": "主页"
      },
        {
          "pagePath": "/pages/tabbar/classify/index",
          "iconPath": "icon/classify_off.png",
          "selectedIconPath": "icon/classify_on.png",
          "text": "分类"
      },
        {
          "pagePath": "/pages/tabbar/shopcart/index",
          "iconPath": "icon/cart_off.png",
          "selectedIconPath": "icon/cart_on.png",
          "text": "购物车"
      },
        {
          "pagePath": "/pages/tabbar/audit/index",
          "iconPath": "icon/audit_off.png",
          "selectedIconPath": "icon/audit_on.png",
          "text": "商品审核"
      }
      ]
    };
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;

    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);


    // if(pagePath.indexOf('/') != 0){
    //   pagePath = '/' + pagePath;
    // } 

    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }

    var token = wx.getStorageSync('token')
    if(!token){
      tabbar.list.splice(3,1)
    }

    _this.setData({
      tabbar: tabbar
    });
    console.log(this.globalData.tabBar)
  },
  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },
  globalData: {
    systemInfo: null, //客户端设备信息
    userInfo: null,
    url: 'http://www.heyanghui.com',
    token: '',
    is_login: false,
    tabBar: {
      backgroundColor: "#fcfcfc",
      color: "#979795",
      selectedColor: "#000000",
      list: [{
        "pagePath": "/pages/home/index",
        "iconPath": "icon/home_off.png",
        "selectedIconPath": "icon/home_on.png",
        "text": "主页"
      },
      {
        "pagePath": "/pages/tabbar/classify/index",
        "iconPath": "icon/classify_off.png",
        "selectedIconPath": "icon/classify_on.png",
        "text": "分类"
      },
      {
        "pagePath": "/pages/tabbar/shopcart/index",
        "iconPath": "icon/cart_off.png",
        "selectedIconPath": "icon/cart_on.png",
        "text": "购物车"
      },
      {
        "pagePath": "/pages/tabbar/audit/index",
        "iconPath": "icon/audit_off.png",
        "selectedIconPath": "icon/audit_on.png",
        "text": "商品审核"
      }
      ]
    }
  }
})