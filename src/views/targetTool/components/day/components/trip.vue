/** 当日行程 */
<template>
  <div>
    <el-dialog
      append-to-body
      title="当日行程"
      :visible.sync="dialogVisible"
      class="dialog-main"
      top="5%"
      width="500px"
      destroy-on-close
      :close-on-click-modal="false"
      >
      <chart v-if="dialogVisible" :dailyDate="dailyDate" />
    </el-dialog>
  </div>
</template>
<script>
// import { baseRequest } from '@/api/base'
import chart from './chart'
export default {
  components: {
    chart
  },
  props: {
    dailyDate: String
  },
  computed: {

  },
  data() {
    return {
      dialogVisible: false
    }
  },
  created() {
  },
  mounted() {
    // console.log(this.label)
  },
  methods: {
    // 打开弹框
    openDialog(row) {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .dialog-main {

    /deep/ .el-dialog__body {
      height: calc(100% - 50px);
      padding: 0;
      overflow: hidden;
    }
  }
</style>