<template>
  <div class="bt-content" :style="{minHeight:tableHight + 'px'}">
    <div class="title1">
      <h4 class="h4_left">我的积分</h4>
      <img
        class="image-right"
        @click="dialogVisiblejfsm"
        src="../../../assets/icons/icon-ques.svg"
        alt
      />
    
    </div>
    <div class="integral-now">
      <span class="title_text">当前积分&nbsp;:</span>
      <span class="title_number">{{result || 0}} </span>
    </div>
  <el-button size="medium" class="button-jiaohu"  @click="PointsFor">积分兑换</el-button>
    <!-- 表格 -->
    <el-table  class="table-main" :data="tableData" style="width:100%"   border>
      <el-table-column type=index width="52"></el-table-column>
      <el-table-column prop="cardsName" label="积分项" width="446"></el-table-column>
      <el-table-column prop="cardsTime" label="积分时间" width="446"></el-table-column>
      <el-table-column prop="cardsValue" label="积分"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <sur-pagination
      :pageNo="pageNo"
      :total="total"
      :pageSize="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></sur-pagination>
   <Integralsm ref="Integralsm"/>
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import Integralsm from './Integralsm'

export default {
  components: {
    Integralsm
  },
  name: 'integal',
  data() {
    return {
      result: '',
      showjaohu: false,
      cardsValue: '3000',
      cardsName: '兑换SP',
      cardsTime: '',
      pageNo: 1,
      total: 1,
      pageSize: 10,
      tableData: [],
      currentRow: {}
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 158
    }
  },
  created() {
    this.MyCards()
    this.tableintegral()
  },
  methods: {
    dialogVisiblejfsm() {
      this.$refs.Integralsm.Integralsm = true
    },
    // 积分兑按钮
    PointsFor() {
      // alert('敬请期待')
      this.$router.push({
        name: 'jfdh'
      })
      // this.$confirm('确认使用3000积分兑换1年期电子版成功手册的使用权吗？', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   const param = {
      //     cardsName: this.cardsName,
      //     cardsValue: this.cardsValue
      //   }
      //   baseRequest('/user/rwCardsInfo/conversionCards', param).then((response) => {
      //     this.MyCards()
      //     this.tableintegral()
      //     this.$Message({
      //       type: 'success',
      //       message: '操作成功!'
      //     })
      //   }).catch(error => { console.log(error) })
      // })
    },
    // 我的积分
    MyCards() {
      baseRequest('/user/rwCardsInfo/getMyCards', this.pageNo).then((response) => {
        if (response.data.item) {
          this.result = response.data.item.result || 0
        }
        if (this.result >= 3000) {
          this.showjaohu = true
        }
      })
    },

    // 积分列表
    tableintegral(page) {
      this.loading = true
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/user/rwCardsInfo/selects', param).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.pageNo = response.data.pageNo
        this.loading = false
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.tableintegral()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.tableintegral(true)
    }
  }
}
</script>

<style lang="scss" >
.bt-content {
    width: 1440px;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0px 10px 10px 10px;
    padding: 24px;
    margin-bottom: 30px;
    position: relative;
 

  .title1 {
    height: 18px;
    width: 200px;
    display: block;
    .h4_left {
      float: left;
      font-size: 18px;
      color: #222222;
    }
    .image-right {
      margin-left: 6px;
      margin-top: 2px;
    }
  }
  .integral-now {
    position: relative;
    margin-top: 24px;
    height: 30px;
    line-height: 30px;
    padding-left: 16px;
    width: 200px;
    background-image: linear-gradient(90deg, #ff8800 0%, #ffcc00 100%);
    background-blend-mode: normal, normal;
    border-radius: 15px;
    margin-bottom: 20px;
    display: block;
    .title_text {
      position: absolute;
      left: 18px;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-size: 15px;
      display: inline;
    }
    .title_number {
      position: absolute;
      left: 94px;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-size: 22px;
      display: inline;
    }
  }
  .button-jiaohu{
    position: absolute;
    left:250px;
    top:65px;
    background-color: #00afff;
    border-radius: 9px;
    border: none;
    font-size: 12px;
    color:#ffffff;
  }
// 表格
  .el-table__header tr,
  .el-table__header th {
    height: 25px;
    line-height: 25px;
  }
  .el-table__body tr,
  .el-table__body td {
    height: 52px;
    width: 52px;
    line-height: 52px;
  }
  .el-table .cell,
  .el-table--border td:first-child .cell {
    padding-left: 20px;
    font-size: 14px;
    color: #222222;
  }
  // 说明框
  // .el-dialog__wrapper {
  //   .el-dialog {
  //     border-radius: 10px;
  //     .el-dialog__header {
  //       background-color: #ffffff;
  //       padding: 30px;
  //       box-sizing: border-box;
  //       .el-dialog__title {
  //         line-height: 24px;
  //         font-size: 20px;
  //         color: #222222;
  //       }
  //     }
  //     .el-dialog__body {
  //       padding: 0 30px 50px 30px;
  //       box-sizing: border-box;
  //       .text {
  //         line-height: 25px;
  //       }
  //     }
  //     .el-dialog__footer {
  //       background: #fff;
  //       padding: 0 30px 30px 0;
  //       box-sizing: border-box;
  //       .el-button--medium {
  //         padding: 6px 20px;
  //         font-size: 14px;
  //         border-radius: 4px;
  //       }
  //       .el-button--medium {
  //         font-size: 16px;
  //       }
  //       .el-button--primary {
  //         width: 90px;
  //         height: 30px;
  //         background-color: #00afff;
  //       }
  //     }
  //   }
  // }
 

}
</style>