/** 月日历 */
<template>
  <div class="tt-calendar">
    <div class="tt-title">{{label}}</div>
    <div class="tt-body clearfix">
      <div v-for="i in grids" :key="i" class="calend-cell">
        <div v-if="i <= months" class="calend-center child-center" :class="{ active: isActive(i)}">
          {{i}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: { },
  props: {
    label: String,
    months: Number,
    days: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    actives() {
      return new Set(this.days)
    },
    grids() {
      return this.months > 30 ? 40 : 30
    }
  },
  watch: {
  },
  created() {
  },
  mounted() { },
  methods: {
    isActive(val) {
      return this.actives.has(val)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../font.scss";
  .tt-calendar {
    width: 602px;
    user-select: none;
    background-color: #ffffff;
    .tt-title {
      height: 44px;
      background-color: #fafafa;
      border-radius: 10px 10px 0px 0px;
      border-bottom: 1px solid #dddddd;
      border: 1px solid #dddddd;
      margin-right: 1px;
      line-height: 44px;
      padding-left: 10px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      user-select: none;
    }
    .tt-body {
      position: relative;
      border-left: 1px solid #dddddd;
    }
  }

  .calend-cell {
    width: 60px;
    height: 60px;
    border-right: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;

    float: left;
    position: relative;
    .calend-center {
      width: 36px;
      height: 36px;
      background-color: #eeeeee;
      border-radius: 10px;
      line-height: 36px;
      text-align: center;

      &.active {
        background-color: #00afff;
        color: #ffffff;
      }
    }
  }
</style>