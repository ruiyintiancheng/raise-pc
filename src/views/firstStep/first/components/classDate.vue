/** 选择课时 */
<template>
  <div class="step-main" :style="{'min-height':materialsHeight+'px'}">
    <div class="course-menu">
      <div class="course-menu-line line-dashed" :style="{'width': `${recommendShow ? 280 : 140}px`}" />
      <ul class="course-menu-ul menu">
        <li v-if="recommendShow" class="menu-item fl" @click="activeName = 'first'" :class="{active: activeName === 'first'}">
          <a class="menu-title">推荐课时</a>
        </li>
        <li class="menu-item fl" @click="activeName = 'second'" :class="{active: activeName === 'second'}">
          <a class="menu-title">全部课时</a>
        </li>
      </ul>
      <div class="menu-buy">
        <div v-if="type === 'one'" class="item-btn btn" @click="submit">无合适课时</div>
        <div v-if="type === 'group'">
          <span>拼团人数：</span>
          <span v-if="groupNum">{{groupNum}}人</span>
          <el-select v-else v-model="num" filterable 
            class="option-input" 
            placeholder="请选择拼团人数">
            <el-option label="3人" value="3"></el-option>
            <el-option label="4人" value="4"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <coach-recommend v-if="activeName === 'first'" 
      :isGroup="isGroup"
      @go-step="goStep" 
    />
    <coach-all v-show="activeName === 'second'" 
      :isGroup="isGroup"
      @go-step="goStep" 
    />
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import coachAll from './coach-all'
import coachRecommend from './coach-recommend'
export default {
  components: {
    coachAll,
    coachRecommend
  },
  props: {
    type: [String, Number],
    groupNum: [String, Number]
  },
  data() {
    return {
      activeName: 'second',
      num: '1',
      recommendShow: false,
      isGroup: false,
      introId: ''
    }
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 60 - 60 - 48 - 20 - 48
    }
  },
  created() {
    this.num = this.type === 'one' ? '1' : '3'
    this.isGroup = this.type === 'group'
    this.isRecom()
  },
  mounted() { },
  methods: {
    // 是否推荐
    async isRecom() {
      const introId = localStorage.getItem('recommender')
      if (!introId || introId === '') {
        return
      }
      // 判断推荐人是否为教练
      const code = await baseRequest('/user/rwUser/getCoachFlag', { userId: introId })
        .then((response) => {
          return response.data.item.result
        })
      if (!code) {
        return
      }

      // 判断教练是否开班
      const param2 = {
        pageNo: 1,
        pageSize: 10,
        isGroup: this.isGroup,
        introId
      }
      const code2 = await baseRequest('/course/coaches/getRecommendCoach', param2)
        .then((response) => {
          const item = response.data.item
          return item && item.length > 0
        })
      this.recommendShow = code2
      this.activeName = code2 ? 'first' : 'second'
    },
    goStep(coach) {
      coach.num = this.num
      this.$emit('go-step', 1, coach)
    },
    submit() {
      this.$confirm('没有找到合适的课时，确定提交订单么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('go-step', 1, { num: this.num })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  .step-main {
    position: relative;
    overflow: auto;
    color: #222222;
    font-family: PingFangSC-Regular;
	  font-size: 14px;

    .course-menu {
      position: relative;
      .course-menu-line {
        width: 280px;
        position: absolute;
        bottom: 0;
      }
      .menu-buy {
        position: absolute;
        left: 380px;
        top: 10px;
        .option-input {
          width: 100px;
          height: 40px;
        }
      }
    }
  }

  .line-dashed {
    display: block;
    height: 0;
    border-top: 1px dashed #aaaaaa;
  }

  .item-btn {
      display: inline-block;
      width: 90px;
      line-height: 30px;
      background-color: #00afff;
      color: #ffffff;
      border-radius: 4px;
  }

  .btn {
    text-align: center;
    user-select: none;
    cursor: pointer;
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

