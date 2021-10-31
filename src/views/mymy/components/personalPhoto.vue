<template>
<!-- 上传图片 -->
<div  style="width:128px;height:128px;border-radius:10px;border:1px solid #dddddd;padding:8px;">
    <div class="Qrcode">
        <div class="img-box" v-loading="imageLoading">
            <img  v-if="jxhImage" class="avatar-image"  :src="jxhImage">
            <div v-else class="text-tip">请上传照片</div>
        </div>
        <div class="codeUplod">
          <el-upload
            v-loading="imageLoading"
            :before-upload="beforeAvatarUpload"
            :on-change="getFile"
            class="avatar-uploader"
            ref="upload"
            action=""
            :show-file-list="false"
            :auto-upload="false">
            <div class="select"> 
              <el-button class="btn" size="mini" type="primary">{{jxhImage?"重新上传":"上传"}}</el-button>
            </div>
            </el-upload> 
        </div>
        
    </div>
            
</div>
</template>
<script>
import { baseRequest } from '@/api/base'
export default {
  data() {
    return {
      imageUrl: '',
      base64Code: '',
      coachQrCode: '',
      imageLoading: false,
      jxhImage: '',
      baseUrl: process.env.BASE_API
    }
  },
  created() {
    this.getQrCode()
  },
  methods: {
    beforeAvatarUpload(file) {
      const patt = new RegExp('.*\.(jpg|jpeg|png|JPG|JPEG|PNG)$')
      const isLt2M = file.size / 1024 / 1024 < 0.4

      if (!patt.test(file.name)) {
        this.$Message.warning('上传图片只能是 jpeg jpg png格式!')
      }
      if (!isLt2M) {
        this.$Message.warning('上传图片大小不能超过 400KB!')
      }
      return patt.test(file.name) && isLt2M
    },
    // saveHadle() {
    //   this.jxhImage = ''
    //   const param = {

    //     coachQrCode: this.jxhImage
    //   }
    //   baseRequest('/user/rwUser/completeInfo', param).then((response) => {
    //     this.getQrCode()
    //   })
    // },
    getQrCode() {
      baseRequest('/user/rwUser/getPersonalUserInfo').then((response) => {
        // this.base64Code = response.data.item
        // this.jxhImage = ''
        this.jxhImage = response.data.item.userPhoto
      })
    },
    getFile(file) {
      if (!this.beforeAvatarUpload(file)) {
        return
      }
      var This = this
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function() {
        // this.result // base64编码
        This.jxhImage = this.result
        // This.imageUrl = this.result.substring(23)
        const param = {
          userPhoto: this.result
        }
        baseRequest('/user/rwUser/completeInfo', param).then((response) => {
        // this.base64Code = response.data.item
          this.$Message.success('上传成功')
          This.getQrCode()
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Qrcode{
  position: relative;
  .text-tip{
    color: #409EFF;
    text-align: center;
    height: 110px;
    line-height: 110px;
  }
  .codeUplod{
    position: absolute;
    right:-120px;
    top:0;
    .btn{
      padding:3px;
      position: absolute;
      bottom:0;
      left:2px
    }
  }
  .avatar-uploader{
    width: 110px;
    height: 110px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: block;
    width: 110px;
    height: 110px;
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
    font-size: 10px;
     width: 45px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #ffffff;
    background-color: #00afff;
    border-radius: 4px;
    display: block;
  }
  .avatar {
    width: 110px;
    height: 110px;
    display: block;
  }
  .img-box{
      position: relative; 
      width: 110px;
        height: 110px;
        .saveBtn{
          position: absolute;
          bottom:0;
          right: -80px;
        }
    .avatar-image{
     
        display: block;
        width: 110px;
        height: 110px;
    }
    .select{
        position: absolute;
        right:0;
        top:-8px;
        cursor: pointer;
        }
   
  }
  }
</style>
