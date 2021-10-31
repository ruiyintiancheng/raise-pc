<template>
  <div class="ambassador inside-container">
     
      <div class="partner">
         
          <div class="img">
              <img src="../../assets/shouye-img/pic8.png" alt="">
          </div>
          <div class="p1">
          <h4>亲爱的大使伙伴</h4>
          <p>我们诚挚地邀请您参与<font color="#0c86bc">睿思智得线上辅导服务平台</font>的推广工作，如果您接受邀请，将<font color="#0c86bc">成为睿思智得线上辅导服务项目的推广大使</font>。</p>
          <p>睿思智得创建和发展的信念，是立志有效帮助对自我发展、自我成长有强烈愿望的人们，在快速更迭变化发展的VUCA时代中，高效而便捷地获得系统性全方位发展的思维架构及自我成长的教练资源，<font color="#0c86bc">助力于他们实现个人成长与发展</font>。</p>
          <p>睿思智得历经12个月打造线上辅导服务平台，目的是将有效的个人目标发展和实现工具、通过线上辅导系统传递和影响更多的人，使更多的人因此获益。
          </p>
          <p><font color="#0c86bc">睿思智得线上辅导服务平台是你发展自我影响力的绝佳舞台</font>，您可以邀请连接更多希望持续自我发展的小伙伴加入学习；如果您有向专业教练发展的意向，未来您也有机会在此平台打造您的个人教练品牌，实现您的教练价值。
          </p>
          <p>如果您完成本平台的辅导项目学习，并完成睿思智得推广大使认证或讲师训认证，您即可成为睿思智得推广大使。学习过LMI任何产品或具备ICF等教练认证人员、将优先考虑。</p>
          <p><font color="#0c86bc">真诚地期待您在这个平台上共同筑梦，逐梦，圆梦—实现价值</font>。如果您有意愿加入、烦请填写《报名表》，我们会第一时间与您联系。期待您的回复</p>
      </div>
      </div>
      <div class="entry" v-if="isApply">
            <h4>大使招募报名表</h4>
                <el-form ref="form" :model="ambassadorData" size="small" :rules="rules" >
                  <div class="message">
                    <div class="left">
                <el-form-item label="">
                    <h5>大使姓名</h5>
                    <el-input v-model=name :placeholder="name" disabled></el-input>
                </el-form-item>
                <el-form-item label=""  prop="ambYear">
                    <h5 class="form-label required">销售年限</h5>
                    <el-input v-model.number="ambassadorData.ambYear" placeholder="请输入销售年限" type="ambYear"></el-input>
                </el-form-item>
                <el-form-item label=""  prop="ambEdu">
                    <h5 class="form-label required">教育背景</h5>
                   <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请填写内容（不能超过100字）"
                    class="required"
                    maxlength="100"
                    v-model="ambassadorData.ambEdu">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="ambOccHistory">
                    <h5 class="form-label required">职业经历</h5>
                   <el-input
                    type="textarea"
                    :rows="5"
                     maxlength="100"
                    placeholder="请填写内容（不能超过100字）"
                    show-word-limit
                    v-model="ambassadorData.ambOccHistory">
                    </el-input>
                </el-form-item>
            </div>
            <div class="right">
                <el-form-item label="">
                    <h5>联系方式</h5>
                    <el-input v-model="way" :placeholder=way disabled></el-input>
                </el-form-item>
                <div style="height:79px"></div>
                <el-form-item label="">
                    <h5 style="margin-top:-4.2px">其他背景</h5>
                   <el-input
                    type="textarea"
                    :rows="5"
                     maxlength="100"
                    placeholder="请填写内容（不能超过100字）"
                    show-word-limit
                    v-model="ambassadorData.ambOtherEdu">
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <h5 style="margin-top:-5.4px">社会活动</h5>
                   <el-input
                    type="textarea"
                    :rows="5"
                     maxlength="100"
                    placeholder="请填写内容（不能超过100字）"
                    show-word-limit
                    v-model="ambassadorData.ambSocialAct">
                    </el-input>
                </el-form-item>
                </div>
                </div> 
                <div style="margin-top:10px;border-top:2px dashed #aaaaaa"></div>
                <div class="other">
                    <h4>其他信息</h4>
                    <div class="other-left">
                    <el-form-item label="">
                    <h5>爱好</h5>
                   <el-input
                    type="textarea"
                    :rows="5"
                     maxlength="100"
                     show-word-limit
                    placeholder="请填写内容（不能超过100字）"
                    v-model="ambassadorData.ambLiketo">
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <h5>兴趣</h5>
                   <el-input
                    type="textarea"
                    :rows="5"
                     maxlength="100"
                     show-word-limit
                    placeholder="请填写内容（不能超过100字）"
                    v-model="ambassadorData.ambInterest">
                    </el-input>
                </el-form-item>
                </div>
                <div class="other-right">
                <el-form-item label="">
                    <h5>技能</h5>
                   <el-input
                    type="textarea"
                    :rows="5"
                     maxlength="100"
                     show-word-limit
                    placeholder="请填写内容（不能超过100字）"
                    v-model="ambassadorData.ambSkills">
                    </el-input>
                </el-form-item>
                </div>
                </div>
          </el-form>  
          <div style="margin-top:30px;border-top:2px dashed #aaaaaa"></div>
          <div class="bott">
              学习过LMI任何产品或具备ICF等教练认证人员、将优先考虑
          </div>
          <div class="sq-footer">
          <span slot="footer" >
                    <el-button type="primary" :disabled="this.applyBtn==1" @click="applyFor">{{applyText}}</el-button>
            </span>
          </div>
      </div>
      <el-dialog
                append-to-body
                :title="this.applyStatus==0 ? '':''"
                :visible.sync="applyVisible"
                class="dialog-main heightauto"
                top="5%"
                width="400px"
                destroy-on-close
                :close-on-click-modal="false">
                <success></success>
                <span slot="footer">
                    <el-button type="primary" @click="successBtn">返回首页</el-button>
                </span>
         </el-dialog>
       <firstTrial v-if="isTrial"></firstTrial>
      <confirmCoach v-if="isAmbassador"></confirmCoach>
  </div>
