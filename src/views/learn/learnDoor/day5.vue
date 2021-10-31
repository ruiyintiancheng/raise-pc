<template>
    <div class="door-box" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
        <div class="scrollbar-box">
          <div class="water-back">
              <img :src="watermark" class="watermark watermark-auto" alt="">
            <p class="door-text-duan">前面回顾了家庭和社会给你带来的影响，以及你对自我生命进程的回顾，这些都汇总形成了今天的你，但就算如此，你真的能清楚的认知：我是谁吗？</p>
            <p class="door-text-duan door-upblank text-b">我是谁？</p>
            <p class="door-text-duan">请注意，对于“我是谁？”的提问，如果不加审视，我们常常可能表达的是：我认为自己是谁，别人认为我是谁，以及我认为我应该是谁。</p>
            <p class="door-text-duan door-upblank">褪去这些认为和应该，真实的我是什么样子？</p>
            <p class="door-text-duan door-upblank">今天没有任何人参与评价，也无需与他人比较，只是真诚完全的感受自己：</p>
            <p class="door-text-duan door-upblank">生活中什么能带给我喜悦？</p>
            <p class="door-text-duan door-upblank">做什么让我感受到真正的快乐？</p>
            <p class="door-text-duan door-upblank">什么是我很容易掌握甚或惊讶于自己怎么能做到？</p>
          </div>
            <div class="door-qa-box">
                <div class="door-question">列出一份所有我喜欢的、擅长做的清单（不要少于二十项）：</div>
                <el-input class="door-answer" :disabled="!q112"  maxlength="300" v-model="formData.q112.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q112" type="primary" size="small" @click="q112 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q112')">保存</el-button>
            </div>
            <div class="door-qa-box">
                <div class="door-question">看着上面的清单，哪些才华被自己埋没了？</div>
                <el-input class="door-answer" :disabled="!q113"  maxlength="300" v-model="formData.q113.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q113" type="primary" size="small" @click="q113 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q113')">保存</el-button>
            </div>
            <p class="door-text-duan door-upblank text-b">小结：</p>
            <p class="door-text-duan">使用一些图画或相片概括出自己认为拥有的才能和特质（切忌与他人比较），并在图片旁标注出所代表的才能和特质。</p>
            <p class="door-text-duan">【举例】</p>
            <div class="door-draw-box clearfix">
                <!-- <div class="door-draw-label">【举例】</div> -->
                <div class="door-draw-img">
                    <img src="https://www.raise-wisdom.com/media/static/day5l.jpg" alt="">
                </div>
            </div>

            <div class="door-tf-box clearfix">
                <text-a-file class="door-tf-item" v-for="(item,index) in imgList" :key="item.id" :imgItem="item" :pid="114" :days="'5'" @getImages="getImages" @deleteImg="deleteImg(index)"></text-a-file>
                <div class="door-tf-item" v-if="imgList.length<5">
                    <el-button style=" margin-top: 251px;margin-left:5px;" type="primary" @click="addImages">添加</el-button>
                </div>
            </div>
            <p class="door-text-duan door-upblank">命运既然给了你某种使命，那也就一定会赋予你可以完成使命的天赋才华和特质。真诚的面对自己，找到那些让你为之兴奋和着迷的事情，就有可能发现拥有独特价值的你。</p>
       </div>
       </el-scrollbar>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import TextAFile from './components/TextAFile'
import watermark from '@/assets/images/watermark.png'
export default {
  components: {
    TextAFile
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
      watermark,
      formData: {
        q112: {
          id: 112,
          answer: null
        },
        q113: {
          id: 113,
          answer: null
        }
      },
      imgList: {},
      q112: false,
      q113: false
    }
  },
  created() {
    this.getData()
    this.getImages()
  },
  methods: {
    hasUpdateState() {
      return this.q112 || this.q113
    },
    canGoon() {
      return new Promise((resolve, reject) => {
        baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 5 }).then(response => {
          const dataList = response.data.item.dataList || []
          const result = dataList.some(item => item.dataAnswer)
          if (result) {
            resolve()
          } else {
            baseRequest('/course/rwReflectionDiary/getInformation', { days: 5, pid: 114 }).then(response => {
              const imgList = response.data.item || []
              if (imgList.length > 0) {
                resolve()
              } else {
                reject()
              }
            })
          }
        })
      })
    },
    getData() {
      baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 5 }).then(response => {
        const dataList = response.data.item.dataList
        for (const iterator of dataList) {
          for (const key in this.formData) {
            if ('q' + iterator.id === key) {
              this.formData[key].answer = iterator.dataAnswer || ''
            }
          }
        }
      })
    },
    getImages() {
      baseRequest('/course/rwReflectionDiary/getInformation', { days: 5, pid: 114 }).then(response => {
        this.imgList = response.data.item || []
        if (this.imgList.length === 0) {
          this.imgList.push({
            add: true,
            id: new Date().getTime(),
            answer: '',
            url: ''
          })
        }
      })
    },
    addImages() {
      this.imgList.push({
        add: true,
        id: new Date().getTime(),
        answer: '',
        url: ''
      })
    },
    saveInput(q) {
      const params = { dataAnswer: [this.formData[q]], day: 5 }
      baseRequest('/course/rwReflectionDiary/operationQuestion', params).then(_ => {
        this.$Message.success('操作成功')
        this[q] = false
      })
    },
    deleteImg(index) {
      this.imgList.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './door.scss';
</style>