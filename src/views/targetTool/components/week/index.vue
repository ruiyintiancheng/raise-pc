/** 周计划 */
<template>
  <div class="tt-html">
    <h4 class="tt-title">周目标</h4>
    <div class="tt-selects">
      <div v-for="i in 12" :key="i" class="txt-blue box btn"
        :class="{active: i === month}"
        @click="handleActive(i)">
        {{i}}月
      </div>
    </div>
    <div class="line" />

    <div class="tt-body" v-for="i in 12" :key="i">
      <div v-if="month === i">
        <week :year="year" :month="month" :week="week" ref="week"></week>
      </div>
    </div>
  </div>
</template>

<script>
import { dateInfo } from '@/utils/dateUtil'
import week from './week'
export default {
  components: {
    week
  },
  props: {
    viewDate: String
  },
  data() {
    return {
      year: null,
      month: 1,
      week: null,
      weekData: []
    }
  },
  computed: {},
  created() {
    const date = dateInfo(this.viewDate)
    this.year = date.year
    this.month = date.month
    this.week = date.week
  },
  mounted() {},
  methods: {
    handleActive(i) {
      this.month = i
      this.week = 0
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../font.scss";
  .tt-html{
    position: relative;
    // padding:0 24px 24px;
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
        padding-left: 20px;
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
</style>

