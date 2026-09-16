import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Copy,
  FileText,
  HeartHandshake,
  RotateCcw,
  Share2,
  Sparkles,
  Target,
  UserRound,
  Zap,
} from 'lucide-react'
import './styles.css'

const mbtiQuestions = [
  { axis: 'EI', text: '忙了一整天后，你更容易通过什么恢复？', options: ['找熟悉的人聊聊天', '一个人安静待着'] },
  { axis: 'EI', text: '在陌生的多人场合，你通常会？', options: ['主动找人打开话题', '先观察，等自然熟悉'] },
  { axis: 'EI', text: '想到一个新想法时，你更习惯？', options: ['边说边整理思路', '先在心里想清楚'] },
  { axis: 'EI', text: '周末突然空出半天，你更想？', options: ['约人出去走走', '留给自己随意安排'] },
  { axis: 'EI', text: '你更容易从哪里获得行动动力？', options: ['外界互动和现场氛围', '内在想法和独处时间'] },
  { axis: 'EI', text: '遇到新项目，你倾向于先？', options: ['马上和别人讨论', '先独立研究再交流'] },
  { axis: 'SN', text: '学习一个新东西时，你更想先知道？', options: ['具体步骤和实际例子', '整体概念和未来可能性'] },
  { axis: 'SN', text: '描述一次经历时，你更常讲？', options: ['发生了什么细节', '这件事意味着什么'] },
  { axis: 'SN', text: '做决定时，你更信任？', options: ['已经验证过的经验', '突然形成的直觉判断'] },
  { axis: 'SN', text: '别人交代任务时，你更喜欢？', options: ['清晰具体的要求', '知道目标后自由发挥'] },
  { axis: 'SN', text: '你对未来的关注点更接近？', options: ['眼前可以落地的安排', '长期趋势和可能的变化'] },
  { axis: 'SN', text: '看到一个新产品，你第一眼关注？', options: ['它现在怎么使用', '它还能发展出什么'] },
  { axis: 'TF', text: '做重要决定时，你更先考虑？', options: ['逻辑是否合理有效', '是否照顾到人的感受'] },
  { axis: 'TF', text: '朋友来找你倾诉时，你更自然的反应？', options: ['帮他分析问题和方案', '先陪他把情绪接住'] },
  { axis: 'TF', text: '评价一个方案时，你更看重？', options: ['标准一致和结果效率', '价值观和实际影响的人'] },
  { axis: 'TF', text: '发生冲突时，你更希望？', options: ['把事实和责任说清楚', '先让关系恢复安全感'] },
  { axis: 'TF', text: '给别人反馈时，你通常会？', options: ['直接指出可以改进的地方', '先考虑对方能否舒服地听进去'] },
  { axis: 'TF', text: '你认为公平更接近？', options: ['每个人遵循同一套规则', '根据具体处境给予支持'] },
  { axis: 'JP', text: '旅行前，你更倾向于？', options: ['提前安排好大部分计划', '保留空间，到了再决定'] },
  { axis: 'JP', text: '面对截止日期，你通常？', options: ['提前完成更安心', '靠近期限时效率最高'] },
  { axis: 'JP', text: '你的桌面或文件更接近？', options: ['有固定的整理方式', '需要时能找到就行'] },
  { axis: 'JP', text: '计划临时改变时，你的第一反应？', options: ['有点烦，需要重新安排', '挺好，新的可能出现了'] },
  { axis: 'JP', text: '完成一件事对你意味着？', options: ['做出决定并画上句号', '先留着，之后可能还会调整'] },
  { axis: 'JP', text: '安排一天时，你更喜欢？', options: ['知道每个时段大概做什么', '根据当时的状态自由切换'] },
]

