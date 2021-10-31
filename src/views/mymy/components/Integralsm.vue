<template>
  <el-dialog
  class="Integralsm"
  title="积分说明："
  :visible.sync="Integralsm"
  width="700px"
  top="5vh"
  :close-on-click-modal="false">
  <div class="box-text">
      <div class="text1">所有注册登录睿思智得网站者均拥有个人专属二维码，经分享专属二维码使他人购买产品者，分享人享受积分奖励：</div>
      <div class="text1">● First Step辅导项目：800积分；</div>
      <div class="text1">● 目标规划·SP：300积分；</div>
      <div class="text1">● 探索之门：300积分；</div>
      <div class="text1">● 1次1-1特色教练辅导：500积分；</div>
      <div class="text1">● 3次1-1特色教练辅导：1500积分；</div>
      <div class="text1">● 3次1-1标准教练辅导：900积分；</div>
      <div class="text1">● 6次1-1标准教练辅导：1800积分；</div>
      <div class="text1">● 1-1教练会谈体验、First Step强化辅导无奖励积分。</div>
      <div class="text1" style="margin-top:15px;"><b>兑换说明：</b></div>
      <div class="text1">● 满3000积分可兑换1年目标规划·SP系统使用；</div>
      <div class="text1">● 满4000积分可兑换1份First Step强化辅导；</div>
      <div class="text1">● 满5000积分可兑换探索之门辅导项目；</div>
      <div class="text1">● 满8000积分可兑换1次特色教练辅导；</div>
      <div class="text1">● 满24000积分可兑换3次特色教练辅导；</div>
      <div class="text1">● 满15000积分可兑换3次1-1标准教练辅导；</div>
      <div class="text1">● 满30000积分可兑换6次1-1标准教练辅导；</div>
      <div class="text1">● 满25000积分可兑换First Step辅导项目或同等价位其它辅导项目。</div>
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
  }
  .buttondetermine{
    width: 90px;
    height: 34px;
    line-height:0px;
  }
}


</style>