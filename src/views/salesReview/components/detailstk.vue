<template>
  <el-dialog
  class="detailstk"
  title="销售详情"
  :visible.sync="dialogdetails"
  top="6vh"
  width="520px"
  :close-on-click-modal="false">
    <div class="box-middle">
      <div class="title1-box">
         <h4 class="title1">姓名：</h4>
         <div class="title1-text">{{item.applyName}}</div>
      </div>
      <div class="title2-box">
         <h4 class="title2">注册手机号：</h4>
         <div class="title2-text">{{item.loginName}}</div>
      </div>
      <div class="title3-box">
         <h4 class="title3">联系方式：</h4>
         <div class="title3-text">{{item.applyPhone}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">申请时间：</h4>
         <div class="title4-text">{{item.applyTime}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">初审ID：</h4>
         <div class="title4-text">{{item.auditId}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">初审时间：</h4>
         <div class="title4-text">{{item.auditTime}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">初审结果：</h4>
         <div class="title4-text">{{item.auditType}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">教练年限：</h4>
         <div class="title4-text">{{item.coachYear}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">教育背景：</h4>
         <div class="title4-text">{{item.cocahEdu}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">兴趣：</h4>
         <div class="title4-text">{{item.cocahInterest}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">爱好：</h4>
         <div class="title4-text">{{item.cocahLiketo}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">职业经历：</h4>
         <div class="title4-text">{{item.cocahOccHistory}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">其他背景：</h4>
         <div class="title4-text">{{item.cocahOtherEdu}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">技能：</h4>
         <div class="title4-text">{{item.cocahSkills}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">社会活动：</h4>
         <div class="title4-text">{{item.cocahSocialAct}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">工作时长：</h4>
         <div class="title4-text">{{item.cocahWorkTime}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">产品ID：</h4>
         <div class="title4-text">{{item.productId}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">复审ID：</h4>
         <div class="title4-text">{{item.reviewId}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">复审时间：</h4>
         <div class="title4-text">{{item.reviewTime}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">复审状态：</h4>
         <div class="title4-text">{{item.reviewType}}</div>
      </div>
       
    </div>
</el-dialog>

</template>

<script>
// import { baseRequest } from '@/api/base'
export default {
  props: ['item'],
  data() {
    return {
      dialogdetails: false,
      form: {
        bank: '',
        email: '',
        date1: ''
      },
      value: ''
    }
  },
  methods: {
    //  through() {
    //    this.dialogdetails = false
    //  },
    //  Refused() {
    //    this.dialogdetails = false
    //  }
  }
}
</script>

<style lang="scss" >
.detailstk .el-dialog{
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
           width: 70px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left: 54px;
          }
          .title1-text{
          width: 80px;
          font-size:18px;
           height: 100%;
           margin-right:156px;
           float: right;
          }
     }
     .title2-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title2{
           width: 109px;
           height: 100%;
           float: left;
           font-size:18px;
          }
          .title2-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:85px;
           float: right;
          }
     }
     .title3-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title3{
           width: 93px;
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
           margin-right:85px;
          }
     }
     .title4-box{
         width: 100%;
         height: 18px;
         margin-top: 24px;
          .title4{
           width: 93px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:18px;
          }
          .title4-text{
          width: 171px;
          font-size:18px;
           height: 100%;
           margin-right:63px;
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