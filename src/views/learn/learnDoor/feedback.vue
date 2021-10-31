<template>
    <!-- 提示页面 -->
    <div class="door-box" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
        <div class="scrollbar-box">
            <div class="door-qa-box">
                <div class="door-question">我的学习收获:</div>
                <el-input class="door-answer" :disabled="disabled" style="width:100%;" maxlength="500" v-model="formData.q137.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
            </div>
            <div class="door-qa-box">
                <div class="door-question">我的几点建议:</div>
                <el-input class="door-answer" :disabled="disabled"  style="width:100%;" maxlength="500" v-model="formData.q138.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
            </div>
            <div class="door-qa-box" v-if="manager">
                <div class="door-question">教练回复:</div>
                <el-input class="door-answer" disabled style="width:100%;" maxlength="500" v-model="manager" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
            </div>
            <div style="margin-top:20px;text-align:right;" v-if="!disabled"> 
                <el-button type="success" @click="submmit">提交</el-button>
            </div>
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
      disabled: false,
      formData: {
        q137: {
          id: 137,
          answer: null
        },
        q138: {
          id: 138,
          answer: null
        }
      },
      manager: null
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      baseRequest('/course/rwProductFeedback/selectAll', { stuId: null }).then(response => {
        const stu = response.data.item.stu
        const manager = response.data.item.manager
        if (stu && stu['137'] && stu['137'].answer) {
          this.formData.q137.answer = stu['137'].answer
          this.disabled = true
        }
        if (stu && stu['138'] && stu['138'].answer) {
          this.formData.q138.answer = stu['138'].answer
          this.disabled = true
        }
        if (manager && manager['140'] && manager['140'].answer) {
          this.manager = manager['140'].answer
        }
      })
    },
    submmit() {
      const params = {
        type: '0',
        stuId: null,
        dataAnswer: [
          {
            'id': 137,
            'answer': this.formData.q137.answer
          },
          {
            'id': 138,
            'answer': this.formData.q138.answer
          }
        ]
      }
      baseRequest('/course/rwProductFeedback/operationQuestion', params).then(_ => {
        this.$Message.success('谢谢您的反馈！')
        this.getData()
      })
    }
  }
}
</script>
<style lang="scss">
@import './door.scss';
</style>