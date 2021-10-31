<template>
    <div class="coach-table">
         <el-table
                v-loading="loading"
                :height="tableHeight + 'px'"
                class="table-main"
                :data="tableData"
                border
                default-expand-all
                style="width: 100%">
            <el-table-column label=" " width="50" align="center">
                <template slot-scope="scope">
                  <el-radio v-model="radio" :label="scope.row"><span></span></el-radio>
                </template>
            </el-table-column>
      
            <el-table-column
            label="教练名称"
            align="center"
            prop="userName" >
            </el-table-column>
            <el-table-column
            label="手机号/邮箱"
            align="center"
            prop="loginName" >
            <template slot-scope="scope">
              {{scope.row.loginName || scope.row.email}}
            </template>
            </el-table-column>
         </el-table>
                  <sur-pagination :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
export default {
  props: {
  },
  data() {
    return {
      loading: false,
      tableData: [],
      pageNo: 1,
      total: null,
      pageSize: 10,
      radio: null
    }
  },
  computed: {
    tableHeight() {
      return this.$store.state.app.containHeight * 0.5
    }
  },
  created() {
    this.searchOption()
  },
  methods: {
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        productId: 1
      }
      baseRequest('/user/rwCoachProRela/coachList', param).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
      }).finally(_ => {
        this.loading = false
      })
    },
    handleSizeChange(val) { // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) { // 分页
      this.pageNo = val
      this.searchOption(true)
    }
  }
}
</script>