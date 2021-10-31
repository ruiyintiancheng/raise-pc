<template>
  <div class="jlsh-content" :style="{ minHeight: tableHight + 'px' }">
    <div class="title1">
      <h4 class="h4_left">TTT审核</h4>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      :inline="true"
      style="margin-top: 24px"
    >
      <el-row>
        <el-col :span="5">
          <el-form-item label="" class="formitem">
            <div>用户名</div>
            <el-input
              v-model="form.applyName"
              style="width: 240px"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="" class="formitem">
            <div>手机号</div>
            <el-input
              v-model="form.applyPhone"
              oninput="value=value.replace(/[^\d]/g,'')"
              maxlength="11"
              style="width: 240px"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="" class="formitem">
            <div>邮箱</div>
            <el-input
              v-model="form.email"
              style="width: 240px"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="" class="formitem">
            <div>申请课程</div>
            <el-select v-model="form.productId" style="width: 240px" clearable>
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
            <div>初审</div>
            <el-select v-model="form.auditType" style="width: 220px" clearable>
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
            class="formitem"
            label=""
            v-if="
              this.form.auditType === '0' ||
              this.form.auditType === '1' ||
              this.form.auditType === ''
            "
          >
            <!-- <div>复审</div> -->
            <!-- <el-select v-model="form.reviewType" style="width: 240px" clearable>
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
            <div>授权</div>
            <el-select v-model="form.reviewType" style="width: 240px" clearable>
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
                :loading="downLoading"
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
      v-loading="loading"
      border
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center"
        fixed="left"
      ></el-table-column>
      <el-table-column
        prop="applyName"
        label="用户名"
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="applyPhone"
        label="用户手机号"
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="用户邮箱"
        :show-overflow-tooltip="true"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productName"
        label="申请产品"
        width="130"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="applyTime"
        label="申请时间"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="auditType"
        label="初审状态"
        width="90"
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
        width="180"
        align="center"
      ></el-table-column>
      <!-- <el-table-column
        prop="auditType"
        label="复审状态"
        width="90"
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
        width="180"
        align="center"
      ></el-table-column> -->
      <el-table-column
        prop="reviewName"
        label="授权状态"
        width="90"
        align="center"
      >
        <!-- <template slot-scope="scope"> -->
          <!-- <span v-if="scope.row.reviewType == '0'">{{ "已授权" }}</span>
          <span v-else> {{ "待授权" }}</span> -->
        <!-- </template> -->
      </el-table-column>
      <el-table-column
        prop="reviewTime"
        label="授权时间"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop=""
        label="操作"
        align="center"
        fixed="right"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.auditType === '1'"
            @click="buttonTrial(scope.row)"
            class="button-trial"
            type="primary"
            size="mini"
          >
            <span>初审</span>
          </el-button>
          <el-button
            @click="detailsdialog(scope.row)"
            class="button-details"
            type="primary"
            size="mini"
          >
            详情
          </el-button>
          <!-- <el-button
            @click="detailsdialog(scope.row)"
            v-if="
              (scope.row.auditType === '2' && scope.row.reviewType === '1') ||
              (scope.row.auditType === '2' && scope.row.reviewType === null) ||
              (scope.row.auditType === '0' && scope.row.reviewType === '1') ||
              (scope.row.auditType === '0' && scope.row.reviewType === null)
            "
            class="button-details"
            type="primary"
            size="mini"
          >
            详情
          </el-button> -->
          <!-- <el-button
            @click="detailsdialogfushen(scope.row)"
            v-if="scope.row.reviewType === '2' || scope.row.reviewType === '0'"
            class="button-details"
            type="primary"
            size="mini"
          >
            详情
          </el-button> -->
          <!-- <el-button
            v-if="
              (scope.row.reviewType === '1' && scope.row.auditType === '0') ||
              (scope.row.reviewType === '1' && scope.row.auditType === null)
            "
            @click="buttonReview(scope.row)"
            class="button-review"
            type="primary"
            size="mini"
          >
            <span>复审</span>
          </el-button> -->
          <el-button
            @click="buttonshouquan(scope.row)"
            class="button-trial"
            type="primary"
            size="mini"
            v-if="scope.row.auditType == '0' && scope.row.reviewType == '1'"
          >
            <span>授权</span>
          </el-button>
          <div
            style="width: 60px; height: 26px; display: inline-block"
            v-if="scope.row.auditType === '2'"
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
    <trial :item="item" ref="trial" />
    <review :item="item" ref="review" />
    <coachdetails :item="item" ref="coachdetails" />
    <el-dialog
      title="TTT资料库授权"
      :visible.sync="dialogVisible"
      class="dialog-main heightauto"
      top="15%"
      width="32%"
      destroy-on-close
      :close-on-click-modal="false"
    >
        <el-form :model="jlData" ref="jlForm" :rules="jlRules" v-if="shouquan.productId === '6' || shouquan.productId === 6">
        <el-form-item prop="coachCode" label="教练类型">
         <el-select v-model="jlData.coachCode">
           <el-option v-for="(item,index) in jlOptions" :key="index" :value="item.coachCode" :label="item.coachCodeName"></el-option>
         </el-select>
        </el-form-item>
      </el-form>
      <div class="box">
        您将授权{{ shouquan.applyName }}
        <span v-if="shouquan.applyPhone">（{{ shouquan.applyPhone }}）</span>
        <span v-else>（{{ shouquan.email }}）</span>
        教练角色，并开通{{ shouquan.productName }}资料库权限。
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="shouquanConFirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import trial from './components/trial'
import review from './components/review'
import coachdetails from './components/coachdetails'
import { baseRequest } from '../../api/base'
import { baseSearch } from '../../api/base'
import { download } from '@/utils/download'
export default {
  components: {
    trial,
    review,
    coachdetails
  },
  data() {
    return {
      dialogVisible: false,
      // showdetails: false,
      // showtrial: false,
      // showreview: false,
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
      applyId: '',
      formData: {
        startTime: null,
        endTime: null
      },
      pageNo: 1,
      total: 1,
      pageSize: 10,
      options: [
        {
          value: '1',
          label: 'First Step'
        },
        {
          value: '6',
          label: '1-1教练会谈'
        }
      ],
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
      // options2: [
      //   {
      //     value: '0',
      //     label: '通过'
      //   },
      //   {
      //     value: '1',
      //     label: '待审核'
      //   },
      //   {
      //     value: '2',
      //     label: '驳回'
      //   }
      // ],
      options2: [
        {
          value: null,
          label: '全部'
        },
        {
          value: '1',
          label: '待授权'
        },
        {
          value: '0',
          label: '已授权'
        }
      ],
      form: {
        applyName: '',
        email: '',
        beginTime: '',
        endTime: '',
        auditType: '',
        reviewType: '',
        productId: '',
        applyPhone: ''
      },
      shouquan: {
        applyName: '',
        applyPhone: '',
        email: '',
        productId: '',
        applyId: '',
        auditType: '',
        id: ''
      },
      tableData: [],
      loading: false,
      download: false,
      downLoading: false,
      jlOptions: [],
      jlData: {
        coachCode: ''
      },
      jlRules: {
        coachCode: [
          { required: true, message: '请选择教练类型' }
        ]
      }
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 158
    }
  },
  created() {
    this.searchOption()
    this.getOptions()
  },
  methods: {
    getOptions() {
      baseRequest('/user/rwProductPrice/getOneToOnePriceList', { productId: '6', configId: '2' }).then(response => {
        this.jlOptions = response.data.item
      })
    },
    // 点击授权
    buttonshouquan(row) {
      this.dialogVisible = true
      this.shouquan.applyName = row.applyName
      this.shouquan.applyPhone = row.applyPhone
      this.shouquan.email = row.email
      this.shouquan.productId = row.productId
      this.shouquan.productName = row.productName
      this.shouquan.applyId = row.applyId
      this.shouquan.auditType = row.auditType
      this.shouquan.id = row.id
      this.jlData.coachCode = this.jlOptions[0] ? this.jlOptions[0].coachCode : ''
    },
    // 授权确定
    shouquanConFirm() {
      const param = {
        applyId: this.shouquan.applyId,
        productId: this.shouquan.productId,
        auditType: this.shouquan.auditType,
        applyName: this.shouquan.applyName,
        id: this.shouquan.id
      }
      if (this.shouquan.productId === '6' || this.shouquan.productId === 6) {
        this.$refs['jlForm'].validate((valid) => {
          if (valid) {
            param.coachCode = this.jlData.coachCode
            baseRequest('/user/rwTttApply/updateTTTApply', param).then(() => {
              this.$Message.success('操作成功')
              this.searchOption()
              this.dialogVisible = false
            })
          } else {
            return false
          }
        })
      } else {
        baseRequest('/user/rwTttApply/updateTTTApply', param).then(() => {
          this.$Message.success('操作成功')
          this.searchOption()
          this.dialogVisible = false
        })
      }
    },
    exportHistory() {
      this.downLoading = true
      const params = {
        applyName: this.form.applyName,
        email: this.form.email,
        beginTime: this.form.beginTime,
        endTime: this.form.endTime,
        auditType: this.form.auditType,
        reviewType: this.form.reviewType,
        productId: this.form.productId,
        applyPhone: this.form.applyPhone
      }
      download(
        '/user/rwTttApply/export',
        params,
        (_) => {
          this.downLoading = false
        },
        (_) => {
          this.downLoading = false
        }
      )
    },
    showChange(param) {
      console.log(param)
    },

    // 初审
    buttonTrial(row) {
      this.$router.push({
        name: 'basicinformationcopy',
        query: {
          applyIdjlchushen: row.applyId,
          applyTime: row.applyTime,
          major: row.id,
          xsPage: 0,
          productId: row.productId
        }
      })
    },
    // 初审详情
    detailsdialog(row) {
      this.$router.push({
        name: 'basicinformationcopy',
        query: {
          jlchushendetails: row.applyId,
          applyTime: row.applyTime,
          major: row.id,
          xsPage: 0,
          productId: row.productId
        }
      })
    },
    // 复审详情
    // detailsdialogfushen(row) {
    //   this.$router.push({
    //     name: 'basicinformation',
    //     query: {
    //       jlfushendetails: row.applyId,
    //       applyTime: row.applyTime,
    //       major: row.id,
    //       xsPage: 0
    //     }
    //   })
    // },
    // // 复审
    // buttonReview(row) {
    //   this.$router.push({
    //     name: 'basicinformation',
    //     query: {
    //       applyIdjlfushen: row.applyId,
    //       applyTime: row.applyTime,
    //       major: row.id,
    //       xsPage: 0
    //     }
    //   })
    // },
    table(page) {
      this.loading = true
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/user/rwCoachApply/selectList', param).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    searchOption(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      const data = Object.assign(this.form, param)
      baseSearch('/user/rwTttApply/selectList', data).then((response) => {
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

<style lang="scss" >
.box {
  box-sizing: border-box;
  padding-top: 15px;
  padding-bottom: 30px;
}
.jlsh-content {
  .formitem {
    margin-bottom: 0;
  }
  width: 1440px;
  background-color: #ffffff;
  position: relative;
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
  .el-table__body tr {
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
  .coachaudit-search {
    width: 90px;
    height: 40px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #00afff;
    font-size: 16px;
    color: #00afff;
    position: absolute;
    top: 63px;
    right: 26px;
  }
  .button-details {
    width: 50px;
    height: 26px;
    border-radius: 4px;
    text-align: center;
    line-height: 9px;
    display: inline-block;
    margin-top: 0px;
    font-size: 15px;
    padding: 0px;
  }
  .button-trial {
    width: 50px;
    height: 26px;
    border-radius: 4px;
    text-align: center;
    line-height: 9px;
    display: inline-block;
    margin-top: 0px;
    font-size: 15px;
    padding: 0px;
  }
  .button-review {
    width: 50px;
    height: 26px;
    text-align: center;
    line-height: 9px;
    border-radius: 4px;
    display: inline-block;
    margin-top: 0px;
    font-size: 15px;
    padding: 0px;
  }
}
</style>