<template>
  <div class="big-customer">
    <div
      class="bigCustomer inside-container"
      :style="{ minHeight: tableHight + 'px' }"
    >
      <!-- 查询添加 -->
      <h1 class="query-title">大客户管理</h1>
      <el-form
        :inline="true"
        ref="form"
        :model="queryForm"
        class="query-form"
        :rules="rules"
      >
        <el-form-item label="" class="formitem">
          <div class="qurey-label">客户名称</div>
          <el-input
            style="width: 213px; height: 40px"
            placeholder="请填写客户名称"
            v-model="queryForm.userName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="" class="formitem" prop="userPhone">
          <div class="qurey-label">客户手机号</div>
          <el-input
            style="width: 213px; height: 40px"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxlength="11"
            placeholder="请填写手机号"
            v-model="queryForm.userPhone"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="" class="formitem" prop="email">
          <div class="qurey-label">客户邮箱</div>
          <el-input
            style="width: 213px; height: 40px"
            placeholder="请填写邮箱"
            v-model="queryForm.email"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="" class="formitem">
          <div class="qurey-label">协议</div>
          <el-input
            style="width: 213px; height: 40px"
            maxlength="20"
            placeholder="请填写协议"
            v-model="queryForm.agreement"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="qurey-label">产品</div>
          <el-select
            v-model="productId"
            multiple
            collapse-tags
            clearable
            style="width: 213px"
          >
            <el-option
              v-for="item in optionsproduct"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="startTime">
          <div class="qurey-label">添加日期</div>
          <el-date-picker
            v-model="queryForm.beginTime"
            style="margin-right: 0px; width: 213px"
            class="learn-input"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始日期"
            :picker-options="pickerOptionsStart"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label=""
          prop="endTime"
          style="margin-top: 28px; margin-right: 30px"
        >
          <span style="margin-right: 10px">至</span>
          <span class="inpt-title form-label"></span>
          <el-date-picker
            v-model="queryForm.endTime"
            style="width: 213px"
            class="learn-input"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束日期"
            :picker-options="pickerOptionsEnd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          style="
            display: flex;
            justify-content: flex-end;
            margin-top: -64px;
            z-index: 1000;
          "
        >
          <el-button
            @click="addUsers"
            style="
              width: 90px;
              height: 30px;
              line-height: 0.5;
              border: solid 1px #00afff;
              color: #00afff;
            "
            >添加</el-button
          >
          <el-button
            @click="searchOption()"
            type="primary"
            style="width: 90px; height: 30px; line-height: 0.5"
            >查询</el-button
          >
          <el-button
            @click="exportdetail()"
            :loading="downLoading"
            style="width: 90px; height: 30px; line-height: 0.5"
            >下载</el-button
          >
        </el-form-item>
        <div
          style="
            width: 1392px;
            height: 1px;
            border: dashed 1px #aaaaaa;
            margin-top: 20px;
            margin-bottom: 23px;
          "
        ></div>
        <h1 class="query-title">数据列表</h1>
        <!-- table数据列表 -->
        <el-table
          class="table-main"
          :data="tableData"
          style="width: 100%"
          border
          v-loading="loading"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50px"
          ></el-table-column>
          <el-table-column
            prop="userName"
            label="客户名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="userPhone"
            label="客户手机号"
            align="center"
            width="130px"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="客户邮箱"
            :show-overflow-tooltip="true"
            align="center"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="agreement"
            :show-overflow-tooltip="true"
            label="协议"
            align="center"
            width="120px"
          ></el-table-column>
          <el-table-column
            prop="productName"
            label="产品"
            align="center"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="numbers"
            label="学员人数"
            align="center"
            width="80px"
          >
            <template slot-scope="scope">
              {{ scope.row.optNum + "/" + scope.row.numbers }}
            </template>
          </el-table-column>
          <el-table-column
            prop="addTime"
            label="添加时间"
            width="200px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="effectTime"
            label="截止日期"
            width="120px"
            align="center"
          ></el-table-column>
          <el-table-column prop="operation" label="操作" align="center" width="240"  fixed="right">
            <template slot-scope="scope">
              <el-button
                type="primary"
                style="width: 50px; height: 30px; font-size: 15px; padding: 0"
                @click="changeHandle(scope.row)"
                v-if="scope.row.optNum !== 0 ? false : true"
                >修改
              </el-button>
              <el-button
                type="primary"
                style="width: 50px; height: 30px; font-size: 15px; padding: 0"
                @click="changeHandle(scope.row,true)"
               v-else
                >详情
              </el-button>
              <el-button
                type="info"
                plain
                style=" height: 30px; font-size: 15px; padding: 0 10px"
                @click="details(scope.row)"
                :disabled="scope.row.optNum === 0"
                >
                学员信息
                </el-button>
              <el-button
                type="danger"
                plain
                style="width: 50px; height: 30px; font-size: 15px; padding: 0"
                @click="dele(scope.row)"
                :disabled="scope.row.optNum === 0 ? false : true"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <!-- 分页 -->
      <sur-pagination
        :pageNo="pageNo"
        :total="total"
        :pageSize="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </sur-pagination>
      <!-- 添加和修改 -->
      <el-dialog
        append-to-body
        :title="this.uploadStatus === 0 ? '添加' : (isDetail?'详情':'修改')"
        :visible.sync="uploadVisible"
        class="dialog-main heightauto"
        top="10%"
        width="600px"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <customer
          v-if="changeShowVisible && uploadVisible"
          ref="customer"
          :currentId="currentId"
          :numbers="numbers"
          :agreement="agreement"
          :effectTime="effectTime"
          :isDetail="isDetail"
        ></customer>
        <addShow v-if="addShowVisible && uploadVisible" ref="addShow"></addShow>
        <span slot="footer">
          <el-button @click="uploadVisible = false">取消</el-button>
          <el-button v-if="!isDetail" type="primary" @click="saveHandle">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 查看详情 -->
      <el-dialog
        title="学员详情"
        append-to-body
        :visible.sync="particularsVisible"
        class="dialog-main heightauto"
        top="5%"
        width=" 630px"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <particulars
          v-if="particularsVisible"
          :currentRow="currentRow"
          @handleClose="handleClose"
        ></particulars>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { download } from '@/utils/download'
