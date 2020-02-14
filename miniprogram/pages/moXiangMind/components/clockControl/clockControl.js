// miniprogram/pages/moXiangMind/components/clockControl/clockControl.js
// 设置设备常亮
wx.setKeepScreenOn({
  keepScreenOn: true
})
let time = 15 * 60;
let timer = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balanceTime: "15:00",
  },

  /**
   * 页面方法
   */
  methods: {
    getBalanceTime(time) {
      let minute = Math.floor(time / 60)
      minute = this.formatNumber(minute)
      let second = time % 60
      second = this.formatNumber(second)
      return minute + ':' + second
    },
    formatNumber(smallNumber) {
      if (smallNumber < 10) {
        return '0' + smallNumber.toString()
      } else {
        return smallNumber.toString()
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    time = 1 * 10;
    timer = 0;
    timer = setInterval(() => {
      if (time > 0) {
        time = time - 1
        const balanceTime = this.methods.getBalanceTime(time)
        this.setData({
          balanceTime: balanceTime
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)
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
    console.log('timer', timer)
    clearInterval(timer)
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