# 控件行为与识别

所有举例均来自本次浏览器 UI 与辅助只读 DOM。下面的处理建议是研究推导，未编写爬虫或独立浏览器自动化。

|控件模式|实际证据|可靠识别与交互|容易误判之处|
|---|---|---|---|
|Workday 层级来源|三家 How Did You Hear About Us；Adobe Source、Salesforce External Career Site Sources、NVIDIA Website|打开根层，按当前可见子选项进入并等待回填；以题块+控件定位|按钮文字和选中值异步更新，重复点击可能操作错误项|
|Workday 自定义选择|Degree、国家/省、问题、披露|pop up button 展开 list/option；观察当前实际角色|Salesforce Veterans 有 list 项但 option 查询为空；不能解释为无选项|
|Workday 搜索多值|Field of Study/Skills；Adobe Computer 搜索已实测|输入、读取候选、选中、确认计数/值|提示先 100 条，不等于完整字典；学校本次是普通文本框|
|Workday 重复组|三家各添加两项工作/教育；Adobe 证书|以 group 名和新生成控件标识关联；组内定位 Delete/日期|整个分区 optional 与已新增记录中的必填可以同时成立|
|国家依赖|三家美国→加拿大，标签、必填、电话代码变化|变更后重新读 Address/State/Province/Phone|Adobe 地址可空，Salesforce 加拿大 Address1/City/Postal 必填；不能只按国家硬编码|
|分段日期|Workday 工作 From/To MM/YYYY；教育 YYYY；Adobe 证书 M/D/Y|识别 spinbutton 月/日/年、Calendar、分组 From/To|同名 Year 在同页大量重复；工作起止和教育起止不同|
|日历+文本|OpenAI Pick date...|type=text 但点击弹日历；可手输 11/15/2026 并失焦|字符串留存不证明最终提交接受；未测试格式错误与跨地区格式|
|纯日期语义文本|Anthropic earliest start；Zoox status obtained dates|直接 textbox/textarea，未观察相应日历|不能根据题目“日期”直接套日期选择器|
|Greenhouse 搜索 combo|Country、Figma City、公司 Yes/No/单确认|展开查看候选，Query 与最终 selection 分离|内部空 textbox 是 combo 搜索输入，不能当第二个业务字段|
|Greenhouse 条件问题|Figma Hispanic No→Race|改选择后检测新增题块；Race 七项已打开|Figma pronoun self describe 没出现新字段；Other 并非通用触发条件|
|Greenhouse 手填附件|Anthropic Enter manually→resume_text；Airbnb Resume/Cover|区分 Attach、云盘、手填文本入口|云盘登录与文件上传未全部走通；按钮集合因公司/嵌入配置不同|
|Ashby 布尔按钮|Notion sponsorship/Anchor Days、Ramp 经验、OpenAI 授权|DOM button、pressed 状态，点可见 Yes/No|AX 可呈现 checkbox，而隐藏 input 不能直接点；不同于真正多选|
|真 checkbox 多选|Notion 来源、Zoox 来源/Pronouns、Palantir Language|点击后验证多个同时 checked|Zoox Custom 展开文本，Palantir Other 没展开；不能靠选项词推断|
|原生 SELECT|Lever 学校/来源/EEO/Sponsorship|读取原生 options、按实际 label 选；展开核实|Palantir 3302 学校只检索目标；说明 Other 拼法与 label 不同|
|未命名控件|Lever 自定义问题 textareas；Ashby 位置仅名 Start typing...|从相邻题文和题块建立语义关联，保存 DOM 属性|只用 accessible name 会漏题或串题；不要只按全页顺序索引|
|iframe 表单|Airbnb iframe#grnhse_iframe|进入已观察到的 frame 再定位表单与错误|顶层 input 枚举遗漏整个申请表|
|异步解析|Notion Parsing/Autofilling；Veeva Analyzing/Success|区分附件存在、处理进行中、字段回填完成|Notion 电话未回填，Veeva 电话已回填；相同文件不同解析结果|
|验证类型|GH 行内；Ashby 汇总；Lever 原生/验证码；WD 缺失/格式|同时检查 summary/field errors/focus/native validity|点击之后暂时 disabled 是处理中，captcha 消失也不是成功|
|honeypot|NVIDIA 登录/注册 Enter website. ...robots only|标记为 trap，不作为候选人资料字段|只遍历所有 text input 会错误填写|

## 大菜单的目标查询结果

|目标|访问位置|结果|是否选作测试值|
|---|---|---|---|
|Tsinghua University|Palantir University 原生菜单|存在 exact label|否|
|University of California, Berkeley|同上|实际 label University of California - Berkeley；另有 Berkeley College|否|
|Cornell University|同上|Cornell University - Cornell Tech / Cornell University - Ithaca|否|
|China|Adobe Country；Anthropic Phone Country|Adobe 存在；Anthropic China +86，另含 Hong Kong SAR/Macao SAR|否|
|the US|Adobe Country；Anthropic Phone Country；Workday 默认值|United States / United States of America / United States +1 等语境不同|没有作为新测试个人地址选择；WD 初始默认美国已观察|
|california|NVIDIA 美国 State；Ramp 位置搜索|California 存在；Ramp 含多个同名城市/州候选|否|
|fremont|Figma/Notion 地点 autocomplete|分别 10/5 个候选，含 Fremont CA|否，查询后清空|

以上是指定位置的存在性检查，不表示 12 家都逐一搜索全部目标。自由 School 文本框不具有可检索学校字典。查询文字仅用于展开候选，未作为申请资料保留。

## 测试与证据边界

Sponsorship Yes/No 在 NVIDIA、Adobe、Anthropic、Notion、OpenAI、Palantir、Zoox、Veeva 已切换，均未见新增可见题；Salesforce 只完整记录菜单并选 No，Airbnb 只展开三项，Ramp 无该题。不能把这个结果推成所有公司永远无条件题。

DOM required=false 与页面星号、应用层验证可以不一致。字段清单用 yes (UI) 或 not marked / unverified 区分；后者不是 optional。重复的 DOM/AX 名称属于观察视角，不是独立字段数。菜单原文、显示选项和测试动作分别保留在 CSV、menu-options 和公司报告中。
