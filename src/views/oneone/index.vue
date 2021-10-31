/** 一对一教练 */
<template>
  <div class="one-one inside-container">
    <div class="one-one-title">
      <span class="bold">产品购买 — 1/1教练</span>
    </div>
    <div class="one-one-list clearfix">
      <div class="one-one-item" v-for="i in 5" :key="i">
        <div class="item-info clearfix">
          <el-image class="item-image" :src="url" fit="contain" />
          <div class="item-person">
              <svg-icon  class="item-person-icon" icon-class="icon-jiaolian-big" />
              <div class="item-person-title">课程教练</div>
              <div class="item-person-value">赵翠花</div>
          </div>
        </div>
        <div class="item-title">教练描述</div>
        <div class="item-message">
          <p>教练描述教练描述教练描述教练描述教练描述教练描述教练描述教
练描述教练描述教练描述教练描述教练描述教练描述教练描述教练
描述教练描述教练描述教练描述教练描述教练描述教练描述教练描
述教练描述教练描述教练描述教练描述教练描述教练描述教练描述
教练描述教练描述教练描述教练描述教练描述教练描述教练描述教
练描述教练描述教练描述教练描述教练描述教练描述教练描述教练
描述教练描述教练描述教练描述教练描述教练描述教练描述教练描
述教练描述教练描述教练描述教练描述教练描述</p>
        </div>
        <div class="item-menu">
          <el-button class="btn">成功按钮</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: { },
  props: { },
  data() {
    return {
      url: require('../../assets/images/qrcode.png')
    }
  },
  computed: { },
  created() { },
  mounted() { },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .one-one {
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding:24px 0 0 24px;
    margin-top:30px;
    margin-bottom:30px;
    color: #222222;
    font-family: PingFangSC-Regular;
	  font-size: 14px;
    .one-one-title {
      margin-bottom: 24px;
      .bold {
        font-weight: bold;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
      }
    }
    .one-one-list {
      
      .one-one-item {
        width: 448px;
        height: 520px;
        background-color: #ffffff;
        box-shadow: 0px 2px 10px 0px 
          rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border: solid 1px #eeeeee;
        margin: 0 24px 24px 0;
        padding: 20px;
        float: left;
        position: relative;
        .item-info {
          .item-image {
            width: 140px;
            height: 140px;
            float: left;
          }
          .item-person {
            margin: 20px 0 0 20px;
            padding: 10px 0 0 20px;
            height: 100px;
            border-left: 6px solid #eeeeee;
            float: left;
            color: #222222;
            .item-person-icon {
              width: 24px;
              height: 24px;
            }
            .item-person-title {
              margin: 10px 0;
              font-family: PingFangSC-Regular;
              line-height: 25px;
              font-size: 14px;
            }
            .item-person-value {
              font-family: PingFangSC-Semibold;
	            font-size: 20px;
              line-height: 21px;
              font-weight: bold;
            }
          }
        }

        .item-title {
          font-family: PingFangSC-Regular;
          line-height: 25px;
          font-size: 16px;
          font-weight: bold;
          color: #222222;
          margin: 20px 0 14px;
        }
        .item-message {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          line-height: 25px;
          color: #222222;
        }
        .item-menu {
          position: absolute;
          right: 20px;
          bottom: 20px;
          .btn {
            width: 120px;
            height: 40px;
            background-color: #00afff;
            border-radius: 4px;
            font-family: PingFangSC-Regular;
	          font-size: 16px;
            color: #ffffff;
          }
        }
      }
    }
  }
</style>

