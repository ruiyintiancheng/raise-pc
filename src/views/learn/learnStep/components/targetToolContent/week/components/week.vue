/** 周时间管理 */
<template>
  <div class="tt-plan">
    <div class="tt-title">
      <div @click="active = i" :class="{'active': active === i}" class="tt-week txt-sem-16 btn"
        v-for="(item, i) in weekData" :key="i">
        {{item.name}}
      </div>
    </div>
    <div class="tt-times txt-black txt-sem-16">{{ getTimes }}</div>
    <div class="line line-dashed" />
    <div v-for="(item, i) in weekData" :key="i">
      <div v-if="active === i">
        <plan :courseId="courseId" :year="year" :month="month" :startWeek="item.first" :endWeek="item.last"></plan>
      </div>
    </div>
  </div>
</template>

<script>
import { getWeek } from '@/utils/dateUtil'
import plan from './plan'
export default {
  components: {
    plan
  },
  props: {
    year: {
      type: [String, Number]
    },
    month: {
      type: [String, Number],
      default: 1
    },
    week: {
      type: [String, Number]
    },
    courseId: [String, Number]
  },
  data() {
    return {
      active: 0,
      weekMap: {},
      weekData: []
    }
  },
  computed: {
    getTimes() {
      const i = this.active
      return `${this.weekData[i].first} 至 ${this.weekData[i].last}`
    }
  },
  created() {
    this.weekData = getWeek(this.year, this.month)
    this.active = this.week
  },
  mounted() {

  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import "../../font.scss";

  .tt-plan {
    .tt-title {
      margin-top: 32px;
      margin-bottom: 24px;
      height: 36px;
      .tt-week {
        width: 100px;
        height: 36px;
        line-height: 36px;
        margin-right: 24px;
        float: left;
        text-align: center;
        color: #00afff;
        background-color: #e5f7ff;
        border-radius: 18px;
      }
      .active {
        color: #ffffff !important;
        background-color: #00afff !important;
      }
    }
    .tt-times {
      float: right;
      margin-top: -48px;
    }
    .line {
      margin-bottom: 32px;
    }
  }
</style>