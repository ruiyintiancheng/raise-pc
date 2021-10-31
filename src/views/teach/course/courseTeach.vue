/** 1对4课程辅导 */
<template>
  <div class="course inside-container">
      <div class="course-title">
        <span class="bold">First Step 课程辅导 </span>
        <span>{{dateTitle}}</span>
      </div>
      <div class="course-menu">
        <div class="course-menu-line line-dashed" />
        <ul class="course-menu-ul menu">
          <li  class="menu-item fl" @click="activeName = 'first'" :class="{active: activeName === 'first'}">
            <a class="menu-title">学习进度</a>
          </li>
          <li  class="menu-item fl" v-if="!status" @click="activeName = 'second'" :class="{active: activeName === 'second'}">
            <a class="menu-title">一对一辅导</a>
          </li>
          <li  class="menu-item fl" v-if="!status" @click="activeName = 'third'" :class="{active: activeName === 'third'}">
            <a class="menu-title">出席管理</a>
          </li>
        </ul>
      </div>
      <div class="body" v-if="showFlag">
        <student-tab v-show="activeName === 'first'" :course-id="id" :operFlag="operFlag"/>
        <oneone-tab v-show="activeName === 'second'" :course-id="id" :start-date="startDate" :s-num="sNum" :operFlag="operFlag"/>
        <attend-tab v-show="activeName === 'third'" :course-id="id" :operFlag="operFlag"/>
      </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import studentTab from './components/student-tab'
import oneoneTab from './components/oneone-tab'
import attendTab from './components/attend-tab'
import { baseRequest } from '../../../api/base'
export default {
  components: {
    studentTab,
    oneoneTab,
    attendTab
  },
  props: {
    id: [String, Number],
    startDate: String,
    endDate: String,
    sNum: [String, Number]
  },
  data() {
    return {
      activeName: 'first',
      operFlag: false,
      showFlag: false,
      status: false
    }
  },
  computed: {
    dateTitle() {
      return parseTime(this.startDate, '{y}年{m}月{d}日') + '~' + parseTime(this.endDate, '{y}年{m}月{d}日')
    }
  },
  created() {
    this.status = !!this.$route.query.status
    this.getCoachInfo()
  },
  mounted() { },
  methods: {
    getCoachInfo() {
      baseRequest('/course/firstStepCoach/coursePermissionByCoach', { courseId: this.id }).then(response => {
        this.operFlag = response.data.item.operFlag
        this.showFlag = response.data.item.showFlag
        if (this.showFlag === false) {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .course {
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding:24px;
    margin-top:30px;
    margin-bottom:30px;
    color: #222222;
    font-family: PingFangSC-Regular;
	  font-size: 14px;
    .course-title {
      .bold {
        font-weight: bold;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
      }
    }
    .course-menu {
      padding-top: 24px;
      position: relative;
      .course-menu-line {
        width: 420px;
        position: absolute;
        bottom: 0;
      }
    }
  }

  .line-dashed {
    display: block;
    height: 0;
    border-top: 1px dashed #aaaaaa;
  }

  $navbarHieght:44px;
  $menuMaring:25px;
  $activeColor:#00afff;

  .menu{
    height: $navbarHieght;
    line-height: $navbarHieght;
    .menu-item{
      width: 140px;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
      padding:0 10px;
      position: relative;
      cursor: pointer;
      &:hover{
        color:$activeColor;
      }
      &.active{
        background-image: linear-gradient(#fff, #cff0ff);
        color:$activeColor;
        &:after{
          content: "";
          position: absolute;
          width: 100%;
          height: 4px;
          background-color: $activeColor;
          left: 0;
          bottom:0;
        }
      }
    }
  }  
</style>

