<template>
        <div class="first-trial">
            <div style="margin:0 auto;color:#00afff">
                <p>您的申请正在审核中请耐心等待。</p>  
                <p>申请时间为:{{this.applyTime}}</p>
            </div>
             <div class="trialBtn">
                <span slot="footer" >
                    <el-button type="primary" disabled>等待审核</el-button>
                </span>
            </div>
        </div>
</template>

<script>
import { baseSearch } from '@/api/base'
export default{
  data() {
    return {
      applyTime: null
    }
  },
  created() {
    baseSearch('/user/rwCoachApply/getApplyInfo').then(response => {
      this.loading = false
      this.applyTime = response.data.item.applyTime
    })
  }
}
</script>

<style lang="scss" scoped>
    .first-trial{
        padding:50px;
        border-radius: 10px;
            background-color: #fff;
            p{line-height:30px;text-align: center;font-size:20px}
            .trialBtn{
                margin-top:30px
            }
        }
</style>