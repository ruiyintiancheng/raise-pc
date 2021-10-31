<template>
    <div class="addShow">
        <div class="content">
            <el-form ref="form" :model="formData" class="query-form" label-width="180px" label-position="right" :rules="rules">
                <el-form-item label="客户名称：" class="detail-item" prop="userId">
                       <el-autocomplete
                          class="inpWidth"
                          style="width: 300px;"
                          v-model="formData.userId"
                          :fetch-suggestions="querySearch"
                          placeholder=""
                          @select="handleSelect"
                        ></el-autocomplete>
                </el-form-item>
                <el-form-item label="协议：" class="formitem" prop="agreement">
                        <el-input v-model="formData.agreement" style="width:300px" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="产品：" class="formitem" prop="productId">
                        <el-select v-model="formData.productId" placeholder="" class="course-time" style="width:300px"  @change="monitorTalks(formData.productId)">
                        <el-option  
                        v-for="item in options"
                        :key="item.productId"
                        :label="item.productName"
                        :value="item.productId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="教练：" class="formitem" prop="coachName" v-if="Number(formData.productId) === 9">
                    <el-input v-model="formData.coachName" placeholder="" class="course-time" style="width:200px"  disabled>
                    </el-input>
                    <el-button type="primary" plain @click="jiaolianViasable=true">选择教练</el-button>
                </el-form-item>
                <el-form-item label="教练类型：" class="formitem" prop="coachOneType" v-if="showSelect">
                        <el-select v-model="formData.coachOneType" placeholder="" class="course-time" style="width:300px" @change="formData.type = ''">
                        <el-option  
                        v-for="item in coachType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会谈次数：" class="formitem" prop="type" v-if="showSelect">
                      <el-select v-model="formData.type" placeholder="" class="course-time" style="width:300px" v-if="formData.coachOneType === '1'">
                        <el-option  
                        v-for="item in standard"
                        :key="item.type"
                        :label="item.productNum"
                        :value="item.type"
                        ></el-option>
                      </el-select>
                      <el-select v-model="formData.type" placeholder="" class="course-time" style="width:300px" v-else>
                        <el-option  
                        v-for="item in coaracteristic"
                        :key="item.type"
                        :label="item.productNum"
                        :value="item.type"
                        ></el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="学员人数：" class="formitem" prop="numbers">
                        <el-input v-model="formData.numbers" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="截止日期：" class="formitem required" style="width: 280px;" prop="effectTime">
                    <el-date-picker v-model="formData.effectTime"  suffix-icon="el-icon-date"
                    :picker-options="pickerOptionsStart" 
                    type="date"
                    style="width:300px;"
                    value-format='yyyy-MM-dd'
                    >
                    </el-date-picker>
              </el-form-item>
            </el-form>
        </div>
    <el-dialog
      title="选择教练"
      :visible.sync="jiaolianViasable"
      append-to-body
      class="dialog-main heightauto"
      top="10%"
      width="550px"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <coach-table
        ref="coachTable"
        v-if="jiaolianViasable"
      ></coach-table>
      <span slot="footer">
        <el-button @click="jiaolianViasable = false">取 消</el-button>
        <el-button @click="saveJlHandle" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
