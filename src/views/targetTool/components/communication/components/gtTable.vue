/** 沟通总表 */
<template>
  <div>
    <div style="margin: 20px 0;">
      <span>相关人:</span>
      <el-input placeholder="请输入名称" v-model="chargePerson"  clearable 
        style="width: 200px; display: inline-block; margin: 0 10px;"/>
      <el-button type="primary" size="mini" @click.native.prevent="searchOption">搜索</el-button>
    </div>
    <div>
      <el-table
        v-loading="loading"
        class="table-main"
        :data="tableData"
        :height="tableHight"
        border
        style="width: 100%">
        <el-table-column prop="connMatter" label="沟通事项" align="center" ></el-table-column>
        <el-table-column prop="chargePerson" label="相关人" align="center" width="180"></el-table-column>
        <el-table-column label="事项类型" align="center" width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.matterType === '0'">讨论</span>
            <span v-else-if="scope.row.matterType === '1'">授权</span>
            <span v-else-if="scope.row.matterType === '2'">会议</span>
            <span v-else></span>
          </template>  
        </el-table-column>
        <el-table-column prop="startDate" label="追踪日期" align="center" width="160"></el-table-column>
        <el-table-column prop="endDate" label="预计达成日期" align="center" width="160"></el-table-column>
        <el-table-column prop="reachDate" label="达成日期" align="center" width="160"></el-table-column>
        <el-table-column align="center" width="120">
          <template #header>
            <a class="table-upload-title" @click="download"><svg-icon  icon-class="icon-xz" />下载</a>
          </template>
          <template slot-scope="scope">
            <div class="achieved" v-if="scope.row.reachState === '1'" style="color: #04ae0f; text-align: center;" >
              <svg-icon style="fontSize: 16px" icon-class="icon-flag" /> 已达成
            </div>
            <div v-else>
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
    <reach ref="reach" @reachCallBack="reachCallBack"></reach>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { icon } from '../../icon'
import Reach from '../../Reach'
import { downloadFile } from '@/utils/download'
export default {
  components: {
    Reach
  },
  props: {
    viewYear: String
  },
  computed: {
    tableHight() {
      const height = this.$store.state.app.containHeight - 401
      return height < 360 ? 360 : height
    }
  },
  data() {
    return {
      icon,
      loading: false,
      disable: true,
      pageNo: 1,
      pageSize: 10,
      total: null,

      tableData: [],
      chargePerson: '',

      updateId: null,
      updateRow: null
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
        endDate: this.viewYear,

        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      if (this.chargePerson) {
        param.chargePerson = this.chargePerson
      }

      baseRequest('/objective/rwConn/selectMatter', param).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.loading = false
      })
    },
    refresh() {
      this.searchOption()
    },
    // 达成目标
    reachRow(row) {
      this.updateId = row.connId
      this.updateRow = row
      this.$refs.reach.openDialog(row.startDate)
    },
    /**
     * 达成
     */
    reachCallBack(date) {
      const param = {
        connId: this.updateId,
        matterType: this.updateRow.matterType,
        reachDate: date
      }
      baseRequest('/objective/rwConn/reach', param)
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
    },
    // 下载
    download() {
      downloadFile('/objective/rwConn/upload', { endDate: this.viewYear, chargePerson: this.chargePerson })
        .finally(_ => {
        })
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
    .alive-text.red {
      color:red
    }
</style>