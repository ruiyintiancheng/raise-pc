<template>
    <!-- 提示页面 -->
    <div class="learn-tip" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
         <div class="tip-img-box">
           <img src="./components/meetingContent/images/pic4.png" alt="">
         </div>
         <template v-if="isEx">
           <h4 class="tip-text">为学员开放开启目标规划·SP</h4>
         </template>
         <template v-else>
          <h4 class="tip-text">恭喜你！ 系统已为你开启目标规划·SP</h4>
          <a class="redirect-text" @click="$router.push({name:'targetTool'})">点击此处进入目标规划·SP</a>
          <p class="tip-second">请注意：目标规划·SP与First Step是两个系统，如需返回First Step学习系统、请重新点击“学员项目”进入学习。</p>
         </template>
       </el-scrollbar>
    </div>
</template>
<script>
// import { baseRequest } from '@/api/base'
export default {
  components: {
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    }
  },
  watch: {
  },
  props: {
    courseId: [String, Number],
    flowNodeNo: [String, Number],
    isNewest: Boolean,
    isEx: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
    }
  }
}
</script>
<style lang="scss">
.learn-tip{
    position: relative;
    padding:30px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #222222;
    background-color: #fcfcfc;
    border-radius: 10px;
    border: solid 1px #dddddd;
    overflow: auto;
    .tip-img-box{
      margin:80px auto 25px;
      width: 192px;
      height: 140px;
    }
    .tip-text{
      text-align: center;
      font-size: 16px;
      margin-bottom: 6px;
    }
    .redirect-text{
      font-size: 14px;
      color: #00afff;
      display: block;
      text-align: center;
      text-decoration: underline;
    }
    .tip-second{
      font-size: 14px;
      color: #F56C6C;
      text-align: center;
      margin-top: 10px;
    }
    .tip-video-box{
      margin-top:30px;
      .tip-video{
        float: left;
        margin-right: 15px;;
      }
    }
}
</style>