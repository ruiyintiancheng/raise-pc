/** 支付模态框 */
<template>
  <div>
    <el-dialog
      append-to-body
      title="扫码支付"
      :visible.sync="visible"
      class="dialog-main heightauto"
      top="10%"
      width="400px"
      destroy-on-close
      :close-on-click-modal="false">
      <div class="pay-main">
        <div class="pay-price">应付金额: <span style="color: #fb664a;">{{oorder.txnAmt}}元</span></div>
        <div style="height: 220px;">
          <vue-qr :text="appQRCode.billQRCode" :margin="0" :size="220" />
        </div>
        <div class="pay-tip">请扫码支付</div>
        <div>
          <el-button class="result-btn" type="primary" size="mini" @click="submit">我已支付</el-button>  
          <el-button class="result-btn" type="info" plain size="mini" @click="visible=false">取消</el-button>  
        </div>
      </div>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible.sync="resultVisible"
      class="result-dialog dialog-main heightauto"
      top="10%"
      width="400px"
      :close-on-click-modal="false"
      >
      <div class="result-main">
        <div><svg-icon class="result-icon" icon-class="icon-success" /></div>
        <div class="result-title">支付成功</div>
        <div class="result-content"  v-if="oorder.productId === 1 || oorder.productId === '1'">十分感谢您购买First Step辅导项目，本辅导项目是以小组形式进行，组班达3人可成功开班、4人为上限，成功开班后即可开始学习。请耐心等待组班进展信息。</div>
        <el-button class="result-btn" type="primary" @click="goIndex">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
import { baseRequest } from '@/api/base'
export default {
  components: {
    VueQr
  },
  props: { },
  data() {
    return {
      visible: false, // 扫码窗口
      resultVisible: false, // 成功窗口
      orderId: null,
      // 订单
      oorder: {
        productId: null,
        orderType: null,
        txnAmt: null
      },
      appQRCode: {
        errCode: null, // 状态码
        billDate: null, // 订单日期
        billNo: null, // 二维码号
        billQRCode: '' // 二维码
      }
    }
  },
  computed: { },
  created() { },
  mounted() { },
  methods: {
    openDialog(row) {
      this.resultVisible = false
      this.oorder = row
      this.orderId = row.orderId
      this.searchAppQRCode()
    },
    // 获取二维码
    searchAppQRCode() {
      const param = {
        totalAmount: this.oorder.txnAmt,
        orderId: this.orderId
      }
      baseRequest('/user/rwQRCodePay/appQRCode', param).then(response => {
        const { errCode } = response.data.item
        if (errCode !== 'SUCCESS') {
          this.$Message.error('支付繁忙，请稍后再试')
          return
        }
        this.visible = true
        this.appQRCode = { ...response.data.item }
      }).catch(() => {
        this.$Message.error('获取支付二维码失败')
      })
    },
    // 我已支付
    submit() {
      const param = {
        billDate: this.appQRCode.billDate,
        billNo: this.appQRCode.billNo
      }
      baseRequest('/user/rwQRCodePay/payQuery', param).then(response => {
        const { billStatus } = response.data.item
        if (billStatus === 'PAID') { // 付费成功
          this.visible = false
          this.resultVisible = true
        } else if (billStatus === 'UNPAID') { // 未付费
          this.$Message.warning('未支付，请扫码支付')
        } else {
          this.$Message.error('支付失败')
        }
      }).catch(() => {
        this.$Message.error('支付失败')
      })
    },
    // 返回购买页
    goIndex() {
      // this.$router.push({ name: 'firstStep' })
      this.$emit('goIndex')
    }
  }
}
</script>

<style lang="scss" scoped>
  .pay-main {
    text-align: center;
    .pay-price {
      margin: 30px 0;
      font-family: PingFangSC-Semibold;
	    font-size: 16px;
      color: #222222;
      font-weight: bold;
    }
    .pay-image {
      width: 220px;
      height: 220px;
    }
    .pay-tip {
      margin: 20px 0 30px;
      font-family: PingFangSC-Regular;
	    font-size: 14px;
      color: #222222;
      font-weight: bold;
    }
  }

  .result-main {
    text-align: center;
    .result-icon {
      width: 48px;
      height: 48px;
      margin: 20px 0 30px;
    }
    .result-title {
      font-family: PingFangSC-Semibold;
	    font-size: 20px;
      font-weight: bold;
      color: #222222;
    }
    .result-content{
      font-size: 14px;
      line-height: 18px;
      margin-top:22px;
      text-align: center;
    }
    .result-btn {
      width: 90px;
      height: 30px;
      padding: 7px 0;
      margin: 70px 0 10px;
    }
  }

  .result-dialog {
    /deep/ .el-dialog__header {
      display: none;
    }
  }
</style>

