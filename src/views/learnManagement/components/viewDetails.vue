<template>
  <div class="viewDetails">
    <div class="coruseDetail inside-container">
      <div class="other-info" v-if="currentProductId===6 || currentProductId===9">
        <div class="other-item" v-if="currentProductId===6">
          <label>教练类型：</label>{{otherInfo.coachType}}
        </div>
        <div class="other-item" v-if="currentProductId===6">
          <label>会谈次数：</label>{{otherInfo.productNum}}次
        </div>
                <div class="other-item" v-if="currentProductId===9">
          <label>教练名称：</label>{{otherInfo.coachName}}
        </div>
      </div>
      <el-form :rules="rules" class="detail-form clearfix" >
        <el-form-item label="学员信息：" style="margin-left:43px;margin-top:14px" v-for="(value,index) in item" :key="index">
          <!-- 项目为sp 时间已过期，不可修改 -->
          <template v-if='currentProductId===3'>
            <div v-if="value.type==='2'">
              <el-input
                :disabled="cutOffDate < currentDate"
                style="width:280px;margin-left: 4px;"
                v-model="value.xEmail"
                clearable
                @input.native="change($event,index)"
              > </el-input>
              <el-button size="mini" v-if='!(cutOffDate < currentDate)' type="primary" @click="emailSaveBtn(value)">保存</el-button>
              <el-button size="mini" v-if="!(cutOffDate < currentDate)" type="danger" plain @click="deletBtn(value)">删除</el-button>
            </div>
            <div v-else>
              <el-input
                :disabled="cutOffDate < currentDate"
                style="width:280px;margin-left: 4px;"
                v-model="value.xloginName"
                clearable
                @input.native="change($event,index)"
              >
              </el-input>
              <el-button size="mini" v-if='!(cutOffDate < currentDate)' type="primary" @click="phoneSaveBtn(value)">保存</el-button>
              <el-button size="mini" v-if="!(cutOffDate < currentDate)" type="danger" plain @click="deletBtn(value)">删除</el-button>
            </div>
          </template>
          <!-- 项目为探索之门 时间已过期，不可修改 -->
          <template v-if='currentProductId===5'>
            <div v-if="value.type==='2'">
              <el-input
                :disabled="value.loginName!==null?true:false"
                style="width:280px;margin-left: 4px;"
                v-model="value.xEmail"
                clearable
                @input.native="change($event,index)"
              > </el-input>
              <!-- <el-button size="mini" v-if='!(cutOffDate<=currentDate)' type="primary" @click="emailSaveBtn(value)">保存</el-button> -->
              <!-- <el-button size="mini" v-if="!(cutOffDate<=currentDate)" type="danger" plain @click="deletBtn(value)">删除</el-button> -->
              <el-button size="mini" v-if='!(cutOffDate<=currentDate) && value.loginName===""' type="primary" @click="emailSaveBtn(value)">保存</el-button>
            </div>
            <div v-else>
              <el-input
                :disabled="value.loginName!==null?true:false"
                style="width:280px;margin-left: 4px;"
                v-model="value.xloginName"
                clearable
                @input.native="change($event,index)"
              >
              </el-input>
              <!-- <el-button size="mini" v-if='!(cutOffDate<=currentDate)' type="primary" @click="phoneSaveBtn(value)">保存</el-button> -->
              <!-- <el-button size="mini" v-if="!(cutOffDate<=currentDate)" type="danger" plain @click="deletBtn(value)">删除</el-button> -->
              <el-button size="mini" v-if='!(cutOffDate<=currentDate) && value.loginName===""' type="primary" @click="phoneSaveBtn(value)">保存</el-button>
            </div>
          </template>
          <!-- 项目为FS 根据后台传的字段判断是否可以修改 -->
          <template v-if='currentProductId===1'>
            <div v-if="value.type==='2'">
              <el-input
                :disabled="value.message==='true'?true:false"
                style="width:280px;margin-left: 4px;"
                v-model="value.xEmail"
                @input.native="change($event,index)"
                clearable
              ></el-input>
              <el-button size="mini" v-if="item[index].message==='true'?false:true || cutOffDate>=currentDate" type="primary" @click="emailSaveBtn(value)">保存</el-button>
              <el-button size="mini" v-if="item[index].message==='true'?false:true && cutOffDate>=currentDate" type="danger" plain @click="deletBtn(value)">删除</el-button>
            </div>
            <div v-else>
              <el-input
                :disabled="value.message==='true'?true:false"
                style="width:280px;margin-left: 4px;"
                v-model="value.xloginName"
                @input.native="change($event,index)"
                clearable
              ></el-input>
              <el-button size="mini" v-if="item[index].message==='true'?false:true || cutOffDate>=currentDate" type="primary" @click="phoneSaveBtn(value)">保存</el-button>
              <el-button size="mini" v-if="item[index].message==='true'?false:true && cutOffDate>=currentDate" type="danger" plain @click="deletBtn(value)">删除</el-button>
            </div>
          </template>
           <!-- 项目为FS(无会谈) 根据后台传的字段判断是否可以修改 -->
          <template v-if='currentProductId===9'>
            <div v-if="value.type==='2'">
              <el-input
                :disabled="value.message==='true' || !!value.yEmail"
                style="width:280px;margin-left: 4px;"
                v-model="value.xEmail"
                @input.native="change($event,index)"
                clearable
              ></el-input>
              <!-- <el-button size="mini" v-if="!value.yEmail && (item[index].message==='true'?false:true || cutOffDate>=currentDate)" type="primary" @click="emailSaveBtn(value)">保存</el-button> -->
              <!-- <el-button size="mini" v-if="item[index].message==='true'?false:true && cutOffDate>=currentDate" type="danger" plain @click="deletBtn(value)">删除</el-button> -->
            </div>
            <div v-else>
              <el-input
                :disabled="value.message==='true' || !!value.yloginName"
                style="width:280px;margin-left: 4px;"
                v-model="value.xloginName"
                @input.native="change($event,index)"
                clearable
              ></el-input>
              <!-- <el-button size="mini" v-if="!value.yloginName && (item[index].message==='true'?false:true || cutOffDate>=currentDate)" type="primary" @click="phoneSaveBtn(value)">保存</el-button> -->
              <!-- <el-button size="mini" v-if="item[index].message==='true'?false:true && cutOffDate>=currentDate" type="danger" plain @click="deletBtn(value)">删除</el-button> -->
            </div>
          </template>
      <!-- 1-1教练会谈-->
          <template v-if='currentProductId===6'>
            <div v-if="value.type==='2'">
              <el-input
                :disabled="updateFlag[index].updateFlag=== false?true:false"
                style="width:280px;margin-left: 4px;"
                v-model="value.xEmail"
                @input.native="change($event,index)"
                clearable
              ></el-input>
              <el-button size="mini" v-if="updateFlag[index].updateFlag=== false ?false:true" type="primary" @click="emailSaveBtn(value)">保存</el-button>
              <el-button size="mini" v-if="updateFlag[index].updateFlag=== false ?false:true && cutOffDate>=currentDate" type="danger" plain @click="deletBtn(value)">删除</el-button>
            </div>
            <div v-else>
              <el-input
                :disabled="updateFlag[index].updateFlag=== false?true:false"
                style="width:280px;margin-left: 4px;"
                v-model="value.xloginName"
                @input.native="change($event,index)"
                clearable
              ></el-input>
              <el-button size="mini" v-if="updateFlag[index].updateFlag=== false ?false:true" type="primary" @click="phoneSaveBtn(value)">保存</el-button>
              <el-button size="mini" v-if="updateFlag[index].updateFlag===false ?false:true && cutOffDate>=currentDate" type="danger" plain @click="deletBtn(value)">删除</el-button>
            </div>
          </template>

        </el-form-item>
      </el-form>
      <el-form ref="viewForm" class="detail-form clearfix"  v-show="isAdd" v-if="isSeverBtn">
        <el-form-item  v-for="(item,index) in count" :key="index" label="学员信息：" style="margin-left:43px;" >
          <el-input v-model="item.phoneNum" placeholder="请输入手机号或邮箱" style="width:280px;margin-left: 4px;" clearable>
          </el-input>
          <el-button size="mini" type="primary" @click="ispass(item.phoneNum)" v-if="index === count.length - 1 && isSeverBtn">保存</el-button>
          <!-- <el-button size="mini" type="danger" plain>删除</el-button> -->
          <el-button size="mini" @click="addInput(optNum,numbers)" v-if="index === count.length - 1 && isAddBtn">添加</el-button>
        </el-form-item>
      </el-form>
      
      
    </div>
  </div>