const tests = [
  {
    id: 'work',
    eyebrow: '最受欢迎',
    title: '上班牛马生活指数',
    description: '看看你的工作，正在占用多少生活。',
    meta: '12 题 · 约 2 分钟',
    icon: Zap,
    tone: 'coral',
    questions: [
      { text: '下班后，你还会继续回复工作消息吗？', options: ['几乎不会', '偶尔会', '经常会', '已经习惯了'] },
      { text: '临时被安排工作时，你通常会怎么做？', options: ['明确拒绝', '看情况帮忙', '先答应再说', '不敢拒绝'] },
      { text: '你最近的睡眠，最接近哪种状态？', options: ['规律且够用', '偶尔熬夜', '经常睡不够', '躺下也在想工作'] },
      { text: '你有多久没有完整休过一个周末了？', options: ['最近就有', '一两个月', '说不清了', '我不记得'] },
      { text: '会议或聊天里，你是否经常替别人收尾？', options: ['很少', '偶尔', '经常', '几乎总是'] },
      { text: '想到明天上班，你身体的第一反应是？', options: ['还好', '有一点烦', '明显抗拒', '胸口发紧'] },
      { text: '你的工作成果，通常能被准确看见吗？', options: ['基本能', '一半一半', '经常被忽略', '常常替别人背锅'] },
      { text: '你会把工作情绪带回家吗？', options: ['很少', '偶尔', '大多数时候', '已经分不开了'] },
      { text: '你最近下班后的时间，主要花在哪里？', options: ['兴趣和朋友', '刷手机放空', '处理家务', '继续工作或内耗'] },
      { text: '面对不合理的需求，你的边界感如何？', options: ['清晰', '正在练习', '经常让步', '不知道怎么说不'] },
      { text: '发薪日后的消费，更接近哪种情况？', options: ['有计划', '会奖励自己', '不太记得花了什么', '月底需要精打细算'] },
      { text: '如果可以立刻改变一件事，你最想改变？', options: ['工作节奏', '沟通方式', '收入回报', '我想先好好休息'] },
    ],
  },
  {
    id: 'relationship',
    eyebrow: '关系观察',
    title: '伴侣可靠度观察',
    description: '不替你下结论，只帮你看见相处里的细节。',
    meta: '10 题 · 约 2 分钟',
    icon: HeartHandshake,
    tone: 'lavender',
    questions: [
      { text: '对方答应过的事，通常会做到吗？', options: ['大多做到', '偶尔忘记', '经常拖延', '说了但很少做到'] },
      { text: '发生分歧时，对方愿意认真听你说完吗？', options: ['愿意', '需要提醒', '经常打断', '直接回避或冷处理'] },
      { text: '你表达不舒服时，对方会怎么回应？', options: ['会关心并调整', '先解释自己', '觉得你太敏感', '把问题推回给你'] },
      { text: '你们对金钱和重要决定的透明度如何？', options: ['透明', '偶尔聊聊', '常常避开', '你很少知道真实情况'] },
      { text: '对方在你需要支持时，通常会？', options: ['主动陪伴', '能力范围内帮忙', '嘴上支持较多', '让你自己消化'] },
      { text: '你们吵架后的修复速度如何？', options: ['会主动修复', '冷静后能谈', '通常不了了之', '长期积累成疙瘩'] },
      { text: '对方是否尊重你的个人边界？', options: ['尊重', '还在磨合', '偶尔越界', '经常让你感到被控制'] },
      { text: '你能在这段关系里做真实的自己吗？', options: ['可以', '大部分时候可以', '需要小心表达', '经常压抑自己'] },
      { text: '你们对未来的想法，是否大致一致？', options: ['方向一致', '还在讨论', '差异比较大', '很少认真聊过'] },
      { text: '你想到这段关系时，更多感受到？', options: ['安心', '甜蜜和不确定并存', '疲惫', '长期焦虑'] },
    ],
  },
  {
    id: 'social',
    eyebrow: '轻松一下',
    title: '社交电量测试',
    description: '你的电量，是被独处充满，还是被懂你的人充满？',
    meta: '8 题 · 约 1 分钟',
    icon: UserRound,
    tone: 'mint',
    questions: [
      { text: '连续参加两场聚会后，你会？', options: ['还想继续', '需要一点独处', '只想安静待着', '想把通知都关掉'] },
      { text: '别人临时约你，你第一反应是？', options: ['很开心', '看当天状态', '先想办法拒绝', '希望对方别再问'] },
      { text: '你能自然地拒绝不想参加的活动吗？', options: ['可以', '看关系', '常常不好意思', '基本不会拒绝'] },
      { text: '和熟人聊天时，你更常扮演？', options: ['分享者', '倾听者', '气氛担当', '情绪收纳箱'] },
      { text: '回复消息对你来说？', options: ['很自然', '有时会拖', '需要心理准备', '经常产生压力'] },
      { text: '一个人的晚上，你通常感觉？', options: ['很自在', '舒服但偶尔无聊', '容易胡思乱想', '特别想找人说话'] },
      { text: '你在关系里最在意？', options: ['轻松自在', '被理解', '稳定陪伴', '不用反复证明自己'] },
      { text: '最近你的社交状态更像？', options: ['电量充足', '正常运行', '低电量模式', '请勿打扰'] },
    ],
  },
  {
    id: 'mbti',
    path: '/tests/mbti',
    eyebrow: '专业版',
    title: 'MBTI 四维偏好测评',
    description: '从能量、信息、决策和生活方式四个维度，找到更像你的偏好组合。',
    meta: '24 题 · 约 5 分钟',
    icon: BrainCircuit,
    tone: 'plum',
    questions: mbtiQuestions,
  },
]

