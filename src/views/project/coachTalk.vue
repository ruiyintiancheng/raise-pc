<template>
  <div class="project-coachtalk">
    <div class="fs-header" >
      <div class="inside-container clearfix">
        <div class="fs-img">
          <img :src="jlht" alt="" />
        </div>
        <div class="fs-article">
          <div class="fs-article-header">
            <div class="fs-article-item">
              <svg-icon icon-class="icon-hexin" class="icon-hexin"></svg-icon
              >预约辅导 <span style="font-weight:normal;margin-left:30px;">1-1教练会谈</span>
            </div>
          </div>
          <div class="fs-article-line"></div>
          <p class="article-introduction">
            教练作为长期伙伴，旨在帮助客户提升个人表现，激发他们最大限度地发挥出个人潜能。教练经过专业的训练，来聆听、观察，并按客户个人需求定制Coaching的方式。教练的职责是提供支持，他们激发客户自身寻求解决办法和对策的能力，支持客户发现自我潜能，找到自我成长的路径，并增强客户已有的技能，资源和创造力。参加会谈的教练均已通过专业的教练学习和认证。
          </p>
          <ul class="intro-ul">
            <li class="intro-li">
              <div class="intro-title">体验教练辅导过程切身感受其价值</div>
              <div class="intro-text">帮助被教练者发现其潜在价值，从被教练者的现状和目标出发，通过倾听和提问，激发被教练者向内思考，重新审视自我。</div>
            </li>
            <li class="intro-li">
              <div class="intro-title">进一步厘清个人职业与生活方向</div>
              <div class="intro-text">打开被教练者的制约心态，引领自身跳脱限制，梳理出现状、期待和行动，在短时间内清晰地看到工作和生活的目标。</div>
            </li>
            <li class="intro-li">
              <div class="intro-title">共同解决工作和生活中面临的挑战</div>
              <div class="intro-text">突破自我，了解创造的可能性和信念的重要性，更加清晰地认识自己，勇敢面对自己的问题和不足，找到解决问题的方式方法。</div>
            </li>
          </ul>
          <div class="tiyuan-text" v-if="hasTiYan">
            首单体验价格 ¥{{tiYanPrice}} <a @click="tiyanHandle" class="tiyan-btn">点此立即体验</a>
          </div>
          <div class="ck-buy">
            <el-select class="ck-buy-select" v-model="jl" placeholder="请选择教练类型" @change="jlChangeHandle">
                <el-option v-for="(item,index) in jlOptions" :key="index" :value="item.coachCode" :label="item.coachCodeName"></el-option>
            </el-select>
            <el-select style="margin-left:15px;" class="ck-buy-select" v-model="cs" placeholder="请选择购买次数" @change="csChangeHandle">
                <el-option v-for="(item,index) in csOptions" :key="index" :label="item.productNum+'次'" :value="item.type"></el-option>
            </el-select>
            <span class="ck-price" v-if="txnAmt">￥  {{txnAmt}}</span>
             <el-button style="margin-left:50px;" type="primary" @click="buyHandle"
                    >立即购买</el-button>
             <el-button type="success" @click="giftHandle"
                    >赠送</el-button>
                <el-popover
                    placement="top-start"
                    width="400"
                    trigger="hover"
                    content="">
                    <h3>赠送说明</h3>
                    <p style="margin-top:10px;">
