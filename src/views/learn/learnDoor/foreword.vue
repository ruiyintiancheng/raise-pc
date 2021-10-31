<template>
    <!-- 提示页面 -->
    <div class="door-box" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
        <div class="scrollbar-box">
          <img :src="watermark" class="watermark" alt="">
            <p class="door-text-duan">每个人的一生都不是一马平川的，在某个时刻或某些阶段，你会感到很强的无力感，对未来充满了未知和迷茫，就像是一艘行驶于海上的船只，突然失去了前进的动力和方向。</p>
            <p class="door-text-duan door-upblank">在那一刻，当你感到迷茫、焦虑，对未来没有方向时，你是否这样问过自己： </p>
            <p class="door-text-duan door-intent15">我想成为什么样的人？</p>
            <p class="door-text-duan door-intent15">哪些事对我来说是有意义的？</p>
            <p class="door-text-duan door-intent15">我恪守的价值观是什么？</p>
            <p class="door-text-duan door-upblank">明确自己想要成为的样子，清晰未来想要成就的方向、找到值得自己历尽漫漫人生去坚守的价值，才能不被裹挟，才能内心笃定、坚定前行。但明确和清晰并不容易，需要一套有效的方法，帮助我们梳理清楚并找到最本真的初心。因为仅凭过往的人生经历和决策本能，就很可能失之毫厘谬以千里，距离我们想要实现的越来越远。</p>
            <p class="door-text-duan door-upblank">“探索之门”项目帮助你开辟出一条清晰的探索路径，通过内含哲学思维的提问，启发你对过去、对未来、对人生的思考，循序渐进地支持你探寻出自己生命的意义，并找到可以持续向前的内在动力。</p>
            <p class="door-text-duan door-upblank">这不是一次知识的学习之旅，而是一段自我体悟的经历，请每天花一点专注的时间给自己，在每一个提问下记录自己的回忆、想法、思考，甚或只是点滴的思绪，让每一个提问都只有完全属于你自己的回应。</p>
            <p class="door-text-duan door-upblank">这里没有固定答案，但请相信这条路径，并请相信你自己。真诚地记录这条路径中一切的发生，将帮助你看见自己。</p>
       </div>
       </el-scrollbar>
    </div>
</template>
<script>
import watermark from '@/assets/images/watermark.png'
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
  },
  data() {
    return {
      watermark
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
    },
    canGoon() {
      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  }
}
</script>
<style lang="scss">
@import './door.scss';
</style>