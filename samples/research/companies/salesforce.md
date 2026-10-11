# Salesforce · Workday 实测

研究日期：2026-10-11（America/Los_Angeles）。样本：[ Software Engineering MTS ](https://salesforce.wd12.myworkdayjobs.com/External_Career_Site/job/California---San-Francisco/Software-Engineering-MTS_JR354592)；职位 ID `/job/California---San-Francisco/Software-Engineering-MTS_JR354592`。抽样来自本地数据集，链接可访问并出现申请入口。

## 页面流程、交互及边界

实际到达：第 5/5 步 Review；未点击 Submit。

详情 → Apply 三种方法 → Manual → Create Account（认证前 6 步）→ 注册成功 → 5 步表单。用户具体批准测试注册及 Candidate Privacy Notice，创建成功，未观察到邮箱验证步骤；不能推断所有账户都不需要验证。

My Information 来源是层级控件：Current or Former Employee / External Career Site Sources / Referral，后者含 Salesforce Careers Website、OpenAI、Anthropic、Gemini、LinkedIn、Indeed 等，全部实际可见选项见快照。选择 Salesforce Careers Website 后有异步更新，不能因首次 AX 未变就重复点击。previous worker Yes 新增旧员工 Email、Work Location、Manager Name、Employee ID 四字段，No 隐藏。美国 State Required；Canada Province 未标必填，但 Address Line 1 / City / Postal Code 实际缺失验证为必填，区别于 Adobe。测试虚构加拿大地址和电话。

Experience 初始 Work History / Education 都为空，标题明确 Optional；但是添加项目后 Job Title/Company/From/To 和 School/Degree 出现必填标记。分别添加两项确认独立组，再删除空组。教育没有观察到 GPA；Degree 有 GED、High School、AA、BA、BS、MA、MS、MAS、MBA、JD、MD、PhD（原文见菜单）。Skills and Strengths 提示最多 10，简历 5MB 必填，LinkedIn 可留空。合成 TXT 上传成功，未测试自动解析分支。

Questions：偏好地点 textarea；I-9 工作权证明理解；unrestricted work right；未来/配偶签证 sponsorship；近五年政府工作；政府离职限制确认；federal debarment；Iran/Cuba/North Korea/Syria export control；future positions 联系偏好；真实性确认。9 个选择控件全部打开：8 个为 Select One/Yes/No，联系偏好为接受或拒绝未来职位通知。全部布尔测试选 No，联系偏好选不联系。即使“Please select yes if acknowledge”题选择 No，也允许进入 Disclosures；这仅证明当前草稿保存校验行为，不能推断最终提交或招聘规则。初次按 nth 顺序读取时一个菜单选择异步改变后使后续序号漂移；随后改用实际 DOM id 逐一重新记录，准确菜单以 question-id-menu 系列为准。

Disclosures：Gender 包含 Female、Intersex、I prefer not to disclose、Male；Veterans 四选项；Ethnicity 含 Middle Eastern/North African 和其他类别以及拒绝披露，与 NVIDIA 不同。Veterans 以 list 项暴露，getByRole(option) 为空不代表没有选项。全部选拒绝披露。用户具体批准同意 Candidate Privacy Statement 与 AI in the Interview Process policy 后勾选条款，Save and Continue 到 Review。Review 确认空工作/教育为 No Response、附件成功上传、全部问题的 No 保留、披露拒绝值保留；Back / Submit 可见。

注册字段为 Email Address、Password、Verify New Password、Candidate Privacy Notice checkbox；密码要求字母、特殊字符、小写、大写、至少8字符和数字。Create Account、Sign In、Forgot your password? 都已观察，honeypot 未填；没有执行密码重置。

## 字段观察并集

下表由实际 AX/DOM 状态提取，包含被隐藏前后及重复组。`not marked / unverified` 表示未证实必填，不能当作 optional。DOM 补充行与 AX 行可能表达同一控件的不同名称，不是字段总数。选项完整并集见 [菜单附录](../menu-options.md)，属性原文见 evidence，测试动作以上文为准。

|步骤|分组/上下文|字段（实际名称）|控件|必填观测|选项|证据|
|---|---|---|---|---|---|---|
|Create Account|Create Account|Email Address|text field|not marked / unverified|未展开/见选项附录|[salesforce-03-create-account.txt](../evidence/salesforce-03-create-account.txt)|
|Create Account|Create Account|Password|text field|not marked / unverified|未展开/见选项附录|[salesforce-03-create-account.txt](../evidence/salesforce-03-create-account.txt)|
|Create Account|Create Account|Verify New Password|text field|not marked / unverified|未展开/见选项附录|[salesforce-03-create-account.txt](../evidence/salesforce-03-create-account.txt)|
|Create Account|Create Account|I acknowledge and agree to Salesforce's Candidate Privacy Notice|checkbox|not marked / unverified|未展开/见选项附录|[salesforce-03-create-account.txt](../evidence/salesforce-03-create-account.txt)|
|Create Account|Create Account|Enter website. This input is for robots only, do not enter if you're human.|text field|not marked / unverified|未展开/见选项附录|[salesforce-03-create-account.txt](../evidence/salesforce-03-create-account.txt)|
|My Information|My Information|How Did You Hear About Us?|text field|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)|
|My Information|ID: previousWorker--candidateIsPreviousWorker, Description: Have you previously worked for Salesforce as an employee or contractor, or are you a current Salesforce contractor? If "Yes" please provide at least one piece of information below, as accurately as possible. CURRENT EMPLOYEES: Please apply internally.|ID: previousWorker--candidateIsPreviousWorker, Description: Have you previously worked for Salesforce as an employee or contractor, or are you a current Salesforce contractor? If "Yes" please provide at least one piece of information below, as accurately as possible. CURRENT EMPLOYEES: Please apply internally.|radio button|not marked / unverified|未展开/见选项附录|[salesforce-04-my-information.txt](../evidence/salesforce-04-my-information.txt)|
|My Information|ID: previousWorker--candidateIsPreviousWorker, Description: Have you previously worked for Salesforce as an employee or contractor, or are you a current Salesforce contractor? If "Yes" please provide at least one piece of information below, as accurately as possible. CURRENT EMPLOYEES: Please apply internally.|ID: previousWorker--candidateIsPreviousWorker, Description: Have you previously worked for Salesforce as an employee or contractor, or are you a current Salesforce contractor? If "Yes" please provide at least one piece of information below, as accurately as possible. CURRENT EMPLOYEES: Please apply internally.|radio button|not marked / unverified|未展开/见选项附录|[salesforce-04-my-information.txt](../evidence/salesforce-04-my-information.txt)|
|My Information|My Information|Country United States of America|pop up button|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.txt](../evidence/salesforce-04-my-information.txt)|
|My Information|Legal Name|First Name|text field|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)|
|My Information|Legal Name|Last Name|text field|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)|
|My Information|Legal Name|I have a preferred name|checkbox|not marked / unverified|未展开/见选项附录|[salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)|
|My Information|Address|Address Line 1|text field|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)|
|My Information|Address|City|text field|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)|
|My Information|Address|State Select One|pop up button|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.txt](../evidence/salesforce-04-my-information.txt)|
|My Information|Address|Postal Code|text field|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)|
|My Information|Phone|Phone Device Type Mobile|pop up button|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.txt](../evidence/salesforce-04-my-information.txt)|
|My Information|Phone|Country Phone Code|text field|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)|
|My Information|Phone|Phone Number|text field|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)|
|My Information|Phone|Phone Extension|text field|not marked / unverified|未展开/见选项附录|[salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)|
|My Information|My Information|Your previous Salesforce employee email address|text field|not marked / unverified|未展开/见选项附录|[salesforce-05-previous-worker-yes.dom.txt](../evidence/salesforce-05-previous-worker-yes.dom.txt)|
|My Information|My Information|Your previous Salesforce work location|text field|not marked / unverified|未展开/见选项附录|[salesforce-05-previous-worker-yes.dom.txt](../evidence/salesforce-05-previous-worker-yes.dom.txt)|
|My Information|My Information|Your most recent Salesforce manager name|text field|not marked / unverified|未展开/见选项附录|[salesforce-05-previous-worker-yes.dom.txt](../evidence/salesforce-05-previous-worker-yes.dom.txt)|
|My Information|My Information|Your previous Salesforce employee ID|text field|not marked / unverified|未展开/见选项附录|[salesforce-05-previous-worker-yes.dom.txt](../evidence/salesforce-05-previous-worker-yes.dom.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.txt](../evidence/salesforce-07-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.txt](../evidence/salesforce-07-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.txt](../evidence/salesforce-07-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.txt](../evidence/salesforce-07-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.txt](../evidence/salesforce-07-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.txt](../evidence/salesforce-07-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.txt](../evidence/salesforce-07-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.txt](../evidence/salesforce-07-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.txt](../evidence/salesforce-07-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.txt](../evidence/salesforce-07-source-children.txt)|
|My Information|Follow Us|Follow Us|radio button|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.txt](../evidence/salesforce-07-source-children.txt)|
|My Experience|Skills and Strengths (Optional)|Type to Add Skills|text field|not marked / unverified|未展开/见选项附录|[salesforce-09-experience-empty.dom.txt](../evidence/salesforce-09-experience-empty.dom.txt)|
|My Experience|Social Network URLs|Please provide the URL to your LinkedIn profile.|text field|not marked / unverified|未展开/见选项附录|[salesforce-09-experience-empty.dom.txt](../evidence/salesforce-09-experience-empty.dom.txt)|
|My Experience|Work History (Optional) {n}|Job Title|text field|yes (UI)|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|My Experience|Work History (Optional) {n}|Company|text field|yes (UI)|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|My Experience|Work History (Optional) {n}|Location|text field|not marked / unverified|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|My Experience|Work History (Optional) {n}|I currently work here|checkbox|not marked / unverified|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|My Experience|workExperience-{entry}--startDate|Month|stepper|not marked / unverified|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|My Experience|workExperience-{entry}--startDate|Year|stepper|not marked / unverified|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|My Experience|workExperience-{entry}--endDate|Month|stepper|not marked / unverified|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|My Experience|workExperience-{entry}--endDate|Year|stepper|not marked / unverified|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|My Experience|Work History (Optional) {n}|Role Description|text entry area|not marked / unverified|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|My Experience|Education (Optional) {n}|School or University|text field|yes (UI)|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|My Experience|Education (Optional) {n}|Degree Select One|pop up button|yes (UI)|Select One \| GED \| HS \| AA \| BA \| BS \| MA \| MS \| MAS \| MBA \| JD \| MD \| PhD|[salesforce-10-multiple-entries.txt](../evidence/salesforce-10-multiple-entries.txt)|
|My Experience|Education (Optional) {n}|Field of Study|text field|not marked / unverified|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|My Experience|From|Year|stepper|not marked / unverified|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|My Experience|To (Actual or Expected)|Year|stepper|not marked / unverified|未展开/见选项附录|[salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)|
|Application Questions|What is your preferred geographic location?|What is your preferred geographic location?|text entry area|not marked / unverified|未展开/见选项附录|[salesforce-12-questions.txt](../evidence/salesforce-12-questions.txt)|
|Application Questions|I understand that upon employment, proof of legal right to work in the US and completion of an I-9 form will be required.*|I understand that upon employment, proof of legal right to work in the US and completion of an I-9 form will be required.*|pop up button|yes (UI)|Select One \| Yes \| No|[salesforce-12-questions.txt](../evidence/salesforce-12-questions.txt)|
|Application Questions|Do you have the unrestricted right to work in the country to which you're applying? (You must answer “No” if you are on any visa or possess any government issued work authorization document that has an expiration date; you should answer “Yes” if you have DACA or TPS authorization in the US)*|Do you have the unrestricted right to work in the country to which you're applying? (You must answer “No” if you are on any visa or possess any government issued work authorization document that has an expiration date; you should answer “Yes” if you have DACA or TPS authorization in the US)*|pop up button|yes (UI)|Select One \| Yes \| No|[salesforce-12-questions.txt](../evidence/salesforce-12-questions.txt)|
|Application Questions|Will you now or could you in the future require sponsorship to obtain work authorization or to transfer or extend your current visa? (You must answer “Yes” if your current visa is tied to your spouse or partner’s visa.)*|Will you now or could you in the future require sponsorship to obtain work authorization or to transfer or extend your current visa? (You must answer “Yes” if your current visa is tied to your spouse or partner’s visa.)*|pop up button|yes (UI)|Select One \| Yes \| No|[salesforce-12-questions.txt](../evidence/salesforce-12-questions.txt)|
|Application Questions|Government Employment: In the last 5 years, have you been an employee of a U.S. federal, state, or local government, including a "special Government employee" (defined under 18 U.S.C. §202), or a member of the U.S. Armed Services (including Reserve and Guard components)?*|Government Employment: In the last 5 years, have you been an employee of a U.S. federal, state, or local government, including a "special Government employee" (defined under 18 U.S.C. §202), or a member of the U.S. Armed Services (including Reserve and Guard components)?*|pop up button|yes (UI)|Select One \| Yes \| No|[salesforce-12-questions.txt](../evidence/salesforce-12-questions.txt)|
|Application Questions|I attest/confirm that I have no post-government employment restrictions currently applicable to me that have not already been addressed or disclosed in the previous questions, OR that if I am aware of any applicable restrictions, I will disclose them to the recruiter if contacted for further processing of my application. If I received written advice from my current or former government employer about work restrictions that are still active, I will provide it to the recruiter if contacted for further processing of my application.*|I attest/confirm that I have no post-government employment restrictions currently applicable to me that have not already been addressed or disclosed in the previous questions, OR that if I am aware of any applicable restrictions, I will disclose them to the recruiter if contacted for further processing of my application. If I received written advice from my current or former government employer about work restrictions that are still active, I will provide it to the recruiter if contacted for further processing of my application.*|pop up button|yes (UI)|Select One \| Yes \| No|[salesforce-12-questions.txt](../evidence/salesforce-12-questions.txt)|
|Application Questions|Are you currently or have you in the past been debarred, suspended, proposed for debarment or declared ineligible for award of a contract by any federal agency?*|Are you currently or have you in the past been debarred, suspended, proposed for debarment or declared ineligible for award of a contract by any federal agency?*|pop up button|yes (UI)|Select One \| Yes \| No|[salesforce-12-questions.txt](../evidence/salesforce-12-questions.txt)|
|Application Questions|As a U.S. company that exports software and technology internationally, we must comply with U.S. export control laws in every country where we operate. The information provided will be used to determine whether we need to obtain an Export Control License for your employment if you are hired. Are you a citizen, national or permanent resident of Iran, Cuba, North Korea or Syria?*|As a U.S. company that exports software and technology internationally, we must comply with U.S. export control laws in every country where we operate. The information provided will be used to determine whether we need to obtain an Export Control License for your employment if you are hired. Are you a citizen, national or permanent resident of Iran, Cuba, North Korea or Syria?*|pop up button|yes (UI)|Select One \| Yes \| No|[salesforce-12-questions.txt](../evidence/salesforce-12-questions.txt)|
|Application Questions|Regarding future positions at Salesforce, please select one of the following options*|Regarding future positions at Salesforce, please select one of the following options*|pop up button|yes (UI)|Select One \| Yes, I would like to receive communications about Salesforce and future openings \| No, please do not contact me about Salesforce and future openings|[salesforce-12-questions.txt](../evidence/salesforce-12-questions.txt)|
|Application Questions|I acknowledge that I have read, reviewed and answered the above questions truthfully and accurately. I further understand, and agree, that any offer of employment I may receive from Salesforce is conditional on the truth of the above statements and that, in the event it is subsequently determined that any of the above is inaccurate, any such offer of employment can be rescinded and, in the event I have commenced employment, such employment will be terminated, to the extent permitted by applicable law. Please select "yes" if you acknowledge.*|I acknowledge that I have read, reviewed and answered the above questions truthfully and accurately. I further understand, and agree, that any offer of employment I may receive from Salesforce is conditional on the truth of the above statements and that, in the event it is subsequently determined that any of the above is inaccurate, any such offer of employment can be rescinded and, in the event I have commenced employment, such employment will be terminated, to the extent permitted by applicable law. Please select "yes" if you acknowledge.*|pop up button|yes (UI)|Select One \| Yes \| No|[salesforce-12-questions.txt](../evidence/salesforce-12-questions.txt)|
|Voluntary Disclosures|Equal Opportunity Employment|Gender Select One|pop up button|yes (UI)|Select One \| Female \| Intersex \| I prefer not to disclose \| Male|[salesforce-14-next-result.txt](../evidence/salesforce-14-next-result.txt)|
|Voluntary Disclosures|Equal Opportunity Employment|Veterans Select One|pop up button|yes (UI)|Select One \| I identify as one or more of the classifications of protected veterans listed above. \| I identify as a veteran, just not a protected veteran. \| I am not a veteran. \| I do not wish to self-identify.|[salesforce-14-next-result.txt](../evidence/salesforce-14-next-result.txt)|
|Voluntary Disclosures|Equal Opportunity Employment|Ethnicity Select One|pop up button|yes (UI)|Select One \| Asian or Indian Subcontinent (Not Hispanic or Latinx) (United States of America) \| Black or African American (Not Hispanic or Latinx) (United States of America) \| Hispanic or Latinx (United States of America) \| I prefer not to disclose (United States of America) \| Middle Eastern/North African (Not Hispanic or Latinx) (United States of America) \| Native Hawaiian or Other Pacific Island…（完整见 CSV / menu-options）|[salesforce-14-next-result.txt](../evidence/salesforce-14-next-result.txt)|
|Voluntary Disclosures|Terms and Conditions|Yes, I have read and consent to the terms and conditions|checkbox|yes (UI)|未展开/见选项附录|[salesforce-14-next-result.dom.txt](../evidence/salesforce-14-next-result.dom.txt)|
|My Information||Have you previously worked for Salesforce as an employee or contractor, or are you a current Salesforce contractor? If \"Yes\" please provide at least one piece of information below, as accurately as possible. CURRENT EMPLOYEES: Please apply internally.* / Yes|DOM radio|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)|
|My Information||Have you previously worked for Salesforce as an employee or contractor, or are you a current Salesforce contractor? If \"Yes\" please provide at least one piece of information below, as accurately as possible. CURRENT EMPLOYEES: Please apply internally.* / No|DOM radio|yes (UI)|未展开/见选项附录|[salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)|
|My Information|Phone|External Career Site Sources|DOM radio|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.dom.txt](../evidence/salesforce-07-source-children.dom.txt)|
|My Information|Phone|Alumni Network|DOM radio|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.dom.txt](../evidence/salesforce-07-source-children.dom.txt)|
|My Information|Phone|Anthropic|DOM radio|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.dom.txt](../evidence/salesforce-07-source-children.dom.txt)|
|My Information|Phone|Award Announcement - Employer Recognition|DOM radio|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.dom.txt](../evidence/salesforce-07-source-children.dom.txt)|
|My Information|Phone|ClearanceJobs|DOM radio|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.dom.txt](../evidence/salesforce-07-source-children.dom.txt)|
|My Information|Phone|Equality Event|DOM radio|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.dom.txt](../evidence/salesforce-07-source-children.dom.txt)|
|My Information|Phone|Facebook|DOM radio|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.dom.txt](../evidence/salesforce-07-source-children.dom.txt)|
|My Information|Phone|First Source|DOM radio|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.dom.txt](../evidence/salesforce-07-source-children.dom.txt)|
|My Information|Phone|Gemini|DOM radio|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.dom.txt](../evidence/salesforce-07-source-children.dom.txt)|
|My Information|Phone|Glassdoor|DOM radio|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.dom.txt](../evidence/salesforce-07-source-children.dom.txt)|
|My Information|Phone|Handshake|DOM radio|not marked / unverified|未展开/见选项附录|[salesforce-07-source-children.dom.txt](../evidence/salesforce-07-source-children.dom.txt)|
|Application Questions|What is your preferred geographic location?|* Indicates a required field|DOM textbox|yes (UI)|未展开/见选项附录|[salesforce-12-questions.dom.txt](../evidence/salesforce-12-questions.dom.txt)|


