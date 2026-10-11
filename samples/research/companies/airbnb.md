# Airbnb · Greenhouse 实测

研究日期：2026-10-11（America/Los_Angeles）。样本：[ Account Manager  ](https://careers.airbnb.com/positions/8184174?gh_jid=8184174)；职位 ID `8184174`。抽样来自本地数据集，链接可访问并出现申请入口。

## 页面流程、交互及边界

实际到达：公司职位页内嵌 Greenhouse 表单及缺失验证；未提交。

careers.airbnb.com 职位页有 Role Overview / Application，Switch to application form 进入 iframe#grnhse_iframe（标题 Greenhouse Job Board）。点击 Only necessary cookies。字段定位必须进入 frame；顶层 DOM 的 input 数不能代表表单字段。

First/Last、Email、Country/Phone、Location (City)、Resume、Cover Letter、LinkedIn、How did you hear、隐私收讫复选框、Gender、合法工作、Sponsorship、Noncompete、prior Airbnb、AI Attestation。Resume 和 Cover Letter 均必填，提供 Attach / Enter manually，未见本样本托管页的 Dropbox/Google Drive。Gender 为 Male/Female/Other/Decline。工作授权是较长 Yes/No 原文；sponsorship 3 项分别现在需要、未来需要、不需要；noncompete/prior employment Yes/No；AI 一项 I agree，未选择。

保持不完整提交后，frame 内显示 firstname/lastname/email/phone/resume/cover letter/source/checkbox/其他自定义必填错误，焦点 First Name。City 未出现本次缺失错误，未验证其全部格式和提交规则。背景 reCAPTCHA 可见，未观察图片挑战。未测试 sponsorship 三选项之间的条件字段，明确留作未观测。

## 字段观察并集

下表由实际 AX/DOM 状态提取，包含被隐藏前后及重复组。`not marked / unverified` 表示未证实必填，不能当作 optional。DOM 补充行与 AX 行可能表达同一控件的不同名称，不是字段总数。选项完整并集见 [菜单附录](../menu-options.md)，属性原文见 evidence，测试动作以上文为准。

|步骤|分组/上下文|字段（实际名称）|控件|必填观测|选项|证据|
|---|---|---|---|---|---|---|
|Application|application-form|First Name|text field|yes (UI)|未展开/见选项附录|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|application-form|Last Name|text field|yes (UI)|未展开/见选项附录|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|application-form|Email|text field|yes (UI)|未展开/见选项附录|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|Phone|Country|combo box|yes (UI)|未展开/见选项附录|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|Phone|Phone|text field|yes (UI)|未展开/见选项附录|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|application-form|Location (City)|combo box|not marked / unverified|未展开/见选项附录|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|application-form|LinkedIn Profile|text field|not marked / unverified|未展开/见选项附录|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|application-form|How did you hear about this job?|text field|yes (UI)|未展开/见选项附录|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|Description: Before submitting your application please review the points below:*|I acknowledge receipt of the Airbnb Candidate Data Privacy Notice|checkbox|not marked / unverified|未展开/见选项附录|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|application-form|Gender|combo box|yes (UI)|Male \| Female \| Other \| Decline to Self Identify|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|application-form|Are you legally authorized to work in the country where the job is located?|combo box|yes (UI)|Yes, I am currently legally authorized to work in the country where the job is located. \| No, I am not currently legally authorized to work in the country where the job is located.|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|application-form|Will you now or in the future require company sponsorship to retain or extend your work authorization in the country where the job is located?|combo box|yes (UI)|Yes, I will require immigration sponsorship now to legally work in the country where the job is located. \| Yes, I will require immigration sponsorship in the future to legally work in the country where the job is located. \| No, I do not and will not require immigration sponsorship to legally work in the country where the job is located.|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|application-form|Are you currently subject to any non-compete or non-solicitation agreement that would impact your ability to work at Airbnb or prevent you from accepting a job offer from Airbnb?|combo box|yes (UI)|Yes \| No|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|application-form|Are you currently or have you ever worked for Airbnb in any capacity? This could include, but is not limited to, a full-time employee, intern, apprentice, or contingent worker.|combo box|yes (UI)|Yes \| No|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|
|Application|application-form|Candidate AI Usage Attestation:|combo box|yes (UI)|I agree|[airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)|


## 重要状态截图

- [airbnb-01-posting.jpg](../screenshots/airbnb-01-posting.jpg)
- [airbnb-02-embedded-form.jpg](../screenshots/airbnb-02-embedded-form.jpg)
- [airbnb-03-gender-options.jpg](../screenshots/airbnb-03-gender-options.jpg)
- [airbnb-04-validation-errors.jpg](../screenshots/airbnb-04-validation-errors.jpg)

## 原始证据索引

- [airbnb-01-posting.dom.txt](../evidence/airbnb-01-posting.dom.txt)
- [airbnb-01-posting.txt](../evidence/airbnb-01-posting.txt)
- [airbnb-02-embedded-form.dom.txt](../evidence/airbnb-02-embedded-form.dom.txt)
- [airbnb-02-embedded-form.txt](../evidence/airbnb-02-embedded-form.txt)
- [airbnb-03-gender-options.dom.txt](../evidence/airbnb-03-gender-options.dom.txt)
- [airbnb-03-gender-options.txt](../evidence/airbnb-03-gender-options.txt)
- [airbnb-04-validation-errors.dom.txt](../evidence/airbnb-04-validation-errors.dom.txt)
- [airbnb-04-validation-errors.txt](../evidence/airbnb-04-validation-errors.txt)
- [airbnb-latest.dom.txt](../evidence/airbnb-latest.dom.txt)
- [airbnb-menu-0.txt](../evidence/airbnb-menu-0.txt)
- [airbnb-menu-1.txt](../evidence/airbnb-menu-1.txt)
- [airbnb-menu-2.txt](../evidence/airbnb-menu-2.txt)
- [airbnb-menu-3.txt](../evidence/airbnb-menu-3.txt)
- [airbnb-menu-4.txt](../evidence/airbnb-menu-4.txt)
- [airbnb-structured-controls.json](../evidence/airbnb-structured-controls.json)
