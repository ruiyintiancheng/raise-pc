<template>
    <div class="dream">
      <div style="margin:10px 0;display: flex;justify-content: flex-end;width:100%">
        <el-date-picker class="timeSelect" style="width:200px;" type="year" v-model="addStartDate" :picker-options="pickerOptionsStart" format="yyyy" value-format="yyyy" placeholder="请选择创建日期"></el-date-picker>
        <el-button type="primary" size="mini" @click.native.prevent="searchOption">搜索</el-button>
      </div>
         <el-table
           class="table-main"
            :data="tableData"
            row-key="planId"
            border
            :height='tableHight'
            style="width: 100%">
            <el-table-column
            prop="dreamGoal"
            label="梦想"
            show-overflow-tooltip
            >
                <template slot-scope="scope">
                    <svg-icon :style="{color:iconColors['$colorL'],fontSize:'20px'}" icon-class="icon-L" />
                    <span v-if="scope.row.isRealization === 1">{{scope.row.dreamGoal}}</span>
                    <a class="alive-text" v-else @click="updateHandle(scope.row)">{{scope.row.dreamGoal}}</a>
                </template>
            </el-table-column>
              <el-table-column
            prop="dreamFieldName"
            align="center"
            width="200"
            label="领域"
            >
              </el-table-column>
            <el-table-column
            prop="addTime"
            align="center"
            width="200"
            label="创建日期"
            >
              </el-table-column>
              <el-table-column
            prop="realizationDate"
            align="center"
            width="200"
            label="实现日期"
            >
              </el-table-column>
              <el-table-column
            prop="isRealization"
            align="center"
            width="200"
            label="实现状态"
            >
            <template slot-scope="scope">
              {{scope.row.isRealization===1?'已实现':'未实现'}}
            </template>
              </el-table-column>
            <el-table-column
                align="right"
                width="280"
                v-if="!isPast">
                <template slot="header">
                   <a class="table-header-title" @click="addHandle"><svg-icon  icon-class="icon-add" /> 添加梦想</a>
                   <a class="table-header-title" @click="planHandle"><svg-icon  icon-class="icon-shizi" /> 制定规划</a>
                </template>
                <template slot-scope="scope" >
                  <div class="achieved" v-if="scope.row.isRealization === 1">
                    <svg-icon :style="{fontSize:'16px'}" icon-class="icon-flag" /> 已实现
                  </div>
                  <div v-if="scope.row.isRealization === 0 && !isPast">
                    <el-button
                    type="primary"
                    :disabled="!!scope.row.planId"
                    @click="realize(scope.row.dreamId)"
                    size="mini">
                    实现
                    </el-button>
                    <el-button
                    @click.native.prevent="deleteRow(scope.row)"
                    type="danger"
                    :disabled="!!scope.row.planId"
                    plain
                    size="mini">
                    删除
                    </el-button>
                    <el-button
                    :type="scope.row.planId?'success':'primary'"
                    size="mini"
                    @click="setPlan(scope.row)">
                    制定规划
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
        <el-dialog
           append-to-body
          :title="(isPast?'':(this.updateStatus === 0?'添加':'修改'))+'梦想'"
          :visible.sync="updateVisible"
          class="dialog-main heightauto"
          top="10%"
          width="400px"
          destroy-on-close
          :close-on-click-modal="false"
          >
          <el-form ref="formDetail" :model="detailData" :rules="detailRules" v-if="updateVisible">
            <el-form-item style="margin-top:0px;" prop="dreamGoal">
                <div class="form-label required">梦想</div>
                <el-input type="textarea" :rows="4" style="" v-model="detailData.dreamGoal" show-word-limit maxlength="200"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:0px;" prop="dreamField" >
                <div class="form-label required">领域</div>
                <el-select style="width:100%" v-model="detailData.dreamField">
                    <el-option v-for="item in rangeOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" v-if="!isPast">
            <el-button  @click="updateVisible = false">取 消</el-button>
            <el-button type="primary" @click="detailSave" :loading="loading">确 定</el-button>
          </span>
        </el-dialog>
        <plan ref="plan" @planCallback="planCallback"></plan>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import Plan from '../../Plan'
