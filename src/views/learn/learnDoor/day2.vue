<template>
    <div class="door-box" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
        <div class="scrollbar-box">
          <div class="water-back">
              <img :src="watermark" class="watermark watermark-auto" alt="">
            <p class="door-text-duan door-upblank">弗兰克在《活出生命的意义》一书中说道：“你的生命每天都在拷问着你，不是生命赋予你意义，而是你要赋予你的生命什么意义。”</p>
            <p class="door-text-duan door-upblank">如果真要赋予生命有意义，我们至少先要了解自己真实的生命。</p>
            <p class="door-text-duan door-upblank">尽管灵魂三问到目前为止，还没有什么人类共识的完美答案，但也许可以作为帮助我们探索生命的路径。</p>
            <p class="door-text-duan door-upblank text-b">我从哪里来？</p>
            <p class="door-text-duan">每个人都有“我从哪里来？”的过去，过去成就了你成为今天的你，但未来的你却并不完全取决于你的过去，而是取决于你从今往后每个当下的选择和决定。所以了解这些过去，可以帮助你重新认识自己，从而更有意识地选择和决定未来。</p>
            <p class="door-text-duan door-upblank">我们将从三个方面探寻过去对我们的影响：家庭影响、社会影响、自我认知。</p>
            <p class="door-text-duan door-upblank">对应下面的提问，请尽可能仔细地回忆并详尽地描述出来。</p>
          </div>
            <p class="door-text-duan door-upblank text-b">家庭影响：</p>
            <div class="door-qa-box no-margin-t">
                <div class="door-question">我的父母过着怎样的生活？</div>
                <el-input class="door-answer" :disabled="!q94" maxlength="500" v-model="formData.q94.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q94" type="primary" size="small" @click="q94 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q94')">保存</el-button>
            </div>
            <div class="door-qa-box">
                <div class="door-question">他们认为人生最重要的是：</div>
                <el-input class="door-answer" :disabled="!q95" maxlength="300" v-model="formData.q95.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q95" type="primary" size="small" @click="q95 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q95')">保存</el-button>

            </div>
            <div class="door-qa-box">
                <div class="door-question">他们的梦想是：</div>
                <el-input class="door-answer" :disabled="!q96" maxlength="300" v-model="formData.q96.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q96" type="primary" size="small" @click="q96 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q96')">保存</el-button>
            </div>
            <div class="door-qa-box">
                <div class="door-question">我觉得父母的这些状况对我产生的影响是：</div>
                <el-input class="door-answer" :disabled="!q97" maxlength="500" v-model="formData.q97.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q97" type="primary" size="small" @click="q97 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q97')">保存</el-button>
            </div>
            <p class="door-text-duan door-upblank">我们每个人从出生那天起就已经在相互影响着至少三个人：父亲、母亲和我们自己。无论我们与他们的关系如何，他们都是我们必须要正视的影响者。回望来处，追溯对我们潜移默化的家庭影响，了解自己人生拼图的底色，才能更理解现在的自己。</p>
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
    courseId: [String, Number]
  },
  data() {
    return {
      formData: {
        q94: {
          id: 94,
          answer: null
        },
        q95: {
          id: 95,
          answer: null
        },
        q96: {
          id: 96,
          answer: null
        },
        q97: {
          id: 97,
          answer: null
        }
      },
      q94: false,
      q95: false,
      q96: false,
      q97: false,
      watermark
    }
  },
  created() {
    this.getData()
  },
  methods: {
    hasUpdateState() {
      return this.q94 || this.q95 || this.q96 || this.q97
    },
    canGoon() {
      return new Promise((resolve, reject) => {
        baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 2 }).then(response => {
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
    saveInput(q) {
      const params = { dataAnswer: [this.formData[q]], day: 2 }
      baseRequest('/course/rwReflectionDiary/operationQuestion', params).then(_ => {
        this.$Message.success('操作成功')
        this[q] = false
      })
    },
    getData() {
      baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 2 }).then(response => {
        const dataList = response.data.item.dataList
        for (const iterator of dataList) {
          if (iterator.id === 94) {
            this.formData.q94.answer = iterator.dataAnswer || ''
          } else if (iterator.id === 95) {
            this.formData.q95.answer = iterator.dataAnswer || ''
          } else if (iterator.id === 96) {
            this.formData.q96.answer = iterator.dataAnswer || ''
          } else if (iterator.id === 97) {
            this.formData.q97.answer = iterator.dataAnswer || ''
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import './door.scss';
</style>