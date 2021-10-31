<template>
    <div class="intro">
            <el-form ref="form" :model="form" label-width="80px">
                <el-input type="textarea" 
                v-model="form.coachIntro"  
                placeholder="请输入内容" 
                :rows=4
                maxlength="100" 
                show-word-limit>
                </el-input>
            </el-form>
    </div>
</template>

<script>
import { baseRequest } from '@/api/base'
export default {
  props: {
    coachIntro: String
  },
  created() {
    this.form.coachIntro = this.coachIntro
  },
  data() {
    return {
      form: {
        coachIntro: ''
      },
      msg: ''
    }
  },

  methods: {
    introSubmit(callback) {
      const param = {
        coachIntro: this.form.coachIntro
      }
      baseRequest('/user/rwCoach/updateInfo', param).then(response => {
        this.msg = response.data.item.msg
        callback && callback()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>