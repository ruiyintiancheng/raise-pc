/** 弹出框-产品说明 */
<template>
  <div>
    <ul class="popover">
      <li>
        <p><span class="order">1.</span>计划购买First Step线上辅导项目的学员，可发起拼团</p>
      </li>
      <li>
        <p><span class="order">2.</span>同一时段满3人参与学习、即拼团成功，4人为成团上限</p>
      </li>
      <li>
        <p><span class="order">3.</span>发起者和参与者将同时享受培训费减免政策：<br/>
          <span class="tab">●完成4人拼团，将享受每人减免400元优惠</span><br/>
          <span class="tab">●完成3人拼团，将享受每人减免300元优惠</span>
        </p>
      </li>
      <li><p><span class="order">4.</span>拼团在24小内未达到拼团人数，拼团失败，支付金额将在拼团失败后24小时内按支付方式退回您的账户。</p></li>
      <li><p><span class="order">5.</span>一天内最多可拼团一次。</p></li>
    </ul>
  </div>
</template>

<script>
export default {
  components: { },
  props: { },
  data() {
    return {

    }
  },
  computed: { },
  created() { },
  mounted() { },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .popover {
    padding: 5px 10px;
    line-height: 150%;
    color: #222222;
    font-family: PingFangSC-Regular;
	  font-size: 14px;
    letter-spacing: 1px;
    .order {
      margin-left: -1em;
    }
    .tab {
      margin-left: 1em;
    }
  }

</style>