// import { baseSearch } from '@/api/base'
import { baseRequest } from '@/api/base'
import CoachTable from './Coach4Customer.vue'
export default {
  components: {
    CoachTable
  },
  data() {
    return {
      jiaolianViasable: false,
      options: [{
        value: '1',
        label: 'First Step'
      },
      {
        value: '3',
        label: '目标规划 SP'
      },
      {
        value: '5',
        label: '探索之门'
      }],
      coachType: [
        {
          value: '1',
          label: '标准教练'
        },
        {
          value: '2',
          label: '特色教练'
        }
      ],
      standard: [
        // {
        //   productId: 6,
        //   productNum: 3,
        //   type: 3
        // },
        // {
        //   productId: 6,
        //   productNum: 6,
        //   type: 8
        // }
      ],
      coaracteristic: [
        // {
        //   productId: 6,
        //   productNum: 1,
        //   type: 1
        // },
        // {
        //   productId: 6,
        //   productNum: 3,
        //   type: 2
        // }
      ],
      coachOneType: '',
      showSelect: false,
      pickerOptionsStart: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      usersList: [{
        userId: null
      }],
      filter: '',
      productsList: [],
      qympArrObject: [],
      formData: {
        effectTime: '',
        userId: '',
        productId: '',
        numbers: '',
        agreement: '',
        type: null,
        coachOneType: null,
        coachName: null,
        coachId: null
      },
      userId: '',
      addShow: 0,
      rules: {
        effectTime: [
          { required: true, message: '请添加截止日期' }
        ],
        userId: [
          { required: true, message: '请选择客户名称' }
        ],
        productId: [
          { required: true, message: '请选择项目' }
        ],
        type: [
          { required: true, message: '请选择教练类型' }
        ],
        coachOneType: [
          { required: true, message: '请选择会谈次数' }
        ],
        coachName: [
          { required: true, message: '请选择教练' }
        ],
        numbers: [
          // { validator: validatePass, message: '请输入学员人数,且为4的倍数' }
          { required: true, message: '请填写学员人数' },
          { pattern: /^((0\.((0[1-9])|([1-9]\d?)))|(([1-9]|1[0-5])(\.[\d]{1,2})?)|(15(\.0{1,2})?))$/, message: '请输入正确的学员人数' }
        ]
      }
    }
  },
  created() {
  },
  mounted() {
    this.requestData()
    this.gmfmcItems = this.loadAll()
  },
  methods: {
    /**
     * 保存教练
     */
    saveJlHandle() {
      const coactInfo = this.$refs.coachTable.radio
      console.log(coactInfo)
      if (!coactInfo) {
        this.$Message.warning('请选择教练')
        return
      }
      this.formData.coachName = coactInfo.userName
      this.formData.coachId = coactInfo.coachId
      this.jiaolianViasable = false
    },
    monitorTalks(productId) {
      if (productId === 6) {
        this.showSelect = true
      } else {
        this.showSelect = false
      }
    },
    requestData() {
      // const parma = {
      //   productId: this.currentProductId
      // }
      baseRequest('/user/rwMessageTob/getMesssge').then((response) => {
        // console.log(response)
        response.data.item.usersList.forEach((v) => {
          this.qympArrObject.push({ 'value': v.loginName + '(' + v.userName + ')', 'userId': v.userId })
        })
        // this.options = response.data.item.productsList
        // console.log(this.options)
      })
      baseRequest('/user/rwMessageTob/productList').then((res) => {
        // console.log(res)
        this.options = res.data.item
        this.options.forEach((val, index) => {
          if (val.productName === '1对1教练会谈') {
            this.coaracteristic = val.subList.characteristic
            this.standard = val.subList.standard
            // console.log(this.coaracteristic)
            // console.log(this.standard)
          }
        })
      })
    },
    querySearch(queryString, cb) {
      this.Timeout = setTimeout(() => {
        var gmfmcItems = this.gmfmcItems
        var results = queryString ? gmfmcItems.filter(this.createFilter(queryString)) : gmfmcItems
        cb(results)
      }, 500)
    },
    createFilter(queryString) {
      return (gmfmcItems) => {
        return (gmfmcItems.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll() {
      var that = this
      return that.qympArrObject // 返回请求接口的数据
    },
    handleSelect(item) {
      this.userId = item.userId
      console.log(this.userId)
    },
    saveHandle(callback) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            productId: this.formData.productId,
            userId: this.userId,
            numbers: this.formData.numbers,
            effectTime: this.formData.effectTime,
            agreement: this.formData.agreement,
            type: this.formData.type
          }
          if (Number(this.formData.productId) === 9) {
            params.coachId = this.formData.coachId
          }
          baseRequest('/user/rwMessageTob/add', params).then(response => {
            callback && callback(response)
          })
        } else {
          return
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>