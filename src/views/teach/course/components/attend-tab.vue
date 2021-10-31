/** 出席管理 */
<template>
  <div style="padding-top: 24px;">
    <attend-table 
      title="第二周辅导" 
      :course-id="courseId"
      :start-date="twoWeekOneVFour.startDate"
      :end-date="twoWeekOneVFour.endDate"
      :table-data="twoWeekOneVFour.dataList"
      :operFlag="operFlag"
      @refresh="loadData" />
    <div class="line-dashed" />
    <attend-table 
      title="一对一辅导" 
      :course-id="courseId"
      :start-date="oneVOne.startDate"
      :end-date="oneVOne.endDate"
      :table-data="oneVOne.dataList"
      :operFlag="operFlag"
      @refresh="loadData" />
    <div class="line-dashed" />
    <attend-table 
      title="第六周辅导" 
      :course-id="courseId"
      :start-date="sixWeekOneVFour.startDate"
      :end-date="sixWeekOneVFour.endDate"
      :operFlag="operFlag"
      :table-data="sixWeekOneVFour.dataList"
      @refresh="loadData" />
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import attendTable from './attend-table.vue'
export default {
  components: {
    attendTable
  },
  props: {
    courseId: [String, Number],
    operFlag: Boolean
  },
  data() {
    return {
      twoWeekOneVFour: null,
      oneVOne: null,
      sixWeekOneVFour: null
    }
  },
  computed: { },
  created() {
    this.loadData()
  },
  mounted() {
  },
  methods: {
    loadData() {
      const param = { courseId: this.courseId }
      baseRequest('/course/firstStepCoach/getStuAttendInfo', param).then(response => {
        const data = response.data.item
        this.$set(this, 'twoWeekOneVFour', data.twoWeekOneVFour)
        this.$set(this, 'oneVOne', data.OneVOne)
        this.$set(this, 'sixWeekOneVFour', data.sixWeekOneVFour)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .line-dashed {
    margin: 24px 0;
    border-top: 1px dashed #aaaaaa;
  }
</style>

