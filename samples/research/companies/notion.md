# Notion · Ashby 实测

研究日期：2026-10-11（America/Los_Angeles）。样本：[ Software Engineer, Developer Platform ](https://jobs.ashbyhq.com/notion/1fc309c8-da20-4ff2-84c7-8b863ece2b0a/application)；职位 ID `1fc309c8-da20-4ff2-84c7-8b863ece2b0a`。抽样来自本地数据集，链接可访问并出现申请入口。

## 页面流程、交互及边界

实际到达：Overview→Apply for this Job→Application、自动解析完成、缺失验证；未提交成功。

Ashby 页面有 Overview / Application 两个 tab，申请渲染期间出现 Fetching application form。无账户门槛。顶部 Autofill from resume / Upload file 与表单内必填 Resume 两个上传入口不同。Full Name、Email、Phone、Location、Resume、LinkedIn 必填；Pronouns 为 He/Him、She/Her、They/Them、Prefer not to say、Not represented here；Anchor Days 和 Sponsorship 为 Yes/No 按钮；source 为七个真正 checkbox：LinkedIn、Glassdoor、Notion Blog、Notion Employee、Notion Website、Billboard/Outdoor Ads、Conference or Meetup。EEO Gender/Race/Veteran 为 radio 组，完整选项在字段附录。

测试 LinkedIn + Glassdoor 同时选中；Sponsorship Yes→No 无新增字段。布尔按钮在 AX 某次表现为 checkbox，但 DOM 是 button、pressed 状态及隐藏 backing input；点击可见按钮，不能机械点击隐藏 checkbox。Location 搜 Fremont 返回 5 个候选含 Fremont CA，只查不选并清空。

上传合成 TXT 至顶部入口，观察 Parsing your resume... → Autofilling key fields → 完成；填入 Full Name 和 Email、挂接 Resume，Phone 仍空。与 Veeva 的解析结果不同。提交不完整表单先出现暂时 disabled，再出现 Your form needs corrections 汇总，Missing entry for required field: Phone / Location / LinkedIn Profile / Anchor Days；汇总项是可跳转按钮。没有完整有效申请或正式确认页。

## 字段观察并集

下表由实际 AX/DOM 状态提取，包含被隐藏前后及重复组。`not marked / unverified` 表示未证实必填，不能当作 optional。DOM 补充行与 AX 行可能表达同一控件的不同名称，不是字段总数。选项完整并集见 [菜单附录](../menu-options.md)，属性原文见 evidence，测试动作以上文为准。

|步骤|分组/上下文|字段（实际名称）|控件|必填观测|选项|证据|
|---|---|---|---|---|---|---|
|Application|Description: Application|Full Name*|text field|yes (UI)|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Email*|text field|yes (UI)|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Phone*|text field|yes (UI)|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Secondary Actions: Expand|combo box|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|LinkedIn Profile*|text field|yes (UI)|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|He/Him|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|She/Her|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|They/Them|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Prefer not to say|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Not represented here|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Description: Application|checkbox|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|LinkedIn|checkbox|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Glassdoor|checkbox|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Notion Blog|checkbox|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Notion Employee|checkbox|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Notion Website|checkbox|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Billboard/Outdoor Ads|checkbox|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Conference or Meetup|checkbox|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Male|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Female|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Decline to self-identify|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Hispanic or Latino|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|White (Not Hispanic or Latino)|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Black or African American (Not Hispanic or Latino)|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Asian (Not Hispanic or Latino)|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|American Indian or Alaska Native (Not Hispanic or Latino)|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Two or More Races (Not Hispanic or Latino)|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Decline to self-identify|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|I identify as one or more of the classifications of protected veteran listed above|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|I am not a protected veteran|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|I decline to self-identify for protected veteran status|radio button|not marked / unverified|未展开/见选项附录|[notion-01-form.txt](../evidence/notion-01-form.txt)|
|Application|Description: Application|Description: Application|combo box|not marked / unverified|未展开/见选项附录|[notion-02-fremont-query.txt](../evidence/notion-02-fremont-query.txt)|
|Application||Location*|DOM combobox|yes (UI)|未展开/见选项附录|[notion-04-sponsor-no.dom.txt](../evidence/notion-04-sponsor-no.dom.txt)|
|Application||Resume*|DOM button|yes (UI)|未展开/见选项附录|[notion-04-sponsor-no.dom.txt](../evidence/notion-04-sponsor-no.dom.txt)|
|Application||We work from our offices on Mondays, Tuesdays, and Thursdays (Anchor Days). If you need an accommodation, we’ll partner with you and explore reasonable options consistent with applicable law. Are you able to commit to working from one of our offices on Anchor Days each week?* / Yes|DOM button|yes (UI)|未展开/见选项附录|[notion-04-sponsor-no.dom.txt](../evidence/notion-04-sponsor-no.dom.txt)|
|Application||We work from our offices on Mondays, Tuesdays, and Thursdays (Anchor Days). If you need an accommodation, we’ll partner with you and explore reasonable options consistent with applicable law. Are you able to commit to working from one of our offices on Anchor Days each week?* / No|DOM button|yes (UI)|未展开/见选项附录|[notion-04-sponsor-no.dom.txt](../evidence/notion-04-sponsor-no.dom.txt)|
|Application||Will you now or in the future require Notion to sponsor an immigration case in order to employ you?* / Yes|DOM button|yes (UI)|未展开/见选项附录|[notion-04-sponsor-no.dom.txt](../evidence/notion-04-sponsor-no.dom.txt)|
|Application||Will you now or in the future require Notion to sponsor an immigration case in order to employ you?* / No|DOM button|yes (UI)|未展开/见选项附录|[notion-04-sponsor-no.dom.txt](../evidence/notion-04-sponsor-no.dom.txt)|


## 重要状态截图

- [notion-01-form.jpg](../screenshots/notion-01-form.jpg)
- [notion-02-fremont-query.jpg](../screenshots/notion-02-fremont-query.jpg)
- [notion-03-multiselect-sponsor-yes.jpg](../screenshots/notion-03-multiselect-sponsor-yes.jpg)
- [notion-04-sponsor-no.jpg](../screenshots/notion-04-sponsor-no.jpg)
- [notion-05-parsing.jpg](../screenshots/notion-05-parsing.jpg)
- [notion-06-validation-errors.jpg](../screenshots/notion-06-validation-errors.jpg)
- [notion-07-overview.jpg](../screenshots/notion-07-overview.jpg)

## 原始证据索引

- [notion-01-form.txt](../evidence/notion-01-form.txt)
- [notion-02-fremont-query.txt](../evidence/notion-02-fremont-query.txt)
- [notion-03-multiselect-sponsor-yes.txt](../evidence/notion-03-multiselect-sponsor-yes.txt)
- [notion-04-sponsor-no.dom.txt](../evidence/notion-04-sponsor-no.dom.txt)
- [notion-04-sponsor-no.txt](../evidence/notion-04-sponsor-no.txt)
- [notion-05-parsing.dom.txt](../evidence/notion-05-parsing.dom.txt)
- [notion-05-parsing.txt](../evidence/notion-05-parsing.txt)
- [notion-06-validation-errors.dom.txt](../evidence/notion-06-validation-errors.dom.txt)
- [notion-06-validation-errors.txt](../evidence/notion-06-validation-errors.txt)
- [notion-07-overview.dom.txt](../evidence/notion-07-overview.dom.txt)
- [notion-07-overview.txt](../evidence/notion-07-overview.txt)
- [notion-controls.json](../evidence/notion-controls.json)
- [notion-latest.dom.txt](../evidence/notion-latest.dom.txt)
- [notion-structured-controls.json](../evidence/notion-structured-controls.json)
