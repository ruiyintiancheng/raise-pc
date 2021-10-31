<template>
    <!-- 致学员的一封信 -->
    <div class="letter" >
        <div class="letter-content">
              <!-- <audio class="letter-audio" src="http://www.raise-wisdom.com/media/letterAudio.mp3" controls  oncontextmenu="return false;">
                您的浏览器不支持此音频文件
              </audio> -->
            <p class="letter-content-start">致 <b class="letter-content-name">{{userName}}</b>:</p>
            <p>&nbsp;</p>
            <div class="letter-content-text">
              <div class="letter-article-box">
                <p class="no-intent">您好！</p>                    
                <p>欢迎您购买“First Step迈出第一步”辅导项目。</p>
                <p>相信这对您是一段极具价值的迈向成功的挑战之旅。</p>
                <p>“First Step”辅导项目，将帮助您发现生活和工作中的痛点、挑战，通过设定应对挑战的目标，指导您学习规划目标、制定目标计划，最终实现您所设定的目标；我们会全力支持您，在教练的陪伴下体验从认知到实践的过程，完整地走过一个改变的循环。</p>
                <p>&nbsp;</p>
                <p>在接下来的六周时间里，为了令您的学习收获物超所值，为了使您的改变清晰可见，请您：</p>
                <p class="padd-2">● 按照系统提示的每周学习和实践内容，听、读、看相应的阅读/音频和视频学习资料；</p>
                <p class="padd-2">● 完成自我评估和反思/反馈表；</p>
                <p class="padd-2">● 按要求制定和完成实践计划及实践行动；</p>
                <p>为保证您的学习质量，在您学习的过程中设有一些小小的闯关问卷和必须完成的内容，如果没有通过，系统会回到相应的学习环节等候您最终完成。建议至少听、读3遍学习资料！</p>
                <p>&nbsp;</p>
                <p>六周的学习过程中还包含2次小组辅导和1次一对一教练辅导。</p>
                <p class="padd-2">● 2次小组辅导的时间是您在购买产品时就已经选定的时间，无特殊情况将无法变更；小组辅导在您开始学习的第2周和第6周进行，小组辅导的时长每次80min。</p>
                <p class="padd-2">● 第2周小组辅导之后需按与教练确定的时间进行一对一教练辅导； 一对一教练辅导时长为50min，所有组员的一对一辅导均在首次小组辅导后的一周内完成。</p>
                <p>小组辅导和一对一辅导是本辅导项目中非常重要的环节，请务必按约定时间认真参与完成。</p>
                <p>&nbsp;</p>
                <p>最后，祝您学习顺利！收获满满！</p>
              </div>
            </div>
            <div class="fg-line"></div>
            <div class="letter-other clearfix">
                <div class="letter-add" v-if="info1 && info.userName">
                    <learn-video :fm="fm" :playUrl="playUrl" :width="400" :height="230"></learn-video>
                     <div class="letter-teacher">
                        <div class="letter-teacher-name">本期你的教练是&nbsp;&nbsp;<i>{{info.userName}}</i></div>
                        <!-- <p class="letter-teacher-info">姓名：{{info.userName}}</p> -->
                        <p class="letter-teacher-info" v-if="info.coachIntro">简介：{{info.coachIntro}}</p>
                        <!-- <p class="letter-teacher-info">特点：{{info.coachSpecialty}}</p> -->
                        <div class="qrcode-box" v-if="info.coachQrCode">
                            <img class="qrcode" :src="info.coachQrCode" alt="">
                        </div>
                    </div>
                </div>
                <div class="letter-article" :class="{'has-coach': info1 && info.userName}">
                    <el-scrollbar >
                      <div class="letter-article-box">
                        <p>欢迎您来参加First Step迈出第一步辅导项目！我是您的教练。在接下来的六周里，我将支持您探索方向、设定目标并培养以目标导向的思维习惯，从而提升您的生活和工作品质。</p>                    
                        <p>我们都知道习惯的培养是难而又难的，除了需要时间还需要一套行之有效的方法。有人说培养一个习惯需要21天，在这里：我们用六周，共两个21天的时间，帮助您通过阅读、听、看、自我评估、自我反思、小组辅导、1-1辅导和自我实践等多感官学习方式，陪伴您走过一个完整的改变的循环。</p>
                        <p>&nbsp;</p>
                        <p>因为我们知道如果总是以同样的方式思考，用同样的方式做事，我们得到的也只是同样的结果。所以为得到不同的结果，我们需要改变行为和态度。</p>
                        <div class="huan-box">
                            <img :src="huan" alt="">
                        </div>
                        <h4 class="letter-article-title">First Step辅导项目</h4>
                        <h4 class="letter-article-title">不是</h4>
                        <p>● 不是一套新理论或新思想。您会发现本项目中的所有理念都既实际又灵活</p>
                        <p>● 不是针对具体问题的一套答案。众所周知在领导力或管理领域没有什么现成的答案——只有适用于相应情景的原则。</p>
                        <p>● 也不是系列演讲，而是需要您自己参与并决定全部进程的体验式学习。</p>
                        <h4 class="letter-article-title">它是</h4>
                        <p>● 是一个激发您思考的过程。您从学习资料中所学到的，远没有您从自己身上所发现的重要。</p>
                        <p>● 是一个通过实践来学习的项目。很多在课堂上听起来很不错的想法，回到工作中却不能产生效果。而在本项目中我们指导您一边学习一边应用，在工作和生活中产生实际的成果。</p>
                        <p>&nbsp;</p>
                        <p>所以我们这里不提供心灵鸡汤，也不会强迫您要和他人一样；这里有的只是激发出您：自我负责、脚踏实地实现自我目标的动力！</p>
                      </div>
                      <div class="letter-article-box mt20">
                        <h4 class="letter-article-title">第一周学习流程</h4>
                        <p class="mt20">本周是First Step辅导项目学习出发的第一周，我们将一起了解此项目的起源背景；学习LMI核心理念；开启审视自我挑战的行动。</p>
                        <p>请注意：所有的学习环节都有打卡问卷，如果没有通过、系统会回到前一个学习环节；表格也都有必填项，只有填写完整才能提交。</p>

                        <p class="mt20">学习提示：</p>
                        <p>● 音频约20分钟，建议在Wi-Fi环境下进行学习，建议听读学习内容三遍，加强理解和记忆。</p>
                        <p>● 《自我评估表》和《我的挑战表》的内容需要你有充足的时间思考，建议选择安静的环境，预留至少30分钟进行独立思考并完成。</p>
                        <p>● 请提前在PC端和手机端安装好Zoom会议客户端（https://zoomvideo.cn/zoomplusdownload/），为下周的小组辅导和1-1辅导做好准备。</p>
                        <p>● 完成全部学习内容后，请使用《学员反馈表》做个学习小反思。</p>
                        
                        <p class="mt20">请按照阅读资料和系统提示的内容完成实际操作。</p>
                      </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qrcode from '@/assets/images/qrcode.png'
