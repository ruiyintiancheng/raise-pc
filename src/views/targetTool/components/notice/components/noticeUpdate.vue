<template>
    <div class="notice-update">
       <el-form ref="updateForm" :model="formData" :rules="rules">
            <el-form-item style="margin-top:0px;" prop="content">
                <div class="form-label required">内容</div>
                <el-input type="textarea" :rows="4" style="" v-model="formData.content" show-word-limit maxlength="200"></el-input>
            </el-form-item>
            <el-form-item prop="topicName">
                <div class="form-label">主题</div>
                <el-input type="text" placeholder="" v-model="formData.topicName" show-word-limit maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="tripTime">
                <div class="form-label">行程日期</div>
                <el-date-picker style="width:100%" v-model="formData.tripTime"
                    type="date"
                    value-format='yyyy-MM-dd'
                    :picker-options="pickerOptions"
                    >
                </el-date-picker>
            </el-form-item>
          </el-form>
    </div>
</template>
<script>
export default {
  props: {
    currentRow: Object,
    updateStatus: String
  },
  created() {
    if (this.updateStatus === '1') {
      for (const key in this.currentRow) {
        this.formData[key] = this.currentRow[key]
      }
    }
  },
  data() {
    return {
      formData: {
        content: '',
        tripTime: '',
        topicName: ''
      },
      rules: {
        content: [
          { required: true, message: '请填写内容' }
        ]
      },
      pickerOptions: {
        disabledDate: (time) => {
        // const currentYearTime = new Date(this.year + '/01/01 00:00:00').getTime()
        // const currentYearTimeEnd = new Date(this.year + '/12/31 00:00:00').getTime()
          const lastYearDate = new Date().getTime() - 24 * 3600 * 1000 * 365
          const nextYearDate = new Date().getTime() + 24 * 3600 * 1000 * 365
          const pannelTime = time.getTime()
          return pannelTime < lastYearDate || pannelTime > nextYearDate
        }
      }
    }
  }
}
</script>