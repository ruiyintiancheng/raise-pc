<template>
    <div class="target-tool" >
        <div class="inside-container clearfix" v-if="targetToolShow">
            <ul class="tool-bar fl">
                <li class="clearfix">
                    <a class="fr clearfix g" :class="{active:active==='G'}" @click="toolBarChange('G')">
                        <div v-if="active === 'G'" class="tool-bar-title fl">
                            目标清单总表
                        </div>
                        <svg-icon class="tool-bar-icon" icon-class="icon-G" />
                    </a>
                </li>
                <li class="clearfix">
                    <a class="fr clearfix y" :class="{active:active==='Y'}" @click="toolBarChange('Y')">
                        <div v-if="active === 'Y'" class="tool-bar-title fl">
                            年度重要目标
                        </div>
                        <svg-icon class="tool-bar-icon" icon-class="icon-Y" />
                    </a>
                </li>
                <li class="clearfix">
                    <a class="fr clearfix m" :class="{active:active==='M'}" @click="toolBarChange('M')">
                        <div v-if="active === 'M'" class="tool-bar-title fl">
                            月目标
                        </div>
                        <svg-icon class="tool-bar-icon" icon-class="icon-M" />
                    </a>
                </li>
                <li class="clearfix">
                    <a class="fr clearfix w" :class="{active:active==='W'}" @click="toolBarChange('W')">
                        <div v-if="active === 'W'" class="tool-bar-title fl">
                            周目标
                        </div>
                        <svg-icon class="tool-bar-icon" icon-class="icon-W" />
                    </a>
                </li>
                <li class="clearfix">
                    <a class="fr clearfix d" :class="{active:active==='D'}" @click="toolBarChange('D')">
                        <div v-if="active === 'D'" class="tool-bar-title fl">
                            日计划
                        </div>
                        <svg-icon class="tool-bar-icon" icon-class="icon-D" />
                    </a>
                </li>
                <li class="clearfix">
                    <a class="fr clearfix a" :class="{active:active==='A'}" @click="toolBarChange('A')">
                        <div v-if="active === 'A'" class="tool-bar-title fl">
                            我的成就
                        </div>
                        <svg-icon class="tool-bar-icon" icon-class="icon-A" />
                    </a>
                </li>
                <li class="clearfix">
                    <a class="fr clearfix c" :class="{active:active==='C'}" @click="toolBarChange('C')">
                        <div v-if="active === 'C'" class="tool-bar-title fl">
                            沟通
                        </div>
                        <svg-icon class="tool-bar-icon" icon-class="icon-C" />
                    </a>
                </li>
                <li class="clearfix">
                    <a class="fr clearfix f" :class="{active:active==='F'}" @click="toolBarChange('F')">
                        <div v-if="active === 'F'" class="tool-bar-title fl">
                            未来规划
                        </div>
                        <svg-icon class="tool-bar-icon" icon-class="icon-F" />
                    </a>
                </li>
                <li class="clearfix">
                    <a class="fr clearfix l" :class="{active:active==='L'}" @click="toolBarChange('L')">
                        <div v-if="active === 'L'" class="tool-bar-title fl">
                            人生规划
                        </div>
                        <svg-icon class="tool-bar-icon" icon-class="icon-L" />
                    </a>
                </li>
                <li class="clearfix">
                    <a class="fr clearfix n" :class="{active:active==='N'}" @click="toolBarChange('N')">
                        <div v-if="active === 'N'" class="tool-bar-title fl">
                            备忘录
                        </div>
                        <svg-icon class="tool-bar-icon" icon-class="icon-N" />
                    </a>
                </li>
                <li class="clearfix">
                    <a class="fr clearfix h" :class="{active:active==='H'}" @click="toolBarChange('H')">
                        <div v-if="active === 'H'" class="tool-bar-title fl">
                            帮助 / 续费
                        </div>
                        <svg-icon class="tool-bar-icon" icon-class="icon-H" />
                    </a>
                </li>
            </ul>
            <div class="tool-container fl" :style="{height:minHeight+'px',minHeight: '630px'}">
                <gps v-if="active==='G'" :year="viewYear" ref="gps"/>
                <yearc v-if="active==='Y'" :viewYear="viewYear" ref="yearc"/>
                <monthc v-if="active==='M'" :viewDate="viewDate" ref="monthc" @navTo="navTo"/>
                <weekc v-if="active==='W'" :viewDate="viewDate" ref="weekc"/>
                <dayc v-if="active==='D'" :viewYear="viewYear" :viewDate="viewDate" @goCommunication="goCommunication" ref="dayc"/>
                <achievement v-if="active==='A'" :viewDate="viewDate" ref="achievement"/>
                <communication ref="communication" v-if="active==='C'" :viewYear="viewYear" />
                <futurePlan v-if="active==='F'" :viewYear="viewYear" ref="futurePlan"/>
                <lifegoal v-if="active==='L'" :year="viewYear" ref="lifegoal"/>
                <notice v-if="active==='N'" ref="notice"/>
                <helprenew v-if="active==='H'" :year="viewYear" @navTo="navTo" ref="helprenew"/>
            </div>
            <ul class="tool-options fl" v-show="active !== 'H' && active !== 'G' && active !== 'L' && active !== 'N'">
                <li>
                    <div class="tool-options-title">
                        <el-date-picker
                        class="tool-options-year"
                        v-model="viewYear"
                        :editable="false"
                        type="year"
                        format="yyyy 年"
                        value-format="yyyy"
                        @change="yearChangeHandle"
                        :picker-options="pickerOptions"
                      >
                        </el-date-picker>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import gps from './components/gps'
