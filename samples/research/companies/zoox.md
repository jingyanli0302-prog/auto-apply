# Zoox · Lever 实测

研究日期：2026-10-11（America/Los_Angeles）。样本：[ Administrative Business Partner, Floater ](https://jobs.lever.co/zoox/e8a190f0-7a89-4c11-a6a0-452ff6234749/apply)；职位 ID `e8a190f0-7a89-4c11-a6a0-452ff6234749`。抽样来自本地数据集，链接可访问并出现申请入口。

## 页面流程、交互及边界

实际到达：职位详情→申请表、Custom Pronouns 条件输入、原生菜单、多选、hCaptcha 后原表单；未提交成功。

Resume/Full name/Email/Phone 必填，Current location/Current company，LinkedIn/Other website。Pronouns 真复选框：He/him、She/her、They/them、Xe/xem、Ze/hir、Ey/em、Hir/hir、Fae/faer、Hu/hu、Use name only、Custom；Custom 勾选后出现 Write here... 输入框。Preferred name 是 textarea；Export Control and Compliance 要求列公民/永久居留国家和获得日期，但控件是必填自由 textarea，不是日期选择器。Sponsorship 为原生 SELECT Yes/No。来源八项 checkbox，测试 Zoox Ads / Social Media + LinkedIn 同时选中；校园/虚拟活动题 textarea 始终可见。

Gender/Race/Veteran 三个原生 SELECT，性别 Male/Female/Decline，Race 八类，Veteran veteran/not veteran/decline。Race details link 展开定义后，该下拉的可访问名称变化，应以关联题块保持识别。Sponsorship Yes→No 无新增字段。

不完整表单验证触发 hCaptcha。用户完成后回到原表单，当前没有挑战，没有观察到明确业务错误或成功页；不将“captcha 消失”当作“申请提交成功”。未做第二次完整提交。

最后补测更新：用户完成后继续一次不完整验证，再次出现图片 hCaptcha。当前停在新挑战，证据 zoox-08；没有业务字段错误或成功页。

## 字段观察并集

下表由实际 AX/DOM 状态提取，包含被隐藏前后及重复组。`not marked / unverified` 表示未证实必填，不能当作 optional。DOM 补充行与 AX 行可能表达同一控件的不同名称，不是字段总数。选项完整并集见 [菜单附录](../menu-options.md)，属性原文见 evidence，测试动作以上文为准。

|步骤|分组/上下文|字段（实际名称）|控件|必填观测|选项|证据|
|---|---|---|---|---|---|---|
|Application|application-form|Full name ✱|text field|yes (UI)|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|He/him|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|She/her|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|They/them|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Xe/xem|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Ze/hir|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Ey/em|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Hir/hir|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Fae/faer|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Hu/hu|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Use name only|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Custom|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Email ✱|text field|yes (UI)|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Phone ✱|text field|yes (UI)|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Current location|text field|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Current company|text field|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|LinkedIn URL|text field|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Other website|text field|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|(settable)|text entry area|not marked / unverified|未展开/见选项附录|[zoox-01-form.txt](../evidence/zoox-01-form.txt)|
|Application|application-form|application-form|pop up button|not marked / unverified|未展开/见选项附录|[zoox-01-form.txt](../evidence/zoox-01-form.txt)|
|Application|application-form|Zoox Ads / Social Media|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|LinkedIn|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Event, Media Interview, or other PR|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Recruiter Outreach|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Employee Referral|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|CVPR Conference|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|SHPE Conference|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|Other|checkbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|(settable)|text field|not marked / unverified|未展开/见选项附录|[zoox-01-form.txt](../evidence/zoox-01-form.txt)|
|Application|eeoSurvey_65f5e6fd-0ec6-423a-bc28-401ef04b6d76|Gender|pop up button|not marked / unverified|Select ... \| Male \| Female \| Decline to self-identify|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|eeoSurvey_65f5e6fd-0ec6-423a-bc28-401ef04b6d76|Race Click to see details about each option.|pop up button|not marked / unverified|Select ... \| Hispanic or Latino \| White (Not Hispanic or Latino) \| Black or African American (Not Hispanic or Latino) \| Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino) \| Asian (Not Hispanic or Latino) \| American Indian or Alaska Native (Not Hispanic or Latino) \| Two or More Races (Not Hispanic or Latino) \| Decline to self-identify|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|eeoSurvey_65f5e6fd-0ec6-423a-bc28-401ef04b6d76|Veteran status|pop up button|not marked / unverified|Select ... \| I am a veteran \| I am not a veteran \| Decline to self-identify|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application|application-form|customPronounsTextField|text field|not marked / unverified|未展开/见选项附录|[zoox-02-custom-pronouns.txt](../evidence/zoox-02-custom-pronouns.txt)|
|Application|eeoSurvey_65f5e6fd-0ec6-423a-bc28-401ef04b6d76|Race Click to see details about each option. Hispanic or Latino A person of Cuban, Mexican, Puerto Rican, South or Central American, or other Spanish culture or origin regardless of race. White (Not Hispanic or Latino) A person having origins in any of the original peoples of Europe, the Middle East, or North Africa. Black or African American (Not Hispanic or Latino) A person having origins in any of the black racial groups of Africa. Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino) A person having origins in any of the peoples of Hawaii, Guam, Samoa, or other Pacific Islands. Asian (Not Hispanic or Latino) A person having origins in any of the original peoples of the Far East, Southeast Asia, or the Indian Subcontinent, including, for example, Cambodia, China, India, Japan, Korea, Malaysia, Pakistan, the Philippine Islands, Thailand, and Vietnam. American Indian or Alaska Native (Not Hispanic or Latino) A person having origins in any of the original peoples of North and South America (including Central America), and who maintain tribal affiliation or community attachment. Two or More Races (Not Hispanic or Latino) All persons who identify with more than one of the above five races.|pop up button|not marked / unverified|Select ... \| Hispanic or Latino \| White (Not Hispanic or Latino) \| Black or African American (Not Hispanic or Latino) \| Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino) \| Asian (Not Hispanic or Latino) \| American Indian or Alaska Native (Not Hispanic or Latino) \| Two or More Races (Not Hispanic or Latino) \| Decline to self-identify|[zoox-05-after-human-captcha.txt](../evidence/zoox-05-after-human-captcha.txt)|
|Application||Resume/CV ✱ ATTACH RESUME/CV|DOM button|yes (UI)|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application||What is your preferred first name and last name? If your legal first and last name is your preferred name, you do not need to respond.|DOM textbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application||Export Control and Compliance: For the sole purpose of determining export licensing requirements, please list any countries of which you are a citizen or legal permanent resident, and when you obtained such status.|DOM textbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application||Sponsorship: Do you require sponsorship, or will you require sponsorship in the future for employment authorization in the United States?|DOM combobox|not marked / unverified|Select... \| Yes \| No|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application||If you attended an on-campus or virtual event, which did you attend?|DOM textbox|not marked / unverified|未展开/见选项附录|[zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)|
|Application||Race|DOM combobox|not marked / unverified|Select ... \| Hispanic or Latino \| White (Not Hispanic or Latino) \| Black or African American (Not Hispanic or Latino) \| Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino) \| Asian (Not Hispanic or Latino) \| American Indian or Alaska Native (Not Hispanic or Latino) \| Two or More Races (Not Hispanic or Latino) \| Decline to self-identify|[zoox-05-after-human-captcha.dom.txt](../evidence/zoox-05-after-human-captcha.dom.txt)|


