// pages/components/musicControls/musicControls.js
let innerAudioContext = null
/**
 * 所有实例共享的数据
 */
// let isOnPlayTest = false
let musicIndex = 0
let isMusicOnPlay = false
let musicPlayTextSRC = 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/播放.png'
let isShowListFlag = false
let musicList = [] 
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
    playStatus: musicPlayTextSRC,
    playLastMusicSRC: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/上一首.png',
    playNextMusicSRC: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/下一首.png',
    repeatMusicSRC: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/重播.png',
    showHideListSRC: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/歌单.png',
    // musicInfo: musicList[musicIndex].author + '-' + musicList[musicIndex].name,
    musicInfo: '',
    // musicNameList: musicList.map(_ => _.author + '-' + _.name),
    musicNameList: [],
    musicNameListClass: 'music-list music-list-hidden',
    musicIndex: musicIndex,
    musicDacing: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/嗨.png'
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
        playStatus: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/暂停.png',
        musicDacing: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/嗨一下.gif'
      })
      isMusicOnPlay = true
      musicPlayTextSRC = 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/暂停.png'
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
          playStatus: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/暂停.png',
          musicDacing: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/嗨一下.gif'
        })
        isMusicOnPlay = true
        musicPlayTextSRC = 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/暂停.png'
      } else {
        innerAudioContext.pause()
        this.setData({
          playStatus: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/播放.png',
          musicDacing: 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/嗨.png'
        })
        isMusicOnPlay = false
        musicPlayTextSRC = 'cloud://mo-xiang-wx-yun.6d6f-mo-xiang-wx-yun-1301177803/source/img/播放.png'
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
      } else {
        this.setData({
          musicNameListClass: 'music-list'
        })
      }
      isShowListFlag = !isShowListFlag
    }
  },

  lifeTimes: {
    attached: function() {
      
    }
  },

  pageLifetimes: {
    show: function() {
      // 获取播放列表
      if (musicList.length === 0) {
        const db = wx.cloud.database()
        db.collection('mo_xiang_music').get().then(res => {
          musicList = res.data
          this.setData({
            musicInfo: musicList[musicIndex].author + '-' + musicList[musicIndex].name,
            musicNameList: musicList.map(_ => _.author + '-' + _.name)
          })
        })
      } 
      // 如果显示的时候音乐处于播放状态，则播放音乐
      if (isMusicOnPlay === true) {
        isMusicOnPlay = false
        this.playPauseMusic()
      }
    },
    hide: function () {
      // 停止播放
      innerAudioContext.pause()
    }
  }
})
