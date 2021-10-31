<template>
  <div class="test-course inside-container">
    <h4>开课列表</h4>
    <el-table class="table-main" :data="tableData" :height="tableHight" style="width: 100%" border>
      <el-table-column type="index" ></el-table-column>
      <el-table-column label="预计开始学习日期" prop="startTime" />
      <el-table-column label="首次辅导时间" prop="firstDate" />
      <el-table-column label="末次辅导时间" prop="lastDate" />
      <!-- <el-table-column prop="startTime" label="项目开始日期"></el-table-column>
      <el-table-column prop="endTime" label="辅导起止时间" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.startTime}} ~ {{scope.row.endTime}}</span>
        </template>
        </el-table-column> -->
      <!-- <el-table-column prop="courseType" label="类型"></el-table-column> -->
      <el-table-column prop="productName" label="产品" >
        </el-table-column>
      <el-table-column prop="sNum" label="学员人数" width="150"></el-table-column>
      <el-table-column prop="status" label="开班状态" width="150">
        <template slot-scope="scope">
          <span>{{statusOptions[scope.row.status] }}</span>
        </template>
        </el-table-column>
      <el-table-column align="center" width="120">
        <template slot="header" scoped>
          <a class="table-header-title" @click="addHandle">
            <svg-icon icon-class="icon-add" />开班
          </a>
        </template>

        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.row)" :disabled="isDisabled(scope.row)" size="mini">取 消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <sur-pagination
      :pageNo="pageNo"
      :total="total"
      :pageSize="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
   </sur-pagination>
   <!-- 开班 -->
    <el-dialog
      append-to-body
      :title="this.updateStatus === 0?'开班':'修改'"
      :visible.sync="updateVisible"
      class="dialog-main heightauto"
      top="10%"
      width="450px"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <AddClass ref="addClass" v-if="updateVisible" :currentRow="currentRow"></AddClass>

      <span slot="footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailSave" :loading="commitLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import AddClass from './components/addClass'
export default {
  components: {
    AddClass
  },
  data() {
    return {
      updateVisible: false,
      updateStatus: 0,
      pageNo: 1,
      total: null,
      pageSize: 10,
      tableData: [],
      currentRow: {},
      commitLoading: false,
      statusOptions: {
        '0': '失败', '1': '进行中', '2': '已结课', '3': '未开始', '4': '未选课'
      }
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 255
    }
  },
  created() {
    this.searchOption()
  },
  methods: {
    addHandle() {
      this.currentRow = {}
      this.updateVisible = true
      this.updateStatus = 0
    },
    updateHandle(row) {
      this.currentRow = row
      this.updateVisible = true
      this.updateStatus = 1
    },
    detailSave() {
      this.commitLoading = true
      this.$refs.addClass.saveHandle((_) => {
        this.$Message.success('操作成功')
        this.commitLoading = false
        this.updateVisible = false
        this.searchOption()
      }, _ => {
        this.commitLoading = false
      })
    },
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/course/courses/lists', param).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false

        if (this.tableData && this.tableData.length > 0) {
          this.tableData.forEach((d, i) => {
            d._index = i
            d.firstDate = this.addDate(d.startTime, 7 * 24 * 3600 * 1000) + ' ' + d.endTime
            d.lastDate = this.addDate(d.startTime, 35 * 24 * 3600 * 1000) + ' ' + d.endTime
          })
        }
      })
    },
    addDate(str, time) {
      const t = new Date(str.replace(/-/g, '/')).getTime()
      const date = new Date(t + time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
    },
    deleteRow(row) {
      this.$confirm('确认取消此班次？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          courseId: row.courseId,
          schoolTime: row.endTime
        }
        baseRequest('/course/courses/delete', param).then(
          (response) => {
            if (response.msg === 'Success') {
              this.$Message.success('操作成功')
              this.searchOption()
            }
          }
        )
      })
    },
    isDisabled(row) {
      return row.sNum !== 0 || !row.startTime || row.startTime < this.getCurrentDate()
    },
    getCurrentDate() {
      const date = new Date()
      const seperator1 = '-'
      const year = date.getFullYear()
      this.viewYear = date.getFullYear() + ''
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      return year + seperator1 + month + seperator1 + strDate
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.searchOption(true)
    }
  }
}
</script>

<style lang="scss">
.test-course {
  background-color: #fff;
  margin-top: 30px;
  padding: 24px;
  border-radius: 4px;
  h4 {
    margin-bottom: 20px;
    color: #222222;
    font-size: 14px;
  }
  font-family: pingFangSC-Semibold;
  .del {
    border: 1px solid #fa664a;
    color: #fa664a;
    border-radius: 3px;
    background: #fff;
    margin-left: 14px;
    margin-right: 14px;
    width: 42px;
    height: 28px;
    font-size: 12px;
    text-align: center;
    padding: 0;
  }
  .change {
    border: 1px solid #00affb;
    color: #fff;
    border-radius: 3px;
    background: #00affb;
    margin-right: 14px;
    width: 42px;
    height: 28px;
    font-size: 12px;
    text-align: center;
    padding: 0;
  }
}

.boxcontent-no {
  width: 340px;
  height: 208px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 17px;
  padding: 16px 30px;
  .userinfo {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
  }
}
.mengban {
  width: 100%;
  height: 100%;
  //  z-index: 9999999;
  background-color: rgba(22, 22, 22, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  .box {
    width: 340px;
    height: 318px;
    background-color: #f4f4f4;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    margin-top: -159px;
    left: 50%;
    margin-left: -170px;
    padding-top: 15px;
    .boxt {
      width: 281px;
      height: 20px;
      margin: 0 auto;
      span {
        float: left;
      }
      .close {
        float: right;
        cursor: pointer;
      }
    }
  }
}
</style>

