<template>
  <div class="learn">
    <div
      class="learn-container inside-container"
      :style="{ minHeight: minHeight + 'px' }"
    >
      <h3 class="learn-title">我的项目</h3>
      <!-- 头部 -->
      <el-form class="learn-form" :inline="true" :model="formData">
        <el-form-item>
          <div class="learn-label">项目</div>
          <template>
            <el-select v-model="formData.productId" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item>
          <div class="learn-label">项目时间</div>
          <el-date-picker
            v-model="formData.startTime"
            style="margin-right: 0px"
            class="learn-input"
            type="date"
            value-format="yyyy-MM-dd"
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
            :picker-options="pickerOptionsEnd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="learn-label">项目状态</div>
          <el-select v-model="formData.status" class="learn-input" clearable>
            <el-option label="进行中" value="1"></el-option>
            <el-option label="已结课" value="2"></el-option>
            <el-option label="未开始" value="3"></el-option>
            <el-option label="未选课" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="learn-label"></div>
          <el-button type="primary" @click="searchHandle()">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="learn-line"></div>
      <!-- 项目的列表 -->
      <ul class="learn-list" v-if="learnList.length > 0 ">
        <!-- First Step -->
        <li
          class="learn-item clearfix"
          v-for="(item, index) in learnList"
          :key="item + index"
        >
        <!-- FS（包含无会谈） -->
        <div v-if="item.productId === 1 || item.productId === 9">
        <!-- First Step -->
          <div class="First-Step">
            <!-- <span class="learn-tip">First Step</span> -->
            <!-- 图片 -->
            <div class="learn-item-dsc">
              <img :src="item.productId === 9?pic6:pic2" alt="" :style="{ height: '100%' }" />
              <div v-if="item.productId === 9" class="img-bq">FS-S</div>
            </div>
            <!-- 项目开始时间 -->
            <div
              class="learn-time-box"
              v-if="item.status !== '4' && item.status !== '0'"
              :class="{
                'no-begin': item.status === '0' || item.status === '3',
              }"
            >
              <!-- 开始时间logo -->
              <div class="learn-time-icon">
                <svg-icon
                  v-if="item.status === '3'"
                  icon-class="icon-shi-gray"
                ></svg-icon>
                <svg-icon v-else icon-class="icon-shi"></svg-icon>
              </div>
              <div class="learn-time-title">项目开始时间</div>
              <!-- 项目开始时间 -->
              <div class="learn-time-value" v-if="item.startTime">
                {{ parseTime(item.startTime, "{y}年{m}月{d}日") }}
              </div>
            </div>
            <div
              class="learn-time-box"
              v-if="item.status !== '4' && item.status !== '0'"
              :class="{
                'no-begin': item.status === '0' || item.status === '3',
              }"
            >
              <!-- 结束时间logo -->
              <div class="learn-time-icon">
                <svg-icon
                  v-if="item.status === '3'"
                  icon-class="icon-zhong-gray"
                ></svg-icon>
                <svg-icon v-else icon-class="icon-zhong"></svg-icon>
              </div>
              <div class="learn-time-title">项目结束时间</div>
              <!-- 项目结束时间 -->
              <div class="learn-time-value" v-if="item.endTime">
                {{ parseTime(item.endTime, "{y}年{m}月{d}日") }}
              </div>
            </div>
            <!-- 项目状态 -->
            <div
              class="learn-time-box"
              v-if="item.status === '4' || item.status === '0'"
            >
              <div class="learn-time-icon no-crouse">
                <svg-icon icon-class="book"></svg-icon>
              </div>
              <div class="learn-time-value" v-if="item.status === '4'">
                暂未选择课时
              </div>
              <div class="learn-time-value" v-else>
                开班失败，请重新选择课时
              </div>
            </div>
            <div class="learn-time-btn">
              <div v-if="item.status === '3'" class="learn-time-btn-zero">
                暂未开始
              </div>
              <div
                v-else-if="item.status === '1'"
                class="learn-time-btn-one"
                @click="startLearn(item.courseId,item.productId)"
              >
                进入学习
              </div>
              <div
                v-else-if="item.status === '2'"
                class="learn-time-btn-two"
                @click="startLearn(item.courseId,item.productId)"
              >
                已完成学习
              </div>
              <div
                v-else-if="item.status === '4' || item.status === '0'"
                class="learn-time-btn-three"
                @click="chooseCrouse(item)"
              >
                选择项目课时
              </div>
            </div>
          </div>
        <!-- FS强化辅导 -->
          <div class="strongthening" v-if="item.productId === 1 &&item.fSExtraVo && item.fSExtraVo.showFlag && item.fSExtraVo.productId === 7">
             <div class="strongthening-on">
              <div class="strongthening-img">
              <img :src="pic4" alt="" :style="{ height: '100%' }" />
            </div>
            <div class="strongthening-box"  v-if="item.fSExtraVo.startTime"
              > 
              <div class="strongthening-icon" >
                <svg-icon icon-class="icon-shi"></svg-icon>
              </div>
              <div  class="strongthening-title">下次辅导时间</div>
              <div class="strongthening-value" v-if="item.fSExtraVo.startTime">{{ parseTime(item.fSExtraVo.startTime, "{y}年{m}月{d}日  {h}:{i}") }}</div>
            </div>
            <!-- <div class="strongthening-box1"></div> -->
            <div class="strongthening-btn">
              <div v-if="item.fSExtraVo.status === '3'" class="strongthening-btn-zero">
                未预约
              </div>
              <div
                v-else-if="item.fSExtraVo.status === '1'"
                class="strongthening-btn-one"
                @click="startLearnPlus(item)"
              >
                进入学习
              </div>
              <div
                v-else-if="item.fSExtraVo.status === '2'"
                class="strongthening-btn-two"
                @click="startLearnPlus(item)"
              >
                已完成辅导
              </div>
            </div>
          </div>
        </div>  
        </div>
        <div v-else-if="item.productId === 5">
          <!-- 探索之门 -->
          <div class="First-Step">
            <!-- <span class="learn-tip">First Step</span> -->
            <!-- 图片 -->
            <div class="learn-item-dsc">
              <img :src="pic3" alt="" :style="{ height: '100%' }" />
            </div>
            <!-- 项目开始时间 -->
            <div
              class="learn-time-box"
              v-if="item.status !== '4' && item.status !== '0'"
              :class="{
                'no-begin': item.status === '0' || item.status === '3',
              }"
            >
              <!-- 开始时间logo -->
              <div class="learn-time-icon">
                <svg-icon
                  v-if="item.status === '3'"
                  icon-class="icon-shi-gray"
                ></svg-icon>
                <svg-icon v-else icon-class="icon-shi"></svg-icon>
              </div>
              <div class="learn-time-title">项目开始时间</div>
              <!-- 项目开始时间 -->
              <div class="learn-time-value" v-if="item.startTime">
                {{ parseTime(item.startTime, "{y}年{m}月{d}日") }}
              </div>
            </div>
            <div
              class="learn-time-box"
              v-if="item.status !== '4' && item.status !== '0'"
              :class="{
                'no-begin': item.status === '0' || item.status === '3',
              }"
            >
              <!-- 结束时间logo -->
              <div class="learn-time-icon">
                <svg-icon
                  v-if="item.status === '3'"
                  icon-class="icon-zhong-gray"
                ></svg-icon>
                <svg-icon v-else icon-class="icon-zhong"></svg-icon>
              </div>
              <div class="learn-time-title">项目结束时间</div>
              <!-- 项目结束时间 -->
              <div class="learn-time-value" v-if="item.endTime">
                {{ parseTime(item.endTime, "{y}年{m}月{d}日") }}
              </div>
            </div>
            <!-- 项目状态 -->
            <div class="learn-time-btn">
              <div v-if="item.status === '3'" class="learn-time-btn-zero">
                暂未开始
              </div>
              <div
                v-else-if="item.status === '1'"
                class="learn-time-btn-one"
                @click="inDoorLearn()"
              >
                进入学习
              </div>
              <div
                v-else-if="item.status === '2'"
                class="learn-time-btn-two"
                @click="inDoorLearn()"
              >
                已完成学习
              </div>
            </div>
          </div>
        </div>

          <!-- 1-1教练会谈 -->
        <div v-else-if="item.productId === 6">
          <div class="First-Step">
            <div class="learn-item-dsc">
              <img :src="pic5" alt="" :style="{ height: '100%' }" />
            </div>
            <div
              class="learn-time-box"
              v-if="item.coachName"
            >

             <div class="learn-time-icon" >
                <svg-icon style="color:#00afff;" icon-class="user"></svg-icon>
              </div>
              <div  class="learn-time-title">教练</div>
              <div class="learn-time-value" >{{ item.coachName }}</div>
            </div>
            <div
              class="learn-time-box"
               v-if="item.startTime"
              :class="{
                'no-begin': item.status === '0' || item.status === '3',
              }"
            >

             <div class="learn-time-icon">
                <svg-icon icon-class="icon-shi"></svg-icon>
              </div>
              <div v-if="item.startTime" class="learn-time-title">下次辅导时间</div>
              <div class="learn-time-value" v-if="item.startTime">{{ parseTime(item.startTime, "{y}年{m}月{d}日 {h}:{i}") }}</div>
            </div>
            <div class="learn-time-btn">
              <div 
                v-if="!item.coachId" class="learn-time-btn-three"
                @click="electCoach(item)"
                >
                选择教练
              </div>
              <div 
                v-else-if="item.status === '3'" class="learn-time-btn-zero"
                >
                未预约
              </div>
              <div
                v-else-if="item.status === '1'"
                class="learn-time-btn-one"
                @click="intoStudy(item)"
              >
                进入学习
              </div>
              <div
                v-else-if="item.status === '2'"
                class="learn-time-btn-two"
                @click="intoStudy(item)"
              >
                已完成学习
              </div>
            </div>
          </div>
        </div>
        </li>
      </ul>
      <div class="no-crouse-list" v-else>暂无可用项目</div>
    </div>
  </div>
