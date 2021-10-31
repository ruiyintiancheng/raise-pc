/** 年度重要目标 */
<template>
  <div class="tt-year" style="height:100%;">
    <h4 class="tt-title">年度重要目标</h4>
    <div class="tt-plan">
      <el-button size="mini" type="primary" plain @click="addTarget" v-if="!disable">
        <svg-icon icon-class="icon-add" /> 添加
      </el-button>
      <el-button size="mini" type="primary" @click="addHandle" v-if="!disable">  
        <svg-icon class="icon-add-white" icon-class="icon-shizi" />
        <span class="font">制定规划</span>
      </el-button>
      <el-button size="mini" type="success" plain @click="download" :loading="downLoading">  
        <i class="el-icon-download el-icon--right" />
        <span class="font">下 载</span>
      </el-button>
    </div>
    <div class="b-line" />
    <div  class="i-content">
      <div v-for="(item, i) in options" :key="i" class="tt-table">
      <target-table :ref="'table' + item.valueField" 
        :id="item.valueField" :label="item.valueFieldName" 
        :viewYear="viewYear" 
        :disable="disable" 
        />
      <div v-if="i < options.length - 1" class="line" />
      </div>
      <plan ref="plan" @planCallback="planCallback"></plan>
    </div>
    <target-dialog ref="targetDialog" @refresh="refresh" :options="options" :viewYear="viewYear" />
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { downloadFile } from '@/utils/download'
import { dateInfo } from '@/utils/dateUtil'
import { icon } from '../icon'
import plan from '../Plan'
import targetTable from './targetTable.vue'
import targetDialog from './target-dialog'

export default {
  components: {
    plan,
    targetTable,
    targetDialog
  },
  props: {
    viewYear: [String, Number]
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 255
    },
    disable() {
      return parseInt(this.viewYear) < dateInfo().year
    }
  },
  data() {
    return {
      icon,
      loading: false,
      updateVisible: false,
      fresh: true,
      updateStatus: 0, // 0添加 1修改
      updateId: null,
      options: [],
      downLoading: false
    }
  },
  created() {
    this.searchOption()
  },
  mounted() {},
  methods: {
    searchOption() {
      // 查询领域信息
      baseRequest('/objective/rwValue/selectValOrder', { viewYear: this.viewYear }).then(response => {
        this.options = response.data.item
      })
    },
    addHandle() {
      this.$refs.plan.addHandle(this.viewYear)
    },
    // setPlan(row) {
    //   this.$refs.plan.updateHandle({
    //     paramIds: {
    //       sourceId: row.sourceId,
    //       annualId: row.annualId,
    //       viewDate: this.viewYear,
    //       sourceType: row.sourceType
    //     },
    //     year: this.viewYear,
    //     planId: row.planId,
    //     selectUrl: '/objective/rwAnnual/makePlan',
    //     updateUrl: '/objective/rwGoalPlan/update'
    //   })
    // },
    addTarget() {
      this.$refs.targetDialog.openDialog()
    },
    refresh(annualField) {
      const ref = 'table' + annualField
      this.$refs[ref][0].refresh()
    },
    download() {
      const param = {
        viewYear: this.viewYear
      }
      this.downLoading = true
      downloadFile('/objective/rwAnnual/exportExcel', param)
        .finally(_ => {
          this.downLoading = false
        })
    },
    planCallback() {
      // this.fresh = false
      // this.fresh = true
      // this.searchOption()
    }
  }
}
</script>
<style lang="scss" scoped>
.tt-year{
    position: relative;
    padding:0 0px;
    .tt-title{
        height: 66px;
        line-height: 66px;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        font-weight: bold;
        padding-left: 24px;
    }

    .tt-plan {
      position: absolute;
      top: 19px;
      right: 24px;
    }

    .line {
      display: block;
      height: 0;
      margin: 24px 20px;
      border-top: 1px dashed #aaaaaa;
    }
    .b-line {
      display: block;
      height: 0;
      margin: 0 -24px;
      border-top: 1px solid #cccccc;
    }

    .i-content{
      height:calc(100% - 66px);
      overflow:auto;
      padding:10px 24px 24px;
    }
}
</style>