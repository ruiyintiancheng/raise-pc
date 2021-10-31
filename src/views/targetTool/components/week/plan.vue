/** 周目标 */
<template>
  <div class="tt-plan">
    <div>
      <div class="tt-title txt-white">月首要目标</div>
        <firstTable refs='first' :viewDate="getViewDate" label="目标" :disable="firstAble" />
      <div class="line line-dashed" />
    </div>
    <div>
      <div class="tt-title txt-white" id="urgent">紧要事项</div>
        <matterTable 
            ref="contType0" @refresh="refresh" :startWeek="startWeek" 
            :endWeek="endWeek" weeklyType="0" 
            label="事项"
            :disable="disable"
            formLabel="紧要事项">
        </matterTable>
      <div class="line line-dashed" />
    </div>
    <div>
      <div class="tt-title txt-white" id="important">重要事项</div>
        <matterTable 
            ref="contType1" @refresh="refresh" :startWeek="startWeek" 
            :endWeek="endWeek" weeklyType="1" 
            label="事项"
            :disable="disable"
            formLabel="重要事项">
        </matterTable>
    </div>
  </div>
</template>

<script>
import { dateInfo } from '@/utils/dateUtil'
import firstTable from './components/firstTable'
import matterTable from './components/matterTable'
export default {
  components: {
    firstTable,
    matterTable
  },
  props: {
    year: {
      type: [String, Number],
      default: null
    },
    month: {
      type: [String, Number],
      default: 1
    },
    startWeek: {
      type: [String, Number],
      default: null
    },
    endWeek: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
    }
  },
  computed: {
    getViewDate() {
      return `${this.year}-${this.month < 10 ? '0' + this.month : this.month}`
    },
    firstAble() {
      const date = dateInfo()
      const now = new Date(`${date.year}-${date.month}-1`).getTime()
      const time = new Date(`${this.year}-${this.month}-1`).getTime()
      return time < now
    },
    disable() {
      const time = new Date(this.endWeek + ' 24:00:00').getTime()
      const now = new Date().getTime()
      return time < now
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    refresh(contType, fieldCode) {
      // 刷新重要事项计划表
      if (contType === '0') {
        this.$refs['contType1'].searchOption()
        return
      }
      // 刷新重要事项计划表
      if (contType === '1') {
        this.$refs['contType0'].searchOption()
        return
      }
    },
    jumpToText(text) {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = '#' + text
      document.body.appendChild(link)
      link.click()
      this.$nextTick(_ => {
        link.click()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../font.scss";

  .tt-plan {
    .tt-title {
      width: 160px;
      height: 28px;
      line-height: 28px;
      margin-top: 32px;
      margin-bottom: 14px;
      padding-left: 20px;
      background-color: #00afff;
      border-radius: 0 10px 10px 0;
    }
    .tt-table {
      margin-bottom: 24px;
    }
    .btn-group {
      text-align: right;
      margin-top: 14px;
      .btn {
        width: 90px;
        height: 30px;
        border-radius: 4px;
        padding: 0;
      }
      .btn-clear {
        background-color: #ffffff;
      }
      .btn-save {
        margin-left: 30px;
        background-color: #00afff;
      }  
    }
    .line {
      margin-top: 24px;
    }
  }
</style>

