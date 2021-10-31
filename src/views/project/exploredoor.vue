<template>
  <div class="project-fs">
    <!-- 弹出框 -->
    <el-dialog
      title="选择赠送人"
      :visible.sync="dialogVisible"
      top="10%"
       width="620px"
       class="dialog-main heightauto"
      :before-close="handleClose"
    >
    <!-- <div class="big"> -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item  prop="name">
          <el-input v-model="ruleForm.name" placeholder="填写被赠送的手机号/邮箱" class="small"></el-input>
      </el-form-item>
      </el-form>
    <!-- </div> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="fs-header" :style="{ minHeight: minHeight + 'px' }">
      <div class="inside-container clearfix">
        <div class="fs-img">
          <img :src="door" alt="" />
        </div>
        <div class="fs-article">
          <div class="fs-article-header">
            <div class="fs-article-item">
              <svg-icon icon-class="icon-hexin" class="icon-hexin"></svg-icon
              >探索之门
            </div>
            <!-- <div class="fs-article-item second-item">
                            First Step迈出第一步
                        </div> -->
          </div>
          <div class="article-introduction">
            <p>
              “探索之门”项目帮助你开辟出一条清晰的探索路径，通过内含哲学思维的提问，启发你对过去、对未来、对人生的思考，明确自己想要成为的样子，清晰未来想要成就的方向、找到值得自己历尽漫漫人生去坚守的价值，循序渐进地支持你探寻出自己生命的意义，并找到可以持续向前的内在动力。 
            </p>
            <p class="little-label"><b>● 认清自己：</b></p>
            <p>清楚自己在交友、规划未来、寻找人生意义的时候，背后那些支撑我们的信念和价值是什么，那些可以定义我们或者对我们来说非常重要的到底是什么。</p>
            <p  class="little-label"><b>● 看见改变：</b></p>
            <p>看见，是自我探索的过程，也是改变的开始。清晰地看到限制自己的印记，了解自己、理解他人、解决迷茫、找到方法，开启行动。</p>
            <p  class="little-label"><b>● 找到使命：</b></p>
            <p>用问题和自己的心灵对话，不断对自己进行审视，发现自己擅长什么、热爱什么。当找到自己的使命以后，人生的意义就不一样了。在这个过程中我们会发现原来美好生活就在其中。</p>
            <template v-if="huodong.status === '1'">
              <p  class="little-label" style="color:#f56c6c;font-size:18px;"><b>优惠活动：</b></p>
              <p style="color:#f56c6c;">凡首次购买探索之门辅导项目，可免费享有一次原价¥800元的1-1教练会谈机会，时长50分钟。</p>
              <p style="color:#f56c6c;" v-if="huodong.startTime && huodong.endTime">活动时间：{{parseTime(huodong.startTime, "{y}年{m}月{d}日")}}至{{parseTime(huodong.endTime, "{y}年{m}月{d}日")}}。</p>
            </template>
          </div>
          <div class="clearfix" style="margin-top: 28px">
            <div class="article-buy-price">￥{{price + ' | '}}<span style="font-size:15px;">{{'续费:￥'+ xfPrice}}</span></div>
              <div style="float:right">
                <div class="article-buy-btn">
                  <el-button type="success" @click="freeHandle"
                  v-if="!freeDisable"
                    >免费试用</el-button
                  >
                </div>
                <div class="article-buy-btn">
                  <el-button type="success" @click="buyHandle"
                  :disabled="buyDisable"
                    >{{isXuFei?'续费':'立即购买'}}</el-button
                  >
                </div>
                <div class="article-buy-btn">
                  <el-button type="primary"
                  @click="giftHandle"
                    >赠送</el-button
                  >
                  <el-popover
                    placement="top-start"
                    width="400"
                    trigger="hover"
                    content="">
                    <h3>赠送说明</h3>
                    <p style="margin-top:10px;">用户可购买该项目赠送给好友。如需赠送，请点击【赠送】按钮，输入好友账号（手机号/邮箱）确认支付后即可。好友收到通知后可通过账号登录学习。</p>
                    <p style="margin-top:10px;">注：项目自购买之日起，90天内有效。</p>
                    <p style="margin-top:10px;">您将购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请务必付款前确认无误，以免造成不必要的损失。</p>
                    <el-button icon="el-icon-question" type="text" slot="reference">赠送说明</el-button>
                  </el-popover>
                </div>
              </div>
            </div>
        </div>
      </div>

      <div class="door-line"></div>

      <div class="inside-container clearfix">
        <div class="fs-img" style="text-align:center;margin-top:35px;">
          <img :src="guanzhu" alt="" style="width:400px;"/>
        </div>
        <div class="fs-article">
          <div class="article-introduction">
            <p style="font-size:18px;font-weight:bold;">
             特别关注
            </p>
            <p class="little-label" style="font-weight:normal;"><span style="color:#00afff;">●</span> 项目已开通免费试用，请点击“免费试用”按钮，注册登录成功后，从“首页”—“我的项目”—“学员项目”中，找到“探索之门”点击“进入学习”进入体验。</p>
            <p  class="little-label" style="font-weight:normal;"><span style="color:#00afff;">●</span> 学习有效期自购买之日起90天内有效，如需持续探索学习，可续费学习时长，续费金额为¥{{xfPrice}}元，续费后将延长90天学习有效期。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import door from '@/assets/images/door.png'
