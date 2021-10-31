<template>
    <div class="videoConfig" v-if="isRefresh" v-loading="imageLoading===0?false:true"  :style="{minHeight:tableHight + 'px'}">
          <videoUpLoad @imgLoading="imgLoading" :valueFigurat="listVideo.length>0?listVideo[0].url:null" :urlId="listVideo.length>0?listVideo[0].id:null" @refresh="refresh"></videoUpLoad>
    </div>
</template>

<script>
import videoUpLoad from '../components/videoUpLoad'
import { baseRequest } from '@/api/base'
export default {
  components: {
    videoUpLoad
  },
  data() {
    return {
      listVideo: [],
      isRefresh: false,
      imageLoading: 0
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
    imgLoading(param) {
      this.imageLoading = param
    },
    // 请求数据
    selectOpation() {
      // 链接接口
      baseRequest('/user/rwBannerInfo/select').then((response) => {
        this.listVideo = response.data.item.listVideo
        this.isRefresh = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.videoConfig{
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
}
</style>