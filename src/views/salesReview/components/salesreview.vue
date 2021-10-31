<template>
  <el-dialog
  id="salesreview"
  title="复审"
  :visible.sync="dialogsalesreview"
  width="630px"
  top="10vh"
  destroy-on-close
  :before-close="handleClose"
  :close-on-click-modal="false">
    <div class="box-middle">
      <div class="title1-box">
         <h4 class="title1">销售姓名：</h4>
         <div class="title1-text">{{item.applyName}}</div>
      </div>
      <div class="title2-box">
         <h4 class="title2">联系方式：</h4>
         <div class="title2-text">{{item.applyPhone}}</div>
      </div>
      <div class="title3-box">
         <h4 class="title3">资质证书：</h4>
         <div class="title3-text">{{item.applyDesc}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">销售年限：</h4>
         <div class="title4-text">{{item.ambYear}}</div>
      </div>
      <div class="title5-box">
         <h4 class="title5">教育背景：</h4>
         <div class="title5-text">{{item.ambEdu}}</div>
      </div>
     <div class="title6-box">
         <h4 class="title6">其他背景：</h4>
         <div class="title6-text">{{item.ambOtherEdu}}</div>
      </div>
      <div class="title7-box">
         <h4 class="title7">每周课工作小时数：</h4>
         <div class="title7-text"></div>
      </div>
      <div class="title8-box">
         <h4 class="title8">职业经历：</h4>
         <div class="title8-text">{{item.ambOccHistory}}</div>
      </div>
      <div class="title9-box">
         <h4 class="title9">社会活动：</h4>
         <div class="title9-text1">{{item.ambSocialAct}}</div>
      </div>
      <div class="title10-box">
         <h4 class="title10">其他信息：</h4>
         <div class="title10-text"></div>
      </div>
      <div class="title11-box">
         <h4 class="title11">爱好：</h4>
         <div class="title11-text">{{item.ambLiketo}}</div>
      </div>
      <div class="title12-box">
         <h4 class="title12">技能：</h4>
         <div class="title12-text">{{item.ambSkills}}</div>
      </div>
      <div class="title13-box">
         <h4 class="title13">兴趣：</h4>
         <div class="title13-text">{{item.ambInterest}}</div>
      </div>
      <div class="title14-box">
         <h4 class="title14">申请日期：</h4>
         <div class="title14-text">{{item.reviewTime}}</div>
      </div>
      <el-form  :model="form" ref="refForm" :rules="rules" class="xsshfs">
          <el-form-item label="销售方式：" class="rebateIdstyle" prop="rebateId" style="margin-top:24px; margin-left:16px;font-size:16px">
          <el-select v-model="form.rebateId" placeholder="请选择" style="margin-left:91px;width:161px">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
          </el-select>
          </el-form-item>    
          <el-form-item prop="rebateItem" class="rebateItemstyle" style="margin-left:212px;margin-top:0px" v-if="form.rebateId==='13'"> 
             <el-radio-group v-model="form.rebateItem" >
               <el-radio :label="6">2班/8人</el-radio>
               <el-radio :label="8">4班/16人</el-radio>
             </el-radio-group>
          </el-form-item>
         <el-form-item prop="signType" class="signTypestyle" style="margin-left:212px;margin-top:-16px" v-if="form.rebateId==='13'">
           <el-radio-group v-model="form.signType" >
               <el-radio label="0">课程</el-radio>
               <el-radio label="1" style="margin-left:23px">金额</el-radio>
           </el-radio-group>
         </el-form-item>
          <el-form-item label="有效期：" class="beginTimestyle" prop="beginTime" style=" margin-left:32px;font-size:16px;margin-top:0px" :inline="true">
             <el-date-picker type="date"
              placeholder="选择日期开始"
              :picker-options="pickerOptionsStart"
              value-format='yyyy-MM-dd'
         v-model="form.beginTime" 
               style="margin-left:93px;width:160px">
               </el-date-picker>
          </el-form-item>
             <span style="margin-left:378px;margin-top:-46px;display:block">至</span>
        <el-form-item prop="endTime" class="endTimestyle">
          <el-date-picker  class="data-item"
            style="width:160px;margin-left:401px;margin-top:-31px;display: block;"
           :picker-options="pickerOptionsEnd" 
            type="date" 
            placeholder="选择日期结束" 
            value-format='yyyy-MM-dd'
            v-model="form.endTime" >
            </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-box" style="margin-top:16px;margin-left:212px">
         <el-button type="primary" size="medium" class="Refused" @click="Refused('refForm',item)">拒绝</el-button>
         <el-button type="primary" size="medium" class="through" @click="through('refForm',item)">通过</el-button>
       </div>
</el-dialog>

</template>

<script>
import { baseRequest } from '../../../api/base'
export default {
  props: ['item'],
  data() {
    return {
      dialogsalesreview: false,
      options: [
        {
          value: '12',
          label: '台阶'
        },
        {
          value: '13',
          label: '一次性'
        }, {
          value: '14',
          label: '年度签约'
        }, {
          value: '15',
          label: '代理'
        }],
      value: '',
      form: {
        type: '',
        endTime: '',
        beginTime: '',
        rebateId: '',
        rebateItemId: '',
        rebateItem: '',
        signType: ''
      },
      throughtype: { auditType: '0' },
      Refusedtype: { auditType: '2' },
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.form.endTime !== '') {
            let date = this.form.endTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() > newDate
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.form.beginTime !== '') {
            let date = this.form.beginTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      },
      rules: {
        rebateId: [
          { required: true, message: '请选择销售方式', trigger: 'blur' }
        ],
        beginTime: [
          { required: true, message: '请选择日期开始', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择日期结束', trigger: 'blur' }
        ],
        rebateItem: [
          { required: true, message: '请选择班级人数', trigger: 'blur' }
        ],
        signType: [
          { required: true, message: '请选择课程或金额', trigger: 'blur' }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    handleClose(done) {
      this.form.rebateId = ''
      this.form.endTime = ''
      this.form.rebateItem = ''
      this.form.signType = ''
      this.dialogsalesreview = false
    },
    through(refForm, item) {
      this.$refs[refForm].validate((valid) => {
        if (valid) {
          const params = {
            applyId: item.applyId,
            productId: item.productId,
            auditType: this.throughtype.auditType,
            beginTime: this.form.beginTime,
            endTime: this.form.endTime,
            rebateId: this.form.rebateId,
            applyName: item.applyName
          }
          if (this.form.rebateId === '13') {
            params.rebateItem = this.form.rebateItem
            params.signType = this.form.signType
          }
          console.log(params)
          baseRequest('/user/rwAmbassadorApply/updateAmbassadorApply', params).then((response) => {
            console.log(response)
          })
          this.$refs[refForm].resetFields()
          this.dialogsalesreview = false
        } else {
          return false
        }
      })
    },
    Refused(refForm, item) {
      this.$refs[refForm].validate((valid) => {
        if (valid) {
          const params = {
            applyId: item.applyId,
            productId: item.productId,
            auditType: this.Refusedtype.auditType,
            beginTime: this.form.beginTime,
            endTime: this.form.endTime,
            applyName: item.applyName,
            rebateId: this.form.rebateId
          }
          if (this.form.rebateId === '13') {
            params.rebateItem = this.form.rebateItem
            params.signType = this.form.signType
          }
          baseRequest('/user/rwAmbassadorApply/updateAmbassadorApply', params).then((response) => {
            console.log(response)
          })
          this.$refs[refForm].resetFields()
          this.dialogsalesreview = false
        } else {
          return false
        }
      })
    }

  }
}
</script>

<style lang="scss" >
#salesreview .el-dialog{
height: 80%;

border-radius: 10px;
background-color: #F3F3F3;
.el-dialog__header {
    height: 52px;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    border-radius: 10px;
    color: #222222;
      .el-dialog__headerbtn {
      position: absolute;
      height: 20px;
      width: 20px;
      top: 20px;
      right: 21px;
      padding: 0;
      background: #222222;
      border: none;
      outline: 0;
      cursor: pointer;
      font-size: 16px;
      border-radius: 50%;
}
  .el-dialog__headerbtn .el-dialog__close {
         color: #ffffff;
} 

}

.box-middle{
    .el-form-item__label{
    font-size: 16px;
}
   // dialog高自适应
   max-height:100% !important;
   overflow: auto;

    width: 100%;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px 20px 20px 20px;
     .title1-box{
         width: 100%;
         height: 18px;
          .title1{
           width: 91px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left: 17px;
          }
          .title1-text{
          width: 80px;
          font-size:18px;
           height: 100%;
           margin-right:273px;
           float: right;
          }
     }
     .title2-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title2{
           width: 90px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:17px;
          }
          .title2-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:204px;
           float: right;
          }
     }
     .title3-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title3{
           width: 100px;
           height: 100%;
           margin-left:18px;
           float: left;
           font-size:18px;
          }
          .title3-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           float: right;
           margin-right:204px;
          }
     }
     .title4-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title4{
           width: 100px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:18px;
          }
          .title4-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:204px;
           float: right;
          }
     }
     .title5-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title5{
           width: 100px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:18px;
          }
          .title5-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:204px;
           float: right;
          }
     }
     .title6-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title6{
           width: 100px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:18px;
          }
          .title6-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:204px;
           float: right;
          }
     }
     .title7-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title7{
           width: 165px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:18px;
          }
          .title7-text{
          width: 87px;
          font-size:18px;
           height: 100%;
           margin-right:265px;
           float: right;
          }
     }
     .title8-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title8{
           width: 100px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:18px;
          }
          .title8-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:206px;
           float: right;
          }
          .title8-text1{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:206px;
           margin-top:5px;
           float: right;
          }
          .title8-text2{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-top:5px;
           margin-right:206px;
           float: right;
          }
          .title8-text3{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-top:5px;
           margin-right:206px;
           float: right;
          }
     }
     .title9-box{
         width: 100%;
         height: 18px;
         margin-top: 90px;
          .title9{
           width: 100px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:18px;
          }
          .title9-text1{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:206px;
           float: right;
          }
          .title9-text2{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:206px;
           margin-top:5px;
           float: right;
          }
     }
     .title10-box{
         width: 100%;
         height: 18px;
         margin-top: 43px;
          .title10{
           width: 100px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:18px;
          }
          .title10-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:206px;
           float: right;
          }
     }
     .title11-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title11{
           width: 56px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:54px;
          }
          .title11-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:206px;
           float: right;
          }
     }
     .title12-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title12{
           width: 56px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:54px;
          }
          .title12-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:206px;
           float: right;
          }
     }
     .title13-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title13{
           width: 56px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:54px;
          }
          .title13-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:206px;
           float: right;
          }
     }
     .title14-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title14{
           width: 90px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:17px;
          }
          .title14-text{
          width: 190px;
          font-size:18px;
           height: 100%;
           margin-right:165px;
           float: right;
          }
     }
     .button-box{
         width: 184px;
         height: 37.5px;
         margin-left:225px;
         margin-top:20px;
          .Refused{
              float: left;
          }
          .through{
              float: right;
          }
     }
}
.rebateIdstyle{
   .el-form-item__error {
    margin-left:198px;
}
}
.beginTimestyle{
   .el-form-item__error {
    margin-left:184px;
}
}
.endTimestyle{
   .el-form-item__error {
    margin-left:409px;
}
}
.rebateItemstyle{
   .el-form-item__error {
    margin-left:5px;
    margin-top:-10px;
}
}
.signTypestyle{
   .el-form-item__error {
    margin-left:5px;
    margin-top:-10px;
}
}
}
</style>