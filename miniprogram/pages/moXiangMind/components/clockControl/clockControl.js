// miniprogram/pages/moXiangMind/components/clockControl/clockControl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balanceTime: "",
  },

  /**
   * 页面方法
   */
  methods: {
    getBalanceTime() {
      console.log(123)
    }
  },

  /**
   * 非显示数据
   */
  extraData: {
    index: 10
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
    setInterval(() => {
      this.extraData.index = this.extraData.index - 1
      console.log('123', this.extraData.index)
      this.methods.getBalanceTime()
    }, 1000)
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