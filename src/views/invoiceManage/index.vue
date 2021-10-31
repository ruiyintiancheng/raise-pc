<template>
  <div class="fqgl-content" :style="{minHeight:tableHight + 'px'}">
     <div class="title1">
       <h4 class="h4_left">发票管理</h4>
     </div>
     <el-form ref="form" :model="form" :inline="true">
       <el-row>
         <el-col :span="5">
          <el-form-item label="" class="formitem">
            <div>用户名称</div>
            <el-input v-model="form.userName" style="width:240px" clearable></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="5">
          <el-form-item prop="userPhone" label="" class="formitem">
            <div>手机号</div>
            <el-input v-model="form.loginName" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" style="width:240px" clearable></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="5">
           <el-form-item prop="email" label="" class="formitem">
            <div>邮箱</div>
            <el-input v-model="form.email" style="width:240px" clearable></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="5">
          <el-form-item  class="formitem">
            <div>产品</div>
            <el-select v-model="form.productId" clearable style="width:240px">
              <el-option
              v-for="item in optionsproduct"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
          </el-form-item>
         </el-col>
         <el-col :span="4">
          <el-form-item  class="formitem">
            <div>是否开票</div>
            <el-select v-model="form.isopen" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
         </el-col>
       </el-row>
      <el-row>
        <el-col :span="19">
           <el-form-item label="" class="formitem">
          <div>申请时间</div>
              <el-date-picker class="data-item"  
                style="margin-right:9px;width:213px"
                :picker-options="pickerOptionsStart" 
                type="date"
                placeholder="选择日期" 
                value-format='yyyy-MM-dd'
                v-model="form.startTime" >
                </el-date-picker>
            <span style="margin-right:10px;">至</span>
              <el-date-picker  class="data-item"
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
          <el-form-item style="display:flex;justify-content:flex-end;margin-top:36px" class="formitem">
            <el-button @click="reSearch()" style="width: 90px;height: 30px;line-height:0.5;" type="primary">查询</el-button>
            <el-button  @click="exportHistory" :loading='downLoading' style="width: 90px;height: 30px;line-height:0.5;border: solid 1px #00afff;color: #00afff;padding:0px" >下载</el-button>
          </el-form-item>
        </el-col>
      </el-row>
</el-form>
<div style="width: 1392px;height: 1px;border: dashed  1px #aaaaaa;margin-top:20px;margin-bottom:23px"></div>
     <div class="title2">
       <h1 class="h4_left2">数据列表</h1>
     </div>
<el-table class="table-main" :data="tableData" style="width:100%;margin-top:0px;" v-loading="loading" border>
      <el-table-column prop="invoId" type=index label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名"  align="center"></el-table-column>
      <el-table-column prop="loginName" width="180" label="手机号"  align="center"></el-table-column>
      <el-table-column prop="email" width="180" label="邮箱" :show-overflow-tooltip="true" align="center"></el-table-column>
      <el-table-column prop="productName" width="120" label="产品"  align="center"></el-table-column>
      <el-table-column prop="isopen" width="120" label="是否开票"  align="center"></el-table-column>
      <el-table-column prop="txnTime" label="购买时间" width="200" align="center"></el-table-column>
      <el-table-column prop="addTime" label="申请时间" width="200" align="center"></el-table-column>
      <el-table-column prop="orderName" label="支付方式"  align="center"></el-table-column>
      <el-table-column prop="txnAmt" label="支付金额"  align="center"></el-table-column>
      <el-table-column prop="" label="操作"  align="center" width="100">
        <template slot-scope="scope">
            <el-button 
                @click="buttonfpxq(scope.row)"
                class="button-details"
                type="primary"
                size="mini">
                <span >发票详情</span>
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <sur-pagination   v-show="this.currentWay=='0'" :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination>
    <fpxq :item='item' :invoId='invoId' ref="fpxq" @searchOption="searchOption"/>
  </div>
</template>

<script>
import { baseRequest } from '../../api/base'
import { download } from '@/utils/download'
import { baseSearch } from '../../api/base'
import fpxq from './components/fpxq'
// import bulktable from './components/bulktable'
export default {
  components: {
    fpxq
    // bulktable
  },
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
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }
      ],
      optionsproduct: [{
        value: '1',
        label: 'First Step'
      }, {
        value: '3',
        label: 'SP'
      }, {
        value: '5',
        label: '探索之门'
      }, {
        value: '7',
        label: 'fs强化辅导'
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
        userName: '',
        loginName: '',
        productId: '',
        introPhone: '',
        email: '',
        startTime: '',
        endTime: '',
        isopen: ''
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
    this.reSearch()
    // this.grouptable()
  },

  methods: {
    forceUpdate() {
      this.$forceUpdate()
    },
    reSearch() {
      this.searchOption()
    },
    groupPurchasedetails(row) {
      this.groupId = row.groupId
      this.tuangouViasable = true
    },
    exportHistory() {
      this.downLoading = true
      const params = {
        userName: this.form.userName,
        loginName: this.form.loginName,
        startTime: this.form.startTime,
        email: this.form.email,
        endTime: this.form.endTime,
        productId: this.form.productId,
        isopen: this.form.isopen
      }
      download('/user/rwInvoice/export', params, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    },
    buttonfpxq(row) {
      this.$refs.fpxq.dialogVisiblefpxq = true
      this.invoId = row.id
      baseRequest('/user/rwInvoice/select', { invoId: this.invoId }).then((response) => {
        this.item = response.data.item
        if (this.item.invoiceDate) {
          this.$refs.fpxq.form.invoiceDate = this.item.invoiceDate
        } else {
          this.$refs.fpxq.form.invoiceDate = ''
        }
        if (this.item.invoiceNo) {
          this.$refs.fpxq.form.invoiceNo = this.item.invoiceNo
        } else {
          this.$refs.fpxq.form.invoiceNo = ''
        }
        if (row.isOpen === '1') {
          this.$refs.fpxq.alreadyKp = true
        } else {
          this.$refs.fpxq.alreadyKp = false
        }
        // this.total = response.data.total
        // this.pageNo = response.data.pageNo
        // this.pageSize = response.data.pageSize

        this.loading = false
      })
    },
    searchOption(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      const data = Object.assign(this.form, params)
      baseSearch('/user/rwInvoice/invoiceSelect', data).then((response) => {
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
.fqgl-content{
  .formitem{
    margin-bottom:0
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