import guanzhu from '@/assets/images/guanzhu.png'
import { baseRequest } from '@/api/base'
import { parseTime } from '@/utils'
export default {
  components: {
  },
  props: {},
  data() {
    return {
      price: null,
      xfPrice: null,
      freeDisable: true,
      buyDisable: true,
      parseTime,
      guanzhu,
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入手机号/邮箱'))
            } else {
              if (value.indexOf('@') > 0) {
                if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
                  callback(new Error('邮箱格式不正确'))
                } else {
                  callback()
                }
              } else {
                if (!/^1[34578]\d{9}$/.test(value)) {
                  callback(new Error('手机号码格式不正确'))
                } else {
                  callback()
                }
              }
            }
          } }
        ]
      },
      door,
      dialogVisible: false,
      isXuFei: false,
      huodong: {}
    }
  },
  computed: {
    minHeight() {
      return this.$store.state.app.containHeight - 60
    }
  },
  created() {
    this.getPrice()
    // this.getXfPrice()
    this.getHuoDong()
    this.userId = this.$store.state.user.userId
    if (this.userId) {
      this.getFreeAuthority()
      this.getBuyAuthority()
    } else {
      this.freeDisable = false
      this.buyDisable = false
    }
  },
  mounted() {},
  methods: {
    /**
     * 获取活动
     */
    getHuoDong() {
      baseRequest('/user/rwProductActivity/selects', { productId: '5' }).then(response => {
        this.huodong = response.data.item[0] || {}
      })
    },
    buyHandle() {
      this.$router.push({
        name: 'sp-buy',
        params: {
          id: '5'
        },
        query: {
          type: '1',
          name: '探索之门'
        }
      })
    },
    freeHandle() {
      this.userId = this.$store.state.user.userId
      if (!this.userId) {
        const path = this.$route.path
        const query = this.$route.query
        const fromPage = JSON.stringify({ path, query })
        this.$store.dispatch('SetLoginFromPage', fromPage)
        this.$router.push({ name: 'login' })
        return
      }
      baseRequest('/user/rwProductTrial/exploreTrial').then(_ => {
        this.$Message.success('申请成功,您已获得探索之门免费试用')
        this.getFreeAuthority()
        this.getBuyAuthority()
      })
    },
    getPrice() {
      // const params = {
      //   productId: '5',
      //   type: '1'
      // }
      // baseRequest('/user/rwProductPrice/selects', params).then((response) => {
      //   this.price = response.data.item.txnAmt
      // })
      baseRequest('/user/rwProductPrice/getProductPriceList', { productId: 5 }).then(response => {
        const arr = response.data.item
        const priceItem = arr.find(item => item.type === '1')
        const priceXpItem = arr.find(item => item.type === '2')
        this.price = priceItem ? priceItem.txnAmt : ''
        this.xfPrice = priceXpItem ? priceXpItem.txnAmt : ''
      })
    },
    getXfPrice() {
      const params = {
        productId: '5',
        type: '2'
      }
      baseRequest('/user/rwProductPrice/selects', params).then((response) => {
        this.xfPrice = response.data.item.txnAmt
      })
    },
    getFreeAuthority() {
      baseRequest('/user/rwOrder/isOpenExplore', {}).then((response) => {
        this.freeDisable = !response.data.item.isTrial
        this.isXuFei = !response.data.item.flag
      })
    },
    getBuyAuthority() {
      baseRequest('/user/rwProductPermission/isAvailable', {}).then((response) => {
        this.buyDisable = response.data.item.payFlag === '0'
      })
    },
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const params = {}
          if (this.ruleForm.name.indexOf('@') > 0) {
            params.email = this.ruleForm.name
          } else {
            params.loginName = this.ruleForm.name
          }
          baseRequest('/user/rwOrder/isGive', params).then(response => {
            const isGive = response.data.item.isGive
            if (isGive) {
              this.$confirm('即将跳转支付页面，确认赠送给 ' + this.ruleForm.name + ' 用户吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const largess = {
                  productNum: 1
                }
                if (this.ruleForm.name.indexOf('@') > 0) {
                  largess.receiverEmail = this.ruleForm.name
                } else {
                  largess.receiverPhone = this.ruleForm.name
                }
                this.$router.push({
                  name: 'sp-buy',
                  params: {
                    id: '5'
                  },
                  query: {
                    type: '1',
                    name: '探索之门',
                    largess: JSON.stringify(largess)
                  }
                })
              })
            } else {
              this.$Message.warning('很抱歉，该用户已购买该课程')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    giftHandle() {
      this.userId = this.$store.state.user.userId
      if (!this.userId) {
        const path = this.$route.path
        const query = this.$route.query
        const fromPage = JSON.stringify({ path, query })
        this.$store.dispatch('SetLoginFromPage', fromPage)
        this.$router.push({ name: 'login' })
        return
      }
      this.dialogVisible = true
      // 将表单清空
      this.resetForm()
    },
    resetForm(ruleForm) {
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs['ruleForm'].resetFields()
    },
    // 关闭弹出框
    handleClose(done) {
      done()
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
  .little-label{
    margin:20px 0 5px;
  }
  .fs-header {
    background-color: #fff;
    padding: 100px 0;
    border-bottom: 1px solid #ddd;
    .door-line{
      height: 1px;
      width: 100%;
      background-color: #ccc;
      margin: 50px 0 120px;
    }
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