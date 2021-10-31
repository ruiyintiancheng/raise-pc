<template>
    <div class="bulktable">
       <el-form ref="form" :inline="true" :model="formData" lable-width="80px">
         <el-form-item label="手机号" prop="loginName">
            <el-input v-model.number="formData.loginName" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" style="width:280px" clearable></el-input>
         </el-form-item>
         <el-form-item label="邮箱">
           <el-input v-model.trim="formData.email" style="width:280px" maxlength="32" clearable></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" size="mini" @click="searchOption">查询</el-button>
         </el-form-item>
        
       </el-form>
         <el-table
                v-loading="loading"
                :height="tableHeight + 'px'"
                class="table-main"
                :data="tableData"
                border
                default-expand-all
                style="width: 100%">
                <el-table-column
                label=""
                fixed="left"
                align="center" 
                type="index"
                width="50">
                </el-table-column>
            <el-table-column
            label="用户名"
            align="center"
            prop="userName" >
            </el-table-column>
            <el-table-column
            label="手机号"
            align="center"
            width="130"
            prop="loginName" >
            </el-table-column>
            <el-table-column
            label="邮箱"
            align="center"
            :show-overflow-tooltip="true"
            width="200"
            prop="email" >
            </el-table-column>
            <el-table-column
            label="购买课时"
            width="180"
            align="center"
            prop="startTime" >
            </el-table-column>
            <el-table-column
            label="支付状态"
            align="center"
            prop="status" >
            <template slot-scope="scope">
              {{statusOptions[scope.row.status]}}
            </template>
            </el-table-column>
            <el-table-column
            label="是否退款"
            align="center"
            prop="refund" >
            <template slot-scope="scope">
              {{refundOptions[scope.row.refund]}}
            </template>
            </el-table-column>
            <el-table-column
            label="支付方式"
            align="center"
            prop="qrValue" >
            </el-table-column>
            <el-table-column
            label="支付金额"
            align="center"
            prop="txnAmt" >
            </el-table-column>
         </el-table>
                  <!-- <sur-pagination :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination> -->
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
export default {
  props: {
    groupId: [Number, String]
  },
  data() {
    return {
      formData: {
        loginName: '',
        email: ''
      },
      loading: false,
      tableData: [],
      // 支付状态 0:失败 1：成功 2:待支付
      statusOptions: {
        '0': '失败',
        '1': '成功',
        '2': '待支付'
      },
      // 是否退款 0否 1是
      refundOptions: {
        '0': '否',
        '1': '是'
      }
    }
  },
  computed: {
    tableHeight() {
      return this.$store.state.app.containHeight * 0.5
    }
  },
  created() {
    this.searchOption()
  },
  methods: {
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const params = {
        groupId: this.groupId
      }
      params.loginName = this.formData.loginName
      params.email = this.formData.email
      baseRequest('/user/rwGroupInfo/orderIsGroup', params).then(response => {
        this.tableData = response.data.item
      }).finally(_ => {
        this.loading = false
      })
    }
  }
}
</script>