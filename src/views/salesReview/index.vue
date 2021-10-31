<template>
  <div class="xssh-content" :style="{ minHeight: tableHight + 'px' }">
    <div class="title1">
      <h1 class="h4_left">销售审核</h1>
    </div>
    <el-form ref="form" :model="form" :inline="true" style="margin-top: 24px">
      <el-row>
        <el-col :span="4">
          <el-form-item label="" class="formitem">
            <div>用户名</div>
            <el-input
              v-model="form.applyName"
              style="width: 213px"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="" class="formitem">
            <div>手机号</div>
            <el-input
              v-model="form.applyPhone"
              style="width: 213px"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="" class="formitem">
            <div>邮箱</div>
            <el-input
              v-model="form.email"
              style="width: 213px"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="" class="formitem">
            <div>申请产品</div>
            <el-select v-model="form.productId" style="width: 213px" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="" class="formitem">
            <div>销售模式</div>
            <el-select v-model="form.rebateId" style="width: 213px" clearable>
              <el-option
                v-for="item in xsOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="" class="formitem">
            <div>初审</div>
            <el-select v-model="form.auditType" style="width: 213px" clearable>
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item
            label=""
            v-if="this.form.auditType !== '1'"
            class="formitem"
          >
            <div>复审</div>
            <el-select v-model="form.reviewType" style="width: 213px" clearable>
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="" class="formitem">
            <div>申请时间</div>
            <el-date-picker
              class="data-item"
              style="margin-right: 9px; width: 213px"
              :picker-options="pickerOptionsStart"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              v-model="form.beginTime"
            >
            </el-date-picker>
            <span style="margin-right: 10px">至</span>
            <el-date-picker
              class="data-item"
              style="width: 213px"
              :picker-options="pickerOptionsEnd"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              v-model="form.endTime"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item
            style="display: flex; justify-content: flex-end"
            class="formitem"
          >
            <div style="margin-top: 36px">
              <el-button
                @click="searchOption()"
                style="
                  width: 90px;
                  height: 30px;
                  line-height: 0.5;
                  margin-left: 5px;
                "
                type="primary"
                >查询</el-button
              >
              <el-button
                @click="exportHistory"
                style="
                  width: 90px;
                  height: 30px;
                  line-height: 0.5;
                  border: solid 1px #00afff;
                  color: #00afff;
                  padding: 0px;
                "
                >下载</el-button
              >
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div
      style="
        width: 1392px;
        height: 1px;
        border: dashed 1px #aaaaaa;
        margin-top: 24px;
        margin-bottom: 23px;
      "
    ></div>
    <div class="title2">
      <h1 class="h4_left2">数据列表</h1>
    </div>
    <!-- 表格 -->
    <el-table
      class="table-main"
      :data="tableData"
      style="width: 100%; margin-top: 0px"
      border
    >
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
        fixed="left"
      ></el-table-column>
      <el-table-column
        prop="applyName"
        label="用户名"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="applyPhone"
        label="手机号"
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        :show-overflow-tooltip="true"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productId"
        label="申请产品"
        width="130"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="applyTime"
        label="申请时间"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="rebateId"
        label="销售模式"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="auditType"
        label="初审状态"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.auditType === "0"
              ? "通过"
              : scope.row.auditType === "1"
              ? "待审核"
              : scope.row.auditType === "2"
              ? "驳回"
              : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="auditTime"
        label="初审时间"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="reviewType"
        label="复审状态"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.reviewType === "0"
              ? "通过"
              : scope.row.reviewType === "1"
              ? "待审核"
              : scope.row.reviewType === "2"
              ? "驳回"
              : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="reviewTime"
        label="复审时间"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop=""
        label="操作"
        width="150px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            v-if="
              (scope.row.auditType === '1' && scope.row.reviewType === '0') ||
              (scope.row.auditType === '1' && scope.row.reviewType === '1') ||
              (scope.row.auditType === '1' && scope.row.reviewType === null)
            "
            @click="buttonTrial(scope.row)"
            class="button-trial1"
            type="primary"
            size="mini"
          >
            <span>初审</span>
          </el-button>
          <el-button
            @click="detailsdialogchushen(scope.row)"
            v-if="
              (scope.row.auditType === '2' && scope.row.reviewType === '1') ||
              (scope.row.auditType === '2' && scope.row.reviewType === null) ||
              (scope.row.auditType === '0' && scope.row.reviewType === '1') ||
              (scope.row.auditType === '0' && scope.row.reviewType === null)
            "
            class="button-details"
            type="primary"
            size="mini"
            >详情
          </el-button>
          <el-button
            @click="detailsdialogfushen(scope.row)"
            v-if="scope.row.reviewType === '2' || scope.row.reviewType === '0'"
            class="button-details"
            type="primary"
            size="mini"
          >
            详情
          </el-button>
          <el-button
            v-if="
              (scope.row.reviewType === '1' && scope.row.auditType === '0') ||
              (scope.row.reviewType === '1' && scope.row.auditType === null)
            "
            @click="buttonReview(scope.row)"
            class="button-review1"
            type="primary"
            size="mini"
          >
            <span>复审</span>
          </el-button>
          <div
            style="width: 59px; height: 26px; display: inline-block"
            v-if="scope.row.auditType === '2' || scope.row.reviewType === '2'"
          >
            已驳回
          </div>
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
    <detailstk :item="item" ref="detailstk" />
    <salestrial :item="item" ref="salestrial" />
    <salesreview :item="item" ref="salesreview" />
  </div>
