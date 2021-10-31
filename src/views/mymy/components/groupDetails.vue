<template>
  <el-dialog
    id="groupDetails"
    title="拼团详情"
    :visible.sync="groupdialog"
    v-if="groupdialog"
    width="350px"
    top="15vh"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <div class="box-middle">
      <vue-qr class="vueqr" :logoSrc="config.imagePath"  :text="codeValue"   :size="250"  ></vue-qr>
      <div><el-link type="danger" :underline="false" style="margin-left:94px;" @click="handleClipboard(codeValue, $event)" >点击复制拼团链接</el-link></div>
    </div>
  </el-dialog>
</template>
<script>

import VueQr from 'vue-qr'
import clipboard from '@/utils/clipboard'
export default {
  props: ['groupId', 'productName'],
  components: { VueQr },
  data() {
    return {
      groupdialog: false,
      codeValue: '',
      config: {
        imagePath: ''
      }
    }
  },
  created() {

  },
  methods: {
    vueqrdig() {
      // eslint-disable-next-line no-irregular-whitespace
      let url = window.location.origin + window.location.pathname
      // eslint-disable-next-line no-irregular-whitespace
      url = url.replace(/mymy/, '')
      url += `course/firstStep/buy/1?type=group&name=${'First Step'}&groupId=${this.groupId}`
      this.codeValue = url
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style lang="scss" >
#groupDetails .el-dialog {
  border-radius: 10px;
  background-color: #f3f3f3;
  .el-dialog__header {
    height: 52px;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    border-radius: 10px;
    color: #222222;
    .el-dialog__headerbtn {
      position: absolute;
      height: 20px;
      width: 20px;
      top: 20px;
      right: 21px;
      padding: 0;
      background: #222222;
      border: none;
      outline: 0;
      cursor: pointer;
      font-size: 16px;
      border-radius: 50%;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #ffffff;
    }
  }

  .box-middle {
    height: 300px;
    .el-form-item__label {
      font-size: 16px;
      // height: 250px;
    }
    width: 100%;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px 20px 20px 20px;
     .vueqr{
         margin-left:28px;
     }
  }
  .button-box {
    width: 184px;
    height: 37.5px;
    margin-left: 205px;
    margin-top: 21px;
    .Refused {
      float: left;
    }
    .through {
      float: right;
    }
  }
}
</style>