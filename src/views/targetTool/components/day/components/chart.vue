/** 当日行程svg图 */
<template>
  <div ref="main" class="tt-body">
    <div class="mask" v-if="loading">
      <span class="el-icon-loading"></span>
    </div>
    <svg ref="chart" width="100%" class="chart">
      <!-- 时间分割线 -->
      <g style="transform: translate(60px, 20px);">
        <g
          v-for="(item, i) in times"
          :key="i"
          :style="{ transform: `translate(0,${i * h}px)` }"
        >
          <text
            x="-14"
            y="0"
            style="dominant-baseline: middle; text-anchor: end;"
          >
            {{ item.time }}
          </text>
          <line class="line" x1="0" y1="0" x2="380" y2="0" />
          <line
            v-if="i < times.length - 1"
            class="other-line"
            x1="0"
            y1="13"
            x2="380"
            y2="13"
          />
          <line
            v-if="i < times.length - 1"
            class="other-line"
            x1="0"
            y1="26"
            x2="380"
            y2="26"
          />
        </g>
      </g>
      <!-- <g style="transform: translate(60px, 20px);">
        <g v-for="(item, i) in times" :key="i">
          <line
            class="line"
            x1="0"
            y1="0"
            :x2="item.x"
            y2="0"
            :style="{ transform: `translate(0px,${}px)` }"
          />
          <line
            class="line"
            x1="0"
            y1="0"
            :x2="item.x"
            y2="0"
            :style="{ transform: `translate(0px,${item.y1}px)` }"
          />
        </g>
      </g> -->
      <!-- 矩形 -->
      <g style="transform: translate(60px, 20px);">
        <g
          v-for="(item, i) in chartData"
          :key="i"
          :style="{ transform: `translate(${item.x}px,${item.y}px)` }"
        >
          <rect
            :class="`${item.type} ${item.shade ? 'shade' : ''}`"
            :width="330 / 2 - 20"
            :height="item.height"
            x="0"
            y="0"
          />
          <text x="73" :y="item.height >> 1" dy="0.35em" text-anchor="middle">
            {{ item.name }}
          </text>
          <title>{{ item.name }}</title>
        </g>
      </g>
      <!-- 其它 -->
      <g style="transform: translate(60px, 20px);">
        <g
          v-for="(item, i) in otherData"
          :key="i"
          :style="{ transform: `translate(${item.x - 5}px,${item.y + 5}px)` }"
          style="cursor: pointer;"
          @click="handleOther(item.list)"
        >
          <rect class="other" width="30" :height="item.height" x="0" y="0" />
          <text
            x="15"
            :y="item.height >> 1"
            dy="0.35em"
            text-anchor="middle"
            style="fill: #00afff;"
          >
            {{ `+${item.name}` }}
          </text>
        </g>
      </g>
    </svg>
    <el-dialog
      append-to-body
      :title="dailyDate"
      :visible.sync="otherVisable"
      class="dialog-main height70 no-footer"
      top="7%"
      width="400px"
      destroy-on-close
      :close-on-click-modal="false"
      >
      <div class="chart-other-list">
        <div class="list-item" v-for="(item,index) in otherList" :key="item+index">
          <div class="other-point">●</div>
          <div class="other-durning">{{`${item.startDate} - ${item.endDate}`}}</div>
          <div class="other-contain">{{item.dailyMatter}}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
