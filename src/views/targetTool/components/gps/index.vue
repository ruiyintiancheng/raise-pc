<template>
    <div class="tt-gps">
        <h4 class="tt-title">
          <span class="fl">目标清单总表</span>
          <div class="fr">
            <el-select size="mini" style="width:130px;margin-right:5px;" v-model="valueField" placeholder="请选择领域" clearable>
              <el-option v-for="item in rangeOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
            <el-date-picker size="mini" style="width:130px;margin-right:5px;" type="year" v-model="addStartDate" :picker-options="pickerOptionsStart" format="yyyy" value-format="yyyy" placeholder="请选择年份" ></el-date-picker>
            <el-button type="primary" size="mini" @click="searchOption()">查询</el-button>
            <el-button size="mini" type="primary" @click="addHandle">  
              <svg-icon class="icon-add-white" icon-class="icon-shizi" />
              <span class="font">添加目标</span>
            </el-button>
            <!-- <el-button type="success" size="small" @click="downLoadBtn">下载</el-button> -->
          </div>
        </h4>
          <el-table
            v-loading="loading"
            :height="tableHeight"
           class="table-main"
            :data="tableData"
            row-key="planId"
            border
            default-expand-all
            empty-text="请添加目标"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            style="width: 100%">
            <el-table-column
            prop="goal"
            label="目标"
            show-overflow-tooltip
            >
              <template slot-scope="scope">
                <!-- <template  v-if="scope.row.reachState === '1'">
                 <svg-icon :style="{color:icon(scope.row.sourceType).color,fontSize:'16px'}" :icon-class="icon(scope.row.sourceType).icon" />  {{scope.row.goal}}
                </template> -->
                <!-- <template v-else> -->
                  <svg-icon :style="{color:icon(scope.row.sourceType).color,fontSize:'16px'}" :icon-class="icon(scope.row.sourceType).icon" />  <a class="alive-text" @click="updateHandle(scope.row)">{{scope.row.goal}}</a>
                <!-- </template> -->
              </template>
            </el-table-column>
            <el-table-column
            prop="rangeName"
            label="领域"
            align="center"
            width="180">
            </el-table-column>
            <el-table-column
            width="180"
            prop="startDate"
            align="center"
            label="开始日期">
            </el-table-column>
            <el-table-column
            width="180"
            prop="endDate"
            align="center"
            label="预计达成日期">
            </el-table-column>
            <el-table-column
            width="180"
            prop="reachDate"
            align="center"
            label="达成/终止日期">
              <template slot-scope="scope">
                <span v-if="scope.row.reachDate">{{scope.row.reachDate}}</span>
                <span class="danger-cl" v-else-if="scope.row.stopDate">{{scope.row.stopDate}}</span>
              </template>
            </el-table-column>
            <el-table-column
                align="center"
                width="240">
                <template #header>
                  <a style="text-align:right" class="table-upload-title" @click="downLoadBtn"><svg-icon  icon-class="icon-xz" />下载</a>
                  <!-- <el-button type="success" size="mini" @click="downLoadBtn">下载</el-button> -->
                </template>
                <template slot-scope="scope">
                  <div class="achieved" v-if="scope.row.reachState === '1'">
                    <svg-icon :style="{fontSize:'16px'}" icon-class="icon-flag" /> 已达成
                  </div>
                  <div class="achieved danger-cl" v-else-if="scope.row.stopState === '1'">
                     <svg-icon :style="{fontSize:'18px'}" icon-class="stop" /> 已终止
                  </div>
                  <div v-else>
                    <el-button 
                    @click.native.prevent="deleteRow(scope.row)"
                    type="danger"
                    plain
                    size="mini">
                    删除
                    </el-button>
                    <el-button 
                    @click.native.prevent="publishRow(scope.row)"
                    v-if="scope.row.isPublish === '0' && scope.row.hierarchy === 0"
                    type="success"
                    size="mini">
                    发布
                    </el-button>
                    <el-button 
                    @click.native.prevent="stopRow(scope.row)"
                    v-if="scope.row.showStopFlag === '1'"
                    type="danger"
                    size="mini">
                    终止
                    </el-button>
                    <el-button
                    v-if="scope.row.isPublish === '1'"
                    @click="reachHandle(scope.row)"
                    type="primary"
                    size="mini">
                    达成
                    </el-button>
                  </div>
                </template>
            </el-table-column>
        </el-table>
        <sur-pagination
                      v-if="total >= 10" 
                       :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination>
        <reach ref="reach" @reachCallBack="reachCallBack"></reach>
        <plan ref="plan" @planCallback="planCallback"></plan>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { downloadFile } from '@/utils/download'
import Reach from '../Reach'
import Plan from '../Plan'
import { icon } from '../icon'
import { parseTime } from '@/utils/index'

