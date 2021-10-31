<template>
  <el-dialog
  id="Billingdetails"
  title="设置"
  :visible.sync="dialogsalejsxq"
  width="900px"
  top="9vh"
  destroy-on-close
  :close-on-click-modal="false">
   <div class="box-middle">
    <div class="box-topmiddle">
        <!-- <el-form  :inline="true"  ref="form" :model="form" label-width="80px" class="sysquery">
            <el-row style="font-size:18px">
                <el-col :span="6">
                    <el-form-item label="教练名字" class="formitem">
                            <el-input placeholder="" clearable v-model="form.userName"></el-input>
                        </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item label="开班日期">
                    <el-form-item label="" class="formitem">
                            <el-date-picker v-model="form.startTime"
                                style="margin-right:0px;width: 200px;"
                                class="learn-input"
                                type="date"
                                value-format='yyyy-MM-dd'
                                placeholder="请选择开始日期"
                                :picker-options="pickerOptionsStart">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label=""  prop="endTime">
                            <span style="margin-right:10px;">至</span>
                            <span class="inpt-title  form-label"></span>
                            <el-date-picker v-model="form.startTimeOne"
                                  style="width: 200px;"
                                  class="learn-input"
                                  type="date"
                                  value-format='yyyy-MM-dd'
                                  placeholder="请选择结束日期"
                                  :picker-options="pickerOptionsEnd"
                                  >
                              </el-date-picker> 
                        </el-form-item>
                    </el-form-item>
                </el-col>
            <el-col :span="4">
                <el-button  @click="pagingHandle" type="primary" style="margin-top:36px">搜索</el-button>
            </el-col>
            </el-row>
      </el-form> -->
      <!-- <el-button  @click="exportExceldetails" :loading='downLoading' style="padding:0px;width: 90px;height: 30px;margin-top:10px;margin-bottom:10px;float: right;margin-right:17px;line-height:0.5;border: solid 1px #00afff;color: #00afff;" >下载</el-button> -->
    </div>
    <!-- 表格 -->
    <el-table class="table-main" :data="tableData" v-loading="loading" @current-change="handleCurrentRowChange" border style="height:315px;overflow:auto">
        <el-table-column width="55" align="center">
           <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.row.userId"><span></span></el-radio>
                </template>
        </el-table-column>
      <el-table-column prop="applyId" type=index label="序号" width="55" align="center"></el-table-column>
      <el-table-column prop="userName" label="教练名称" align="center"></el-table-column>
      <el-table-column prop="loginName" label="教练手机号" align="center"></el-table-column>
      <el-table-column prop="email" label="教练邮箱" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <sur-pagination
      :pageNo="pageNo"
      :total="total"
      :pageSize="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></sur-pagination>
   </div>
    <span slot="footer">
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
import { baseRequest, baseSearch } from '../../../../api/base'
import { download } from '@/utils/download'
export default {
  props: {
    oldUserId: {
      type: Object,
      default: ''
    }
  },
  data() {
    return {
      rowItem: {},
      form: {
        userName: '',
        startTime: '',
        startTimeOne: ''
      },
      radio: null,
      dialogsalejsxq: false,
      tableData: [],
      applyId: '',
      applyName: '',
      applyPhone: '',
      pageNo: 1,
      total: 1,
      pageSize: 10,
      table: false,
      downLoading: false,
      loading: false,
      ifExport: false
    }
  },
  created() {
  },
  mounted() {
    // this.searchOption()
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 200
    }
  },
  methods: {
    empty() {
      // this.$refs.form.resetFields()
      this.radio = null
    },
    submit() {
      if (!this.radio) {
        this.$Message.warning('请选择教练')
        return
      }
      this.$confirm('确定此次的调班么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 接口
        this.tabledetail()
      }).catch(() => {})
    },
    handleCurrentRowChange(val) {
      this.rowItem = val
    },
    exportExceldetails() {
      this.downLoading = true
      this.ifExport = true

      download('/finance/rwRebateSettlement/getAllUserSettlement', { ifExport: this.ifExport }, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    },
    tabledetail() {
      const param = {
        courseId: this.oldUserId.courseId,
        yuserId: this.oldUserId.userId,
        xuserId: this.rowItem.userId,
        productId: this.oldUserId.productId
      }
      if (Number(this.oldUserId.productId) === 9) {
        param.recordId = this.oldUserId.recordId
      }
      baseRequest('/course/firstStep/coachCourse', param).then((response) => {
        if (response.data.item.status === '1') {
          this.$message({
            type: 'success',
            message: response.data.item.message
          })
          this.empty()
          this.dialogsalejsxq = false
          this.$emit('refresh')
        } else if (response.data.item.status === 2) {
          this.$message({
            type: 'warning',
            message: response.data.item.message
          })
        }
      })
    },
    searchOption(page) {
      this.loading = true
      this.radio = null
      const params = {
        pageNo: 1,
        pageSize: this.pageSize,
        userId: page.userId || this.oldUserId.userId,
        productId: page.productId
      }
      const data = Object.assign(this.form, params)
      baseSearch('/course/courses/courseUserList', data).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageNo = response.data.pageNo
        this.loading = false
      })
    },
    pagingHandle(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userId: this.oldUserId.userId,
        productId: this.oldUserId.productId

      }
      const data = Object.assign(this.form, params)
      baseSearch('/course/courses/courseUserList', data).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageNo = response.data.pageNo
        this.loading = false
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.pagingHandle()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.pagingHandle(true)
    }
  }
}
</script>

<style lang="scss" >
#Billingdetails .el-dialog{
    border-radius: 10px;
    .el-dialog__header, .el-dialog__footer {
        border-radius: 10px;
}
    .box-middle{
        width: 100%;
        padding:20px;
         
    }
}

</style>