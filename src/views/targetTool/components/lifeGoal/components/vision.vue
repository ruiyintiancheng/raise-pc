<template>
    <div class="vision">
        <span class="v-title">愿景</span>
        <!-- <div class="v-visonex" v-if="visionshow && yuanjing" @click="yuanjingClick">{{yuanjing}}</div> -->
      <div style="margin-top:6px;margin-bottom:20px;" >
            <el-input
        type="textarea"
        :rows="5"
        ref="yuan"
         maxlength="800"
        show-word-limit
        style="width:590px"
        :disabled="isPast"
        v-model="yuanjing">
        </el-input>
        <div style=" width: 590px;text-align:right;margin-top:6px">
            <!-- <el-button @click="visionshow=true">取消</el-button> -->
             <!-- <el-button type="primary" @click="prevision">保存</el-button> -->
        </div>
      </div>
      <span class="v-title">具象化 <el-button class="add-mini-btn" v-if="!imgUrl && !jxhVisable" size="mini" type="success" @click="jxhVisable = true">上传</el-button></span>
         <concretization v-if="imgUrl || jxhVisable"  style="margin:20px 0 0;" :valueFigurat="imgUrl" @successUpload="successUpload"></concretization>
       <!-- <span class="v-title" style="margin:20px 0 0;">自我肯定宣言 <el-button class="add-mini-btn" v-if="!declaration && !xyVisable" size="mini" type="success" @click="xyVisable = true">填写</el-button></span>
      <div style="margin-top:6px;" v-if="declaration || xyVisable">
            <el-input
        type="textarea"
        :rows="5"
        ref="xuan"
         maxlength="100"
        show-word-limit
        style="width:590px"
        placeholder="请填写内容(不要少于10字,不要超过100字)"
        :disabled="isPast"
        v-model="declaration">
        </el-input>
        <div style=" width: 590px;text-align:right;margin-top:6px">
        </div>
      </div> -->
      <div style="position:relative;text-align:left;margin-bottom:20px;margin-top:20px;">
          <el-button v-if="!isPast" type="success" @click="prevision" :loading="loading">保存具象化愿景</el-button>
      </div>
      <!-- <div class="dottedline"></div> -->
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import Concretization from '../../Concretization'
export default {
  props: {
    visionType: String,
    year: [String, Number]
  },
  components: {
    Concretization
  },
  data() {
    return {
      loading: false,
      yuanjing: '',
      declaration: '',
      visionshow: true,
      declarationshow: true,
      imgshow: false,
      valueFigurat: null,
      fileId: '',
      visionId: '',
      visionUrl: '',
      imgUrl: '',
      jxhVisable: false,
      xyVisable: false
    }
  },
  computed: {
    isPast() {
      const currentYear = new Date().getFullYear()
      return Number(this.year) < currentYear
    }
  },
  mounted() {
    this.searchOption()
  },
  methods: {
    declarationClick() {
      this.declarationshow = false
      this.$nextTick(_ => { // 自动获取焦点 element组件autofocus失效
        this.$refs['xuan'].focus()
      })
    },
    yuanjingClick() {
      this.visionshow = false
      this.$nextTick(_ => { // 自动获取焦点 element组件autofocus失效
        this.$refs['yuan'].focus()
      })
    },
    searchOption() {
      baseRequest('/objective/rwVision/selects', { viewYear: this.year, visionType: this.visionType }).then(response => {
        if (response.data.item) {
          this.visionUrl = '/objective/rwVision/update'
          this.visionId = response.data.item.visionId
          this.yuanjing = response.data.item.visionCont
          this.declaration = response.data.item.visionDec
          if (response.data.item.visionFigurat) {
            this.imgUrl = response.data.item.visionFigurat
          }
        } else {
          this.visionUrl = '/objective/rwVision/add'
        }
      })
    },
    prevision() {
      this.visionshow = true
      this.declarationshow = true
      this.loading = true
      if (this.visionId) {
        if (this.fileId) {
          baseRequest(this.visionUrl, { visionId: this.visionId, visionCont: this.yuanjing, visionDec: this.declaration, fileId: this.fileId }).then(response => {
            this.$Message.success('操作成功!')
            this.fileId = ''
            this.loading = false
            this.searchOption()
          })
        } else {
          baseRequest(this.visionUrl, { visionId: this.visionId, visionCont: this.yuanjing, visionDec: this.declaration }).then(response => {
            this.$Message.success('操作成功!')
            this.loading = false
            this.searchOption()
          })
        }
      } else {
        baseRequest(this.visionUrl, { visionCont: this.yuanjing, visionDec: this.declaration, fileId: this.fileId, visionType: this.visionType, viewDate: this.year }).then(response => {
          this.$Message.success('操作成功!')
          this.fileId = ''
          this.loading = false
          this.searchOption()
        })
      }
    },
    // prevision1() {
    //   this.declarationshow = true
    //   baseRequest(this.visionUrl, { declaration: this.declaration }).then(response => {

    //   })
    // },
    successUpload(fileId) {
      this.fileId = fileId
    }
  }
}
</script>
<style lang="scss">
.vision{
    padding-top: 20px;
    position: relative;
    .v-submit{
      position: absolute;
      right: 0px;
      bottom: 20px;
    }
    .v-title{
         display: block;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
        color: #222222;
    }
    .v-visonex{
        width: 590px;
        // height: 110px;
        min-height: 110px;
        display: inline-block;
        border:1px solid #ccc;
        padding:15px;
        margin-top: 6px;
        border-radius: 5px;
        // overflow-y:scroll;
        // overflow-x:hidden;
        overflow: hidden;
        word-wrap:break-word;
        margin-bottom:20px;
        cursor: pointer;
    }
    .updateimg{
      position: relative;
       width: 590px;
       .v-img{
         width: 360px;
         height: 240px;
        //  border:1px solid #000;
       }
       .updateimg-button{
         position: absolute;
         right: 100px;
         bottom: 0;
       }
    }
    .add-mini-btn{
      &.el-button--mini, .el-button--mini.is-round {
          padding: 3px 6px;
      }
    }
}
</style>