<template>
    <div class="learn-video" :style="{width:width+'px',height:height+'px'}">
        <div class="video-bj" v-if="fm && playUrl" :style="{backgroundImage:'url('+fm+')'}" v-show="isBegin" @click="palyHandle">
            <svg-icon class="video-bj-play" icon-class="play"></svg-icon>
        </div>
        <div class="video-bj" v-else-if="fm && !playUrl" :style="{backgroundImage:'url('+fm+')'}" v-show="isBegin">
        </div>
        <video ref="learnVideo" v-if="playUrl" oncontextmenu="return false;"  v-show="!isBegin || !fm" controls  controlslist="nodownload" name="media" width="100%"   class="video_detial">
            <source :src="playUrl" >
        </video>
    </div>
</template>
<script>
export default {
  props: {
    fm: String,
    playUrl: String,
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '100%'
    }
  },
  watch: {
    playUrl() {
      // this.getHasVideo()
    }
  },
  created() {
    // this.getHasVideo()
  },
  data() {
    return {
      isBegin: true,
      hasVideo: false
    }
  },
  methods: {
    palyHandle() {
      this.isBegin = false
      this.$nextTick(_ => {
        this.$refs.learnVideo.play()
      })
    },
    getHasVideo() {
      if (!this.playUrl) {
        return
      }
      var video = document.createElement('video')

      // video.onload = function() {
      //   alert('success, it exsist')
      // }

      video.onerror = function() {
        this.hasVideo = false
      }

      video.src = this.playUrl
      // 不同浏览器情况不同，这里判断在该浏览器是否可以播放
      video.oncanplaythrough = _ => {
        this.hasVideo = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.learn-video{
        // width: 400px;
        border-radius: 10px;
        overflow: hidden;
        background-color: #222222;
        .video-bj{
            width: 100%;
            height: 100%;
            // height: 230px;
            background-size: cover;
            background-position: center;
            cursor: pointer;
            position: relative;
            .video-bj-play{
                position: absolute;
                top:50%;
                left: 50%;
                font-size: 80px;
                opacity: 0.7;
                color: #fff;
                transform: translate(-50%,-50%);
            }
        }
        .video_detial{
            display: block;
        }
      }
</style>