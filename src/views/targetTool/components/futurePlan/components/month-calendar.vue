/** 月日历 */
<template>
  <div class="tt-calendar">
    <div class="tt-title">{{month}}月</div>
    <div class="tt-body clearfix">
      <div>
        <div class="calend-week">日</div>
        <div class="calend-week">一</div>
        <div class="calend-week">二</div>
        <div class="calend-week">三</div>
        <div class="calend-week">四</div>
        <div class="calend-week">五</div>
        <div class="calend-week">六</div>
      </div>
      <div v-for="i in blank" :key="'blank' + i" class="calend-cell" />
      <div v-for="i in (42 - blank)" :key="i">
        <div v-if="i <= days.length" class="calend-cell" :class="[days[i - 1].align]">
          <div class="calend-center" :class="[days[i - 1].type]" @click="handleClick(i)">
            {{days[i - 1].num}}
          </div>
        </div>
        <div v-else class="calend-cell" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: { },
  props: {
    viewYear: {
      type: [String, Number],
      default: null
    },
    month: [String, Number],
    days: Array
  },
  data() {
    return {
    }
  },
  computed: {
    blank() {
      const date = new Date(parseInt(this.viewYear), parseInt(this.month) - 1, 1)
      const week = date.getDay()
      // return parseInt((week - 1 + 7) % 7) // 周一开头
      return parseInt((week + 7) % 7) // 周日开头
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    handleClick(day) {
      this.$emit('handleClick', this.month, day, this.days[day - 1])
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../font.scss";
  .tt-calendar {
    width: 408px;
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

  .calend-week {
    position: relative;
    float: left;
    width: 58px;
    line-height: 2;
    border-right: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    text-align: center;
  }

  .calend-cell {
    width: 58px;
    height: 58px;
    border-right: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    float: left;
    position: relative;
    padding: 11.5px;
    &.end {
      padding: 11.5px 11.5px 11.5px 0;
      .calend-center {
        border-radius: 0 10px 10px 0;
      }
    }
    &.start {
      padding: 11.5px 0 11.5px 11.5px;
      .calend-center {
        border-radius: 10px 0 0 10px;
      }
    }
    &.all {
      padding: 11.5px 0;
      .calend-center {
        border-radius: 0;
      }
    }

    .calend-center {
      width: 100%;
      background-color: #eeeeee;
      border-radius: 10px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;

      &.one {
        background-color: #00afff;
        color: #ffffff;
      }
      &.two {
        background-color: #00afff;
        box-shadow: 0 -18px 0 0 #ff7700 inset;
        color: #ffffff;
      }
    }
  }
</style>