## 重要状态截图

- [zoox-01-form.jpg](../screenshots/zoox-01-form.jpg)
- [zoox-02-custom-pronouns.jpg](../screenshots/zoox-02-custom-pronouns.jpg)
- [zoox-03-sponsor-no.jpg](../screenshots/zoox-03-sponsor-no.jpg)
- [zoox-05-after-human-captcha.jpg](../screenshots/zoox-05-after-human-captcha.jpg)
- [zoox-06-latest-human.jpg](../screenshots/zoox-06-latest-human.jpg)
- [zoox-07-posting.jpg](../screenshots/zoox-07-posting.jpg)
- [zoox-08-validation-after-human.jpg](../screenshots/zoox-08-validation-after-human.jpg)

## 原始证据索引

- [zoox-01-form.dom.txt](../evidence/zoox-01-form.dom.txt)
- [zoox-01-form.txt](../evidence/zoox-01-form.txt)
- [zoox-02-custom-pronouns.dom.txt](../evidence/zoox-02-custom-pronouns.dom.txt)
- [zoox-02-custom-pronouns.txt](../evidence/zoox-02-custom-pronouns.txt)
- [zoox-03-sponsor-no.dom.txt](../evidence/zoox-03-sponsor-no.dom.txt)
- [zoox-03-sponsor-no.txt](../evidence/zoox-03-sponsor-no.txt)
- [zoox-05-after-human-captcha.dom.txt](../evidence/zoox-05-after-human-captcha.dom.txt)
- [zoox-05-after-human-captcha.txt](../evidence/zoox-05-after-human-captcha.txt)
- [zoox-06-latest-human.dom.txt](../evidence/zoox-06-latest-human.dom.txt)
- [zoox-06-latest-human.txt](../evidence/zoox-06-latest-human.txt)
- [zoox-07-posting.dom.txt](../evidence/zoox-07-posting.dom.txt)
- [zoox-07-posting.txt](../evidence/zoox-07-posting.txt)
- [zoox-08-validation-after-human.dom.txt](../evidence/zoox-08-validation-after-human.dom.txt)
- [zoox-08-validation-after-human.txt](../evidence/zoox-08-validation-after-human.txt)
- [zoox-latest.dom.txt](../evidence/zoox-latest.dom.txt)
- [zoox-native-menu-0.txt](../evidence/zoox-native-menu-0.txt)
- [zoox-native-menu-1.txt](../evidence/zoox-native-menu-1.txt)
- [zoox-native-menu-2.txt](../evidence/zoox-native-menu-2.txt)
- [zoox-native-menu-3.txt](../evidence/zoox-native-menu-3.txt)
- [zoox-structured-controls.json](../evidence/zoox-structured-controls.json)
