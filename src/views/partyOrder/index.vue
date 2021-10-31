<template>
  <div class="xsls-content" :style="{minHeight:tableHight + 'px'}">
     <div class="title1">
       <h4 class="h4_left">第三方订单管理</h4>
     </div>
     <el-form ref="form" :model="form" :inline="true" label-width="80px" style="margin-top:24px">
       <el-row>
       <el-col :span="5">
        <el-form-item label="" class="formitem">
          <div>手机号</div>
          <el-input placeholder="请输入手机号" v-model="form.userPhone" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" style="width:240px" clearable></el-input>
        </el-form-item>
       </el-col>
        <el-col :span="9">
        <el-form-item label="" class="formitem">
          <div>订单日期</div>
          <el-date-picker
            style="margin-right:9px;width:213px"
            :picker-options="pickerOptionsStart" 
            type="date"
            placeholder="选择日期" 
            value-format='yyyy-MM-dd'
            v-model="form.startTime" >
            </el-date-picker>
        <span style="margin-right:10px;">至</span>
          <el-date-picker 
            style="width:213px"
          :picker-options="pickerOptionsEnd" 
            type="date" 
            placeholder="选择日期" 
            value-format='yyyy-MM-dd'
            v-model="form.endTime" >
            </el-date-picker>
        </el-form-item>
       </el-col>
       <el-col :span="5">
          <el-form-item class="formitem">
            <div>退款</div>
            <el-select placeholder="请选择" v-model="form.status" clearable style="width:240px">
              <el-option
              v-for="item in optionsproduct"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
          </el-form-item>
       </el-col>
       <el-col :span="5">
           <div class="search-btns" style="margin-top:100px">
            <el-button @click="searchOption()" style="width: 90px;height: 30px;line-height:0.5;" type="primary">查询</el-button>
            <el-button  @click="exportHistory" :loading='downLoading' style="width: 90px;height: 30px;line-height:0.5;border: solid 1px #00afff;color: #00afff;padding:0px" >下载</el-button>
            </div>
       </el-col>
     </el-row>
  </el-form>
<div style="width: 1392px;height: 1px;border: dashed  1px #aaaaaa;margin-top:20px;margin-bottom:23px"></div>
     <div class="title2">
       <h1 class="h4_left2">数据列表</h1>
     </div>
 <!-- 表格 -->
 <!-- 全部 -->
<el-table class="table-main"  v-show="this.currentWay=='0'" :data="tableData"  style="width:100%;margin-top:0px;" v-loading="loading"  border>
      <el-table-column prop="invoId" type=index label="序号" width="52" align="center"></el-table-column>
      <el-table-column prop="loginName" width="140" label="手机号"  align="center"></el-table-column>
      <el-table-column prop="productName" width="120" label="产品"  align="center"></el-table-column>
      <el-table-column prop="orderId" width="180" label="订单编号"  align="center"></el-table-column>
      <el-table-column prop="txnAmt" label="订单金额" width="180" align="center"></el-table-column>
      <el-table-column prop="txnTime" label="订单日期"  align="center"></el-table-column>
      <el-table-column prop="refundTime" label="退款日期"  align="center"></el-table-column>
      <el-table-column prop="" label="操作"  align="center" >
            <template   slot-scope="scope">
          <!-- <span>{{scope.row.status==='1'?'购买成功':(scope.row.status==='3'?'需退款':(scope.row.status==='4'?'已退款':''))}}</span> -->
          <span v-show="scope.row.status==='1'">购买成功</span>
          <span v-show="scope.row.status==='3'" style="color:red">需退款</span>
          <b v-show="scope.row.status==='4'">已退款</b>
         </template>
      </el-table-column>
    </el-table>
        <!-- 全部列表分页 -->

    <sur-pagination   v-show="this.currentWay=='0'" :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination>
  </div>
</template>

<script>
import { baseSearch } from '../../api/base'
import { download } from '@/utils/download'
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
      optionsproduct: [{
        value: '3',
        label: '需退款'
      }, {
        value: '4',
        label: '已退款'
      }],
      form: {
        userPhone: '',
        startTime: '',
        endTime: '',
        status: ''
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
    exportHistory() {
      this.downLoading = true
      const params = {
        loginName: this.form.userPhone,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        status: this.form.status
      }
      download('/user/rwOrder/reOrderExport', params, _ => {
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
        loginName: this.form.userPhone,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        status: this.form.status
      }
      baseSearch('/user/rwOrder/selectOrder', params).then((response) => {
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
  .formitem{
    margin-bottom: 0;
    }
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