tests[0].path = '/tests/work'
tests[1].path = '/tests/relationship'
tests[2].path = '/tests/social'

const workResult = [
  { max: 14, label: '还有余量', color: 'mint', summary: '你还保留着自己的生活节奏，工作暂时没有完全越界。', advice: '继续守住下班后的那段时间，把休息当成日程的一部分。' },
  { max: 25, label: '正在透支', color: 'amber', summary: '你不是不累，只是已经很会把累藏起来了。', advice: '先从一个最小边界开始：每天给自己留出 30 分钟不处理工作。' },
  { max: 36, label: '临界状态', color: 'coral', summary: '工作正在挤压你的睡眠、情绪和生活掌控感。', advice: '把最近最常见的一类临时任务记录下来，尝试用一句话重新协商优先级。' },
  { max: 48, label: '需要停一下', color: 'plum', summary: '你已经不是简单的“忙”，而是长期处在被工作追着跑的状态。', advice: '这周先安排一次完整休息，并找可信任的人聊聊你的真实负荷。' },
]

const relationshipResult = [
  { max: 12, label: '稳定感较高', color: 'mint', summary: '你感受到的支持和尊重比较稳定，关系里有可依靠的部分。', advice: '把那些做得好的细节说出来，稳定的关系也需要被看见。' },
  { max: 21, label: '需要磨合', color: 'amber', summary: '这段关系有连接，也有一些反复出现的沟通卡点。', advice: '挑一件具体的小事谈，不要一次性把所有旧账都搬出来。' },
  { max: 30, label: '信任在消耗', color: 'coral', summary: '你可能已经在关系里承担了较多解释、等待和自我调整。', advice: '观察对方是否愿意共同解决问题，而不是只看一时的道歉或承诺。' },
  { max: 40, label: '先照顾自己', color: 'plum', summary: '这段关系带给你的不安感，已经值得被认真对待。', advice: '把你的底线和需要写下来，找一个安全的空间梳理事实与感受。' },
]

const socialResult = [
  { max: 10, label: '电量充足', color: 'mint', summary: '你能从连接里获得能量，也懂得给自己留下空间。', advice: '保持这种弹性，不需要为了证明合群而过度安排自己。' },
  { max: 18, label: '弹性在线', color: 'amber', summary: '你在独处和社交之间来回切换，状态会影响你的选择。', advice: '下次约人时，直接说出你的电量，比勉强赴约更轻松。' },
  { max: 26, label: '低电量模式', color: 'coral', summary: '你可能不是不想见人，而是最近没有多余能量应付关系。', advice: '给自己安排低压力社交，比如散步、短聊天或只见一个人。' },
  { max: 32, label: '请勿打扰', color: 'plum', summary: '你的系统正在优先恢复，不必为暂时不想社交感到内疚。', advice: '先把通知和邀约降到最低，恢复之后再决定想靠近谁。' },
]

