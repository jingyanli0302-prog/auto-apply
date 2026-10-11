# Veeva · Lever 实测

研究日期：2026-10-11（America/Los_Angeles）。样本：[ Account Director ](https://jobs.lever.co/veeva/9ac55b31-df46-4acb-b305-2c0b7ed56027/apply)；职位 ID `9ac55b31-df46-4acb-b305-2c0b7ed56027`。抽样来自本地数据集，链接可访问并出现申请入口。

## 页面流程、交互及边界

实际到达：职位详情→申请表、原生必填验证、简历自动解析成功；未提交。

Full name/Email 必填，Resume/CV 在本岗位未标必填；Phone、Current location/company、LinkedIn。Sponsorship 和 unrestricted US work right 是 Yes/No radio，测试 sponsorship Yes/No 没有新增字段。Next Step Confirmation 必填 checkbox 要求已将邮箱加入安全发件人名单，本研究未虚构已执行邮箱操作。EEO Gender/Race/Veteran 原生 SELECT 与 Zoox 同模式；future opportunities checkbox 可选并写明 2 年联系期限，未勾选。没有观察到 Other companies 的 Additional Information textarea。

保持名字空白点击 Submit application，浏览器原生 Please fill out this field，焦点 Full name，未出现 hCaptcha（仅本次验证顺序，不证明永不会出现）。其后上传同一份合成 TXT，观察 Analyzing resume... → Success!，姓名、邮箱、电话、Current company 被填入；与 Notion 电话留空的实际结果不同。附件非必填与有自动解析可并存。解析后没有继续点击 Submit，避免构造完整申请。

## 字段观察并集

下表由实际 AX/DOM 状态提取，包含被隐藏前后及重复组。`not marked / unverified` 表示未证实必填，不能当作 optional。DOM 补充行与 AX 行可能表达同一控件的不同名称，不是字段总数。选项完整并集见 [菜单附录](../menu-options.md)，属性原文见 evidence，测试动作以上文为准。

|步骤|分组/上下文|字段（实际名称）|控件|必填观测|选项|证据|
|---|---|---|---|---|---|---|
|Application|application-form|Full name ✱|text field|yes (UI)|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application|application-form|Email ✱|text field|yes (UI)|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application|application-form|Phone|text field|not marked / unverified|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application|application-form|Current location|text field|not marked / unverified|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application|application-form|Current company|text field|not marked / unverified|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application|application-form|LinkedIn URL|text field|not marked / unverified|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application|application-form|application-form|radio button|not marked / unverified|未展开/见选项附录|[veeva-01-form.txt](../evidence/veeva-01-form.txt)|
|Application|application-form|I understand that next steps will be sent via email and I have marked the sender address above as safe.|checkbox|not marked / unverified|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application|eeoSurvey_23d0936a-3e59-43a1-9cd7-d0232533a322|Gender|pop up button|not marked / unverified|Select ... \| Male \| Female \| Decline to self-identify|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application|eeoSurvey_23d0936a-3e59-43a1-9cd7-d0232533a322|Race Click to see details about each option.|pop up button|not marked / unverified|Select ... \| Hispanic or Latino \| White (Not Hispanic or Latino) \| Black or African American (Not Hispanic or Latino) \| Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino) \| Asian (Not Hispanic or Latino) \| American Indian or Alaska Native (Not Hispanic or Latino) \| Two or More Races (Not Hispanic or Latino) \| Decline to self-identify|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application|eeoSurvey_23d0936a-3e59-43a1-9cd7-d0232533a322|Veteran status|pop up button|not marked / unverified|Select ... \| I am a veteran \| I am not a veteran \| Decline to self-identify|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application|application-form|Yes, Veeva Systems can contact me about future job opportunities for up to 2 years Privacy policy|checkbox|not marked / unverified|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application||Resume/CV ATTACH RESUME/CV|DOM button|not marked / unverified|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application||Do you now, or in the future require sponsorship? / Yes|DOM radio|not marked / unverified|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application||Do you now, or in the future require sponsorship? / No|DOM radio|not marked / unverified|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application||Do you have the unrestricted right to work in the United States? / Yes|DOM radio|not marked / unverified|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application||Do you have the unrestricted right to work in the United States? / No|DOM radio|not marked / unverified|未展开/见选项附录|[veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)|
|Application||Resume/CV synthetic-test-resume.txt Success!|DOM button|not marked / unverified|未展开/见选项附录|[veeva-04-parsed.dom.txt](../evidence/veeva-04-parsed.dom.txt)|


## 重要状态截图

- [veeva-01-form.jpg](../screenshots/veeva-01-form.jpg)
- [veeva-02-sponsor-yes.jpg](../screenshots/veeva-02-sponsor-yes.jpg)
- [veeva-03-native-validation.jpg](../screenshots/veeva-03-native-validation.jpg)
- [veeva-04-parsed.jpg](../screenshots/veeva-04-parsed.jpg)
- [veeva-05-posting.jpg](../screenshots/veeva-05-posting.jpg)
- [veeva-06-from-posting.jpg](../screenshots/veeva-06-from-posting.jpg)

## 原始证据索引

- [veeva-01-form.dom.txt](../evidence/veeva-01-form.dom.txt)
- [veeva-01-form.txt](../evidence/veeva-01-form.txt)
- [veeva-02-sponsor-yes.dom.txt](../evidence/veeva-02-sponsor-yes.dom.txt)
- [veeva-02-sponsor-yes.txt](../evidence/veeva-02-sponsor-yes.txt)
- [veeva-03-native-validation.dom.txt](../evidence/veeva-03-native-validation.dom.txt)
- [veeva-03-native-validation.txt](../evidence/veeva-03-native-validation.txt)
- [veeva-04-parsed.dom.txt](../evidence/veeva-04-parsed.dom.txt)
- [veeva-04-parsed.txt](../evidence/veeva-04-parsed.txt)
- [veeva-05-posting.dom.txt](../evidence/veeva-05-posting.dom.txt)
- [veeva-05-posting.txt](../evidence/veeva-05-posting.txt)
- [veeva-06-from-posting.dom.txt](../evidence/veeva-06-from-posting.dom.txt)
- [veeva-06-from-posting.txt](../evidence/veeva-06-from-posting.txt)
- [veeva-latest.dom.txt](../evidence/veeva-latest.dom.txt)
- [veeva-native-menu-0.txt](../evidence/veeva-native-menu-0.txt)
- [veeva-native-menu-1.txt](../evidence/veeva-native-menu-1.txt)
- [veeva-native-menu-2.txt](../evidence/veeva-native-menu-2.txt)
- [veeva-structured-controls.json](../evidence/veeva-structured-controls.json)
