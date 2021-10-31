<template>
  <div class="cj-content" :style="{minHeight:tableHight + 'px'}">
    <div class="box-title">
      <h4 class="h4_text1">我的成就</h4>
    </div>
    <div class="box-title2">
      <h4 class="title-text2">课程学习</h4>
    </div>
    <div v-if="!item || item.length <= 0" class="emplty-crouse">
      您还没有学习成就
    </div>
    <div class="boxStyle-data" v-for="(value, key, index) in item" :key="index">
      <div class="box-kcxxIcon">
        <svg-icon
          icon-class="icon-chengjiu-jin"
          class="icon-chengjiu-jin"
        ></svg-icon>
      </div>
      <div class="kcxxtext">{{ value.productName }}</div>
      <div class="kcxxdata">{{ value.startDate }}~{{ value.endDate }}</div>
    </div>
    <template v-if="jiaolian.some(item => roles.find(it => it === item))">
      <div class="box-title3">
        <h4 class="h4_text3">授课成就</h4>
      </div>
      <el-form :inline="true" :model="form">
        
        <el-form-item style="margin-top: 23px">
          <el-select v-model="value" placeholder="请选择时间单位" @change="liduChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 年 -->
        <el-form-item
          style="margin-top: 23px; margin-left: 24px"
          v-show="value === '4'"
        >
          <el-date-picker
            class="data-item"
            type="year"
            :clearable="false"
            placeholder="选择年开始"
            :picker-options="pickerOptionsStart"
            value-format="yyyy"
            format="yyyy"
            v-model="form.startTime"
          >
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            class="data-item"
            :clearable="false"
            type="year"
            placeholder="选择年结束"
            :picker-options="pickerOptionsEnd"
            value-format="yyyy"
            format="yyyy"
            v-model="form.endTime"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 季度 -->
        <el-form-item
          v-if="value == '3'"
          style="margin-top: 23px; margin-left: 24px"
        >
          <quarter v-model="form.startTimejd"  @changeQuarter="changeQuarter"/>
          <el-form-item style="margin-left: 224px; margin-top: -35px">
            <span>至</span>
          </el-form-item>
          <quarter
            v-model="form.endTimejd"
            @changeQuarter="changeQuarterEnd"
            style="margin-left: 245px; margin-top: -73px"
          />
        </el-form-item>
        <!-- 月 -->
        <el-form-item
          style="margin-top: 23px; margin-left: 24px"
          v-if="value == '2'"
        >
          <el-date-picker
            class="data-item"
            type="month"
            :clearable="false"
            placeholder="选择月开始"
            :picker-options="pickerOptionsStartmonth"
            value-format="yyyy-MM"
            format="yyyy-MM"
            v-model="form.startTimemonth"
          >
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            type="month"
            :clearable="false"
            placeholder="选择月结束"
            :picker-options="pickerOptionsEndmonth"
            value-format="yyyy-MM"
            format="yyyy-MM"
            v-model="form.endTimemonth"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 日 -->
        <el-form-item
          style="margin-top: 23px; margin-left: 24px"
          v-if="value == '1'"
        >
          <el-date-picker
            type="date"
            :clearable="false"
            placeholder="选择日开始"
            :picker-options="pickerOptionsStartdate"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="form.startTimedate"
          >
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            type="date"
            :clearable="false"
            placeholder="选择日结束"
            :picker-options="pickerOptionsEnddate"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="form.endTimedate"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left: 2px; margin-top: 20px">
          <el-button type="primary" size="medium" @click="achievesearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <div class="emplty-crouse" v-show="myXdata.length===0" >暂无授课成就</div>
      <div v-show="myXdata.length!==0" id="main" style="height: 399px; top: -35px"></div>
    </template>
    <template v-if="dashi.some(item => roles.find(it => it === item))">
    <!-- <template > -->
      <div class="box-title4">
        <h4 class="h4_text4">销售成就</h4>
      </div>
      <el-form :inline="true" :model="form2">
        <el-form-item style="margin-top: 23px">
          <el-select v-model="value2" placeholder="请选择时间单位" @change="liduChange2">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 年 -->
        <el-form-item
          style="margin-top: 23px; margin-left: 24px"
          v-show="value2 === '4'"
        >
          <el-date-picker
            class="data-item"
            type="year"
            :clearable="false"
            placeholder="选择年开始"
            :picker-options="pickerOptionsStart"
            value-format="yyyy"
            format="yyyy"
            v-model="form2.startTime"
          >
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            class="data-item"
            type="year"
            :clearable="false"
            placeholder="选择年结束"
            :picker-options="pickerOptionsEnd"
            value-format="yyyy"
            format="yyyy"
            v-model="form2.endTime"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 季度 -->
        <el-form-item
          v-if="value2 == '3'"
          style="margin-top: 23px; margin-left: 24px"
        >
          <quarter v-model="form2.startTimejd"  @changeQuarter="changeQuarter1"/>
          <el-form-item style="margin-left: 224px; margin-top: -35px">
            <span>至</span>
          </el-form-item>
          <quarter
            v-model="form.endTimejd" @changeQuarter="changeQuarterEnd1"
            style="margin-left: 245px; margin-top: -73px"
          />
        </el-form-item>
        <!-- 月 -->
        <el-form-item
          style="margin-top: 23px; margin-left: 24px"
          v-if="value2 == '2'"
        >
          <el-date-picker
            class="data-item"
            type="month"
            :clearable="false"
            placeholder="选择月开始"
            :picker-options="pickerOptionsStartmonth"
            value-format="yyyy-MM"
            format="yyyy-MM"
            v-model="form2.startTimemonth"
          >
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            type="month"
            :clearable="false"
            placeholder="选择月结束"
            :picker-options="pickerOptionsEndmonth"
            value-format="yyyy-MM"
            format="yyyy-MM"
            v-model="form2.endTimemonth"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 日 -->
        <el-form-item
          style="margin-top: 23px; margin-left: 24px"
          v-if="value2 == '1'"
        >
          <el-date-picker
            type="date"
            :clearable="false"
            placeholder="选择日开始"
            :picker-options="pickerOptionsStartdate"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="form2.startTimedate"
          >
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            type="date"
            placeholder="选择日结束"
            :picker-options="pickerOptionsEnddate"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="form2.endTimedate"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left: 2px; margin-top: 20px">
          <el-button type="primary" size="medium" @click="achievesearch2"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <div class="emplty-crouse" v-show="myXdata1.length===0" >暂无销售成就</div>
      <div v-show="myXdata1.length!==0" id="main2" style="height: 399px; top: -35px"></div>
    </template>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars

