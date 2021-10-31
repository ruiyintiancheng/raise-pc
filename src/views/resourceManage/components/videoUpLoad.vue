<template>
<!-- 上传视频 -->
    
    <div class="concretization">
        <el-upload
            ref="upload"
            :data="{'a':'1'}"
            action="/user/rwBannerInfo/upload"
            :http-request="sourceUploadRequest"
            v-if="valueFigurat?false:true"
            :show-file-list="false"
            :auto-upload="true">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>

        <div class="videoSty">
          <div class="videoArea">
            <video ref="learnVideo" oncontextmenu="return false;" :autoplay="false"  controls  controlslist="nodownload" name="media" width="100%" height="100%" class="course-video">
                <source :src="this.imgUrl" >
            </video>
          </div>
            <div class="againHandle">
              <el-upload
                class="jxh-btn"
                ref="upload"
                :data="{'a':'1'}"
                v-if="valueFigurat?true:false"
                action="/user/rwBannerInfo/updateLoad"
                :http-request="againUpLoad"
                :show-file-list="false"
                :auto-upload="true">
                <el-button size="small" plain>重选</el-button>
            </el-upload>
            </div>
            
        </div>
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
      console.log('this.imgUrl', this.imgUrl)
    },
    sourceUploadRequest(content) {
      const patt = new RegExp('.*\.(mp4)$')
      if (!patt.test(content.file.name)) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '错误的文件类型,请选择mp4文件上传',
          type: 'error'
        })
        return
      }
      const isLt1M = content.file.size / 1024 / 1024 < 5
      if (!isLt1M) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '文件大小不能超过5M',
          type: 'error'
        })
        return
      }
      const form = new FormData()
      form.append('file', content.file)
      this.$emit('imgLoading', 1)
      baseUpload('/user/rwBannerInfo/upload', form).then((response) => {
        this.fileId = response.data.item.id
        var reader = new FileReader()
        reader.readAsDataURL(content.file)
        reader.onload = e => {
        //   const params = { reader: reader, fileId: response.data.item.fileId }
          this.jxhImage = reader.result
          this.$emit('imgLoading', 0)
          this.$emit('refresh')
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
      const patt = new RegExp('.*\.(mp4)$')
      if (!patt.test(content.file.name)) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '错误的文件类型,请选择mp4文件上传',
          type: 'error'
        })
        return
      }
      const isLt1M = content.file.size / 1024 / 1024 < 5
      if (!isLt1M) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '文件大小不能超过5M',
          type: 'error'
        })
        return
      }
      const form = new FormData()
      form.append('file', content.file)
      this.$emit('imgLoading', 1)
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
          this.$emit('imgLoading', 0)
          this.$emit('refresh')
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
    .videoSty{
      width:800px; 
       height:450px;
      margin-top:20px;
      position: relative;
      .videoArea{
      width:800px; 
       height:450px;
       position: absolute;
         top:0;
         left:0
      }
       .againHandle{
         position: absolute;
         bottom:0;
         right:-80px
       }
    }

}
</style>