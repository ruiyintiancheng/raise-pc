<template>
    <div class="tt-gps-copy">
        <!-- <h4 class="tt-title">目标计划清单</h4> -->
          <el-table
            v-loading="loading"
           class="table-main"
            :data="tableData"
            row-key="planId"
            border
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            empty-text="请添加目标"
            style="width: 100%">
            <el-table-column
            prop="goal"
            label="目标"
            show-overflow-tooltip
            >
              <template slot-scope="scope">
                  <svg-icon :style="{color:iconColors['$colorG'],fontSize:'16px'}" icon-class="icon-G" />  <a class="alive-text" @click="updateHandle(scope.row)">{{scope.row.goal}}</a>
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
            label="达成日期">
            </el-table-column>
           <el-table-column
                align="center"
                width="160">
                <template slot="header">
                   <a class="table-header-title" @click="addHandle"><svg-icon  icon-class="icon-add" /> 添加</a>
                </template>
                <template slot-scope="scope">
                  <div class="achieved" v-if="scope.row.reachState === '1'">
                    <svg-icon :style="{fontSize:'16px'}" icon-class="icon-flag" /> 已达成
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
        <!-- <sur-pagination
                      v-if="total <= 10" 
                       :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination> -->
        <reach ref="reach" @reachCallBack="reachCallBack"></reach>
        <plan ref="plan" @planCallback="planCallback"></plan>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import Reach from '@/views/targetTool/components/Reach'
import Plan from '@/views/targetTool/components/Plan'
import { parseTime } from '@/utils/index'

export default {
  components: {
    Plan,
    Reach
  },
  props: {
    year: [String, Number],
    courseId: [String, Number],
    flowNodeNo: [String, Number]
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 255
    },
    currentDate() {
      return parseTime(new Date(), '{y}-{m}-{d}')
    }
  },
  data() {
    return {
      pageNo: 1,
      total: null,
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
      tableData: []
    }
  },
  created() {
    this.searchOption()
  },
  methods: {
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      //   const param = {
      // viewYear: this.year,
      // pageNo: this.pageNo,
      // pageSize: this.pageSize
      //   }
      baseRequest('/course/firstStep/initGoalPlan', { courseId: this.courseId, flowNodeNo: this.flowNodeNo }).then(response => {
        this.tableData = response.data.item || []
        // this.total = response.data.total || 0
        this.loading = false
      })
    },
    addHandle() {
      this.$refs.plan.addHandle(this.year)
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
        // this.updateHandle(row, errMsg)
      }).finally(_ => {
        this.loading = false
      })
    },
    updateHandle(row) {
      let disabled = false
      if (row.reachDate) {
        disabled = true
      }
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
        errMsg: '',
        isPublish: row.isPublish,
        planId: row.planId,
        disabled: disabled
      })

      // let disabled = false
      // if (row.reachDate) {
      //   disabled = true
      // }
      // const hierarchy = row.hierarchy
      // let isMinTarget = false
      // if (hierarchy >= 3) {
      //   isMinTarget = true
      // }
      // this.$refs.plan.updateHandle({
      //   paramIds: {
      //     planId: row.planId
      //   },
      //   year: this.year,
      //   selectUrl: '/objective/rwGoalPlan/select',
      //   updateUrl: '/objective/rwGoalPlan/update',
      //   disabled,
      //   isMinTarget
      // })
    },
    planCallback() {
      this.searchOption()
    },
    deleteRow(row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwGoalPlan/delete', { planId: row.planId }).then(response => {
          this.$Message.success('操作成功')
          this.searchOption()
        })
      })
    },
    reachHandle(row) {
      if (!row.rangeName) {
        this.$Message.warning('请补全目标计划工作单中的领域')
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
.tt-gps-copy{
    // padding:24px 24px;
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
        text-align: center;
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
}
</style>