# Adobe · Workday 实测

研究日期：2026-10-11（America/Los_Angeles）。样本：[ Sr. Technical Account Manager ](https://adobe.wd5.myworkdayjobs.com/external_experienced/job/Mexico-City/Sr-Technical-Account-Manager_R171924)；职位 ID `/job/Mexico-City/Sr-Technical-Account-Manager_R171924`。抽样来自本地数据集，链接可访问并出现申请入口。

## 页面流程、交互及边界

实际到达：第 5/5 步 Review；未点击 Submit。

职位详情 → Apply → Start Your Application（三种 Workday 方法，另见 LinkedIn 按钮）→ Apply Manually → My Information。此职位允许访客直接填写，不要求先注册，页头仍有 Sign In。

My Information 的来源为层级选择，Adobe Source 下实际展开 Adobe.com、Adobe Career Academy、Adobe Digital Academy、Adobe MAX、Adobe Open House、Adobe Recruiting Team、Adobe Summit、Know Someone at Company、Research Call For Interns、Research Fellowship；其他根节点含 Contingent Worker Specific、External Organization/Events、Job Board、Social Media、Through University。测试 Adobe.com。previous worker Yes/No 未见条件字段。缺失验证实际要求来源、既往工作回答、First/Last Name、Email、Phone；地址在本次流程可不填。Country 大列表确认 China/United States，改 Canada 后出现 Province or Territory，测试 Ontario；Address Line 2 随国家切换发生变化。初始 example.com 测试邮箱被报 invalid email，换 example.org 并失焦后通过，原因未证明。

Experience 默认已有 Work Experience 1 和 Education 1。添加第二项后再删除，组数和 Delete 独立变化。工作 currently work here 隐藏 To；月年 Calendar 点 January 2026 后对应月=1、年=2026。教育 School 文本输入，Degree 的 GED/High School/Associate/Bachelor/Master/Doctorate/JD 等选项见菜单；测试 Bachelors。Field of Study 搜 Computer 返回 Computer and Information Science、Computer Engineering、Computer Graphics、Computer Systems Analysis，测试 Computer Engineering。GPA、教育起止年空白可进入下一步。Certification Add 展开证书搜索、编号、Issued/Expiration 的 M/D/Y 和附件，再删除。Skills、Resume/CV 5MB、LinkedIn 可见。Resume 缺失会阻止下一步；合成 TXT 上传成功。

Application Questions：合法工作年龄；过去 Adobe 身份（Employee / Intern / Temporary Agency or Vendor / Other / I have not worked... 多选）；是否愿背景核查；是否可提供工作权文件；日常地点或自费搬迁；sponsorship。菜单逐一打开，布尔问题 Yes/No；测试 sponsorship Yes→No，无新增字段，其他测试回答 No，过去身份选未工作。

Voluntary Disclosures 在这个 Mexico City 职位仅观察到数据处理和真实性条款，没有人口统计字段。用户人工处理声明后进入 Review。Review 展示全部分区、附件、空字段 No Response，以及 Back / Submit。记录的是草稿复核，不是提交成功或后续状态。

## 字段观察并集

下表由实际 AX/DOM 状态提取，包含被隐藏前后及重复组。`not marked / unverified` 表示未证实必填，不能当作 optional。DOM 补充行与 AX 行可能表达同一控件的不同名称，不是字段总数。选项完整并集见 [菜单附录](../menu-options.md)，属性原文见 evidence，测试动作以上文为准。

|步骤|分组/上下文|字段（实际名称）|控件|必填观测|选项|证据|
|---|---|---|---|---|---|---|
|My Information|My Information|How Did You Hear About Us?|text field|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Description: Have you been employed by Adobe in the past?|Description: Have you been employed by Adobe in the past?|radio button|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Description: Have you been employed by Adobe in the past?|Description: Have you been employed by Adobe in the past?|radio button|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|My Information|Country United States of America|pop up button|yes (UI)|250 items exposed in snapshot; targeted checks only; see adobe-07-country-options.txt|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Name|First Name|text field|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Name|Last Name|text field|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Address|Address Line 1|text field|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Address|Address Line 2|text field|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Address|City|text field|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Address|State Select One|pop up button|not marked / unverified|Select One \| Alberta \| British Columbia \| Manitoba \| New Brunswick \| Newfoundland and Labrador \| Northwest Territories \| Nova Scotia \| Nunavut \| Ontario \| Prince Edward Island \| Quebec \| Saskatchewan \| Yukon|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Address|Postal Code|text field|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Email Address|Email|text field|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Phone|Phone Device Type Mobile|pop up button|yes (UI)|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Phone|Country Phone Code|text field|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Phone|Phone Number|text field|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Phone|Phone Extension|text field|not marked / unverified|未展开/见选项附录|[adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-06-source-children.txt](../evidence/adobe-06-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-06-source-children.txt](../evidence/adobe-06-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-06-source-children.txt](../evidence/adobe-06-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-06-source-children.txt](../evidence/adobe-06-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-06-source-children.txt](../evidence/adobe-06-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-06-source-children.txt](../evidence/adobe-06-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-06-source-children.txt](../evidence/adobe-06-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-06-source-children.txt](../evidence/adobe-06-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-06-source-children.txt](../evidence/adobe-06-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-06-source-children.txt](../evidence/adobe-06-source-children.txt)|
|My Experience|Work Experience {n}|Job Title|text field|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|Work Experience {n}|Company|text field|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|Work Experience {n}|Location|text field|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|Work Experience {n}|I currently work here|checkbox|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|workExperience-{entry}--startDate|Month|stepper|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|workExperience-{entry}--startDate|Year|stepper|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|workExperience-{entry}--endDate|Month|stepper|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|workExperience-{entry}--endDate|Year|stepper|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|Work Experience {n}|Role Description|text entry area|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|Education {n}|School or University|text field|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|Education {n}|Degree Select One|pop up button|yes (UI)|Select One \| GED \| High School \| Associates \| Bachelors \| Masters \| Doctorate \| JD|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|Education {n}|Field of Study|text field|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|Education {n}|Overall Result (GPA)|text field|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|From|Year|stepper|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|To (Actual or Expected)|Year|stepper|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|Skills|Type to Add Skills|text field|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|Social Network URLs|Share your LinkedIn Profile site|text field|not marked / unverified|未展开/见选项附录|[adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)|
|My Experience|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-15-study-search.txt](../evidence/adobe-15-study-search.txt)|
|My Experience|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-15-study-search.txt](../evidence/adobe-15-study-search.txt)|
|My Experience|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-15-study-search.txt](../evidence/adobe-15-study-search.txt)|
|My Experience|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[adobe-15-study-search.txt](../evidence/adobe-15-study-search.txt)|
|My Experience|Certifications {n}|Certification|text field|not marked / unverified|未展开/见选项附录|[adobe-16-certification.txt](../evidence/adobe-16-certification.txt)|
|My Experience|Certifications {n}|Certification Number|text field|not marked / unverified|未展开/见选项附录|[adobe-16-certification.txt](../evidence/adobe-16-certification.txt)|
|My Experience|certification-{entry}--issuedDate|Month|stepper|not marked / unverified|未展开/见选项附录|[adobe-16-certification.txt](../evidence/adobe-16-certification.txt)|
|My Experience|certification-{entry}--issuedDate|Day|stepper|not marked / unverified|未展开/见选项附录|[adobe-16-certification.txt](../evidence/adobe-16-certification.txt)|
|My Experience|certification-{entry}--issuedDate|Year|stepper|not marked / unverified|未展开/见选项附录|[adobe-16-certification.txt](../evidence/adobe-16-certification.txt)|
|My Experience|certification-{entry}--expirationDate|Month|stepper|not marked / unverified|未展开/见选项附录|[adobe-16-certification.txt](../evidence/adobe-16-certification.txt)|
|My Experience|certification-{entry}--expirationDate|Day|stepper|not marked / unverified|未展开/见选项附录|[adobe-16-certification.txt](../evidence/adobe-16-certification.txt)|
|My Experience|certification-{entry}--expirationDate|Year|stepper|not marked / unverified|未展开/见选项附录|[adobe-16-certification.txt](../evidence/adobe-16-certification.txt)|
|Application Questions|Are you of legal age to work in the country in which this position will be based?*|Are you of legal age to work in the country in which this position will be based?*|pop up button|yes (UI)|Select One \| Yes \| No|[adobe-19-application-questions.txt](../evidence/adobe-19-application-questions.txt)|
|Application Questions|Have you ever worked at Adobe in the following capacity:*|Employee|checkbox|yes (UI)|未展开/见选项附录|[adobe-19-application-questions.txt](../evidence/adobe-19-application-questions.txt)|
|Application Questions|Have you ever worked at Adobe in the following capacity:*|Intern|checkbox|yes (UI)|未展开/见选项附录|[adobe-19-application-questions.txt](../evidence/adobe-19-application-questions.txt)|
|Application Questions|Have you ever worked at Adobe in the following capacity:*|Temporary Agency or Vendor|checkbox|yes (UI)|未展开/见选项附录|[adobe-19-application-questions.txt](../evidence/adobe-19-application-questions.txt)|
|Application Questions|Have you ever worked at Adobe in the following capacity:*|Other|checkbox|yes (UI)|未展开/见选项附录|[adobe-19-application-questions.txt](../evidence/adobe-19-application-questions.txt)|
|Application Questions|Have you ever worked at Adobe in the following capacity:*|I have not worked for Adobe in the past.|checkbox|yes (UI)|未展开/见选项附录|[adobe-19-application-questions.txt](../evidence/adobe-19-application-questions.txt)|
|Application Questions|Are you willing to submit a background check during the hiring process?*|Are you willing to submit a background check during the hiring process?*|pop up button|yes (UI)|Select One \| Yes \| No|[adobe-19-application-questions.txt](../evidence/adobe-19-application-questions.txt)|
|Application Questions|If you are offered employment by Adobe, can you provide documentation establishing your identity and right to work in the country where this position will be based?*|If you are offered employment by Adobe, can you provide documentation establishing your identity and right to work in the country where this position will be based?*|pop up button|yes (UI)|Select One \| Yes \| No|[adobe-19-application-questions.txt](../evidence/adobe-19-application-questions.txt)|
|Application Questions|Are you able to work on a daily basis in the work location listed for this position? If not, are you willing to relocate at your own expense to accept a position with Adobe?*|Are you able to work on a daily basis in the work location listed for this position? If not, are you willing to relocate at your own expense to accept a position with Adobe?*|pop up button|yes (UI)|Select One \| Yes \| No|[adobe-19-application-questions.txt](../evidence/adobe-19-application-questions.txt)|
|Application Questions|Will you now or in the future require sponsorship for employment visa status (e.g., H-1B visa status, spouse visa, etc)?*|Will you now or in the future require sponsorship for employment visa status (e.g., H-1B visa status, spouse visa, etc)?*|pop up button|yes (UI)|Select One \| Yes \| No|[adobe-19-application-questions.txt](../evidence/adobe-19-application-questions.txt)|
|Voluntary Disclosures|Terms and Conditions|Check this box to confirm the statement above.|checkbox|not marked / unverified|未展开/见选项附录|[adobe-22-voluntary-disclosures-terms.txt](../evidence/adobe-22-voluntary-disclosures-terms.txt)|


