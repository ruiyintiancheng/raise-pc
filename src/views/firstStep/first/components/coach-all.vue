/** 所有课时 */
<template>
  <div>
    <div class="search-option">
      <el-date-picker v-model="startTime"
        class="option-input"
        type="month"
        format="yyyy-MM"  
        value-format='yyyy-MM'
        placeholder="请选择日期"
        :picker-options="pickerOptionsStart"
        @change="handleChange" />
      <div class="search-coach" @click="handleCoach"><svg-icon class="search-coach-icon" icon-class="user" style="color: #00afff;" /></div>
      <el-input v-show="coachShow" v-model="coachName" class="option-input" placeholder="请输入教练姓名"></el-input>
      <div class="item-btn btn" @click="searchOption">查询</div>
    </div>
    <div class="attend">
      <el-table
        v-loading="loading"      
        ref="table"
        class="table-main course-table"
        :data="tableData"
        :height="tableHeight"
        style="width: 100%"
        border
        :row-class-name="tableRowClassName"
        @current-change="handleRowClick"
      >
        <el-table-column label=" " width="50" align="center">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index" :disabled="scope.row.status"><span></span></el-radio>
          </template>
        </el-table-column>
        <el-table-column label=" " type="index" width="52" align="center" />
        <el-table-column label="预计开始学习日期" prop="schoolDate" align="center" />
        <el-table-column label="首次辅导时间" prop="firstDate" align="center" />
        <el-table-column label="末次辅导时间" prop="lastDate" align="center" />
        <el-table-column v-if="coachShow" label="教练" width="100px" align="center">
          <template slot-scope="scope">
            <el-popover v-show="scope.row.coachs && scope.row.coachs.length > 0"
              placement="left"
              width="600"
              trigger="hover">
              <popover-coach :table-data="scope.row.coachs"/>
              <svg-icon slot="reference" icon-class="user" style="color: #00afff;" />
            </el-popover>
            <span>{{scope.row.coachName}}</span>
          </template>
        </el-table-column>
      </el-table>
      <sur-pagination v-if="total > pageSize" :pageNo="pageNo"
                      :total="total"
                      :pageSize="pageSize"
                      @size-change="handleSizeChange"  
                      @current-change="handleCurrentChange">
      </sur-pagination>
      <div class="course-menu">
        <div v-if="radio !== null" class="item-btn btn" @click="submit">提交订单</div>
        <div v-else class="item-btn btn gray">提交订单</div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import popoverCoach from './popover-coach'
export default {
  components: {
    popoverCoach
  },
  props: {
    isGroup: Boolean
  },
  data() {
    return {
      loading: false,
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: null,

      startTime: null,
      coachShow: false,
      coachName: null,
      radio: null,
      options: [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' }
      ],
      pickerOptionsStart: {
        disabledDate: (time) => {
          const start = new Date()
          const year = start.getFullYear()
          const month = start.getMonth() + 1
          return time.getTime() < new Date(year, month, 0).getTime() || time.getTime() > new Date(year + 1, month, 0).getTime()
        }
      }
    }
  },
  computed: {
    tableHeight() {
      return this.$store.state.app.containHeight - 400
    }
  },
  created() {
    this.searchOption()
  },
  mounted() { },
  methods: {
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        isGroup: this.isGroup,
        startTime: this.startTime,
        coachName: this.coachName,
        pageNo: this.pageNo,
        pageSize: this.pageSize

      }
      baseRequest('/course/coaches/getAllCoach', param).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.loading = false
        if (this.tableData && this.tableData.length > 0) {
          this.tableData.forEach((d, i) => {
            d._index = i
            d.firstDate = this.addDate(d.schoolDate, 7 * 24 * 3600 * 1000) + ' ' + d.schoolTime
            d.lastDate = this.addDate(d.schoolDate, 35 * 24 * 3600 * 1000) + ' ' + d.schoolTime
          })
        }
      })
    },
    addDate(str, time) {
      const t = new Date(str.replace(/-/g, '/')).getTime()
      const date = new Date(t + time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.status) {
        return 'gray-row'
      }
    },
    handleChange(val) {
      // console.log('change', val)
    },
    handleCoach() {
      this.coachShow = !this.coachShow
      this.coachName = null
    },
    // 行点击
    handleRowClick(row) {
      if (row.status) {
        return
      }
      this.radio = row._index
    },
    handleSizeChange(val) { // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) { // 分页
      this.pageNo = val
      this.searchOption(true)
    },
    submit() {
      this.$confirm('确定提交订单么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const row = this.tableData[this.radio]
        const coach = { ...row }
        this.$emit('go-step', coach)
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-option {
    position: absolute;
    top: 10px;
    right: 0;

    .option-input {
      width: 200px;
      height: 40px;
      margin-right: 20px;
    }
    .search-coach {
      display: inline-block;
      .search-coach-icon {
        width: 30px;
        height: 30px;
        transform: translateY(9px);
      }
    }

    .item-btn {
      display: inline-block;
      width: 90px;
      line-height: 30px;
      background-color: #00afff;
      color: #ffffff;
      border-radius: 4px;
    }
  }

  .attend {
    color: #222222;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    padding-bottom: 50px;
    .course-table {
      margin-top: 20px;
    }
    .course-menu {
      position: absolute;
      bottom: 0;
      right: 0;
      .item-btn {
        width: 90px;
        line-height: 30px;
        background-color: #00afff;
        color: #ffffff;
        border-radius: 4px;

        &.gray {
          color: #ffffff;
          background-color: #cccccc;
        }
      }
    }
  }
  .btn {
    text-align: center;
    user-select: none;
    cursor: pointer;
  }
  /deep/ .el-table .gray-row {
    background-color: #cccccc;
  }
</style>

