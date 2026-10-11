# Palantir · Lever 实测

研究日期：2026-10-11（America/Los_Angeles）。样本：[ Administrative Business Partner ](https://jobs.lever.co/palantir/6ed76ce8-4156-4b60-b120-403538bd66cd/apply)；职位 ID `6ed76ce8-4156-4b60-b120-403538bd66cd`。抽样来自本地数据集，链接可访问并出现申请入口。

## 页面流程、交互及边界

实际到达：职位详情 Apply→申请表、学校菜单、多选、sponsorship、hCaptcha；未获缺失字段错误或提交成功。

基础 Resume/CV 必填、Full name/Email 必填、Phone 未标必填、Current location 必填、Current company；LinkedIn/GitHub/Portfolio。Language Skills 真复选组，全部选项见字段附录；实际 English + Spanish 多选，Other 未展开输入。Preferred Name / Name Pronunciation 控件在 DOM 缺少有效可访问名称，需以相邻题目与题块定位。工作授权和 sponsorship 为 Yes/No radios；还有 University 原生 SELECT、来源原生 SELECT、favorite project、Why Palantir、AI notetaker consent、Singapore citizen/permanent resident、Additional Information。

University 原生列表 3302 项，按要求只检索目标：Tsinghua University 存在；Berkeley 对应原文 University of California - Berkeley；Cornell 对应 Cornell University - Cornell Tech 和 Cornell University - Ithaca。没有选入上述学校。实际选 Other - School Not Listed，未见新增文本框；页面说明中的 Other 拼法与实际 label 不完全一致，不能按说明字符串硬选。来源 21 个原生选项见 menu/JSON。Sponsorship Yes/No 切换无可见新字段。

故意不填姓名/邮箱等触发 Submit 后先出现 hCaptcha 图片挑战，未到业务缺失校验。用户完成后挑战消失；再次继续验证时曾重新出现 Please try again 挑战。用户最新回复完成后再次观察挑战消失，页面仍为申请表，没有成功或字段错误证明。没有再次反复点击，最后成功状态是挑战后原申请表。

最后补测更新：收到用户“完成”后，保持姓名/邮箱缺失继续一次验证，异步稳定后再次出现图片 hCaptcha（新提示为重复图标识别）。最后成功访问仍为申请表，当前阻断为再次验证码；证据 palantir-10 / palantir-11。没有业务字段错误或成功页。

## 字段观察并集

下表由实际 AX/DOM 状态提取，包含被隐藏前后及重复组。`not marked / unverified` 表示未证实必填，不能当作 optional。DOM 补充行与 AX 行可能表达同一控件的不同名称，不是字段总数。选项完整并集见 [菜单附录](../menu-options.md)，属性原文见 evidence，测试动作以上文为准。

|步骤|分组/上下文|字段（实际名称）|控件|必填观测|选项|证据|
|---|---|---|---|---|---|---|
|Application|application-form|Full name ✱|text field|yes (UI)|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Email ✱|text field|yes (UI)|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Phone|text field|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Current location ✱|text field|yes (UI)|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Current company|text field|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|LinkedIn URL|text field|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|GitHub URL|text field|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Portfolio URL|text field|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|English (ENG)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Spanish (SPA)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|French (FRA)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|German (DEU)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Japanese (JPN)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Cantonese (CANT)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Mandarin (MAN)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Dutch (NLD)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Hindi (HIN)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Arabic (ARA)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Danish (DAN)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Turkish (TUR)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Portuguese (POR)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Hebrew (HEB)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Swedish (SWE)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Norwegian (NOR)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Italian (ITA)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Vietnamese (VIE)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Tagalog (TGL)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Khmer (KHM)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Hmong (HMN)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Telugu (TEL)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Bengali (BNE)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Marathi (MAR)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Urdu (URD)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Gujarati (GUJ)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Lithuanian (LIT)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Korean (KOR)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|American Sign Language (ASL)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|British Sign Language (BSL)|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Choose not to disclose|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Polish|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|Other|checkbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|(settable)|text field|not marked / unverified|未展开/见选项附录|[palantir-01-form.txt](../evidence/palantir-01-form.txt)|
|Application|application-form|application-form|radio button|not marked / unverified|未展开/见选项附录|[palantir-01-form.txt](../evidence/palantir-01-form.txt)|
|Application|application-form|Value: Click Here (If you encounter an issue, make sure your browser is updated and try clearing cache & cookies)|pop up button|not marked / unverified|未展开/见选项附录|[palantir-01-form.txt](../evidence/palantir-01-form.txt)|
|Application|application-form|application-form|pop up button|not marked / unverified|未展开/见选项附录|[palantir-01-form.txt](../evidence/palantir-01-form.txt)|
|Application|application-form|(settable)|text entry area|not marked / unverified|未展开/见选项附录|[palantir-01-form.txt](../evidence/palantir-01-form.txt)|
|Application|application-form|Yes, I consent|radio button|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|No, I do not consent|radio button|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application|application-form|ADDITIONAL INFORMATION|text entry area|not marked / unverified|未展开/见选项附录|[palantir-01-form.txt](../evidence/palantir-01-form.txt)|
|Application||Resume/CV ✱ ATTACH RESUME/CV|DOM button|yes (UI)|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Preferred Name \| What would you like us to call you?|DOM textbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Name Pronunciation \| How do you pronounce your name?|DOM textbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Are you legally authorized to work in the country for which you are applying? / Yes|DOM radio|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Are you legally authorized to work in the country for which you are applying? / No|DOM radio|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Will you now or in the future require sponsorship for employment visa status (e.g., H-1B, etc.)? / Yes|DOM radio|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Will you now or in the future require sponsorship for employment visa status (e.g., H-1B, etc.)? / No|DOM radio|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Which university are you currently attending or did you last attend? Please select "Other (School Not Listed)" if your school is not listed.|DOM combobox|not marked / unverified|3302 native options; only requested universities checked, see palantir-university-targets.json|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Please tell us how you heard about this opportunity.|DOM combobox|not marked / unverified|Select... \| Agency or Non-Palantir Recruiter \| America's Job Exchange \| BuiltIn \| Campus Ambassador \| Friend or Family \| Glassdoor \| Hackajob \| Hallo \| Handshake \| Job Board (Indeed, Monster, etc.) \| LinkedIn \| Palantir Event \| Palantir Medium Blog \| Palantir Recruiter \| Palantir Website \| Rewriting the Code \| Tapia \| University Job Board \| University or University Organization \| Other|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||What has been your favorite project or proudest accomplishment? Why?|DOM textbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Why do you want to work at Palantir?|DOM textbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Are you a Singapore citizen? / Yes|DOM radio|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Are you a Singapore citizen? / No|DOM radio|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Are you a Singapore permanent resident? / Yes|DOM radio|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Are you a Singapore permanent resident? / No|DOM radio|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|
|Application||Additional information|DOM textbox|not marked / unverified|未展开/见选项附录|[palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)|


## 重要状态截图

- [palantir-01-form.jpg](../screenshots/palantir-01-form.jpg)
- [palantir-02-university.jpg](../screenshots/palantir-02-university.jpg)
- [palantir-03-other-school-multiselect.jpg](../screenshots/palantir-03-other-school-multiselect.jpg)
- [palantir-04-sponsor-yes.jpg](../screenshots/palantir-04-sponsor-yes.jpg)
- [palantir-05-hcaptcha-blocker.jpg](../screenshots/palantir-05-hcaptcha-blocker.jpg)
- [palantir-06-after-human-captcha.jpg](../screenshots/palantir-06-after-human-captcha.jpg)
- [palantir-07-repeated-hcaptcha.jpg](../screenshots/palantir-07-repeated-hcaptcha.jpg)
- [palantir-08-latest-human.jpg](../screenshots/palantir-08-latest-human.jpg)
- [palantir-09-posting.jpg](../screenshots/palantir-09-posting.jpg)
- [palantir-10-validation-after-human.jpg](../screenshots/palantir-10-validation-after-human.jpg)
- [palantir-11-post-validation-settled.jpg](../screenshots/palantir-11-post-validation-settled.jpg)

## 原始证据索引

- [palantir-01-form.dom.txt](../evidence/palantir-01-form.dom.txt)
- [palantir-01-form.txt](../evidence/palantir-01-form.txt)
- [palantir-02-university.dom.txt](../evidence/palantir-02-university.dom.txt)
- [palantir-02-university.txt](../evidence/palantir-02-university.txt)
- [palantir-03-other-school-multiselect.dom.txt](../evidence/palantir-03-other-school-multiselect.dom.txt)
- [palantir-03-other-school-multiselect.txt](../evidence/palantir-03-other-school-multiselect.txt)
- [palantir-04-sponsor-yes.dom.txt](../evidence/palantir-04-sponsor-yes.dom.txt)
- [palantir-04-sponsor-yes.txt](../evidence/palantir-04-sponsor-yes.txt)
- [palantir-05-hcaptcha-blocker.dom.txt](../evidence/palantir-05-hcaptcha-blocker.dom.txt)
- [palantir-05-hcaptcha-blocker.txt](../evidence/palantir-05-hcaptcha-blocker.txt)
- [palantir-06-after-human-captcha.dom.txt](../evidence/palantir-06-after-human-captcha.dom.txt)
- [palantir-06-after-human-captcha.txt](../evidence/palantir-06-after-human-captcha.txt)
- [palantir-07-repeated-hcaptcha.dom.txt](../evidence/palantir-07-repeated-hcaptcha.dom.txt)
- [palantir-07-repeated-hcaptcha.txt](../evidence/palantir-07-repeated-hcaptcha.txt)
- [palantir-08-latest-human.dom.txt](../evidence/palantir-08-latest-human.dom.txt)
- [palantir-08-latest-human.txt](../evidence/palantir-08-latest-human.txt)
- [palantir-09-posting.dom.txt](../evidence/palantir-09-posting.dom.txt)
- [palantir-09-posting.txt](../evidence/palantir-09-posting.txt)
- [palantir-10-validation-after-human.dom.txt](../evidence/palantir-10-validation-after-human.dom.txt)
- [palantir-10-validation-after-human.txt](../evidence/palantir-10-validation-after-human.txt)
- [palantir-11-post-validation-settled.dom.txt](../evidence/palantir-11-post-validation-settled.dom.txt)
- [palantir-11-post-validation-settled.txt](../evidence/palantir-11-post-validation-settled.txt)
- [palantir-latest.dom.txt](../evidence/palantir-latest.dom.txt)
- [palantir-native-menu-0.txt](../evidence/palantir-native-menu-0.txt)
- [palantir-native-menu-1.txt](../evidence/palantir-native-menu-1.txt)
- [palantir-structured-controls.json](../evidence/palantir-structured-controls.json)
- [palantir-university-targets.json](../evidence/palantir-university-targets.json)
