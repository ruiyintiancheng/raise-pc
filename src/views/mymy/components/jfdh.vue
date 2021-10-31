<template>
  <div class="jfdh" v-loading="pageloading">
    <div
      class="jfdh-container inside-container"
      :style="{ minHeight: minHeight + 'px' }"
    >
      <h3 class="learn-title">积分兑换 <span class="jf-value">当前积分: {{result || 0}}</span></h3>
      <div class="learn-line"></div>
      <ul class="jf-box clearfix">
          <li class="jf-item" v-for="(item,index) in jfList" :key="index">
              <div class="jf-title">{{item.productName}}</div>
              <img class="jf-img" :src="productInfo[item.productId]?productInfo[item.productId].img:''" alt="">
              <div class="jf-dsc">满{{item.changeCards}}积分可兑换{{item.comment}}。</div>
              <div class="jf-btn">
                  <el-button type="primary" size="" :disabled="item.status !== 1" @click="dhHandle(item)">立即兑换</el-button>
                  <el-button v-if="item.productId === 6 || (item.productId === 5 && item.priceId === 7)" @click="giftHandle(item)" :disabled="item.changeCards > result" style="margin-left:70px;" type="primary" size="">赠送</el-button>
              </div>
          </li>
      </ul>
    </div>
    <!-- 弹出框 -->
    <el-dialog
      title="选择赠送人"
      :visible.sync="dialogVisible"
      top="10%"
       width="620px"
       class="dialog-main heightauto"
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
        <el-button type="primary" @click="submitFiftForm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import pic1 from '@/assets/images/pic1.png'
// First Step 图片
import pic2 from '@/assets/images/pic2.png'
// 探索之门图片
import pic3 from '@/assets/images/pic3.jpg'
// 强化辅导图片
import pic4 from '@/assets/images/pic4.jpg'
import pic5 from '@/assets/images/pic5.jpg'
import pic6 from '@/assets/images/pic6.jpg'
export default {
  data() {
    return {
      pageloading: false,
      dialogVisible: false,
      currentItem: {},
      result: null,
      jfList: [],
      productInfo: {
        '1': {
          img: pic2
        },
        '3': {
          img: pic1
        },
        '5': {
          img: pic3
        },
        '6': {
          img: pic5
        },
        '7': {
          img: pic4
        },
        '9': {
          img: pic6
        }
      },
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
      }
    }
  },
  computed: {
    minHeight() {
      return this.$store.state.app.containHeight - 120
    }
  },
  created() {
    this.myCards()
    this.getList()
  },
  mounted() {},
  methods: {
    // 我的积分
    myCards() {
      baseRequest('/user/rwCardsInfo/getMyCards', {}).then((response) => {
        if (response.data.item) {
          this.result = response.data.item.result || 0
        }
      })
    },
    getList() {
      baseRequest('/user/rwProductCards/changeProductStatus', {}).then((response) => {
        if (response.data.item) {
          this.jfList = response.data.item || []
        }
      })
    },
    dhSubmint(params) {
      this.pageloading = true
      baseRequest('/user/rwCardsInfo/conversionCards', params).then(_ => {
        this.$Message.success('兑换成功')
        this.myCards()
        this.getList()
      }).finally(_ => {
        this.pageloading = false
      })
    },
    // 兑换
    dhHandle(item) {
      this.$confirm('即将使用' + item.changeCards + '积分兑换\"' + item.productName + '\"。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          productId: item.productId,
          priceId: item.priceId
        }
        this.dhSubmint(params)
      })
    },
    giftHandle(item) {
      this.currentItem = item
      this.dialogVisible = true
      this.$refs['ruleForm'].resetFields()
    },
    submitFiftForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const params = {}
          const submitparams = {
            productId: this.currentItem.productId,
            priceId: this.currentItem.priceId
          }
          if (this.ruleForm.name.indexOf('@') > 0) {
            params.email = this.ruleForm.name
            submitparams.receiverEmail = this.ruleForm.name
          } else {
            params.loginName = this.ruleForm.name
            submitparams.receiverPhone = this.ruleForm.name
          }
          if (this.currentItem.productId === 5) {
            baseRequest('/user/rwOrder/isGive', params).then(response => {
              const isGive = response.data.item.isGive
              if (isGive) {
                this.$confirm('正在兑换\"' + this.currentItem.productName + '\"，确认赠送给 ' + this.ruleForm.name + ' 用户吗？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.dhSubmint(submitparams)
                  this.dialogVisible = false
                })
              } else {
                this.$Message.warning('很抱歉，该用户已购买该课程')
              }
            })
          } else {
            this.$confirm('正在兑换\"' + this.currentItem.productName + '\"，确认赠送给 ' + this.ruleForm.name + ' 用户吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.dhSubmint(submitparams)
              this.dialogVisible = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// 头部项目选择
.el-select {
  width: 300px;
}
.jfdh {
  .jfdh-container {
    background-color: #ffffff;
    // box-shadow: 0px 2px 10px 0px
    //     rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 24px;
    margin-top: 30px;
    .learn-title {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
      font-weight: bold;
      margin-bottom: 15px;
      .jf-value{
          margin-left: 15px;
          font-size: 14px;
          font-weight: normal;
      }
    }
    .learn-line {
      height: 1px;
      border: dashed 1px #ccc;
    }
    .jf-box{
        padding: 17px 0;
        .jf-item{
            float: left;
            width: 423px;
            margin: 17px 20px;
            border: 1px solid #ccc;
            box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
            border-radius: 7px;
            padding: 20px 30px;
            .jf-title{
                font-size: 16px;
                font-weight: 600;
            }
            .jf-img{
                margin-top: 10px;
                display: block;
                width: 100%;
            }
            .jf-dsc{
                margin-top: 10px;
                height: 40px;
                font-size: 14px;
                line-height: 20px;
            }
            .jf-btn{
                text-align: center;
            }
        }
    }
  }
}
</style>