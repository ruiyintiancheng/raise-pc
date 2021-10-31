<template>
<!-- 上传图片 -->
    <div class="upLoadzz">
        <div class="img-box" v-if="jxhImage" v-loading="imageLoading">
            <img class="avatar-image"  :src="jxhImage?jxhImage:(baseUrl+valueFigurat)">
            <div class="select">
                    <i class="el-icon-error" @click="dele"></i>
            </div>
        </div>
        <el-upload
            v-loading="imageLoading"
            v-else
            class="avatar-uploader"
            ref="upload"
            :data="{'a':'1'}"
            action="/user/rwCoachApply/upload"
            :http-request="sourceUploadRequest"
            :show-file-list="false"
            :auto-upload="true">
            <span class="avatar-uploader-icon">上传</span>
            <span class="zs">请上传资质证书图片</span>
            </el-upload>
</div>
</template>
<script>
import { baseUpload } from '@/api/base'
export default {
  data() {
    return {
      imageLoading: false,
      jxhImage: '',
      baseUrl: process.env.BASE_API
    }
  },
  methods: {
    dele() {
      this.jxhImage = ''
      this.transfor()
    },
    transfor() {
      this.$emit('remove-fileIds', this.jxhImage)
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
      const isLt5M = content.file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '文件大小不能超过5M',
          type: 'error'
        })
        return
      }
      var form = new FormData()
      form.append('file', content.file)
      this.imageLoading = true

      baseUpload('/user/rwCoachApply/upload', form).then((response) => {
        // this.fileId = response.data.item.fileId
        var reader = new FileReader()
        reader.readAsDataURL(content.file)
        reader.onload = e => {
        //   const params = { reader: reader, fileId: response.data.item.fileId }
          this.jxhImage = reader.result
          this.imageLoading = false
          this.transfor()
          this.$emit('successUpload', response.data.item.fileId)
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
  .upLoadzz{
  .avatar-uploader{
    position: relative;
    width: 420px;
    height: 254px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: block;
    width: 420px;
    height: 254px;
  }
    .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    font-family: PinhFangSC-Regular;
    font-size: 14px;
     width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    background-color: #00afff;
    border-radius: 4px;
    display: block;
  }
  .zs{ position: absolute;
    top:65%;
    left:50%;
    transform: translate(-50%,-50%);
    font-family: PinhFangSC-Regular;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #aaaaaa;
    display: block;
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
         width: 420px;
         height: 254px;
    }
    .select{
        position: absolute;
        right:10px;
        top:0;
        cursor: pointer;
        }
    .jxh-btn{
        position:absolute;
        bottom:0;
        left: 420px;
    }
  }
  }
</style>