<template>
  <div class="dsjs-content" :style="{minHeight:tableHight + 'px'}">
     <div class="title1">
       <h4 class="h4_left">大使结算</h4>
     </div>
     <el-form ref="form" :model="form" :inline="true"  style="margin-top:24px">
       <el-row>
         <el-col :span="5">
            <el-form-item label="" class="formitem">
              <div>用户名</div>
              <el-input v-model="form.userName" clearable style="width:251px"></el-input>
            </el-form-item>
         </el-col>
         <el-col :span="5">
            <el-form-item label="" class="formitem">
              <div>手机号</div>
              <el-input v-model="form.loginName" style="width:251px" clearable></el-input>
            </el-form-item>
         </el-col>
         <el-col :span="5">
           <el-form-item label="" class="formitem">
              <div>邮箱</div>
              <el-input v-model="form.email" style="width:251px" clearable></el-input>
            </el-form-item>
         </el-col>
         <el-col :span="5">
           <el-form-item label="" class="formitem">
              <div>销售产品</div>
              <el-select
                      v-model="form.productId"
                      placeholder="请选择"
                      clearable
                      style="width:251px">
                      <el-option :value="item.value" :label="item.label" v-for="(item,index) in optionType" :key="index"></el-option>
                    </el-select>
            </el-form-item>
         </el-col>
         <el-col :span="4">
            <el-form-item label="" class="formitem">
              <div>是否返利</div>
            <el-select v-model="form.complete" placeholder="全部" style="width:245px" clearable>
              <el-option
              v-for="(item,index) in options2"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
  </el-form-item>
         </el-col>
       </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label="" class="formitem">
            <div>结算方式</div>
            <el-select
                    v-model="form.settleType"
                    placeholder="请选择"
                    clearable
                    style="width:251px">
                    <el-option :value="item.value" :label="item.label" v-for="(item,index) in settleType" :key="index"></el-option>
                  </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="" class="formitem">
          <div>结算日期</div>
              <el-date-picker class="data-item"  
                style="margin-right:9px;width:251px"
                :picker-options="pickerOptionsStart" 
                type="date"
                placeholder="选择日期" 
                value-format='yyyy-MM-dd'
                v-model="form.settlementTime" >
                </el-date-picker>
            <span style="margin-right:7px;">至</span>
              <el-date-picker  class="data-item"
                style="width:248px"
              :picker-options="pickerOptionsEnd" 
                type="date" 
                placeholder="选择日期" 
                value-format='yyyy-MM-dd'
                v-model="form.settlementTimeOne" >
                </el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="4" style="display:flex;justify-content:flex-end">
          <el-form-item class="formitem">
              <div style="margin-top:36px">
                  <el-button @click="searchOption()" style="width: 90px;height: 30px;line-height:0.5;" type="primary">查询</el-button>
                  <el-button  @click="exportExcel" :loading="downLoading" style="padding:0px;width: 90px;height: 30px;line-height:0.5;border: solid 1px #00afff;color: #00afff;" >下载</el-button>
              </div>
          </el-form-item>
        </el-col>
      </el-row>
</el-form>
 <div style="width: 1392px;height: 1px;border: dashed 1px #aaaaaa;margin-top:24px;margin-bottom:23px"></div>
 <div class="title2">
       <h1 class="h4_left2">数据列表</h1>
     </div>
 <!-- 表格 -->

<el-table class="table-main" :data="tableData" style="width:100%;margin-top:0px;" v-loading="loading" border>
      <el-table-column type=index label="序号" width="50" align="center" fixed="left"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="150" align="center"></el-table-column>
      <el-table-column prop="loginName" label="手机号" width="150" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" :show-overflow-tooltip="true" width="200" align="center"></el-table-column>
      <el-table-column prop="productName" label="销售产品" width="150" align="center"></el-table-column>
      <el-table-column prop="personCount" label="销售人数" width="150" align="center"></el-table-column>
      <el-table-column prop="settlementTime" label="结算日期" width="200" align="center"></el-table-column>
      <el-table-column prop="name" label="销售方式" width="150" align="center"></el-table-column>
      <el-table-column prop="typeName" label="结算方式" width="150" align="center"></el-table-column>
      <el-table-column prop="amount" label="结算金额" width="150" align="center"></el-table-column>
      <el-table-column prop="factAmount" label="实际返利" width="150" align="center"></el-table-column>
      <el-table-column prop="factTime" label="返利日期" width="200" align="center"></el-table-column>
      <el-table-column prop="" label="操作" width="180"  align="center" fixed="right">
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
    <jssetup :row='row' ref="jssetup" @refresh="refresh"/>
    <Billingdetails ref="Billingdetails"/>
  </div>
</template>

<script>
import Billingdetails from './components/Billingdetails'
import jssetup from './components/jssetup'
import { baseSearch } from '../../api/base'
import { download } from '@/utils/download'
export default {
  components: {
    jssetup,
    Billingdetails
  },
  data() {
    return {
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.form.settlementTimeOne !== '') {
            let date = this.form.settlementTimeOne + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() > newDate
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.form.settlementTime !== '') {
            let date = this.form.settlementTime + ' 00:00:00'
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
      settleType: [
        {
          value: '0',
          label: '日常结算'
        },
        {
          value: '1',
          label: '年度结算'
        },
        {
          value: '2',
          label: '切换协议'
        }
      ],
      optionType: [
        {
          value: '3',
          label: 'SP'
        },
        {
          value: '1',
          label: 'FS'
        }
      ],
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
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      form: {
        userName: '',
        loginName: '',
        email: '',
        productId: '',
        complete: '',
        settleType: '',
        settlementTime: '',
        settlementTimeOne: ''
      },
      tableData: [],
      downLoading: false,
      loading: false
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 158
    }
  },
  created() {
    this.searchOption()
  },
  methods: {
    // 设置完成后刷新列表
    refresh() {
      this.searchOption()
    },
    detailsdialog() {
      this.$refs.detailstk.dialogdetails = true
    },
    buttonjsset(row) {
      this.$refs.jssetup.dialogsalejssetup = true
      this.$refs.jssetup.massageEcho(row)
      this.row = row
    },
    buttonjsxq(row) {
      this.$refs.Billingdetails.dialogsalejsxq = true
      this.$refs.Billingdetails.tabledetail(row)
    },
    searchOption(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userName: this.form.userName,
        loginName: this.form.loginName,
        email: this.form.email,
        productId: this.form.productId,
        complete: this.form.complete,
        type: this.form.settleType,
        settlementTime: this.form.settlementTime,
        settlementTimeOne: this.form.settlementTimeOne
      }
      baseSearch('/finance/rwRebateSettlement/selectList', params).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    exportExcel() {
      this.downLoading = true
      const params = {
        userName: this.form.userName,
        loginName: this.form.loginName,
        email: this.form.email,
        productId: this.form.productId,
        complete: this.form.complete,
        type: this.form.settleType,
        settlementTime: this.form.settlementTime,
        settlementTimeOne: this.form.settlementTimeOne
      }
      download('/finance/rwRebateSettlement/export', params, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
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
.dsjs-content{
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
  padding-bottom: 50px;
  border-radius: 0px 10px 10px 10px;
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