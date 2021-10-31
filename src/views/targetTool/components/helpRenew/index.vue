/*
 * @Author: mikey.zhaopeng 
 * @Date: 2020-07-24 14:27:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-06-04 15:40:34
 * @帮助续费
 */
<template>
    <div class="tt-helprenew" style="height:100%;">
        <div class="help-title">
            帮助/续费
        <img
        class="image-right"
        @click="dialogVisiblejfsm"
        src="../../../../assets/icons/icon-ques.svg"
        alt
      />
            <router-link :to="{name:'sp'}" class="jump-project">续费 >></router-link>
        </div>
        
        <div style="width:100%;" class="i-content">
            <div v-if="state===0">
                <el-tree :data="data" :props="defaultProps" :expand-on-click-node="true" :indent="36" :default-expand-all='true'>
                  <div class="custom-tree-node" slot-scope="{ node, data }">
                      <div class="help-menu-title">
                        <svg-icon v-if="data.icon" :icon-class="'icon-'+data.icon" :class="['icon-help',data.icon]"/> 
                        <b> {{ node.label }}</b>{{data.des}}
                      </div>
                      <template v-if="data.id === '1'">
                        <p class="help-menu-content first-row">● 此表的目标来自三个地方：</p>
                        <p class="help-menu-content intent">（1）通过本表添加的目标；</p>
                        <p class="help-menu-content intent">（2）来自年度重要目标中已进行“制定规划”的目标；</p>
                        <p class="help-menu-content intent">（3）来自人生规划中已进行“制定规划”的梦想；</p>
                        <p class="help-menu-content">● 可点击“添加目标”键添加目标并制定规划，也可以点击已设定的目标进行修改完善。</p>
                        <p class="help-menu-content">● 在目标规划页中标识为红色*的是必填项，需全部填写才可发布。</p>
                        <p class="help-menu-content">● 注意在规划表的“行动步骤”栏中，如类型选为“步骤”，则此步骤将根据追踪日期和预计达成日期，显示在对应日期的月、周、日计划的重要事项或紧要事项中（当前日期未到“预计达成日”时，此步骤进入月、周、日计划的“重要事项”，当前日期已到“预计达成日”时，此步骤进入月、周、日计划的“紧要事项”）；如类型选为“目标”，此目标显示在对应日期的“月焦点目标”中，同时此目标还可再进行规划。</p>
                        <p class="help-menu-content">● 对于未完全规划好的目标，可以先按“保存”键；当确认可以开始实施此目标时、再点击“发布”键，此时目标将按规划的时间显示在系统的月目标、周、日计划的重要或紧要事项中。</p>
                        <p class="help-menu-content">● 在规划表中系统不会依据用户填写的“是”、“否”内容判断目标是否执行，只要点击“发布”键，系统就会按照目标设定的时间启动实施。对于暂不考虑执行的目标，建议先点击“保存”键保存，待希望实施此目标时、再点击“发布”键。</p>
                        <p class="help-menu-content">● 目标开始实施后只要还未达成，均可以通过点击“终止”“删除”或“达成”键结束目标。</p>
                        <p class="help-menu-content">● 点击右上角的“年度查询”框，选择年份，可以查询对应年度的目标清单。</p>
                      </template>
                      <template v-else-if="data.id === '2'">
                        <p class="help-menu-content first-row">● 目标按其所属领域排序，目标所属领域排序可在人生规划页设定。其中“事业领域”被单独列出。</p>
                        <p class="help-menu-content">● 可点击“添加”键添加本年度想开始实施的目标，也可点击“制定规划”键进行目标规划。已进行规划的目标，“制定规划”键显示为绿色，未规划的显示为蓝色。</p>
                        <p class="help-menu-content">● 如本年度目标未结束，将会自动进入到下一年度。</p>
                        <p class="help-menu-content">● 未进行规划的目标，可以通过点击“终止”“删除”或“达成”键改变目标状态，已经规划的目标则只能通过点击“终止”或“达成”键结束。</p>
                        <p class="help-menu-content">● 只有完成“制定规划”步骤的年度目标（即目标的“制定规划”按钮为绿色），才会进入“目标清单总表”。</p>
                        <p class="help-menu-content">● 从本栏目开始至“未来规划”栏，页面的右上角均有黑色的年度页签，可以通过点击此页签选择你想要规划或查询的年份。</p>
                      </template>
                      <template v-else-if="data.id === '3'">
                        <!-- <p class="help-menu-content"><a @click.stop="navTo('M','first',null)">月度目标</a>：用于设定和追踪月度要达成的目标计划。</p>
                        <p class="help-menu-content"><a @click.stop="navTo('M','second',null)">周时间规划</a>：用于拟定理想的周时间安排、培养在固定的时段专注做事的习惯。</p>
                        <p class="help-menu-content"><a @click.stop="navTo('M','third',null)">31日追踪事项</a>：用于培养成功的行为习惯。</p> -->
                      </template>
                      <template v-else-if="data.id === '3-1'">
                        <p class="help-menu-content first-row">● <b>使命：</b>可以在此处编辑填写或直接继承于“人生规划”页中的内容。</p>
                        <p class="help-menu-content">● <b>月焦点目标：</b>显示本月各领域要开始实施的目标，可点击“添加”键添加本月实施的新目标；点击“删除”键删除不想在本月实施的目标；如果删除的目标并非来自本月设定，则删除只代表本月不实施，它会继续出现在下个月的目标栏中、直至点击“达成”键终止；所有目标可以通过点击“终止”或“达成”键结束目标。</p>
                        <p class="help-menu-content">● <b>月首要目标：</b>是本月必须关注或达成的目标。只有“首要目标”会显示在本月的“周目标”中。在焦点目标栏中的目标，点击“转为首要”键即会转入“月首要目标”中。</p>
                        <p class="help-menu-content">● <b>高回报活动事项： </b>高回报活动根据80/20原则设置。可点击“添加”键添加高回报活动，点击“上移”键排列优先顺序。如果没有在未来月份对此栏进行任何编辑操作，则进入下个月后会延续上一月度的内容。</p>
                        <p class="help-menu-content">● <b>紧要事项： </b>“紧要事项”是和当下最优先目标紧密相关的活动，此栏显示所有目标规划中对应预计达成日期在本月的行动步骤，也可点击“添加”键添加紧要事项。该事项会根据“追踪日期”和“预计达成日期”显现在对应日期的周目标和日计划的重要事项或紧要事项中。</p>
                        <p class="help-menu-content">● <b>重要事项： </b>“重要事项”通常对当下的目标结果贡献较小。</p>
                      </template>
                      <template v-else-if="data.id === '3-2'">
                        <p class="help-menu-content first-row">● 可点击“添加”键添加事项和时间段，提前设定好每周的时间段以确保用专注的时间完成高回报活动。</p>
                      </template>
                      <template v-else-if="data.id === '3-3'">
                        <p class="help-menu-content first-row">● 可点击“添加”键设定培养习惯的小目标，该事项会显示在日计划中；当此习惯已经形成时，可点击“删除”键进行删除。</p>
                      </template>
                      <template v-else-if="data.id === '3-4'">
                        <p class="help-menu-content first-row">以月历的形式直观呈现所有本月已经设定和安排的事项，可点击月历表各日期右下角的“+”键添加事项，或点击“…”查看当天的事项安排。</p>
                      </template>
                      <template v-else-if="data.id === '4'">
                        <!-- <p class="help-menu-content">周目标上显示的<a @click.stop="navTo('W',null,null)">月度首要目标</a>，来自月度目标中的首要的个人和工作目标，或可以重新编辑/编写。</p>
                        <p class="help-menu-content"><a @click.stop="navTo('W',null,'urgent')">紧要事项</a>：月度目标中对应本周要完成的紧要事项，或可以重新编辑/编写。</p>
                        <p class="help-menu-content"><a @click.stop="navTo('W',null,'important')">重要事项</a>：月度目标中对应本周要完成的重要事项，或可以重新编辑/编写。</p> -->
                        <p class="help-menu-content first-row">● “月首要目标”来自月目标，以提醒本月需关注或达成的目标。</p>
                        <p class="help-menu-content">● “紧要事项”和“重要事项”来自月度目标中对应开始日期的“紧要/重要事项”，它们都会显现在对应日期的日计划中。</p>
                        <p class="help-menu-content">● 可在“紧要事项”“重要事项”栏右侧点击“添加”键添加事项，也可点击“删除”“终止”或“达成”键改变该事项状态。</p>
                        <p class="help-menu-content">● 可点击“转换”键进行“紧要”和“重要”事项的互换。</p>
                      </template>
                      <template v-else-if="data.id === '5'">
                        <!-- <p class="help-menu-content">日目标上的<a @click.stop="navTo('D',null,'urgent')">紧要事项</a>来自月度目标中对应当日“预计达成日期”上的紧要事项，或可重新编辑/编写。评估时间价值，在时长栏中填入对应此事项值得花费的时长，并在<a @click.stop="navTo('D',null,'urgent')">日程</a>栏中安排最适合执行此事项的时段。</p>
                        <p class="help-menu-content">日目标上的<a @click.stop="navTo('D',null,'improtant')">重要事项</a>来自月度目标中对应当日“预计达成日期”上的重要事项，或可重新编辑/编写。评估时间价值，在时长栏中填入对应此事项值得花费的时长，并在<a @click.stop="navTo('D',null,'improtant')">日程</a>栏中安排最适合执行此事项的时段。</p>
                        <p class="help-menu-content"><a @click.stop="navTo('D',null,'communication')">沟通</a>栏中会显示在<a @click.stop="navTo('D',null,'communication')">讨论计划</a>和<a @click.stop="navTo('D',null,'communication')">授权计划</a>表中对应当日日期的沟通人及沟通事项，也可重新编辑/编写。</p>
                        <p class="help-menu-content">达成<a @click.stop="navTo('D',null,'track')">31日追踪事项</a>中的事项后，按“达成”按钮，成果将显示在“我的成就”栏目中。</p> -->
                         <p class="help-menu-content first-row">● “日计划”由“紧要事项”、“重要事项”、“沟通/追踪”和“31日追踪事项”组成。</p>
                         <p class="help-menu-content">● “紧要事项”和“重要事项”来自月目标中“预计达成日期”为当日的紧要事项或重要事项，也可点击“添加”键新增事项。</p>
                         <p class="help-menu-content">● 在事项栏点击“事项”栏的事项进行计划，在“时长”栏或时段栏填入你认为此事项值得花费的时长、以及执行此事项的时段，以保证此事项能被专注完成。这些事项都可以通过点击“删除”、“延后”、“终止”或“达成”键改变其状态。</p>
                         <p class="help-menu-content">● “沟通/追踪”的事项来自“沟通”页的内容，也可在此栏右侧点击“添加”键添加需沟通的事项。</p>
                         <p class="help-menu-content">● “31日追踪事项”来自月目标，可以每日点击“达成”键打卡追踪、或在本月内点击过往日期进行补打卡，完成成果将显示在“我的成就”栏中。</p>
                         <p class="help-menu-content">● 可点击“日计划”左上角的日历、对选择日做计划或查看某日的日计划；也可点击“当日行程”查看当日具体时段的安排，此行程还会显示在月目标的“周时间图表”里已规划的时段。</p>
                      </template>
                      <template v-else-if="data.id === '6'">
                        <p class="help-menu-content first-row">● 此页中记录了所有日、周、月、年目标和梦想中你点击为“达成”的目标事项，以庆祝自己的成功。</p>
                        <p class="help-menu-content">● 可点击“我的成就”左上角选择要查阅对应的日、周、月、年。</p>
                      </template>
                      <template v-else-if="data.id === '7'">
                        <!-- <p class="help-menu-content first-row{"><a @click.stop="navTo('C','0',null)">讨论计划</a>：用于编辑需要与之沟通讨论的人和事项。</p>
                        <p class="help-menu-content"><a @click.stop="navTo('C','1',null)">授权计划</a>：用于对授权进行计划和跟踪执行，支持和辅导被授权人，逐步提升其被授权程度。</p>
                        <p class="help-menu-content"><a @click.stop="navTo('C','2',null)">会议计划</a>：用于筹划和准备一场重要的会议，帮助参会者提前做好准备。</p>
                        <p class="help-menu-content"><a @click.stop="navTo('C','3',null)">沟通总表</a></p> -->
                      </template>
                      <template v-else-if="data.id === '7-1'">
                        <p class="help-menu-content first-row">● 点击“添加”键添加新的讨论。</p>
                        <p class="help-menu-content">● 选择“类型”，如类型是“项目”，则可在其内添加不同的“沟通事项”及其下的“具体行动”；如类型是“事项”，则只需添加“具体行动”。</p>
                        <p class="help-menu-content">● 系统默认“具体行动”的负责人为“本人负责”，此项行动会根据“追踪日期”和“预计达成日期”出现在日计划页的“重要事项”或“紧要事项”中；若负责人并非本人，请取消“本人负责”标识的勾选并填入具体负责人姓名，则此项会按“追踪日期”出现在日计划页的“沟通/追踪事项”中。</p>
                        <p class="help-menu-content">● 可点击讨论事项栏的“修改”键对已有的讨论计划进行修改完善。</p>
                      </template>
                      <template v-else-if="data.id === '7-2'">
                        <p class="help-menu-content first-row">● 点击“添加”键添加授权任务，并依据授权计划表的内容清晰思考并填写你的授权内容、被授权人、授权层级、授权/反馈行动。</p>
                        <p class="help-menu-content">● 如该授权任务需进行多次指导动作，请在“授权/反馈的行动”栏点击“添加”键添加“具体行动”，具体行动会根据“追踪日期”和“预计达成日期”出现在日计划的“重要事项”或“紧要事项”中。</p>
                      </template>
                      <template v-else-if="data.id === '7-3'">
                        <p class="help-menu-content first-row">● 点击“添加”键添加会议，并依据会议计划表仔细思考筹划会议目的、日程安排、会前和会后需采取的行动。</p>
                        <p class="help-menu-content">● 在会议计划页的“会议日程安排”栏，点击“添加”键添加会议日程；在“行动计划”栏，点击“添加”键添加具体行动。“具体行动”由“本人负责”的，此项行动会根据“追踪日期”和“预计达成日期”出现在日计划页的“重要事项”或“紧要事项”中；若负责人并非本人，请取消“本人负责”标识的勾选并填入具体负责人姓名，则此项将会按“追踪日期”出现在日计划页的“沟通/追踪事项”中。</p>
                      </template>
                      <template v-else-if="data.id === '7-4'">
                        <p class="help-menu-content first-row">● 便于通过搜索人名、快速找到某位沟通人名下的所有沟通事项，使沟通尽可能完整、有效的发生。</p>
                        <p class="help-menu-content">● 在沟通总表中点击某事项为“达成”键的，则日计划及讨论计划中对应事项自动调整为“达成”状态。</p>
                      </template>
                      <template v-else-if="data.id === '8'">
                        <p class="help-menu-content first-row">● 点击年度页签选择需规划的年份，点击日历添加“规划事项”、“开始日期”和“结束日期”，也可点击已经设定的事项进行修改或删除。</p>
                      </template>
                      <template v-else-if="data.id === '9'">
                        <!-- <p class="help-menu-content"><a @click.stop="navTo('L',0,null)">人生目标</a></p>
                        <p class="help-menu-content"><a @click.stop="navTo('L',1,null)">事业领域</a></p> -->
                      </template>
                      <template v-else-if="data.id === '9-1'">
                        <p class="help-menu-content first-row">● <b>愿景：</b>是对未来生活情景的意象描绘，即希望自己未来个人发展或生活的样子。填写完毕后请务必按下“保存”键，保存填写或修改的内容。同时可点击“上传图片”加入照片或图画、以使愿景更具象化。</p>
                        <p class="help-menu-content">● <b>使命：</b>是个体独特的人生目的，它描述了个体“生存的理由”，希望一生为什么而活。填写完毕请务必点击“保存”键，保存填写或修改的内容。</p>
                        <p class="help-menu-content">● <b>价值观：</b>是个体认为生命中真正重要的、有价值的、要为之付出和持守的价值标准和行为准则。包括核心价值观和对人生六大领域价值的认知，点击“上移”键可调整人生六大领域的排序，此优先顺序排序会呈现在年度目标、和月目标中。</p>
                        <p class="help-menu-content">● <b>梦想：</b>是愿景的同义词，也可以说是愿景的拼图块，是追求和实现愿景的组成部分。点击“添加”键填写想要拥有的人生梦想。当要开始实施梦想时，点击“制定规划”键为梦想制定详细的目标规划。规划制定完成后，可点击“发布”；如未规划完全，可点击“保存”。所有已规划的梦想，其“制定规划”键颜色为绿色，未进行规划的“制定规划”键颜色为蓝色。完成“制定规划”的梦想将出现在“目标清单总表”中，并根据规划的内容显示在相应的年、月、周、日的目标计划中。当梦想实现时，可点击“实现”键，已实现的梦想将会体现在“我的成就”中。</p>
                      </template>
                      <template v-else-if="data.id === '9-2'">
                        <p class="help-menu-content first-row">● <b>愿景：</b>是对未来事业领域要达成状态的意象描绘，即希望事业未来发展成的样子。填写完毕后请务必按下“保存”键，保存填写或修改的内容。同时可点击“上传图片”加入照片或图画、以使愿景更具象化。</p>
                        <p class="help-menu-content">● <b>使命：</b>描述个体期望在事业中为什么而奋斗、所持续贡献和成就的是什么。填写完毕请务必点击“保存”键，保存填写或修改的内容。</p>
                        <p class="help-menu-content">● <b>价值观：</b>价值观是个人在事业领域中认为真正重要的、有价值的、要为之付出和持守的价值标准和行为准则。包括核心价值观和对事业领域价值的全面阐述，填写完毕请务必点击“保存”键，保存填写或修改的内容。</p>
                        <p class="help-menu-content">● <b>梦想：</b>是愿景的同义词，也可以说是愿景的拼图块，是追求和实现愿景的组成部分。点击“添加”键填写想要拥有的人生梦想。当要开始实施梦想时，点击“制定规划”键为梦想制定详细的目标规划。规划制定完成后，可点击“发布”；如未规划完全，可点击“保存”。所有已规划的梦想，其“制定规划”键颜色为绿色，未进行规划的“制定规划”键颜色为蓝色。完成“制定规划”的梦想将出现在“目标清单总表”中，并根据规划的内容显示在相应的年、月、周、日的目标计划中。当梦想实现时，可点击“实现”键，已实现的梦想将会体现在“我的成就”中。</p>
                      </template>
                      <template v-else-if="data.id === '10'">
                        <p class="help-menu-content first-row"> <b>备忘录：</b>作为临时事件的备忘记录，也可以培养随时记录零散思路集中处理事情的习惯。</p>
                        <p class="help-menu-content">● 点击“添加”键添加随时想到的事项，如果后续还想到与之相关的人或事，可点击“修改”键进行添加或修改，然后再集中处理。</p>
                        <p class="help-menu-content">● 可通过内容中的字段、主题或日期，点击“查询”键，查找曾经记录的人或事。</p>
                        <p class="help-menu-content"><b>帮助：</b>帮助栏中可以查找到目标规划·SP系统中所有项目内容的使用说明。</p>
                      </template>
                  </div>
                </el-tree>
            </div>
        </div>
        <el-dialog
          class="Integralsm"
          title="小睿（睿思智得客服）"
          :visible.sync="Integralsm"
          width="300px"
          :close-on-click-modal="false">
          <div class="zhushou">
                  <div class="zhushou-title">如有问题请添加小睿微信在线咨询</div>
                  <img :src="baseUrl+'media/zhushou.jpg'" alt="">
              </div>
              <a slot="reference" class="name-highlight">小睿（睿思智得客服）</a>
          </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
      state: 0,
      Integralsm: false,
      data: [{
        label: '目标清单总表：',
        des: '用于汇总所有你已经设定的目标。',
        icon: 'G',
        id: '1'
      }, {
        label: '年度重要目标：',
        des: '用于添加和记录所有目标开始日期在本年度的目标。',
        icon: 'Y',
        id: '2'
      }, {
        label: '月目标',
        icon: 'M',
        id: '3',
        children: [
          {
            label: '月度目标：',
            des: '用于设定和追踪月度要达成的目标和事项。',
            icon: 'M',
            id: '3-1'
          },
          {
            label: '周时间图表：',
            des: '用于帮助你拟定理想的周时间安排、培养在固定的时段专注做事的习惯。',
            icon: 'M',
            id: '3-2'
          },
          {
            label: '31日追踪事项：',
            des: '用于协助培养成功的行为习惯。',
            icon: 'M',
            id: '3-3'
          },
          {
            label: '月历表：',
            des: '',
            icon: 'M',
            id: '3-4'
          }
        ]
      },
      {
        label: '周目标：',
        des: '用于设定和追踪本周要实施或达成的目标和事项。按周一到周日的日期区隔出自然周。',
        icon: 'W',
        id: '4'
      },
      {
        label: '日计划：',
        des: '',
        icon: 'D',
        id: '5'
      },
      {
        label: '我的成就：',
        des: '',
        icon: 'A',
        id: '6'
      },
      {
        label: '沟通',
        icon: 'C',
        id: '7',
        children: [
          {
            label: '沟通追踪：',
            des: '用于记录和追踪重要讨论会后的行动。',
            icon: 'C',
            id: '7-1'
          },
          {
            label: '授权计划：',
            des: '用于帮助管理者对授权进行规划和跟踪执行、以确保授权结果，同时支持和辅导被授权人，逐步提升其被授权程度。',
            icon: 'C',
            id: '7-2'
          },
          {
            label: '会议计划：',
            des: '用于筹划和准备一场重要的会议并追踪行动，同时帮助参会者提前做好准备。',
            icon: 'C',
            id: '7-3'
          },
          {
            label: '沟通总表：',
            des: '',
            icon: 'C',
            id: '7-4'
          }
        ]
      },
      {
        label: '未来规划：',
        des: '用于记录未来2-3年的长期承诺、规划和项目。',
        icon: 'F',
        id: '8'
      }, {
        label: '人生规划：',
        des: '用于帮助对人生进行全面思考，包括“个人规划”和“事业规划”两大模块。每个模块都包括了“愿景”“使命”“价值”和“梦想”四个部分。',
        icon: 'L',
        id: '9',
        children: [
          {
            label: '个人规划',
            icon: 'L',
            id: '9-1'
          },
          {
            label: '事业规划',
            icon: 'L',
            id: '9-2'
          }
        ]
      },
      {
        label: '备忘录/帮助：',
        des: '',
        icon: 'H',
        id: '10'
      }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    baseUrl() {
      let baseUrl = ''
      if (process.env.BASE_API === 'http://www.fascte.cn:9202/') {
        // 测试
        baseUrl = 'http://www.fascte.cn:9201/'
      } else {
        // 生产
        baseUrl = 'https://www.raise-wisdom.com/'
      }
      return baseUrl
    },
    tableHight() {
      return this.$store.state.app.containHeight - 430
    }
  },
  methods: {
    navTo(name, tab, text) {
      this.$emit('navTo', {
        name,
        tab,
        text
      })
    },
    dialogVisiblejfsm() {
      this.Integralsm = true
    }
  }
}
</script>
<style lang="scss">
@import '../color.scss';
.tt-helprenew{
  .zhushou{
    text-align: center;
    margin-top:10px;
     .zhushou-title{
         font-size: 14px;
     }
     img{
         width: 240px;
         display: block;
         margin: 0 auto;
     }
}
    position: relative;
    // padding: 0 24px 24px;
    .i-content{
      height:calc(100% - 66px);
      overflow:auto;
      padding:5px 24px 24px;
    }
    .help-title{
      .image-right {
     position: absolute;
     top:26px;
     left:112px;
    }
      height: 66px;
      // width:calc(100% + 24px);
      width:100%;
      line-height: 66px;
      font-family: PingFangSC-Semibold;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
      border-bottom: 1px solid #cccccc;
      // margin-bottom: 28px;
      position: relative;
      padding-left: 24px;
      padding-right: 24px;
      .jump-project{
        position: absolute;
        right: 24px;
        font-size: 17px;
        font-weight: normal;
        color: #00afff;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .icon-help{
      &.G{
          color: $colorG;
      }
      &.Y{
          color: $colorY;
      }
      &.M{
          color: $colorM;
      }
      &.W{
          color: $colorW;
      }
      &.D{
          color: $colorD;
      }
      &.A{
          color: $colorA;
      }
      &.C{
          color: $colorC;
      }
      &.F{
          color: $colorF;
      }
      &.L{
          color: $colorL;
      }
      &.H{
          color: $colorH;
      }
    }
    .help-menu-title{
      // margin-bottom: 10px;
    }
    .help-menu-content{
      line-height: 30px;
      padding-left: 1em;
      color: #666;
      white-space: normal;

      &.first-row{
        margin-top:10px;
      }
      a{
        color: #00afff;
        text-decoration: underline;
      }
      // &.intent{
      //   text-indent: 1em;
      // }
    }
     .el-tree-node__content{
      padding: 15px;
      margin-top: 15px;
      height: auto;
      background: #F5F7FA !important;
      border-radius: 5px;
      cursor: auto;
      .el-tree-node__expand-icon{
        font-size: 16px;
      }
    }
}
</style>