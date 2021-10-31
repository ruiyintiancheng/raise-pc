<template>
  <div class="tt-html">
    <h4 class="tt-title">31日追踪</h4>
    <div class="tt-selects">
      <div v-for="i in 12" :key="i" class="txt-blue box btn"
        :class="{active: i === activeMonth}"
        @click="handleActive(i)"
      >
        {{i}}月
      </div>
    </div>
    <div class="line" />

    <div class="tt-body" v-for="i in 12" :key="i">
      <div v-if="activeMonth === i">
        <day-track :viewMonth="viewMonth" :disable="disable"></day-track>
      </div>
    </div>
  </div>
</template>

<script>
import { dateInfo } from '@/utils/dateUtil'
import dayTrack from '@/views/targetTool/components/month/dayTrack'
export default {
  components: {
    dayTrack
  },
  props: {
    viewDate: String
  },
  created() {
    const date = dateInfo(this.viewDate)
    this.activeMonth = date.month
    this.year = date.year
    this.week = date.week
  },
  data() {
    return {
      year: null,
      week: null,
      weekData: [],
      activeMonth: 1
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
  mounted() {},
  methods: {
    handleActive(i) {
      this.activeMonth = i
      this.week = 0
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../font.scss";
  .tt-html{
    position: relative;
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

