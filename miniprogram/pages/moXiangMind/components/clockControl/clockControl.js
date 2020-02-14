// miniprogram/pages/moXiangMind/components/clockControl/clockControl.js
// 设置设备常亮
wx.setKeepScreenOn({
  keepScreenOn: true
})
// 总时长15分钟
let time = 15 * 60
// 定时器
let timer = 0
// 计时标识
let isMoving = true
// 重置时钟标识
let isRestartClock = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 剩余时间
    balanceTime: "15:00",
    // 剩余比例
    balancePercent: 100,
    // 计时中，已暂停
    countStatus: '计时中',
    // 暂停计时，开始计时
    controlStatus: '暂停计时'
  },

  /**
   * 获取剩余时间函数
   */
  getBalanceTime(time) {
    let minute = Math.floor(time / 60)
    minute = this.formatNumber(minute)
    let second = time % 60
    second = this.formatNumber(second)
    return minute + ':' + second
  },

  /**
   * 格式化小于10的数字(补0)
   */
  formatNumber(smallNumber) {
    if (smallNumber < 10) {
      return '0' + smallNumber.toString()
    } else {
      return smallNumber.toString()
    }
  },

  /**
   * 开始||暂停 控制
   */
  controlTimer() {
    if (isRestartClock) { 
      // 初始化数据
      time = 15 * 60
      timer = 0
      isMoving = true
      // 初始化data
      this.setData({
        // 剩余时间
        balanceTime: "15:00",
        // 剩余比例
        balancePercent: 100,
        // 计时中，已暂停
        countStatus: '计时中',
        // 暂停计时，开始计时
        controlStatus: '暂停计时'
      })
      // 开启定时器
      timer = setInterval(() => {
        this.startTimer()
      }, 1000)
      isRestartClock = false
    } else {
      if (isMoving) {
        this.setData({
          countStatus: '已暂停',
          controlStatus: '开始计时'
        })
        clearInterval(timer)
        timer = 0
        isMoving = false
      } else {
        this.setData({
          countStatus: '计时中',
          controlStatus: '暂停计时'
        })
        timer = setInterval(() => {
          this.startTimer()
        }, 1000)
        isMoving = true
      }
    }
  },

  /**
   * 开始计数函数
   */
  startTimer() {
    if (time > 0) {
      time = time - 1
      const balanceTime = this.getBalanceTime(time)
      const balancePercent = parseFloat(((time / 900) * 100).toFixed(2))
      this.setData({
        balanceTime: balanceTime,
        balancePercent: balancePercent
      })
    } else {
      clearInterval(timer)
      this.setData({
        countStatus: '一刻钟过去了',
        controlStatus: '再来一刻钟'
      })
      isRestartClock = true
    }
  },

  /**
   * 返回上一级
   */
  backToMind() {
    console.log(11)
    wx.switchTab({ url: '/pages/moXiangMind/moXiangMind' })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化数据
    time = 15 * 60
    timer = 0
    isMoving = true
    isRestartClock = false
    // 开启定时器
    timer = setInterval(() => {
      this.startTimer()
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
    // 清理定时器
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