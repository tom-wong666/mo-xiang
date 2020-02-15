// miniprogram/pages/moXiangQuantity/moXiangQuantity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stringResult: ''
  },

  /**
   * 监控输入
   */
  bindKeyInput(e) {
    const res = this.countResult(e.detail.value)
    this.setData({
      stringResult: res
    })
  },

  /**
   * 合并统计结果
   */
  countResult(val) {
    // 定义基础变量
    const totalLength = '您一共输入了' + val.length + '个字符，其中'
    const chineseWord = '中文字符'
    let chineseWordQty = 0
    const chineseWordPattern = new RegExp("[\u4E00-\u9FA5]+")
    const englishWord = '英文字符'
    let englishWordQty = 0
    const englishWordPattern = new RegExp("[A-Za-z]+")
    const numberWord = '阿拉伯数字'
    let numberWordQty = 0
    const numberWordPattern = new RegExp("[0-9]+")
    const otherWord = '其他字符'
    let otherWordQty = 0
    // 循环处理输入字符
    const valArray = val.split('')
    for (const item of valArray) {
      if(chineseWordPattern.test(item)) {
        chineseWordQty = chineseWordQty + 1
      } else if (englishWordPattern.test(item)) {
        englishWordQty = englishWordQty + 1
      } else if (numberWordPattern.test(item)) {
        numberWordQty = numberWordQty + 1
      } else {
        otherWordQty = otherWordQty + 1
      }   
    }
    return `${totalLength}${chineseWord}${chineseWordQty}个，${englishWord}${englishWordQty}个，${numberWord}${numberWordQty}个，${otherWord}${otherWordQty}个。`
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