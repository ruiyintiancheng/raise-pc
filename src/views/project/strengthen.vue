<template>
  <div class="project-fs">
    <div class="fs-header" :style="{ minHeight: minHeight + 'px' }">
      <div class="inside-container clearfix">
        <div class="fs-img">
          <img :src="door" alt="" />
        </div>
        <div class="fs-article">
          <div class="fs-article-header">
            <div class="fs-article-item">
              <svg-icon icon-class="icon-hexin" class="icon-hexin"></svg-icon
              >FS强化辅导
            </div>
          </div>
          <div class="article-introduction">
            <p>
              在达成First Step学习目标、原两次小组辅导及一次1-1辅导基础上，如学员期望学习过程中与教练有更多互动，在个人挑战、卡点梳理、目标规划达成中教练给予更多指导和帮助，我们针对First Step学员设置强化辅导项目，学员可根据自身需求在有效期内选择购买。
            </p>
            <p style="margin-top:15px;"><b>购买说明：</b></p>
            <p><b>● 辅导价格：</b>本强化辅导可享受教练辅导优惠价￥360元/份，每人购买上限为2份</p>
            <p><b>● 购买期限：</b>First Step辅导项目开课 ~ 辅导项目在线6周学习结束前</p>
            <p><b>● 使用期限：</b>First Step辅导项目开课 ~ 辅导项目在线6周学习结束后1周内</p>
            <p><b>● 辅导形式：</b>依据学员所在First Step学习小组总体购买强化辅导人数确定辅导形式。如购买人数小于3人（不含），则辅导形式为50分钟的1-1辅导；如购买人数大于3人（含），则辅导形式为100分钟的小组辅导</p>
            <p><b>● 备注：</b>本教练辅导费已享受优惠折扣，只限量提供First Step学员。如学员在完成本First Step强化辅导后仍期望与教练有更多互动，请前往”<a @click="$router.push({name:'coachTalk'})" style="color:#00afff;text-decoration:underline;cursor: pointer;">1-1教练会谈</a>“进一步选择</p>
          </div>
          <div class="clearfix" style="margin-top: 40px">
            <div class="article-buy-price">￥{{type==='2'?price2:price}}</div>
              <div style="float:right">
                <el-select class="article-buy-btn" v-model="type" placeholder="" style="width:150px;">
                  <el-option :disabled="productNum===0" label="1次" value="1"></el-option>
                  <el-option :disabled="productNum<=1" label="2次" value="2"></el-option>
                </el-select>
                <div class="article-buy-btn">
                  <el-button type="success" @click="buyHandle"
                  :disabled="buyDisable"
                    >立即购买</el-button
                  >
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import door from '@/assets/images/door.png'
import { baseRequest } from '@/api/base'
export default {
  components: {
  },
  props: {},
  data() {
    return {
      price: null,
      price2: null,
      buyDisable: true,
      door,
      type: '1',
      productNum: 0
    }
  },
  computed: {
    minHeight() {
      return this.$store.state.app.containHeight - 60
    }
  },
  created() {
    this.getPrice()
    this.getPrice2()
    this.userId = this.$store.state.user.userId
    if (this.userId) {
      this.getBuyAuthority()
    } else {
      this.buyDisable = false
    }
  },
  mounted() {},
  methods: {
    buyHandle() {
      this.$router.push({
        name: 'sp-buy',
        params: {
          id: '7'
        },
        query: {
          type: this.type,
          name: 'First Step强化辅导'
        }
      })
    },
    getPrice() {
      const params = {
        productId: '7',
        type: '1'
      }
      baseRequest('/user/rwProductPrice/selects', params).then((response) => {
        this.price = response.data.item.txnAmt
      })
    },
    getPrice2() {
      const params = {
        productId: '7',
        type: '2'
      }
      baseRequest('/user/rwProductPrice/selects', params).then((response) => {
        this.price2 = response.data.item.txnAmt
      })
    },
    getBuyAuthority() {
      baseRequest('/user/rwProductUserNum/getBuyExtraFlag', {}).then((response) => {
        this.buyDisable = !response.data.item.result
        this.productNum = response.data.item.productNum
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.small{
  margin-top: 25px;
}
.demo-ruleForm{
  padding-right: 85px;
}
   
$marginUd: 200px;
.project-fs {
  .fs-header {
    background-color: #fff;
    padding: 100px 0;
    border-bottom: 1px solid #ddd;
    .fs-img {
      float: left;
      width: 640px;
      margin-top: 72px;
      img {
        width: 560px;
      }
    }
    .fs-article {
      float: left;
      width: 800px;
      .fs-article-header {
        height: 60px;
      }
      .fs-article-item {
        display: inline-block;
        font-size: 24px;
        font-weight: bold;
        color: #222222;
        height: 100%;
        border-bottom: 4px solid #00afff;
        padding-top: 2px;
        padding-left: 45px;
        position: relative;
        &.second-item {
          font-weight: normal;
          margin-left: 20px;
          border-bottom: none;
          padding-left: 0;
        }
        .icon-hexin {
          font-size: 30px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .article-introduction {
        margin-top: 40px;
        font-size: 16px;
        line-height: 30px;
        color: #222222;
      }
      .article-detail {
        margin-top: 30px;
        .article-detail-title {
          color: #222222;
          font-size: 16px;
          font-weight: bold;
          .article-detail-point {
            margin: 0 14px 0 20px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #00afff;
            display: inline-block;
          }
        }
        .article-detail-content {
          margin-top: 16px;
          line-height: 30px;
          font-size: 16px;
          padding-left: 46px;
        }
      }
      .article-buy-price {
        color: #f56c6c;
        float: left;
        line-height: 95px;
        padding-left: 45px;
        font-size: 25px;
        font-weight: 600;
      }
      .article-buy-btn {
        margin-top: 30px;
        padding-left: 16px;
        float: left;
      }
    }
  }
  .fs-options {
    background-color: #fff;
  }
  .fs-item {
    position: relative;
    padding: $marginUd 0 0 $marginUd;
    .fs-item-img {
      position: absolute;
      width: 320px;
    }
    .fs-item-content {
      color: #222;
      font-size: 16px;
      .fs-item-title {
        font-weight: 600;
        margin-bottom: 25px;
      }
      .fs-item-text {
        line-height: 35px;
        .item-text-intent {
          text-indent: 3em;
        }
      }
    }
    &.item-left {
      padding-left: 600px;
      .fs-item-img {
        top: $marginUd;
        left: $marginUd;
      }
    }
    &.item-right {
      padding-right: 400px;
      padding-left: $marginUd;
      .fs-item-img {
        bottom: 0;
        right: 0;
      }
    }
    &.last-item {
      padding-bottom: $marginUd;
      &.item-right {
        .fs-item-img {
          bottom: $marginUd;
        }
      }
    }
  }
  .fs-fivth {
    padding: 100px 0;
    background-color: #fff;
    border-top: 1px solid #ddd;
    .fs-fivth-header {
      height: 60px;
      border-bottom: 4px solid #00afff;
      font-size: 24px;
      font-weight: 600;
      padding-top: 7px;
      position: relative;
      padding-left: 54px;
      display: inline-block;
      .icon-more {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 40px;
      }
    }
    .fs-fivth-content {
      .fs-fivth-other {
        float: left;
        margin-top: 80px;
        li {
          margin-top: 40px;
          a {
            margin-left: 14px;
            font-size: 18px;
            color: #00afff;
            text-decoration: underline;
          }
        }
      }
      .fs-fivth-img {
        float: right;
        margin-top: 40px;
        width: 454px;
      }
    }
  }
}
</style>