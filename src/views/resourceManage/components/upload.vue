<template>
<!-- 上传图片 -->
    
    <div class="concretization">
        <div class="img-box" v-if="urlSubstring || jxhImage" v-loading="imageLoading">
            <img class="avatar-image"  :src="jxhImage?jxhImage:imgUrl">
            <el-upload
            v-if="!disabled"
                class="jxh-btn"
                ref="upload"
                :data="{'a':'1'}"
                action="/user/rwBannerInfo/updateLoad"
                :http-request="againUpLoad"
                :show-file-list="false"
                :auto-upload="true">
                <el-button size="small" plain>重选</el-button>
            </el-upload>
        </div>
        <el-upload
            v-loading="imageLoading"
            v-else-if="!disabled"
            class="avatar-uploader"
            ref="upload"
            :data="{'a':'1'}"
            action="/user/rwBannerInfo/upload"
            :http-request="sourceUploadRequest"
            :show-file-list="false"
            :auto-upload="true">
            <i  class="el-icon-upload avatar-uploader-icon">点击上传</i>
            </el-upload>
</div>
</template>
<script>
import { baseUpload } from '@/api/base'
export default {
  props: {
    valueFigurat: String,
    disabled: {
      type: Boolean,
      default: false
    },
    urlId: {
      type: Number
    }
  },
  data() {
    return {
      imageLoading: false,
      jxhImage: '',
      baseUrl: '',
      imgUrl: '',
      urlSubstring: '',
      selectStates: '',
      fileId: ''
    }
  },
  mounted() {
    this.disposeUrl()
  },
  methods: {
    // 处理图片url
    disposeUrl() {
      if (process.env.BASE_API === 'http://www.fascte.cn:9202/') {
        // 测试
        this.baseUrl = 'http://www.fascte.cn:9201'
      } else {
        // 生产
        this.baseUrl = 'https://www.raise-wisdom.com/'
      }
      this.urlSubstring = this.valueFigurat.substring(this.valueFigurat.indexOf('T') + 1)
      this.imgUrl = this.baseUrl + '/' + this.valueFigurat.split('/')[6] + '/' + this.valueFigurat.split('/')[7] + '/' + this.valueFigurat.split('/')[8]
    },
    sourceUploadRequest(content) {
      const patt = new RegExp('.*\.(jpg|jpeg|png|JPG|JPEG|PNG)$')
      if (!patt.test(content.file.name)) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '错误的文件类型,请选择jpg/jpeg/png文件上传',
          type: 'error'
        })
        return
      }
      const isLt1M = content.file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '文件大小不能超过1M',
          type: 'error'
        })
        return
      }
      const form = new FormData()
      form.append('file', content.file)
      this.imageLoading = true
      baseUpload('/user/rwBannerInfo/upload', form).then((response) => {
        this.fileId = response.data.item.id
        var reader = new FileReader()
        reader.readAsDataURL(content.file)
        reader.onload = e => {
        //   const params = { reader: reader, fileId: response.data.item.fileId }
          this.jxhImage = reader.result
          this.imageLoading = false
          this.$emit('successUpload', response.data.item.id)
        }
      }, _ => {
        this.$refs.upload.clearFiles()
        this.imageLoading = false
        this.$Message({
          showClose: true,
          message: '上传失败',
          type: 'error'
        })
      })
    },
    againUpLoad(content) {
      const patt = new RegExp('.*\.(jpg|jpeg|png|JPG|JPEG|PNG)$')
      if (!patt.test(content.file.name)) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '错误的文件类型,请选择jpg/jpeg/png文件上传',
          type: 'error'
        })
        return
      }
      const isLt1M = content.file.size / 1024 / 1024 < 0.5
      if (!isLt1M) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '文件大小不能超过500kb',
          type: 'error'
        })
        return
      }
      const form = new FormData()
      form.append('file', content.file)
      this.imageLoading = true
      const imgId = this.fileId ? this.fileId : this.urlId
      const againUrl = '/user/rwBannerInfo/updateLoad' + '/' + imgId
      console.log('againUrl', againUrl)
      baseUpload(againUrl, form).then((response) => {
        this.fileId = response.data.item.id
        var reader = new FileReader()
        reader.readAsDataURL(content.file)
        reader.onload = e => {
        //   const params = { reader: reader, fileId: response.data.item.fileId }
          this.jxhImage = reader.result
          this.imageLoading = false
          this.$emit('successUpload', response.data.item.id)
        }
      }, _ => {
        this.$refs.upload.clearFiles()
        this.imageLoading = false
        this.$Message({
          showClose: true,
          message: '上传失败',
          type: 'error'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.concretization{
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: block;
    width: 360px;
  }
    .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 360px;
    height: 240px;
    line-height: 240px;
    text-align: center;
    color: #409EFF;
  }
  .avatar {
    width: 360px;
    height: 240px;
    display: block;
  }
  .img-box{
      position: relative;
    .avatar-image{
        display: block;
        width: 360px;
        height: 240px;
    }
    .jxh-btn{
        position:absolute;
        bottom:0;
        left: 380px;
    }
  }
}
</style>