# Ramp · Ashby 实测

研究日期：2026-10-11（America/Los_Angeles）。样本：[ Security Engineer, Cloud ](https://jobs.ashbyhq.com/ramp/34413f8d-26bf-4bbc-8ade-eb309a0e2245/application)；职位 ID `34413f8d-26bf-4bbc-8ade-eb309a0e2245`。抽样来自本地数据集，链接可访问并出现申请入口。

## 页面流程、交互及边界

实际到达：Overview/Application、公司问题与地点候选；未执行完整验证或正式提交。

Ashby 共用骨架，但问题配置差异显著。Legal Name、Email、Phone、payroll tax 工作地点、Resume、LinkedIn；Cover Letter 可选。SMS Consent 是 Yes/No radio，并有 privacy/terms 链接，测试 No - I do not consent。7 年软件经验、5 年 AWS/Terraform 是 Yes/No 按钮；必填 AWS 经验 textarea；必填 encoded secret 题与安全属性解释 textarea；exceptional performance 可选 textarea。没有观察到 EEO 组。

地点输入 California，候选为 California (US) 和 California City / 其他州同名地，实际 5 个结果见快照；只查并清空。7 年经验 Yes→No 未新增字段。长编码题页面明确说明用来证明不是自动申请机器人以及能读代码；本次记录控件与完整题目证据，没有运行网页给出的代码或完成挑战。该公司配置需要专项人工内容，不能套用通用 Yes/No 规则解决。

一个尝试提交验证的工具调用在执行前的自动审批等待中超时；没有可确认的提交后状态，因此不记为已观察验证错误。最后停在未填写完整内容的 Application。顶部自动解析入口存在，但没有上传/解析实测。

## 字段观察并集

下表由实际 AX/DOM 状态提取，包含被隐藏前后及重复组。`not marked / unverified` 表示未证实必填，不能当作 optional。DOM 补充行与 AX 行可能表达同一控件的不同名称，不是字段总数。选项完整并集见 [菜单附录](../menu-options.md)，属性原文见 evidence，测试动作以上文为准。

|步骤|分组/上下文|字段（实际名称）|控件|必填观测|选项|证据|
|---|---|---|---|---|---|---|
|Application|Description: Application|Legal Name*|text field|yes (UI)|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application|Description: Application|Email*|text field|yes (UI)|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application|Description: Application|Phone*|text field|yes (UI)|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application|Description: Application|Yes - I consent to receiving text messages|radio button|not marked / unverified|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application|Description: Application|No - I do not consent to receiving text messages|radio button|not marked / unverified|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application|Description: Application|Secondary Actions: Expand|combo box|not marked / unverified|未展开/见选项附录|[ramp-01-form.txt](../evidence/ramp-01-form.txt)|
|Application|Description: Application|LinkedIn Profile*|text field|yes (UI)|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application|Description: Application|Description: Application|checkbox|not marked / unverified|未展开/见选项附录|[ramp-01-form.txt](../evidence/ramp-01-form.txt)|
|Application|Description: Application|Please elaborate on your experience building software in AWS (with Terraform)*|text entry area|yes (UI)|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application|Description: Application|Description: Application|text entry area|not marked / unverified|未展开/见选项附录|[ramp-01-form.txt](../evidence/ramp-01-form.txt)|
|Application|Description: Application|Description: Application|text entry area|not marked / unverified|未展开/见选项附录|[ramp-01-form.txt](../evidence/ramp-01-form.txt)|
|Application|Description: Application|Description: Application|text field|not marked / unverified|未展开/见选项附录|[ramp-01-form.txt](../evidence/ramp-01-form.txt)|
|Application|Description: Application|Description: Application|combo box|not marked / unverified|未展开/见选项附录|[ramp-02-california-query.txt](../evidence/ramp-02-california-query.txt)|
|Application||Where do you plan on working from (for payroll tax purposes)?*|DOM combobox|yes (UI)|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application||Resume*|DOM button|yes (UI)|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application||Cover Letter|DOM button|not marked / unverified|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application||Do you have a minimum of 7 years of experience building software? * / Yes|DOM button|yes (UI)|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application||Do you have a minimum of 7 years of experience building software? * / No|DOM button|yes (UI)|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application||Do you have a minimum of 5 years of experience building in AWS (with Terraform)?* / Yes|DOM button|yes (UI)|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application||Do you have a minimum of 5 years of experience building in AWS (with Terraform)?* / No|DOM button|yes (UI)|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application||Here's some text encoded in a common format. Figure out the correct secret and submit it in the field below. IyEvdXNyL2Jpbi9lbnYgcHl0aG9uMwoKJycnCktlZXAgdXMgb3V [完整题目见原始证据]|DOM textbox|not marked / unverified|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application||We believe exceptional performance in one area is a good indication of performance in other areas. Do you have any examples of exceptional performance you want to highlight?|DOM textbox|not marked / unverified|未展开/见选项附录|[ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)|
|Application||Terms and Conditions|DOM radio|not marked / unverified|未展开/见选项附录|[ramp-02-california-query.dom.txt](../evidence/ramp-02-california-query.dom.txt)|
|Application||- I consent to receiving text messages|DOM radio|not marked / unverified|未展开/见选项附录|[ramp-02-california-query.dom.txt](../evidence/ramp-02-california-query.dom.txt)|
|Application||In the above question, we ask you to figure out a secret to prove two things: (1) that you are not a bot auto-applying to the role and (2) that you are able to read and interact with code. With those goals in mind, what are the security properties (if any) of the resulting secret? Do we achieve our goals? How could we do so more effectively?*|DOM textbox|yes (UI)|未展开/见选项附录|[ramp-02-california-query.dom.txt](../evidence/ramp-02-california-query.dom.txt)|


## 重要状态截图

- [ramp-01-form.jpg](../screenshots/ramp-01-form.jpg)
- [ramp-02-california-query.jpg](../screenshots/ramp-02-california-query.jpg)
- [ramp-03-test-answer-no.jpg](../screenshots/ramp-03-test-answer-no.jpg)
- [ramp-04-overview.jpg](../screenshots/ramp-04-overview.jpg)

## 原始证据索引

- [ramp-01-form.dom.txt](../evidence/ramp-01-form.dom.txt)
- [ramp-01-form.txt](../evidence/ramp-01-form.txt)
- [ramp-02-california-query.dom.txt](../evidence/ramp-02-california-query.dom.txt)
- [ramp-02-california-query.txt](../evidence/ramp-02-california-query.txt)
- [ramp-03-test-answer-no.dom.txt](../evidence/ramp-03-test-answer-no.dom.txt)
- [ramp-03-test-answer-no.txt](../evidence/ramp-03-test-answer-no.txt)
- [ramp-04-overview.dom.txt](../evidence/ramp-04-overview.dom.txt)
- [ramp-04-overview.txt](../evidence/ramp-04-overview.txt)
- [ramp-latest.dom.txt](../evidence/ramp-latest.dom.txt)
- [ramp-structured-controls.json](../evidence/ramp-structured-controls.json)
