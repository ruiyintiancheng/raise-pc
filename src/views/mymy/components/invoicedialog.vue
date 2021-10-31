<template>
  <el-dialog
  class="box-dialoginviice"
  title="开具发票"
  :visible.sync="dialogVisiblekfp"
  width="660px"
  top="12vh"
  :before-close="handleClose"
  :close-on-click-modal="false">
 <div class="box-middle">
  <el-form ref="refForm" :model="form"  :rules="rules" class="kfpform" >
    <el-form-item label="发票抬头：" prop="invoiceStyle" style="margin-bottom:14px;margin-left:43px" >
    <el-radio-group v-model="form.invoiceStyle" >
      <el-radio label="0" style="margin-left:55px; !important" @change="invoiceStyleChange">个人</el-radio>
      <el-radio label="1" style="margin-left:78px !important" >公司</el-radio>
    </el-radio-group>
     </el-form-item>
     <el-form-item label="发票类型：" prop="invoiceType" style="margin-left:44px">
         <el-radio-group v-model="form.invoiceType" >
           <el-radio label="0" style="margin-left:55px">增值税普通发票</el-radio>
           <el-radio label="1" :disabled="form.invoiceStyle==='0'" style="margin-left:7px">增值税专用发票</el-radio>
         </el-radio-group>
     </el-form-item>
     <el-form-item label="公司名称：" 
     v-if="this.form.invoiceStyle==='1'&this.form.invoiceType==='0'? this.form.invoiceStyle==='1'&this.form.invoiceType==='0': this.form.invoiceStyle==='1'&this.form.invoiceType==='1'" 
     prop="comName" style="margin-bottom:24px;margin-left:43px">
       <el-input v-model="form.comName" placeholder="请输入公司名称" style="width:330px;margin-left: 56px;"></el-input>
     </el-form-item>
     <el-form-item label="税号：" 
    v-if="this.form.invoiceStyle==='1'&this.form.invoiceType==='0'? this.form.invoiceStyle==='1'&this.form.invoiceType==='0': this.form.invoiceStyle==='1'&this.form.invoiceType==='1'" 
      prop="taxNum" class="einstyle" style="margin-bottom:24px;margin-left:45px">
       <el-input v-model="form.taxNum" placeholder="请输入税号" style="width:330px;margin-left: 82px;"></el-input>
     </el-form-item>
      <el-form-item label="开户银行：" 
      v-if="this.form.invoiceStyle==='1'&this.form.invoiceType==='0'? this.form.invoiceStyle==='1'&this.form.invoiceType==='0': this.form.invoiceStyle==='1'&this.form.invoiceType==='1'" 
       prop="bank" style="margin-bottom:24px;margin-left:44px">
       <el-input v-model="form.bank" placeholder="请输入开户银行" style="width:330px;margin-left: 55px;"></el-input>
     </el-form-item>
     <!-- <el-form-item label="收件人：" prop="toUser" 
     class="peoperstyle"
      v-if="this.form.invoiceStyle==='0'&this.form.invoiceType==='1'? this.form.invoiceStyle==='0'&this.form.invoiceType==='1':this.form.invoiceStyle==='1'&this.form.invoiceType==='1'" 
     style="margin-bottom:24px;margin-left:44px">
       <el-input v-model="form.toUser" placeholder="请输入收件人" style="width:330px;margin-left: 69px;"></el-input>
     </el-form-item>
     <el-form-item label="收件人联系电话：" 
      v-if="this.form.invoiceStyle==='0'&this.form.invoiceType==='1'? this.form.invoiceStyle==='0'&this.form.invoiceType==='1':this.form.invoiceStyle==='1'&this.form.invoiceType==='1'" 
      class="numberstyle" prop="phone" style="margin-bottom:24px;margin-left:44px">
       <el-input v-model="form.phone" placeholder="请输入收件人联系电话" style="width:330px;margin-left: 13px;"></el-input>
     </el-form-item> -->
     <!-- <el-form-item label="邮寄地址："
      class="addressstyle"
      v-if="this.form.invoiceStyle==='0'&this.form.invoiceType==='1'? this.form.invoiceStyle==='0'&this.form.invoiceType==='1':this.form.invoiceStyle==='1'&this.form.invoiceType==='1'" 
       prop="address" style="margin-bottom:24px;margin-left:44px">
       <el-input v-model="form.address" placeholder="请输入邮寄地址" style="width:330px;margin-left: 56px;"></el-input>
     </el-form-item> -->
     <el-form-item label="电子邮箱：" prop="email"
      style="margin-bottom:24px;margin-left:44px">
       <el-input v-model="form.email" placeholder="请输入电子邮箱" style="width:330px;margin-left: 55px;"></el-input>
     </el-form-item>
     
    
     
  </el-form>
  <div class="box-button">
    <el-button type="primary" size="medium" class="sqbutton" @click="submitForm('refForm')">开票</el-button>
  </div>
 </div>
