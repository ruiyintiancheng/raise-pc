/** 周时间管理 */
<template>
  <div class="tt-plan">
    <div class="tt-title">
      <div @click="active = i" :class="{'active': active === i}" class="tt-week txt-sem-16 btn"
        v-for="(item, i) in weekData" :key="i">
        <span v-if='item.first===item.last'>
          {{item.first | formatDate0}}
        </span>
        <span v-else>
          {{item.first | formatDate0}}-{{item.last | formatDate0}}
        </span>
      </div>
    </div>
    <div class="tt-times txt-black txt-sem-16">
      <!-- <span style="margin-right: 10px;">{{ getTimes }}</span> -->
      <el-button class="download" size="mini" type="success" plain @click="download" :loading="downLoading">  
        <i class="el-icon-download el-icon--right" />
        <span class="font">下 载</span>
      </el-button>
    </div>
    <div class="line line-dashed" style="margin-bottom:0;"/>
    <div  class="i-content" :style="{height:minHeight+'px'}">
      <div v-for="(item, i) in weekData" :key="i">
        <div v-if="active === i">
          <plan :year="year" :month="month" :startWeek="item.first" :endWeek="item.last" ref="plan"></plan>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWeek } from '@/utils/dateUtil'
import { downloadFile } from '@/utils/download'
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
    }
  },
  data() {
    return {
      active: 0,
      weekMap: {},
      weekData: [],
      downLoading: false
    }
  },
  filters: {
    formatDate0: function(value) {
      const dateList = value.split('-')
      const valueMonth = dateList[1].indexOf('0')
      const valueDay = dateList[2]
      const first = valueMonth === 0 ? dateList[1].slice(1) : dateList[1]
      return `${first}/${valueDay}`
    }
  },
  computed: {
    getTimes() {
      const i = this.active
      return `${this.weekData[i].first} 至 ${this.weekData[i].last}`
    },
    minHeight() {
      return this.$store.state.app.containHeight - 283
    }
  },
  created() {
    this.weekData = getWeek(this.year, this.month)
    this.active = this.week
  },
  mounted() {

  },
  methods: {
    download() {
      const param = {
        viewDate: `${this.year}-${this.month < 10 ? '0' : ''}${this.month}`,
        weekStartDate: this.weekData[this.active].first,
        weekEndDate: this.weekData[this.active].last
      }
      this.downLoading = true
      downloadFile('/objective/rwWeekly/exportExcel', param)
        .finally(_ => {
          this.downLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../font.scss";

  .tt-plan {
    .i-content{
      overflow:auto;
      padding:0px 24px 24px;
    }
    .tt-title {
      margin-top: 32px;
      margin-bottom: 24px;
      height: 36px;
      padding-left: 24px;
      .tt-week {
        width: 125px;
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
      margin-right: 24px;
    }
    .line {
      margin-bottom: 32px;
    }
  }
</style>