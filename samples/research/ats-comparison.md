# ATS 跨公司比较

每个 ATS 三家，每家一个职位。结果是该职位/地区/时点的实测，不能据此把地区差异认定为整个公司的固定设置。推断 ATS 专属逻辑与公司配置时，以共享骨架和实际差异为依据，不声称了解后台配置。

## 同一 ATS 内差异

|维度|Workday：NVIDIA / Adobe / Salesforce|Greenhouse：Anthropic / Figma / Airbnb|Ashby：Notion / Ramp / OpenAI|Lever：Palantir / Zoox / Veeva|
|---|---|---|---|---|
|页面骨架|方法选择→Manual→五步向导一致|两托管、一公司内嵌；长表单|Overview/Application、Autofill、长表单一致|详情→/apply 长表单一致|
|认证|NV/SF 必须；Adobe 访客|手填均不强制；Figma 可选 MyGreenhouse|本次均无账户门槛|本次均无账户门槛|
|步骤/Review|5 步一致；Adobe/SF Review 实测，NV 第4步|未观察独立 Review|未观察独立 Review|未观察独立 Review|
|导航|Adobe Next；NV/SF Save and Continue；Back|Apply/页面滚动；Airbnb页签/frame|tab/Apply link；单页提交|详情 Apply/apply for this job；单页提交|
|初始经历|NV/SF 空；Adobe 各一项；三家可增多项|本岗位均未见重复履历编辑器|本岗位均未见重复履历编辑器|本岗位均未见重复履历编辑器|
|教育结构|NV/Adobe 有 GPA，SF 未见；Degree 选项不同|未观察对应教育分组|未观察对应教育分组|Palantir 大学校 SELECT，其他未见|
|地址|加拿大切换共同存在；SF Address1/City/Postal 必填，Adobe可空|Country 是电话国家；Figma City 必填，Airbnb City 本轮未报错|地点 autocomplete；Ramp问 payroll location|Current location 必填仅Palantir标记；其余不同|
|附件|三家5MB；Adobe/SF缺失必填证实；均TXT上传成功|Airbnb Resume+Cover都必填；另两无独立必填Cover|三家Resume；Ramp另可选Cover；Notion解析实测|Palantir/Zoox简历必填；Veeva未标必填且解析实测|
|条件字段|SF previousworker Yes→4项；NV preferredname→2项；Adobe currentwork hidesTo|Figma Hispanic No→Race；selfdescribe无新字段|所测 sponsorship/经验切换无新题|Zoox Custom→文本；Palantir Other未出现文本|
|披露|NV race/gender/veteran必答含decline；SF有Intersex/MENA；Adobe仅条款|Gender/Hispanic/Veteran；Figma条件Race；Airbnb Gender Other|Notion/OpenAI radio EEO；Ramp未见|Zoox/Veeva原生 EEO；Palantir新加坡补充题|
|特殊公司题|NV两题；Adobe年龄/历史身份/核查等；SF政府/出口/I9/联系偏好|AnthropicAI与仲裁；Figma pronouns/地点；Airbnb AI/cover/隐私|NotionAnchorDays；Ramp编码题/SMS；OpenAI日期/180天限次/仲裁|Palantir语言学校；Zoox出口国家与日期；Veeva安全发件人确认/2年联系|
|实际验证|WD必填/邮箱格式/保存后进度变化|三家行内缺失验证|Notion汇总错误，其他未完整验证|Veeva原生required；Palantir/Zoox hCaptcha优先|

## 可复用层次与专属处理

|层次|可复用能力|仍需区分的逻辑|
|---|---|---|
|通用表单层|题文/分组/可见性识别；输入、radio、checkbox、附件；字段diff；错误收集；人工交接|不能按题意猜字段类型/必填/选项；不能把未知答案自动改Yes|
|Workday适配层|方法模态框、auth分支、heading+进度向导、重复组、分段日期、层级search选择|租户/职位是否强制账户；来源树；Degree；地址required；问题和披露|
|Greenhouse适配层|托管/内嵌发现、搜索combo、附件多入口、行内错误、可选MyGreenhouse|frame定位、Cover必填、Race条件、公司AI/仲裁/隐私题|
|Ashby适配层|Overview/Application、异步表单、Autofill进度、boolean按钮、校验汇总|公司问题、SMS/限次/仲裁、编码挑战、日期有无|
|Lever适配层|详情和/apply、resume解析、原生SELECT、未命名补充控件、native validity/captcha分支|简历/电话/位置必填、学校/语言、Custom条件、同意/联系期限|
|岗位内容层|保存题目原文、来源和答题意图，提供人工审核|Ramp代码题、Why company、项目经历、真实工作授权等需要申请者内容|

本次最重要的工程结论是“共享骨架 + 按页面发现配置”。公司或 ATS 名称可以帮助选择适配器，不能代替当前页面上已观察到的字段和状态。

## 个例完整入口

[NVIDIA](companies/nvidia.md)、[Adobe](companies/adobe.md)、[Salesforce](companies/salesforce.md)、[Anthropic](companies/anthropic.md)、[Figma](companies/figma.md)、[Airbnb](companies/airbnb.md)、[Notion](companies/notion.md)、[Ramp](companies/ramp.md)、[OpenAI](companies/openai.md)、[Palantir](companies/palantir.md)、[Zoox](companies/zoox.md)、[Veeva](companies/veeva.md)。每份报告附字段观察并集、按钮/选项关联、重要截图和全部原始证据索引。
