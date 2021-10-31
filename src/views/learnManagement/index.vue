<template>
  <div class="learnManagement">
    <div class="Management inside-container">
      <h3 class="admin-title">客户管理 </h3>
      <!-- <el-form class="learn-form" :inline="true" :model="formData">
                <el-form-item label="">
                    <div class="learn-label">项目</div>
                    <el-input v-model="formData.productName" 
                        class="learn-input" clearable placeholder="请输入项目名称"></el-input>  
                </el-form-item>
                <el-form-item>
                    <div class="learn-label">学员手机号</div>
                    <el-input v-model="formData.loginName" 
                        class="learn-input" clearable placeholder="请输入学员手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="learn-label"></div>
                    <el-button type="primary" @click="searchList">搜索</el-button>
                </el-form-item>
            </el-form> -->
      <!-- <div class="learn-line"></div> -->
      <ul
        class="course-particulars"
        v-for="(value, index) in tableList"
        :key="index"
      >
        <li class="particulars-item clearfix">
          <div class="project-img">
            <img
              v-if="value.productId === 1"
              src="../../assets/images/pic2.png"
              alt=""
            />
            <img
              v-else-if="value.productId === 3"
              src="../../assets/images/pic1.png"
              alt=""
            />
            <img
              v-else-if="value.productId === 5"
              src="../../assets/images/pic3.jpg"
              alt=""
            />
            <img
              v-else-if="value.productId === 6"
              src="../../assets/images/pic5.jpg"
              alt=""
            />
          </div>
          <div class="course-message" style="width:100px;">
            <div class="course-message-icon"></div>
            <div class="course-message-title">学员人数</div>
            <div class="course-message-value">
              {{ value.optNum }}/{{ value.numbers }}
            </div>
          </div>
          <div class="course-message">
            <div class="course-message-icon"></div>
            <div class="course-message-title">协议</div>
            <div class="course-message-value xieyi" :title="value.agreement">
              {{ value.agreement}}
            </div>
          </div>
          <div class="course-message">
            <div class="course-message-icon"></div>
            <div class="course-message-title">添加日期</div>
            <div class="course-message-value">
            <div class="course-message-value">{{ value.addTime }}</div>
            </div>
          </div>
          <div class="course-message">
            <div class="course-message-icon"></div>
            <div class="course-message-title">截止日期</div>
            <div class="course-message-value">{{ value.effectTime }}</div>
          </div>
          <div class="detailsBtn">
            <div
              v-if="
                value.optNum >= value.numbers ||
                value.effectTime < getCurrentTime
              "
              class="detailsBtn-one running"
              @click="
                viewDetails(
                  value.effectTime,
                  value.productId,
                  value.optNum,
                  value.numbers,
                  value.id,
                  false
                )
              "
            >
              <span>学员详情</span>
            </div>
            <div
              v-else
              class="detailsBtn-one running"
              @click="
                viewDetails(
                  value.effectTime,
                  value.productId,
                  value.optNum,
                  value.numbers,
                  value.id,
                  true
                )
              "
            >
              <span>添加学员</span>
            </div>
          </div>
        
        </li>
      
      </ul>
      <!-- 分页 -->
      <sur-pagination
        v-if="total > pageSize"
        :pageNo="pageNo"
        :total="total"
        :pageSize="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </sur-pagination>
    </div>
    <!-- 查看详情 -->
    <el-dialog
      :title="'学员人数' + '    ' + this.optNum + '/' + this.numbers"
      append-to-body
      :visible.sync="viewVisible"
      class="dialog-main heightauto"
      top="5%"
      width="680px"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <viewDetails
        v-if="viewVisible"
        ref="viewDetails"
        @refresh="searchOption"

        :cutOffDate="effectTime"
        :currentProductId="currentProductId"
        :optNum="optNum"
        :numbers="numbers"
        :id="id"
        :isAdd="isAdd"
        @setAddLoading="setAddLoading"
        @tableRefresh="tableRefresh"
      ></viewDetails>
      <span slot="footer" v-if="isAdd">
        <el-button @click="closeHandle">关闭</el-button>
        <!-- <el-button type="primary" @click="saveHandle" :loading="addLoading">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { baseSearch } from '@/api/base'
