<template>
    <div class="materials-article clearfix">
      <h3 class="materials-top-title">目标规划·SP演示</h3>
      <div class="materials-article-item" v-for="(item,index) in videos" :key="index">
        <div class="materials-title">{{item.title}}</div>
        <div class="tip-video-box clearfix" :style="{width:width+'px',height:height+'px',backgroundImage:'url('+item.lu+')'}" @click="openVideo(index)">
          <!-- <learn-video class="tip-video" :playUrl="item.url" :width="width" :height="height"></learn-video> -->
          <svg-icon class="video-bj-play" icon-class="play"></svg-icon>
        </div>
      </div>
      <el-dialog
        :title="videos[currentIndex].title"
        :visible.sync="videoVisible"
        class="dialog-main heightauto no-bottom"
        width="65%"
        top="4%"
        :close-on-click-modal="false"
        >
         <video v-if="videoVisible" ref="learnVideo" oncontextmenu="return false;" autoplay  controls  controlslist="nodownload" name="media" width="100%"  class="video_detial">
            <source :src="videos[currentIndex].url" >
        </video>
    </el-dialog>
    </div>
</template>
<script>
import fm from '@/assets/images/fm.jpg'
import playUrl from '@/assets/images/letterVideo.mp4'
import learnVideo from '../Video'
import lu1 from '../../../learnStep/components/materialsContent/images/lu1.png'
import lu2 from '../../../learnStep/components/materialsContent/images/lu2.png'
import lu3 from '../../../learnStep/components/materialsContent/images/lu3.png'
import lu4 from '../../../learnStep/components/materialsContent/images/lu4.png'
import lu5 from '../../../learnStep/components/materialsContent/images/lu5.png'
import lu6 from '../../../learnStep/components/materialsContent/images/lu6.png'
import lu7 from '../../../learnStep/components/materialsContent/images/lu7.png'
import lu8 from '../../../learnStep/components/materialsContent/images/lu8.png'
import lu9 from '../../../learnStep/components/materialsContent/images/lu9.png'
import lu10 from '../../../learnStep/components/materialsContent/images/lu10.png'
import lu11 from '../../../learnStep/components/materialsContent/images/lu11.png'
export default {
  components: { learnVideo },
  data() {
    return {
      videoVisible: false,
      // lp: {
      //   lu1, lu2, lu3, lu4, lu5, lu6, lu7, lu8, lu9, lu10
      // },
      fm, playUrl,
      width: 350,
      currentIndex: 0,
      videos: [
        {
          title: 'SP整体介绍',
          url: 'https://www.raise-wisdom.com/media/rs/1.mp4',
          lu: lu1
        },
        {
          title: '目标清单总表',
          url: 'https://www.raise-wisdom.com/media/rs/2.mp4',
          lu: lu2
        },
        {
          title: '年度重要目标',
          url: 'https://www.raise-wisdom.com/media/rs/3.mp4',
          lu: lu3
        },
        {
          title: '月目标--月度目标',
          url: 'https://www.raise-wisdom.com/media/rs/4.mp4',
          lu: lu4
        },
        {
          title: '月目标--月历表_31日追踪_周时间图表',
          url: 'https://www.raise-wisdom.com/media/rs/5.mp4',
          lu: lu5
        },
        {
          title: '周目标',
          url: 'https://www.raise-wisdom.com/media/rs/6.mp4',
          lu: lu6
        },
        {
          title: '日计划、我的成就',
          url: 'https://www.raise-wisdom.com/media/rs/7.mp4',
          lu: lu7
        },
        {
          title: '沟通--沟通追踪',
          url: 'https://www.raise-wisdom.com/media/rs/8.mp4',
          lu: lu8
        },
        {
          title: '沟通--授权计划_会议计划_沟通总表',
          url: 'https://www.raise-wisdom.com/media/rs/9.mp4',
          lu: lu8
        },
        {
          title: '未来规划',
          url: 'https://www.raise-wisdom.com/media/rs/10.mp4',
          lu: lu9
        },
        {
          title: '人生规划',
          url: 'https://www.raise-wisdom.com/media/rs/11.mp4',
          lu: lu11
        },
        {
          title: '备忘录、帮助',
          url: 'https://www.raise-wisdom.com/media/rs/12.mp4',
          lu: lu10
        }
      ]
    }
  },
  computed: {
    height() {
      return 201 / 350 * this.width
    }
  },
  methods: {
    openVideo(index) {
      this.videoVisible = true
      this.currentIndex = index
    }
  }
}
</script>
<style lang="scss" scoped>
.materials-article-item{
  float: left;
  margin-bottom:20px;
  margin-left: 60px;
  .materials-top-title{
    margin:0;
  }
  .materials-title{
    margin: 17px 0;
    font-size: 17px;
    min-height: 28px;
  }
  .tip-video-box{
    // background-image: url('./images/lu1.png');
    background-repeat: no-repeat;
    background-size: cover;
    overflow: auto;
    background-position: 50% 50%;
    cursor: pointer;
    position: relative;
    .video-bj-play{
        position: absolute;
        top:50%;
        left: 50%;
        font-size: 80px;
        opacity: 0.4;
        // color: #fff;
        transform: translate(-50%,-50%);
        z-index: 2;
    }
  }
}
</style>