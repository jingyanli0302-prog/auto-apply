# Anthropic · Greenhouse 实测

研究日期：2026-10-11（America/Los_Angeles）。样本：[ Account Executive, AI Native ](https://job-boards.greenhouse.io/anthropic/jobs/4461450008)；职位 ID `4461450008`。抽样来自本地数据集，链接可访问并出现申请入口。

## 页面流程、交互及边界

实际到达：单页申请表和缺失字段验证；未观察独立 Review 或提交成功。

托管 Greenhouse 职位页的 Apply 将焦点带到 First Name，无强制账户。基础字段 First/Last Name、Email、Country（电话国家）、Phone，Resume/CV 上传可 Attach / Dropbox / Google Drive / Enter manually，类型 pdf/doc/docx/txt/rtf。Enter manually 实际展开 resume_text textarea。LinkedIn 说明称与 Resume 至少其一，但空简历提交出现 Resume/CV is required；未单独验证只填 LinkedIn 是否通过，不能判定说明与规则矛盾。

公司问题完整并集：SF/NYC 或搬迁；每周 4 天办公室；最早开始时间；时间线；API/技术产品销售经验；Why Anthropic；AI application policy；既往面试；未来 sponsorship；Optional Personal Preferences（发音）；Additional Information；阅读 arbitration 和 Agreement to Arbitrate。最早开始日期是普通 text input，没有观察日期选择器。多项是搜索式 combo，Yes/No；仲裁两项各只有确认选项，未选择同意。性别 Male/Female/Decline、Hispanic Yes/No/Decline、Veteran 三类。

Country 搜 China 返回 China +86 / Hong Kong SAR +852 / Macao SAR +853；US 返回 United States +1，均查询后清空，没有作为测试个人国家选入。Sponsorship Yes→No 没有可见新增字段。保持姓名/邮箱等缺失点击 Submit application 触发行内必填错误，焦点到 First Name；背景 reCAPTCHA iframe 存在，未弹出图片挑战。没有创建完整有效申请。

## 字段观察并集

下表由实际 AX/DOM 状态提取，包含被隐藏前后及重复组。`not marked / unverified` 表示未证实必填，不能当作 optional。DOM 补充行与 AX 行可能表达同一控件的不同名称，不是字段总数。选项完整并集见 [菜单附录](../menu-options.md)，属性原文见 evidence，测试动作以上文为准。

|步骤|分组/上下文|字段（实际名称）|控件|必填观测|选项|证据|
|---|---|---|---|---|---|---|
|Application|application-form|First Name|text field|yes (UI)|未展开/见选项附录|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Last Name|text field|yes (UI)|未展开/见选项附录|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Email|text field|yes (UI)|未展开/见选项附录|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|Phone|Country|combo box|yes (UI)|United States +1|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|Phone|Phone|text field|yes (UI)|未展开/见选项附录|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|LinkedIn Profile|text field|not marked / unverified|未展开/见选项附录|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Are you currently located in SF/NYC or open to relocation, if not?|combo box|yes (UI)|Yes \| No|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Our Account Executive team is in office 4 days/week. Are you open to working in our office 4 days/week?|combo box|yes (UI)|Yes \| No|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|When is the earliest you would want to start working with us?|text field|not marked / unverified|未展开/见选项附录|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Do you have any deadlines or timeline considerations we should be aware of?|text field|not marked / unverified|未展开/见选项附录|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Do you have experience selling API or technical products to engineering teams? If yes, please describe in a few sentences.|text entry area|yes (UI)|未展开/见选项附录|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Why Anthropic?|text entry area|yes (UI)|未展开/见选项附录|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|AI Policy for Application|combo box|yes (UI)|Yes \| No|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Have you ever interviewed at Anthropic before?|combo box|yes (UI)|Yes \| No|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Will you now or will you in the future require employment visa sponsorship to work in the country in which the job you're applying for is located?|combo box|yes (UI)|Yes \| No|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|(Optional) Personal Preferences|text field|not marked / unverified|未展开/见选项附录|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Additional Information|text entry area|not marked / unverified|未展开/见选项附录|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Please read the arbitration agreement below|combo box|yes (UI)|I will read the arbitration agreement below.|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Agreement to Arbitrate|combo box|yes (UI)|I understand and agree to the terms of the Agreement to Arbitrate set forth above.|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Gender|combo box|not marked / unverified|Male \| Female \| Decline To Self Identify|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Are you Hispanic/Latino?|combo box|not marked / unverified|Yes \| No \| Decline To Self Identify|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|application-form|Veteran Status|combo box|not marked / unverified|I am not a protected veteran \| I identify as one or more of the classifications of a protected veteran \| I don't wish to answer|[anthropic-01-form.txt](../evidence/anthropic-01-form.txt)|
|Application|Resume/CV*|Enter manually|text entry area|yes (UI)|未展开/见选项附录|[anthropic-03-manual-resume.txt](../evidence/anthropic-03-manual-resume.txt)|


## 重要状态截图

- [anthropic-01-form.jpg](../screenshots/anthropic-01-form.jpg)
- [anthropic-02-sponsorship-options.jpg](../screenshots/anthropic-02-sponsorship-options.jpg)
- [anthropic-03-manual-resume.jpg](../screenshots/anthropic-03-manual-resume.jpg)
- [anthropic-04-country-china-query.jpg](../screenshots/anthropic-04-country-china-query.jpg)
- [anthropic-05-country-us-query.jpg](../screenshots/anthropic-05-country-us-query.jpg)
- [anthropic-06-validation-errors.jpg](../screenshots/anthropic-06-validation-errors.jpg)

## 原始证据索引

- [anthropic-01-form.txt](../evidence/anthropic-01-form.txt)
- [anthropic-02-sponsorship-options.txt](../evidence/anthropic-02-sponsorship-options.txt)
- [anthropic-03-manual-resume.txt](../evidence/anthropic-03-manual-resume.txt)
- [anthropic-04-country-china-query.txt](../evidence/anthropic-04-country-china-query.txt)
- [anthropic-05-country-us-query.txt](../evidence/anthropic-05-country-us-query.txt)
- [anthropic-06-validation-errors.dom.txt](../evidence/anthropic-06-validation-errors.dom.txt)
- [anthropic-06-validation-errors.txt](../evidence/anthropic-06-validation-errors.txt)
- [anthropic-controls.json](../evidence/anthropic-controls.json)
- [anthropic-latest.dom.txt](../evidence/anthropic-latest.dom.txt)
- [anthropic-menu-0.txt](../evidence/anthropic-menu-0.txt)
- [anthropic-menu-1.txt](../evidence/anthropic-menu-1.txt)
- [anthropic-menu-2.txt](../evidence/anthropic-menu-2.txt)
- [anthropic-menu-3.txt](../evidence/anthropic-menu-3.txt)
- [anthropic-menu-4.txt](../evidence/anthropic-menu-4.txt)
- [anthropic-menu-5.txt](../evidence/anthropic-menu-5.txt)
- [anthropic-menu-6.txt](../evidence/anthropic-menu-6.txt)
- [anthropic-menu-7.txt](../evidence/anthropic-menu-7.txt)
- [anthropic-menu-8.txt](../evidence/anthropic-menu-8.txt)
- [anthropic-structured-controls.json](../evidence/anthropic-structured-controls.json)