const resultSets = { work: workResult, relationship: relationshipResult, social: socialResult }

const mbtiProfiles = {
  ISTJ: ['可靠的秩序建构者', '你擅长把责任落到细节里，用稳定、清晰和持续行动建立可信赖的结果。', '给自己留一点试错空间，不必每一步都先证明它一定可行。'],
  ISFJ: ['温和的照料执行者', '你会记住别人忽略的细节，也愿意用踏实的行动让身边的人感到安心。', '照顾别人之前，先确认自己的时间和精力也被纳入计划。'],
  INFJ: ['有方向感的洞察者', '你习惯从表象里寻找更深的意义，并把理想转化成对人有帮助的方向。', '不要只在心里打磨完美答案，适时让可信任的人参与进来。'],
  INTJ: ['独立的系统设计者', '你喜欢理解复杂系统的底层逻辑，再用长期视角搭建更有效的路径。', '好的方案也需要被人理解，表达过程本身也是设计的一部分。'],
  ISTP: ['冷静的现场解决者', '你擅长在真实情境中快速判断，拆解问题，并用灵活行动找到可用解法。', '别只在问题出现时才行动，提前说出你的长期需要会更省力。'],
  ISFP: ['敏锐的体验感受者', '你对环境、关系和真实感受很敏锐，倾向于用温和而具体的方式表达自己。', '你的偏好值得被说出来，不必总等别人猜到。'],
  INFP: ['真诚的价值守护者', '你重视内在价值和真实连接，通常会为了相信的事情保留温柔与坚持。', '把理想拆成一个今天能完成的小动作，能保护你的能量。'],
  INTP: ['好奇的逻辑探索者', '你喜欢追问原理、连接概念，并在独立思考中找到更准确的解释。', '不必等到完全想通才分享，早一点交流会带来更多材料。'],
  ESTP: ['敏捷的机会行动者', '你善于读懂现场、抓住机会，在变化中快速做出直接有效的行动。', '短期反应力很强，也可以为长期目标留一个固定锚点。'],
  ESFP: ['热情的现场连接者', '你能把注意力带回当下，用真诚、活力和具体陪伴让生活变得有温度。', '热闹之外也要给自己一段不需要回应任何人的时间。'],
  ENFP: ['充满可能性的连接者', '你容易看到人的潜力和事情的可能性，擅长用热情把灵感传递给别人。', '一次只推进少数重要方向，灵感才更容易变成作品。'],
  ENTP: ['灵活的观点挑战者', '你享受拆解假设、交换观点和寻找新路径，面对复杂问题时很有创造力。', '在提出更好的可能之前，先确认对方真正要解决的问题。'],
  ESTJ: ['清晰的目标推进者', '你擅长把目标、资源和责任组织起来，让事情沿着明确路径向前推进。', '效率之外，也给团队留出表达不同感受和信息的时间。'],
  ESFJ: ['稳定的关系组织者', '你重视共同体的秩序与感受，常常能把人和实际事务照顾得井井有条。', '不必用持续付出来换取关系稳定，明确分工也是一种关心。'],
  ENFJ: ['有感染力的成长推动者', '你能看到他人的潜力，也擅长用清晰愿景和真诚沟通推动共同成长。', '帮助别人之前先问一句对方是否真的需要你的方案。'],
  ENTJ: ['坚定的方向建构者', '你习惯从目标出发调动资源、做出决策，并持续优化实现路径。', '留意那些没有被指标表达出来的感受，它们也会影响最终结果。'],
}

