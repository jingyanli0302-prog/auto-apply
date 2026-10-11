# OpenAI · Ashby 实测

研究日期：2026-10-11（America/Los_Angeles）。样本：[ Technical Program Manager, Compute Infrastructure ](https://jobs.ashbyhq.com/openai/8fb1615c-34bf-47c4-a1d1-b7b2f836bbd3/application)；职位 ID `8fb1615c-34bf-47c4-a1d1-b7b2f836bbd3`。抽样来自本地数据集，链接可访问并出现申请入口。

## 页面流程、交互及边界

实际到达：Overview/Application、日期弹层与手输、Sponsorship 切换；未完整验证或提交。

Legal Name 必须按政府证件原文提示填写（本次空白）；Preferred Name 可选；Email、Resume、Phone Number、Location、可开始日期、工作授权、Sponsorship、每周美国办公室 3 天；Additional Information；Applicant Arbitration Agreement Acknowledgement 必填 checkbox；真实性和本人完成声明 checkbox；EEO Gender/Race/Veteran。顶部提示 180 天内最多 5 次申请，这是公司配置，不是其他 Ashby 公司规则。

日期虽然是 type=text / Pick date...，点击实际打开 October 2026 日历，有星期行及 Choose 日期按钮。手输 11/15/2026 并 Tab 后保留字符串；仅证明前端显示，未证明服务端接受。对比 Anthropic earliest start 的普通文本和 Workday 分段月年控件，不能仅按题名或 type=text 判断。

Sponsorship Yes→No 无可见条件字段。没有接受仲裁或真实性声明，也没有发送完整申请；本次没有证明独立 Review 是否存在。自动解析入口和附件入口可见但未实测上传。本研究不把网页中个人完成声明当成自动同意的授权。

## 字段观察并集

下表由实际 AX/DOM 状态提取，包含被隐藏前后及重复组。`not marked / unverified` 表示未证实必填，不能当作 optional。DOM 补充行与 AX 行可能表达同一控件的不同名称，不是字段总数。选项完整并集见 [菜单附录](../menu-options.md)，属性原文见 evidence，测试动作以上文为准。

|步骤|分组/上下文|字段（实际名称）|控件|必填观测|选项|证据|
|---|---|---|---|---|---|---|
|Application|Description: Application|Legal Name*|text field|yes (UI)|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Preferred Name (if applicable)|text field|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Email*|text field|yes (UI)|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Phone Number*|text field|yes (UI)|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Secondary Actions: Expand|combo box|not marked / unverified|未展开/见选项附录|[openai-01-form.txt](../evidence/openai-01-form.txt)|
|Application|Description: Application|(settable)|text field|not marked / unverified|未展开/见选项附录|[openai-01-form.txt](../evidence/openai-01-form.txt)|
|Application|Description: Application|Description: Application|checkbox|not marked / unverified|未展开/见选项附录|[openai-01-form.txt](../evidence/openai-01-form.txt)|
|Application|Description: Application|Additional Information|text entry area|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|I acknowledge that I have opened, read, and understood the Arbitration Agreement. I understand that by submitting my application, I am agreeing to be bound by the terms of the Arbitration Agreement.|checkbox|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|I confirm I have read the above.|checkbox|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Male|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Female|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Decline to self-identify|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Hispanic or Latino|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|White (Not Hispanic or Latino)|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Black or African American (Not Hispanic or Latino)|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Asian (Not Hispanic or Latino)|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|American Indian or Alaska Native (Not Hispanic or Latino)|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Two or More Races (Not Hispanic or Latino)|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|Decline to self-identify|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|I identify as one or more of the classifications of protected veteran listed above|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|I am not a protected veteran|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|I decline to self-identify for protected veteran status|radio button|not marked / unverified|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application|Description: Application|并且|text field|not marked / unverified|未展开/见选项附录|[openai-02-date-picker.txt](../evidence/openai-02-date-picker.txt)|
|Application|Description: Application|11/15/2026|text field|not marked / unverified|未展开/见选项附录|[openai-03-date-text.txt](../evidence/openai-03-date-text.txt)|
|Application||Resume*|DOM button|yes (UI)|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application||Where are you currently located?*|DOM combobox|yes (UI)|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application||When can you start a new role?*|DOM textbox|yes (UI)|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application||Are you authorized to work in the country where the job is located?* / Yes|DOM button|yes (UI)|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application||Are you authorized to work in the country where the job is located?* / No|DOM button|yes (UI)|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application||Will you now or in the future require sponsorship for employment visa status in this country?* / Yes|DOM button|yes (UI)|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application||Will you now or in the future require sponsorship for employment visa status in this country?* / No|DOM button|yes (UI)|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application||Are you able to work from our US office three days per week?* / Yes|DOM button|yes (UI)|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|
|Application||Are you able to work from our US office three days per week?* / No|DOM button|yes (UI)|未展开/见选项附录|[openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)|


## 重要状态截图

- [openai-01-form.jpg](../screenshots/openai-01-form.jpg)
- [openai-02-date-picker.jpg](../screenshots/openai-02-date-picker.jpg)
- [openai-03-date-text.jpg](../screenshots/openai-03-date-text.jpg)
- [openai-04-sponsor-no.jpg](../screenshots/openai-04-sponsor-no.jpg)
- [openai-05-overview.jpg](../screenshots/openai-05-overview.jpg)

## 原始证据索引

- [openai-01-form.dom.txt](../evidence/openai-01-form.dom.txt)
- [openai-01-form.txt](../evidence/openai-01-form.txt)
- [openai-02-date-picker.dom.txt](../evidence/openai-02-date-picker.dom.txt)
- [openai-02-date-picker.txt](../evidence/openai-02-date-picker.txt)
- [openai-03-date-text.dom.txt](../evidence/openai-03-date-text.dom.txt)
- [openai-03-date-text.txt](../evidence/openai-03-date-text.txt)
- [openai-04-sponsor-no.dom.txt](../evidence/openai-04-sponsor-no.dom.txt)
- [openai-04-sponsor-no.txt](../evidence/openai-04-sponsor-no.txt)
- [openai-05-overview.dom.txt](../evidence/openai-05-overview.dom.txt)
- [openai-05-overview.txt](../evidence/openai-05-overview.txt)
- [openai-latest.dom.txt](../evidence/openai-latest.dom.txt)
- [openai-structured-controls.json](../evidence/openai-structured-controls.json)