## 重要状态截图

- [salesforce-02-apply-methods.jpg](../screenshots/salesforce-02-apply-methods.jpg)
- [salesforce-03-create-account.jpg](../screenshots/salesforce-03-create-account.jpg)
- [salesforce-04-my-information.jpg](../screenshots/salesforce-04-my-information.jpg)
- [salesforce-05-previous-worker-yes.jpg](../screenshots/salesforce-05-previous-worker-yes.jpg)
- [salesforce-06-source-options.jpg](../screenshots/salesforce-06-source-options.jpg)
- [salesforce-07-source-children.jpg](../screenshots/salesforce-07-source-children.jpg)
- [salesforce-08-required-errors.jpg](../screenshots/salesforce-08-required-errors.jpg)
- [salesforce-09-experience-empty.jpg](../screenshots/salesforce-09-experience-empty.jpg)
- [salesforce-10-multiple-entries.jpg](../screenshots/salesforce-10-multiple-entries.jpg)
- [salesforce-11-degree-options.jpg](../screenshots/salesforce-11-degree-options.jpg)
- [salesforce-12-questions.jpg](../screenshots/salesforce-12-questions.jpg)
- [salesforce-13-questions-no.jpg](../screenshots/salesforce-13-questions-no.jpg)
- [salesforce-14-next-result.jpg](../screenshots/salesforce-14-next-result.jpg)
- [salesforce-15-terms-ready.jpg](../screenshots/salesforce-15-terms-ready.jpg)
- [salesforce-16-veterans.jpg](../screenshots/salesforce-16-veterans.jpg)
- [salesforce-17-terms-ready.jpg](../screenshots/salesforce-17-terms-ready.jpg)
- [salesforce-18-review.jpg](../screenshots/salesforce-18-review.jpg)

