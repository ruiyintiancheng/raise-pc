<template>
        <div class="confirm-coach">
            <div style="margin:0 auto;color:#00afff">
                <p>您已经是{{this.message}}，无需重新申请</p>  
            </div>
        </div>
</template>

<script>
import { baseSearch } from '@/api/base'
export default{
  data() {
    return {
      name: null,
      coach: false,
      ambassador: false,
      message: null
    }
  },
  created() {
    baseSearch('/user/rwUser/getPersonalUserInfo').then(response => {
      this.loading = false
      this.coach = response.data.item.coach
      this.ambassador = response.data.item.ambassador
      if (this.coach) {
        this.message = '教练'
      }
      if (this.ambassador) {
        this.message = '大使'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
    .confirm-coach{
        padding:50px;
        border-radius: 10px;
            background-color: #fff;
            p{line-height:20px;text-align: center;font-size:20px}
        }
</style>