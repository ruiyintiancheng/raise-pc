<template>
  <el-dialog
  class="detailstk"
  title="销售方式"
  :visible.sync="dialogdetails"
  width="400px"
  :close-on-click-modal="false">
    <div class="box-middle">
      <div class="title1-box">
         <h4 class="title1">姓名：</h4>
         <div class="title1-text">王五</div>
      </div>
      <div class="title2-box">
         <h4 class="title2">注册手机号：</h4>
         <div class="title2-text">15810976644</div>
      </div>
      <div class="title3-box">
         <h4 class="title3">联系方式：</h4>
         <div class="title3-text">15810976644</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">申请日期：</h4>
         <div class="title4-text">2020年2月3日</div>
      </div>
       <el-form ref="refForm" :model="form" >
          <el-form-item label="可售课程：" style="margin-top:48px;margin-left:31px" prop="bank" >
            <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效期：" style="margin-left:46px">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width:222px"></el-date-picker>
         </el-form-item>
       </el-form>
       <div class="button-box">
         <el-button type="primary" size="medium" class="Refused" @click="Refused">拒绝</el-button>
         <el-button type="primary" size="medium" class="through" @click="through">通过</el-button>
       </div>
    </div>
</el-dialog>

</template>

<script>
export default {
  data() {
    return {
      dialogdetails: false,
      form: {
        bank: '',
        email: '',
        date1: ''
      },
      options: [{
        value: '选项1',
        label: '台阶'
      }, {
        value: '选项2',
        label: '一次性'
      }, {
        value: '选项3',
        label: '年度签约'
      }, {
        value: '选项4',
        label: '代理'
      }],
      value: ''
    }
  },
  methods: {
    through() {
      this.dialogdetails = false
    },
    Refused() {
      this.dialogdetails = false
    }
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
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:82px;
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