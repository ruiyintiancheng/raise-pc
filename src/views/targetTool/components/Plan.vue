<template>
    <el-dialog
        :title="(isPast?'':(this.updateStatus === 0?'添加':'修改'))+'目标规划'"
        :visible.sync="updateVisible"
        class="dialog-main height80 noPaddingRight"
        top="5%"
        :close-on-click-modal="false"
        >
        <update-plan v-if="updateVisible" ref="gpsUpdate" :year="year" :updateObj="updateObj" :isMinTarget="isMinTarget" @changePublish="changePublish" @changeLoading="changeLoading" :isPublish="isPublish"></update-plan>
        <span slot="footer" v-if="!isPast">
        <span class="dialog-error-msg">{{errorText}}</span>
        <el-button v-if="updateObj.planId" type="success" plain @click="download" :loading="downLoading">下 载</el-button>
        <el-button  @click="updateVisible = false">取 消</el-button>
        <el-button type="primary"  @click="updateDone()" :loading="loading">保 存</el-button>
        <el-button type="success" v-if="isPublish === '0' && !hierarchy"  @click="publishDone()" :loading="loading">发 布</el-button>
        </span>
    </el-dialog>
</template>
<script>
import updatePlan from './gps/update'
import { baseRequest } from '@/api/base'
import { deepClone } from '@/utils'
import { downloadFile } from '@/utils/download'
import { parseTime } from '@/utils/index'
export default {
  components: {
    updatePlan
  },
  data() {
    return {
      updateVisible: false,
      errorText: '',
      updateStatus: 0,
      updateObj: {},
      year: '',
      isPublish: '1',
      loading: false,
      isMinTarget: false,
      hierarchy: 0,
      downLoading: false
    }
  },
  computed: {
    isPast() {
      const currentYear = new Date().getFullYear()
      return Number(this.year) < currentYear
    },
    currentDate() {
      return parseTime(new Date(), '{y}-{m}-{d}')
    }
  },
  methods: {
    changePublish(isPublish) {
      this.isPublish = isPublish
    },
    changeLoading(boo) {
      this.loading = boo
    },
    addHandle(year) {
      this.errorText = ''
      this.updateStatus = 0
      this.updateObj = {}
      this.isMinTarget = false
      this.hierarchy = 0
      this.updateVisible = true
      this.year = year
      this.isPublish = '0'
    },
    updateHandle(obj) {
      this.errorText = obj.errMsg || ''
      this.updateStatus = 1
      this.updateObj = obj
      this.year = obj.year
      this.isMinTarget = obj.isMinTarget
      this.hierarchy = obj.hierarchy
      this.isPublish = obj.isPublish
      //   for (const iterator of this.tableData) {
      //     if (iterator.children && iterator.children.length > 0) {
      //       for (const iterator2 of iterator.children) {
      //         if (iterator2.children && iterator2.children.length > 0) {
      //           if (iterator2.children.some(item => item.planId === this.updateId)) {
      //             this.isMinTarget = true
      //           }
      //         }
      //       }
      //     }
      //   }
      this.updateVisible = true
    },
    publishDone() {
      // this.$emit('planCallback')
      // this.$Message.success('操作成功')
      // this.updateVisible = false
      if (this.updateStatus === 0) {
        this.updateDone(true)
      } else {
        this.updateDone(true, _ => {
          if (this.updateObj.paramIds.planId || this.$refs.gpsUpdate.formData.planId) {
            this.publishRequest()
          } else {
            this.$refs.gpsUpdate.getUpdateData(_ => {
              this.publishRequest()
            })
          }
        })
      }
    },
    publishRequest() {
      const params = {
        planId: this.updateObj.paramIds.planId || this.$refs.gpsUpdate.formData.planId
      }
      this.loading = true
      baseRequest('/objective/rwGoalPlan/publish', params).then(response => {
        if (response.data.item.count) {
          this.$emit('planCallback')
          this.$Message.success('操作成功')
          this.updateVisible = false
        } else {
          this.$Message.warning(response.data.item.param)
        }
      }).finally(_ => {
        this.loading = false
      })
    },
    updateDone(publish, callback) {
      this.errorText = ''
      const formData = this.$refs.gpsUpdate.formData
      if (!formData.goal) {
        this.$refs.gpsUpdate.errorField = 'goal'
        this.errorText = '请输入目标'
        return
      }
      if (!formData.planRange && formData.planRange !== 0) {
        this.$refs.gpsUpdate.errorField = 'planRange'
        this.errorText = '请选择领域'
        return
      }

      // let isUpdate = false
      // for (const key in this.updateObj.paramIds) {
      //   if (this.updateObj.paramIds[key]) {
      //     isUpdate = true
      //   }
      // }
      // if (publish || (this.updateObj.paramIds && (this.updateObj.paramIds.hasOwnProperty('annualId') || this.updateObj.paramIds.hasOwnProperty('dreamId')))) {
      if (publish || this.isPublish === '1') {
        const goalPlanConts = formData.goalPlanConts
        if (!formData.startDate || !formData.endDate) {
          this.$refs.gpsUpdate.errorField = 'startDate'
          this.errorText = '请选择日期'
          return
        }
        let result = true
        for (const it of goalPlanConts) {
          const targetDate = it.targetDate
          const finalDate = it.finalDate
          if (!targetDate || !finalDate) {
            result = false
            this.errorText = '请选择明确步骤的日期'
            break
          }
          if (targetDate < formData.startDate || finalDate > formData.endDate) {
            result = false
            this.errorText = '明确步骤的日期需在目标日期的范围内选择'
            break
          }
        }
        if (!result) {
          return
        }

        if (formData.startDate < this.currentDate) {
          this.$Message.warning('开始日期大于当前日期可发布，请调整后发布！')
          return
        }
      }
      // }
      // }

      // if (formData.startDate && !formData.endDate) {
      //   this.$refs.gpsUpdate.errorField = 'startDate'
      //   this.errorText = '请选择预计达成日期'
      //   return
      // }
      // if (formData.endDate && !formData.startDate) {
      //   this.$refs.gpsUpdate.errorField = 'startDate'
      //   this.errorText = '请选择开始日期'
      //   return
      // }

      this.loading = true
      if (this.updateStatus === 0) {
        const params = deepClone(this.$refs.gpsUpdate.formData)
        // params.viewDate = this.year
        if (publish) {
          params.isPublish = '1'
        } else {
          params.isPublish = '0'
          const goalPlanConts = params.goalPlanConts
          goalPlanConts.map(item => {
            item.isPublish = '0'
            return item
          })
        }
        baseRequest('/objective/rwGoalPlan/add', params).then(response => {
          this.$emit('planCallback')
          this.$Message.success('操作成功')
          this.updateVisible = false
        }).finally(_ => {
          this.loading = false
        })
      } else {
        let params = deepClone(this.$refs.gpsUpdate.formData)
        delete params.valueFigurat
        params.deleteIds = this.$refs.gpsUpdate.deleteIds
        if (this.updateObj.paramIds) {
          params = Object.assign(params, this.updateObj.paramIds)
        }
        params.isPublish = this.isPublish || '1'
        // if (publish) {
        //   params.isPublish = '1'
        // }
        baseRequest(this.updateObj.updateUrl, params).then(response => {
          if (publish) {
            callback && callback()
          } else {
            this.$emit('planCallback')
            this.$Message.success('操作成功')
            this.updateVisible = false
            this.loading = false
          }
        }).finally(_ => {

        })
      }
    },
    download() {
      const planId = this.updateObj.planId
      this.downLoading = true
      downloadFile('/objective/rwGoalPlan/download', { planId }).finally(_ => {
        this.downLoading = false
      })
    }
  }
}
</script>