function post(url, data, method) {
  var p = new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: method == 'get' ? {
        'Content-Type': 'application/x-www-form-urlencoded'
      } : {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        if (res.data.status == 1) {
          resolve(res.data);
        } else if (res.data.status == 0){
          
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel:false,
            // cancelText: '再看看',
            // confirmText: '立即前往',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateBack({
                });
                //return false;
              }
            }
          })
         
          // if (res.data.status == -1) {
          //   wx.navigateTo({
          //     url: '/pages/register/register',
          //   })
          // }
        } else if (res.data.status == -1) {
          wx.showModal({
            title: '提示',
            content: '您未登录，是否前往登录？',
            cancelText: '再看看',
            confirmText: '立即前往',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({
                  url: '/pages/user/index'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '数据请求失败',
          icon: 'none',
        })
      }
    })
  });
  return p;
}

module.exports = {
  post: post
}