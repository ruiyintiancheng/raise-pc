/** 紧要/重要 事项计划表表格 */
<template>
  <div>
    <div>
      <el-table
        v-loading="loading"
        class="table-main"
        :data="getTableDate"
        border
        style="width: 100%">
        <el-table-column show-overflow-tooltip>
          <template #header>
            <a @click="tableVisual = !tableVisual">{{label}} <svg-icon :icon-class="tableVisual ? 'icon-zhetie' : 'icon-zhetie-activity'" /></a>
          </template>
          <template slot-scope="scope">
              <svg-icon v-if="!!scope.row.sourceType" :style="{color: icon(scope.row.sourceType).color ,fontSize:'16px'}" :icon-class="icon(scope.row.sourceType).icon" /> 
              <span v-if="scope.row.reachState === '1'|| scope.row.stopState==='1'">{{scope.row.dailyMatter}}</span>
              <a v-else class="alive-text" @click="updateHandle(scope.row)">{{scope.row.dailyMatter}}</a>
          </template>
        </el-table-column>
        <el-table-column label="时长" align="center" width="160">
          <template slot-scope="scope">
            {{scope.row.duration ? scope.row.duration + 'min' : ''}}
          </template>  
        </el-table-column>
        <el-table-column label="日程" align="center" width="220">
          <template slot-scope="scope">
            <span>{{scope.row.startDate}}</span>
            <span style="padding: 0 15px;">—</span>
            <span>{{scope.row.endDate}}</span>
          </template>  
        </el-table-column>
        <el-table-column prop="reachDate" label="达成/终止日期" align="center" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.reachDate">{{scope.row.reachDate}}</span>
            <span class="danger-cl" v-else-if="scope.row.stopDate">{{scope.row.stopDate}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="240">
          <template #header >
              <a v-if="!disable" class="table-header-title" @click="addHandle"><svg-icon  icon-class="icon-add" /> 添加</a>
              <span v-else>达成状态</span>
          </template>
          <template slot-scope="scope">
            <div class="achieved" v-if="scope.row.reachState === '1'">
              <svg-icon style="fontSize: 16px" icon-class="icon-flag" /> 已达成
            </div>
            <div class="achieved danger-cl" v-else-if="scope.row.stopState === '1'">
            <svg-icon :style="{fontSize:'18px'}" icon-class="stop" /> 已终止
          </div>
            <div v-else-if="disable" class="achieved" style="color: gray; text-align: center;">
              <svg-icon :style="{fontSize:'16px'}" icon-class="icon-flag" /> 未达成
            </div>
            <div v-else>
              <el-button @click.native.prevent="deleteRow(scope.row)" type="danger" plain size="mini">删除</el-button>
              <el-button 
                @click.native.prevent="delayRow(scope.row)" plain
                type="info"
                size="mini">
                延后
            </el-button>
              <el-button 
                @click.native.prevent="stopRow(scope.row)"
                type="danger"
                size="mini">
                终止
            </el-button>
            <div style="margin-top:10px;">
              <el-button type="primary" size="mini" @click.native.prevent="reachRow(scope.row)">达成</el-button>
              <el-button type="primary" size="mini" @click.native.prevent="stateRow(scope.row)" :disabled="isDisabled(scope.row)">{{dailyType === '0' ? '转为重要' : '转为紧要'}}</el-button>
            </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <sur-pagination v-if="total > pageSize" :pageNo="pageNo"
                      :total="total"
                      :pageSize="pageSize"
                      @size-change="handleSizeChange"  
                      @current-change="handleCurrentChange">
      </sur-pagination>
    </div>
    <matter-form ref="form" :label="formLable" :dailyType="dailyType" 
      :dailyDate="dailyDate" 
      :disable="disable"
      @refresh="refresh" />
    <reach ref="reach" @reachCallBack="reachCallBack"></reach>
     <el-dialog
           append-to-body
          :title="'选择延后日期'"
          :visible.sync="visible"
          class="dialog-main reach-dialog"
          top="10%"
          width="400px"
          destroy-on-close
          :close-on-click-modal="false">
            <el-form ref="formDelay" :model="formData" :rules="rules">
                <el-form-item prop="dailyDate" label="延后日期">
                    <el-date-picker style="width:100%" v-model="formData.dailyDate"
                        type="date"
                        value-format='yyyy-MM-dd'
                        :editable="false"
                        :clearable="false"
                        :picker-options="pickerOptions"
                        >
                    </el-date-picker>
                </el-form-item>
            </el-form>
         <span slot="footer">
            <!-- <span class="dialog-error-msg">请填写达成日期</span> -->
            <el-button  @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="saveHandle" >确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { icon } from '../../icon'
import matterForm from './matter-form'
import Reach from '../../Reach'
import { parseTime } from '@/utils/index'

export default {
  components: {
    matterForm,
    Reach
  },
  props: {
    formLable: String,
    label: {
      type: String,
      default: ''
    },
    dailyDate: String,
    dailyType: {
      type: [String],
      default: null
    },
    disable: Boolean
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 255
    },
    getTableDate() {
      return this.tableVisual ? this.tableData : this.tableData_
    }
  },
  data() {
    return {
      icon,
      loading: false,

      pageNo: 1,
      pageSize: 10,
      total: null,

      tableData: [],
      tableData_: [],
      tableVisual: true,

      updateId: null,
      visible: false,
      formData: {
        dailyDate: null
      },
      currentRow: {},
      pickerOptions: {
        disabledDate: (time) => {
          let dailyDate = this.dailyDate + ' 00:00:00'
          dailyDate = dailyDate.replace(/-/g, '/')
          const bewforeDate = new Date(dailyDate).getTime() + 24 * 3600 * 1000
          return time.getTime() < bewforeDate
        }
      },
      rules: {
        dailyDate: [
          { required: true, message: '请选择延后日期' }
        ]
      }
    }
  },
  watch: {
    dailyDate(val) {
      this.searchOption()
    }
  },
  created() {
    this.searchOption()
  },
  mounted() {},
  methods: {
    delayRow(row) {
      this.formData.dailyDate = null
      this.currentRow = row
      this.visible = true
      this.$refs.formDelay.clearValidate()
    },
    saveHandle() {
      this.$refs.formDelay.validate((valid) => {
        if (valid) {
          const param = {
            dailyId: this.currentRow.dailyId,
            dailyDate: this.formData.dailyDate
          }
          baseRequest('/objective/rwDaily/delayReach', param)
            .then(response => {
              this.$Message.success('操作成功')
              this.visible = false
              this.searchOption()
            })
        } else {
          return false
        }
      })
    },
    isDisabled(row) {
      if (this.dailyType === '1') {
        return false
      } else {
        if (row.sourceType === '11' || row.sourceType === '12') {
          return false
        } else {
          return row.preEndDate <= parseTime(new Date(), '{y}-{m}-{d}')
        }
      }
    },
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        dailyDate: this.dailyDate,
        dailyType: this.dailyType,

        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/objective/rwDaily/selects', param).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.loading = false

        if (this.tableData.length > 0) {
          this.tableData_ = [this.tableData[0]]
        }
      })
    },
    refresh() {
      this.searchOption()
    },
    addHandle() {
      this.$refs.form.openDialog()
    },
    updateHandle(row) {
      this.$refs.form.openDialog(row)
    },
    deleteRow(row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          dailyId: row.dailyId,
          sourceType: row.sourceType
        }
        baseRequest('/objective/rwDaily/delete', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.searchOption()
          })
      })
    },
    stopRow(row) {
      this.$confirm('确定终止该事项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwDaily/stopDailyCont', { dailyId: row.dailyId }).then(response => {
          this.$Message.success('操作成功')
          this.searchOption()
        })
      })
    },
    // 达成目标
    reachRow(row) {
      this.updateId = row.dailyId
      this.$refs.reach.openDialog(row.startDate)
    },
    /**
     * 达成
     */
    reachCallBack(date) {
      const param = {
        dailyId: this.updateId,
        reachDate: date
      }
      baseRequest('/objective/rwDaily/reach', param)
        .then(response => {
          this.$Message.success('操作成功')
          this.searchOption()
        })
    },
    // 转为重要 紧要
    stateRow(row) {
      const param = {
        dailyId: row.dailyId
      }
      if (this.dailyType === '0') {
        param.dailyType = '1'
      }
      if (this.dailyType === '1') {
        param.dailyType = '0'
      }
      baseRequest('/objective/rwDaily/switchState', param).then(response => {
        this.$Message.success('操作成功')
        this.searchOption()
        this.$emit('refresh', this.dailyType)
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
    .danger-cl{
      color: #F56C6C;
    }
</style>