import fm from '@/assets/images/fm.jpg'
import huan from '@/assets/images/huan.png'
import learnVideo from './components/Video'
// import letterAudio from './components/letterAudio.mp3'
import { baseRequest } from '@/api/base'
export default {
  props: {
    courseId: [String, Number],
    flowNodeNo: [String, Number]
  },
  components: {
    learnVideo
  },
  data() {
    return { qrcode, fm, huan,
      info: {},
      stuFlowText: '',
      videoUrl: '',
      userName: '',
      playUrl: ''
      // letterAudio
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      baseRequest('/course/firstStep/getStuLetter', { courseId: this.courseId, flowNodeNo: this.flowNodeNo }).then(response => {
        this.info = response.data.item.rwCoachVo
        this.videoUrl = response.data.item.videoUrl
        this.stuFlowText = response.data.item.stuFlowText
        this.userName = response.data.item.userName
      })
      baseRequest('/course/rwCoachMaterial/selects', { courseId: this.courseId, flowNodeNo: this.flowNodeNo }).then(response => {
        if (response.data.item && response.data.item[0]) {
          this.playUrl = response.data.item[0].mUrl
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.letter{
  overflow: hidden;
  .mt20{
    margin-top:20px;
  }
    .fg-line{
        height: 1px;
        border: dashed 1px #ddd;
        margin-top: 24px;
    }
  .letter-content{
    padding:30px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 32px;
    letter-spacing: 0px;
    color: #222222;
    background-color: #fcfcfc;
    border-radius: 10px;
    border: solid 1px #dddddd;
            -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        position: relative;
        .letter-audio{
          position: absolute;
          top:30px;
          right: 50px;
          opacity: 0.9;
          outline: white;
        }
    .letter-content-start{
      line-height: 36px;
      .letter-content-name{
        font-weight: bold;
      }
    }
    /deep/ .letter-content-text{
        p{
             text-indent:2em;
            //  margin-top: 5px;
        }
    }
    .letter-other{
      padding:30px 0 0 0;
      .letter-add{
          float: left;
      }
      .letter-article{
        float: left;
        padding-left: 30px;
        width: 100%;
        overflow: auto;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        .el-scrollbar{
          padding-bottom: 50px;
          height: 100%;
        }
        &.has-coach{
          width: 893px;
          border-left: 1px dashed #ddd;
          margin-left: 30px;
          height: 560px;
        }
        .letter-article-box{
          padding-right: 10px;
        }
        .huan-box{
            text-align: center;
        }
        .letter-article-title{
            margin-top:10px;
        }
        p{
            text-indent:2em;
            // margin-top:5px;
        }
      }
      .letter-video{
        width: 400px;
        // height: 254px;
        border-radius: 10px;
        overflow: hidden;
        background-color: #222222;
        .video-bj{
            width: 100%;
            height: 230px;
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
      .letter-teacher{
        // margin-left: 30px;
        // padding-left: 30px;
        // border-left: 1px dashed #ddd;
        width: 400px;
        margin-top: 24px;
        font-size: 18px;
        color:#222;
         height: 254px;
         padding:0 20px;
         .letter-teacher-name{
            font-weight: bold;
         }
         .letter-teacher-info{
           color: #222;
           line-height: 28px;
           font-size: 15px;
         }
         .qrcode-box{
           	width: 120px;
            height: 120px;
            background-color: #ffffff;
            border-radius: 10px;
            border: solid 1px #dddddd;
            padding:10px;
            margin-top:5px;
            .qrcode {
              width: 100%;
              height: 100%;
              display: block;
            }
         }
      }
    }
  }
}
</style>
<style lang="scss">
.letter{
    .padd-2{
      padding-left: 1em;
    }
    .letter-article{
        .el-scrollbar__wrap{
            overflow-x: hidden;
        }
    }
}
</style>