// import CustomEcharts from '@/components/Charts/CustomEcharts'
import { baseRequest } from '@/api/base'
import { baseSearch } from '@/api/base'
import quarter from './quarter'
import quarter2 from './quarter2'
import { mapGetters } from 'vuex'
export default {
  components: {
    quarter,
    quarter2
  },
  computed: {
    ...mapGetters(['roles']),
    tableHight() {
      return this.$store.state.app.containHeight - 158
    }
  },
  data() {
    return {
      // 权限
      jiaolian: ['2', '4'],
      dashi: ['7'],
      value2: '4',
      myXdata: [],
      myYdata: [],
      myXdata1: [],
      myYdata1: [],
      value: '4',
      year: '',
      quarter: '',
      // showyear: false,
      // showmonth: false,
      // showdate: false,
      options: [
        {
          value: '4',
          label: '年'
        },
        {
          value: '3',
          label: '季度'
        },
        {
          value: '2',
          label: '月'
        },
        {
          value: '1',
          label: '日'
        }
      ],
      options2: [
        {
          value: '4',
          label: '年'
        },
        {
          value: '3',
          label: '季度'
        },
        {
          value: '2',
          label: '月'
        },
        {
          value: '1',
          label: '日'
        }
      ],
      startDate: '',
      endDate: '',
      form: {
        startTime: `${new Date().getFullYear()}`,
        endTime: `${new Date().getFullYear()}`,
        startTimemonth: '',
        endTimemonth: '',
        startTimedate: '',
        endTimedate: '',
        startTimejd: '',
        endTimejd: ''
      },
      form2: {
        startTime: `${new Date().getFullYear()}`,
        endTime: `${new Date().getFullYear()}`,
        startTimemonth: '',
        endTimemonth: '',
        startTimedate: '',
        endTimedate: '',
        startTimejd: '',
        endTimejd: ''
      },
      item: [],

      // 年
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.form.endTime !== '') {
            let date = this.form.endTime + ' 00:00:00'
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
            return time.getTime() < newDate
          }
        }
      },
      // 月
      pickerOptionsStartmonth: {
        disabledDate: (time) => {
          if (this.form.endTimemonth !== '') {
            let date = this.form.endTimemonth + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() > newDate
          }
        }
      },
      pickerOptionsEndmonth: {
        disabledDate: (time) => {
          if (this.form.startTimemonth !== '') {
            let date = this.form.startTimemonth + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      },
      // 日
      pickerOptionsStartdate: {
        disabledDate: (time) => {
          if (this.form.endTimedate !== '') {
            let date = this.form.endTimedate + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() > newDate
          }
        }
      },
      pickerOptionsEnddate: {
        disabledDate: (time) => {
          if (this.form.startTimedate !== '') {
            let date = this.form.startTimedate + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      }
    }
  },
  methods: {
    liduChange() {
      this.form.startTimedate = ''
      this.form.startTimedate = ''
      this.form.startTimemonth = ''
      this.form.endTimemonth = ''
      this.form.startTimejd = ''
      this.form.endTimejd = ''
    },
    liduChange2() {
      this.form2.startTimedate = ''
      this.form2.startTimedate = ''
      this.form2.startTimemonth = ''
      this.form2.endTimemonth = ''
      this.form2.startTimejd = ''
      this.form2.endTimejd = ''
    },
    changeQuarter(qua) {
      if (qua.season === 1) {
        this.form.startTimejd = qua.year + '-01-01'
      } else if (qua.season === 2) {
        this.form.startTimejd = qua.year + '-04-01'
      } else if (qua.season === 3) {
        this.form.startTimejd = qua.year + '-07-01'
      } else if (qua.season === 4) {
        this.form.startTimejd = qua.year + '-10-01'
      }
    },
    changeQuarterEnd(qua) {
      if (qua.season === 1) {
        this.form.endTimejd = qua.year + '-03-31'
      } else if (qua.season === 2) {
        this.form.endTimejd = qua.year + '-06-30'
      } else if (qua.season === 3) {
        this.form.endTimejd = qua.year + '-09-30'
      } else if (qua.season === 4) {
        this.form.endTimejd = qua.year + '-12-31'
      }
    },
    changeQuarter1(qua) {
      if (qua.season === 1) {
        this.form2.startTimejd = qua.year + '-01-01'
      } else if (qua.season === 2) {
        this.form2.startTimejd = qua.year + '-04-01'
      } else if (qua.season === 3) {
        this.form2.startTimejd = qua.year + '-07-01'
      } else if (qua.season === 4) {
        this.form2.startTimejd = qua.year + '-10-01'
      }
    },
    changeQuarterEnd1(qua) {
      if (qua.season === 1) {
        this.form2.endTimejd = qua.year + '-03-31'
      } else if (qua.season === 2) {
        this.form2.endTimejd = qua.year + '-06-30'
      } else if (qua.season === 3) {
        this.form2.endTimejd = qua.year + '-09-30'
      } else if (qua.season === 4) {
        this.form2.endTimejd = qua.year + '-12-31'
      }
    },
    achievesearch() {
      if (this.value === '4') {
        if (this.form.startTime && this.form.endTime) {
          this.startDate = `${this.form.startTime}-${'01-01'}`
          this.endDate = `${this.form.endTime}-${'12-31'}`
        } else {
          this.$Message.warning('请选择日期')
          return
        }
      } else if (this.value === '2') {
        if (this.form.startTimemonth && this.form.endTimemonth) {
          this.startDate = `${this.form.startTimemonth}-${'01'}`
          if (this.form.endTimemonth.substring(
            this.form.endTimemonth.lastIndexOf('-') + 1) === '04' ||
            this.form.endTimemonth.substring(
              this.form.endTimemonth.lastIndexOf('-') + 1
            ) === '06' ||
            this.form.endTimemonth.substring(
              this.form.endTimemonth.lastIndexOf('-') + 1
            ) === '09' ||
            this.form.endTimemonth.substring(
              this.form.endTimemonth.lastIndexOf('-') + 1
            ) === '10'
          ) {
            this.endDate = `${this.form.endTimemonth}-${'30'}`
          } else if (
            this.form.endTimemonth.substring(
              this.form.endTimemonth.lastIndexOf('-') + 1
            ) === '02'
          ) {
            const year = Number(this.form.endTimemonth.substring(0, 4))
            if (year % 4 === 0) {
              this.endDate = `${this.form.endTimemonth}-${'29'}`
            } else {
              this.endDate = `${this.form.endTimemonth}-${'28'}`
            }
          } else {
            this.endDate = `${this.form.endTimemonth}-${'31'}`
          }
        } else {
          this.$Message.warning('请选择日期')
          return
        }
      } else if (this.value === '1') {
        if (this.form.startTimedate && this.form.endTimedate) {
          this.startDate = this.form.startTimedate
          this.endDate = this.form.endTimedate
        } else {
          this.$Message.warning('请选择日期')
          return
        }
      } else if (this.value === '3') {
        if (this.form.startTimejd && this.form.endTimejd) {
          this.startDate = this.form.startTimejd
          this.endDate = this.form.endTimejd
        } else {
          this.$Message.warning('请选择日期')
          return
        }
      }
      const params = {
        startDate: this.startDate,
        endDate: this.endDate,
        grain: this.value
      }
      baseSearch('/user/myAchievement/coachAchieve', params).then(
        (response) => {
          this.myXdata = response.data.item.xAxisData || []
          // this.myXdata = ['2020', '2021', '2023']
          this.myYdata = response.data.item.series || []
          // this.myYdata = [
          //   {
          //     stack: '0',
          //     data: [20, 50, 20],
          //     name: 'First Step',
          //     type: 'bar',
          //     barWidth: 20
          //   },
          //   {
          //     stack: '1',
          //     data: [222, 666, 32],
          //     name: 'SP',
          //     type: 'bar',
          //     barWidth: 20
          //   }
          // ]
          this.initEcharts()
        }
      )
    },
    achievesearch2() {
      if (this.value2 === '4') {
        if (this.form2.startTime && this.form2.endTime) {
          this.startDate = `${this.form2.startTime}-${'01-01'}`
          this.endDate = `${this.form2.endTime}-${'12-31'}`
        } else {
          this.$Message.warning('请选择日期')
          return
        }
      } else if (this.value2 === '2') {
        if (this.form2.startTimemonth && this.form2.endTimemonth) {
          this.startDate = `${this.form2.startTimemonth}-${'01'}`
          if (
            this.form2.endTimemonth.substring(
              this.form2.endTimemonth.lastIndexOf('-') + 1
            ) === '04' ||
            this.form2.endTimemonth.substring(
              this.form2.endTimemonth.lastIndexOf('-') + 1
            ) === '06' ||
            this.form2.endTimemonth.substring(
              this.form2.endTimemonth.lastIndexOf('-') + 1
            ) === '09' ||
            this.form2.endTimemonth.substring(
              this.form2.endTimemonth.lastIndexOf('-') + 1
            ) === '10'
          ) {
            this.endDate = `${this.form2.endTimemonth}-${'30'}`
          } else if (
            this.form2.endTimemonth.substring(
              this.form2.endTimemonth.lastIndexOf('-') + 1
            ) === '02'
          ) {
            const year = Number(this.form2.endTimemonth.substring(0, 4))
            if (year % 4 === 0) {
              this.endDate = `${this.form2.endTimemonth}-${'29'}`
            } else {
              this.endDate = `${this.form2.endTimemonth}-${'28'}`
            }
          } else {
            this.endDate = `${this.form2.endTimemonth}-${'31'}`
          }
        } else {
          this.$Message.warning('请选择日期')
          return
        }
      } else if (this.value2 === '1') {
        if (this.form2.startTimedate && this.form2.endTimedate) {
          this.startDate = this.form2.startTimedate
          this.endDate = this.form2.endTimedate
        } else {
          this.$Message.warning('请选择日期')
          return
        }
      } else if (this.value2 === '3') {
        if (this.form2.startTimejd && this.form2.endTimejd) {
          this.startDate = this.form2.startTimejd
          this.endDate = this.form2.endTimejd
        } else {
          this.$Message.warning('请选择日期')
          return
        }
      }
      const params = {
        startDate: this.startDate,
        endDate: this.endDate,
        grain: this.value2
      }
      baseSearch('/user/myAchievement/ambAchieve', params).then((response) => {
        this.myXdata1 = response.data.item.xAxisData
        // this.myXdata1 = ['2020-01-02', '2020-01-12', '2020-01-25']
        this.myYdata1 = response.data.item.series
        // this.myYdata1 = [
        //   {
        //     stack: '0',
        //     data: [20, 50, 20],
        //     name: 'First Step',
        //     type: 'bar',
        //     barWidth: 20
        //   },
        //   {
        //     stack: '1',
        //     data: [222, 666, 32],
        //     name: 'SP',
        //     type: 'bar',
        //     barWidth: 20
        //   }
        // ]
        this.initEcharts2()
      })
    },
    studentAchieve() {
      baseRequest('/user/myAchievement/studentAchieve', { default: '1' }).then(
        (response) => {
          this.item = response.data.item
        }
      )
    },
    initEcharts() {
      this.$nextTick(_ => {
        const echarts = require('echarts')
        var myChart = echarts.init(document.getElementById('main'))

        var option = {}
        if (this.myXdata.length === 0) {
          option = {
            title: {
              text: '您还没有授课成就',
              x: 'center',
              y: 'center',
              textStyle: {
                color: '#000',
                fontWeight: 'normal',
                fontSize: 24
              }
            }
          }
        } else {
          option = {
            color: [
              '#00AFFF',
              '#00AFFF',
              '#00AFFF',
              '#00AFFF',
              '#00AFFF',
              '#00AFFF',
              '#00AFFF'
            ],
            title: {
              text: ''
            },
            tooltip: {},
            legend: {
              data: ['']
            },
            xAxis: {
              axisLine: {
                lineStyle: {
                  color: '#555555'
                }
              },
              data: this.myXdata,
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'solid',
                  color: '#CDCDCD',
                  width: 1
                }
              }
            },
            yAxis: {
              type: 'value',
              // 刻度值右显示
              axisLabel: {
                inside: true,
                top: 10,
                margin: 3
              },
              axisLine: {
                lineStyle: {
                  color: '#555555'
                }
              },
              axisTick: {
                inside: false
              },
              minInterval: 50,
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'solid',
                  color: '#CDCDCD',
                  width: 1
                }
              }
            },
            grid: {
              top: 60,
              left: '0',
              right: '100',
              bottom: '0',
              containLabel: true
            },
            series: this.myYdata
          }
        }
        myChart.setOption(option)
      })
    },
    initEcharts2() {
      this.$nextTick(_ => {
        const echarts = require('echarts')
        var myChart2 = echarts.init(document.getElementById('main2'))

        var option = {}
        if (this.myXdata1.length === 0) {
          option = {
            title: {
              text: '您还没有销售成就',
              x: 'center',
              y: 'center',
              textStyle: {
                color: '#000',
                fontWeight: 'normal',
                fontSize: 24
              }
            }
          }
        } else {
          option = {
            color: ['#00AFFF', '#00AFFF', '#00AFFF', '#00AFFF', '#00AFFF', '#00AFFF', '#00AFFF', '#00AFFF', '#00AFFF', '#00AFFF', '#00AFFF'],
            title: {
              text: ''
            },
            tooltip: {},
            legend: {
              data: ['']
            },
            xAxis: {
              axisLine: {
                lineStyle: {
                  color: '#555555'
                }
              },
              data: this.myXdata1,
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'solid',
                  color: '#CDCDCD',
                  width: 1
                }
              }
            },
            yAxis: {
              type: 'value',
              // 刻度值右显示
              axisLabel: {
                inside: true,
                top: 10,
                margin: 3
              },
              axisLine: {
                lineStyle: {
                  color: '#555555'
                }
              },
              axisTick: {
                inside: false
              },
              minInterval: 50,
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'solid',
                  color: '#CDCDCD',
                  width: 1
                }
              }
            },
            grid: {
              top: 60,
              left: '0',
              right: '100',
              bottom: '0',
              containLabel: true
            },
            series: this.myYdata1
          }
        }
        myChart2.setOption(option)
      })
    }
  },
  created() {
    this.studentAchieve()
    // this.showquarter()
  },
  mounted() {
    this.$nextTick(() => {
      this.achievesearch()
      this.achievesearch2()
    })
  }
}
</script>

