/** 沟通人员 */
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
            <a @click="tableVisual = !tableVisual">沟通事项&nbsp;&nbsp; <svg-icon :icon-class="tableVisual ? 'icon-zhetie' : 'icon-zhetie-activity'" /></a>
          </template>
          <template slot-scope="scope">
            <span v-if="disable">{{ scope.row.trackItem }}</span>
            <a v-else class="alive-text" @click="updateHandle(scope.row)">{{ scope.row.trackItem }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="trackUser" label="沟通人" align="center" width="180"></el-table-column>
        <el-table-column prop="duration" label="时长" align="center" width="120">
          <template slot-scope="scope">
            {{scope.row.duration ? scope.row.duration + 'min' : ''}}
          </template>  
        </el-table-column>
        <el-table-column prop="startDate" label="开始时间" align="center" width="160"></el-table-column>
        <el-table-column prop="endDate" label="结束时间" align="center" width="160"></el-table-column>
        <el-table-column prop="reachDate" label="达成日期" align="center" width="160"></el-table-column>
        <el-table-column align="center" width="170">
          <template #header>
              <a v-if="!disable" class="table-header-title" @click="addHandle"><svg-icon  icon-class="icon-add" /> 添加</a>
          </template>
          <template slot-scope="scope">
            <div class="achieved" v-if="scope.row.reachState === '1'" style="color: #04ae0f; text-align: center;" >
              <svg-icon style="fontSize: 16px" icon-class="icon-flag" /> 已达成
            </div>
            <div v-else-if="disable" class="achieved" style="color: gray; text-align: center;">
              <svg-icon style="fontSize: 16px" icon-class="icon-flag" /> 未达成
            </div>
            <div v-else>
              <el-button type="danger" size="mini" plain @click.native.prevent="deleteRow(scope.row)">删除</el-button>
              <el-button type="primary" size="mini" @click.native.prevent="reachRow(scope.row)">达成</el-button>
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
    <comu-form ref="form" label="沟通事项"
      :viewDate="dailyDate" 
      :dailyDate="dailyDate"
      :disable="disable"
      @refresh="refresh" />
    <!-- <person-form ref="form" :view-date="viewDate" @refresh="refresh" /> -->
    <reach ref="reach" @reachCallBack="reachCallBack"></reach>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { icon } from '../../icon'
import personForm from './person-form'
import Reach from '../../Reach'
import ComuForm from './comu-form'

export default {
  components: {
    personForm,
    Reach,
    ComuForm
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    dailyDate: String,
    disable: Boolean
  },
  computed: {
    viewDate() {
      const date = this.dailyDate ? new Date(this.dailyDate.replace(/-/g, '/')) : new Date()
      return date.getFullYear() + ''
    },
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
      updateRow: null
    }
  },
  watch: {
    dailyDate() {
      this.searchOption()
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
        dailyDate: this.dailyDate,
        pageNo: this.pageNo,
        pageSize: this.pageSize

      }
      baseRequest('/objective/rwDailyTrack/selects', param).then(response => {
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
    // 达成目标
    reachRow(row) {
      this.updateId = row.trackId
      this.updateRow = row
      this.$refs.reach.openDialog()
    },
    deleteRow(row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          trackId: row.trackId
        }
        baseRequest('/objective/rwDailyTrack/delete', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.searchOption()
          })
      })
    },
    /**
     * 达成
     */
    reachCallBack(date) {
      const param = {
        trackId: this.updateId,
        reachState: '1',
        reachDate: date
      }
      baseRequest('/objective/rwDailyTrack/update', param)
        .then(response => {
          this.$Message.success('操作成功')
          this.searchOption()
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
    .table-add {
      position: absolute;
      right: 0;
    }
</style>