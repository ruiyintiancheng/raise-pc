<template>
  <el-dialog
  id="fpxqdialoginviice"
  title="电子发票"
  :visible.sync="dialogVisiblefpxq"
  width="660px"
  top="7vh"
  destroy-on-close
  :before-close="handleClose"
  :close-on-click-modal="false">
 <div class="box-middle">
  <el-form  :model="item"  >
    <el-form-item label="发票抬头：" prop="invoiceStyle" style="margin-bottom:14px;margin-left:42px" >
    <el-radio-group v-model="item.invoiceStyle">
      <el-radio label="0" style="margin-left:17px; !important" disabled>个人</el-radio>
      <el-radio label="1" style="margin-left:79px !important" disabled>公司</el-radio>
    </el-radio-group>
     </el-form-item>
     <el-form-item label="发票类型：" prop="invoiceType" style="margin-left:42px">
         <el-radio-group v-model="item.invoiceType" >
           <el-radio label="0" style="margin-left:18px" disabled>增值税普通发票</el-radio>
           <el-radio label="1" disabled>增值税专用发票</el-radio>
         </el-radio-group>
     </el-form-item>
     <el-form-item label="公司名称：" 
     v-if="this.item.invoiceStyle==='1'&this.item.invoiceType==='0'? this.item.invoiceStyle==='1'&this.item.invoiceType==='0': this.item.invoiceStyle==='1'&this.item.invoiceType==='1'" 
     prop="comName" style="margin-bottom:24px;margin-left:43px">
       <el-input v-model="item.comName"  :disabled="true" style="width:330px;margin-left: 17px;"></el-input>
     </el-form-item>
     <el-form-item label="税号：" 
 v-if="this.item.invoiceStyle==='1'&this.item.invoiceType==='0'? this.item.invoiceStyle==='1'&this.item.invoiceType==='0': this.item.invoiceStyle==='1'&this.item.invoiceType==='1'" 
      prop="taxNum" class="einstyle" style="margin-bottom:24px;margin-left:76px">
       <el-input v-model="item.taxNum" :disabled="true" style="width:330px;margin-left: 17px;"></el-input>
     </el-form-item>
      <el-form-item label="开户银行：" 
 v-if="this.item.invoiceStyle==='1'&this.item.invoiceType==='0'? this.item.invoiceStyle==='1'&this.item.invoiceType==='0': this.item.invoiceStyle==='1'&this.item.invoiceType==='1'"
       prop="bank" style="margin-bottom:24px;margin-left:44px">
       <el-input v-model="item.bank" :disabled="true"  style="width:330px;margin-left: 17px;"></el-input>
     </el-form-item>
     <el-form-item label="电子邮箱：" prop="email"
    v-if="this.item.invoiceStyle==='0'&this.item.invoiceType==='0'? this.item.invoiceStyle==='0'&this.item.invoiceType==='0':this.item.invoiceStyle==='1'&this.item.invoiceType==='0'" 
      style="margin-bottom:24px;margin-left:44px">
       <el-input v-model="item.email" :disabled="true"  style="width:330px;margin-left: 17px;"></el-input>
     </el-form-item>
     <el-form-item label="收件人：" prop="toUser" 
     class="peoperstyle"
v-if="this.item.invoiceStyle==='0'&this.item.invoiceType==='1'? this.item.invoiceStyle==='0'&this.item.invoiceType==='1':this.item.invoiceStyle==='1'&this.item.invoiceType==='1'" 
     style="margin-bottom:24px;margin-left:60px">
       <el-input v-model="item.toUser" :disabled="true"  style="width:330px;margin-left: 17px;"></el-input>
     </el-form-item>
     <el-form-item label="收件人联系电话：" 