const reportProfiles = {
  work: {
    title: '你的工作负荷画像',
    observation: '你正在用自己的休息时间，补贴工作系统的缺口。',
    explanation: '这不代表你不够努力，而是你承担的任务、情绪和责任，已经开始超出正常工作时间的边界。',
    dimensions: ['工作侵入生活', '恢复能力', '边界表达'],
    actions: ['今天下班后关闭一组非必要工作通知', '把一个临时任务改成“确认优先级后再开始”', '本周留出一段不安排任何人的恢复时间'],
    reminder: '如果持续出现失眠、明显焦虑或身体不适，请优先寻求专业支持。',
  },
  relationship: {
    title: '你的关系观察报告',
    observation: '可靠感不只来自承诺，更来自对方是否持续回应你的需要。',
    explanation: '一次测评不能替你判断一段关系，但可以帮助你把“哪里不舒服”拆成可观察的行为和事实。',
    dimensions: ['回应稳定度', '沟通修复力', '边界尊重度'],
    actions: ['挑一件具体的小事表达你的需要', '记录对方的实际行动，而不是只看当下的解释', '写下你在关系里不能被反复消耗的底线'],
    reminder: '如果关系中存在威胁、控制或让你感到不安全的行为，请优先联系可信任的人和专业机构。',
  },
  social: {
    title: '你的社交能量报告',
    observation: '你现在需要的可能不是更多安排，而是更少的消耗。',
    explanation: '社交电量会随着工作、睡眠和关系状态变化。暂时想安静一点，不等于你不合群。',
    dimensions: ['社交消耗度', '独处恢复力', '拒绝压力'],
    actions: ['把一个低优先级邀约改成更轻松的见面方式', '给自己安排一段不回复消息的时间', '用“我这周电量比较低，下次再约”替代勉强答应'],
    reminder: '如果长期对任何事情都提不起兴趣，或情绪明显影响生活，请考虑寻求专业支持。',
  },
  mbti: {
    title: '你的 MBTI 四维偏好报告',
    observation: '你的类型不是标签终点，而是一张理解自己默认工作方式的地图。',
    explanation: '这是一份基于自填答案的偏好观察，呈现你在四个维度上更自然、更省力的方向。人在不同情境中也可以使用另一侧的方式。',
    dimensions: ['能量方向', '信息取向', '决策方式', '生活方式'],
    actions: ['把一个最近卡住的问题，换成更符合你偏好的工作方式', '主动告诉身边的人，你更容易通过什么方式沟通和恢复', '观察自己在压力下会不会过度依赖某一侧偏好'],
    reminder: '本页面是独立开发的自我觉察工具，不是官方 MBTI 量表，也不用于诊断、招聘或重要人生决策。偏好没有高低之分。',
  },
}

function getReport(test, result) {
  const profile = reportProfiles[test.id]
  if (test.id === 'mbti') {
    return {
      ...profile,
      title: `${result.type} · ${result.profileTitle}`,
      observation: result.profileSummary,
      explanation: `${profile.explanation} 当前更明显的偏好组合是 ${result.type}。`,
      dimensions: profile.dimensions,
      metrics: result.metrics,
      actions: [result.advice, ...profile.actions.slice(1)],
    }
  }
  const maxScore = test.questions.length * 4
  const ratio = result.score / maxScore
  const offsets = [0, -0.08, 0.06]
  return {
    ...profile,
    metrics: profile.dimensions.map((name, index) => ({
      name,
      value: Math.min(98, Math.max(22, Math.round((ratio + offsets[index]) * 100))),
    })),
  }
}

function getInitialRoute() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  if (path === '/bundle') return { screen: 'home', bundle: true }
  const matched = tests.find((test) => test.path === path)
  return matched ? { screen: 'test-home', test: matched } : { screen: 'home', bundle: false }
}

