<template>
    <!-- 毕业 -->
    <div class="graduation" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
           <div class="graduation-contetnt clearfix">
               <div class="graduation-options">
                    <h3 class="graduation-title">持续学习的时间及流程说明</h3>
                    <p>恭喜您完成了六周的学习！迈出您成功的第一步！</p>
                    <p>为了持续的支持到您的学习，此学习系统会继续向您开放至    <b>{{courseEndDate}}</b>（系统从其学习开始日自动计算半年）。 </p>
                    <p>在此期间您仍可以听、读、看所有的学习内容，但无法再对其中的评估/反馈表进行编辑</p>
                    <p>电子版的目标规划·SP系统也将继续向您开放至     <b>{{toolEndDate}}</b>，帮助您培养出目标导向的思维和行为习惯，希望它成为支持和陪伴您不断成长的有力工具。</p>
                    <p>电子版的目标规划·SP系统到期后可以通过续费持续使用，年使用费为¥300元。</p>
                    <p>同时欢迎您分享您的学习成果，影响更多的人获得丰盛的人生，您也会因此获得<a class="navigate-btn" @click="$router.push({name:'member'})">会员权益</a>；也欢迎您成为我们的一员，详情请点击<a class="navigate-btn" @click="$router.push({name:'skip'})">加入我们</a>。</p>
                    <p>有任何问题欢迎您与我们联络。</p>
                    <!-- <div class="download-bth" v-if="liu" @click="downloadIamge(liu,'毕业证书')">下载证书</div> -->
                    <div v-if="!isEx" class="download-bth" @click="downLoadImg()">下载证书</div>
               </div>
               <div class="graduation-img-box">
                  <img :src="coachCert" alt="" v-if="this.isEx">
                   <img v-else :src="liu" alt="">
               </div>
          </div>
       </el-scrollbar>
    </div>
</template>
<script>
import { baseRequest, baseDownLoad } from '@/api/base'
import coachCert from '@/assets/images/coachCert.jpg'
import { parseTime } from '@/utils'
import { download, downloadIamge } from '@/utils/download'
export default {
  components: {
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    }
  },
  props: {
    courseId: [String, Number],
    flowNodeNo: [String, Number],
    isNewest: Boolean,
    graduationsName: String,
    isEx: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      coachCert,
      certificateUrl: '',
      courseEndDate: '',
      toolEndDate: '',
      downLoading: false,
      liu: null,
      downloadIamge
    }
  },
  created() {
    if (!this.isEx) {
      this.getData()
    }
  },
  methods: {
    getData() {
      const params = { courseId: this.courseId, flowNodeNo: this.flowNodeNo }

      if (this.graduationsName) {
        params.userName = this.graduationsName
      }
      baseRequest('/course/firstStep/initCertificate', params).then(response => {
        this.certificateUrl = response.data.item.certificateUrl
        this.courseEndDate = response.data.item.courseEndDate
        this.toolEndDate = response.data.item.toolEndDate
        if (this.courseEndDate) {
          this.courseEndDate = parseTime(this.courseEndDate, '{y}年{m}月{d}日')
        }
        if (this.toolEndDate) {
          this.toolEndDate = parseTime(this.toolEndDate, '{y}年{m}月{d}日')
        }
        this.$emit('clearGraduationsName')
        baseDownLoad('/course/firstStep/getCertificateIo', { courseId: this.courseId }).then(response => {
          this.liu = window.URL.createObjectURL(response.data)
        })
      })
    },

    downLoadImg() {
      // this.downLoading = true
      // download('/course/firstStep/getCertificateIo', { courseId: this.courseId }, _ => {
      //   this.downLoading = false
      // }, _ => {
      //   this.downLoading = false
      // })
      this.downLoading = true
      download('/course/firstStep/downLoadCertificate', { courseId: this.courseId }, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    }
  }
}
</script>
<style lang="scss">
.graduation{
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #222222;
    background-color: #fcfcfc;
    border-radius: 10px;
    border: solid 1px #dddddd;
    overflow: auto;
    .graduation-contetnt{
        margin-top:54px;
        .graduation-options{
            float:left;
            margin-left:85px;
            width: 598px;
            color: #222222;
            font-size: 16px;
            .graduation-title{
                font-size: 18px;
                margin-bottom: 10px;
            }
            p{
                line-height: 30px;
                // text-indent: 2em;
                padding-left: 2em;
                margin-bottom: 6px;
            }
            .download-bth{
                margin-top:20px;
                width: 72px;
                height: 24px;
                background-color: #00afff;
                border-radius: 4px;
                color: #ffffff;
                font-size: 14px;
                line-height: 24px;
                text-align: center;
                margin-left: 2em;
                cursor: pointer;
            }
        }
        .graduation-img-box{
            float:left;
            width: 540px;
            margin-left: 83px;
            margin-top: 35px;
            img{
                width: 100%;
                display: block;
            }
        }
    }
    .navigate-btn{
      color: #00afff;
      text-decoration: underline;
    }
}
</style>