// pages/components/musicControls/musicControls.js
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = true
innerAudioContext.loop = false
innerAudioContext.onPlay(() => {
  console.log('开始播放')
})
innerAudioContext.onPause(() => {
  console.log('暂停播放')
})
innerAudioContext.onEnded(() => {
  console.log('播放完毕一首歌曲')
})
innerAudioContext.onWaiting(() => {
  console.log('数据缓冲中')
})
innerAudioContext.onTimeUpdate(e => {
  console.log('e',e)
})
innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    playMusic() {
      innerAudioContext.src = 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/music/马良 - 往后余生原创(demo).mp3'
      innerAudioContext.play()
    },
    pauseMusic() {
      innerAudioContext.pause()
    }
  }
})