</template>

<script>
import firstTrial from './components/firstTrial'
import confirmCoach from './components/confirmCoach'
import success from './components/success'
import { baseRequest } from '@/api/base'
import { baseSearch } from '@/api/base'
export default {
  components: {
    firstTrial,
    confirmCoach,
    success
  },
  data() {
    return {
      ambassadorData: {
        applyName: null,
        applyPhone: null,
        ambYear: null,
        ambEdu: null,
        ambOtherEdu: null,
        ambOccHistory: null,
        ambSocialAct: null,
        ambInterest: null,
        ambLiketo: null,
        ambSkills: null
      },
      rules: {
        ambOccHistory: [
          { required: true, message: '请填写工作经历' }
        ],
        ambYear: [
          { required: true, message: '请填写销售年限' }
        ],
        ambEdu: [
          { required: true, message: '请填写教育背景' }
        ]
      },
      name: '',
      way: '',
      buttonStyle: '',
      isAmbassador: '',
      isPass: '',
      isApply: true,
      isTrial: '',
      ambassador: '',
      applyStatus: 0,
      applyVisible: false,
      applyBtn: 0,
      applyText: '立即申请'
    }
  },
  methods: {
    successBtn() {
      this.applyStatus = 0
      this.applyVisible = false
      this.$router.push({ path: '/' })
    },
    applyFor() {
      this.$refs.form.validate((valid) => {
        const params = {
          applyName: this.ambassadorData.applyName,
          applyPhone: this.ambassadorData.applyPhone,
          ambYear: this.ambassadorData.ambYear,
          ambEdu: this.ambassadorData.ambEdu,
          ambOtherEdu: this.ambassadorData.ambOtherEdu,
          ambOccHistory: this.ambassadorData.ambOccHistory,
          ambSocialAct: this.ambassadorData.ambSocialAct,
          ambInterest: this.ambassadorData.ambInterest,
          ambLiketo: this.ambassadorData.ambLiketo,
          ambSkills: this.ambassadorData.ambSkills
        }
        console.log(params)
        if (valid) {
          baseRequest('/user/rwAmbassadorApply/addAmbassadorApply', params).then(response => {
            this.applyStatus = 1
            this.applyVisible = true
            this.applyBtn = 1
            this.applyText = '审核中'
            this.isTrial = true
            this.isApply = false
          })
        } else {
          return
        }
      })
    }
  },
  created() {
    baseSearch('/user/rwUser/getPersonalUserInfo').then(response => {
      this.loading = false
      this.name = response.data.item.userName
      this.way = response.data.item.loginName
      this.applyName = response.data.item.userName
      this.ambassador = response.data.item.ambassador
      this.ambassadorType = response.data.item.ambassadorType
      if (this.ambassador) {
        this.isAmbassador = true
        this.isApply = false
      }
      if (this.ambassadorType === 'button') {
        this.isAmbassador = false
        this.isApply = true
      }
      if (this.ambassadorType === 'disabled') {
        this.isAmbassador = false
        this.isApply = false
        this.isTrial = true
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.ambassador{
    margin-top:30px;
    margin-bottom:30px;
    h5{font-size: 13px;font-family: 'PingFangSC-Regular'}
    .partner{
        width: 1440px;
        height: 350px;
        background-color: #fff;
        box-shadow:0 2px 10px 0 rgba(0,0,0,0.1);
        border-radius:10px;
        margin-bottom:20px;
        padding:50px;
        position: relative;
        padding-bottom:30px;
        .img{
            position: absolute;
            top:85px;
            left:50px;
        }
        .p1{
            width: 1030px;
            position: absolute;
            top:50px;
            right:50px;
        h4{font-size: 20px;color:#222222;margin-bottom:20px}
        p{font-size:14px;word-wrap:break-word;line-height: 24px;font-family: 'PingFangSC-Regular';text-align: left;}
        }
    }
    .entry{
        width: 1440px;
        background-color: #fff;
        box-shadow:0 2px 10px 0 rgba(0,0,0,0.1);
        border-radius:10px;
        padding:50px;
        position: relative;
         h4{font-size: 20px;color:#222222;margin-bottom:20px}
         .message{
           width: 1340px;
           height: 472px;
         }
         .left{
           float: left;
           width: 645px;
             height: 450px;
             color: #222222;
             font-size: 14px;
             font-family: 'PingFangSC-Semibold'
         }
    .right{
             float: right;
             width: 645px;
             height: 450px;
             color: #222222;
             font-size: 14px;
             font-family: 'PingFangSC-Semibold'
             }
    .other{
        margin-top: 30px;
        position: relative;
         height: 332px;
         width: 1340px;
         h4{
             font-size: 16px;
             color: #222222;
             font-family: 'PingFangSC-Regular';
             margin-bottom:20px;
         }
         .other-left{
             width: 646px;
             position: absolute;
             left:0;
             top:36px;
         }
         .other-right{
             width: 646px;
             position: absolute;
             right:0;
             top:36px;
         }
    }
    .bott{
        height: 73px;
        padding:30px 0;
        color: #fb664a;
        font-size:13px;
        font-family: PingFangSC-Regular;
         }
     }
      .el-input--small .el-input__inner {
    height: 40px;
    line-height:40px;
    }
}
</style>