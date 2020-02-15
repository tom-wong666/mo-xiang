// miniprogram/pages/moXiangCapital/moXiangCapital.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    capitalResult: '零元整'
  },

  /**
   * 数字转大写函数
   */
  numberToChinese(num) {
    var num = parseFloat(num);
    var strOutput = "",
      strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    num += "00";
    var intPos = num.indexOf('.');
    if (intPos >= 0) {
      num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    }
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (var i = 0; i < num.length; i++) {
      strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
    }
    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")
  },

  /**
   * 监控输入
   */
  bindKeyInput: function (e) {
    const capitalResult = this.numberToChinese(e.detail.value)
    this.setData({
      capitalResult: capitalResult
    })
    // 2.1.0 起支持，处理函数可以直接 return 一个字符串，将替换输入框的内容
    // 这里用来放正则
    // 小数点左边支持12位，右边支持2位
    // return 123
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})