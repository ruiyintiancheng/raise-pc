/** 我的成就 */
<template>
  <div class="tt-html" style="height:100%;">
    <h4 class="tt-head">我的成就</h4>
    <div class="tt-calendar">
      <div class="bg">
        <svg-icon class="icon-add-white" v-if="activeName === 'dream'?false:true"  icon-class="icon-rili" />
      </div>
      <el-date-picker v-if="activeName === 'day'" v-model="dailyDate"
        type="date" :editable="false" :clearable="false"
        format="yyyy年MM月dd日"
        value-format="yyyy-MM-dd"
        @change="handleChangeDate">
      </el-date-picker>
      <el-date-picker v-if="activeName === 'week'" v-model="dailyDate"
        type="date" :editable="false" :clearable="false"
        :format="getWeek"
        value-format="yyyy-MM-dd"
        @change="handleChangeDate">
      </el-date-picker>
      <el-date-picker v-if="activeName === 'month'" v-model="dailyDate"
        type="month" :editable="false" :clearable="false"
        format="yyyy年MM月"
        value-format="yyyy-MM-dd"
        @change="handleChangeDate">
      </el-date-picker>
      <el-date-picker v-if="activeName === 'year'" v-model="dailyDate"
        type="year" :editable="false" :clearable="false"
        value-format="yyyy-MM-dd"
        format="yyyy年"
        @change="handleChangeDate">
      </el-date-picker>
    </div>
    <el-button v-if="false" class="download" size="mini" type="success" plain @click="download" :loading="downLoading">  
      <i class="el-icon-download el-icon--right" />
      <span class="font">下 载</span>
    </el-button>
    <div class="title-line" style="margin-bottom: 28px;" />
    <div class="line-dashed" style="width: 520px; position: absolute; top: 143px;margin-left:24px;" />
    <ul class="menu">
      <li class="menu-item fl" @click="activeName = 'day'" :class="{active: activeName === 'day'}">
        <a class="menu-title">日</a>
      </li>
      <li class="menu-item fl" @click="activeName = 'week'" :class="{active: activeName === 'week'}">
        <a class="menu-title">周</a>
      </li>
      <li class="menu-item fl" @click="activeName = 'month'" :class="{active: activeName === 'month'}">
        <a class="menu-title">月</a>
      </li>
      <li class="menu-item fl" @click="activeName = 'year'" :class="{active: activeName === 'year'}">
        <a class="menu-title">年</a>
      </li>
      <li class="menu-item fl" @click="activeName = 'dream'" :class="{active: activeName === 'dream'}">
        <a class="menu-title">梦想</a>
      </li>
    </ul>
    <div class="i-content">
      <div v-if="activeName === 'day'">
        <day-tag :date="dailyDate" />
      </div>
      <div v-if="activeName === 'week'">
        <week-tag :date="dailyDate" />
      </div>
      <div v-if="activeName === 'month'">
        <month-tag :date="dailyDate" />
      </div>
      <div v-if="activeName === 'year'">
        <year-tag :date="dailyDate" />
      </div>
      <div v-if="activeName === 'dream'">
        <dream-tag :date="dailyDate" />
      </div>
    </div>
  </div>
</template>

<script>
import { dateInfo } from '@/utils/dateUtil'
import { downloadFile } from '@/utils/download'
import dayTag from './day'
import weekTag from './week'
import monthTag from './month'
import yearTag from './year'
import dreamTag from './dream'

export default {
  components: {
    dayTag,
    weekTag,
    monthTag,
    yearTag,
    dreamTag
  },
  props: {
    viewDate: String
  },
  data() {
    return {
      downLoading: false,
      dailyDate: null,
      activeName: 'day'
    }
  },
  computed: {
    getWeek() {
      const time = dateInfo(this.dailyDate)
      return `${time['yyyy']}年${time['MM']}月 第${time['WW']}周`
    }
  },
  created() {
    this.dailyDate = this.viewDate
  },
  mounted() { },
  methods: {
    // 改变日期
    handleChangeDate(val) {
      // console.log('change', val)
    },
    download() {
      console.log('我的成就导出')
      this.downLoading = true
      downloadFile('/objective/rwGoalPlan/download', { })
        .finally(_ => {
          this.downLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
 @import "../font.scss";
  .tt-html{
    position: relative;
    // padding:0 24px 24px;
    .i-content{
      height:calc(100% - 145px);
      overflow:auto;
      padding:0px 24px 24px;
    }
    .tt-head{
        height: 66px;
        line-height: 66px;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        font-weight: bold;
        padding-left: 24px;
    }

    .tt-calendar {
      position: absolute;
      top: 19px;
      left: 120px;
      .bg {
        float: left;
        height: 36px;
        color: #00afff;
        line-height: 36px;
        .icon-add-white {
          width: 12px;
        }
      }
      /deep/ .el-date-editor {
        width: 150px;
        .el-input__inner {
          cursor: pointer;
          width: 150px;
          color: #00afff;
          border: 0;
          padding-left: 6px;
          padding-right: 0;
          text-decoration: underline;
          font-family: PingFangSC-Regular;
          font-size: 16px;
        }
        .el-input__prefix {
          display: none;
        }
      }
    }

    $navbarHieght:50px;
    $menuMaring:25px;
    $activeColor:#00afff;

    .menu{
      height: $navbarHieght;
      line-height: $navbarHieght;
      margin-left:24px;
      .menu-item{
        width: 104px;
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
    .download {
      position: absolute;
      right: 24px;
      top: 19px;
    }
  }
</style>