</el-dialog>

</template>

<script>
import { baseRequest } from '@/api/base'
export default {
  props: ['orderId'],
  data() {
    return {
      dialogVisiblekfp: false,
      form: {
        invoiceStyle: '',
        invoiceType: '',
        comName: '',
        taxNum: '',
        bank: '',
        email: '',
        toUser: '',
        phone: '',
        address: ''
      },
      rules: {
        invoiceType: [
          { required: true, message: '请选择普通发票或专用发票', trigger: 'blur' }
        ],
        toUser: [
          { required: true, message: '请输入收件人', trigger: 'blur' }
        ],
        invoiceStyle: [
          { required: true, message: '请选择个人或公司', trigger: 'blur' }
        ],
        comName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        taxNum: [
          { required: true, message: '请输入税号', trigger: 'blur' }
          // { pattern: /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/, message: '请输入正确的税号' }
        ],
        address: [
          { required: true, message: '请输入单位地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' }
        ],
        bank: [
          { required: true, message: '请输入开户银行', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5]+$/, message: '请输入正确的开户银行' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的邮箱' }
        ]
      }
    }
  },
  methods: {
    handleClose(done) {
      this.form.invoiceStyle = ''
      this.form.invoiceType = ''
      this.form.comName = ''
      this.form.taxNum = ''
      this.form.bank = ''
      this.form.email = ''
      this.form.toUser = ''
      this.form.phone = ''
      this.form.address = ''
      this.dialogVisiblekfp = false
    },
    invoiceStyleChange(val) {
      console.log(val)
      this.form.invoiceType = '0'
    },
    submitForm(refForm) {
      this.$refs[refForm].validate((valid) => {
        if (valid) {
          const params = {
            invoiceStyle: this.form.invoiceStyle,
            invoiceType: this.form.invoiceType,
            orderId: this.orderId
          }
          if (this.form.invoiceStyle === '0' & this.form.invoiceType === '0') {
            params.email = this.form.email
          }
          if (this.form.invoiceStyle === '0' & this.form.invoiceType === '1') {
            params.toUser = this.form.toUser
            params.phone = this.form.phone
            params.address = this.form.address
          }
          if (this.form.invoiceStyle === '1' & this.form.invoiceType === '0') {
            params.comName = this.form.comName
            params.taxNum = this.form.taxNum
            params.bank = this.form.bank
            params.email = this.form.email
          }
          if (this.form.invoiceStyle === '1' & this.form.invoiceType === '1') {
            params.comName = this.form.comName
            params.taxNum = this.form.taxNum
            params.bank = this.form.bank
            params.toUser = this.form.toUser
            params.phone = this.form.phone
            params.adress = this.form.address
          }
          params.email = this.form.email
          baseRequest('/user/rwInvoice/add', params).then((response) => {
            this.$Message.success('申请成功，请耐心等待审核')
            this.$emit('searchOption')
            this.loading = false
          })
          this.$refs[refForm].resetFields()
          this.dialogVisiblekfp = false
        } else {
          return false
        }
      })
    }

  }
}

</script>

<style lang="scss" >
.box-dialoginviice .el-dialog{
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
    .el-form-item__error {
    margin-left:166px;
}
.einstyle{
   .el-form-item__error {
    margin-left:165px;
}
}
.peoperstyle{
   .el-form-item__error {
    margin-left:166px;
}
}
.numberstyle{
  .el-form-item__error {
    margin-left:168px;
}
}
.addressstyle{
  .el-form-item__error {
    margin-left:165px;
}
}
 
.box-middle{
    width: 100%;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px 30px 20px 30px;
 .box-check{
     width: 100%;
     height: 30px;
     background-color: pink;
     
 }
 .box-button{
    width: 100%;
    height: 57.5px;
    position: relative;
    .sqbutton{
      position: absolute;
      border-radius: 4px;
      width: 87.5px;
      top:20px;
      right:0;
}
}
}

}
</style>