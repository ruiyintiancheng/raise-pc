<template>
    <div class="door-box" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
        <div class="scrollbar-box">
            <!-- <img :src="watermark" class="watermark" alt=""> -->
            <div class="water-back">
              <img :src="watermark" class="watermark watermark-auto" alt="">
              <p class="door-text-duan">苏格兰著名的神学家威廉·巴克利（William Barclay）说：人的一生有两个伟大的日子，我们出生的那一天，以及发现自己为什么而活的那一天。</p>
              <p class="door-text-duan door-upblank">我们自己无法决定出生的那一天，但可以发现为什么而活的这一天。这一天也许已经在你心里，也许你还并不是很确定，甚至有些人还会有些疑惑：为什么我需要知道？</p>
              <p class="door-text-duan door-upblank">从古至今，人类似乎始终无法满足于只是活着，而是想要知道更多，想要找到（哪怕一点）人活着的目的和意义。如果没有目的，人们常常无法感受到心灵真正的满足。这也是为什么灵魂三问亘古不变地萦绕在人们心里：我是谁？我从哪里来？我要往哪里去？</p>
              <p class="door-text-duan door-upblank">艾伯特·史怀哲博士曾经说过：“成功不是幸福的秘诀，幸福才是成功的秘诀。如果你热爱自己所做的事，那么你将会成功。”请认真思考以下的问题，多给自己一点时间，不要太快给出答案。</p>
            </div>
            <div class="door-qa-box">
                <div class="door-question">我幸福吗？我因为什么而幸福？</div>
                <el-input class="door-answer" :disabled="!q91" maxlength="300" v-model="formData.q91.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q91" type="primary" size="small" @click="q91 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q91')">保存</el-button>
            </div>
            <div class="door-qa-box">
                <div class="door-question">我现在的生活是否反映出自己的价值和意义？为什么是或不是？</div>
                <el-input class="door-answer" :disabled="!q92"  maxlength="300" v-model="formData.q92.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q92" type="primary" size="small" @click="q92 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q92')">保存</el-button>
            </div>
            <div class="water-back">
              <img :src="watermark" class="watermark watermark-auto" alt="">
            <p class="door-text-duan door-upblank">当然你也许还想问什么是价值和意义？稻盛和夫曾经在采访中说道：“人生最重要的事，是意识到自己降临世间的使命与价值。人稀里糊涂地接受自己当下的存在，这是最不可取的。大家降生到这个世界上， 是有某种目的的，是有使命的。所以神灵才让各位来到世上，对这一点大家必须要有这样的觉悟。所以当有人问我：“人为什么来到这个世上？”时，我会毫不犹豫地、毫不夸耀地回答： 是为了比出生时有一点点的进步，或者说是为了带着更美一点、更崇高一点的灵魂死去。”</p>
            </div>
            <div class="door-qa-box">
                <div class="door-question">如果你被问到这个问题：“人为什么来到这个世上？”你会如何回答？</div>
                <el-input class="door-answer" :disabled="!q93"  maxlength="300" v-model="formData.q93.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q93" type="primary" size="small" @click="q93 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q93')">保存</el-button>
            </div>
            <p class="door-text-duan door-upblank" v-if="isShiyong">对上面的提问如果你还无法很确认、很清晰地回答，也许是时候开始一段完全属于你自己的探索旅程，欢迎进入探索之门=> <el-button @click="intoBuyPage()" type="primary" size="mini">立即购买</el-button></p>
       </div>
       </el-scrollbar>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import watermark from '@/assets/images/watermark.png'
export default {
  components: {
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    },
    canContinue() {
      let boo = false
      for (const key in this.formData) {
        if (this.formData[key].answer) {
          boo = true
        }
      }
      return boo
    }
  },
  watch: {
  },
  props: {
    isShiyong: Boolean
  },
  data() {
    return {
      formData: {
        q91: {
          id: 91,
          answer: null
        },
        q92: {
          id: 92,
          answer: null
        },
        q93: {
          id: 93,
          answer: null
        }
      },
      formBtns: {},
      q91: false,
      q92: false,
      q93: false,
      watermark
    }
  },
  created() {
    this.getData()
  },
  methods: {
    canGoon() {
      return new Promise((resolve, reject) => {
        baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 1 }).then(response => {
          const dataList = response.data.item.dataList || []
          const result = dataList.some(item => item.dataAnswer)
          if (result) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    hasUpdateState() {
      return this.q91 || this.q92 || this.q93
    },
    saveInput(q) {
      const params = { dataAnswer: [this.formData[q]], day: 1 }
      baseRequest('/course/rwReflectionDiary/operationQuestion', params).then(_ => {
        this.$Message.success('操作成功')
        this[q] = false
      })
    },
    getData() {
      baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 1 }).then(response => {
        const dataList = response.data.item.dataList
        for (const iterator of dataList) {
          if (iterator.id === 91) {
            this.formData.q91.answer = iterator.dataAnswer || ''
          } else if (iterator.id === 92) {
            this.formData.q92.answer = iterator.dataAnswer || ''
          } else if (iterator.id === 93) {
            this.formData.q93.answer = iterator.dataAnswer || ''
          }
        }
      })
    },
    intoBuyPage() {
      this.$router.push({
        name: 'exploredoor'
      })
    }
  }
}
</script>
<style lang="scss">
@import './door.scss';
</style>