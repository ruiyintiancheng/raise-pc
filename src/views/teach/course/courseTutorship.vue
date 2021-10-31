<template>
    <div class="appointment-Course">
       <div class="learn-container inside-container">
            <div class="learn-head">
                <h3 class="learn-title">
                    <span class="learn-title-f">1-1教练会谈</span>
                    <span class="learn-line"> </span>
                    <span class="learn-title-x" >课程辅导</span> 
                    <span class="learn-line"></span>
                </h3>
            </div>
            <ul class="tabs-box">
                <li  @click="activeName = 'first'" :class="{ative: activeName === 'first'}" id="hovreColorLeft">
                    <div>课程预约</div> 
                </li>
                <li @click="activeName = 'second'" :class="{ative: activeName === 'second'}" id="hovreColorRight" >
                    <div>进入辅导</div> 
                </li>
            </ul>
            <div class="fg-line"></div> 
            <div class="body" v-if="showFlagV">
                <course-booking v-show="activeName === 'first'" :recordId="recordId"/>
                <enter-coaching v-show="activeName === 'second'" :recordId="recordId" ref="child"/>
            </div>
            <!-- <strengthen-oneone-form ref="strengthenOneoneForm" :courseId="id" :endDate="endDate" :multipleSelection="multipleSelection" @queryCourseList="queryCourseList"></strengthen-oneone-form> -->
       </div>
    </div>
</template>
<script>
    import { parseTime } from '@/utils'
    import { baseRequest } from '@/api/base'
    import courseBooking from './components/course-booking'
    import enterCoaching from './components/enter-coaching'
    // import strengthenOneoneForm from './components/strengthen-oneone-form'
    export default {
      components: {
        // strengthenOneoneForm,
        courseBooking,
        enterCoaching
      },
      props: {
        id: [String, Number],
        startDate: String,
        endDate: String,
        sNum: [String, Number]
      },
      data() {
        return {
          activeName: 'first',
          operFlag: false,
          showFlagV: true,
          showFlag: true,
          item: null,
          recordId: null,
          courseList: null,
          dialogTableVisible: false,
          dialogFormVisible: false,
          loading: false,
          multipleSelection: []
        }
      },
      computed: {
        dateTitle() {
          return parseTime(this.startDate, '{y}年{m}月{d}日') + '~' + parseTime(this.endDate, '{y}年{m}月{d}日')
        }
      },
      methods: {
        // 进入页面权限(教练)
        getCoachInfo() {
          baseRequest('/course/firstStepCoach/oneToOnePermissionByCoach', { recordId: this.recordId }).then(response => {
            this.operFlag = response.data.item.operFlag
            this.showFlag = response.data.item.showFlag
            if (this.showFlag === false) {
              this.$router.push('/')
            }
          })
        },
        yuyueHandle() {
          const userIds = []
          for (const iterator of this.multipleSelection) {
            userIds.push(iterator.userId)
          }
          this.$refs.strengthenOneoneForm.openDialog()
        }
      },
      created() {
        this.item = this.$route.query.row
        this.recordId = this.$route.params.recordId
        console.log(this.recordId)
        this.getCoachInfo()
        // this.getData()
      },
      updated() {
        this.$refs.child.queryCourseList()
      }
    }
</script>
<style lang="scss">
    .appointment-Course{
         .learn-container{
            background-color: #ffffff;
            box-shadow: 0px 2px 10px 0px 
            rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding:24px;
            margin-top:30px;
            margin-bottom: 30px;
            padding-bottom:78px;
            position: relative;
            .learn-head{
                position: relative;
            }
            .learn-title{
                // font-family: PingFangSC-Semibold;
                font-family: PingFangSC-Semibold;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #222222;
                font-weight: bold;
                .learn-title-f{
                  font-weight: bold;
                  font-family: PingFangSC-Semibold;
                  font-size: 16px;
                }
                .learn-title-x{
                  font-weight: bold;
                  font-family: PingFangSC-Semibold;
                  font-size: 16px;
                }
            }
            .fg-line{
                height: 1px;
	            border: dashed 1px #ddd;
                width: 35%;
                position: relative;
                top: -2px;
                z-index:1;
            }
            .tabs-box{
                li{
                    position: relative;
                    z-index:999;
                    display: inline-block;
                    width: 140px;
                    height: 60px;
                    box-sizing: border-box;
                    font-size: 16px;
                    padding-bottom: 60px;
                    cursor: pointer;
                    div{
                        padding-left: 30px;
                        padding-top: 30px;
                    }
                }
                #hovreColorLeft:hover{
                  color: #00AFFF;
                }
                #hovreColorRight:hover{
                  color: #00AFFF;
                }
                .ative{
                    border-bottom: 5px solid #00AFFF;
                    color: #00AFFF;
                    background-image: linear-gradient(#fff, #cff0ff);
                }
            }
            .row-card-list{
                margin-top: 20px;
                line-height: 35px;
                display: flex;
                flex-wrap: wrap;
                height: 60px;
                .course-btn{
                    text-align: right;
                }
                .el-card{  
                    min-width: 100%;
                    height: 100%;
                }
            }  
            .el-card__body{
                padding: 25px;
            }    
        }
    }

</style>
