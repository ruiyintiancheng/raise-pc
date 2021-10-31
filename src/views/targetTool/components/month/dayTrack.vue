/** 31日追踪事项 */
<template>
  <div class="tt-track" v-if="showList">
    <div class="box">
      <day-table label="个人目标" :monthlyDate="viewMonth" goalType="0" :disable="disable" />
    </div>
    <div class="line" />
    <div class="box">
      <day-table label="工作目标" :monthlyDate="viewMonth" goalType="1" :disable="disable" />
    </div>
  </div>
</template>

<script>
import dayTable from './day/dayTable.vue'
import { baseRequest } from '@/api/base'
export default {
  components: {
    dayTable
  },
  props: {
    viewMonth: String,
    disable: Boolean
  },
  data() {
    return {
      showList: false
    }
  },
  computed: {},
  created() {
    baseRequest('/objective/rwMonthlyTrack/initMonthlyTrack', { monthlyDate: this.viewMonth }).then(_ => {
      this.showList = true
    })
  },
  mounted() {},
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import "./month.css";
  .tt-track {
    margin-top: 32px;
    display : flex;
    .box {
      width: 50%;
    }
    .line {
      margin: 24px;
      display: block;
      border-left: 1px dashed #aaaaaa;
    }
  }
</style>

