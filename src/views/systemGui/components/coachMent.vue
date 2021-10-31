/*
 * @Author: 教练管理
 * @Date: 2020-07-21 10:52:14 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-10-28 09:52:50
 */
<template>
    <div class="coachdistribution">
        <div>
           <h1 class="systitle">筛选查询</h1>
             <el-form  :inline="true"  ref="form" :model="form" label-width="80px" class="sysquery">
                      <el-form-item label="" class="formitem" v-if="maxper">
                          <span class="itemlabel">教练组长</span>
                          <el-input style="width: 326px;height: 40px;" placeholder="请填写用户名" v-model="form.userName"></el-input>
                      </el-form-item>
                      <el-form-item label="" class="formitem" v-if="maxper">
                          <span class="itemlabel">组长手机号</span>
                          <el-input style="width: 326px;height: 40px;" placeholder="请填写用户名" v-model="form.loginName"></el-input>
                      </el-form-item>
                      <el-form-item label="" class="formitem">
                          <span class="itemlabel">教练</span>
                          <el-input style="width: 326px;height: 40px;" placeholder="请填写用户名" v-model="form.coachName"></el-input>
                      </el-form-item>
                      <el-form-item label="" class="formitem">
                          <span class="itemlabel">教练手机号</span>
                          <el-input style="width: 326px;height: 40px;" placeholder="请填写用户名" v-model="form.coachLoginName"></el-input>
                      </el-form-item>
                      <el-form-item label="" class="formitem" v-if="maxper">
                          <div>&nbsp;</div>
                                  <el-checkbox  v-model="form.managerType">未分配教练</el-checkbox>
                      </el-form-item>
                       <div class="operation">
                             <el-button @click="searchOption"  style="width: 90px;height: 30px;line-height:0.5;margin-right:20px;" type="primary">查询</el-button>
                       </div>
             </el-form>
        </div>
        <div style="width: 100%;height: 1px;border: dashed  1px #aaaaaa;margin-top:20px;margin-bottom:23px"></div>
      <div>
           <h1 class="systitle" style="margin-bottom:20px">数据列表</h1>
                  <el-table
                         v-loading="loading"
                         :height="tableHight"
                         class="table-main"
                          :data="tableData"
                         row-key="planId"
                         border
                         default-expand-all
                         style="width: 100%">
                             <el-table-column
                            label=" "
                              align="center" 
                             type="index"
                             width="50">
                           </el-table-column>
      
            <el-table-column
            prop="userName"
            label="教练组张"
            align="center" >
            </el-table-column>
            <el-table-column
            prop="loginName"
            align="center"
            label="组长电话">
            </el-table-column>
            <el-table-column
            prop="coachName"
            align="center"
            label="教练">
            </el-table-column>
            <el-table-column
            prop="coachLoginName"
            align="center"
            label="教练电话">
            </el-table-column>
            <el-table-column
                align="center"
                v-if="maxper"
                width="200">
                <!-- <template slot="header">
                   <a class="table-header-title"><svg-icon  icon-class="icon-add" /> 添加</a>
                </template> -->
                <template slot-scope="scope">
                     <el-button
                    @click.native.prevent="deleteRow(scope.row)"
                    type="primary"
                    size="mini">
                    {{scope.row.userName?'修改':'添加'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
         <sur-pagination :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination>
      </div>
      <!-- 达成空间 -->
      <el-dialog
          append-to-body
          :title="'确认达成'"
          :visible.sync="visible"
          class="dialog-main reach-dialog"
          top="10%"
          width="400px"
          destroy-on-close
          :close-on-click-modal="false">
            <el-form ref="form-reach" :model="formData">
                <el-form-item prop="reachData" label="">
                       <el-radio-group v-model="formData.coaching">
                           <el-radio v-for="(item,index) in leaderList"
                           :key="index" :label="item.userId">{{item.userName}}</el-radio>
                         </el-radio-group>
                </el-form-item>
            </el-form>
            <div style="color:#fb664a;text-align: center;">{{errormsg}}</div>
         <span slot="footer">
            <!-- <span class="dialog-error-msg">请填写达成日期</span> -->
            <el-button  @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="saveHandle">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
export default {
  props: {
    roleId: [Number, String],
    userPhone: [Number, String],
    maxper: [Boolean]
  },
  data() {
    return {
      errormsg: '',
      form: {
        coachName: '',
        coachLoginName: '',
        userName: '',
        loginName: '',
        managerType: false
      },
      formData: {
        coaching: ''
      },
      leaderList: null,
      coachId: null,
      loading: false,
      visible: false,
      tableData: [],
      pageNo: 1,
      total: null,
      pageSize: 15
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 400
    }
  },
  mounted() {
    this.searchOption()
    this.getLeaderList()
  },
  methods: {
    getLeaderList() { // 获取教练组长
      baseRequest('/user/rwRole/getCoachManager').then(response => {
        this.leaderList = response.data.item
      })
    },
    saveHandle() { // 提交
      if (this.formData.coaching) {
        baseRequest('/user/rwRole/setFreeCoach', { roles: this.coachId, userId: this.formData.coaching }).then(response => {
          this.$Message.success('操作成功!')
          this.visible = false
          this.searchOption()
        })
      } else {
        this.errormsg = '请选择教练'
        return
      }
    },
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      param.coachName = this.form.coachName
      param.coachLoginName = this.form.coachLoginName
      param.userName = this.form.userName
      param.loginName = this.form.loginName
      param.managerType = this.form.managerType ? '1' : '0'
      if (!this.maxper) {
        param.loginName = this.userPhone
      }
      baseRequest('/user/rwUser/getCoachAndManager', param).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
      // setTimeout(_ => {
      //   this.tableData = [{
      //     planId: 1,
      //     roleName: '带家人去旅游',
      //     planRangeName: '家庭与天伦',
      //     updateTime: '2020-06-29',
      //     endDate: '2021-06-29'
      //   }, {
      //     planId: 2,
      //     roleName: '健身跑步',
      //     planRangeName: '身体与健康',
      //     updateTime: '2020-06-29',
      //     endDate: '2021-06-29'
      //   }, {
      //     planId: 2222,
      //     roleName: '健身跑步',
      //     planRangeName: '身体与健康',
      //     updateTime: '2020-06-29',
      //     endDate: '2021-06-29'
      //   }]
      //   this.total = 500
      //   this.pageSize = 15
      //   this.loading = false
      // }, 1000)
    },
    deleteRow(row) {
      if (row.coachLoginName) {
        this.coachId = row.coachId
        this.formData.coaching = row.userId
      } else {
        this.coachId = null
        this.this.formData.coaching = ''
      }
      this.errormsg = ''
      //   this.roleId = row.roleId
      //   this.addform
      //   this.errMsg = ''
      //   this.addform.oldphone = row.roleName
      //   this.addform.newphone = ''
      this.visible = true
      console.log(row)
    },
    handleSizeChange(val) { // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) { // 分页
      this.pageNo = val
      this.searchOption(true)
    }
  }
}
</script>
<style lang="scss">
.dialog-main.reach-dialog{
    .el-dialog{
        height: auto;   
    }
}
.coachdistribution{
    width: 100%;
    height: 100%;
    padding-right: 20px;
       .systitle{
                   	// width: 56px;
	height: 14px;
	font-family: PingFangSC-Semibold;
	font-size: 14px;
	font-weight: 800;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #222222;
               }
                .sysquery{
                //    width: 1392px;
	                // height: 109px;
                    margin-top: 25px;
                    .operation{
                        text-align: right;
                        margin-top: 20px;
                    }
                .formitem{
                     width: 326px;
	                //  height: 59px;
                     margin-right: 24px;
                     margin-bottom: 0;
                     .itemlabel{
                        width: 38px;
	                    height: 13px;
	                    font-family: PingFangSC-Regular;
	                    font-size: 13px;
	                    font-weight: 400;
	                    font-stretch: normal;
	                    line-height: 22px;
	                    letter-spacing: 0px;
	                    color: #222222;
                     }
                }
                .formitem:last-child{
                    margin-right: 0;
                }
               }
}
</style>