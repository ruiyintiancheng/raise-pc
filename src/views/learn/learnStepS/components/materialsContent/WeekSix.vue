<template>
    <div class="materials-article">
                 <img :src="watermark" class="watermark" alt="">
          <img :src="watermarkLmi" class="watermark-lmi" alt="">
          <h3 class="materials-title">学习目录清单：</h3>
          <p>■	关于LMI及其创始人保罗.麦尔先生</p>
          <p>■	LMI的核心理念：</p>
          <p style="text-indent: 3em;">成功、激励、改变态度、制约、成功人士的三大特质、略胜一筹、改变的循环</p>
          <p>■	自我评估与我的挑战</p>
          <p>■	S.M.A.R.T.目标</p>
          <p>■ 目标计划工作单</p>
          <p>■ 为每一天排列优先顺序</p>
          <p>■ 周目标、日计划、31日追踪表</p>
          <p>■	生命之轮：人生六大领域（家庭与天伦、身体与健康、精神与道德、事业与理财、心智与教育、社交与文化）</p>
          <p>■ 月度目标计划</p>
          <p>■	完整的目标规划·SP系统</p>

          <h3 class="materials-title" style="margin-top:20px" >主要学习内容：</h3>
          <p class="p-c">●	成功：逐步的实现、有价值的、预先设定的、个人的目标。</p>
          <p class="p-c">●	激励：MOTIVATION：MOTIVE和ACTION，是朝向目标运动即是目标导向的行动。</p>
          <p class="p-c plus">内在持久的：态度式激励</p>
          <p class="p-c plus">外在暂时的：恐惧式/诱因式激励	</p>
          <p class="p-c">●	态度：思维的习惯。态度决定一切，你所创造的成果取决于你的习惯性思维模式。</p>
          <p class="p-c">●	态度式激励：通过改变态度、调整和建立新的思维的习惯，不断获得我们想要获得的成果，从而达成的激励。</p>
          <p class="p-c">●	制约：是习惯的另一种说法。</p>
          <p class="p-c">●	改变态度：间隔重复地改变我们的制约程序，继而我们的思维习惯、即态度也会随之改变。</p>
          <p class="p-c">●	成功人士的三个特质：积极心态、目标导向、自我激励。</p>
          <p class="p-c">●	略胜一筹：每天改变一点点。</p>
          <p class="p-c">●	改变的循环：如果总是以同样的方式思考，用同样的方式做事，我们得到的也只是同样的结果。 所以为得到不同的结果，我们需要改变。 </p>
          <p class="p-c">●	思考你想成为的样子→评估发现面临的挑战→找到影响胜任当下角色职责或长远发展的关键挑战→转化为带来改变的S.M.A.R.T.目标。</p>
          <p class="p-c">●	S.M.A.R.T.目标：具体的、可衡量的、可达成的、现实的、实质的。</p>
          <p class="p-c">●	目标计划工作单：帮助你规划目标以便更有效地达成目标。</p>
          <p class="p-c plus">内容主要包括：领域、今天/预计/达成日、S.M.A.R.T.目标、达成目标的收益和/或达成目标所能避免的损失、与达成目标相关的所有资源、可能的障碍/可能的解决方法、完成此目标的明确行动步骤、目标日期/回顾日期/完成日期、跟踪进度的方法、符合你的价值观/值得否？自我肯定宣言、具象化。</p>
          <p class="p-c">●	为每一天排列优先顺序：</p>
          <p class="p-c plus">➢	信守你对自己的承诺和信守你对别人的承诺同样重要！</p>
          <p class="p-c plus">➢	紧要事项：紧要活动是那些与你最优先目标直接相关的行为，因此几乎所有与高回报活动相关的事情都是紧要事项。</p>
          <p class="p-c plus">➢	重要事项：重要事项通常对你当下的目标结果贡献甚微，在完成所有当天的紧要事项后，可以转移到重要事项清单上。</p>
          <p class="p-c plus">➢	周目标表/日计划表/31日追踪表</p>
          <p class="p-c">●	生命之轮：包括人生六大领域：家庭与天伦、事业与理财、心智与教育、身体与健康、社交与文化、精神与道德。</p>
          <p class="p-c">●	月度目标计划表：为月度制定清晰明确的目标并排列好优先顺序，可以帮助你逐步达成你想要实现的个人和事业的梦想。</p>
          <p class="p-c plus">内容主要包括：使命/宗旨、个人的焦点目标、工作的焦点目标、首要的个人和工作目标、高回报活动、紧要和重要事项。</p>
          <p class="p-c">●	完整的目标规划·SP系统</p>
          <p class="p-c">内容包括：目标总表、年度目标、月度目标、周目标、日计划、追踪、沟通/授权、成就；也包括更长远的人生规划和事业规划等内容。</p>

        </div>
</template>
<script>
import watermark from '@/assets/images/watermark.png'
import watermarkLmi from '@/assets/images/watermarkLMI.png'
export default {
  data() {
    return {
      watermark, watermarkLmi
    }
  }
}
</script>