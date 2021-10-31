/** 选择支付方式 */
<template>
  <div class="pay" :style="{height:materialsHeight+'px'}">
    <div class="pay-info">购买<span style="color: #00afff;">{{productName}}</span>课程，共计<span style="color: #fb664a;">{{txnAmt}}元</span></div>
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
      <div v-if="radio !== null && canSubmit" class="item-btn btn" @click="submit"><span>立即支付</span></div>
      <div v-else class="item-btn btn gray">立即支付</div>
    </div>
    <grouppay-code v-if="type === 'group'" ref="payCode" @goIndex="goIndex"/>
    <pay-code v-else ref="payCode" @goIndex="goIndex"/>

    <grouppay-union v-if="type === 'group'" ref="payUnion" @goIndex="goIndex"/>
    <pay-union v-else ref="payUnion" @goIndex="goIndex"/>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import payCode from './pay-code'
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
    largess: String,
    priceType: {
      type: String,
      default: 1
    }
  },
  data() {
    return {
      productName: '',
      txnAmt: '',
      priceId: '',
      radio: null,
      pays: [
        { type: '1', icon: 'icon-wechatpay' },
        { type: '2', icon: 'icon-alipay' },
        { type: '0', icon: 'icon-unionpay' }
      ],
      canSubmit: false,
      data: null,
      firstSubmit: true
    }
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 60 - 60 - 48 - 20 - 48
    }
  },
  created() {
    this.searchPrice()
    if (this.largess) {
      this.canSubmit = true
      return
    }
    if (this.productId === '3' || this.productId === 3) {
      baseRequest('/objective/rwGoalPermission/isAvailable', {}).then((response) => {
        const { payFlag, endDate } = response.data.item
        let status = 3
        if (endDate === null || endDate === '') {
          status = 1
        } else {
          status = (payFlag === '1' ? 2 : 3)
        }
        if (status !== 3) {
          this.canSubmit = true
        }
      })
    } else if (this.productId === '1' || this.productId === 1 || this.productId === '9' || this.productId === 9) {
      baseRequest('/user/rwOrder/getIsBuy', {}).then((response) => {
        const { isBuy } = response.data.item
        this.canSubmit = isBuy
        // this.canSubmit = true
      })
    } else if (this.productId === '4' || this.productId === 4) {
      this.canSubmit = true
    } else if (this.productId === '5' || this.productId === 5) {
      baseRequest('/user/rwProductPermission/isAvailable', {}).then((response) => {
        this.canSubmit = response.data.item.payFlag === '1'
      })
    } else if (this.productId === '7' || this.productId === 7) {
      baseRequest('/user/rwProductUserNum/getBuyExtraFlag', {}).then((response) => {
        this.canSubmit = response.data.item.result
      })
    } else if (this.productId === '6' || this.productId === 6) {
      if (this.priceType === '0') {
        baseRequest('/user/rwProductTrial/selectProTryFlag', { productId: '6' }).then(response => {
          this.canSubmit = response.data.item.result
        })
      } else {
        this.canSubmit = true
      }
    }
  },
  mounted() { },
  methods: {
    searchPrice() {
      const param = {
        productId: this.productId,
        type: this.info.num
      }
      if (this.productId === 7 || this.productId === '7' || this.productId === 6 || this.productId === '6') {
        param.type = this.priceType
      }
      if (this.largess) {
        try {
          const largess = JSON.parse(this.largess)
          for (const key in largess) {
            param[key] = largess[key]
          }
        } catch (error) {
          this.$Message.error('参数解析异常，请重试')
        }
      }
      baseRequest('/user/rwProductPrice/selects', param).then(response => {
        this.productName = response.data.item.productName
        this.txnAmt = response.data.item.txnAmt
        this.priceId = response.data.item.priceId
      })
    },
    handlePrevious() {
      if (this.productId === '4' || this.productId === 4) {
        this.$router.push({ path: '/system/finance', query: { btSclect: 6 }})
      } else {
        this.$emit('go-step', 0)
      }
    },
    submit() {
      if (this.firstSubmit === false) {
        this.$Message.warning('很抱歉，当前已存在订单，请30分钟后重新下单')
        setTimeout(_ => {
          this.$router.push({
            name: 'mymy',
            query: {
              tab: '5'
            }
          })
        }, 2000)
        return
      }
      const radio = this.radio === '2' ? '1' : this.radio
      this.firstSubmit = false
      if (this.data && this.data.orderId) {
        if (this.data.orderType !== radio) {
          const param = {
            orderId: this.data.orderId,
            orderType: radio
          }
          baseRequest('/user/rwOrder/updateStatus', param)
            .then(response => {
              this.data.orderType = radio
            })
        }
        if (this.radio === '0') {
          this.$refs.payUnion.openDialog(this.data)
        } else {
          this.$refs.payCode.openDialog(this.data)
        }
        return
      }

      const param = {
        productId: this.productId,
        priceId: this.priceId,
        orderType: radio,
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
      this.canSubmit = false
      if (this.largess) {
        try {
          const largess = JSON.parse(this.largess)
          for (const key in largess) {
            param[key] = largess[key]
          }
        } catch (error) {
          this.$Message.error('参数解析异常，请重试')
        }
      }
      if (this.productId === 7 || this.productId === '7' || this.productId === 6 || this.productId === '6') {
        param.type = this.priceType
      }
      // 获取订单
      baseRequest('/user/rwOrder/putOrder', param).then(response => {
        const { code, orderId, msg } = response.data.item
        if (code === 0) {
          this.$Message.error(msg)
          return
        }

        const data = {
          productId: param.productId,
          orderType: param.orderType,
          txnAmt: this.txnAmt,
          code,
          orderId
        }
        this.data = data
        if (this.radio === '0') {
          this.$refs.payUnion.openDialog(data)
        } else {
          this.$refs.payCode.openDialog(data)
        }
      }).finally(_ => {
        this.canSubmit = true
      })
    },
    // 返回购买页
    goIndex() {
      if (this.productId === '3' || this.productId === 3) {
        this.$router.push({ name: 'sp' })
      } else if (this.productId === '1' || this.productId === 1 || this.productId === '9' || this.productId === 9) {
        this.$router.push({ name: 'firstStep' })
      } else if (this.productId === '4' || this.productId === 4) {
        this.$router.push({ path: '/system/finance', query: { btSclect: 6 }})
      } else if (this.productId === '5' || this.productId === 5) {
        this.$router.push({ name: 'exploredoor' })
      } else if (this.productId === '7' || this.productId === 7) {
        this.$router.push({ name: 'strengthen' })
      } else if (this.productId === '6' || this.productId === 6) {
        this.$router.push({ name: 'coachTalk' })
      }
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