// import { baseSearch } from '@/api/base'
import { baseRequest } from '@/api/base'
import customer from './components/bigCustomer'
import addShow from './components/addShow'
import particulars from './components/particulars'
export default {
  components: {
    customer,
    particulars,
    addShow
  },
  data() {
    var checkInput = (rule, value, callback) => {
      if (value === '' || /^1[34578]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请正确输入手机号'))
      }
    }
    return {
      isDetail: false, // 是否是详情
      loading: false,
      queryForm: {
        userName: null,
        endTime: null,
        userPhone: null,
        email: null,
        beginTime: null,
        agreement: null
      },
      productId: [],
      currentProductId: '',
      downLoading: false,
      currentRow: null,
      currentId: {},
      numbers: null,
      effectTime: '',
      agreement: '',
      uploadStatus: 0,
      uploadVisible: false,
      addShowVisible: false,
      changeShowVisible: false,
      particularsVisible: false,
      pageNo: 1,
      total: null,
      pageSize: 10,
      tableData: [],
      optionsproduct: [
        {
          value: '1',
          label: 'First Step'
        },
        {
          value: '3',
          label: 'SP'
        },
        {
          value: '5',
          label: '探索之门'
        },
        {
          value: '6',
          label: '1-1教练会谈'
        }
      ],
      rules: {
        userPhone: [{ required: true, validator: checkInput }]
      },
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.queryForm.endTime !== '') {
            let date = this.queryForm.endTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.queryForm.beginTime !== '') {
            let date = this.queryForm.beginTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      }
    }
  },
  methods: {
    // 导出
    exportdetail() {
      this.downLoading = true
      const params = {
        userName: this.queryForm.userName,
        endTime: this.queryForm.endTime,
        beginTime: this.queryForm.beginTime,
        userPhone: this.queryForm.userPhone,
        agreement: this.queryForm.agreement,
        productName: this.productId
      }
      download(
        '/user/rwMessageTob/toCDownLoad',
        params,
        (_) => {
          this.downLoading = false
        },
        (_) => {
          this.downLoading = false
        }
      )
    },

    handleClose() {
      this.particularsVisible = false
    },
    searchOption(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userName: this.queryForm.userName,
        endTime: this.queryForm.endTime,
        beginTime: this.queryForm.beginTime,
        userPhone: this.queryForm.userPhone,
        email: this.queryForm.email,
        agreement: this.queryForm.agreement
      }
      params.product = this.productId.length > 0 ? this.productId : ''
      this.loading = true
      baseRequest('/user/rwMessageTob/selects', params).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    dele(row) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/user/rwMessageTob/delete', { id: row.id }).then(
          (response) => {
            if (response.msg === 'Success') {
              this.$Message.success('操作成功')
              this.searchOption()
            }
          }
        )
      })
    },
    details(row) {
      this.currentRow = row
      this.particularsVisible = true
    },
    changeHandle(row, isDetail) {
      this.isDetail = !!isDetail
      this.currentId = row
      this.numbers = row.numbers
      this.agreement = row.agreement
      this.uploadStatus = 1
      this.uploadVisible = true
      this.addShowVisible = false
      this.changeShowVisible = true
      this.effectTime = row.effectTime
    },
    addUsers() {
      this.uploadStatus = 0
      this.addShowVisible = true
      this.changeShowVisible = false
      this.uploadVisible = true
    },
    emptyHandle() {
      this.$refs.customer.empty()
    },
    saveHandle() {
      if (this.addShowVisible) {
        this.$refs.addShow.saveHandle((response) => {
          if (response.msg === 'Success') {
            this.$Message.success('添加成功')
            this.searchOption()
          }
          this.uploadVisible = false
        })
      }
      if (this.changeShowVisible) {
        this.$refs.customer.changeHandle((response) => {
          if (response.msg === 'Success') {
            this.$Message.success('修改成功')
            this.searchOption()
          }
          this.uploadVisible = false
        })
      }
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
  },
  created() {
    this.searchOption()
  },
  computed: {
    tableHight() {
      // eslint-disable-next-line no-irregular-whitespace
      return this.$store.state.app.containHeight - 158
    }
  }
}
</script>

<style lang="scss" scoped>
.big-customer {
  padding-bottom: 50px;
  .bigCustomer {
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0px 10px 10px 10px;
    padding: 24px;
    .query-title {
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .query-form {
      .formitem {
        margin-right: 40px;
      }
      .qurey-label {
        height: 28px;
        line-height: 28px;
      }
    }
  }
}
</style>