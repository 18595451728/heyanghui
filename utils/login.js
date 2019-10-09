const app = getApp(),r = require('../utils/request.js'),u=require('../utils/url.js')

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
      var data = {
        code: res.code
      }
      r.req(u + '/api/v1.Wechat/login', data, 'post').then(function (e) {
        wx.getUserInfo({
          success: function (re) {
            var mes = {
              encryptedData: re.encryptedData,
              iv: re.iv,
              session_key: e.data.session_key
            }
            r.req(u + '/api/v1.Wechat/get_userinfo', mes, 'post').then(function (t) {
              console.log(t)
              var userinfo = t.data
              wx.setStorageSync('userinfo', userinfo)
              wx.setStorageSync('hasLogin', !0)
              callback(userinfo)
            })
          }
        })
      })
    }
  })

}
module.exports={
  checkLogin,
  login
}