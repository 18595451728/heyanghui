const a = require('../utils/alert.js')
function req(url,data,method){
  var header = method == 'get' ? { 'Content-Type': 'application/x-www-form-urlencoded' } : { 'Content-Type': 'application/json'}
  return new Promise((resolv, reject)=>{
    wx.request({
      url: url,
      data:data,
      method:method,
      header:header,
      success:((res)=>{
        if (res.data == "服务器异常") {
          wx.hideLoading()
          a.toast('网络错误或服务器繁忙!')
        } else {
          resolv(res.data)
        }
      }),
      fail:((res)=>{
        wx.hideLoading();
        reject(res);
        a.toast('网络错误或服务器繁忙1!')
      })
    })
  })
}

module.exports={
  req
}