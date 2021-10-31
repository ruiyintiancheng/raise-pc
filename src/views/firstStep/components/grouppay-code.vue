/** 拼团支付模态框 */
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
      :close-on-click-modal="false"
    >
      <div class="pay-main">
        <div class="pay-price">应付金额: <span style="color: #fb664a;">{{oorder.txnAmt}}元</span></div>
        <div style="height: 220px;">
          <vue-qr v-if="appQRCode.billQRCode" :text="appQRCode.billQRCode" :margin="0" :size="220" />
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
      width="360px"
      :close-on-click-modal="false"
      >
      <div class="result-main">
        <div><svg-icon class="result-icon" icon-class="icon-success" /></div>
        <div class="result-title">支付成功</div>
        <vue-qr v-if="groupCode" class="result-code" :text="groupCode" :margin="0" :size="120" />
        <div class="result-title" style="font-size: 14px;line-height: 1.5;">
          <div><el-link type="danger" :underline="false" @click="handleClipboard(groupCode, $event)" >点击复制拼团链接</el-link></div>
          <div>您已成功发起拼团，再邀请{{remain}}人拼团成功</div>
          <div>请在24小时内完成拼团</div>
        </div>
        <el-button class="result-btn" type="primary" @click="goIndex">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
import clipboard from '@/utils/clipboard'
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
      },
      groupCode: '',
      timer: null, // 定时查询状态任务,
      timeOut: null, // 定时取消查询状态任务
      remain: null // 剩余人数
    }
  },
  computed: { },
  created() { },
  mounted() {

  },
  beforeDestroy() {
  },
  methods: {
    openDialog(row) {
      this.resultVisible = false
      this.oorder = row
      this.orderId = row.orderId
      this.groupCode = ''
      this.searchAppQRCode()
    },
    submit() {
      const param = {
        billDate: this.appQRCode.billDate,
        billNo: this.appQRCode.billNo
      }

      baseRequest('/user/rwQRCodePay/payQuery', param).then(response => {
        const { billStatus } = response.data.item
        if (billStatus === 'PAID') { // 付费成功
          const { groupId } = response.data.item
          this.createGroupCode(groupId)
          this.visible = false
          this.resultVisible = true
        } else if (billStatus === 'UNPAID') { // 未付费
          this.$Message.error('未完成付费')
        } else {
          this.$Message.error('支付失败')
        }
      })
    },
    // 获取二维码
    searchAppQRCode() {
      const param = {
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
    handleClipboard(text, event) {
      clipboard(text, event)
    },
    // 返回购买页
    goIndex() {
      // this.$router.push({ name: 'firstStep' })
      this.$emit('goIndex')
    },
    createGroupCode(groupId) {
    // 生成拼团二维码
      const params = { ...this.$route.query, groupId }
      let url = location.origin + location.pathname + '?'
      for (const key in params) {
        url = url + key + '=' + params[key] + '&'
      }
      if (url.lastIndexOf('&') === url.length - 1) {
        url = url.slice(0, url.length - 1)
      }
      this.groupCode = url

      const param = { groupId }
      baseRequest('/user/rwGroupInfo/selectById', param)
        .then(response => {
          const { num, handNum } = response.data.item
          this.remain = num - handNum
        })
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
      margin: 20px 0 16px;
    }
    .result-title {
      font-family: PingFangSC-Semibold;
	    font-size: 20px;
      font-weight: bold;
      color: #222222;
    }
    .result-code {
      margin: 16px 0;
    }
    .result-btn {
      width: 90px;
      height: 30px;
      padding: 7px 0;
      margin: 20px 0 10px;
    }
  }

  .result-dialog {
    /deep/ .el-dialog__header {
      display: none;
    }
  }
</style>

