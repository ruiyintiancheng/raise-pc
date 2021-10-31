<template>
    <div class="mission">
    <!-- <span class="m-title">使命</span> -->
       <!-- <div class="m-visonex" v-if="visionshow && yuanjing" @click="missionClick">{{yuanjing}}</div> -->
      <div style="margin-top:6px;margin-bottom:20px;position:relative;" >
            <el-input
            :disabled="isPast"
        type="textarea"
        :rows="5"
        ref="mission"
         maxlength="200"
        show-word-limit
        style="width:590px"
        v-model="yuanjing">
        </el-input>
        <!-- <div style=" width: 590px;text-align:right;margin-top:6px;">
            <el-button @click="visionshow=true">取消</el-button>
        </div> -->
        <div style="position:relative;text-align:left;margin-bottom:20px;margin-top:20px;">
            <el-button v-if="!isPast" type="success" @click="prevision" :loading="loading">保存使命</el-button>
        </div>
      </div>
      <!-- <div class="dottedline"></div> -->
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
export default {
  props: {
    visionType: String,
    year: [String, Number]
  },
  computed: {
    isPast() {
      const currentYear = new Date().getFullYear()
      return Number(this.year) < currentYear
    }
  },
  data() {
    return {
      visionshow: true,
      yuanjing: '',
      missionId: '',
      loading: false
    }
  },
  mounted() {
    this.searchOption()
  },
  methods: {
    missionClick() {
      this.visionshow = false
      this.$nextTick(_ => { // 自动获取焦点 element组件autofocus失效
        this.$refs['mission'].focus()
      })
    },
    searchOption() {
      baseRequest('/objective/rwMission/selectByUserId', { viewYear: this.year, missionType: this.visionType }).then(response => {
        if (response.data.item) {
          this.missionId = response.data.item.missionId
          this.yuanjing = response.data.item.missionCont
        }
      })
    },
    prevision() {
      this.visionshow = true
      if (!this.yuanjing) {
        this.$Message.warning('使命不能为空')
        return
      } else {
        this.loading = true
        if (this.missionId) {
          baseRequest('/objective/rwMission/update', { missionId: this.missionId, missionCont: this.yuanjing }).then(response => {
            this.$Message.success('操作成功!')
            this.loading = false
            this.searchOption()
          })
        } else {
          baseRequest('/objective/rwMission/add', { missionType: this.visionType, missionCont: this.yuanjing, viewDate: this.year }).then(response => {
            this.$Message.success('操作成功!')
            this.loading = false
            this.searchOption()
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
.mission{
    margin-top: 20px;
    .m-title{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #222222;
        display: block
    }
    .m-visonex{
        width: 590px;
        // height: 110px;
        min-height: 110px;
        display: inline-block;
        border:1px solid #ccc;
        padding:15px;
        margin-top: 6px;
        border-radius: 5px;
        // overflow-y:scroll;
        // overflow-x:hidden;
        overflow: hidden;
        word-wrap:break-word;
        margin-bottom:20px;
        cursor: pointer;
    }
    .v-submit{
      position: absolute;
      right: 0px;
      bottom: 0px;
    }
}

</style>