</template>

<script>
  import { baseRequest } from '@/api/base'
  import { parseTime } from '@/utils'
  export default {
    props: {
      currentProductId: {
        type: Number,
        default: _ => {
        }
      },
      cutOffDate: String,
      optNum: [Number, String],
      numbers: [Number, String],
      id: [Number, String],
      isAdd: Boolean
    },
    data() {
      return {
        dynamicValidateForm: {
          domains: [{
            value: ''
          }]
        },
        typeNum: '',
        select1: '1',
        select: '1',
        hintMessage: '',
        phoneInput: '',
        crouseTimelist: [],
        xloginName: '',
        query1: '',
        forbid: false,
        query: [],
        count: [{ phoneNum: null }],
        coachPhone: '',
        userId: '',
        detailForm: {},
        qympArrObject: [],
        restaurants: [],
        timeout: null,
        item: [],
        phoneList: [],
        gmfmcItems: [],
        pickerOptionsStart: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
          }
        },
        detailStatus: true,
        rules: {
        },
        updateFlag: [],
        otherInfo: {
          coachName: '',
          coachType: '',
          productNum: null
        }
      }
    },
    computed: {
      isAddBtn() {
        return this.count.length + this.item.length < this.numbers
      },
      isSeverBtn() {
        return this.item.length < this.numbers
      },
      currentDate() {
        return parseTime(new Date(), '{y}-{m}-{d}')
      },
      addNumber() {
        return this.item.length + this.count.length
      }
    },
    created() {
      this.studented()
      // 获取教练和课程的其他信息（1-1教练会谈、FS无会谈）
      if ((Number(this.currentProductId) === 6) || Number(this.currentProductId) === 9) {
        baseRequest('/user/rwMessageTob/getMessageTobDetails', { id: this.id }).then(response => {
          this.otherInfo.coachName = response.data.item.coachName
          this.otherInfo.coachType = response.data.item.coachCode === 'special' ? '特色教练' : '标准教练'
          this.otherInfo.productNum = response.data.item.productNum
        })
      }
    },
    mounted() {
      // this.gmfmcItems = this.loadAll()
      this.getcurrentTime()
      this.getOneToOneTobRelaList()
    },
    selectChange(currentSelect, row) {
      currentSelect === '2' ? this.item[row].xEmail : this.item[row].xloginName
    },
    methods: {
      getOneToOneTobRelaList() {
        baseRequest('/user/rwMessageTob/getOneToOneTobRelaList', { id: this.id }).then((response) => {
          this.updateFlag = response.data.item
        })
      },
      change(e, index) {
        this.xloginName = e.target.value
      },
      ispass(phone) {
        if (this.validateNum(phone)) {
          if (this.currentProductId === 3) {
            const params = {
              loginName: phone.indexOf('@') > 0 ? '' : phone,
              email: phone.indexOf('@') > 0 ? phone : ''
            }
            baseRequest('/objective/rwGoalPermission/isFirstBuyPhone', params).then((response) => {
              if (response.data.item.result === '0') {
                this.hintMessage = phone.indexOf('@') > 0 ? '添加的邮箱为续费学员，' : '添加的学员手机号为续费，'
                this.typeNum = '2'
              } else if (response.data.item.result === '1') {
                this.hintMessage = phone.indexOf('@') > 0 ? '添加的邮箱为首次购买，' : '添加的手机号为首次购买，'
                this.typeNum = '1'
              }
              const url = '/user/rwMessageTob/putRelaToB'
              this.submitForm(this.hintMessage, url)
            })
          } else if (this.currentProductId === 6) {
            // const params = {
            //   loginName: phone.indexOf('@') > 0 ? '' : phone,
            //   email: phone.indexOf('@') > 0 ? phone : ''
            // }
            // baseRequest('/user/rwProductPermission/isExploreBuy', params).then((response) => {
            //   if (response.data.item.result === 0) {
            //     this.hintMessage = phone.indexOf('@') > 0 ? '添加的邮箱为续费学员，' : '添加的学员手机号为续费，'
            //     this.typeNum = '2'
            //   } else if (response.data.item.result === 1) {
            //     this.hintMessage = phone.indexOf('@') > 0 ? '添加的邮箱为首次购买，' : '添加的手机号为首次购买，'
            //     this.typeNum = '1'
            //   }
            //   const url = '/user/rwMessageTob/putRelaToB'
            //   this.submitForm(this.hintMessage, url)
            // })
            const url = '/user/rwMessageTob/putRelaToB'
            this.submitForm(this.hintMessage, url)
          } else if (this.currentProductId === 5) {
            const params = {
              loginName: phone.indexOf('@') > 0 ? '' : phone,
              email: phone.indexOf('@') > 0 ? phone : ''
            }
            baseRequest('/user/rwProductPermission/isExploreBuy', params).then((response) => {
              if (response.data.item.result === 0) {
                this.hintMessage = phone.indexOf('@') > 0 ? '添加的邮箱为续费学员，' : '添加的学员手机号为续费，'
                this.typeNum = '2'
              } else if (response.data.item.result === 1) {
                this.hintMessage = phone.indexOf('@') > 0 ? '添加的邮箱为首次购买，' : '添加的手机号为首次购买，'
                this.typeNum = '1'
              }
              const url = '/user/rwMessageTob/putRelaToB'
              this.submitForm(this.hintMessage, url)
            })
          } else if (this.currentProductId === 9) {
            this.hintMessage = ''
            const submitUrl = '/user/rwMessageTob/putRelaToB'
            this.$confirm('添加后该课程立即生效不可更改, 确认添加该学员吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var paramArr = []
              for (const iterator of this.count) {
                const objl = {
                  phone: iterator.phoneNum.indexOf('@') > 0 ? '' : iterator.phoneNum,
                  email: iterator.phoneNum.indexOf('@') > 0 ? iterator.phoneNum : ''
                }
                paramArr.push(objl)
              }
              const parma = {
                id: this.id,
                productId: this.currentProductId,
                userList: paramArr,
                type: this.typeNum
              }
              this.validatePhones(parma).then(_ => {
                this.$emit('setAddLoading', true)
                baseRequest(submitUrl, parma).then((response) => {
                  this.$Message.success('添加成功')
                  this.studented()
                })
              })
            })
          } else {
            this.hintMessage = ''
            const url = '/user/rwMessageTob/putRelaToB'
            this.submitForm(this.hintMessage, url)
          }
        }
      },
      // 删除
      deletBtn(val) {
        this.$confirm('确认要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const param = {
            id: this.id,
            productId: this.currentProductId,
            userId: val.userId
          }
          baseRequest('/user/rwMessageTob/deleteRelaToB', param).then((response) => {
            if (response.msg === 'Success') {
              this.$Message.success('删除成功')
              this.item = []
              this.studented()
            }
          })
        })
      },
      changePhone(promptMessage, newNum, oldNum) {
        this.$confirm(promptMessage + '确认要保存吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const param = {
            id: this.id,
            productId: this.currentProductId,
            yloginName: oldNum.indexOf('@') > 0 ? '' : oldNum,
            xloginName: newNum.indexOf('@') > 0 ? '' : newNum,
            yEmail: oldNum.indexOf('@') > 0 ? oldNum : '',
            xEmail: newNum.indexOf('@') > 0 ? newNum : ''
          }
          baseRequest('/user/rwMessageTob/updateRelaToB', param).then((response) => {
            if (response.msg === 'Success') {
              this.$Message.success('保存成功')
              this.studented()
              this.$emit('refresh')
            }
          })
        })
      },
      // type 不为2 保存
      phoneSaveBtn(val) {
        console.log(this.currentProductId)
        if (val.xloginName.indexOf('@') > 0) {
          if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(val.xloginName)) {
            this.$Message.warning('邮箱格式不正确')
          } else {
            if (this.currentProductId === 3) {
              baseRequest('/objective/rwGoalPermission/isFirstBuyPhone', { email: val.xloginName }).then((response) => {
                if (response.data.item.result === '0') {
                  this.hintMessage = '添加的邮箱为续费学员,'
                } else if (response.data.item.result === '1') {
                  this.hintMessage = '添加的邮箱为首次购买,'
                }
                this.changePhone(this.hintMessage, val.xloginName, val.yEmail || val.yloginName)
              })
            } else if (this.currentProductId === 5) {
              baseRequest('/user/rwProductPermission/isExploreBuy', { email: val.xloginName }).then((response) => {
                if (response.data.item.result === 2) {
                  this.hintMessage = '添加的邮箱为续费学员,'
                } else if (response.data.item.result === 1) {
                  this.hintMessage = '添加的邮箱为首次购买,'
                }
                this.changePhone(this.hintMessage, val.xloginName, val.yEmail || val.yloginName)
              })
            } else if (this.currentProductId === 6) {
              // baseRequest('/user/rwProductPermission/isExploreBuy', { email: val.xloginName }).then((response) => {
              //   if (response.data.item.result === 2) {
              //     this.hintMessage = '添加的邮箱为续费学员,'
              //   } else if (response.data.item.result === 1) {
              //     this.hintMessage = '添加的邮箱为首次购买,'
              //   }
              //   this.changePhone(this.hintMessage, val.xloginName, val.yEmail || val.yloginName)
              // })
              this.changePhone(this.hintMessage, val.xloginName, val.yEmail || val.yloginName)
            } else {
              const param = {
                id: this.id,
                productId: this.currentProductId,
                userList: [{ email: val.xloginName }]
              }
              baseRequest('/user/rwMessageTob/isOkToB', param).then((response) => {
                if (!response.data.item.type) {
                  this.$Message.warning('存在已买课的邮箱' + val.xloginName)
                } else {
                  this.hintMessage = ''
                  this.changePhone(this.hintMessage, val.xloginName, val.yEmail || val.yloginName)
                }
              })
            }
          }
        } else {
          if (this.validateChangePhone(val.yloginName, val.xloginName)) {
            if (this.currentProductId === 3) {
              baseRequest('/objective/rwGoalPermission/isFirstBuyPhone', { loginName: val.xloginName }).then((response) => {
                if (response.data.item.result === '0') {
                  this.hintMessage = '添加的手机号为续费学员,'
                } else if (response.data.item.result === '1') {
                  this.hintMessage = '添加的手机号为首次购买,'
                }
                this.changePhone(this.hintMessage, val.xloginName, val.yloginName || val.yEmail)
              })
            } else if (this.currentProductId === 5) {
              baseRequest('/user/rwProductPermission/isExploreBuy', { loginName: val.xloginName }).then((response) => {
                if (response.data.item.result === 2) {
                  this.hintMessage = '添加的手机号为续费学员,'
                } else if (response.data.item.result === 1) {
                  this.hintMessage = '添加的手机号为首次购买,'
                }
                this.changePhone(this.hintMessage, val.xloginName, val.yloginName || val.yEmail)
              })
            } else if (this.currentProductId === 6) {
              // baseRequest('/user/rwProductPermission/isExploreBuy', { loginName: val.xloginName }).then((response) => {
              //   if (response.data.item.result === 2) {
              //     this.hintMessage = '添加的手机号为续费学员,'
              //   } else if (response.data.item.result === 1) {
              //     this.hintMessage = '添加的手机号为首次购买,'
              //   }
              //   this.changePhone(this.hintMessage, val.xloginName, val.yloginName || val.yEmail)
              // })
              this.changePhone(this.hintMessage, val.xloginName, val.yloginName || val.yEmail)
            } else {
              const param = {
                id: this.id,
                productId: this.currentProductId,
                userList: [{ phone: val.xloginName }]
              }
              console.log(param)
              baseRequest('/user/rwMessageTob/isOkToB', param).then((response) => {
                if (!response.data.item.type) {
                  this.$Message.warning('存在已买课的手机号' + val.yloginName)
                } else {
                  this.hintMessage = ''
                  this.saveBtn(val.yloginName, val.xloginName)
                }
              })
            }
          }
        }
      },
      // type为2  保存
      emailSaveBtn(val) {
        if (val.xEmail.indexOf('@') > 0) {
          if (this.validateChangeEmail(val.xEmail, val.yEmail)) {
            if (this.currentProductId === 3) {
              baseRequest('/objective/rwGoalPermission/isFirstBuyPhone', { email: val.xEmail }).then((response) => {
                if (response.data.item.result === '0') {
                  this.hintMessage = '添加的邮箱为续费学员,'
                } else if (response.data.item.result === '1') {
                  this.hintMessage = '添加的邮箱为首次购买,'
                }
                this.changePhone(this.hintMessage, val.xEmail, val.yEmail)
              })
            } else if (this.currentProductId === 5) {
              baseRequest('/user/rwProductPermission/isExploreBuy', { email: val.xEmail }).then((response) => {
                if (response.data.item.result === 2) {
                  this.hintMessage = '添加的邮箱为续费学员,'
                } else if (response.data.item.result === 1) {
                  this.hintMessage = '添加的邮箱为首次购买,'
                }
                this.changePhone(this.hintMessage, val.xEmail, val.yEmail)
              })
            } else if (this.currentProductId === 6) {
              // baseRequest('/user/rwProductPermission/isExploreBuy', { email: val.xloginName }).then((response) => {
              //   if (response.data.item.result === 2) {
              //     this.hintMessage = '添加的邮箱为续费学员,'
              //   } else if (response.data.item.result === 1) {
              //     this.hintMessage = '添加的邮箱为首次购买,'
              //   }
              //   this.changePhone(this.hintMessage, val.xloginName, val.yEmail || val.yloginName)
              // })
              this.changePhone(this.hintMessage, val.xEmail, val.yEmail)
            } else if (this.currentProductId === 9) {
              this.$confirm('添加后该课程立即生效不可更改, 确认添加该学员吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const param = {
                  id: this.id,
                  productId: this.currentProductId,
                  userList: [{ email: val.xEmail }]
                }
                baseRequest('/user/rwMessageTob/isOkToB', param).then((response) => {
                  if (!response.data.item.type) {
                    this.$Message.warning('存在已买课的邮箱' + val.xEmail)
                  } else {
                    this.hintMessage = ''
                    this.changePhone(this.hintMessage, val.xEmail, val.yEmail || val.yloginName)
                  }
                })
              })
            } else {
              const param = {
                id: this.id,
                productId: this.currentProductId,
                userList: [{ email: val.xEmail }]
              }
              baseRequest('/user/rwMessageTob/isOkToB', param).then((response) => {
                if (!response.data.item.type) {
                  this.$Message.warning('存在已买课的邮箱' + val.xEmail)
                } else {
                  this.hintMessage = ''
                  this.changePhone(this.hintMessage, val.xEmail, val.yEmail || val.yloginName)
                }
              })
            }
          }
        } else {
          if (!/^1[34578]\d{9}$/.test(val.xEmail)) {
            this.$Message.warning('学员手机号格式不正确')
          } else {
            if (this.currentProductId === 3) {
              baseRequest('/objective/rwGoalPermission/isFirstBuyPhone', { loginName: val.xEmail }).then((response) => {
                if (response.data.item.result === '0') {
                  this.hintMessage = '添加的手机号为续费学员,'
                } else if (response.data.item.result === '1') {
                  this.hintMessage = '添加的手机号为首次购买,'
                }
                this.changePhone(this.hintMessage, val.xEmail, val.yloginName || val.yEmail)
              })
            } else if (this.currentProductId === 5) {
              baseRequest('/user/rwProductPermission/isExploreBuy', { loginName: val.xEmail }).then((response) => {
                if (response.data.item.result === 2) {
                  this.hintMessage = '添加的手机号为续费学员,'
                } else if (response.data.item.result === 1) {
                  this.hintMessage = '添加的手机号为首次购买,'
                }
                this.changePhone(this.hintMessage, val.xEmail, val.yloginName || val.yEmail)
              })
            } else if (this.currentProductId === 6) {
              // baseRequest('/user/rwProductPermission/isExploreBuy', { loginName: val.xEmail }).then((response) => {
              //   if (response.data.item.result === 2) {
              //     this.hintMessage = '添加的手机号为续费学员,'
              //   } else if (response.data.item.result === 1) {
              //     this.hintMessage = '添加的手机号为首次购买,'
              //   }
              //   this.changePhone(this.hintMessage, val.xEmail, val.yloginName || val.yEmail)
              // })
              this.changePhone(this.hintMessage, val.xEmail, val.yloginName || val.yEmail)
            } else if (this.currentProductId === 9) {
              this.$confirm('添加后该课程立即生效不可更改, 确认添加该学员吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const param = {
                  id: this.id,
                  productId: this.currentProductId,
                  userList: [{ phone: val.xEmail }]
                }
                baseRequest('/user/rwMessageTob/isOkToB', param).then((response) => {
                  if (!response.data.item.type) {
                    this.$Message.warning('存在已买课的手机号' + val.xEmail)
                  } else {
                    this.hintMessage = ''
                    this.changePhone(this.hintMessage, val.xEmail, val.yloginName || val.yEmail)
                  }
                })
              })
            } else {
              const param = {
                id: this.id,
                productId: this.currentProductId,
                userList: [{ phone: val.xEmail }]
              }
              baseRequest('/user/rwMessageTob/isOkToB', param).then((response) => {
                if (!response.data.item.type) {
                  this.$Message.warning('存在已买课的手机号' + val.xEmail)
                } else {
                  this.hintMessage = ''
                  this.changePhone(this.hintMessage, val.xEmail, val.yloginName || val.yEmail)
                }
              })
            }
          }
        }
      },
      // 修改保存
      saveBtn(yphone, xphone) {
        if (this.validateChangePhone(yphone, xphone)) {
          if (this.currentProductId === 3) {
            baseRequest('/objective/rwGoalPermission/isFirstBuyPhone', { loginName: xphone }).then((response) => {
              if (response.data.item.result === '0') {
                this.hintMessage = '添加的手机号为续费学员,'
              } else if (response.data.item.result === '1') {
                this.hintMessage = '添加的手机号为首次购买,'
              }
              this.changePhone(this.hintMessage, xphone, yphone)
            })
          } else {
            const param = {
              id: this.id,
              productId: this.currentProductId,
              userList: [{ phone: xphone }]
            }
            baseRequest('/user/rwMessageTob/isOkToB', param).then((response) => {
              if (!response.data.item.type) {
                this.$Message.warning('存在已买课的手机号' + xphone)
              } else {
                this.hintMessage = ''
                this.changePhone(this.hintMessage, xphone, yphone)
              }
            })
          }
        }
      },
      // 修改手机号之后的校验
      validateChangePhone(yphone, xphone) {
        let validator = true
        if (!yphone) {
          validator = false
          this.$Message.warning('学员手机号不能为空')
        } else {
          if (!/^1[34578]\d{9}$/.test(xphone)) {
            validator = false
            this.$Message.warning('学员手机号格式不正确')
          } else if (yphone === xphone) {
            this.$Message.warning('手机号重复')
            validator = false
          }
        }
        return validator
      },
      // 邮箱校验
      validateChangeEmail(xEmail, yEmail) {
        let validator = true
        if (!yEmail) {
          validator = false
          this.$Message.warning('邮箱不能为空')
        } else {
          if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(xEmail)) {
            validator = false
            this.$Message.warning('邮箱格式不正确')
          } else if (xEmail === yEmail) {
            this.$Message.warning('邮箱重复')
            validator = false
          }
        }
        return validator
      },
      // 获取当前时间
      getcurrentTime() {
        const cutOffArr = this.cutOffDate.split('-')
        const cutOffYear = parseInt(cutOffArr[0])
        const cutOffMonth = parseInt(cutOffArr[1])
        const cutOffDay = parseInt(cutOffArr[2])
        var myDate = new Date()
        const currentDate = myDate.toLocaleDateString().split('/')
        const currentYear = parseInt(currentDate[0])
        const currentMounth = parseInt(currentDate[1])
        const currentDay = parseInt(currentDate[2])
        if (cutOffYear > currentYear) {
          this.forbid = false
        } else if (cutOffYear === currentYear) {
          if (cutOffMonth > currentMounth) {
            this.forbid = false
          } else if (cutOffMonth === currentMounth) {
            if (cutOffDay >= currentDay) {
              this.forbid = false
            } else {
              this.forbid = true
            }
          } else {
            this.forbid = true
          }
        } else {
          this.forbid = true
        }
      },
      studented() {
        this.item = []
        this.count = [{ phoneNum: null }]
        const param = {
          id: this.id
        }
        this.getOneToOneTobRelaList()
        // type 2是邮箱
        baseRequest('/user/rwMessageTob/tobType', param).then((response) => {
          this.phoneList = response.data.item
          for (var i = 0; i < this.phoneList.length; i++) {
            var obj = {}
            obj.xloginName = this.phoneList[i].loginName || ''
            obj.yloginName = this.phoneList[i].loginName || ''
            obj.xEmail = this.phoneList[i].email || ''
            obj.yEmail = this.phoneList[i].email || ''
            obj.message = this.phoneList[i].message
            obj.userId = this.phoneList[i].userId
            obj.type = this.phoneList[i].type
            obj.select = '1'
            this.item.push(obj)
          }
          console.log(this.item)

          this.$emit('tableRefresh', this.phoneList.length)
        })
      },
      addInput(a, b) {
        console.log(this.count)
        if (this.count.length > 0) {
          this.$Message.warning('请保存当前学员信息')
          return
        }
        this.count.push({ phoneNum: null })
      },
      // 添加
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        })
      },
      validateNum(num) {
        let validator = true
        if (!num) {
          validator = false
          this.$Message.warning('学员手机号或邮箱不能为空')
        } else {
          if (!/^1[34578]\d{9}$/.test(num) && !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(num)) {
            validator = false
            this.$Message.warning('学员手机号格式不正确')
          } else {
            var paramArr = []
            var dataArr = []
            for (const iterator of this.item) {
              paramArr.push(iterator)
            }
            paramArr.forEach(function(val, index) {
              if (val.yloginName === '') {
                dataArr.push(val.yEmail)
              } else {
                dataArr.push(val.yloginName)
              }
            })
            for (const iterator of this.count) {
              dataArr.push(iterator.phoneNum)
            }
            if (new Set(dataArr).size !== dataArr.length) {
              validator = false
              this.studented()
              this.$Message.warning('存在相同的学员手机号')
            }
          }
        }
        return validator
      },
      validatePhones(parma) {
        return new Promise((resovle, reject) => {
          baseRequest('/user/rwMessageTob/isOkToB', parma).then(response => {
            if (response.data.item.type) {
              resovle()
            } else {
              for (const key in response.data.item) {
                if (!response.data.item[key] && key !== 'type') {
                  this.$Message.warning(key.indexOf('@') > 0 ? '存在已买课的邮箱' : '存在已买课的手机号' + key.substring(1))
                  reject()
                  break
                }
              }
            }
          })
        })
      },
      submitForm(promptMessage, submitUrl) {
        this.$confirm(promptMessage + '确认要保存吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var paramArr = []
          for (const iterator of this.count) {
            const objl = {
              phone: iterator.phoneNum.indexOf('@') > 0 ? '' : iterator.phoneNum,
              email: iterator.phoneNum.indexOf('@') > 0 ? iterator.phoneNum : ''
            }
            paramArr.push(objl)
          }
          const parma = {
            id: this.id,
            productId: this.currentProductId,
            userList: paramArr,
            type: this.typeNum
          }
          this.validatePhones(parma).then(_ => {
            this.$emit('setAddLoading', true)
            baseRequest(submitUrl, parma).then((response) => {
              this.$Message.success('添加成功')
              this.studented()
            })
          })
        })
      },
      resetForm() {
        this.query1 = ''
        this.query = ['']
      }
    }
  }
</script>

<style lang="scss" scoped>
  .viewDetails {
    .coruseDetail {
      width: 570px;
      text-align: left;
      
      .other-info{
        margin-left: 30px;
        width: 512px;
        border: 1px solid #eee;
        background-color: #f9f9f9;
        border-radius: 10px;
        margin-bottom: 15px;
        padding: 7px 15px;
        .other-item{
          display: inline-block;
          margin-right: 70px;
            label{
              margin-right: 30px;
            }
        }
      }

      .detail-form {
        // margin-left: -84px;

        .search-label {
          margin-left: 50px;
        }

        .input-block {
          margin-left: 120px;
          width: 300px;
          margin-bottom: 5px
        }

        .inpt-title {
          width: 100px;
          text-align: right;
          display: block;
          float: left;
          font-size: 14px;
          font-family: PingFangSC-Semibold;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #222222;
          font-weight: bold;
          margin-right: 20px
        }

        .course-time {
          width: 250px;
        }
      }

    }

  }
</style>
<style lang="scss">
  .viewDetails {
    .el-form-item__error {
      margin-left: 164px;
    }
  }
</style>