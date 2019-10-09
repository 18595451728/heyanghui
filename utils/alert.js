function toast(title) {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 2000
  })
}

module.exports = {
  toast
}
