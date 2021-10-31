<template>
    <!-- 小组会议 -->
    <div class="talk-meeting-coach" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
           <div class="scrollbar-boX">
             <div class="coach-info">
               <div class="coach-head clearfix">
                 <div style="float:left;">
                    <div class="coach-item clearfix">
                      <div class="coach-label"><span class="icon_blank"><svg-icon icon-class="icon-jiaolian2" /></span>教练姓名：</div>
                      <div class="coach-value">{{coachInfo.coachName}}</div>
                    </div>
                    <div class="coach-item clearfix" v-if="coachInfo.coachIntro">
                      <div class="coach-label"><span class="icon_blank"></span>教练简介：</div>
                      <div class="coach-value">{{coachInfo.coachIntro}}</div>
                    </div>
                  </div>

                  <div style="float:left;">
                    <div class="coach-item clearfix">
                      <div class="coach-label" style="margin-right:50px;"><span class="icon_blank"></span>联系方式：</div>
                      <div class="coach-value" style="width:auto;text-align:center;" v-if="coachInfo.coachQrCode">
                        <img :src="coachInfo.coachQrCode" style="width: 400rpx;"/>
                        <span style="margin-top:10px;font-size: 12px;">扫码添加教练微信</span>
                      </div>
                      <div v-else class="coach-value" style="width:auto;text-align:center;">
                        {{coachInfo.loginName}}
                      </div>
                    </div>
                  </div>
               </div>
               <div class="coach-other">
                    <div class="coach-item">
                      <div class="coach-label"><span class="icon_blank">●</span>关于预约：</div>
                      <div class="coach-value">
                      <p>关于预约：每次会谈均需提前预约，请按上面的联络方式联系您的教练，共同商议确定会谈时间；</p>
                      <p> 每次会谈可享一次修改时间的机会，如需调整时间，请提前24小时告知教练进行修改。</p>
                      </div>
                    </div>
               </div>
                <div class="coach-other">
                    <div class="coach-item">
                      <div class="coach-label"><span class="icon_blank">●</span>会谈方式：</div>
                      <div class="coach-value">
                      <p>会谈方式：线下语音或视频。请提前在PC端或手机端安装好Zoom：https://zoom.com.cn/download,以便顺利进入会谈。</p>
                      </div>
                    </div>
               </div>
              <div class="coach-other">
                    <div class="coach-item">
                      <div class="coach-value">
                      <p>注意事项：所有的会谈均通过睿思智得线上辅导平台进行操作，为保障您的权益，请勿私下联系教练进行交易；若教练引导私下交易，可在官网首页添加客服二维码或在“帮助中心”点击留言进行投诉。</p>
                      </div>
                    </div>
               </div>
             </div>
           </div>
       </el-scrollbar>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
export default {
  components: {
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    }
  },
  props: {
    recordId: [String, Number]
  },
  data() {
    return {
      coachInfo: {}
    }
  },
  created() {
    this.getCoachInfo()
  },
  mounted() {
  },
  methods: {
    getCoachInfo() {
      baseRequest('/course/oneToOne/getCoachInfo', { recordId: this.recordId }).then(response => {
        this.coachInfo = response.data.item
      })
    }
  }
}
</script>
<style lang="scss">
.talk-meeting-coach{
    position: relative;
    padding:30px;
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
    padding-right: 0;
   .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .coach-info{
      padding: 20px 40px 0;
      .coach-head{
        margin-bottom: 20px;
        .coach-item{
          margin-right: 12px;
          margin-bottom: 10px;
          .coach-label{
            float: left;
            font-weight: bold;
            .icon_blank{
              width: 20px;
              margin-right: 20px;
              display: inline-block;
              color: #00afff;
            }
          }
          .coach-value{
            float: left;
            width: 400px;
            img{
              width: 120px;
              display: block;
            }
          }
        }
      }
      .coach-other{
         margin-bottom: 20px;
         .coach-item{
          margin-bottom: 10px;
          .icon_blank{
              width: 20px;
              margin-right: 20px;
              display: inline-block;
              color: #00afff;
            }
          .coach-label{
            font-weight: bold;
          }
          .coach-value{
            padding-left: 40px;
            margin-top: 5px;
          }
        }
      }
    }
}
</style>