</template>

<script>
import detailstk from './components/detailstk'
import salestrial from './components/salestrial'
import salesreview from './components/salesreview'
import { baseRequest } from '../../api/base'
import { baseSearch } from '../../api/base'
import { download } from '@/utils/download'
export default {
  components: {
    detailstk,
    salestrial,
    salesreview
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
          value: '1',
          label: 'First Step'
        }
      ],
      xsOptions: [],
      options1: [
        {
          value: '0',
          label: '通过'
        },
        {
          value: '1',
          label: '待审核'
        },
        {
          value: '2',
          label: '驳回'
        }
      ],
      options2: [
        {
          value: '0',
          label: '通过'
        },
        {
          value: '1',
          label: '待审核'
        },
        {
          value: '2',
          label: '驳回'
        }
      ],
      form: {
        applyName: '',
        email: '',
        auditType: '',
        beginTime: '',
        productId: '',
        endTime: '',
        rebateId: '',
        applyPhone: '',
        reviewType: ''
      },
      tableData: []
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
  mounted() {
    this.saleswayselect()
  },
  methods: {
    saleswayselect() {
      baseRequest('/finance/rwRebate/getSelect')
        .then((response) => {
          this.xsOptions = response.data.item.rwRebateList
        })
        .catch((error) => {
          console.log(error)
        })
    },
    exportHistory() {
      this.downLoading = true
      const params = {
        applyName: this.form.applyName,
        email: this.form.email,
        auditType: this.form.auditType,
        beginTime: this.form.beginTime,
        productId: this.form.productId,
        endTime: this.form.endTime,
        rebateId: this.form.rebateId,
        applyPhone: this.form.applyPhone,
        reviewType: this.form.auditType !== '1' ? this.form.reviewType : ''
      }
      download(
        '/user/rwAmbassadorApply/export',
        params,
        (_) => {
          this.downLoading = false
        },
        (_) => {
          this.downLoading = false
        }
      )
    },
    detailsdialogchushen(row) {
      this.$router.push({
        name: 'basicinformation',
        query: {
          applyId: row.applyId,
          applyTime: row.applyTime,
          major: row.id,
          xsPage: 1
        }
      })
    },
    detailsdialogfushen(row) {
      this.$router.push({
        name: 'basicinformation',
        query: {
          applyIdfushendetails: row.applyId,
          applyTime: row.applyTime,
          major: row.id,
          xsPage: 1
        }
      })
    },
    buttonTrial(row) {
      this.$router.push({
        name: 'basicinformation',
        query: {
          applyIdchushen: row.applyId,
          applyTime: row.applyTime,
          major: row.id,
          xsPage: 1
        }
      })
    },
    buttonReview(row) {
      this.$router.push({
        name: 'basicinformation',
        query: {
          applyIdfushen: row.applyId,
          applyTime: row.applyTime,
          major: row.id,
          xsPage: 1
        }
      })
    },
    table(page) {
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/user/rwAmbassadorApply/selectList', params).then(
        (response) => {
          this.tableData = response.data.item
          this.total = response.data.total
          this.pageSize = response.data.pageSize
          this.loading = false
        }
      )
    },
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      const data = Object.assign(this.form, params)
      this.form.reviewType =
        this.form.auditType !== '1' ? this.form.reviewType : ''
      baseSearch('/user/rwAmbassadorApply/selectList', data).then(
        (response) => {
          this.tableData = response.data.item
          this.total = response.data.total
          this.pageNo = response.data.pageNo
          this.loading = false
        }
      )
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

<style lang="scss" >
.xssh-content {
  .formitem {
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
      font-size: 14px;
      color: #222222;
    }
  }
  .title2 {
    height: 18px;
    width: 200px;
    margin-bottom: 20px;
    display: block;
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
  .button-trial1 {
    width: 50px;
    height: 26px;
    border-radius: 4px;
    text-align: center;
    line-height: 9px;
    padding: 0px;
    display: inline-block;
    margin-top: 0px;
    font-size: 15px;
  }
  .button-review1 {
    width: 50px;
    height: 26px;
    text-align: center;
    line-height: 9px;
    border-radius: 4px;
    display: inline-block;
    font-size: 15px;
    padding: 0px;
    margin-top: 0px;
    z-index: 500;
  }
  .button-details {
    width: 50px;
    height: 26px;
    padding: 0px;
    text-align: center;
    line-height: 9px;
    border-radius: 4px;
    display: inline-block;
    font-size: 15px;
    margin-top: 0px;
  }
}
</style>