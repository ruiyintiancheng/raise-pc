<template>
    <div class="text-a-file">
        <div class="tf-head">
            <div class="tf-upload-box">
            <div class="img-box" >
                <img class="avatar-image" v-if="imgItem.url" :src="baseUrl + imgItem.url.split('/ROOT/')[1]">
            </div>
                <el-upload
                    v-if="!imgItem.url"
                    v-loading="imageLoading"
                    class="avatar-uploader"
                    ref="upload"
                    :data="{'a':'1'}"
                    action="/rwFile/upload"
                    :http-request="sourceUploadRequest"
                    :show-file-list="false"
                    :auto-upload="true">
                    <i  class="el-icon-upload avatar-uploader-icon">上传具象化图片</i>
                </el-upload>
            </div>
        </div>
        <i class="tf-delete-btn el-icon-close" title="删除" @click="deleteData"></i>
    </div>
</template>
<script>
import { baseUpload, baseRequest } from '@/api/base'
export default {
  props: {
    imgItem: Object,
    days: String,
    pid: [String, Number]
  },
  data() {
    return {
      imageLoading: false
    }
  },
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
  methods: {
    deleteData() {
      if (this.imgItem.add) {
        this.$emit('deleteImg')
        return
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/course/rwReflectionDiary/delete', { id: this.imgItem.id }).then(_ => {
          this.$Message.success('操作成功')
          this.$emit('getImages')
        })
      })
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
      var form = new FormData()
      form.append('file', content.file)
      this.imageLoading = true
      let url = ''
      if (this.imgItem.add) {
        url = `/course/rwReflectionDiary/fileUpload/${this.days}/${this.pid}`
      } else {
        url = `/course/rwReflectionDiary/updateLoad/${this.imgItem.id}`
      }
      baseUpload(url, form).then((response) => {
        this.$Message.success('操作成功')
        this.$emit('getImages')
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
.text-a-file{
    width: 100%;
    // height: 290px;
    border:1px solid #ddd;
    border-radius: 5px;
    position: relative;
    .tf-delete-btn{
        position: absolute;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        overflow: hidden;
        background: #cccccc;
        color: #ffffff;
        text-align: center;
        font-size: 18px;
        padding-top: 4px;
        cursor: pointer;
        top: -8px;
        right: -8px;
        &:hover{
            background: #F56C6C;
        }
    }
    .tf-head{
        padding-top:11px;
        text-align: center;
    }
    .tf-upload-box{
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
            line-height: 192px;
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
            margin-top:12px;
            .avatar-image{
                height: 220px;
                max-width: 100%;
            }
            // .jxh-btn{
            //     position:absolute;
            //     bottom:0;
            //     left: 380px;
            // }
        }
    }
}
</style>