<template>
  <div class="xssh-content">
     <div class="title1">
       <h4 class="h4_left">结算管理</h4>
     </div>
     <el-form ref="form" :model="form" :inline="true"  style="margin-top:24px">
  <el-form-item label="" >
    <div>用户名</div>
    <el-input v-model="form.userName" style="width:251px"></el-input>
  </el-form-item>
  <el-form-item label="" style="margin-left:15px;">
    <div>手机号</div>
    <el-input v-model="form.loginName" style="width:251px"></el-input>
  </el-form-item>
<el-form-item label="" style="margin-left:15px;">
  <div>结算时间</div>
      <el-date-picker class="data-item"  
         style="margin-right:9px;width:251px"
         :picker-options="pickerOptionsStart" 
         type="date"
         placeholder="选择日期" 
         value-format='yyyy-MM-dd'
         v-model="form.beginTime" >
        </el-date-picker>
    <span style="margin-right:7px;">至</span>
      <el-date-picker  class="data-item"
        style="width:248px"
       :picker-options="pickerOptionsEnd" 
        type="date" 
        placeholder="选择日期" 
        value-format='yyyy-MM-dd'
        v-model="form.endTime" >
        </el-date-picker>
    </el-form-item>
     <el-form-item label="" style="margin-left:15px;">
       <div>是否返利</div>
    <el-select v-model="form.auditType" placeholder="全部" style="width:245px">
      <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
  </el-form-item>
</el-form>
<!-- <el-button type="primary" class="button-search" @click="searchOption" plain>查询</el-button> -->
<div style="float: right;">
<el-button  @click="exportExcel"  style="padding:0px;width: 90px;height: 30px;line-height:0.5;border: solid 1px #00afff;color: #00afff;" >下载</el-button>
<el-button @click="searchOption()" style="width: 90px;height: 30px;line-height:0.5;" type="primary">查询</el-button>
</div>
 <div style="width: 1392px;height: 1px;border: dashed  1px #aaaaaa;margin-top:60px;margin-bottom:23px"></div>
 <div class="title2">
       <h1 class="h4_left2">数据列表</h1>
     </div>
 <!-- 表格 -->

<el-table class="table-main" :data="tableData" :height="(tableData && tableData.length> 2)?'':tableHight" style="width:100%;margin-top:0px;"  border>
      <el-table-column type=index label="序号" width="52" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名"  align="center"></el-table-column>
      <el-table-column prop="cellphone" label="手机号"  align="center"></el-table-column>
      <el-table-column prop="productName" label="产品"  align="center"></el-table-column>
      <el-table-column prop="settlementTime" label="结算日期" width="200" align="center"></el-table-column>
      <el-table-column prop="rebateName" label="销售方式"  align="center"></el-table-column>
      <el-table-column prop="amount" label="应返利"  align="center"></el-table-column>
      <el-table-column prop="factTime" label="返利日期"  align="center"></el-table-column>
      <el-table-column prop="factAmount" label="实际返利"  align="center"></el-table-column>
      <el-table-column prop="" label="操作" width="180"  align="center">
        <template   slot-scope="scope">
            <el-button
                @click="buttonjsset(scope.row)"
                class="button-set"
                type="primary"
                size="mini">
                <span >设置</span>
            </el-button>
            <el-button 
                @click="buttonjsxq(scope.row)"
                class="button-details1111"
                type="primary"
                size="mini">
                <span >详情</span>
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <sur-pagination
      :pageNo="pageNo"
      :total="total"
      :pageSize="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></sur-pagination>
    <jssetup :row='row' ref="jssetup"/>
    <billingdetails ref="Billingdetails" />
  </div>
</template>

<script>
import billingdetails from './components/Billingdetails'
import jssetup from './components/jssetup'
import { baseRequest, baseSearch } from '../../api/base'
import { download } from '@/utils/download'
export default {
  components: {
    jssetup,
    billingdetails
  },
  data() {
    return {
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
          if (this.form.beginTime !== '') {
            let date = this.form.beginTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      },
      id: '',
      row: '',
      item: '',
      pageNo: 1,
      total: 1,
      pageSize: 10,
      applyId: '',
      applyName: '',
      applyPhone: '',
      beginTime: '',
      endTime: '',
      auditType: '',
      reviewType: '',
      options: [
        {
          value: '',
          label: '台阶'
        }, {
          value: '1',
          label: '一次性'
        },
        {
          value: '2',
          label: '年度签约'
        },
        {
          value: '3',
          label: '代理'
        }
      ],
      options2: [{
        value: '0',
        label: '是'
      }, {
        value: '1',
        label: '否'
      }],
      form: {
        userName: '',
        auditType: '',
        beginTime: '',
        endTime: '',
        loginName: '',
        rebateId: '',
        downLoading: false
      },
      tableData: [],
      tableData1: [],
      ifExport: false
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 506
    }
  },
  created() {
    this.table()
  },

  methods: {
    detailsdialog() {
      this.$refs.detailstk.dialogdetails = true
    },
    buttonjsset(row) {
      this.$refs.jssetup.dialogsalejssetup = true
      this.row = row
    },
    buttonjsxq(row) {
      this.$refs.Billingdetails.dialogsalejsxq = true
      this.$refs.Billingdetails.tabledetail(row)
    },
    table(page) {
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/finance/rwRebateSettlement/getAllUserSettlement', param).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userName: this.form.userName,
        loginName: this.form.loginName,
        startTime: this.form.beginTime,
        endTime: this.form.endTime,
        ifExport: this.ifExport
      }
      baseSearch('/finance/rwRebateSettlement/getAllUserSettlement', param).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    exportExcel() {
      // this.downLoading = true
      this.ifExport = true
      download('/finance/rwRebateSettlement/getAllUserSettlement', { ifExport: this.ifExport }, _ => {
        // this.downLoading = false
      }, _ => {
        // this.downLoading = false
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.table()
      this.searchOption()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.table()
      this.searchOption(true)
    }
  }
}

</script>

<style lang="scss" scoped>
.xssh-content{
  position: relative;
  width: 1440px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 50px;
   .title1 {
    height: 18px;
    width: 200px;
    display: block;
    .h4_left {
      float: left;
      font-size: 18px;
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
        top: 63px;
        right: 26px;
  }
  // .button-set{
  //     width: 66px;
  //     height: 26px;
  //     text-align: center;
  //     line-height: 9px;
  //     border-radius:4px;
  //     display: inline-block;
  //     font-size: 15px;
  //     margin-top: 0px;
  //     float: left;
  //     padding: 0px;
  // }
  // .button-details1111{
  //     width: 66px;
  //     height: 26px;
  //     text-align: center;
  //     line-height: 9px;
  //     border-radius:4px;
  //     display: inline-block;
  //     font-size: 15px;
  //     margin-top: 0px;
  //     float: right;
  //     padding: 0px;
  // }
     .title2 {
    height: 18px;
    width: 200px;
    margin-bottom:20px;
    display: block;
    .h4_left2 {
      float: left;
      font-size: 14px;
      color: #222222;
    }
  }
}
</style>