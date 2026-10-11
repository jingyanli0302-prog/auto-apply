# Figma · Greenhouse 实测

研究日期：2026-10-11（America/Los_Angeles）。样本：[ Account Executive, Enterprise ](https://boards.greenhouse.io/figma/jobs/5426468004?gh_jid=5426468004)；职位 ID `5426468004`。抽样来自本地数据集，链接可访问并出现申请入口。

## 页面流程、交互及边界

实际到达：单页表单、条件 Race 字段、缺失验证，以及可选 MyGreenhouse 登录页；未提交。

boards.greenhouse.io 重定向托管 job-boards.greenhouse.io。基础 First/Last/Email/Country/Phone、必填 Location (City) 与 Locate me、Resume。Locate me 未点击，未授予定位权限。其余为 LinkedIn、Other Website、Why Figma、Pronouns、Additional Information、work-from 文本、Preferred First Name、work authorization、prior Figma，以及 EEO Gender/Hispanic/Veteran。

Hispanic/Latino 选 No 后新增 Race combo，实际打开 7 个 race 选项。Pronouns 包含 she/her/hers、he/him/his、they/them/theirs、self describe；测试 self describe 未新增文本字段，不能假设 Other 类选项都会展开输入框。Location 输入 Fremont 返回含 Fremont CA 的 10 个候选，只查后清空。多个自定义 combo 的 Yes/No 菜单见 menu 证据。

空必填 Submit 显示姓名、邮箱、电话、Location、Resume 和自定义问题错误。Autofill my application 打开独立 MyGreenhouse 标签页，要求 Email→Send security code，另有 Google/Apple/LinkedIn；继续绑定其 privacy/user agreement。没有发送验证邮件或登录。普通手填路径没有强制账户，不应把可选 Autofill 登录判断为整份申请必需。

## 字段观察并集

下表由实际 AX/DOM 状态提取，包含被隐藏前后及重复组。`not marked / unverified` 表示未证实必填，不能当作 optional。DOM 补充行与 AX 行可能表达同一控件的不同名称，不是字段总数。选项完整并集见 [菜单附录](../menu-options.md)，属性原文见 evidence，测试动作以上文为准。

|步骤|分组/上下文|字段（实际名称）|控件|必填观测|选项|证据|
|---|---|---|---|---|---|---|
|Application|application-form|First Name|text field|yes (UI)|未展开/见选项附录|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Last Name|text field|yes (UI)|未展开/见选项附录|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Email|text field|yes (UI)|未展开/见选项附录|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|Phone|Country|combo box|yes (UI)|未展开/见选项附录|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|Phone|Phone|text field|yes (UI)|未展开/见选项附录|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Location (City)|combo box|yes (UI)|Fremont, California, United States \| Fremont, Nebraska, United States \| City of Fremont, Ohio, United States \| Fremont, Ohio, United States \| Fremont, Michigan, United States \| Town of Fremont, New Hampshire, United States \| City of Fremont, Michigan, United States \| Fremont, New Hampshire, United States \| Fremont, Indiana, United States \| Town of Fremont, New York, United States|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|LinkedIn Profile|text field|not marked / unverified|未展开/见选项附录|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Other Website|text field|not marked / unverified|未展开/见选项附录|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Why do you want to join Figma?|text entry area|yes (UI)|未展开/见选项附录|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Pronouns|combo box|not marked / unverified|she/her/hers \| he/him/his \| they/them/theirs \| self-describe|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Additional Information|text entry area|not marked / unverified|未展开/见选项附录|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|From where do you intend to work?|text field|yes (UI)|未展开/见选项附录|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Preferred First Name|text field|not marked / unverified|未展开/见选项附录|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Are you authorized to work in the country for which you applied?|combo box|yes (UI)|Yes \| No|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Have you ever worked for Figma before, as an employee or a contractor/consultant?|combo box|yes (UI)|Yes \| No|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Gender|combo box|not marked / unverified|Male \| Female \| Decline To Self Identify|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Are you Hispanic/Latino?|combo box|not marked / unverified|Yes \| No \| Decline To Self Identify|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Veteran Status|combo box|not marked / unverified|I am not a protected veteran \| I identify as one or more of the classifications of a protected veteran \| I don't wish to answer|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|
|Application|application-form|Please identify your race|combo box|not marked / unverified|American Indian or Alaskan Native \| Asian \| Black or African American \| White \| Native Hawaiian or Other Pacific Islander \| Two or More Races \| Decline To Self Identify|[figma-02-race-conditional.dom.txt](../evidence/figma-02-race-conditional.dom.txt)|
|Application|app|Email|text field|yes (UI)|未展开/见选项附录|[figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)|


## 重要状态截图

- [figma-01-form.jpg](../screenshots/figma-01-form.jpg)
- [figma-02-race-conditional.jpg](../screenshots/figma-02-race-conditional.jpg)
- [figma-03-fremont-query.jpg](../screenshots/figma-03-fremont-query.jpg)
- [figma-04-validation-errors.jpg](../screenshots/figma-04-validation-errors.jpg)
- [figma-05-my-greenhouse-login.jpg](../screenshots/figma-05-my-greenhouse-login.jpg)

## 原始证据索引

- [figma-01-form.dom.txt](../evidence/figma-01-form.dom.txt)
- [figma-01-form.txt](../evidence/figma-01-form.txt)
- [figma-02-race-conditional.dom.txt](../evidence/figma-02-race-conditional.dom.txt)
- [figma-02-race-conditional.txt](../evidence/figma-02-race-conditional.txt)
- [figma-03-fremont-query.dom.txt](../evidence/figma-03-fremont-query.dom.txt)
- [figma-03-fremont-query.txt](../evidence/figma-03-fremont-query.txt)
- [figma-04-validation-errors.dom.txt](../evidence/figma-04-validation-errors.dom.txt)
- [figma-04-validation-errors.txt](../evidence/figma-04-validation-errors.txt)
- [figma-05-my-greenhouse-login.dom.txt](../evidence/figma-05-my-greenhouse-login.dom.txt)
- [figma-05-my-greenhouse-login.txt](../evidence/figma-05-my-greenhouse-login.txt)
- [figma-latest.dom.txt](../evidence/figma-latest.dom.txt)
- [figma-menu-0.txt](../evidence/figma-menu-0.txt)
- [figma-menu-1.txt](../evidence/figma-menu-1.txt)
- [figma-menu-2.txt](../evidence/figma-menu-2.txt)
- [figma-menu-3.txt](../evidence/figma-menu-3.txt)
- [figma-menu-4.txt](../evidence/figma-menu-4.txt)
- [figma-menu-5.txt](../evidence/figma-menu-5.txt)
- [figma-race-menu-0.txt](../evidence/figma-race-menu-0.txt)
- [figma-structured-controls.json](../evidence/figma-structured-controls.json)
