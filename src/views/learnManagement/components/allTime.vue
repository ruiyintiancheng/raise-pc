<!--点击显示所有课时-->
<template>
    <div class="showtime">
        <el-popover
        placement="bottom"
        width="240"
        trigger="click">
        <el-table :data="timedData">
            <el-table-column width="100" property="START_TIME" label="开始日期" align="center"></el-table-column>
            <el-table-column width="100" property="END_TIME" label="结束日期" align="center"></el-table-column>
        </el-table>
        <el-button slot="reference" class="el-icon-arrow-down widthHandle" @click="showHandle"></el-button>
        </el-popover>
    </div>
</template>

<script>
import { baseRequest } from '@/api/base'
export default {
  props: {
    crouseId: {
      type: Number
    }
  },
  data() {
    return {
      timedData: []
    }
  },
  methods: {
    showHandle() {
      baseRequest('/user/rwMessageTob/allCourse', this.crouseId).then((response) => {
        this.timedData = response.data.item
        console.log(response.data.item)
        this.loading = false
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.showtime{
  .widthHandle{
    padding:0}
   
  
}
</style>