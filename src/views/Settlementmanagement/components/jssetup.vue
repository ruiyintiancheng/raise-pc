<template>
  <el-dialog
  id="jssetup"
  title="返利详情"
  :visible.sync="dialogsalejssetup"
  width="666px"
  top="9vh"
  destroy-on-close
  :before-close="handleClose"
  close-on-click-modal>
    <div class="box-middle">
      <div class="title1-box">
         <h4 class="title1">用户：</h4>
         <div class="title1-text">{{row.userName}}</div>
      </div>
      <div class="title2-box">
         <h4 class="title2">手机号：</h4>
         <div class="title2-text">{{row.cellphone}}</div>
      </div>
      <div class="title3-box">
         <h4 class="title3">销售产品：</h4>
         <div class="title3-text">{{row.productName}}</div>
      </div>
      <div class="title4-box">
         <h4 class="title4">销售方式：</h4>
         <div class="title4-text">{{row.rebateName}}</div>
      </div>
      <div class="title5-box">
         <h4 class="title5">结算日期：</h4>
         <div class="title5-text">{{row.settlementTime}}</div>
      </div>
     <div class="title6-box">
         <h4 class="title6">结算金额：</h4>
         <div class="title6-text">{{row.amount}}</div>
      </div>
      <el-form  :model="form" :rules="rules" ref="ruleForm" class="flxq">
         <el-form-item label="实际返利："
     prop="factAmount" style="margin-bottom:24px;margin-left:10px;font-size:18px" class="sjflstyle">
       <el-input v-model="form.factAmount"   style="width:210px;margin-left: 18px;"></el-input>
     </el-form-item>

          <el-form-item label="返利日期：" prop="beginTime" class="fldatestyle" style=" margin-left:11px;font-size:16px;margin-top:0px !important" :inline="true">
             <el-date-picker type="date"
              placeholder="选择返利日期开始"
              :picker-options="pickerOptionsStart"
              value-format='yyyy-MM-dd'
               v-model="form.beginTime" 
               style="margin-left:17px;width:208px">
               </el-date-picker>
          </el-form-item>
             <span style="margin-left:354px;margin-top:-48px;display: block;">至</span>
        <el-form-item prop="endTime" class="data-item">
            <el-date-picker  
             style="width:208px;margin-left:374px;margin-top:-27px;display: block;"
            :picker-options="pickerOptionsEnd" 
             type="date" 
             placeholder="选择返利日期结束" 
             value-format='yyyy-MM-dd'
             v-model="form.endTime" >
        </el-date-picker>
        </el-form-item>

           <el-form-item label="银行流水号："
     prop="accountStatement" style="margin-bottom:24px;margin-left:-6px" class="yhlshstyle">
       <el-input v-model="form.accountStatement"   style="width:330px;margin-left: 17px;"></el-input>
     </el-form-item>
      <el-form-item label="备注："
     prop="remark" style="margin-bottom:24px;margin-left:49px !important" class="notestyle">
       <el-input v-model="form.remark"  type="textarea" style="width:330px;margin-left: 17px !important;"></el-input>
     </el-form-item>
      </el-form>
    </div>
    <div class="button-box"  style="margin-top:17px;margin-left:250px">
         <el-button type="primary" size="medium" style="margin-bottom:15px;" class="Refused" @click="Refused('ruleForm')">清空</el-button>
         <el-button type="primary" size="medium" class="through" @click="through('ruleForm')">确定</el-button>
       </div>
</el-dialog>

</template>

<script>
import { baseRequest } from '@/api/base'
export default {
  props: ['row'],
  data() {
    return {
      dialogsalejssetup: false,
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
        endTime: '',
        beginTime: '',
        factAmount: '',
        accountStatement: '',
        remark: ''
      },
      rules: {
        beginTime: [
          { required: true, message: '请输入返利开始日期', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请输入返利结束日期', trigger: 'blur' }
        ],
        factAmount: [
          { required: true, message: '请输入实际返利', trigger: 'blur' }
        ],
        accountStatement: [
          { required: true, message: '请输入银行流水号', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入正确的银行流水' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
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
      }
    }
  },
  created() {

  },
  methods: {
    handleClose(done) {
      this.form.rebate = ''
      this.form.endTime = ''
      this.form.beginTime = ''
      this.form.Serialnumber = ''
      this.form.note = ''
      this.dialogsalejssetup = false
    },
    through(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const params = {
            factAmount: this.form.factAmount,
            accountStatement: this.form.accountStatement,
            remark: this.form.remark,
            factTime: `${this.form.beginTime}-${this.form.endTime}`
          }
          baseRequest('/finance/rwRebateSettlement/updateFactAmount', params).then((response) => {
          })
          this.dialogsalejssetup = false
          this.$refs[ruleForm].resetFields()
        } else {
          return false
        }
      })
    },
    Refused(ruleForm) {
      this.$refs[ruleForm].resetFields()
    }

  }
}
</script>

<style lang="scss">
#jssetup .el-dialog{
// height: 80%;

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
    font-size: 18px;
}
  //  dialog高自适应
  //  max-height:100% !important;
  //  overflow: auto;

  //   width: 100%;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px 20px 20px 20px;
 .sjflstyle{
     .el-form-item__error {
    margin-left:137px;
}
 }
 .fldatestyle{
     .el-form-item__error {
    margin-left:137px;
}
 }
 .yhlshstyle{
     .el-form-item__error {
    margin-left:153px;
}
 }
 .data-item{
   .el-form-item__error {
    margin-left:383px;
}
 }
 .notestyle{
     .el-form-item__error {
    margin-left:103px;
}
 }

     .title1-box{
         width: 511px;
         height: 18px;
         margin-left:36px;
          .title1{
           width: 70px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left: 17px;
          }
          .title1-text{
          width: 80px;
          font-size:18px;
           height: 100%;
           margin-right:326px;
           float: right;
          }
     }
     .title2-box{
         width: 511px;
         height: 18px;
         margin-top: 24px;
         margin-left:18px;
          .title2{
           width: 80px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:17px;
          }
          .title2-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:238px;
           float: right;
          }
     }
     .title3-box{
         width: 606px;
         height: 18px;
         margin-top: 24px;
          .title3{
           width: 97px;
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
           margin-right:312px;
          }
     }
     .title4-box{
         width: 606px;
         height: 18px;
         margin-top: 24px;
          .title4{
           width: 97px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:19px;
          }
          .title4-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:310px;
           float: right;
          }
     }
     .title5-box{
         width: 606px;
         height: 18px;
         margin-top: 24px;
          .title5{
           width: 97px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:19px;
          }
          .title5-text{
          width: 180px;
          font-size:18px;
           height: 100%;
           margin-right:280px;
           float: right;
          }
     }
     .title6-box{
         width: 606px;
         height: 18px;
         margin-top: 24px;
         margin-bottom:24px;
          .title6{
           width: 97px;
           height: 100%;
           float: left;
           font-size:18px;
           margin-left:20px;
          }
          .title6-text{
          width: 150px;
          font-size:18px;
           height: 100%;
           margin-right:310px;
           float: right;
          }
     }
     .button-box{
        
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