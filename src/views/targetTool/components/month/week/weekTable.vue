/** 单周内容 */
<template>
  <div>
    <div class="tt-table">
      <div class="box left">
        <div class="content">
          <!-- <a @click="toogle = !toogle">{{`${date} 星期${getDay(date)}`}}<svg-icon  :icon-class="toogle ? 'icon-zhetie' : 'icon-zhetie-activity'" style="margin-left: 10px;" /></a> -->
          <a @click="toogle = !toogle">{{`星期${toChinesWeek(weekNum)}`}}<svg-icon  :icon-class="toogle ? 'icon-zhetie' : 'icon-zhetie-activity'" style="margin-left: 10px;" /></a>
        </div>
      </div>
      <div class="middle">
        <div :class="{item: true, top: i === 0}" v-for="(item, i) in (toogle ? week : week.slice(0,3) )" :key="i">
          <div v-if="toogle || i < 3" class="column1 txt-black txt-reg-14">
            <a class="alive-text width30" @click="updateHandle(item)">{{item.weeklyMatter}}</a>
            <span class="width30" >{{item.startDate}}</span>
            <span class="width30" >{{item.endDate}}</span>
          </div>
          <!-- <div v-if="toogle || i < 3" class="column2 txt-black txt-reg-14" >{{item.startDate}} - {{item.endDate}}</div> -->
          <div v-if="toogle || i < 3" class="column3">
            <el-button v-if="!disable" @click.native="deleteRow(item)" type="danger" plain size="mini">删除</el-button>
          </div>
        </div>
      </div>
      <div class="box right">
        <div v-if="!disable" class="content txt-white">
          <a @click="addHandle"><svg-icon icon-class="icon-add" /> 添加</a>
        </div>
      </div>
    </div>
    <week-form ref="form" @refresh="refresh" 
     :year="year" :month="month"
     :weekNum="weekNum"
      :disable="disable"
    />
  </div>
</template>

<script>
import weekForm from './week-form'
import { baseRequest } from '@/api/base'
import { toChinesWeek, parseTime } from '@/utils/index'
// import { getDay } from '@/utils/dateUtil'
export default {
  components: {
    weekForm
  },
  props: {
    year: {
      type: [String, Number],
      default: null
    },
    month: {
      type: [String, Number],
      default: null
    },
    // 日数据
    week: {
      type: Array,
      default: function() { return [] }
    },
    weekNum: [Number, String]
    // 时间
    // date: {
    //   type: String,
    //   default: null
    // }
    // disable: Boolean
  },
  data() {
    return {
      toChinesWeek,
      toogle: true
    }
  },
  computed: {
    disable() {
      // const year = Number(this.year)
      // const month = Number(this.month)
      var date = new Date()
      // const currentYear = date.getFullYear()
      // const currentMonth = date.getMonth() + 1
      const currnetDate = parseTime(date, '{y}-{m}')
      // let boo = false
      // if (currentYear > year) {
      //   boo = true
      // } else if (currentYear === year) {
      //   if (currentMonth > month) {
      //     boo = true
      //   }
      // }
      return currnetDate > this.month
    }
  },
  mounted() {
  },
  methods: {
    refresh() {
      this.$emit('refresh', this.date)
    },
    addHandle() {
      this.$refs.form.openDialog()
    },
    updateHandle(row) {
      this.$refs.form.openDialog(row)
    },
    deleteRow(row) {
      const param = {
        weeklyScheId: row.weeklyScheId
      }
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwWeeklySchedule/delete', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.refresh()
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../month.css";

  .tt-table {
    min-height: 52px;
    margin-bottom: 24px;
    display: table;
    width: 100%;
    .box {
      width: 120px;
      background-color: #fafafa;
      border: 1px solid #dddddd;
    }
    .left {
      border-radius: 10px 0 0 10px;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      .content {
        display: inline-block;
        width: 200px;
        height: 20px;
      }
    }
    .right {
      border-radius: 0 10px 10px 0;
      position: relative;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      .content {
        display: inline-block;
        width: 70px;
        height: 36px;
        background-color: #00afff;
        text-align: center;
        line-height: 36px;
        border-radius: 18px;
      }
    }
    .middle {
      border-top: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;
      display: table-cell;

      .top {
        margin-top: -1px;
      }
      .item{
        display: flex;
        border-top: 1px solid #dddddd; 
        height: 52px;
        line-height: 52px;
      }
      .column1 {
        display: flex;
        justify-content: space-around;
        width: 820px;
        flex-shrink: 0;
        padding-left: 10%;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        .width30{
          width:30%;
          text-align:center;
        }
      }
      .column2 {
        text-align: center;
        // width: 40%;
      }
      .column3 {
        text-align: right;
        flex-shrink: 0;
        padding-right: 32px;
        margin-left: 50px;
      }
    }
  }
</style>

