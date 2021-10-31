<template>
    <div>
          <div class="course-update">
        <el-form  :inline="true"  ref="form" :model="formData" :rules="rules"  class="sysquery">
                <!-- <el-form-item  class="formitem" style="width: 280px;" prop="courseType">
                    <span class="form-label required">选择类型</span>
                    <el-select style="width:280px;"    v-model="formData.courseType">
                      <el-option label="ToB" value="ToB"></el-option>
                      <el-option label="ToC" value="ToC"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item  class="formitem" style="width: 300px;" prop="productId">
                    <span class="form-label required">选择产品</span>
                    <el-select style="width:280px;"   v-model="formData.productId">
                  <el-option label="First Step" :value="1"></el-option>
              </el-select>
                </el-form-item>
                <el-form-item  class="formitem required" style="width: 300px;" prop="startDate">
                    <span class="form-label required">选择辅导日期</span>
                    <el-date-picker v-model="formData.startDate"  suffix-icon="el-icon-date"
                  :picker-options="pickerOptionsStart" 
                  type="date"
                  style="width:280px;"
                  value-format='yyyy-MM-dd'
                  >
              </el-date-picker>
                </el-form-item>
                  <el-form-item  class="formitem" style="width: 300px;" prop="startTime">
                    <span class="form-label required">选择辅导时间</span>
                    <el-select style="width:280px;"  v-model="formData.startTime">
                 <el-option label="18:00-19:20" value="18:00-19:20"></el-option>
                 <el-option label="20:00-21:20" value="20:00-21:20"></el-option>
                 <!-- <el-option label="09:30-09:40(测试用)" value="09:00-09:10"></el-option>
                 <el-option label="10:00-10:10(测试用)" value="10:00-10:10"></el-option>
                 <el-option label="10:30-10:40(测试用)" value="10:00-10:10"></el-option>
                 <el-option label="11:00-11:10(测试用)" value="11:00-11:10"></el-option>
                 <el-option label="11:30-11:40(测试用)" value="11:00-11:10"></el-option>
                 <el-option label="14:00-14:10(测试用)" value="14:00-14:10"></el-option>
                 <el-option label="14:30-14:40(测试用)" value="14:00-14:10"></el-option>
                 <el-option label="15:00-15:10(测试用)" value="15:00-15:10"></el-option>
                 <el-option label="15:30-15:40(测试用)" value="15:00-15:10"></el-option>
                 <el-option label="15:40-15:50(测试用)" value="15:00-15:10"></el-option>
                 <el-option label="15:50-16:0(测试用)" value="15:00-15:10"></el-option>
                 <el-option label="16:00-16:10(测试用)" value="16:00-16:10"></el-option>
                 <el-option label="16:30-16:40(测试用)" value="16:00-16:10"></el-option> -->
                    </el-select>
                </el-form-item>
        </el-form>
        </div>
  </div>
</template>
<script>
import { baseSearch } from '@/api/base'
import { baseRequest } from '@/api/base'
export default {
  props: {
    currentRow: {
      type: Object,
      default: _ => {}
    }
  },
  mounted() {
    for (const key in this.currentRow) {
      if (this.formData.hasOwnProperty(key)) {
        this.formData[key] = this.currentRow[key]
      }
    }
  },
  data() {
    return {
      pickerOptionsStart: {
        disabledDate(time) {
          return time.getTime() < Date.now() + 24 * 60 * 60 * 1000 * 7
        }
      },
      formData: {
        courseId: null,
        productId: null,
        startDate: null,
        courseType: 'ToC',
        startTime: null
      },
      rules: {
        duration: [
          { required: true, message: '请选择辅导时长' }
        ],
        productId: [
          { required: true, message: '请选择产品' }
        ],
        startDate: [
          { required: true, message: '请选择辅导日期' }
        ],
        courseType: [
          { required: true, message: '请选择类型' }
        ],
        startTime: [
          { required: true, message: '请选择辅导时间' }
        ]
      }
    }
  },
  created() {
    this.selectType()
  },
  methods: {
    selectType() {
      baseSearch('/course/rwProduct/getTypes').then((response) => {
        this.prodactList = response.data.item
      })
    },
    saveHandle(callback, finallyCallback) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const params = {
            startDate: this.formData.startDate,
            productId: this.formData.productId,
            courseType: this.formData.courseType,
            startTime: this.formData.startTime,
            duration: '80'
          }
          baseRequest('/course/courses/offerCourses', params).then(_ => {
            callback && callback()
          }).finally(_ => {
            finallyCallback && finallyCallback()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.addClassbox{
  .sysquery{
   margin-top: 25px;
  //  width:680px;
height:402px;
  // .eration{
  //      text-align: right;
  //     margin-top: 20px;
  // }
  .formitem{
    margin-top:0;
    margin-right: 24px;
    margin-bottom: 0;
    color:#222222;
    .form-label{
    width: 38px;
    height: 13px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    font-weight: 400;
    font-stretch: normal;
    line-height: 13px;
    letter-spacing: 0px;
    color: #222222;
    margin-bottom: 1px;
    display: block;
    }
   }
  }
}


</style>