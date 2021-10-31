<template>
    <div class="next-process-content">
        <!-- <div class="next-process-item weight">第三周学习流程</div> -->
          <div class="next-process-item">
            <div class="next-process-title">
                欢迎你进入第三周的学习！
            </div>
            <div class="next-process-title">
                第三周的学习内容分两个部分：
            </div>
            <div class="next-process-title intent">
                1、首先我们将学习本项目的关键核心工具：目标规划·SP的目标计划工作单，可以简称为GPS（Goal Planning System），请不要将此工作单当作表格，这是一个规划目标的思维路径，用以培养建立目标导向的思维习惯。
            </div>
            <div class="next-process-title intent">
                2、另一部分是学习明确何谓“紧要事项”，并学习目标规划·SP系统的周目标、日计划和31日追踪表的使用，将规划的目标落实到周、日的计划和追踪中，以确保达成我们想要实现的目标，并逐步帮助我们培养出目标导向的行为习惯。
            </div>
            <div class="next-process-text">
              <p>学习提示：</p>
                <p>● 两段音频分别为11分钟和6分钟，请在Wi-Fi环境下进行学习，建议听读学习内容三遍，加强理解和记忆。</p>
                <p>
                ● 从写在“我的挑战表”中的S.M.A.R.T.目标里挑选1～2个目标，使用目标计划工作单进行实际的规划。最好为自己安排出一个固定的时间、认真思考其中的每一项。
                </p>
                <p>
                ● 每周/每天安排出10到15分钟，练习使用周目标、日计划、31日追踪，之后的第四周也请回到本栏继续进行周和日的计划。
                </p>
                <p>
                ● 完成全部学习内容后，请使用《学员反馈表》做个学习小反思。
                </p>
                <p>
                ● 在完成第二周的小组辅导和个人辅导后，如仍希望在现有辅导基础上对目标规划达成进行更深入理解践行， <a style="color:#00afff;text-decoration: underline;" @click="$router.push({name:'strengthen'})">“First Step强化辅导”</a>能够支持满足你的进一步需求，欢迎了解！
                </p>
                <p>
                ● 从这一周开始，我们会陆续开放目标规划·SP系统，本周学习其中的目标计划工作单GPS、目标清单总表、周目标、日计划和31日追踪表；第四周学习月度目标计划；第五周会详细介绍目标规划·SP系统每一部分的使用，然后开放整个工具系统，以支持你建立完整的目标体系。
                </p>
                <p>
                ● 请务必观看下面的视频介绍，帮助自己获得整体的了解。视频介绍为2分钟，建议在Wi-Fi环境下进行。
                </p>
            </div>
        </div>
         <div class="next-process-item mt20">
            <div class="next-process-text">
                <p>
                请按照阅读资料和系统提示的内容完成实际操作。
                </p>
            </div>
         </div>
         <div class="video-tip">
           目标规划·SP系统开放说明
         </div>
           <div class="tip-video-box clearfix" :style="{width:width+'px',height:height+'px'}" @click="videoShow">
          <!-- <learn-video class="tip-video" :playUrl="item.url" :width="width" :height="height"></learn-video> -->
          <svg-icon class="video-bj-play" icon-class="play"></svg-icon>
         </div>
         <el-dialog
        title="目标规划·SP系统开放说明"
        :visible.sync="videoVisible"
        class="dialog-main heightauto no-bottom"
        width="65%"
        top="4%"
        :close-on-click-modal="false"
        >
         <video v-if="videoVisible" ref="learnVideo" oncontextmenu="return false;" autoplay controls  controlslist="nodownload" name="media" width="100%"  class="video_detial">
            <source :src="videoUrl">
        </video>
    </el-dialog>
    </div>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      width: 350,
      videoVisible: false,
      videoUrl: 'https://www.raise-wisdom.com/media/rs/week3.mp4'
    }
  },
  computed: {
    height() {
      return 201 / 350 * this.width
    }
  },
  methods: {
    videoShow() {
      this.videoVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
    .next-process-content{
      .video-tip{
        margin: 10px 0 10px;
        font-size: 15px;
        font-weight: 600;
      }
      .tip-video-box{
        background-image: url('./bgimage/week3.png');
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