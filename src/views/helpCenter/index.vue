<template>
    <div class="helpCenter inside-container">
        <el-card class="box-card">
          <!-- <div class="moulding"></div> -->
          <div class="question-show" v-for="(val,key,index) in question" :key="index">
            <!-- <div class="moulding"></div> -->
            <div class="question">
              <span><b>{{val.problem}}</b></span>
            </div>
            <div class="answer-content" v-if="val.tip">
              <p>{{val.tip}}</p>
            </div>
            <div class="answer-content">
            <ul v-for="(item,index) in val.answerList" :key="index">
              <li>
                <p>●&nbsp;&nbsp;{{item.answer}}</p>
              </li>
            </ul>
            <div v-if="val.imgurl" style="margin-top:10px">
              <img :src="baseUrl+'media/raisegzh.jpg'" alt="" width="180">
            </div>
            </div>
            <div class="moulding"></div>
          </div>
        </el-card>
        <div class="leaveWord">
            <i style="color: #00afff;" title="留言板" class="el-icon-chat-dot-square" @click="messageBoard" >点击留言</i>
        </div>
        <el-dialog
          title="留言板"
          :visible.sync="leaveWordShow"
          class="dialog-main heightauto"
          top="10%"
          width="500px"
          destroy-on-close
          :close-on-click-modal="false"
          >
          <el-form ref="form" :model="form">
            <el-form-item label="">
                <el-input type="textarea" 
                placeholder="请输入内容" 
                :autosize="{ minRows: 6, maxRows: 8}" 
                maxlength="200"
                show-word-limit 
                v-model.trim="form.content"></el-input>
            </el-form-item>
          </el-form>
      <span slot="footer">
        <el-button type="primary" @click="submitHandle">提 交</el-button>
        <el-button  @click="leaveWordShow = false">关 闭</el-button>
      </span>
    </el-dialog>
    </div>
    
</template>

<script>
import { baseRequest } from '@/api/base'
import { question } from './question'
export default {
  computed: {
    baseUrl() {
      let baseUrl = ''
      if (process.env.BASE_API.startsWith('https://www.raise-wisdom.com')) {
        // 生产
        baseUrl = 'https://www.raise-wisdom.com/'
      } else {
        // 测试
        baseUrl = 'http://www.fascte.cn:9201/'
      }
      return baseUrl
    }
  },
  data() {
    return {
      leaveWordShow: false,
      form: {
        content: ''
      },
      question
    }
  },
  methods: {
    messageBoard() {
      this.leaveWordShow = true
    },
    submitHandle() {
      if (this.form.content) {
        const param = {
          leavingContent: this.form.content
        }
        baseRequest('/user/rwLeavingReply/insert', param).then((response) => {
          if (response.msg === 'Success') {
            this.leaveWordShow = false
            this.$Message.success('留言成功')
          }
        })
      } else {
        this.$Message.error('请填写留言内容')
      }
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.helpCenter{
    padding:20px 0;
    position: relative;
    .box-card {
      padding:20px 50px 0;
        .moulding{
          height:1px;
          margin:20px 0;
          border-bottom: 1px solid #EBEEF5;
        }
        border-radius:10px;
        .question-show{
          .question{
          // height: 40px;
          font-family: PingFangSC-Regular;
          font-size:14px;
          background-color: #FFF;
          color:#222222;
          text-align: left;
          }
        .answer-content{
          margin-top:10px;
          text-align: left;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color:#222222;
          p{
          text-align: left;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color:#222222;
          line-height: 30px;
          }
        }
      }
    
  }
  .leaveWord{
      position: fixed;
      right:55px;
      bottom:100px;
      font-size:18px;
      cursor:pointer
  }
  
}
</style>