function navigateTo(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function App() {
  const initialRoute = getInitialRoute()
  const [route, setRoute] = useState(initialRoute)
  const [screen, setScreen] = useState(initialRoute.screen)
  const [selectedTest, setSelectedTest] = useState(initialRoute.test || null)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const currentQuestion = selectedTest?.questions[answers.length]
  const progress = selectedTest ? (answers.length / selectedTest.questions.length) * 100 : 0

  const score = useMemo(() => {
    if (!selectedTest) return 0
    return answers.reduce((total, answer) => total + answer, 0)
  }, [answers, selectedTest])

  React.useEffect(() => {
    const onPopState = () => {
      const nextRoute = getInitialRoute()
      setRoute(nextRoute)
      setScreen(nextRoute.screen)
      setSelectedTest(nextRoute.test || null)
      setAnswers([])
      setResult(null)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function startTest(test) {
    setSelectedTest(test)
    setAnswers([])
    setResult(null)
    setScreen('quiz')
  }

  function chooseAnswer(index) {
    const nextAnswers = [...answers, index + 1]
    setAnswers(nextAnswers)
    if (nextAnswers.length === selectedTest.questions.length) {
      if (selectedTest.id === 'mbti') {
        const finalResult = calculateMbtiResult(selectedTest.questions, nextAnswers)
        setResult(finalResult)
        setScreen('result')
        return
      }
      const resultPool = resultSets[selectedTest.id]
      const finalResult = resultPool.find((item) => nextAnswers.reduce((a, b) => a + b, 0) <= item.max) || resultPool[resultPool.length - 1]
      setResult({ ...finalResult, score: nextAnswers.reduce((a, b) => a + b, 0) })
      setScreen('result')
    }
  }

  function goBack() {
    if (answers.length) {
      setAnswers(answers.slice(0, -1))
    } else {
      setScreen(route.test ? 'test-home' : 'home')
    }
  }

  function shareResult() {
    const text = result.isMbti
      ? `我刚完成了「${selectedTest.title}」，偏好画像是 ${result.type} · ${result.profileTitle}。`
      : `我刚测了「${selectedTest.title}」，结果是「${result.label}」${result.score} 分。`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      {screen === 'home' && (
        <HomeScreen tests={tests} onStart={startTest} onNavigate={navigateTo} bundle={route.bundle} />
      )}
      {screen === 'test-home' && selectedTest && (
        <TestLanding test={selectedTest} onStart={startTest} onHome={() => navigateTo('/')} />
      )}
      {screen === 'quiz' && selectedTest && currentQuestion && (
        <QuizScreen
          test={selectedTest}
          question={currentQuestion}
          questionNumber={answers.length + 1}
          total={selectedTest.questions.length}
          progress={progress}
          onBack={goBack}
          onAnswer={chooseAnswer}
        />
      )}
      {screen === 'result' && result && selectedTest && (
        <ResultScreen
          test={selectedTest}
          result={result}
          onRestart={() => startTest(selectedTest)}
          onHome={() => navigateTo('/')}
          onShare={shareResult}
          copied={copied}
        />
      )}
    </main>
  )
}

function calculateMbtiResult(questions, answers) {
  const totals = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  questions.forEach((question, index) => {
    const selected = question.options[answers[index] - 1]
    const side = selected === question.options[0] ? question.axis[0] : question.axis[1]
    totals[side] += 1
  })
  const type = `${totals.E >= totals.I ? 'E' : 'I'}${totals.S >= totals.N ? 'S' : 'N'}${totals.T >= totals.F ? 'T' : 'F'}${totals.J >= totals.P ? 'J' : 'P'}`
  const profile = mbtiProfiles[type]
  const pairScores = [
    { name: 'E / I', value: Math.round((Math.max(totals.E, totals.I) / (totals.E + totals.I)) * 100) },
    { name: 'S / N', value: Math.round((Math.max(totals.S, totals.N) / (totals.S + totals.N)) * 100) },
    { name: 'T / F', value: Math.round((Math.max(totals.T, totals.F) / (totals.T + totals.F)) * 100) },
    { name: 'J / P', value: Math.round((Math.max(totals.J, totals.P) / (totals.J + totals.P)) * 100) },
  ]
  return {
    type,
    profileTitle: profile[0],
    profileSummary: profile[1],
    advice: profile[2],
    label: type,
    color: 'plum',
    summary: profile[1],
    score: Math.round(pairScores.reduce((total, item) => total + item.value, 0) / pairScores.length),
    unit: '%',
    isMbti: true,
    metrics: pairScores,
  }
}

function Header({ compact = false }) {
  return (
    <header className={`topbar ${compact ? 'topbar-compact' : ''}`}>
      <div className="brand-mark"><Sparkles size={17} strokeWidth={2.5} /></div>
      <span className="brand-name">小测一下</span>
      <span className="brand-tagline">把最近的累，测成一个答案</span>
    </header>
  )
}

function HomeScreen({ tests, onStart, onNavigate, bundle }) {
  return (
    <div className="page home-page">
      <Header />
      <section className="hero">
        <div className="hero-kicker"><span className="live-dot" /> 今日已有 2,438 人完成测评</div>
        <h1>先别急着给自己<br /><em>下结论。</em></h1>
        <p>{bundle ? '四个独立测评，一次完成。适合做成小红书单品链接，也可以作为合集商品使用。' : '用几分钟，把模糊的疲惫、关系和情绪，整理成一个看得懂的状态报告。'}</p>
        <div className="hero-note"><CircleHelp size={15} /> 仅供自我觉察与娱乐，不替代专业判断</div>
      </section>

      <section className="section-head">
        <div>
          <span className="section-label">Pick your check-in</span>
          <h2>现在最想测什么？</h2>
        </div>
        <BarChart3 size={20} className="section-icon" />
      </section>

      <section className="test-list">
        {tests.map((test, index) => {
          const Icon = test.icon
          return (
            <button className={`test-card ${test.tone}`} key={test.id} onClick={() => onNavigate(test.path)}>
              <div className="test-card-top">
                <span className="test-number">0{index + 1}</span>
                <span className="test-eyebrow">{test.eyebrow}</span>
                <Icon size={21} className="test-icon" />
              </div>
              <div className="test-card-bottom">
                <div>
                  <h3>{test.title}</h3>
                  <p>{test.description}</p>
                  <span className="test-meta"><Clock3 size={13} /> {test.meta}</span>
                </div>
                <span className="circle-arrow"><ArrowRight size={18} /></span>
              </div>
            </button>
          )
        })}
      </section>

      <section className="mini-proof">
        <div className="proof-avatars"><span>林</span><span>小</span><span>M</span><span>+</span></div>
        <div><strong>不是算命，是把感受说清楚</strong><span>每次测评都会给你一个可以执行的小建议</span></div>
      </section>
      <footer className="footer">© 2026 小测一下 · 你的答案只属于你</footer>
    </div>
  )
}

function TestLanding({ test, onStart, onHome }) {
  const Icon = test.icon
  return (
    <div className="page test-landing-page">
      <Header />
      <button className="text-button landing-back" onClick={onHome}><ArrowLeft size={16} /> 全部测评</button>
      <section className={`landing-hero ${test.tone}`}>
        <div className="landing-icon"><Icon size={28} /></div>
        <span className="test-eyebrow">{test.eyebrow}</span>
        <h1>{test.title}</h1>
        <p>{test.description}</p>
        <div className="landing-meta"><Clock3 size={14} /> {test.meta}<span />独立结果报告</div>
      </section>
      <section className="landing-details">
        <span className="section-label">What you will get</span>
        <h2>答完就能看到完整结果</h2>
        <div className="landing-points">
          <div><strong>01</strong><span>你的核心指数与状态标签</span></div>
          <div><strong>02</strong><span>三个维度的具体拆解</span></div>
          <div><strong>03</strong><span>可以今天开始的小行动</span></div>
        </div>
        <button className="primary-button landing-start" onClick={() => onStart(test)}><Sparkles size={17} /> 开始测评 <ArrowRight size={17} /></button>
        <p className="landing-note"><CircleHelp size={14} /> 这是自我觉察工具，没有标准答案，也不替代专业判断。</p>
      </section>
    </div>
  )
}

function QuizScreen({ test, question, questionNumber, total, progress, onBack, onAnswer }) {
  return (
    <div className="page quiz-page">
      <Header compact />
      <div className="quiz-toolbar">
        <button className="icon-button" onClick={onBack} aria-label="返回"><ArrowLeft size={19} /></button>
        <div className="quiz-title"><span>{test.title}</span><strong>{questionNumber} <small>/ {total}</small></strong></div>
        <div className="quiz-progress"><span style={{ width: `${progress}%` }} /></div>
      </div>
      <section className="question-area">
        <div className="question-kicker">Question {String(questionNumber).padStart(2, '0')}</div>
        <h1>{question.text}</h1>
        <p className="question-hint">选择最接近你最近状态的答案</p>
        <div className="answer-list">
          {question.options.map((option, index) => (
            <button className="answer-option" key={option} onClick={() => onAnswer(index)}>
              <span className="answer-index">{String.fromCharCode(65 + index)}</span>
              <span>{option}</span>
              <ChevronRight size={17} />
            </button>
          ))}
        </div>
      </section>
      <div className="quiz-footer"><Target size={15} /> 没有标准答案，诚实比“选得好看”更有用</div>
    </div>
  )
}

function ResultScreen({ test, result, onRestart, onHome, onShare, copied }) {
  const report = getReport(test, result)
  return (
    <div className="page result-page">
      <Header compact />
      <div className="result-topline"><button className="text-button" onClick={onHome}><ArrowLeft size={16} /> 返回首页</button><span>你的测评结果</span></div>
      <section className={`result-hero ${result.color}`}>
        <div className="result-orbit orbit-one" />
        <div className="result-orbit orbit-two" />
        <span className="result-label">当前状态</span>
        <div className={`score-row ${result.isMbti ? 'mbti-score' : ''}`}><strong>{result.isMbti ? result.label : result.score}</strong><span>{result.isMbti ? '偏好画像' : '分'}</span></div>
        <h1>{result.label}</h1>
        <p>{result.summary}</p>
      </section>

      <section className="result-insight">
        <div className="insight-title"><Sparkles size={17} /><span>给你的一句话</span></div>
        <blockquote>“{result.advice}”</blockquote>
        <div className="result-actions">
          <button className="primary-button" onClick={onShare}>{copied ? <Check size={17} /> : <Share2 size={17} />} {copied ? '已复制结果' : '分享我的结果'}</button>
          <button className="secondary-button" onClick={onRestart}><RotateCcw size={17} /> 再测一次</button>
        </div>
      </section>

      <section className="report-preview full-report">
        <div className="preview-head"><div><span className="section-label">Your full check-in</span><h2>{report.title}</h2></div><FileText size={21} /></div>
        <p className="report-intro">{report.explanation}</p>
        <div className="report-metrics">
          {report.metrics.map((metric) => (
            <div className="metric" key={metric.name}>
              <div className="metric-label"><span>{metric.name}</span><strong>{metric.value}</strong></div>
              <div className="metric-track"><span style={{ width: `${metric.value}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="report-observation">
          <span className="section-label">The main observation</span>
          <strong>{report.observation}</strong>
        </div>
        <div className="report-actions">
          <div className="report-actions-head"><span className="section-label">Start small</span><h3>接下来可以做什么</h3></div>
          <ol>
            {report.actions.map((action) => <li key={action}>{action}</li>)}
          </ol>
        </div>
        <div className="report-reminder"><CircleHelp size={16} /><span>{report.reminder}</span></div>
        <p className="report-disclaimer">这份报告基于你的自填答案生成，仅供自我觉察与娱乐，不构成医疗、心理、法律或关系事实判断。</p>
      </section>
      <footer className="footer">结果基于你的自填答案生成，仅供自我觉察与娱乐</footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