<style lang="scss" scoped>
.cj-content {
  width: 1440px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0px 10px 10px 10px;
  padding: 24px;
  margin-bottom: 30px;
  .box-title {
    height: 18px;
    width: 200px;
    display: block;
    .h4_text1 {
      float: left;
      font-size: 18px;
      color: #222222;
    }
  }
  .box-title2 {
    width: 100px;
    height: 16px;
    //   background-color: pink;
    margin-top: 24px;
    .title-text2 {
      font-size: 16px;
      //   color: #222222;
    }
  }
  .emplty-crouse {
    text-align: center;
    padding: 60px 0;
    font-size: 24px;
  }
  .boxStyle-data {
    width: 570px;
    height: 30px;
    margin-top: 12px;
    //  background-color: orange;
    position: relative;
    .box-kcxxIcon {
      width: 30px;
      height: 30px;
      background-color: #ffeecc;
      border-radius: 4px;
      text-align: center;
      line-height: 39px;
      position: relative;
      .icon-chengjiu-jin {
        width: 70%;
        height: 70%;
      }
    }
    .kcxxtext {
      position: absolute;
      top: 0;
      left: 54px;
      width: 320px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #222222;
    }
    .kcxxdata {
      width: 300px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #222222;
      position: absolute;
      top: 0;
      left: 274px;
    }
  }
  .box-title3 {
    height: 16px;
    width: 200px;
    display: block;
    //  background-color: red;
    margin-top: 30px;
    .h4_text3 {
      font-size: 16px;
      color: #222222;
    }
  }
  .box-title4 {
    height: 16px;
    width: 200px;
    display: block;
    //  background-color: red;
    margin-top: 13px;
    .h4_text4 {
      font-size: 16px;
      color: #222222;
    }
  }
}
</style>