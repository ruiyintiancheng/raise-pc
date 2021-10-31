<template>
    <div class="door-box" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
        <div class="scrollbar-box">
          <div class="water-back">
              <img :src="watermark" class="watermark watermark-auto" alt="">
            <p class="door-text-duan">尼采有一句话：“知道为什么而活的人，便能生存。”</p>
            <p class="door-text-duan door-upblank">如果不去想现在和未来是什么关系，那么什么可以使你真正前行？ </p>
            <p class="door-text-duan door-upblank">要想判断哪些事情可以真正造就我们的生活，就必须要知道：</p>
            <p class="door-text-duan door-upblank text-b">我到底要往哪里去？</p>
            <p class="door-text-duan">“人类对生命意义的追求是其主要的动机……这种生命的意义是独特的，因为只是并且只能是由特定的某个人来完成。” —— 心理学家维克多·弗兰克尔</p>
            <p class="door-text-duan door-upblank">人生使命是你独特的人生目的。它描述了你“生存的理由”，你希望一生为什么而活、你希望成为怎样的人、你想在生命中成就怎样的价值？</p>
          </div>
            <p class="door-text-duan door-upblank">请在写下人生使命之前，仔细思考并回答下面的问题： </p>
            <div class="door-qa-box no-margin-t">
                <div class="door-question">● 如果可以任意幻想的话，我最愿意看到自己从事什么样的职业/事？</div>
                <el-input class="door-answer" :disabled="!q121" v-model="formData.q121.answer" maxlength="300" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q121" type="primary" size="small" @click="q121 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q121')">保存</el-button>            
            </div>
            <div class="door-qa-box">
                <div class="door-question">● 如果我所做的某件事一定会取得成功的话，是什么事？（请先定义一下什么叫成功？）</div>
                <el-input class="door-answer" :disabled="!q122" v-model="formData.q122.answer" maxlength="300"  type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q122" type="primary" size="small" @click="q122 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q122')">保存</el-button>   
            </div>
            <div class="door-qa-box">
                <div class="door-question">● 我能带给别人的益处是什么？我认为我做了什么给他人带来益处？</div>
                <el-input class="door-answer" :disabled="!q123" v-model="formData.q123.answer" maxlength="300"  type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q123" type="primary" size="small" @click="q123 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q123')">保存</el-button>   
            </div>
            <div class="door-qa-box">
                <div class="door-question">● 我希望留给家人、朋友或他人的重要遗产是什么？ </div>
                <el-input class="door-answer" :disabled="!q124" v-model="formData.q124.answer" maxlength="300"  type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q124" type="primary" size="small" @click="q124 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q124')">保存</el-button>   
            </div>
            <div class="door-qa-box">
                <div class="door-question">● 我希望被别人缅怀的是什么？ </div>
                <el-input class="door-answer" :disabled="!q125" v-model="formData.q125.answer" maxlength="300"  type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q125" type="primary" size="small" @click="q125 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q125')">保存</el-button>   
            </div>
            <p class="door-text-duan door-upblank">捕捉自己在回答问题背后一致性的理念和原则，它是思考人生使命的开始。</p>
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
    }
  },
  watch: {
  },
  props: {
    courseId: [String, Number]
  },
  data() {
    return {
      watermark,
      formData: {
        q121: {
          id: 121,
          answer: null
        },
        q122: {
          id: 122,
          answer: null
        },
        q123: {
          id: 123,
          answer: null
        },
        q124: {
          id: 124,
          answer: null
        },
        q125: {
          id: 125,
          answer: null
        }
      },
      q121: false,
      q122: false,
      q123: false,
      q124: false,
      q125: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    hasUpdateState() {
      return this.q121 || this.q122 || this.q123 || this.q124 || this.q125
    },
    canGoon() {
      return new Promise((resolve, reject) => {
        baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 7 }).then(response => {
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
    getData() {
      baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 7 }).then(response => {
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
    saveInput(q) {
      const params = { dataAnswer: [this.formData[q]], day: 7 }
      baseRequest('/course/rwReflectionDiary/operationQuestion', params).then(_ => {
        this.$Message.success('操作成功')
        this[q] = false
      })
    }
  }
}
</script>
<style lang="scss">
@import './door.scss';
</style>