export default {
  components: {
    Plan,
    Reach
  },
  props: {
    year: [String, Number]
  },
  computed: {
    tableHeight() {
      const height = this.$store.state.app.containHeight - 260
      return height < 475 ? 475 : height
    },
    isPast() {
      const currentYear = new Date().getFullYear()
      return Number(this.year) < currentYear
    },
    currentDate() {
      return parseTime(new Date(), '{y}-{m}-{d}')
    }
  },
  data() {
    return {
      addStartDate: '',
      pageNo: 1,
      total: 0,
      pageSize: 15,
      loading: false,
      updateVisible: false,
      updateStatus: 0, // 0添加 1修改
      updateId: null,
      errorText: '',
      isMinTarget: false,
      iconColors: {
        $colorG: '#db1717',
        $colorY: '#ff7700',
        $colorM: '#ffaa00',
        $colorW: '#04ae0f',
        $colorD: '#1dd3d1',
        $colorA: '#00a0e9',
        $colorC: '#0066ff',
        $colorF: '#a65fec',
        $colorL: '#ec5fe7',
        $colorH: '#e22c79'
      },
      tableData: [],
      icon,
      pickerOptionsStart: {
        disabledDate: (time) => {
          const currentYearTimeB = new Date((new Date().getFullYear() - 3) + '/01/01 00:00:00').getTime()
          const currentYearTimeA = new Date((new Date().getFullYear() + 6) + '/01/01 00:00:00').getTime()
          const pannelTime = time.getTime()
          return pannelTime > currentYearTimeA || pannelTime < currentYearTimeB
        }
      },
      valueField: null,
      rangeOptions: []
    }
  },
  created() {
    baseRequest('/objective/rwCode/getOption').then(response => {
      this.rangeOptions = response.data.item
    })
    this.searchOption()
  },
  methods: {
    downLoadBtn() {
      const param = {
        startDate: this.addStartDate,
        planRange: this.valueField
      }
      downloadFile('/objective/rwGoalPlan/upload', param)
        .finally(_ => {
          this.downLoading = false
        })
    },
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        // viewYear: this.year,
        startDate: this.addStartDate,
        planRange: this.valueField,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/objective/rwGoalPlan/selects', param).then(response => {
        this.tableData = response.data.item
        // this.tableData[0].isPublish = '0'
        // this.tableData[1].isPublish = '0'
        // this.tableData[1].children[0].isPublish = '0'
        this.total = response.data.total
        // this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    addHandle() {
      this.$refs.plan.addHandle(this.year)
    },
    updateHandle(row, errMsg) {
      const hierarchy = row.hierarchy
      let isMinTarget = false
      if (hierarchy >= 3) {
        isMinTarget = true
      }
      this.$refs.plan.updateHandle({
        paramIds: {
          planId: row.planId
        },
        year: this.year,
        selectUrl: '/objective/rwGoalPlan/select',
        updateUrl: '/objective/rwGoalPlan/update',
        isMinTarget,
        hierarchy: hierarchy,
        errMsg: errMsg,
        isPublish: row.isPublish,
        planId: row.planId,
        disabled: row.reachState === '1' || row.stopState === '1'

      })
    },
    planCallback() {
      this.searchOption()
    },
    publishRow(row) {
      if (row.startDate < this.currentDate) {
        this.$Message.warning('开始日期大于当前日期可发布，请调整后发布！')
        return
      }
      this.loading = true
      baseRequest('/objective/rwGoalPlan/publish', { planId: row.planId }).then(response => {
        if (response.data.item.count) {
          this.$Message.success('操作成功')
          this.searchOption()
        } else {
          this.$Message.warning(response.data.item.param)
        }
      }).finally(_ => {
        this.loading = false
      })
    },
    deleteRow(row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwGoalPlan/delete', { planId: row.planId, sourceType: row.sourceType }).then(response => {
          this.$Message.success('操作成功')
          this.searchOption()
        })
      })
    },
    stopRow(row) {
      this.$confirm('确定终止该目标吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwGoalPlan/stopGoalPlan', { planId: row.planId }).then(response => {
          this.$Message.success('操作成功')
          this.searchOption()
        })
      })
    },
    reachHandle(row) {
      if (!row.rangeName) {
        this.$Message.warning('请先补全领域！')
        return
      }
      this.updateId = row.planId
      this.$refs.reach.openDialog(row.startDate)
    },
    // isOverStartDate(startDate) {
    //   const nowDate = new Date().getTime()
    //   let rowDate = startDate + ' 00:00:00'
    //   rowDate = rowDate.replace(/-/g, '/')
    //   const bewforeDate = new Date(rowDate).getTime()
    //   return nowDate < bewforeDate
    // },
    /**
     * 达成
     */
    reachCallBack(date) {
      baseRequest('/objective/rwGoalPlan/reach', { planId: this.updateId, reachDate: date }).then(response => {
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
<style lang="scss">
.tt-gps{
    padding:0 24px 24px;
    .tt-title{
        height: 66px;
        line-height: 66px;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        font-weight: bold;
    }
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
}
</style>