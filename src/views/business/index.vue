<template>
  <div class="xsls-content" :style="{minHeight:tableHight + 'px'}">
     <div class="title1">
       <h4 class="h4_left">业务运维</h4>
     </div>
     <el-form ref="form" :model="form" :inline="true"  style="margin-top:24px;position: relative;">
  <el-form-item label="">
  <div>购买时间</div>
      <el-date-picker class="data-item"  
         style="margin-right:9px;width:200px"
         :picker-options="pickerOptionsStart" 
         type="date"
         placeholder="选择日期" 
         value-format='yyyy-MM-dd'
         v-model="form.startTime" >
        </el-date-picker>
    <span style="margin-right:10px;">至</span>
      <el-date-picker  class="data-item"
        style="width:200px"
       :picker-options="pickerOptionsEnd" 
        type="date" 
        placeholder="选择日期" 
        value-format='yyyy-MM-dd'
        v-model="form.endTime" >
        </el-date-picker>
    </el-form-item>
   <!-- <el-form-item> -->
     <el-form-item label="">
       <div>支付方式</div>
       <el-select v-model="form.orderType" placeholder="请选择" clearable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
  </el-select>
     </el-form-item>
  <div class="search-btns">
    <el-button type="success" style="width: 90px;height: 30px;line-height:0.5;" @click="handlePay">支付</el-button>
    <el-button @click="searchOption()" style="width: 90px;height: 30px;line-height:0.5;" type="primary">查询</el-button>
</div>
   <!-- </el-form-item> -->
</el-form>
<div style="width: 1392px;height: 1px;border: dashed  1px #aaaaaa;margin-top:20px;margin-bottom:23px"></div>
     <div class="title2">
       <h1 class="h4_left2">数据列表</h1>
     </div>
 <!-- 表格 -->
 <!-- 全部 -->
<el-table class="table-main"  v-show="this.currentWay=='0'" :data="tableData"  style="width:100%;margin-top:0px;" v-loading="loading"  border>
      <el-table-column prop="invoId" type=index label="序号" width="52" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名"  align="center" width="100"></el-table-column>
      <el-table-column prop="loginName" width="140" label="手机号"  align="center"></el-table-column>
      <el-table-column prop="email" width="200" label="邮箱"  align="center"></el-table-column>
      <el-table-column prop="productName" width="120" label="产品"  align="center"></el-table-column>
      <el-table-column prop="startTime" width="180" label="购买课时"  align="center"></el-table-column>
      <el-table-column prop="txnTime" label="购买时间" width="180" align="center"></el-table-column>
      <el-table-column prop="statusName" label="订单状态"  align="center"></el-table-column>
      <el-table-column prop="dealName" label="订单类型"  align="center"></el-table-column>
      <el-table-column prop="orderName" label="支付方式"  align="center" width="100"></el-table-column>
      <el-table-column prop="txnAmt" label="支付金额"  align="center"></el-table-column>
    </el-table>
        <!-- 全部列表分页 -->

    <sur-pagination   v-show="this.currentWay=='0'" :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination>
  </div>
</template>

<script>
import { download } from '@/utils/download'
import { baseSearch } from '../../api/base'
export default {
  data() {
    return {
      currentWay: '0',
      tuangouViasable: false,
      invoId: '',
      groupId: '',
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
          if (this.form.startTime !== '') {
            let date = this.form.startTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      },
      options: [
        {
          value: '0',
          label: '网银支付'
        },
        {
          value: '2',
          label: '支付宝支付'
        },
        {
          value: '3',
          label: '微信支付'
        }
      ],
      optionsproduct: [{
        value: '1',
        label: 'First Step'
      }, {
        value: '3',
        label: '目标规划·SP'
      }],
      optionsOrderdetails: [{
        value: '0',
        label: '支付'
      }, {
        value: '1',
        label: '退款'
      }],
      optionsBuyingpatterns: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '拼团'
      }],
      form: {
        orderType: null,
        startTime: '',
        endTime: '',
        productId: ''
      },
      pageNo: 1,
      total: null,
      pageSize: 10,
      pageNo1: 1,
      total1: null,
      pageSize1: 10,
      tableData: [],
      tableData1: [],
      item: {},
      loading: false,
      downLoading: false
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 158
    }
  },
  created() {
    this.searchOption()
    // this.grouptable()
  },

  methods: {
    forceUpdate() {
      this.$forceUpdate()
    },
    handlePay() {
      this.$router.push({
        name: 'sp-buy',
        params: { id: 4 },
        query: { type: 'one', name: '业务运维' }
      })
    },
    groupPurchasedetails(row) {
      this.groupId = row.groupId
      this.tuangouViasable = true
    },
    exportHistory() {
      this.downLoading = true
      const params = {
        userName: this.form.userName,
        loginName: this.form.userPhone,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        productId: this.form.productId,
        dealType: this.form.dealType
      }
      download('/user/rwAmbaHistroy/export', params, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    },
    searchOption(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        orderType: this.form.orderType,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        productId: 4
      }
      baseSearch('/user/rwAmbaHistroy/selectAll', params).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageNo = response.data.pageNo
        this.loading = false
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.searchOption(true)
    }
  }
}

</script>

<style lang="scss" scoped>
.xsls-content{
  position: relative;
  width: 1440px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom:50px;
  border-radius: 0px 10px 10px 10px;
  .search-btns{
    display: flex;
    justify-content:flex-end;
    // position: absolute;
    // right: 0;
    // bottom: 30px;
    // top:50%;
    // transform: translateY(-50%);
  }
   .title1 {
    height: 18px;
    width: 200px;
    display: block;
    .h4_left {
      float: left;
      font-size: 14px;
      color: #222222;
    }
  }
   .title2 {
    height: 18px;
    width: 200px;
    display: block;
    margin-bottom: 20px;
    .h4_left2 {
      float: left;
      font-size: 14px;
      color: #222222;
    }
  }

//   表格
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
  .button-search{
       width: 90px;
        height: 40px;
        text-align: center;
        background-color: #ffffff;
        border-radius: 4px;
        border:solid 1px #00afff;
        font-size: 16px;
        color:#00afff;
        position: absolute;
        top: 126px;
        right: 32px;
  }
  
  .button-details{
      width: 65px;
      height: 33px;
      text-align: center;
      line-height: 13px;
      border-radius:8px;
      display: inline-block;
      margin-top: 0px;
      padding:0;
  }
}
</style>