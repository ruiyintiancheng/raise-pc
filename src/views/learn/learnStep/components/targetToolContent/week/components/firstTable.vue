/** 周首要目标 */
<template>
  <div>
    <div >
      <el-table
        v-loading="loading"
        class="table-main"
        :data="tableData"
        row-key="monContId"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        style="width: 100%">
        <el-table-column show-overflow-tooltip label="目标">
          <template slot-scope="scope">
            <a class="alive-text" @click="updateHandle(scope.row)">{{scope.row.weekContent}}</a>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="weekType" label="领域" align="center"></el-table-column> -->
        <el-table-column align="center" width="180">
          <template slot="header">
              <a v-if="!disable" class="table-header-title" @click="addHandle"><svg-icon  icon-class="icon-add" /> 添加</a>
          </template>
          <template slot-scope="scope">
            <el-button :disabled="disable" @click.native.prevent="deleteRow(scope.row)" type="danger" plain size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <sur-pagination v-if="total > pageSize" :pageNo="pageNo"
                      :total="total"
                      :pageSize="pageSize"
                      @size-change="handleSizeChange"  
                      @current-change="handleCurrentChange">
      </sur-pagination> -->
    </div>
    <el-dialog
           append-to-body
          :title="(this.updateStatus === 0?'添加':'修改')+'首要目标'"
          :visible.sync="updateVisible"
          class="dialog-main heightauto"
          top="10%"
          width="400px"
          destroy-on-close
          :close-on-click-modal="false"
          >
          <el-form ref="formDetail" :model="detailData" :rules="detailRules" v-if="updateVisible">
            <el-form-item style="margin-top:0px;" prop="weekContent">
                <div class="form-label required">目标</div>
                <el-input type="textarea" :rows="4" style="" v-model.trim="detailData.weekContent" show-word-limit maxlength="100"></el-input>
            </el-form-item>
            <!-- <el-form-item style="margin-top:0px;" prop="dreamField">
                <div class="form-label required">领域</div>
                <el-select style="width:100%" v-model="detailData.dreamField">
                    <el-option v-for="item in rangeOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item> -->
          </el-form>
          <span slot="footer" v-if="!disable">
            <el-button  @click="updateVisible = false">取 消</el-button>
            <el-button type="primary" @click="detailSave">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'

export default {
  components: {},
  props: {
    viewDate: {
      type: String,
      default: null
    },
    // 领域名称
    label: {
      type: String,
      default: ''
    },
    startWeek: [String, Number],
    endWeek: [String, Number],
    courseId: [String, Number],
    disable: Boolean
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 255
    }
  },
  data() {
    return {
      loading: false,

      pageNo: 1,
      pageSize: 10,
      total: null,

      tableData: [],
      updateStatus: 0,
      updateVisible: false,
      detailData: {
        weekContent: '',
        weekId: null
      },
      detailRules: {
        weekContent: [
          { required: true, message: '请输入目标' }
        ]
      }
    }
  },
  created() {
    this.searchOption()
  },
  mounted() {

  },
  methods: {
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        // viewDate: this.viewDate
        // pageNo: this.pageNo,
        // pageSize: this.pageSize
        courseId: this.courseId,
        startDate: this.startWeek,
        endDate: this.endWeek
      }
      baseRequest('/course/rwPWeekPlan/getWeekPlan', param).then(response => {
        this.tableData = response.data.item
        // this.total = response.data.total
        // this.pageNo = response.data.pageNo
        this.loading = false
      })
    },
    refresh() {
      this.searchOption()
    },
    deleteRow(row) {
      const param = {
        weekId: row.weekId
      }
      this.$confirm('此操作将永久删除该目标, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/course/rwPWeekPlan/delete', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.searchOption()
          })
      })
    },
    addHandle() {
      this.detailData = {
        weekContent: '',
        weekId: null
      }
      this.updateStatus = 0
      this.updateVisible = true
    },
    updateHandle(row) {
      this.detailData = {
        weekContent: row.weekContent,
        weekId: row.weekId
      }
      this.updateStatus = 1
      this.updateVisible = true
    },
    detailSave() {
      this.$refs['formDetail'].validate((valid) => {
        if (valid) {
          const params = {
            courseId: this.courseId,
            weekContent: this.detailData.weekContent
          }
          if (this.updateStatus === 1) {
            params.weekId = this.detailData.weekId
          } else {
            params.startDate = this.startWeek
            params.endDate = this.endWeek
          }
          baseRequest('/course/rwPWeekPlan/updateWeekPlan', params).then(_ => {
            this.updateVisible = false
            this.$Message.success('操作成功')
            this.searchOption()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSizeChange(val) { // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) { // 分页
      this.pageNo = val
      this.searchOption(true)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../font.scss";
    .achieved{
      font-family: PingFangSC-Regular;
      font-weight: normal;
      font-stretch: normal;
      line-height: 17px;
      letter-spacing: 0px;
      color: #04ae0f;
      text-align: right;
      padding-right:10px;
    }
</style>