// miniprogram/pages/moXiangVideo/moXiangVideo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [
      { id: 1, title: '捉妖记2-坏妖王来袭', type: '影视剪辑', playTime: '00:52', src: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/video/捉妖记2-坏妖王来袭.mp4', detail: '胡巴和小妖们载歌载舞时，坏妖王派来了血妖，胡巴这次能否逃脱呢？', poster: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/video/poster/poster-捉妖记2-坏妖王来袭.png' }, 
      { id: 2, title: '生活大爆炸-父母对弈', type: '影视剪辑', playTime: '00:21', src: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/video/生活大爆炸-父母对弈.mp4', detail: '离异的莱纳德父母因为他的婚礼终于重逢，这对冤家会爆发怎样的战争呢？', poster: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/video/poster/poster-生活大爆炸-父母对弈.png' },
      { id: 3, title: '当幸福来敲门-克里斯的一天', type: '影视剪辑', playTime: '00:21', src: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/video/当幸福来敲门-克里斯的一天.mp4', detail: '离异的莱纳德父母因为他的婚礼终于重逢，这对冤家会爆发怎样的战争呢？', poster: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/video/poster/poster-生活大爆炸-父母对弈.png' }
    ]
  },

  /**
   * 跳转到播放页面
   */
  playVideo(e) {
    const videoInfo = e.currentTarget.dataset.videoInfo
    const { title, type, playTime, src, detail, poster } = videoInfo
    let url = '/pages/moXiangVideo/playVideo/playVideo'
    url = `${url}?title=${title}&type=${type}&playTime=${playTime}&src=${src}&detail=${detail}&poster=${poster}`
    console.log('url', url)
    wx.navigateTo({
      url: url
    })
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