<template>
  <el-dialog
  id="trial"
  title="初审"
  :visible.sync="dialogtrials"
  width="520px"
  top="10vh"
  :close-on-click-modal="false">
    <div class="box-middle">
      <div class="title1-box">
         <h4 class="title1">教练姓名：</h4>
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
         <h4 class="title4">教练年限：</h4>
         <div class="title4-text">{{item.coachYear}}</div>
      </div>
      <div class="title5-box">
         <h4 class="title5">教育背景：</h4>
         <div class="title5-text">{{item.cocahEdu}}</div>
      </div>
     <div class="title6-box">
         <h4 class="title6">其他背景：</h4>
         <div class="title6-text">{{item.cocahOtherEdu}}</div>
      </div>
      <div class="title7-box">
         <h4 class="title7">每周课工作小时数：</h4>
         <div class="title7-text">{{item.cocahWorkTime}}</div>
      </div>
      <div class="title8-box">
         <h4 class="title8">职业经历：</h4>
         <div class="title8-text">{{item.cocahOccHistory}}</div>
      </div>
      <div class="title9-box">
         <h4 class="title9">社会活动：</h4>
      </div>
      <div class="title10-box">
         <h4 class="title10">其他信息：</h4>
         <div class="title10-text"></div>
      </div>
      <div class="title11-box">
         <h4 class="title11">爱好：</h4>
         <div class="title11-text">{{item.cocahLiketo}}</div>
      </div>
      <div class="title12-box">
         <h4 class="title12">技能：</h4>
         <div class="title12-text">{{item.cocahSkills}}</div>
      </div>
      <div class="title13-box">
         <h4 class="title13">兴趣：</h4>
         <div class="title13-text">{{item.cocahInterest}}</div>
      </div>
      <div class="title14-box">
         <h4 class="title14">申请日期：</h4>
         <div class="title14-text">{{item.auditTime}}</div>
      </div>
    </div>
    <div class="button-box" style="margin-top:16px;margin-left:178px">
         <el-button type="primary" size="medium" class="Refused" @click="Refused(item)">拒绝</el-button>
         <el-button type="primary" size="medium" class="through" @click="through(item)">通过</el-button>
    </div>
</el-dialog>

</template>

<script>
import { baseRequest } from '../../../api/base'
export default {
  props: ['item'],
  data() {
    return {
      dialogtrials: false,
      throughtype: { auditType: '0' },
      Refusedtype: { auditType: '2' },
      productType: '1'
    }
  },
  created() {

  },
  methods: {
    through(item) {
      // console.log(item)
      const params = {
        applyId: item.applyId,
        auditType: this.throughtype.auditType,
        productType: this.productType,
        applyName: item.applyName
      }
      baseRequest('/user/rwCoachApply/updateCoachApply', params).then((response) => {
        console.log(response)
      })
      this.dialogtrials = false
    },
    Refused(item) {
      this.dialogtrials = false
      const params = {
        applyId: item.applyId,
        auditType: this.Refusedtype.auditType,
        applyName: item.applyName
      }
      baseRequest('/user/rwCoachApply/updateCoachApply', params).then((response) => {
        console.log(response)
      })
    }

  }
}
</script>

<style lang="scss" >
#trial .el-dialog{
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
           margin-right:150px;
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
           margin-right:80px;
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
           margin-right:80px;
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
           margin-right:80px;
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
           margin-right:80px;
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
           margin-right:80px;
           float: right;
          }
     }
     .title7-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title7{
           width: 170px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:18px;
          }
          .title7-text{
          width: 87px;
          font-size:18px;
           height: 100%;
           margin-right:144px;
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
           margin-right:80px;
           float: right;
          }
          .title8-text1{
           width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:80px;
           margin-top:5px;
           float: right;
          }
          .title8-text2{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-top:5px;
           margin-right:80px;
           float: right;
          }
          .title8-text3{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-top:5px;
           margin-right:80px;
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
           margin-right:80px;
           margin-top:5px;
           float: right;
          }
          .title9-text2{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:80px;
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
           margin-right:80px;
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
           margin-right:80px;
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
           margin-right:80px;
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
           margin-right:80px;
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
          width: 180px;
          font-size:18px;
           height: 100%;
           margin-right:58px;
           float: right;
          }
     }
     .button-box{
         width: 184px;
         height: 37.5px;
         margin-left:155px;
         margin-top:50px;
          .Refused{
              float: left;
          }
          .through{
              float: right;
          }
     }
}
}
</style>