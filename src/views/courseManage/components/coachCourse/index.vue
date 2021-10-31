<template>
    <div class="stu-management" style="padding:24px 23px" :style="{minHeight:tableHight + 'px'}">
        <div style="width: 1393px;">
            <h1 class="systitle">教练课程管理</h1>
            <el-form  :inline="true"  ref="form" :model="form" label-width="80px" class="sysquery">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="" class="formitem">
                            <div>教练名</div>
                            <el-input placeholder="请输入教练名" style="width:280px" clearable v-model="form.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="" class="formitem">
                            <div>教练手机号</div>
                            <el-input placeholder="请输入手机号" style="width:280px" clearable v-model="form.loginName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="" class="formitem">
                            <div>教练邮箱</div>
                            <el-input placeholder="请输入邮箱" style="width:280px" clearable v-model="form.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="" class="formitem">
                            <div>项目状态</div>
                            <el-select
                                    v-model="form.status"
                                    placeholder="请选择"
                                    style="width:280px"
                                    clearable>
                                    <el-option :value="item.value" :label="item.label" v-for="(item,index) in classState" :key="index"></el-option>
                                </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="19">
                        <el-form-item label="" class="formitem">
                            <div>项目开始时间</div>
                            <el-date-picker v-model="form.startTime"
                                style="margin-right:10px;width:280px;"
                                class="learn-input"
                                type="date"
                                value-format='yyyy-MM-dd'
                                placeholder="请选择开始日期"
                               >
                            </el-date-picker>
                            <span style="margin-right:10px;">至</span>
                            <el-date-picker v-model="form.startTimeOne"
                                  style="width: 280px;"
                                  class="learn-input"
                                  type="date"
                                  value-format='yyyy-MM-dd'
                                  placeholder="请选择结束日期"
                                  >
                              </el-date-picker> 
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item style="display:flex;justify-content:flex-end;margin-top:36px" class="formitem">
                        <el-button style="width: 90px;height: 30px;line-height:0.5;" type="primary" @click="searchOption()">
                        查询
                      </el-button>
                      <el-button :loading='downLoading' style="width: 90px;height: 30px;line-height:0.5;" @click="downLoad">
                        下载
                      </el-button>
                      </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div style="width: 1392px;height: 1px;border: dashed 1px #aaaaaa;margin-top:20px;margin-bottom:23px"></div>
        <div style="width:1393px"> 
            <h1 class="systitle" style="margin-bottom:20px">数据列表</h1>
                <el-table
                    v-loading="loading"
                    class="table-main"
                    :data="tableData"
                    row-key="planId"
                    border
                    default-expand-all
                    >
                    <el-table-column
                        label=""
                        align="center" 
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        label="教练名"
                        prop="userName"
                        align="center" 
                        >
                    </el-table-column>
                    <el-table-column
                        label="教练手机号"
                        prop="loginName"
                        align="center" 
                        >
                    </el-table-column>
                    <el-table-column
                        label="教练邮箱"
                        :show-overflow-tooltip="true"
                        prop="email"
                        align="center" 
                        >
                    </el-table-column>
                    <el-table-column
                        label="产品"
                        prop="productName"
                        align="center" 
                        >
                    </el-table-column>
                     <el-table-column
                        label="项目开始时间"
                        prop="startTime"
                        align="center" 
                        >
                    </el-table-column>
                    <el-table-column
                        label="班级人数"
                        prop="sNum"
                        align="center" 
                        >
                    </el-table-column>
                    <el-table-column
                        label="项目状态"
                        prop="status"
                        align="center" 
                        >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center" 
                        width="150" 
                        >
                    <template slot-scope="scope">
                        <el-button
                        style="margin:0 auto;width: 50px;height: 28px;line-height:0.5;padding:0"
                        type="primary"
                        :disabled="scope.row.status==='已结课'? true:false"
                        @click="setHandle(scope.row)"
                        size="small">
                            设置
                        </el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <sur-pagination :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange">
                </sur-pagination>
        </div>
        <setButton ref="setting" :oldUserId='oldUserId' @refresh='refresh'></setButton>
    </div>
</template>

<script>
import { baseSearch } from '../../../../api/base'
import { download } from '@/utils/download'
import setButton from './setClass'
export default {
  components: {
    setButton
  },
  data() {
    return {
      downLoading: false,
      loading: false,
      oldUserId: {},
      form: {
        userName: '',
        loginName: '',
        email: '',
        status: '',
        startTime: '',
        startTimeOne: ''
      },
      tableData: [],
      classState: [
        { value: 1, label: '进行中' },
        { value: 2, label: '已结课' },
        { value: 3, label: '未开始' }
      ],
      pageNo: 1,
      total: 10,
      pageSize: 10,
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.form.startTimeOne !== '') {
            let date = this.form.startTimeOne + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() > newDate
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.form.startTime !== '') {
            let date = this.form.startTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate || time.getTime() > Date.now()
          }
        }
      }
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 158
    }
  },
  created() {
    this.searchOption()
  },
  methods: {
    downLoad() {
      this.downLoading = true
      const params = {
        userName: this.form.userName,
        loginName: this.form.loginName,
        email: this.form.email,
        startTime: this.form.startTime,
        startTimeOne: this.form.startTimeOne,
        status: this.form.status
      }
      download('/course/courses/userExport', params, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    },
    refresh() {
      this.searchOption()
    },
    searchOption(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      const data = Object.assign(this.form, params)
      baseSearch('/course/courses/userAll', data).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageNo = response.data.pageNo
        this.loading = false
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.searchOption(true)
    },
    setHandle(row) {
      this.oldUserId = row
      this.$refs.setting.dialogsalejsxq = true
      this.$refs.setting.searchOption(row)
    }
  }
}
</script>

<style lang="scss" scoped>
    .stu-management{
      .formitem{
        margin-bottom:0
      }
        width: 1440px;
        background-color: #ffffff;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 0px 10px 10px 10px;
        margin-bottom: 50px;
        .systitle{
            height: 14px;
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            font-weight: 800;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
        }
        .sysquery{
            width: 1392px;
            margin-top: 25px;
            .operation{
                text-align: right;
            }
        }
                .box{
                    .boxcontent{
                        background-color: #ffffff;
                        .userinfo{
                        height:32px;
                        line-height: 32px;
                        font-size: 16px;
                        }
                    .login-error{
                        height: 15px;
                        text-align: center;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 25px;
                        letter-spacing: 0px;
                        color: #fb664a;
                        margin-top: -3px;
                    }
                }
                .addcommit{
                    width: 90px;
                    height: 30px;
                    line-height: .5;
                    position: absolute;
                    right: 30px;
                    bottom: 15px;
                    background-color: #00afff;
                    border-radius: 4px;
                }
            }
    .zu-zhang{
        .zu-zhang-radio{
        margin-top:10px;
        }
    }
    
}
</style>