export default {
  components: {},
  props: {
    dailyDate: String
  },
  data() {
    return {
      chartData: [],
      otherData: [],
      step: 30,
      h: 40,
      times: [],
      otherVisable: false,
      otherList: [],
      loading: false
    }
  },
  computed: {},
  created() {
    this.getData()
    this.getTimes()
  },
  mounted() {
    const height = this.$refs.chart.getBBox().height
    this.$refs.chart.style.height = height + this.h
    this.$refs.main.scrollTop = this.comHeight([8, 0])
  },
  methods: {
    getData() {
      const param = {
        dailyDate: this.dailyDate
      }
      this.loading = true
      baseRequest('/objective/rwDaily/selectTrip', param).then(response => {
        const data = response.data.item
        // const data = [
        //   { startDate: "00:00", endDate: "00:30", dailyMatter: "1" },
        //   { startDate: "00:00", endDate: "00:30", dailyMatter: "2" },
        //   { startDate: "00:00", endDate: "01:30", dailyMatter: "3" },
        //   { startDate: "01:00", endDate: "01:30", dailyMatter: "3" },
        //   { startDate: "01:00", endDate: "04:30", dailyMatter: "3" },
        //   { startDate: "02:00", endDate: "02:30", dailyMatter: "3" },
        //   { startDate: "03:00", endDate: "03:30", dailyMatter: "31" },
        //   { startDate: "03:00", endDate: "03:00", dailyMatter: "32" },
        //   { startDate: "03:00", endDate: "04:30", dailyMatter: "3" }
        // ];
        this.loading = false
        this.chartData = this.layout(data)
      })
    },
    handleOther(list) {
      this.otherList = list
      this.otherVisable = true
    },
    layout(data) {
      const chartData = []
      let temp_left = 0
      let temp_right = 0

      const other = new Map()

      data.forEach((d, i) => {
        d.x = 0
        d.y = this.comHeight(getTime(d.startDate))
        d.y1 = this.comHeight(getTime(d.endDate))
        d.height = d.y1 - d.y

        d.name =
          d.dailyMatter.length > 10
            ? d.dailyMatter.slice(0, 10) + '...'
            : d.dailyMatter

        if (temp_left === 0 || d.y > temp_left) {
          d.type = 'left'
          temp_left = d.y1
          chartData.push(d)
        } else if (temp_right === 0 || d.y > temp_right) {
          d.type = 'right'
          d.x = 330 / 2
          temp_right = d.y1
          chartData.push(d)
        } else {
          const timeArea = this.comTimeArea(d.startDate)
          if (other.has(timeArea)) {
            other.get(timeArea).push(d)
          } else {
            other.set(timeArea, [d])
          }
        }
      })

      for (const key of other.keys()) {
        const value = other.get(key)
        console.log(key, value)
        this.otherData.push({
          x: 330,
          y: key * 40,
          height: 30,
          type: 'other',
          name: value.length,
          list: value
        })
      }

      // for (let i = 0; i < data.length; i++) {
      //   const d = data[i];
      //   d.x = 0;
      //   d.y = this.comHeight(getTime(d.startDate));
      //   d.y1 = this.comHeight(getTime(d.endDate));
      //   d.height = d.y1 - d.y;
      //   d.type = "left";
      //   d.name =
      //     d.dailyMatter.length > 10
      //       ? d.dailyMatter.slice(0, 10) + "..."
      //       : d.dailyMatter;

      //   // 左右分布
      //   if (i > 0 && d.y <= data[i - 1].y1 && data[i - 1].type === "left") {
      //     d.x = 194;
      //     d.type = "right";
      //   }

      //   // 交叠的透明处理
      //   if (d.type === "left") {
      //     if (i > 0 && d.y <= temp_left) {
      //       d.shade = true;
      //     }
      //     temp_left = d.y1;
      //   } else {
      //     if (i > 0 && d.y <= temp_right) {
      //       d.shade = true;
      //     }
      //     temp_right = d.y1;
      //   }
      // }
      return chartData

      function getTime(time) {
        const t = time.split(':')
        return [parseInt(t[0]), parseInt(t[1])]
      }
    },
    comHeight(time) {
      const dh = time[0] * (60 / this.step) + time[1] / this.step
      // 40 间隔高度
      return dh * 40
    },
    // 计算时间区域
    comTimeArea(startDate) {
      const t = startDate.split(':')
      const min = parseInt(t[0]) * 60 + parseInt(t[1])
      return Number.parseInt(min / this.step)
    },
    // 获取时间区域
    getTimes() {
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j += this.step) {
          this.times.push({
            hour: i,
            min: j,
            time: this.formatTime(i, j)
          })
        }
      }
      this.times.push({ hour: 24, min: 0, time: '24:00' })
    },
    // 解析时间
    parseTime() {},
    // 时间格式化
    formatTime(hour, min) {
      return `${formatNum(hour)}:${formatNum(min)}`

      function formatNum(num) {
        return num < 10 ? '0' + num : num
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tt-body {
  height: 100%;
  overflow-y: auto;
  padding: 32px 30px;
}
.mask{
  position: absolute;
  width: calc(100%);
  height: 100%;
  background-color: red;
  top: 50px;
  left: 0;
  background-color: #ccc;
  opacity: 0.8;
  text-align: center;
  .el-icon-loading{
    font-size: 40px;
    margin-top: 200px;
  }
}


.chart {
  // background-color: #;
  .line {
    stroke: #dddd;
    stroke-width: 2;
  }
  .other-line {
    stroke: #dddd;
    stroke-width: 1;
    opacity: 0.5;
  }
  .rect-text {
    font-size: 18px;
    color: #222222;
  }
  .left {
    fill: #99dfff;
  }
  .right {
    fill: #ffc999;
  }
  .other {
    fill: #e0f0ff;
  }
  .shade {
    opacity: 0.8;
  }
}
</style>
<style lang="scss">
.chart-other-list{
  .list-item{
    margin-left: 22px;
    position: relative;
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 1px solid #ddd;
    .other-point{
      position: absolute;
      top: 10px;
      left: -22px;
    }
    .other-contain{
      font-size: 16px;
      color: #222222;
      line-height: 22px;
      margin-top: 5px;

    }
    .other-durning{
      color: #aaa;
      font-size: 14px;
    }
  }
}
</style>