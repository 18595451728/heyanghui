const app = getApp(),r = require('../utils/request.js'),u=app.globalData.url

function checkLogin(){
  wx.checkSession({
    success:function(){},
    fail:function(){
      login();
    }
  })
}
function login(callback){
  wx.login({
    success: function (res) {
      console.log(res.code)
      wx.getUserInfo({
        success:function(re){
          var data = {
            code: res.code,
            encryptedData: re.encryptedData,
            iv: re.iv,
            c_token:wx.getStorageSync('sharetoken')
          }
          r.req(u + '/api/Login/wxLogin', data, 'post').then(function (e) {
            console.log(e)
            callback(e.data.token)
          })
        }
      })
      
    }
  })

}
module.exports={
  checkLogin,
  login
}