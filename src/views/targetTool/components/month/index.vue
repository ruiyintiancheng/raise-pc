/** 月计划 */
<template>
  <div class="tt-month"  style="height:100%;">
    <h4 class="tt-title">月目标</h4>
    <div class="tt-selects">
      <div v-for="i in 12" :key="i" 
        class="txt-blue box btn"
        :class="{active: i === activeMonth}"
        @click="handelActiveMonth(i)"
      >
        {{i}}月
      </div>
    </div>
    <div class="line" />
    <div class="line-dashed" style="width: 560px; position: absolute; top: 115px;left:24px;" />
    <ul class="menu">
      <li  class="menu-item fl" @click="activeName = 'first'" :class="{active: activeName === 'first'}">
        <a class="menu-title">月度目标</a>
      </li>
      <li  class="menu-item fl" @click="activeName = 'fourth'" :class="{active: activeName === 'fourth'}">
        <a class="menu-title">月历表</a>
      </li>
      <li  class="menu-item fl" @click="activeName = 'third'" :class="{active: activeName === 'third'}">
        <a class="menu-title">31日追踪事项</a>
      </li>
      <li  class="menu-item fl" @click="activeName = 'second'" :class="{active: activeName === 'second'}">
        <a class="menu-title">周时间图表</a>
      </li>
    </ul>

    <div  class="i-content">
      <div class="tt-body" v-for="i in 12" :key="i">
        <div v-if="activeMonth === i">
          <div v-show="activeName === 'first'">
            <monthPlan :view-year="year" :viewMonth="viewMonth" :disable="disable" />
          </div>
          <div v-if="activeName === 'second'">
            <weekManage :year="year" :month="viewMonth" :week="week" :disable="disable" />
          </div>
          <div v-if="activeName === 'third'">
            <dayTrack :viewMonth="viewMonth" :disable="disable" />
          </div>
          <div v-if="activeName === 'fourth'">
            <calendar :viewMonth="viewMonth" :disable="disable" @intoDay="intoDay"/>
          </div>
        </div>
      </div>
     </div>
  </div>
</template>

<script>
import { dateInfo } from '@/utils/dateUtil'
import monthPlan from './monthPlan'
import weekManage from './weekManage'
import dayTrack from './dayTrack'
import calendar from './calendar'

export default {
  components: {
    monthPlan,
    weekManage,
    dayTrack,
    calendar
  },
  props: {
    viewDate: String
  },
  data() {
    return {
      year: null,
      week: null,
      activeMonth: 1,
      activeName: 'first'
    }
  },
  computed: {
    viewMonth() {
      return `${this.year}-${this.activeMonth < 10 ? '0' + this.activeMonth : this.activeMonth}`
    },
    disable() {
      const date = dateInfo()
      const time = new Date(`${date.year}-${date.month}-1`).getTime()
      const active = new Date(`${this.year}-${this.activeMonth}-1`).getTime()
      return active < time
    }
  },
  created() {
    const date = dateInfo(this.viewDate)
    this.activeMonth = date.month
    this.year = date.year
    this.week = date.week
  },
  mounted() {
  },
  methods: {
    intoDay(day) {
      this.$emit('navTo', {
        name: 'D',
        tab: null,
        text: 'urgent',
        day: day
      })
    },
    handelActiveMonth(i) {
      this.activeMonth = i
      this.week = 0
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./month.css";
  .tt-month{
    position: relative;
    // padding:0 24px 24px;

    .i-content{
      height:calc(100% - 116px);
      overflow:auto;
      padding:0px 24px 24px;
    }
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
        padding-left: 24px;
    }
    .tt-selects {
      position: absolute;
      top: 0;
      right: 24px;

      .box {
        float: left;
        width: 44px;
        height: 44px;
        line-height: 44px;
        background-color: #e5f7ff;
        border: 1px solid #a0e1ff;
        text-align: center;
      }
      .box.active {
        width: 48px;
        height: 48px;
        background-color: #00afff;
        border-radius: 0 0 10px 10px;
        color: #ffffff;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
      }
    }
    .line {
      display: block;
      height: 0;
      margin: 0 -24px;
      border-top: 1px solid #cccccc;
    }
  }  

$navbarHieght:50px;
$menuMaring:25px;
$activeColor:#00afff;

  .menu{
    height: $navbarHieght;
    line-height: $navbarHieght;
    margin-left: 24px;
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
</style>