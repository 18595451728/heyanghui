Page({
  data: {
    address: [
      {
        id: "1",
        address: "1单元222号",
        name: "啦啦啦",
        default: "1",
        phone: "12222223333",
        province: "河北省 石家庄市 长安区",
        txtStyle: "",
      },
      {
        id: "2",
        address: "2幢2楼222号",
        name: "嚯嚯嚯",
        default: "0",
        phone: "12345678900",
        province: "浙江省 杭州市 市辖区",
        txtStyle: "",
      },
      {
        id: "3",
        address: "1幢1单元",
        name: "哈哈哈",
        default: "0",
        phone: "18208350499",
        province: "河北省 石家庄市 新华区",
        txtStyle: "",
      }
    ],
    delBtnWidth: 180
  },

  onLoad: function (options) {
    //获取收货地址 省略
  },

  edit: function (e) {
    //编辑收货地址 省略
  },

  add: function () {
    //增加收货地址 省略
  },

  delItem: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.data.address.splice(index, 1);
    this.setData({
      address: this.data.address
    })
  },

  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },

  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0rpx";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.address;
      list[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      this.setData({
        address: list
      });
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.address;
      var del_index = '';
      disX > delBtnWidth / 2 ? del_index = index : del_index = '';
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        address: list,
        del_index: del_index
      });
    }
  },

})
