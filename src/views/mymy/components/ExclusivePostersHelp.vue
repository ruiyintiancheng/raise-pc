<template>
  <el-dialog
  class="Integralsm"
  title="【海报分享权益】"
  :visible.sync="Integralsm"
  width="500px"
  :close-on-click-modal="false">
  <div class="box-text">
      <div class="text1"><b>1. 以推广大使身份分享</b>：用户通过您的分享链接、二维码注册并购买产品，您便可按相应结算方式获得推广返利，推广越多，收益越高，帮您快速实现资源变现（具体返利方式及返利金额请参见“推广大使权益”页面，点击“个人中心”-“我的权益”右上角 <img class="image-right" src="../../../assets/icons/icon-ques.svg" alt/> 查看说明）。</div>
      <div class="text1"><b>2. 以普通会员身份分享</b>：用户通过您的分享链接、二维码注册并购买产品，您便可获得相应积分，积分可用于兑换睿思智得相关辅导产品（具体兑换事宜可参见“我的积分”页面，点击“个人中心”-“我的积分”右上角 <img class="image-right" src="../../../assets/icons/icon-ques.svg" alt/> 查看说明）</div>
      <div class="text1">备注：积分除用于兑换辅导产品外，也可抵扣为相应返利佣金，您只需完成本平台的辅导项目学习，并通过认证，便可成为推广大使，已累积积分便可转换为返利佣金。</div>
      <div class="text1 link" @click="goDaShi()">加入我们，成为睿思智得推广大使</div>
  </div>    
      <span slot="footer" class="dialog-footer">
        <el-button @click="Integralsm = false" type="primary" class="buttondetermine">确定</el-button>
      </span>
</el-dialog>

</template>

<script>
export default {
  data() {
    return {
      Integralsm: false
    }
  },
  methods: {
    goDaShi() {
      this.$router.push({ name: 'basicinformation', query: { userId: '2' }})
    }
  }
}
</script>

<style lang="scss" >
.Integralsm{
  .el-dialog{
    border-radius: 10px;
    .el-dialog__header{
        font-weight:900;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #fff;
    }
    .el-dialog__footer{
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: #fff;
    }
  }
  .box-text{
    padding-left:40px;
    padding-right:40px;
  .text1{
    margin-top:11px;
    font-size: 16px;
    line-height: 28px;
  }
  .text2{
    margin-top:23px;
  }
  .text3{
    margin-top:20px;
  }
  .text4{
    margin-top:-5px;
  }
  .link{
      color: #00afff;
      cursor: pointer;
  }
  }
  .buttondetermine{
    width: 90px;
    height: 34px;
    line-height:0px;
  }
}


</style>