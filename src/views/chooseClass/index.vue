/** 1对4课程辅导 */
<template>
  <div class="course-choose inside-container">
      <div class="course-title">
        <span>选择课时</span>
      </div>
      <div class="line line-dashed"/>
      <div class="step-main" >
        <div class="course-menu clearfix">
            <el-date-picker v-model="date"
            class="date-input"
            type="month"
            value-format='yyyy-MM'
            placeholder="请选择月份"
            :picker-options="pickerOptionsStart" 
            @change="handleChange" />
        </div>
        <div class="attend">
            <el-table
            ref="table"
            class="table-main course-table"
            :data="tableData"
            style="width: 100%"
            border
            :height="tableHight"
            @current-change="handleCurrentRowChange"
            >
            <el-table-column label=" " width="50" align="center">
                <template slot-scope="scope">
                <el-radio :disabled="scope.row.status" v-model="radio" :label="scope.row"><span></span></el-radio>
                </template>
            </el-table-column>
            <el-table-column label="预计开始学习日期" prop="schoolDate" align="center" />
            <el-table-column label="首次辅导时间" prop="firstDate" align="center" />
            <el-table-column label="末次辅导时间" prop="lastDate" align="center" />
            <!-- <el-table-column label=" " type="index" width="52" align="center" /> -->
            <!-- <el-table-column label="日期">
                <template slot-scope="scope">
                {{dateFormat(scope.row.schoolDate, 'yyyy-MM-dd')}}
                </template>
            </el-table-column> -->
            <!-- <el-table-column label="上课时间">
                <template slot-scope="scope">                
                <span style="color:#ccc;" v-if="scope.row.status">(已满员)</span>
                <span v-else>{{scope.row.schoolTime}}</span>
                </template>
            </el-table-column> -->
            </el-table>
            <sur-pagination
            :pageNo="pageNo"
            :total="total"
            :pageSize="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            ></sur-pagination>
            <div class="course-menu clearfix">
            <div v-if="radio" class="item-btn btn" @click="submit">提交所选课时</div>
            <div v-else class="item-btn btn gray">提交所选课时</div>
            </div>
        </div>
    </div>
        <el-dialog
        title=""
        :visible.sync="successVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        width="360px"
        top="30vh"
        >
        <div class="icon-box"><svg-icon icon-class="icon-mark-green" /></div>
        <h3 class="text-tip">选课成功</h3>
        <el-button class="tip-btn" type="primary" size="small" @click="$router.push({name:'learn'})">返回我的项目</el-button>
        </el-dialog>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateUtil'
import { baseSearch } from '@/api/base'
import { baseRequest } from '@/api/base'
export default {
  components: {
  },
  data() {
    return {
      date: null,
      radio: null,
      dateFormat,
      tableData: [],
      pageNo: 1,
      total: null,
      pageSize: 10,
      successVisible: false,
      pickerOptionsStart: {
        disabledDate: (time) => {
          const panelYear = time.getYear()
          const panelMouth = time.getMonth()
          const newDate = new Date()
          const currentYear = newDate.getYear()
          const currentMonth = newDate.getMonth()
          if (panelYear === currentYear) {
            return panelMouth < currentMonth
          } else if (panelYear === currentYear + 1) {
            return panelMouth >= currentMonth
          } else {
            return true
          }
        }
      }
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 402
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
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        startTime: this.date
      }
      baseSearch('/course/coaches/getAllCoachByStartTime', param).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
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
    handleChange() {
      this.searchOption()
    },
    // 行点击id
    handleCurrentRowChange(val) {
      if (val.status) {
        return
      }
      this.radio = val
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.searchOption(true)
    },
    submit() {
      this.$confirm('确定提交所选课时吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          orderId: this.$route.query.orderId
        }
        if (this.$route.query.sourceCourseId) {
          params.sourceCourseId = this.$route.query.sourceCourseId
        }
        const tempArr = this.radio.schoolTime.split('-')
        const startTime = tempArr[0]
        const endTime = tempArr[1]
        params.startTime = `${this.radio.schoolDate} ${startTime}:00`
        params.endTime = `${this.radio.schoolDate} ${endTime}:00`
        baseRequest('/course/firstStep/stuSelectCourse', params).then(response => {
          if (response.code === 1) {
            this.successVisible = true
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-choose {
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding:24px;
    margin-top:30px;
    margin-bottom:30px;
    color: #222222;
    font-family: PingFangSC-Regular;
	  font-size: 16px;
    .course-title {
      .bold {
        font-weight: bold;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
      }
    }
    .line {
      margin: 24px 0;
    }
    .step-main {
        position: relative;
        overflow: auto;
        color: #222222;
        font-family: PingFangSC-Regular;
	  font-size: 14px;

        .course-menu {
        position: relative;
        .date-input {
            width: 300px;
            height: 40px;
            float: right;
        }
        .course-menu-line {
            width: 280px;
            position: absolute;
            bottom: 0;
        }
    }
  }

  .attend {
    color: #222222;
    font-family: PingFangSC-Regular;
	  font-size: 14px;
    .course-table {
      margin-top: 20px;
    }
    .course-menu {
        margin-top:15px;
      .item-btn {
        float: right;
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

  .line-dashed {
    display: block;
    height: 0;
    border-top: 1px dashed #aaaaaa;
  }

  $navbarHieght:44px;
  $menuMaring:25px;
  $activeColor:#00afff;

  .menu{
    height: $navbarHieght;
    line-height: $navbarHieght;
    .menu-item{
      width: 140px;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
      padding:0 10px;
      position: relative;
      cursor: pointer;
      &:hover{
        color:$activeColor;
      }
      &.active{
        background-image: linear-gradient(#fff, #cff0ff);
        color:$activeColor;
        &:after{
          content: "";
          position: absolute;
          width: 100%;
          height: 4px;
          background-color: $activeColor;
          left: 0;
          bottom:0;
        }
      }
    }
  }
  /deep/ .el-dialog {
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0px 2px 10px 0px 
        rgba(0, 0, 0, 0.2);
      overflow: hidden;
      text-align: center;
      .el-dialog__header{
          display: none;
      }
      .icon-box{
          margin:24px 0 16px;
          text-align: center;
          font-size: 50px;
      }
      .text-tip{
          text-align: center;
          font-size: 20px;
          color:#222;
      }
      .tip-btn{
          margin: 20px 0;
      }
  }  
}



</style>

