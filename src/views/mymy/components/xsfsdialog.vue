<template>
  <el-dialog
  class="box-dialog"
  title="销售方式"
  :visible.sync="dialogVisiblexsfs"
  width="400px"
  :close-on-click-modal="false">
 <div class="box-middle">
  <div class="box-title">销售方式</div>
  <el-select class="box-select" v-model="value" placeholder="台阶" style="width:100%;">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
 <div class="box-titlexsfs">
    <div class="minbox-title1">
         <span class="xsfstitle1">销售方式：</span>
    </div>
  <div class="minbox">
      <div class="minbox-title2">
          <span class="xsfstitle2">1、台阶：</span>
          <span class="xsfstitle3">标准返利</span>
      </div>
    <div class="minbox-title3">
        <ul class="titleui">
            <li>1-15人</li>
            <li class="textli3">15-30人</li>
        </ul>
        <ul class="titleui">
            <li class="textli">200元</li>
            <li class="textli4">300元</li>
        </ul>
        <ul class="titleui">
            <li class="textli5">30-45人</li>
            <li class="textli7">46人及以上</li>
        </ul>
        <ul class="titleui">
            <li class="textli6">400元</li>
            <li class="textli2">450元</li>
        </ul>
    </div>
  </div>
  <div class="riqititle">
    <span>当前活动： 2020年1月1日-2020年12月31日</span>
  </div>
  <div class="minbox-title4">
     <ul class="titleui2">
            <li>1-20人</li>
            <li class="textli3">21-40人</li>
        </ul>
        <ul class="titleui2">
            <li class="textli">300元</li>
            <li class="textli4">400元</li>
        </ul>
        <ul class="titleui2">
            <li class="textli5">41人及以上</li>
        </ul>
        <ul class="titleui2">
            <li class="textli6">500元</li>
        </ul>
  </div>
  <div class="minbox-title5">
      <span>2、一次性</span>
  </div>
  <div class="minbox-title6">
      <span>3、年度签约</span>
  </div>
  <div class="minbox-title7">
      <span>4、代理</span>
  </div>
  <div class="minbox-title8">
      <span>结算方式： 每季度可结算</span>
  </div>
 </div>
  <div class="box-button">
    <el-button type="primary" size="medium" @click="Toapplyfor" class="sqbutton">申 请</el-button>
  </div>
 </div>
</el-dialog>

</template>

<script>
export default {
  data() {
    return {
      dialogVisiblexsfs: false,
      options: [{
        value: '选项1',
        label: ''
      }, {
        value: '选项2',
        label: ''
      }, {
        value: '选项3',
        label: ''
      }],
      value: ''
    }
  },
  methods: {
    Toapplyfor() {
      this.dialogVisiblexsfs = false
    }
  }
}
</script>

<style lang="scss" scopde>
.box-dialog .el-dialog{
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
    padding: 30px 20px 20px 20px;
.box-title{
    width: 118px;
    height: 13px;
    margin-bottom: 6px;
}
.box-titlexsfs{
    margin-top:20px;
    width: 100%;
    height: 300px;
    background-color: #FBF8EB;
    margin-bottom:20px;
    border: 1px solid #DFD0A4;
    padding: 10px 30px 20px 20px;
    border-radius: 10px;
     .minbox-title1{
         width: 100px;
         height: 18px;
         font-size: 18px;
         color:#3C3C3A;
         text-align: center;
     }
    .minbox{
        width: 100%;
        height: 81px;
        position: relative;
     .minbox-title2{
         width: 143px;
         height: 14px;
         margin-top: 10px;
         font-size: 14px;
         .xsfstitle2{
           color:#51514D;
         }
         .xsfstitle3{
           color:#222222;
         }
     }
     .minbox-title3{
         width: 132px;
         height: 100%;
         font-size: 14px;
         position: absolute;
         color: #51514D;
         top: 0;
         right: 0;
           .titleui{
               display: inline-block;
               .textli{
                   margin-left: 32px;
               }
               .textli2{
                   margin-left:9px;
                   margin-top:5px;
               }
               .textli3{
                   margin-top:5px;
               }
               .textli4{
                   margin-left: 32px;
                   margin-top:5px;
               }
               .textli5{
                   margin-top:5px;
               }
               .textli6{
                margin-top:5px;
                margin-left:9px;
               }
               .textli7{
                margin-top:5px;
               }
           }
     }
     }
     .riqititle{
         width: 100%;
         height: 14px;
         padding-left:16px;
         font-size:14px;
         color:#222222;
         margin-top: 5px;
         margin-bottom: 8px;
     }
     .minbox-title4{
         width: 132px;
         height: 60px;
         margin-left:176px;
         color: #51514D;
          .titleui2{
               display: inline-block;
               .textli{
                   margin-left: 32px;
               }
               .textli2{
                   margin-left:9px;
                   margin-top:5px;
               }
               .textli3{
                   margin-top:5px;
               }
               .textli4{
                   margin-left: 32px;
                   margin-top:5px;
               }
               .textli5{
                   margin-top:5px;
               }
               .textli6{
                margin-top:5px;
                margin-left:9px;
               }
               .textli7{
                margin-top:5px;
               }
           }
     }
     .minbox-title5{
         width: 100%;
         height: 16px;
         font-size:16px;
         color: #51514D;
     }
     .minbox-title6{
         width: 100%;
         height: 16px;
         font-size:16px;
         color: #51514D;
         margin-top:5px;
     }
     .minbox-title7{
         width: 100%;
         height: 16px;
         font-size:16px;
         color: #51514D;
         margin-top:5px;
     }
     .minbox-title8{
         width: 100%;
         height: 18px;
         font-size:18px;
         color:#222222;
         margin-top:8px;
     }
    
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