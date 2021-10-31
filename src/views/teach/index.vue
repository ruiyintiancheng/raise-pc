/** 辅导（教练） */
<template>
  <div class="learn">
    <div class="learn-container inside-container">
      <!-- 教练项目的标题 -->
      <h3 class="learn-title">我的项目</h3>
      <!-- 非空验证 -->
      <el-form class="learn-form" :inline="true" :model="formData">
        <el-row>
          <el-col :span="4">
            <el-form-item>
              <div class="learn-label">项目</div>
              <el-select v-model="formData.productId" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item v-if="coachNameSee">
              <div class="learn-label">教练</div>
              <el-input
                v-model="formData.coachName"
                class="learn-input"
                clearable
                placeholder="请输入教练姓名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <div class="learn-label">学员手机号</div>
              <el-input
                v-model="formData.stuLoginName"
                class="learn-input"
                clearable
                placeholder="请输入学员手机号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <div class="learn-label">学员邮箱</div>
              <el-input
                v-model="formData.stuEmail"
                class="learn-input"
                clearable
                placeholder="请输入邮箱"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <div class="learn-label">项目状态</div>
              <el-select
                v-model="formData.statusList"
                class="learn-input"
                multiple
                collapse-tags
              >
                <el-option label="失败" value="0"></el-option>
                <el-option label="进行中" value="1"></el-option>
                <el-option label="已结课" value="2"></el-option>
                <el-option label="未开始" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="display: flex; justify-content: flex-end">
            <el-form-item>
              <div class="learn-label"></div>
              <el-button type="primary" @click="searchHandle()">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <div class="learn-label">辅导时间</div>
          <el-date-picker
            v-model="formData.startTime"
            style="margin-right: 0px"
            class="learn-input"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择辅导开始时间"
            :picker-options="pickerOptionsStart"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="learn-label"></div>
          <span style="margin-right: 10px">至</span>
          <el-date-picker
            v-model="formData.endTime"
            class="learn-input"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择辅导结束时间"
            :picker-options="pickerOptionsEnd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="learn-line"></div>
      <!-- 教练项目列表 -->
      <ul class="learn-list">
        <!-- TTT训练认证 -->
        <li
          v-if="tttOpen"
          class="learn-item clearfix"
        >
          <div class="firstStep">
            <!-- 项目图片 -->
            <!-- <span class="learn-tip">First Step</span> -->
            <div class="learn-item-dsc">
              <img :src="pict" alt="" :style="{ height: '100%' }" />
              <!-- <h5 class="learn-item-dsc-title">项目介绍：</h5>
                        <p class="learn-item-dsc-content" v-html="item.productContent"></p> -->
            </div>
            <div class="learn-time-btn">
              <div
                class="learn-time-btn-one running" style="margin-top: 42px;"
                @click="handleTeachTTT()"
              >
                进入资料库
              </div>
            </div>
          </div>
        </li>
        <template v-for="(item, index) in learnList" >
        <li
          class="learn-item clearfix"
          :key="item + index"
          v-if="item.productId === 1 || item.productId === 9"
        >
          <!-- First Step -->
          <div class="firstStep">
            <!-- 项目图片 -->
            <!-- <span class="learn-tip">First Step</span> -->
            <div class="learn-item-dsc">
              <img :src="item.productId === 9?pic6:pic2" alt="" :style="{ height: '100%' }" />
              <div v-if="item.productId === 9" class="img-bq">FS-S</div>
              <!-- <h5 class="learn-item-dsc-title">项目介绍：</h5>
                        <p class="learn-item-dsc-content" v-html="item.productContent"></p> -->
            </div>
            <!-- 教练姓名 -->
            <div
              class="learn-time-box"
              v-if="coachNameSee"
              style="width: 150px"
            >
              <div class="learn-time-icon">
                <svg-icon icon-class="user"  style="color:#00afff;"/>
              </div>
              <div class="learn-time-title">教练姓名</div>
              <div class="learn-time-value" v-if="item.coachName">{{ item.coachName }}</div>
            </div>
            <!-- 项目开始时间 -->
            <div
              class="learn-time-box"
              :class="{ more: !coachNameSee }"
              style="width: 245px"
            >
              <div class="learn-time-icon">
                <svg-icon
                  v-if="item.status === '3'"
                  icon-class="icon-shi-gray"
                />
                <svg-icon v-else icon-class="icon-shi" />
              </div>
              <div class="learn-time-title">项目开始时间</div>
              <div class="learn-time-value" v-if="item.startTime">
                {{ parseTime(item.startTime, "{y}年{m}月{d}日") }}&nbsp;{{
                  dateFormat(item.pStartTime, "hh:mm")
                }}
              </div>
            </div>
            <!-- 项目结束时间 -->
            <div
              class="learn-time-box"
              :class="{ more: !coachNameSee }"
              style="width: 180px"
            >
              <div class="learn-time-icon">
                <svg-icon
                  v-if="item.status === '3'"
                  icon-class="icon-zhong-gray"
                />
                <svg-icon v-else icon-class="icon-zhong" />
              </div>
              <div class="learn-time-title">项目结束时间</div>
              <div class="learn-time-value" v-if="item.endTime">
                {{ parseTime(item.endTime, "{y}年{m}月{d}日") }}
              </div>
            </div>
            <!-- 学员人数 -->
            <div
              class="learn-time-box"
              :class="{ more: !coachNameSee }"
              style="width: 150px"
            >
              <div class="learn-time-icon">
                <svg-icon
                  v-if="item.status === '3'"
                  icon-class="icon-ren-gray"
                />
                <svg-icon v-else icon-class="icon-ren" />
              </div>
              <div class="learn-time-title">学员人数</div>
              <el-link
                v-if="item.sNum > 0"
                class="learn-time-value"
                type="primary"
                @click="openDialog(item)"
                >{{ item.sNum }}人</el-link
              >
              <div v-else class="learn-time-value">{{ item.sNum }}人</div>
            </div>
            <!-- 学习资料 -->
            <div class="learn-time-btn">
              <div
                class="learn-time-btn-one learn-top running"
                @click="exHandle(item)"
              >
                学习资料
              </div>
              <div v-if="item.status === '0'" class="learn-time-btn-one error">
                开班失败
              </div>
              <div
                v-else-if="item.status === '1'"
                class="learn-time-btn-one running"
                @click="handleTeach(item)"
              >
                进入辅导
              </div>
              <div
                v-else-if="item.status === '2'"
                class="learn-time-btn-one end"
                @click="handleTeach(item)"
              >
                已完成辅导
              </div>
              <div
                v-else-if="item.status === '3'"
                class="learn-time-btn-one error"
              >
                暂未开始
              </div>
            </div>
          </div>
          <!-- 强化辅导 -->
          <div class="intensiveWork" v-if="item.productId === 1 && item.fSExtraVo && item.fSExtraVo.showFlag === true">
            <div class="intensiveWork-on">
            <!-- 项目图片 -->
            <div class="intensiveWork-dsc">
              <img
                :src="pic4"
                alt=""
                :style="{ height: '100%' }"
                class="intensiveWork-img"
              />
            </div>
            <!-- 教练姓名 -->
            <div class="intensiveWork-box" style="width: 150px">
              <div class="intensiveWork-icon">
                <svg-icon icon-class="user"  style="color:#00afff;"/>
              </div>
              <div class="intensiveWork-title">教练姓名</div>
              <div class="intensiveWork-value">{{ item.coachName }}</div>
            </div>
            <!-- 下次辅导时间 -->
            <div class="intensiveWork-box1" :class="{ more: !coachNameSee }" style="width: 245px">
              <div class="intensiveWork-icon1">
                <svg-icon
                  v-if="!item.fSExtraVo.startTime"
                  icon-class="icon-shi-gray"
                />
                <svg-icon v-else icon-class="icon-shi" />
              </div>
              <div class="intensiveWork-title1" >下次辅导时间</div>
              <div class="intensiveWork-value1"  v-if="item.fSExtraVo.startTime">{{ parseTime(item.fSExtraVo.startTime, "{y}年{m}月{d}日") }}&nbsp;{{
                  dateFormat(item.fSExtraVo.startTime, "hh:mm")
                }}</div>
            </div>
            <!-- 辅导结束时间 -->
            <div class="intensiveWork-box2" :class="{ more: !coachNameSee }" style="width: 180px">
            </div>
            <!-- 学员人数 -->
            <div class="intensiveWork-box3" style="width: 150px">
              <div class="intensiveWork-icon3">
                <svg-icon
                  v-if="item.status === '3'"
                  icon-class="icon-ren-gray"
                />
                <svg-icon v-else icon-class="icon-ren" />
              </div>
              <div class="intensiveWork-title3">学员人数</div>
              <span
                class="intensiveWork-value3"
                type="primary"
                >{{ item.fSExtraVo.stuNum }}人</span
              >
            </div>
            <div class="intensiveWork-btn2">
              <div class="intensiveWork-btn-one2 running2" @click="handleTeachPlus(item)">进入辅导</div>
            </div>
          </div>
          </div>
        </li>
        <li
          class="learn-item clearfix"
          :key="item + index"
          v-if="item.productId === 6"
        >
          <!-- 教练会谈 -->
          <div class="firstStep">
            <!-- 项目图片 -->
            <!-- <span class="learn-tip">First Step</span> -->
            <div class="learn-item-dsc">
              <img :src="pic5" alt="" :style="{ height: '100%' }" />
              <!-- <h5 class="learn-item-dsc-title">项目介绍：</h5>
                        <p class="learn-item-dsc-content" v-html="item.productContent"></p> -->
            </div>
            <!-- 教练姓名 -->
            <div
              class="learn-time-box"
              v-if="coachNameSee"
              style="width: 150px"
            >
              <div class="learn-time-icon">
                <svg-icon icon-class="user" style="color:#00afff;"/>
              </div>
              <div class="learn-time-title">教练姓名</div>
              <div class="learn-time-value">{{ item.coachName }}</div>
            </div>
            <!-- 项目开始时间 -->
            <div
              class="learn-time-box"
              :class="{ more: !coachNameSee }"
              style="width: 245px"
            >
              <div class="learn-time-icon">
                <svg-icon
                  v-if="!item.startTime"
                  icon-class="icon-shi-gray"
                />
                <svg-icon v-else icon-class="icon-shi" />
              </div>
              <div class="learn-time-title">下次辅导时间</div>
              <div class="learn-time-value" v-if="item.startTime">
                {{ parseTime(item.startTime, "{y}年{m}月{d}日") }}&nbsp;{{
                  dateFormat(item.pStartTime, "hh:mm")
                }}
              </div>
            </div>
            <div
              class="learn-time-box"
              style="width: 350px"
            >
              <div class="learn-time-icon">
                <svg-icon icon-class="user" style="color:#00afff;"/>
              </div>
              <div class="learn-time-title">学员姓名</div>
              <div class="learn-time-value">{{ item.stuName }}</div>
            </div>
            <!-- 学习资料 -->
            <div class="learn-time-btn">
              <div
                class="learn-time-btn-one learn-top running" style="background-color:#fff;color:#00afff;font-weight:bold;font-size:16px;"
              >
                  <svg-icon
                  icon-class="jilu" style="margin-right:10px;font-size:18px;"
                /> {{item.reservedNum}} / {{item.productNum}}
              </div>
              <div
                class="learn-time-btn-one running"
                @click="handleTeachYk(item)"
              >
                进入辅导
              </div>
            </div>
          </div>
        </li>
        </template>
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
    <info-dialog ref="dialog" />
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { parseTime } from '@/utils'
import { dateFormat } from '@/utils/dateUtil'
// First Step图片
import pic2 from '@/assets/images/pic2.png'
import pic6 from '@/assets/images/pic6.jpg'
// 探索之门图片
import pic3 from '@/assets/images/pic3.jpg'
// 强化辅导图片
import pic4 from '@/assets/images/pic4.jpg'
import pic5 from '@/assets/images/pic5.jpg'
import pict from '@/assets/images/pict.jpg'
import infoDialog from './components/info-dialog'
export default {
  components: {
    infoDialog
  },
  computed: {
    coachNameSee() {
      const roles = this.$store.state.user.roles || []
      return roles.some(
        (item) => item === '0' || item === '1' || item === '2' || item === '10'
      )
    }
  },
  data() {
    return {
      tttOpen: false,
      // 项目下拉框
      options: [{
        value: '1',
        label: 'First Step'
      },
      {
        value: '6',
        label: '1-1教练会谈'
      }],
      value: '',
      // TTT资料库
      // database: [
      //   {
      //     img: pic2,
      //     Enter: '进入资料库'
      //   },
      //   {
      //     img: pic2,
      //     Enter: '进入资料库'
      //   },
      //   {
      //     img: pic2,
      //     Enter: '进入资料库'
      //   },
      //   {
      //     img: pic2,
      //     Enter: '进入资料库'
      //   },
      //   {
      //     img: pic2,
      //     Enter: '进入资料库'
      //   }
      // ],
      dateFormat,
      pic2,
      pic3,
      pic4,
      pic5,
      pic6,
      pict,
      parseTime,
      formData: {
        productId: null,
        coachName: null,
        startTime: null,
        stuLoginName: null,
        stuEmail: null,
        endTime: null,
        statusList: ['1', '3']
      },
      learnList: [],
      pageNo: 1,
      pageSize: 10,
      total: null,

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
          if (this.formData.startTime !== '') {
            let date = this.formData.startTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      }
    }
  },
  created() {
    this.searchHandle()
    this.getTttOpen()
  },
  methods: {
    getTttOpen() {
      baseRequest('/user/rwProductConfig/isOpen', {}).then(response => {
        this.tttOpen = response.data.item.result
      })
    },
    searchHandle(page) {
      if (!page) {
        this.pageNo = 1
      }
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...this.formData
      }
      if (this.formData.statusList.length === 0) {
        delete param.statusList
      }
      baseRequest('/course/firstStepCoach/selectCourseByCoach', param).then(
        (response) => {
          // 将所有项目拿到
          this.learnList = response.data.item
          // 将所有项目的总数拿到
          this.total = response.data.total
        }
      )
    },
    // 进入TTT
    handleTeachTTT() {
      this.$router.push({
        name: 'ttt'
      })
    },
    // 弹框
    openDialog(row) {
      this.$refs['dialog'].openDialog(row)
    },
    // 进入资料
    exHandle(row) {
      this.$router.push({
        name: 'examples',
        query: { courseId: row.courseId }
      })
    },
    // 进入辅导
    handleTeach(row) {
      const query = {
        startDate: row.startTime,
        endDate: row.endTime,
        sNum: row.sNum
      }
      if (row.productId === 9) {
        query.status = 1
      }
      this.$router.push({
        name: 'teach-course',
        params: {
          id: row.courseId
        },
        query
      })
    },
    handleTeachPlus(row) {
      console.log(row)
      this.$router.push({
        name: 'teach-strengthen',
        params: {
          id: row.courseId
        },
        query: {
          startDate: row.startTime,
          endDate: row.endTime,
          sNum: row.sNum
        }
      })
    },
    handleTeachYk(row) {
      this.$router.push({
        name: 'courseTutorship',
        params: {
          recordId: row.recordId
        },
        query: {
          row: row
        }
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.searchHandle()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.searchHandle(true)
    }
  }
}
</script>
<style lang="scss" scoped>
// TTT资料库
.learn-item1 {
  margin: 24px 0;
  position: relative;
  height: 200px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: solid 1px #eeeeee;
  padding: 14px;
  overflow: hidden;
  .learn-item-dsc1 {
    float: left;
    // width: 460px;
    height: 172px;
    background-color: #ebf9ff;
    border-radius: 6px;
    border: solid 1px #dddddd;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 19px;
    letter-spacing: 0px;
    color: #222222;
    overflow: hidden;
    // padding:20px;
    img {
      display: block;
    }
  }
  .learn-time-btn1 {
    float: right;
    margin-top: 42px;
    margin-right: 22px;
    width: 120px;
    line-height: 40px;

    text-align: center;
    overflow: hidden;
    .aaa {
      margin-top: 50px;
    }
    .learn-time-btn-one1 {
      border-radius: 4px;
      background-color: #00afff;
      color: #fff;
      cursor: pointer;
      &.running1 {
        background-color: #00afff;
        color: #fff;
      }
    }
  }
}
// First Step和FS强化辅导
.learn {
  .learn-container {
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 24px;
    margin-top: 30px;
    margin-bottom: 30px;
    .learn-title {
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
        width: 220px;
        margin-right: 8px;
      }
    }
    .learn-line {
      height: 1px;
      border: dashed 1px #ccc;
    }
    .learn-list {
      .learn-item {
        margin: 24px 0;
        position: relative;
        // height: 400px;
        background-color: #ffffff;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border: solid 1px #eeeeee;
        padding: 14px;
        overflow: hidden;
        .learn-tip {
          height: 30px;
          line-height: 30px;
          padding: 0 15px;
          background-color: #00afff;
          box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
          border-radius: 10px 0px 10px 0px;
          border: solid 1px #eeeeee;
          position: absolute;
          left: 0;
          top: 0;
          color: #ffffff;
          font-size: 16px;
        }
        // FS强化辅导
        .intensiveWork {
          width: 1362px;
          height: 200px;
          background-color: #ffffff;
          overflow: hidden;
          .intensiveWork-on{
            margin-top: 24px;
            position: relative;
            width: 1362px;
            position: absolute;
            top: 174px;
            border-top: 1px dashed gray;
            padding-top: 10px;
            .intensiveWork-dsc {
            // float: left;
            // width: 460px;
            height: 172px;
            background-color: #ffffff;
            border-radius: 6px;
            // border: solid 1px #dddddd;
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 19px;
            letter-spacing: 0px;
            color: #222222;
            overflow: hidden;
            // padding:20px;
            .intensiveWork-img {
              float: left;
              height: 172px;
              background-color: #ffffff;
              border-radius: 6px;
              border: solid 1px #dddddd;
              font-size: 14px;
              font-weight: normal;
              font-stretch: normal;
              line-height: 19px;
              letter-spacing: 0px;
              color: #222222;
              overflow: hidden;
            }
          }
          .intensiveWork-box {
            margin-left: 100px;
            // margin-top: 36px;
            height: 100px;
            border-left: 6px solid #eee;
            // float: left;
            padding-left: 20px;
            padding-top: 10px;
            color: #222222;
            position: absolute;
            background-color: #ffffff;
            left: 318px;
            top: 50px;
            .intensiveWork-icon {
              font-size: 20px;
              background-color: #ffffff;
            }
            .intensiveWork-title {
              margin-top: 10px;
              font-size: 14px;
              background-color: #ffffff;
            }
            .intensiveWork-value {
              margin-top: 10px;
              font-size: 20px;
              background-color: #ffffff;
            }
          }
          .intensiveWork-box1 {
            margin-left: 100px;
            // margin-top: 36px;
            height: 100px;
            border-left: 6px solid #eee;
            // float: left;
            padding-left: 20px;
            padding-top: 10px;
            color: #222222;
            position: absolute;
            left: 490px;
            top: 50px;
            background-color: #ffffff;
            .intensiveWork-icon1 {
              font-size: 20px;
              background-color: #ffffff;
            }
            .intensiveWork-title1 {
              margin-top: 10px;
              font-size: 14px;
              background-color: #ffffff;
            }
            .intensiveWork-value1 {
              margin-top: 10px;
              background-color: #ffffff;
              font-size: 20px;
            }
          }
          .intensiveWork-box2 {
            margin-left: 100px;
            background-color: #ffffff;
            // margin-top: 36px;
            height: 100px;
            border-left: 6px solid #eee;
            // float: left;
            padding-left: 20px;
            padding-top: 10px;
            color: #222222;
            position: absolute;
            left: 760px;
            top: 50px;
            .intensiveWork-icon2 {
              font-size: 20px;
              background-color: #ffffff;
            }
            .intensiveWork-title2 {
              margin-top: 10px;
              font-size: 14px;
              background-color: #ffffff;
            }
            .intensiveWork-value2 {
              margin-top: 10px;
              background-color: #ffffff;
              font-size: 20px;
            }
          }
          .intensiveWork-box3 {
            margin-left: 100px;
            // margin-top: 36px;
            height: 100px;
            border-left: 6px solid #eee;
            // float: left;
            padding-left: 20px;
            padding-top: 10px;
            color: #222222;
            position: absolute;
            left: 965px;
            top: 50px;
            background-color: #ffffff;
            .intensiveWork-icon3 {
              font-size: 20px;
              background-color: #ffffff;
            }
            .intensiveWork-title3 {
              margin-top: 10px;
              background-color: #ffffff;
              font-size: 14px;
            }
            .intensiveWork-value3 {
              margin-top: 10px;
              background-color: #ffffff;
              font-size: 20px;
              display: inline-block;
              color: #00afff;
            }
          }
          .intensiveWork-btn2 {
            margin-top: 42px;
            margin-right: 22px;
            width: 120px;
            line-height: 40px;
            text-align: center;
            overflow: hidden;
            position: absolute;
            right: 0;
            top: 0;
            .intensiveWork-btn-one2 {
              border-radius: 4px;
              background-color: #00afff;
              color: #fff;
              cursor: pointer;
              margin-top: 70px;
            }
            .running2 {
              background-color: #00afff;
              color: #fff;
            }
          }
          
          }
        }
      }
      .learn-item-dsc {
        float: left;
        // width: 460px;
        height: 172px;
        background-color: #ebf9ff;
        border-radius: 6px;
        border: solid 1px #dddddd;
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 19px;
        letter-spacing: 0px;
        color: #222222;
        overflow: hidden;
        // padding:20px;
        position: relative;
        .img-bq{
          position: absolute;
            width: 42px;
          height: 30px;
          line-height: 30px;
          top: 0px;
          right: 15px;
          background-color: #ff4444;
          color: #fff;
          text-align: center;
          border-radius: 0 0 6px 6px;
        }
        img {
          display: block;
        }
        .learn-item-dsc-title {
          font-size: 18px;
          line-height: 25px;
        }
        .learn-item-dsc-content {
          line-height: 20px;
        }
      }
      .learn-time-box {
        margin-left: 24px;
        margin-top: 36px;
        width: 180px;
        height: 100px;
        border-left: 6px solid #eee;
        float: left;
        padding-left: 20px;
        padding-top: 10px;
        font-family: PingFangSC-Regular;
        color: #222222;
        &.more {
          margin-left: 70px;
        }
        .learn-time-icon {
          font-size: 20px;
        }
        .learn-time-title {
          margin-top: 10px;
          font-size: 14px;
          white-space: nowrap; /* 不换行 */
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .learn-time-value {
          margin-top: 10px;
          font-size: 20px;
        }
      }
      .learn-time-btn {
        float: right;
        margin-top: 42px;
        margin-right: 22px;
        width: 120px;
        line-height: 40px;

        text-align: center;
        overflow: hidden;
        .learn-time-btn-one {
          border-radius: 4px;
          background-color: #00afff;
          color: #fff;
          cursor: pointer;

          &.running {
            background-color: #00afff;
            color: #fff;
          }
          &.end {
            border: solid 1px #00afff;
            color: #00afff;
            background-color: #ffffff;
          }

          &.error {
            color: #ffffff;
            background-color: #bbbbbb;
          }
          &.learn-top {
            margin-bottom: 15px;
          }
        }
      }
    }
  }
}
/deep/ .sur-pagination {
  border: none;
  border-radius: 0;
}
</style>