<template>
<!-- 上传图片 -->
    <div class="concretization">
       <div>
        <div class="img-box" v-if="fileId" v-loading="imageLoading">
            <!-- <img class="avatar-image"  :src="jxhImage?jxhImage:(baseUrl+valueFigurat)"> -->
            <div class="avatar-image">证书id为 {{ fileId}}</div>
        </div>
        <el-upload
            v-loading="imageLoading"
            v-else
            class="avatar-uploader"
            ref="upload"
            :data="{'a':'1'}"
            action="/rwFile/upload"
            :http-request="sourceUploadRequest"
            :show-file-list="false"
            :auto-upload="true">
            <i class="avatar-uploader-icon">上传</i>
            <div class="pic">图片或PDF文件</div>
            </el-upload>
            </div>
            <div style="margin:0 14px">
        <div class="img-box" v-if="fileId1" v-loading="imageLoading">
            <!-- <img class="avatar-image"  :src="jxhImage?jxhImage:(baseUrl+valueFigurat)"> -->
             <div class="avatar-image">证书id为 {{fileId1}}</div>
        </div>
            </div>
</div>
</template>
<script>
import { baseUpload } from '@/api/base'
export default {
  props: {
    valueFigurat: String
  },
  data() {
    return {
      imageLoading: false,
      jxhImage: '',
      baseUrl: process.env.BASE_API,
      fileId: '',
      fileId1: '',
      fileId2: ''
    }
  },
  methods: {
    sourceUploadRequest(content) {
      const patt = new RegExp('.*\.(jpg|jpeg|png|JPG|JPEG|PNG|PDF)$')
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

      baseUpload('/user/rwCoachApply/upload', this.file).then((response) => {
        this.fileId = response.data.item.fileId
        var reader = new FileReader()
        reader.readAsDataURL(content.file)
        reader.onload = e => {
        //   const params = { reader: reader, fileId: response.data.item.fileId }
          this.jxhImage = reader.result
          this.imageLoading = false
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
<style lang="scss">
.concretization{
  float: left;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: block;
    width: 104px;
    height:92px;
  }
    .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 12px;
    color: #fff;
    width: 40px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #00afff;
    border-radius: 4px;
    position: absolute;
    top:24px;
    left:32px
  }
  .pic{
    font-size: 12px;
    color: #aaaaaa;
    width: 85px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    position: absolute;
    top:39px;
    left:10px;
    margin-top:12px
  }
  .img-box{
      position: relative;
        width: 104px;
        height: 92px;
        // border:1px solid #aaaaaa;
    .avatar-image{
        display: block;
       position: absolute;
       width:104px;
       height:30px;
       top:30%;
       left:0;

       text-align: center;
    }
    .jxh-btn{
        position:absolute;
        bottom:0;
        left: 380px;
    }
  }
  
</style>