用户可购买该项目赠送给好友。如需赠送，请点击【赠送】按钮，输入好友手机号（仅限中国大陆）或邮箱，选择教练类别及相应数量，确认支付后即可。好友收到通知后可通过账号登录进行预约。注：有效期请参考使用期限说明。
                    </p>
                    <el-button icon="el-icon-question" type="text" slot="reference">赠送说明</el-button>
                  </el-popover>
          </div>
        </div>
      </div>
    <div class="ck-line"></div>
    <div class="inside-container clearfix" style="margin-top: 120px;" >
        <div class="fs-article" style="width:806px;">
          <div class="article-title">价格说明</div>
          <ul class="intro-ul">
            <li class="intro-li">
              <div class="intro-title">1-1标准教练会谈：时长50分钟</div>
              <div class="intro-text">1-1标准教练会谈单次价格为800元，有3次、6次两档可选，3次起购。</div>
              <div class="intro-text">购买3次可享优惠价格： 2160元/3次，即折后单价720元/次。</div>
              <div class="intro-text">购买6次可享优惠价格： 4080元/6次，即折后单价680元/次。</div>
              <div class="intro-text">购买正式会谈前，每个账号享有一次199元的首单体验。</div>
            </li>
            <li class="intro-li">
              <div class="intro-title">1-1特色教练会谈：时长50分钟</div>
              <div class="intro-text">除1-1标准教练会谈外，另开设特色教练专区，用户可以参考教练特点及擅长领域，自由选择，根据您的需求进行定制化服务。</div>
              <div class="intro-text">1-1特色教练会谈单次价格为1500元，有单次、3次两档可选，单次起购。</div>
              <div class="intro-text">购买3次可享优惠价格： 3600元/3次，折后单价1200元/次。</div>
            </li>
          </ul>
        </div>
        <div class="fs-img" style="float:right;width:325px;">
          <img :src="cktr" alt="" style="width:325px;"/>
        </div>
      </div>

       <div class="inside-container clearfix" style="margin-top: 100px;" >
        <div class="fs-img" style="float:left;width:325px;">
          <img :src="u1029" alt="" style="width:325px;"/>
        </div>
        <div class="fs-article" style="width:806px;margin-left:120px;margin-top:80px;">
          <div class="article-title">使用期限说明</div>
          <ul class="intro-ul">
            <li class="intro-li">
              <div class="intro-title no-bold">单次教练会谈的有效期为4周，有效期随次数增加依次递增，如3次的会谈有效期为：4周x3次=12周。</div>
            </li>
            <li class="intro-li">
              <div class="intro-title no-bold">您购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，所以请您务必在有效期内完成购买次数的会谈，以免造成不必要的损失。</div>
            </li>
            <li class="intro-li">
              <div class="intro-title no-bold">每次与教练预约好会谈时间后，可以有一次修改机会。</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="inside-container clearfix" style="margin-top: 90px;" >
        <div class="fs-article" style="width:806px;">
          <div class="article-title">赠送说明</div>
          <ul class="intro-ul">
            <li class="intro-li" style="padding-left:0;">
              <div class="">用户可购买该项目赠送给好友。如需赠送，请点击【赠送】按钮，输入好友手机号（仅限中国大陆）或邮箱，选择教练类别及相应数量，确认支付后即可。好友收到通知后可通过账号登录进行预约。</div>
            </li>
            <li class="intro-li" style="padding-left:0;">
              <div class="">注：有效期请参考使用期限说明。</div>
            </li>
          </ul>
        </div>
        <div class="fs-img" style="float:right;width:325px;margin-top:-70px;">
          <img :src="u1038" alt="" style="width:325px;"/>
        </div>
      </div>
    
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
        <el-button type="primary" @click="submitForm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import jlht from '@/assets/shouye-img/pic4.png'
