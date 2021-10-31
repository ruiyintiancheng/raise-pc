/** 沟通/授权 */
<template>
  <div class="tt-month">
    <h4 class="tt-title">沟通</h4>
    <div class="line" />
    <!-- 560px 420-->
    <div class="line-dashed" style="width: 560px; position: absolute; top: 115px;" />
    <ul class="menu">
      <li class="menu-item fl" @click="activeName = '0'" :class="{active: activeName === '0'}">
        <a class="menu-title">沟通追踪</a>
      </li>
      <li class="menu-item fl" @click="activeName = '1'" :class="{active: activeName === '1'}">
        <a class="menu-title">授权计划</a>
      </li>
      <li class="menu-item fl" @click="activeName = '2'" :class="{active: activeName === '2'}">
        <a class="menu-title">会议计划</a>
      </li>
      <li class="menu-item fl" @click="activeName = '3'" :class="{active: activeName === '3'}">
        <a class="menu-title">沟通总表</a>
      </li>
    </ul>

    <div class="tt-body">
      <div v-show="activeName === '0'">
        <tl-table :viewYear="viewYear" :disable="disable"  />
      </div>
      <div v-show="activeName === '1'">
        <sq-table :viewYear="viewYear" :disable="disable" />
      </div>
      <div v-show="activeName === '2'">
        <hy-table :viewYear="viewYear" :disable="disable" />
      </div>
      <div v-if="activeName === '3'">
        <gt-table :viewYear="viewYear" :disable="disable" />
      </div>
    </div>
  </div>
</template>

<script>
import tlTable from './components/tlTable'
import sqTable from './components/sqTable'
import hyTable from './components/hyTable'
import gtTable from './components/gtTable'
import { dateInfo } from '@/utils/dateUtil'

export default {
  components: {
    tlTable,
    sqTable,
    hyTable,
    gtTable
  },
  props: {
    viewYear: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      activeName: '0'
    }
  },
  computed: {
    disable() {
      return parseInt(this.viewYear) < dateInfo().year
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    setActive(activeName) {
      this.activeName = activeName
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../font.scss";
  .tt-month{
    position: relative;
    padding:0 24px 24px;
    .tt-title{
        height: 66px;
        line-height: 66px;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        font-weight: bold;
    }
    .tt-body {
      margin-top: 32px;
    }
    .line {
      display: block;
      height: 0;
      margin: 0 -24px;
      border-top: 1px solid #cccccc;
    }
  }  

$navbarHieght:50px;
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

