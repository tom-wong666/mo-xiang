// pages/components/musicControls/musicControls.js
let innerAudioContext = null
/**
 * 所有实例共享的数据
 */
// let isOnPlayTest = false
let musicIndex = 0
let isMusicOnPlay = false
let musicPlayText = '播放'
let isShowListText = '显示歌单'
let isShowListFlag = false
let musicList = [
    { name: '漂洋过海来看你', author: '周深', url: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/music/周深 - 漂洋过海来看你.mp3' },
    { name: '爱你', author: '王贰浪', url: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/music/王贰浪 - 爱你.mp3' },
    { name: '成都', author: '赵雷', url: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/music/赵雷 - 成都.mp3' },
  { name: '往后余生', author: '马良', url: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/music/马良 - 往后余生原创(demo).mp3' },
  { name: '感谢你曾经来过', author: '周思涵', url: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/music/Ayo97 - 感谢你曾来过.mp3' },
  { name: '全部都是你', author: 'Drigon', url: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/music/Dragon Pig - 全部都是你.mp3' },
  { name: '光年之外', author: '邓紫棋', url: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/music/G.E.M.邓紫棋 - 光年之外.mp3' },
  { name: '世界上的另一个我', author: '阿肆', url: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/music/阿肆 - 世界上的另一个我.mp3' },
  { name: '海盗船长', author: '风子', url: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/music/风子 - 海盗船长.mp3' },
  { name: '你打不过我吧', author: '跟风超人', url: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/music/跟风超人 - 你打不过我吧.mp3' }
  ]
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的视图数据
   * 每个实例都会初始化一次的数据
   */
  data: {
    playStatus: musicPlayText,
    isShowListText: isShowListText,
    musicInfo: musicList[musicIndex].author + '-' + musicList[musicIndex].name,
    musicNameList: musicList.map(_ => _.author + '-' + _.name),
    musicNameListClass: 'music-list music-list-hidden',
    musicIndex: musicIndex
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initPlayer() {
      innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.onPlay(() => {
        console.log('onPlay开始播放')
      })
      innerAudioContext.onWaiting(() => {
        console.log('onWaiting数据缓冲中')
      })
      innerAudioContext.onCanplay(() => {
        console.log('onCanplay可以播放了')
        console.log(musicList[musicIndex].name)
      })
      innerAudioContext.onPause(() => {
        console.log('onPause暂停播放')
      })
      innerAudioContext.onEnded(() => {
        console.log('onEnded播放完毕一首歌曲')
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
        // 重新调用play，处理安卓机型不能播放问题
        innerAudioContext.play()
      })
    },
    toggleMusic() {
      if (innerAudioContext !== null) {
        innerAudioContext.destroy()
      }
      this.initPlayer()
      this.setData({
        musicInfo: musicList[musicIndex].author + '-' + musicList[musicIndex].name
      })
      innerAudioContext.src = musicList[musicIndex].url
      innerAudioContext.play()
      this.setData({
        playStatus: '暂停'
      })
      isMusicOnPlay = true
      musicPlayText = '暂停'
    },
    playLastMusic() {
      musicIndex = musicIndex - 1
      if (musicIndex === -1) {
        musicIndex = musicList.length - 1
      }
      this.setData({
        musicIndex: musicIndex
      })
      this.toggleMusic()
    },
    playPauseMusic() {
      if (innerAudioContext === null) {
        this.initPlayer()
      }
      if (isMusicOnPlay === false) {
        innerAudioContext.src = musicList[musicIndex].url
        innerAudioContext.play()
        this.setData({
          playStatus: '暂停'
        })
        isMusicOnPlay = true
        musicPlayText = '暂停'
      } else {
        innerAudioContext.pause()
        this.setData({
          playStatus: '播放'
        })
        isMusicOnPlay = false
        musicPlayText = '播放'
      }
    },
    playNextMusic() {
      musicIndex = musicIndex + 1
      if (musicIndex > (musicList.length-1)) {
        musicIndex = 0
      }
      this.setData({
        musicIndex: musicIndex
      })
      this.toggleMusic()
    },
    repeatMusic() {
      if (innerAudioContext === null) {
        isMusicOnPlay = false
        this.playPauseMusic()
      } else {
        innerAudioContext.stop()
        innerAudioContext.play()
      }
    },
    selectMusic(event) {
      const selectedIndex = event.target.dataset.index
      if (selectedIndex === musicIndex) {
        this.repeatMusic()
      } else {
        musicIndex = selectedIndex
        this.setData({
          musicIndex: musicIndex
        })
        this.toggleMusic()
      }
    },
    showHideList() {
      if (isShowListFlag) {
        this.setData({
          musicNameListClass: 'music-list music-list-hidden'
        })
        this.setData({
          isShowListText: '显示歌单'
        })
        isShowListText = '显示歌单'
      } else {
        this.setData({
          musicNameListClass: 'music-list'
        })
        this.setData({
          isShowListText: '隐藏歌单'
        })
        isShowListText = '隐藏歌单'
      }
      isShowListFlag = !isShowListFlag
    }
  },

  pageLifetimes: {
    // 同步播放按钮文本
    show: function() {
      this.setData({
        playStatus: musicPlayText
      })
    },
    hide: function () {
      this.setData({
        playStatus: ''
      })
    }
  }
})