import cktr from '@/assets/shouye-img/pic13.png'
import u1029 from '@/assets/shouye-img/u1029.png'
import u1038 from '@/assets/shouye-img/u1038.png'
import { baseRequest } from '../../api/base'
export default {
  components: {
  },
  props: {},
  data() {
    return {
      txnAmt: '',
      jlht,
      cktr,
      u1029,
      u1038,
      jl: '',
      cs: '',
      tiYanPrice: '',
      jlOptions: [],
      csOptions: [],
      hasTiYan: false,
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
      dialogVisible: false
    }
  },
  computed: {
    minHeight() {
      return this.$store.state.app.containHeight - 60
    }
  },
  created() {
    this.getTiYanPrice()
    this.getOptions()
    this.userId = this.$store.state.user.userId
    if (this.userId) {
      this.getHasTiYan()
    } else {
      this.hasTiYan = true
    }
  },
  mounted() {
  },
  watch: {
  },
  methods: {
    jlChangeHandle(val) {
      this.cs = ''
      const jlItem = this.jlOptions.find(item => item.coachCode === val)
      this.csOptions = jlItem.proNumList
    },
    csChangeHandle(val) {
      this.txnAmt = this.csOptions.find(item => item.type === val).txnAmt
    },
    getOptions() {
      baseRequest('/user/rwProductPrice/getOneToOnePriceList', { productId: '6', configId: '2' }).then(response => {
        this.jlOptions = response.data.item
        this.jl = this.jlOptions[0].coachCode
        const jlItem = this.jlOptions.find(item => item.coachCode === this.jl)
        this.csOptions = jlItem.proNumList
        this.cs = this.csOptions[0].type
        this.txnAmt = this.csOptions.find(item => item.type === this.cs).txnAmt
      })
    },
    getHasTiYan() {
      baseRequest('/user/rwProductTrial/selectProTryFlag', { productId: '6' }).then(response => {
        this.hasTiYan = response.data.item.result
      })
    },
    getTiYanPrice() {
      const params = {
        productId: '6',
        type: '0'
      }
      baseRequest('/user/rwProductPrice/selects', params).then((response) => {
        this.tiYanPrice = response.data.item.txnAmt
      })
    },
    buyHandle() {
      if (!this.jl) {
        this.$Message.warning('请选择教练类型')
        return
      }
      if (!this.cs) {
        this.$Message.warning('请选择购买次数')
        return
      }
      const jlLabel = this.jlOptions.find(item => item.coachCode === this.jl).coachCodeName
      const csLabel = this.csOptions.find(item => item.type === this.cs).productNum
      this.$router.push({
        name: 'sp-buy',
        params: {
          id: '6'
        },
        query: {
          type: this.cs,
          name: `1-1 教练会谈（${jlLabel + csLabel}次）`
        }
      })
    },
    tiyanHandle() {
      this.$router.push({
        name: 'sp-buy',
        params: {
          id: '6'
        },
        query: {
          type: '0',
          name: '1-1 教练会谈（首单体验）'
        }
      })
    },
    giftHandle() {
      if (!this.jl) {
        this.$Message.warning('请选择教练类型')
        return
      }
      if (!this.cs) {
        this.$Message.warning('请选择购买次数')
        return
      }
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
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const params = {}
          if (this.ruleForm.name.indexOf('@') > 0) {
            params.email = this.ruleForm.name
          } else {
            params.loginName = this.ruleForm.name
          }
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
            const jlLabel = this.jlOptions.find(item => item.coachCode === this.jl).coachCodeName
            const csLabel = this.csOptions.find(item => item.type === this.cs).productNum
            this.$router.push({
              name: 'sp-buy',
              params: {
                id: '6'
              },
              query: {
                type: this.cs,
                name: `1-1 教练会谈（${jlLabel + csLabel}次）`,
                largess: JSON.stringify(largess)
              }
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    disHandle() {}
  }
}
</script>
<style lang="scss" scoped>
.demo-ruleForm{
  padding-right: 85px;
}
.el-select{
  width: 48%
}
// 立即体验价格为200元
.ccc {
  text-decoration: underline;
  font-size: 14px;
  color: #00afff;
}
// 立即购买
#aaa {
  width: 100%;
  height: 100%;
  .article-buy-price {
    width: 112px;
    color: #f56c6c;
    float: left;
    line-height: 95px;
    padding-left: 45px;
    font-size: 25px;
    font-weight: 600;
  }
  .article-buy-btn {
    height: 100%;
    margin-top: 30px;
    padding-left: 253px;
    float: right;
    .block {
      display: inline-block;
      width: 300px;
      padding-right: 10px;
      .zzz{
        margin-left: 2px;
      }
      .yyy{
        margin-left: 5px;
      }
    }
    .shopping {
      display: inline-block;
    }
  }
}
$marginUd: 200px;
.project-coachtalk {
    background-color: #fff;

  .fs-header {
    padding: 100px 0;
    border-bottom: 1px solid #ddd;
      .ck-line{
    height: 1px;
    width: 100%;
    background: #ddd;
    // margin-bottom: 100px;
  }
    .fs-img {
      float: left;
      width: 640px;
      margin-top: 16px;
      img {
        width: 560px;
      }
    }
    .fs-article {
      float: left;
      width: 800px;
      .article-title{
        font-weight: bold;
        margin-bottom: 24px;
        font-size: 18px;
      }
      .fs-article-header {
        height: 60px;
      }
      .fs-article-line{
        height: 4px;
        background-color: #00afff;
        width: 180px;
      }
      .fs-article-item {
        display: inline-block;
        font-size: 24px;
        font-weight: bold;
        color: #222222;
        height: 100%;
        // border-bottom: 4px solid #00afff;
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
      .intro-ul{
        .intro-li{
          margin-top: 10px;
          padding-left: 28px;
          line-height: 27px;
          .intro-title{
            font-weight: bold;
            position: relative;
            &.no-bold{
              font-weight: normal;
            }
            &::before{
              content: "";
              width: 12px;
              height: 12px;
              background: #00afff;
              position: absolute;
              top: 7px;
              left: -24px;
              border-radius: 50%;
            }
          }
          .intro-text{
            margin-top: 10px;
          }
        }
      }
      .tiyuan-text{
        padding-left: 50px;
        margin-top: 25px;
        font-weight: bold;
        color: #D9001B;
        .tiyan-btn{
          font-weight: normal;
          margin-left: 30px;
          text-decoration: underline;
        }
      }
      .ck-buy{
        margin-top: 20px;
        margin-bottom: 45px;
        padding-left: 40px;
        .ck-buy-select{
          width: 150px;
        }
        .ck-price{
          margin-left: 20px;
          color: #F56C6C;
          font-size: 23px;
          font-weight: bold;
        }
      }
    }
  }

}
</style>