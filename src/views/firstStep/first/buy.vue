/** 产品购买 */
<template>
  <div class="course inside-container">
      <div class="course-title">
        <span>产品购买 — {{name}}</span>
        <span style="margin:0 14px;">/</span>
        <span class="bold">{{stepLabels[stepNo]}}</span>
      </div>
      <div class="line line-dashed" />
      <class-date v-show="stepNo === 0" :group-num="groupNum" :type="type" @go-step="goStep" />
      <pay v-if="stepNo === 1" :type="type" :productId="id" :groupId="groupId" :info="info" @go-step="goStep" />
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import classDate from './components/classDate'
import pay from '../components/pay'
export default {
  components: {
    classDate,
    pay
  },
  props: {
    id: [String, Number],
    type: String,
    name: String,
    groupId: String
  },
  data() {
    return {
      activeName: 'first',
      date: null,
      stepNo: 0,
      stepLabels: ['选择课时', '选择支付方式'],
      info: null, // 产品选择信息
      groupNum: null
    }
  },
  computed: {
  },
  created() {
    if (this.type === 'one') {
      this.num = 1
    } else if (this.groupId) {
      this.getInfo()
    }
  },
  mounted() { },
  methods: {
    getInfo() {
      baseRequest('/user/rwOrder/getIsBuy', {}).then((response) => {
        const { isBuy } = response.data.item
        if (!isBuy) {
          this.$Message.warning('当前用户不能购买')
          this.$router.push({ name: 'firstStep' })
        }
      })
      if (this.groupId) {
        const param = { groupId: this.groupId }
        baseRequest('/user/rwGroupInfo/selectById', param)
          .then(response => {
            const { num, handNum } = response.data.item
            this.remain = num - handNum
            if (this.remain <= 0) {
              this.$Message.warning('很抱歉，该拼团人数已满')
              this.$router.push({ name: 'firstStep' })
            }

            this.groupNum = num
          })
      }
    },
    goStep(step, coach) {
      coach = coach || {}
      this.info = {
        num: coach.num,
        data: coach
      }
      this.stepNo = step
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
	  font-size: 16px;
    .course-title {
      .bold {
        font-weight: bold;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
      }
    }
    .line {
      margin: 24px 0;
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