v-if="this.item.invoiceStyle==='0'&this.item.invoiceType==='1'? this.item.invoiceStyle==='0'&this.item.invoiceType==='1':this.item.invoiceStyle==='1'&this.item.invoiceType==='1'" 
      class="numberstyle" prop="phone" style="margin-bottom:24px;margin-left:-2px">
       <el-input v-model="item.phone" :disabled="true"  style="width:330px;margin-left: 15px;"></el-input>
     </el-form-item>
     <el-form-item label="邮寄地址："
      class="addressstyle"
     v-if="this.item.invoiceStyle==='0'&this.item.invoiceType==='1'? this.item.invoiceStyle==='0'&this.item.invoiceType==='1':this.item.invoiceStyle==='1'&this.item.invoiceType==='1'" 
       prop="adress" style="margin-bottom:24px;margin-left:46px">
       <el-input v-model="item.adress" :disabled="true"  style="width:330px;margin-left: 16px;"></el-input>
     </el-form-item>
  </el-form>
  <el-form :model="form" :rules="rules" ref="refForm">
  <el-form-item label="开票日期："
      class="invoicedatestyle"
       prop="invoiceDate" style="margin-bottom:24px;margin-left:32px">
        <el-date-picker
        style="width:330px;margin-left: 20px;"
        value-format="yyyy-MM-dd"
      v-model="form.invoiceDate"
      :disabled="alreadyKp"
      type="date"
      placeholder="">
    </el-date-picker>
       <!-- <el-input v-model="form.invoiceDate"   style="width:330px;margin-left: 16px;"></el-input> -->
     </el-form-item>
     <el-form-item label="发票号："
      class="Invoicenostyle"
       prop="invoiceNo" style="margin-bottom:24px;margin-left:48px">
       <el-input v-model="form.invoiceNo"   style="width:330px;margin-left: 16px;" :disabled="alreadyKp"></el-input>
     </el-form-item>
     </el-form> 
  <div class="box-button" v-if="!alreadyKp">
    <el-button type="primary" size="medium" class="sqbutton" @click="submitForm('refForm')">提交</el-button>
  </div>
 </div>
</el-dialog>

</template>

<script>
import { baseRequest } from '../../../api/base'
export default {
  props: ['item', 'invoId'],
  data() {
    return {
      dialogVisiblefpxq: false,
      alreadyKp: false,
      form: {
        invoiceDate: '',
        invoiceNo: ''
      },
      rules: {
        invoiceDate: [
          { required: true, message: '请输入发票日期', trigger: 'blur' }
        ],
        invoiceNo: [
          { required: true, message: '请输入发票号', trigger: 'blur' }
          // { pattern: /\d{8}/, message: '请输入正确的发票号' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    handleClose(done) {
      this.item.invoiceDate = ''
      this.item.invoiceNo = ''
      this.form.invoiceStyle = ''
      this.form.invoiceType = ''
      this.dialogVisiblefpxq = false
    },
    // 发送
    submitForm(refForm) {
      this.$refs[refForm].validate((valid) => {
        if (valid) {
          const params = {
            invoId: this.invoId,
            invoiceDate: this.form.invoiceDate,
            invoiceNo: this.form.invoiceNo
          }
          baseRequest('/user/rwInvoice/update', params).then((response) => {
            this.$Message.success('操作成功')
            this.$emit('searchOption')
            this.$refs[refForm].resetFields()
            this.dialogVisiblefpxq = false
          })
        } else {
          return false
        }
      })
    }

  }
}

</script>

<style lang="scss" >
#fpxqdialoginviice .el-dialog{
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
    margin-left:124px;
}
.einstyle{
   .el-form-item__error {
    margin-left:93px;
}
}
.peoperstyle{
   .el-form-item__error {
    margin-left:109px;
}
}
.numberstyle{
  .el-form-item__error {
    margin-left:171px;
}
}
.addressstyle{
  .el-form-item__error {
    margin-left:124px;
}
}
.invoicedatestyle{
  .el-form-item__error {
    margin-left:124px;
}
}
.Invoicenostyle{
  .el-form-item__error {
    margin-left:109px;
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