import { baseRequest } from '@/api/base'
import viewDetails from './components/viewDetails'
import { parseTime } from '@/utils'
export default {
  components: {
    viewDetails
  },
  data() {
    return {
      isAdd: false,
      addLoading: false,
      formData: {
        productName: '',
        endTime: '',
        coachName: '',
        beginTime: '',
        loginName: ''
      },
      title: '',
      optNum: '',
      numbers: '',
      pageNo: 1,
      currenyTime: '',
      total: null,
      pageSize: 5,
      currentProductId: 1,
      effectTime: '',
      timedData: [],
      tableList: [],
      viewVisible: false,
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.formData.endTime !== '') {
            let date = this.formData.endTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() > newDate
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.formData.beginTime !== '') {
            let date = this.formData.beginTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      }
    }
  },
  mounted() {
    this.getOneToOneTobRelaList()
  },
  methods: {
    closeHandle() {
      this.viewVisible = false
      // this.searchOption()
    },
    showHandle(row) {
      const param = {
        id: row
      }
      baseRequest('/user/rwMessageTob/allCourse', param).then((response) => {
        // console.log(response)
        this.timedData = response.data.item
        this.loading = false
      })
    },
    tableRefresh(num) {
      this.optNum = num
      this.searchOption(true)
    },
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...this.formData
      }
      baseSearch('/user/rwMessageTob/selectTob', params).then((response) => {
        this.tableList = response.data.item
        // console.log(this.tableList)
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      console.log(val)
      this.searchOption(true)
    },
    viewDetails(effectTime, row, optNum, numbers, id, isAdd) {
      this.viewVisible = false
      this.currentProductId = row
      this.effectTime = effectTime
      this.optNum = optNum
      this.numbers = numbers
      this.id = id
      this.isAdd = isAdd
      this.viewVisible = true
    },
    setAddLoading(boo) {
      this.addLoading = boo
      // console.log(this.addLoading)
    },
    empty() {
      this.$refs.viewDetails.resetForm()
    }
  },
  created() {
    this.searchOption()
    this.getCurrentTime()
  },
  computed: {
    getCurrentTime() {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    tableHight() {
      // eslint-disable-next-line no-irregular-whitespace
      return this.$store.state.app.containHeight - 450
    },
    currentDate() {
      return parseTime(new Date(), '{y}-{m}-{d}')
    }
  }
}
</script>

<style lang="scss" scoped>
.learnManagement {
  .Management {
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 24px;
    margin-top: 30px;
    .admin-title {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
      font-weight: bold;
    }
    .learn-form {
      margin-top: 18px;
      .learn-label {
        height: 28px;
        line-height: 28px;
      }
      .learn-input {
        width: 235px;
        margin-right: 8px;
      }
    }
    .learn-line {
      height: 1px;
      border: dashed 1px #ccc;
    }
    .course-particulars {
      li:last-child {
        margin-bottom: 0;
      }
      .particulars-item {
        .showtime {
          .widthHandle {
            padding: 0;
          }
        }
        margin: 24px 0;
        position: relative;
        height: 200px;
        background-color: #ffffff;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border: solid 1px #eeeeee;
        padding: 14px;
        overflow: hidden;
        .project-img {
          float: left;
          width: 340px;
          height: 172px;
          // background-color: #EBF9FF;
          // border-radius: 6px;
          // border: solid 1px #dddddd;
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 19px;
          letter-spacing: 0px;
          color: #222222;
          padding: 10px;
        }
        .course-message {
          margin-left: 20px;
          margin-top: 36px;
          width: 215px;
          height: 100px;
          border-left: 6px solid #eee;
          float: left;
          padding-left: 20px;
          padding-top: 10px;
          font-family: PingFangSC-Regular;
          color: #222222;
          .course-message-icon {
            font-size: 20px;
          }
          .course-message-title {
            margin-top: 10px;
            font-size: 14px;
          }
          .course-message-value {
            margin-top: 10px;
            font-size: 20px;
            &.xieyi{
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
        .detailsBtn {
          float: right;
          margin-top: 60px;
          margin-right: 50px;
          width: 120px;
          line-height: 40px;
          text-align: center;
          overflow: hidden;
          .detailsBtn-one {
            border-radius: 4px;
            background-color: #00afff;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>