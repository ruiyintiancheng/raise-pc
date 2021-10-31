<template>
  <el-dialog
  id="jssetup"
  title="设置"
  :visible.sync="dialogsalejssetup"
  width="630px"
  top="6vh"
  destroy-on-close
  close-on-click-modal>
    <div class="box-middle">
      <el-form  :model="form" label-position="right" label-width="150px" :rules="rules" ref="ruleForm" class="flxq">
        <el-form-item label="用户：" style="margin-bottom:14px;margin-left:42px" >
         <div class="">{{row.userName}}</div>
        </el-form-item>
        <el-form-item label="手机号：" style="margin-bottom:14px;margin-left:42px" >
         <div class="">{{row.loginName}}</div>
        </el-form-item>
         <el-form-item label="销售产品：" style="margin-bottom:14px;margin-left:42px" >
         <div class="">{{row.productName}}</div>
        </el-form-item>
         <el-form-item label="销售方式：" style="margin-bottom:14px;margin-left:42px" >
         <div class="">{{row.name}}</div>
        </el-form-item>
        <el-form-item label="销售人数：" style="margin-bottom:14px;margin-left:42px" >
         <div class="">{{row.personCount}}</div>
        </el-form-item>
        <el-form-item label="结算日期：" style="margin-bottom:14px;margin-left:42px" >
         <div class="">{{row.settlementTime}}</div>
        </el-form-item>
        <el-form-item label="结算金额：" style="margin-bottom:14px;margin-left:42px" >
         <div class="">{{row.amount}}</div>
        </el-form-item>
         <el-form-item label="实际返利："
     prop="factAmount" style="margin-bottom:20px;margin-left:42px" class="sjflstyle">
       <el-input v-model="form.factAmount"   style="width:300px;"></el-input>
     </el-form-item>
          <el-form-item label="返利日期：" prop="factTime" class="fldatestyle" style="margin-bottom:20px;margin-left:42px" :inline="true">
             <el-date-picker type="date"
              placeholder="选择返利日期开始"
              :picker-options="pickerOptionsStart"
              value-format='yyyy-MM-dd'
               v-model="form.factTime" 
               style="width:300px">
               </el-date-picker>
          </el-form-item>
           <el-form-item label="银行流水账号："
     prop="accountStatement" style="margin-bottom:20px;margin-left:42px" class="yhlshstyle">
       <el-input v-model="form.accountStatement" type="textarea" maxlength="100"  style="width:300px;"></el-input>
     </el-form-item>
      <el-form-item label="备注：" prop="remark" style="margin-bottom:14px;margin-left:42px" class="notestyle">
       <el-input v-model="form.remark"  type="textarea" maxlength="100" style="width:300px;"></el-input>
     </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
         <el-button @click="Refused('ruleForm')">清空</el-button>
         <el-button type="primary" @click="through('ruleForm')">确定</el-button>
       </span>
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
        factTime: '',
        factAmount: '',
        accountStatement: '',
        remark: ''
      },
      codeId: '',
      rules: {
        factTime: [
          { required: true, message: '请选择返利日期', trigger: 'blur' }
        ],
        factAmount: [
          { required: true, message: '请输入实际返利', trigger: 'blur' }
        ],
        accountStatement: [
          { required: true, message: '请输入银行流水号', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入正确的银行流水' }
        ]
      },
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.form.factTime !== '') {
            // let date = this.formfactTime + ' 00:00:00'
            // date = date.replace(/-/g, '/')
            const newDate = new Date().getTime()
            return time.getTime() > newDate
          }
        }
      }
    }
  },
  created() {

  },

  methods: {
    // 信息回显
    massageEcho(row) {
      this.codeId = row.id
      baseRequest('/finance/rwRebateSettlement/select', { id: row.id }).then((response) => {
        this.form.factTime = response.data.item.factTime
        this.form.factAmount = response.data.item.factAmount
        this.form.accountStatement = response.data.item.accountStatement
        this.form.remark = response.data.item.remark
      })
    },
    through(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            id: this.codeId,
            factAmount: this.form.factAmount,
            accountStatement: this.form.accountStatement,
            remark: this.form.remark,
            factTime: this.form.factTime
          }
          baseRequest('/finance/rwRebateSettlement/update', params).then((response) => {
            this.dialogsalejssetup = false
            this.$emit('refresh')
          })
        } else {
          return false
        }
      })
    },
    Refused(formName) {
      this.$refs[formName].resetFields()
      this.form.factAmount = ''
      console.log('zhixing')
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
    width: 100%;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px 20px 5px 20px;
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

}
}
</style>