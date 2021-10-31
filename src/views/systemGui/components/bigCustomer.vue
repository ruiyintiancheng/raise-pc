<template>
    <div class="addOramend">
        <div class="content">
            <el-form ref="form" :model="formData" class="query-form" label-width="110px" label-position="right" :rules="rules">
                <el-form-item label="客户名称：" class="detail-item">
                    <el-input :placeholder="currentId.userName+'('+currentId.userPhone+')'" style="width:300px" disabled></el-input >
                </el-form-item>
                <el-form-item label="产品：" class="formitem">
                    <el-input :placeholder="currentId.productName" style="width:300px" disabled></el-input >
                </el-form-item>
                <el-form-item label="教练：" class="formitem" v-if="Number(currentId.productId) === 9">
                    <el-input v-model="otherInfo.coachName" style="width:300px" disabled></el-input >
                </el-form-item>
                <el-form-item label="教练类型：" class="formitem" v-if="Number(currentId.productId) === 6">
                    <el-input v-model="otherInfo.coachType" style="width:300px" disabled></el-input >
                </el-form-item>
                <el-form-item label="会谈次数：" class="formitem" v-if="Number(currentId.productId) === 6">
                    <el-input v-model="otherInfo.productNum" style="width:300px" disabled></el-input >
                </el-form-item>
                <el-form-item label="协议：" class="formitem" prop="agreement">
                        <el-input v-model="formData.agreement" clearable style="width:300px" :disabled="isDetail"></el-input>
                </el-form-item>
                <el-form-item label="学员人数：" class="formitem" prop="numbers">
                        <el-input v-model="formData.numbers" style="width:300px" :disabled="isDetail"></el-input>
                </el-form-item>
                 <el-form-item label="截止日期：" class="formitem required" style="width: 280px;" prop="effectTime">
                    <el-date-picker v-model="formData.effectTime"  suffix-icon="el-icon-date" :disabled="isDetail"
                    :picker-options="pickerOptionsStart" 
                    type="date"
                    style="width:300px;"
                    value-format='yyyy-MM-dd'
                    >
                    </el-date-picker>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { baseRequest } from '@/api/base'
    export default {
      name: 'addOramend',
  props: {
        currentId: {
          type: Object,
          default: _ => {}
        },
        numbers: [Number, String],
        agreement: {
          type: String,
          default: ''
        },
        effectTime: {
          type: String,
          default: ''
        },
        isDetail: Boolean
  },
      data() {
        // var validatePass = (rule, value, callback) => {
        //   if (value % 4 !== 0) {
        //     callback(new Error('请输入4的倍数'))
        //   } else {
        //     callback()
        //   }
        // }
        return {
          otherInfo: {
            coachName: '',
            coachType: '',
            productNum: null
          },
          usersList: [],
          productsList: [],
          pickerOptionsStart: {
            disabledDate(time) {
              return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
            }
          },
          formData: {
            effectTime: '',
            userId: '',
            productId: '',
            numbers: '',
            agreement: ''
          },
          addShow: 0,
          rules: {
            numbers: [
              // { validator: validatePass, message: '请输入学员人数,且为4的倍数' }
              { required: true, message: '请选择学员人数' },
              { pattern: /^((0\.((0[1-9])|([1-9]\d?)))|(([1-9]|1[0-5])(\.[\d]{1,2})?)|(15(\.0{1,2})?))$/, message: '请输入正确的学员人数' }
            ],
            effectTime: [
              { required: true, message: '请添加截止日期' }
            ]
          }
        }
      },
      watch: {
        numbers() {
          this.$set(this.formData, 'numbers', this.numbers)
        },
        agreement() {
          this.$set(this.formData, 'agreement', this.agreement)
        },
        effectTime() {
          this.$set(this.formData, 'effectTime', this.effectTime)
        }
      },
      created() {
        // baseRequest('/user/rwMessageTob/getMesssge').then(response => {
        //   console.log(response)
        // })
        this.formData.agreement = this.agreement
        this.formData.numbers = this.numbers
        this.formData.effectTime = this.effectTime
        // this.$set(this.formData, 'numbers', this.numbers)
        // this.$set(this.formData, 'agreement', this.agreement)
        if ((Number(this.currentId.productId) === 6) || Number(this.currentId.productId) === 9) {
          baseRequest('/user/rwMessageTob/getMessageTobDetails', { id: this.currentId.id }).then(response => {
            this.otherInfo.coachName = response.data.item.coachName
            this.otherInfo.coachType = response.data.item.coachCode === 'special' ? '特色教练' : '标准教练'
            this.otherInfo.productNum = response.data.item.productNum
          })
        }
      },
      methods: {
        changeHandle(callback) {
          this.$refs.form.validate((valid) => {
            if (valid) {
              const params = {
                id: this.currentId.id,
                numbers: this.formData.numbers,
                agreement: this.formData.agreement,
                productId: this.formData.productId,
                effectTime: this.formData.effectTime
              }
              baseRequest('/user/rwMessageTob/update', params).then(response => {
                callback && callback(response)
              })
            } else {
              return
            }
          })
        },
        empty() {
          this.$refs.form.resetFields()
        }
      }
    }
</script>

<style lang="scss" scoped>
.addOramend{
    .content{
        width: 400px;
        margin:0 auto
    }
}
</style>