/** 月计划-月度计划 */
<template>
  <div class="tt-plan">
    <el-button class="download" size="mini" type="success" plain @click="download" :loading="downLoading">  
      <i class="el-icon-download el-icon--right" />
      <span class="font">下 载</span>
    </el-button>
    <div>
      <div class="tt-title txt-white">使命</div>
      <div v-if="editVisible" class="tt-input">
        <el-input v-model="mission_" :autosize="{ minRows: 4}" type="textarea" placeholder="请输入内容"></el-input>
        <div class="btn-group">
          <el-button class="btn btn-clear txt-blue-reg-16" @click="saveMission(false)">取消</el-button>
          <el-button class="btn btn-save txt-white-reg-16" @click="saveMission(true)">保存</el-button>
        </div>
      </div>
      <div v-else class="tt-mission txt-black txt-reg-16"
        @click="editVisible = !disable">
        {{mission.monthlyMission}}
      </div>
      <div class="line line-dashed"></div>
    </div>
    <div>
      <div class="tt-title txt-white">月个人焦点目标</div>
      <div class="tt-table" v-for="item in person" :key="item.valueField">
        <targetTable :ref="`contType-${item.valueField}`" 
                  @refresh="refresh"  
                  :viewMonth="viewMonth"
                  :monthlyId="mission.monthlyId" 
                  :contType="item.codeType" 
                  :fieldCode="item.valueField"
                  :label="item.valueFieldName"
                  :disable="disable"
                  formLabel="月个人焦点目标">
        </targetTable>
      </div>
      <div class="line line-dashed" />
    </div>
    <div>
      <div class="tt-title txt-white">月工作焦点目标</div>
      <div v-for="item in company" :key="item.valueField">
        <targetTable :ref="`contType-${item.valueField}`" 
                  @refresh="refresh"
                  :viewMonth="viewMonth"
                  :monthlyId="mission.monthlyId" 
                  :contType="item.codeType" 
                  :fieldCode="item.valueField"
                  :label="item.valueFieldName"
                  :disable="disable"
                  formLabel="月工作焦点目标">
        </targetTable>
      </div>
      <div class="line line-dashed" />
    </div>
    <div>
      <div class="tt-title txt-white">月首要目标</div>
        <firstTable ref='first' @refresh="refresh" label="目标" 
          :viewMonth="viewMonth"
          :disable="disable" />
      <div class="line line-dashed" />
    </div>
    <div>
      <div class="tt-title txt-white">高回报活动事项</div>
      <ghbTable :monthlyId="mission.monthlyId" 
                :contType="2"
                label="事项"
                :viewMonth="viewMonth" 
                :disable="disable" />
      <div class="line line-dashed" />
    </div>
    <div>
      <div class="tt-title txt-white">紧要事项</div>
        <matterTable :monthlyId="mission.monthlyId" 
            ref="contType3" @refresh="refresh" contType="3"
            :viewMonth="viewMonth"
            label="事项" 
            formLabel="紧要事项"
            :disable="disable">
        </matterTable>
      <div class="line line-dashed" />
    </div>
    <div>
      <div class="tt-title txt-white">重要事项</div>
        <matterTable :monthlyId="mission.monthlyId" 
          ref="contType4" @refresh="refresh" contType="4"
          :viewMonth="viewMonth"
          label="事项"
          formLabel="重要事项"
          :disable="disable">
        </matterTable>
    </div>
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import { downloadFile } from '@/utils/download'
import targetTable from './monthPlan/targetTable'
import firstTable from './monthPlan/firstTable'
import ghbTable from './monthPlan/ghbTable'
import matterTable from './monthPlan/matterTable'
export default {
  components: {
    targetTable,
    firstTable,
    ghbTable,
    matterTable
  },
  props: {
    viewMonth: String,
    disable: Boolean,
    viewYear: [String, Number]
  },
  data() {
    return {
      // 使命
      editVisible: false,
      mission_: null,
      mission: {
        monthlyId: null,
        monthlyDate: null,
        monthlyMission: null
      },
      // 月个人焦点目标
      person: [],
      // 月公司焦点目标
      company: [],
      downLoading: false
    }
  },
  computed: {

  },
  created() {
    this.getMission()
    this.getField()
  },
  mounted() {
  },
  methods: {
    // 查询使命信息
    getMission() {
      const param = {
        viewDate: this.viewMonth
      }
      baseRequest('/objective/rwMonthly/getMission', param).then(response => {
        this.mission = response.data.item || {}
        this.mission_ = this.mission.monthlyMission
        if (!this.mission_ || this.mission_ === '') {
          this.editVisible = true
        }
      })
    },
    // 保存使命信息
    saveMission(save) {
      if (save === false) {
        this.mission_ = this.mission.monthlyMission
        this.editVisible = false
        return
      }
      const param = {
        monthlyId: this.mission.monthlyId || null,
        monthlyMission: this.mission_,
        viewDate: this.viewMonth
      }
      baseRequest('/objective/rwMonthly/update', param).then(response => {
        this.mission.monthlyMission = this.mission_
        this.editVisible = false
      })
    },
    // 查询领域信息
    getField() {
      baseRequest('/objective/rwValue/selectValOrder', { viewYear: this.viewYear }).then(response => {
        const items = response.data.item
        this.person = []
        this.company = []
        items.forEach(d => {
          if (d.codeType === null || d.codeType === '0') {
            this.person.push(d)
          } else {
            this.company.push(d)
          }
        })
        if (this.company.length === 0) {
          this.company.push({ codeType: '1',
            fileId: null,
            rwValueConts: [],
            valueDec: null,
            valueField: 7,
            valueFieldName: '事业领域',
            valueFieldOrder: 7,
            valueFigurat: null,
            valueId: null })
        }
      })
    },
    refresh(contType, fieldCode) {
      // 刷新月个人焦点目标
      if (contType === 'first') {
        this.$refs[`contType-${fieldCode}`][0].searchOption()
        return
      }
      // 刷新月首要目标
      if (contType === '1') {
        this.$refs['first'].searchOption()
        return
      }
      // 刷新重要事项计划表
      if (contType === '3') {
        this.$refs['contType4'].searchOption()
        return
      }
      // 刷新重要事项计划表
      if (contType === '4') {
        this.$refs['contType3'].searchOption()
        return
      }
    },
    download() {
      const param = {
        viewDate: this.viewMonth
      }
      this.downLoading = true
      downloadFile('/objective/rwMonthlyCont/exportExcel', param)
        .finally(_ => {
          this.downLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./month.css";
  .tt-plan {
    position: relative;
    .tt-title {
      width: 160px;
      height: 28px;
      line-height: 28px;
      margin-top: 32px;
      margin-bottom: 14px;
      padding-left: 20px;
      background-color: #00afff;
      border-radius: 0 10px 10px 0;
    }
    .tt-mission {
      background-color: #fcfcfc;
      border: 1px solid #dddddd;
      padding: 20px;
      border-radius: 10px;
      cursor: pointer;
    }
    .tt-input {
      /deep/ .el-textarea__inner {
        border-radius: 10px;
      }
    }
    .tt-table {
      margin-bottom: 24px;
    }
    .btn-group {
      text-align: right;
      margin-top: 14px;
      .btn {
        width: 90px;
        height: 30px;
        border-radius: 4px;
        padding: 0;
      }
      .btn-clear {
        background-color: #ffffff;
      }
      .btn-save {
        margin-left: 30px;
        background-color: #00afff;
      }  
    }
    .line {
      margin-top: 24px;
    }
  }
  .download {
    position: absolute;
    top: 0px;
    right: 0;
  }
</style>

