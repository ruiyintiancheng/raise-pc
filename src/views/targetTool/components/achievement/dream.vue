<template>
    <div class="dream-list">
        <el-table
           class="table-main"
            :data="tableData"
            row-key="planId"
            border
            style="width: 100%">
            <el-table-column
            prop="dreamGoal"
            label="梦想"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="dreamField"
            align="center"
            width="200"
            label="领域"
            >
            <template slot-scope="scope">
                {{dreamFieldList[scope.row.dreamField-1]}}
            </template>
            </el-table-column>
            <el-table-column
            prop="realizationDate"
            align="center"
            width="300"
            label="实现日期"
            >
              </el-table-column>
        </el-table>
        <sur-pagination
            v-if="total >= 10" 
              :pageNo="pageNo"
              :total="total"
              :pageSize="pageSize"
              @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination>
    </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import { dateInfo } from '@/utils/dateUtil'
export default {
  props: {
    date: String
  },
  data() {
    return {
      tableData: [],
      viewYear: '',
      pageNo: 1,
      total: 0,
      pageSize: 10,
      dreamFieldList: ['身体与健康', '心智与教育', '家庭与天伦', '精神与道德', '社交与文化', '理财与事业', '事业领域']
    }
  },
  mounted() {
    this.handleDate()
    this.searchOption()
  },
  watch: {
    date(val) {
      this.handleDate()
      this.searchOption()
    }
  },
  methods: {
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      baseRequest('/objective/rwDream/isList', { viewDate: this.viewYear }).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
      })
    },
    handleDate() {
      const date = dateInfo(this.date)
      this.viewYear = date.year
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

<style lang="scss" scoped>
.dream-list{
    margin-top:30px;
}
</style>