import yearc from './components/year'
import monthc from './components/month'
import helprenew from './components/helpRenew'
import lifegoal from './components/lifeGoal'
import weekc from './components/week'
import dayc from './components/day'
import achievement from './components/achievement'
import communication from './components/communication'
import futurePlan from './components/futurePlan'
import notice from './components/notice'
import { baseRequest } from '@/api/base'
export default {
  components: {
    gps, yearc, monthc, weekc,
    dayc,
    achievement,
    communication,
    futurePlan,
    helprenew,
    lifegoal,
    notice
  },
  data() {
    return {
      active: 'G',
      viewYear: '',
      viewDate: '',
      pickerOptions: {
        disabledDate: (time) => {
          const currentYear = new Date().getFullYear()
          const panelYear = new Date(time).getFullYear()
          return panelYear < currentYear - 3 || panelYear > currentYear + 6
        }
      },
      targetToolShow: false
    }
  },
  computed: {
    minHeight() {
      return this.$store.state.app.containHeight - 123
    }
  },
  created() {
    this.getCurrentDate()
    // this.targetToolShow = true

    baseRequest('/objective/rwGoalPermission/isAvailable', { date: new Date().getTime() }).then(response => {
      const openFlag = response.data.item.openFlag
      const payFlag = response.data.item.payFlag
      if (openFlag === '1') {
        this.targetToolShow = true
      } else {
        if (payFlag === '1') {
          this.$router.push({ name: 'firstStep' })
        } else {
          this.$Message.warning('您的LMI•SP将在First Step项目结束后开启')
        }
      }
    })
  },
  watch: {
    // viewYear(val) {
    //   const temp = this.active
    //   const date = new Date()
    //   const year = date.getFullYear() + ''
    //   if (year === val) {
    //     this.getCurrentDate()
    //   } else {
    //     this.viewDate = val + '-01-01'
    //   }
    //   this.active = ''
    //   this.$nextTick(_ => {
    //     this.active = temp
    //   })
    // }
    active(val) {
      if (val) {
        document.documentElement.scrollTop = 0
      }
    }
  },
  methods: {
    toolBarChange(name) {
      this.active = name
    },
    getCurrentDate() {
      const date = new Date()
      const seperator1 = '-'
      const year = date.getFullYear()
      this.viewYear = date.getFullYear() + ''
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.viewDate = year + seperator1 + month + seperator1 + strDate
    },
    yearChangeHandle(val) {
      const temp = this.active
      const date = new Date()
      const year = date.getFullYear() + ''
      if (year === val) {
        this.getCurrentDate()
      } else {
        this.viewDate = val + '-01-01'
      }
      this.active = ''
      this.$nextTick(_ => {
        this.active = temp
      })
    },
    goCommunication(type) {
      console.log('跳转到沟通: ', type)
      this.active = 'C'
      this.$nextTick(() => {
        this.$refs['communication'].activeName = type
      })
    },
    navTo(params) {
      this.active = params.name
      if (params.name === 'M') {
        this.$nextTick(_ => {
          this.$refs.monthc.activeName = params.tab
        })
      } else if (params.name === 'W') {
        this.$nextTick(_ => {
          if (params.text) {
            this.$refs.weekc.$refs.week[0].$refs.plan[0].jumpToText(params.text)
          }
        })
      } else if (params.name === 'D') {
        this.$nextTick(_ => {
          if (params.text) {
            this.$refs.dayc.jumpToText(params.text, params.day)
          }
        })
      } else if (params.name === 'C') {
        this.$nextTick(_ => {
          this.$refs.communication.activeName = params.tab
        })
      } else if (params.name === 'L') {
        this.$nextTick(_ => {
          this.$refs.lifegoal.state = params.tab
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import './components/color.scss';
.target-tool{
    margin:30px 0;
    .tool-bar{
        width:62px;
        a{
            display: block;
            width: 52px;
            height: 52px;
            line-height: 52px;
            text-align: center;
            background-color: #ccc;
            font-size: 20px;
            color: #fff;
            &.g{
                background-color: $colorG;
                border-top-left-radius: 10px;
            }
            &.y{
                background-color: $colorY;
            }
            &.m{
                background-color: $colorM;
            }
            &.w{
                background-color: $colorW;
            }
            &.d{
                background-color: $colorD;
            }
            &.a{
                background-color: $colorA;
            }
            &.c{
                background-color: $colorC;
            }
            &.f{
                background-color: $colorF;
            }
            &.l{
                background-color: $colorL;
            }
            &.n{
                background-color: $colorN;
            }
            &.h{
                background-color: $colorH;
                border-bottom-left-radius: 10px;
            }
            &.active{
                height: 110px;
                width: 62px;
                line-height:normal;
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
                padding:12px 12px 12px 14px;
                text-align: left;
                .tool-bar-title{
                    width: 14px;
                    font-family: PingFangSC-Semibold;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                    line-height: 14px;
                    font-weight: bold;
                }
                .tool-bar-icon{
                    margin-left: 6px;
                    float: left;
                    font-size: 16px;
                    width: 16px;
                }
            }
        }
    }
    .tool-container{
        width: calc(100% - 94px);
        background-color: #fff;
        box-shadow: 0px 2px 10px 0px 
		rgba(0, 0, 0, 0.1);
	    border-radius: 0px 10px 10px 10px;
      overflow: hidden;
    }
    .tool-options{
        width: 32px;
        li{
            width: 80px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background-color: #555555;
            border-radius: 10px 10px 0px 0px;
            transform: rotate(90deg);
            transform-origin: left bottom;
            overflow: hidden;
            cursor: pointer;
            .tool-options-title{
                width: 100%;
                height: 100%;
                font-family: PingFangSC-Semibold;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
            }
            .tool-options-year{
                width: 100%;
                height: 100%;
                .el-input__inner{
                        width: 100%;
                        color: #fff;
                        height: 100%;
                        font-family: PingFangSC-Semibold;
                        font-size: 14px;
                        line-height: 100%;
                        background-color: #555555;
                        padding-right: 0px;
                        padding-left: 10px;
                            border: none;
                            cursor: pointer;
                }
                .el-input__prefix,.el-input__suffix{
                    display: none;
                }
            }
        }
    }
}
</style>