## 原始证据索引

- [salesforce-02-apply-methods.txt](../evidence/salesforce-02-apply-methods.txt)
- [salesforce-03-create-account.txt](../evidence/salesforce-03-create-account.txt)
- [salesforce-04-my-information.dom.txt](../evidence/salesforce-04-my-information.dom.txt)
- [salesforce-04-my-information.txt](../evidence/salesforce-04-my-information.txt)
- [salesforce-05-previous-worker-yes.dom.txt](../evidence/salesforce-05-previous-worker-yes.dom.txt)
- [salesforce-05-previous-worker-yes.txt](../evidence/salesforce-05-previous-worker-yes.txt)
- [salesforce-06-source-options.dom.txt](../evidence/salesforce-06-source-options.dom.txt)
- [salesforce-06-source-options.txt](../evidence/salesforce-06-source-options.txt)
- [salesforce-07-source-children.dom.txt](../evidence/salesforce-07-source-children.dom.txt)
- [salesforce-07-source-children.txt](../evidence/salesforce-07-source-children.txt)
- [salesforce-08-required-errors.dom.txt](../evidence/salesforce-08-required-errors.dom.txt)
- [salesforce-08-required-errors.txt](../evidence/salesforce-08-required-errors.txt)
- [salesforce-09-experience-empty.dom.txt](../evidence/salesforce-09-experience-empty.dom.txt)
- [salesforce-09-experience-empty.txt](../evidence/salesforce-09-experience-empty.txt)
- [salesforce-10-multiple-entries.dom.txt](../evidence/salesforce-10-multiple-entries.dom.txt)
- [salesforce-10-multiple-entries.txt](../evidence/salesforce-10-multiple-entries.txt)
- [salesforce-11-degree-options.dom.txt](../evidence/salesforce-11-degree-options.dom.txt)
- [salesforce-11-degree-options.txt](../evidence/salesforce-11-degree-options.txt)
- [salesforce-12-questions.dom.txt](../evidence/salesforce-12-questions.dom.txt)
- [salesforce-12-questions.txt](../evidence/salesforce-12-questions.txt)
- [salesforce-13-questions-no.dom.txt](../evidence/salesforce-13-questions-no.dom.txt)
- [salesforce-13-questions-no.txt](../evidence/salesforce-13-questions-no.txt)
- [salesforce-14-next-result.dom.txt](../evidence/salesforce-14-next-result.dom.txt)
- [salesforce-14-next-result.txt](../evidence/salesforce-14-next-result.txt)
- [salesforce-15-terms-ready.dom.txt](../evidence/salesforce-15-terms-ready.dom.txt)
- [salesforce-15-terms-ready.txt](../evidence/salesforce-15-terms-ready.txt)
- [salesforce-16-veterans.dom.txt](../evidence/salesforce-16-veterans.dom.txt)
- [salesforce-16-veterans.txt](../evidence/salesforce-16-veterans.txt)
- [salesforce-17-terms-ready.dom.txt](../evidence/salesforce-17-terms-ready.dom.txt)
- [salesforce-17-terms-ready.txt](../evidence/salesforce-17-terms-ready.txt)
- [salesforce-18-review.dom.txt](../evidence/salesforce-18-review.dom.txt)
- [salesforce-18-review.txt](../evidence/salesforce-18-review.txt)
- [salesforce-Ethnicity-options.txt](../evidence/salesforce-Ethnicity-options.txt)
- [salesforce-Gender-options.txt](../evidence/salesforce-Gender-options.txt)
- [salesforce-question-id-menu-0.txt](../evidence/salesforce-question-id-menu-0.txt)
- [salesforce-question-id-menu-1.txt](../evidence/salesforce-question-id-menu-1.txt)
- [salesforce-question-id-menu-2.txt](../evidence/salesforce-question-id-menu-2.txt)
- [salesforce-question-id-menu-3.txt](../evidence/salesforce-question-id-menu-3.txt)
- [salesforce-question-id-menu-4.txt](../evidence/salesforce-question-id-menu-4.txt)
- [salesforce-question-id-menu-5.txt](../evidence/salesforce-question-id-menu-5.txt)
- [salesforce-question-id-menu-6.txt](../evidence/salesforce-question-id-menu-6.txt)
- [salesforce-question-id-menu-7.txt](../evidence/salesforce-question-id-menu-7.txt)
- [salesforce-question-id-menu-8.txt](../evidence/salesforce-question-id-menu-8.txt)
- [salesforce-question-menu-0.txt](../evidence/salesforce-question-menu-0.txt)
- [salesforce-question-menu-1.txt](../evidence/salesforce-question-menu-1.txt)
- [salesforce-question-menu-2.txt](../evidence/salesforce-question-menu-2.txt)
- [salesforce-question-menu-3.txt](../evidence/salesforce-question-menu-3.txt)
- [salesforce-question-menu-4.txt](../evidence/salesforce-question-menu-4.txt)
- [salesforce-question-menu-5.txt](../evidence/salesforce-question-menu-5.txt)
- [salesforce-question-menu-6.txt](../evidence/salesforce-question-menu-6.txt)
- [salesforce-question-menu-7.txt](../evidence/salesforce-question-menu-7.txt)
- [salesforce-Veterans-options.txt](../evidence/salesforce-Veterans-options.txt)