## 重要状态截图

- [adobe-01-posting.jpg](../screenshots/adobe-01-posting.jpg)
- [adobe-02-apply-methods.jpg](../screenshots/adobe-02-apply-methods.jpg)
- [adobe-03-my-information.jpg](../screenshots/adobe-03-my-information.jpg)
- [adobe-04-required-errors.jpg](../screenshots/adobe-04-required-errors.jpg)
- [adobe-05-source-options.jpg](../screenshots/adobe-05-source-options.jpg)
- [adobe-06-source-children.jpg](../screenshots/adobe-06-source-children.jpg)
- [adobe-07-country-options.jpg](../screenshots/adobe-07-country-options.jpg)
- [adobe-08-canada-address.jpg](../screenshots/adobe-08-canada-address.jpg)
- [adobe-09-provinces.jpg](../screenshots/adobe-09-provinces.jpg)
- [adobe-10-email-validation-error.jpg](../screenshots/adobe-10-email-validation-error.jpg)
- [adobe-11-experience-initial.jpg](../screenshots/adobe-11-experience-initial.jpg)
- [adobe-12-multiple-entries.jpg](../screenshots/adobe-12-multiple-entries.jpg)
- [adobe-13-month-picker.jpg](../screenshots/adobe-13-month-picker.jpg)
- [adobe-14-degree-options.jpg](../screenshots/adobe-14-degree-options.jpg)
- [adobe-15-study-search.jpg](../screenshots/adobe-15-study-search.jpg)
- [adobe-16-certification.jpg](../screenshots/adobe-16-certification.jpg)
- [adobe-17-resume-required.jpg](../screenshots/adobe-17-resume-required.jpg)
- [adobe-18-resume-uploaded.jpg](../screenshots/adobe-18-resume-uploaded.jpg)
- [adobe-19-application-questions.jpg](../screenshots/adobe-19-application-questions.jpg)
- [adobe-20-sponsor-options.jpg](../screenshots/adobe-20-sponsor-options.jpg)
- [adobe-21-sponsor-yes.jpg](../screenshots/adobe-21-sponsor-yes.jpg)
- [adobe-22-voluntary-disclosures-terms.jpg](../screenshots/adobe-22-voluntary-disclosures-terms.jpg)
- [adobe-23-terms-blocker.jpg](../screenshots/adobe-23-terms-blocker.jpg)
- [adobe-24-review.jpg](../screenshots/adobe-24-review.jpg)

