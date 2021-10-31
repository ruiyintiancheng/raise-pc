/** 选择支付方式 */
<template>
  <div class="pay" :style="{height:materialsHeight+'px'}">
    <div class="pay-info">购买<span style="color: #00afff;">{{name}}</span>课程，共计<span style="color: #fb664a;">{{price}}元</span></div>
    <div class="pay-tip">选择支付方式</div>
    <div class="pay-list">
      <div v-for="(item,i) in pays" :key="i" class="pay-list-item clearfix">
        <div class="item-radio">
          <el-radio  v-model="radio" size="medium" :label="item.type"><span></span></el-radio>
        </div>
        <div v-if="radio === item.type" class="item item-icon btn active" @click="radio=i">
          <svg-icon class="item-image" :icon-class="item.icon" />
          <svg-icon class="item-chosen" icon-class="icon-chosen" />
        </div>
        <div v-else class="item item-icon btn" @click="radio=item.type">
          <svg-icon class="item-image" :icon-class="item.icon" />
        </div>
      </div>
    </div>
    <div class="pay-menu">
      <div class="item-btn btn previous" @click="handlePrevious"><span>上一步</span></div>
      <div v-if="radio !== null" class="item-btn btn" @click="submit"><span>立即支付</span></div>
      <div v-else class="item-btn btn gray">立即支付</div>
    </div>
    <grouppay-code v-if="type === 'group'" ref="payCode" />
    <pay-code v-else ref="payCode" />

    <grouppay-union v-if="type === 'group'" ref="payUnion" />
    <pay-union v-else ref="payUnion" />
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import payCode from './fast-code'
import payUnion from './pay-union'
import grouppayCode from './grouppay-code'
import grouppayUnion from './grouppay-union'
export default {
  components: {
    payCode,
    payUnion,
    grouppayCode,
    grouppayUnion
  },
  props: {
    type: String,
    productId: [String, Number],
    info: Object,
    groupId: String,
    name: String
  },
  data() {
    return {
      productName: '',
      txnAmt: '',
      radio: null,
      pays: [
        { type: '1', icon: 'icon-wechatpay' },
        { type: '2', icon: 'icon-alipay' },
        { type: '0', icon: 'icon-unionpay' }
      ]
    }
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 60 - 60 - 48 - 20 - 48
    },
    price() {
      if (this.$route.query.states === '1') {
        return '4800'
      } else if (this.$route.query.states === '0') {
        return '800'
      } else {
        return '1'
      }
    }
  },
  created() {
    this.searchPrice()
  },
  mounted() { },
  methods: {
    searchPrice() {
      const param = {
        productId: this.productId,
        type: this.info.num
      }
      baseRequest('/user/rwProductPrice/selects', param).then(response => {
        this.productName = response.data.item.productName
        this.txnAmt = response.data.item.txnAmt
      })
    },
    handlePrevious() {
      this.$emit('go-step', 0)
    },
    submit() {
      const param = {
        productId: this.productId,
        orderType: this.radio === '2' ? '1' : this.radio,
        type: this.info.num,
        data: this.info.data
      }

      const introId = localStorage.getItem('recommender')
      if (introId) {
        param.introId = introId
      }
      if (this.groupId) {
        param.groupId = this.groupId
      }
      // 获取订单
      baseRequest('/user/rwOrder/putOrder', param).then(response => {
        const { code, orderId, msg } = response.data.item

        if (code === 0) {
          this.$Message.error(msg)
          return
        }

        const data = {
          productId: this.productId,
          orderType: this.radio,
          txnAmt: this.txnAmt,
          code,
          orderId
        }

        if (this.radio === '0') {
          this.$refs.payUnion.openDialog(data)
        } else {
          this.$refs.payCode.openDialog(data)
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  .pay {
    position: relative;
    overflow: auto;
    .pay-info {
      font-family: PingFangSC-Semibold;
	    font-size: 16px;
      color: #222222;
      font-weight: bold;
    }
    .pay-tip {
      margin: 24px 0 14px;
      font-family: PingFangSC-Regular;
	    font-size: 13px;
      color: #000000;
      font-weight: bold;
    }
    .pay-list {
      .pay-list-item {
        margin: 14px 0;
        .item-radio {
          line-height: 60px;
          float: left;
        }
        .item-icon {
          position: relative;
          width: 170px;
          height: 60px;
          margin-left: 54px;
          background-color: #fcfcfc;
          border-radius: 4px;
          border: solid 1px #dddddd;
          padding: 15px 38px;
          &.active {
            border: solid 1px #00afff;
            background-color: #E5F7FF;
          }
          .item-image {
            width: 82px;
	          height: 30px;
          }
          .item-chosen {
            width: 16px;
            height: 16px;
            position: absolute;
            right: 0;
            top: -1px;
          }
        }
      }

    }
    .pay-menu {
      position: absolute;
      bottom: 0;
      right: 0;
      .item-btn {
        width: 90px;
        line-height: 30px;
        background-color: #00afff;
        color: #ffffff;
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        margin-left: 20px;
        float: left;

        &.previous {
          color: #00afff;
          background-color: #ffffff;
          border: solid 1px #00afff;
        }
        &.gray {
          color: #ffffff;
          background-color: #cccccc;
        }
      }
    }
  }
  .btn {
    text-align: center;
    user-select: none;
    cursor: pointer;
  }
</style>

