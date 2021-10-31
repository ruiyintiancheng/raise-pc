<template>
  <el-dialog
  class="sale-info"
  title="推广大使返利说明"
  :visible.sync="Integralsm"
  width="500px"
  :close-on-click-modal="false">
  <div class="box-text">
    <div class="text1">所有拥有睿思智得推广大使身份者，通过分享专属二维码使他人购买产品的，推广者均享受返利奖励。每季度进行结算。</div>
    <div class="text1"><b>1、SP</b></div>
    <div class="text1">返利：50元/人；SP续费购买无返利。</div>
    <div class="text1"><b>2、First Step推广</b></div>
    <div class="text1">在推广First Step产品时采取两种结算返利方式：零售结算、年度结算。</div>
      <div class="text1"><b>(1) 零售结算返利：</b> 以年度为单位对销售人数进行阶梯累计，每季度进行结算返利。
如：本季度销售15人，则本季度收益为10人*150+5人*260=2800元，下季度销售人数5人，下季度收益为5人*260=1300元。</div>
      <el-table :data="data1" border fit>
        <el-table-column label="销售阶梯（人）" prop="jt" align="center"></el-table-column>
        <el-table-column label="返利（元/人）" prop="fl" align="center"></el-table-column>
      </el-table>
      <div class="text1"><b>(2) 年度结算返利：</b> 以年度为单位对销售人数进行总体汇总、按最终达到的档位进行结算返利。返利分日常结算、年度结算补足两部分：</div>
      <div class="text1">● 日常结算为每季度按150元/人结算本季度的销售人数；</div>
      <div class="text1">● 年度结算为如果年度销售人数大于20人（含），则在年度结算时按对应销售档位补足差额。</div>
      <div class="text1">如：本年度销售40人，则日常结算为40人*150=6000元，年度结算按350元/人补足，40人*（350-150）=8000元，年度共计收益14000元。</div>
      <el-table :data="data2" border fit :span-method="objectSpanMethod">
        <el-table-column label="销售档位（人）" prop="jt" align="center"></el-table-column>
        <el-table-column label="返利（元/人）" prop="fl" align="center">
                  <el-table-column label="日常结算" prop="rj" align="center"></el-table-column>
                  <el-table-column label="年度结算补足" prop="nb" align="center"></el-table-column>
        </el-table-column>
      </el-table>
      <div class="text1"><b>3、探索之门</b></div>
      <div class="text1">返利：50元/人；续费购买无返利。</div>
      <div class="text1"><b>4、1-1教练会谈</b></div>
      <div class="text1">（1）标准教练</div>
      <div class="text1 p-le">3次1-1标准教练辅导：返利210元/人；</div>
      <div class="text1 p-le">6次1-1标准教练辅导：返利300元/人；</div>
      <div class="text1 p-le">1-1教练会谈体验无返利。</div>
      <div class="text1">（2）特色教练</div>
      <div class="text1 p-le">1次1-1特色教练辅导：返利200元/人;</div>
      <div class="text1 p-le">3次1-1特色教练辅导：返利600元/人;</div>
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
      Integralsm: false,
      data1: [
        {
          jt: '1~10',
          fl: '150'
        },
        {
          jt: '11~25',
          fl: '260'
        },
        {
          jt: '26~55',
          fl: '400'
        },
        {
          jt: '56~100',
          fl: '550'
        },
        {
          jt: '101~',
          fl: '600'
        }
      ],
      data2: [
        {
          jt: '<20',
          rj: '150元/人',
          nb: '无'
        },
        {
          jt: '≧20',
          rj: '150元/人',
          nb: '按260元/人补足'
        },
        {
          jt: '≧40',
          rj: '150元/人',
          nb: '按350元/人补足'
        },
        {
          jt: '≧60',
          rj: '150元/人',
          nb: '按500元/人补足'
        },
        {
          jt: '≧100',
          rj: '150元/人',
          nb: '按600元/人补足'
        }
      ]
    }
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex === 0) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" >
.sale-info{
  .el-dialog{
    border-radius: 10px;
    .el-dialog__header{
        font-weight:900;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #fff;
    }
    .el-dialog__body{
        height: 400px;
        overflow: auto;
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
  .p-le{
    padding-left: 20px;
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