## 原始证据索引

- [adobe-01-posting.txt](../evidence/adobe-01-posting.txt)
- [adobe-02-apply-methods.txt](../evidence/adobe-02-apply-methods.txt)
- [adobe-03-my-information.txt](../evidence/adobe-03-my-information.txt)
- [adobe-04-required-errors.txt](../evidence/adobe-04-required-errors.txt)
- [adobe-05-source-options.txt](../evidence/adobe-05-source-options.txt)
- [adobe-06-source-children.txt](../evidence/adobe-06-source-children.txt)
- [adobe-07-country-options.txt](../evidence/adobe-07-country-options.txt)
- [adobe-08-canada-address.txt](../evidence/adobe-08-canada-address.txt)
- [adobe-09-provinces.txt](../evidence/adobe-09-provinces.txt)
- [adobe-10-email-validation-error.txt](../evidence/adobe-10-email-validation-error.txt)
- [adobe-11-experience-initial.txt](../evidence/adobe-11-experience-initial.txt)
- [adobe-12-multiple-entries.txt](../evidence/adobe-12-multiple-entries.txt)
- [adobe-13-month-picker.txt](../evidence/adobe-13-month-picker.txt)
- [adobe-14-degree-options.txt](../evidence/adobe-14-degree-options.txt)
- [adobe-15-study-search.txt](../evidence/adobe-15-study-search.txt)
- [adobe-16-certification.txt](../evidence/adobe-16-certification.txt)
- [adobe-17-resume-required.txt](../evidence/adobe-17-resume-required.txt)
- [adobe-18-resume-uploaded.txt](../evidence/adobe-18-resume-uploaded.txt)
- [adobe-19-application-questions.txt](../evidence/adobe-19-application-questions.txt)
- [adobe-20-sponsor-options.txt](../evidence/adobe-20-sponsor-options.txt)
- [adobe-21-sponsor-yes.txt](../evidence/adobe-21-sponsor-yes.txt)
- [adobe-22-voluntary-disclosures-terms.txt](../evidence/adobe-22-voluntary-disclosures-terms.txt)
- [adobe-23-terms-blocker.txt](../evidence/adobe-23-terms-blocker.txt)
- [adobe-24-review.dom.txt](../evidence/adobe-24-review.dom.txt)
- [adobe-24-review.txt](../evidence/adobe-24-review.txt)
- [adobe-question-menu-0.txt](../evidence/adobe-question-menu-0.txt)
- [adobe-question-menu-1.txt](../evidence/adobe-question-menu-1.txt)
- [adobe-question-menu-2.txt](../evidence/adobe-question-menu-2.txt)
- [adobe-question-menu-3.txt](../evidence/adobe-question-menu-3.txt)