</template>
<script>
import { baseSearch } from '@/api/base'
import { parseTime } from '@/utils'
// First Step 图片
import pic2 from '@/assets/images/pic2.png'
import pic6 from '@/assets/images/pic6.jpg'
// 探索之门图片
import pic3 from '@/assets/images/pic3.jpg'
// 强化辅导图片
import pic4 from '@/assets/images/pic4.jpg'
import pic5 from '@/assets/images/pic5.jpg'
export default {
  data() {
    return {
      pic2,
      pic3,
      pic4,
      pic5,
      pic6,
      parseTime,
      formData: {
        productId: null,
        startTime: null,
        endTime: null,
        status: null
      },
      learnList: [],
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
      },
      // 头部项目的选择
      options: [
        {
          value: '1',
          label: 'First Step'
        },
        {
          value: '5',
          label: '探索之门'
        },
        {
          value: '6',
          label: '1-1教练会谈'
        }
      ],
      value: '',
      arr: []
    }
  },
  computed: {
    minHeight() {
      return this.$store.state.app.containHeight - 120
    }
  },
  created() {
    this.searchHandle()
  },
  mounted() {},
  methods: {
    chooseCrouse(item) {
      const query = {
        orderId: item.orderId
      }
      if (item.courseId) {
        query.sourceCourseId = item.courseId
      }
      this.$router.push({ name: 'class', query })
    },
    judgeCourseTime(startTime, endTime) {
      // 0 未开课，1进行中，2已完成
      if (!startTime || !endTime) {
        return '3'
      }
      const startT = new Date(
        (startTime + ' 00:00:00').replace(/-/g, '/')
      ).getTime()
      const endT = new Date(
        (endTime + ' 00:00:00').replace(/-/g, '/')
      ).getTime()
      const nowDate = new Date().getTime()
      if (nowDate <= startT) {
        return '0'
      } else if (nowDate > endT) {
        return '2'
      } else {
        return '1'
      }
    },
    // 调后台项目列表的接口
    searchHandle() {
      baseSearch('/course/courses/selectCourseByStu', this.formData).then(
        (response) => {
          this.arr = response.data.item
          this.learnList = this.arr
          // this.learnList[0].productId = 9
          // console.log(this.learnList)
          // for (const iterator of this.learnList) {
          // iterator.kczt = this.judgeCourseTime(iterator.startTime, iterator.endTime)
          // iterator.status = '4'
          // }
        }
      )
    },
    startLearn(id, productId) {
      if (productId === 9) {
        this.startLearnWu(id)
      } else {
        this.$router.push({ name: 'learnStep', query: { courseId: id }})
      }
    },
    startLearnWu(id) {
      this.$router.push({ name: 'learnStepS', query: { courseId: id }})
    },
    startLearnPlus(row) {
      console.log(row)
      this.$router.push({ name: 'learnFsplus', query: { courseId: row.courseId, recordId: row.fSExtraVo.recordId }})
    },
    inDoorLearn(id) {
      this.$router.push({ name: 'learnDoor' })
    },
    electCoach(row) {
      this.$router.push({
        name: 'learnCoach',
        params: {
          orderId: row.orderId
        },
        query: { row: row }
      })
    },
    intoStudy(row) {
      this.$router.push({
        name: 'intoStudy',
        params: {
          recordId: row.recordId
        },
        query: { row: row }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// 头部项目选择
.el-select {
  width: 300px;
}
.learn {
  .learn-container {
    background-color: #ffffff;
    // box-shadow: 0px 2px 10px 0px
    //     rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 24px;
    margin-top: 30px;
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
        width: 300px;
        margin-right: 8px;
      }
    }
    .learn-line {
      height: 1px;
      border: dashed 1px #ccc;
    }
    .learn-list {
      .learn-item {
        margin-top: 24px;
        position: relative;
        background-color: #ffffff;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border: solid 1px #eeeeee;
        padding: 14px;
        overflow: hidden;
        position: relative;
        // border-bottom: 1px dashed gray;
        .learn-tip {
          height: 30px;
          line-height: 30px;
          padding: 0 15px;
          background-color: #00afff;
          box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
          border-radius: 10px 0px 10px 0px;
          // border: solid 1px #eeeeee;
          position: absolute;
          left: 0;
          top: 0;
          color: #ffffff;
          font-size: 16px;
          // border-bottom: 1px dashed gray;
        }
        .strongthening {
          width: 1362px;
          height: 200px;
          background-color: #ffffff;
          overflow: hidden;
          .strongthening-on{
          margin-top: 24px;
          position: relative;
          width: 1362px;
          position: absolute;
          top: 174px;
          border-top: 1px dashed gray;
          padding-top: 10px;
            .strongthening-img {
            float: left;
            height: 172px;
            background-color: #ebf9ff;
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
          .strongthening-box {
            margin-left: 100px;
            margin-top: 36px;
            height: 100px;
            border-left: 6px solid #eee;
            // float: left;
            padding-left: 20px;
            padding-top: 10px;
            color: #222222;
            // position: absolute;
            // left: 393px;
            float: left;
            min-width: 180px;
            .strongthening-icon {
              font-size: 20px;
            }
            .strongthening-title {
              margin-top: 10px;
              font-size: 14px;
            }
            .strongthening-value {
              margin-top: 10px;
              font-size: 20px;
            }
            &.no-begin {
            color: #888888;
          }
          }
          .strongthening-box1 {
            margin-left: 100px;
            margin-top: 36px;
            height: 100px;
            border-left: 6px solid #eee;
            // float: left;
            padding-left: 20px;
            padding-top: 10px;
            color: #222222;
            position: absolute;
            left: 670px;
          }
          .strongthening-btn {
            float: right;
            margin-top: 100px;
            margin-right: 22px;
            width: 120px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            .strongthening-btn-two {
            height: 100%;
            width: 100%;
            background-color: #ffffff;
            border: solid 1px #00afff;
            color: #00afff;
            cursor: pointer;
            overflow: hidden;
            border-radius: 4px;
            font-size: 16px;
          }
          .strongthening-btn-one {
            height: 100%;
            background-color: #00afff;
            color: #fff;
            cursor: pointer;
            overflow: hidden;
            border-radius: 4px;
            font-size: 16px;
          }
          .strongthening-btn-zero {
            height: 100%;
            background-color: #bbbbbb;
            color: #fff;
            overflow: hidden;
            border-radius: 4px;
            font-size: 16px;
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
          // padding:20px;
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
          margin-left: 100px;
          margin-top: 36px;
          // width: 180px;
          height: 100px;
          border-left: 6px solid #eee;
          float: left;
          padding-left: 20px;
          padding-top: 10px;
          font-family: PingFangSC-Regular;
          color: #222222;
          min-width: 180px;
          .learn-time-icon {
            font-size: 20px;
            &.no-crouse {
              font-size: 30px;
            }
          }
          .learn-time-title {
            margin-top: 10px;
            font-size: 14px;
          }
          .learn-time-value {
            margin-top: 10px;
            font-size: 20px;
          }
          &.no-begin {
            color: #888888;
          }
        }
        .learn-time-btn {
          float: right;
          margin-top: 100px;
          margin-right: 22px;
          width: 120px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          .learn-time-btn-two {
            height: 100%;
            width: 100%;
            background-color: #ffffff;
            border: solid 1px #00afff;
            color: #00afff;
            cursor: pointer;
            overflow: hidden;
            border-radius: 4px;
          }
          .learn-time-btn-one {
            height: 100%;
            background-color: #00afff;
            color: #fff;
            cursor: pointer;
            overflow: hidden;
            border-radius: 4px;
          }
          .learn-time-btn-three {
            height: 100%;
            background-color: #ff8800;
            color: #fff;
            cursor: pointer;
            overflow: hidden;
            border-radius: 4px;
          }
          .learn-time-btn-zero {
            height: 100%;
            background-color: #bbbbbb;
            color: #fff;
            overflow: hidden;
            border-radius: 4px;
          }
        }
      }
    }
    .no-crouse-list {
      text-align: center;
      padding-top: 200px;
      font-size: 30px;
      color: #00afff;
      font-weight: 600;
    }
  }
}
</style>