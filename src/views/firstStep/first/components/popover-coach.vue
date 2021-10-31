/** 弹出框-产品说明 */
<template>
  <div>
    <el-table
      :data="tableData"
      class="table-main"
      style="width: 100%"
    >
      <el-table-column prop="coachName" label="教练名称" align="center" />
      <el-table-column prop="phone" label="手机号" align="center" />
    </el-table>
  </div>
</template>

<script>
export default {
  components: { },
  props: {
    tableData: Array
  },
  data() {
    return {

    }
  },
  computed: { },
  created() { },
  mounted() { },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  /deep/ .table-main {
    border: 1px solid #ddd;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .el-table__header{
      th, tr{
        background-color: #fafafa;
        border-right:none;
      }
    }
  }
</style>

