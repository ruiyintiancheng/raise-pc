<template>
    <div class="homeConfig" v-if="isRefresh" :style="{minHeight:tableHight + 'px'}">
        <div style="display:flex;justify-content:flex-end;margin-bottom:10px">
            <el-button @click="createdDiv" icon="el-icon-circle-plus-outline" type="primary">添加图片</el-button>
        </div>
          <upLoad v-for="(item,index) in listImage" :key="index" style="margin-bottom:20px" :skipUrl="item.skipUrl" :imgUrl="item.url" :index="index" :urlId="item.id" :orderId="item.orderId" @refresh="refresh" :imgList="listImage"></upLoad>
    </div>
</template>

<script>
import upLoad from '../components/index'
import { baseRequest } from '@/api/base'
export default {
  components: {
    upLoad
  },
  data() {
    return {
      listImage: [],
      isRefresh: true
    }
  },
  mounted() {
    this.selectOpation()
  },
  computed: {
    tableHight() {
      // eslint-disable-next-line no-irregular-whitespace
      return this.$store.state.app.containHeight - 158
    }
  },
  methods: {
    refresh() {
      this.isRefresh = false
      this.selectOpation()
    },
    createdDiv() {
      if (this.listImage.length < 5) {
        if (this.listImage.length === 0 || this.listImage[this.listImage.length - 1].url) {
          this.listImage.push({})
        } else {
          this.$Message({
            message: '有未上传的文件，请先上传！',
            type: 'error'
          })
        }
      } else {
        this.$Message({
          message: '上传图片总数不可大于5',
          type: 'error'
        })
      }
    },
    // 请求数据
    selectOpation() {
      // 链接接口
      baseRequest('/user/rwBannerInfo/select').then((response) => {
        this.listImage = response.data.item.listImage
        this.isRefresh = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.homeConfig{
    width: 1440px;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    padding: 24px;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 50px;
     border-radius: 0px 10px 10px 10px;
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
    .bannerList{
        width:1200px;
        border:1px solid #aaaaaa;
         .avatar-image{
        display: block;
        width: 360px;
        height: 240px;
    }
    }
}
</style>