import { deepClone } from '@/utils'
export default {
  props: {
    visionType: String,
    year: [String, Number]
  },
  components: { Plan },
  data() {
    return {
      addStartDate: '',
      updateStatus: 0,
      updateVisible: false,
      loading: false,
      pageNo: 1,
      total: 0,
      pageSize: 10,
      detailData: {
        dreamId: null,
        dreamGoal: null,
        dreamField: null
      },
      detailRules: {
        dreamGoal: [
          { required: true, message: '请输入梦想' }
        ],
        dreamField: [
          { required: true, message: '请选择领域' }
        ]
      },
      rangeOptions: [],
      pickerOptionsStart: {
        disabledDate: (time) => {
          const currentYearTimeB = new Date((new Date().getFullYear() - 3) + '/01/01 00:00:00').getTime()
          const currentYearTimeA = new Date((new Date().getFullYear() + 6) + '/01/01 00:00:00').getTime()
          const pannelTime = time.getTime()
          return pannelTime > currentYearTimeA || pannelTime < currentYearTimeB
        }
      },
      tableData: [
      ],
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
      }
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 400
    },
    isPast() {
      // const currentYear = new Date().getFullYear()
      // return Number(this.year) < currentYear
      return false
    }
  },
  created() {
    baseRequest('/objective/rwCode/getOption').then(response => {
      this.rangeOptions = response.data.item
      // this.rangeOptions = this.rangeOptions.filter(item => item.name !== '事业领域')
    })
  },
  mounted() {
    this.searchOption()
  },
  methods: {
    // 点击实现
    realize(dreamId) {
      const param = {
        dreamId: dreamId
      }
      baseRequest('/objective/rwDream/updateType', param).then(response => {
        if (response.msg === 'Success') { this.searchOption() }
      })
    },
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      const param = {
        addTime: this.addStartDate,
        codeType: this.visionType,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/objective/rwDream/selects', param).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
      })
    },
    addHandle() {
      this.detailData = {
        dreamId: null,
        dreamGoal: null,
        dreamField: null
      }
      this.updateStatus = 0
      this.updateVisible = true
    },
    updateHandle(row) {
      this.detailData = {
        dreamId: row.dreamId,
        dreamGoal: row.dreamGoal,
        dreamField: row.dreamField
      }
      this.updateStatus = 1
      this.updateVisible = true
    },
    planHandle() {
      this.$refs.plan.addHandle(this.year)
    },
    setPlan(row) {
      this.$refs.plan.updateHandle({
        paramIds: {
          dreamId: row.dreamId,
          codeType: this.visionType,
          dreamField: row.dreamField,
          viewDate: this.year
        },
        year: this.year,
        planId: row.planId,
        selectUrl: '/objective/rwDream/makePlan',
        updateUrl: '/objective/rwGoalPlan/update'
      })
    },
    planCallback() {
      // this.$Message.success('操作成功')
      this.searchOption()
    },
    deleteRow(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwDream/delete', { dreamId: row.dreamId, codeType: this.visionType }).then(response => {
          // this.tableData = response.data.item
          this.searchOption()
        })
      })
    },
    detailSave() {
      this.$refs['formDetail'].validate((valid) => {
        if (valid) {
          let url = '/objective/rwDream/add'
          this.detailData.codeType = this.visionType
          // if (this.visionType === '1') {
          //   this.detailData.dreamField = '7'
          // }
          const params = deepClone(this.detailData)
          if (this.updateStatus === 1) {
            url = '/objective/rwDream/update'
          } else {
            params.viewDate = this.year
          }
          this.loading = true
          baseRequest(url, params).then(_ => {
            this.updateVisible = false
            this.$Message.success('操作成功')
            if ((this.visionType !== '1' && this.detailData.dreamField === 7) || (this.visionType === '1' && this.detailData.dreamField !== 7)) {
              this.searchOption()
              this.$emit('changeDream')
            } else {
              this.searchOption()
            }
            this.loading = false
          }, _ => {
            this.loading = false
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
<style lang="scss">
.dream{
    // margin-top: 20px;
    // margin-bottom: 30px;
    .timeSelect{
      // margin-bottom:20px;
      margin:0 10px;
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