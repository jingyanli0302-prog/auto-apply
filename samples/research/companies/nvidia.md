# NVIDIA · Workday 实测

研究日期：2026-10-11（America/Los_Angeles）。样本：[ Senior Systems Software Engineer - GPU Performance at Scale ](https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite/job/US-CA-Santa-Clara/Senior-Performance-Engineer_JR1996987)；职位 ID `/job/US-CA-Santa-Clara/Senior-Performance-Engineer_JR1996987`。抽样来自本地数据集，链接可访问并出现申请入口。

## 页面流程、交互及边界

实际到达：登录后第 4/5 步 Voluntary Disclosures；Review 尚未访问。

职位详情 → Apply → Start Your Application（Autofill with Resume / Apply Manually / Use My Last Application）→ 邮箱登录/创建账户 → My Information → My Experience → Application Questions → Voluntary Disclosures。认证前进度含 6 步，登录后为 5 步。最初虚构账户注册返回 Invalid Username/Password，原因没有被证实；随后用户人工建立测试账户并登录。没有执行忘记密码或社交登录。

My Information：How Did You Hear About Us 是层级来源选择，打开 Associations / Event or Conference / Job Board / Social Media / University / Website，Website 下观察到 AI Residency Program、NVIDIA.COM、Udacity，测试选择 NVIDIA.COM。previous worker 的 Yes/No 均检查，未见新增字段；preferred name 勾选后出现 Preferred First/Last Name，关闭后消失。默认美国地址；State 菜单确认存在 California，没有选入测试地址。改 Canada 后 State 变为 Province or Territory，电话国家代码变 Canada (+1)。Phone Device Type 菜单含 Home、Home Cellular，测试 Home Cellular。姓名和电话使用虚构测试内容。

My Experience 初始无 Work Experience / Education。分别添加两项，实际观察独立 Delete、Add Another 和各自日期输入；然后删除空测试组继续。工作字段为 Job Title、Company、Location、Currently work here、From/To 月年、Role Description。教育为 School or University（文本框）、Degree、Field of Study（搜索）、GPA、From/To 年。Degree 与 Adobe、Salesforce 不同，菜单见证据。Skills、Resume/CV（5MB）、Websites Add、LinkedIn 也存在；上传明确标注为合成内容的 TXT 成功，但本次走 Manual，未验证 Workday 自动解析。

Questions 只有美国工作授权和未来 sponsorship 两项，Yes/No；测试 sponsorship Yes→No，未见新增字段。这一结果仅针对本职位和已测试选择。

Disclosures 中 Ethnicity、Gender、Veteran 标为 Required，但有拒绝披露选项；已分别选择 Decline to State、Decline to State、I DO NOT WISH TO SELF-IDENTIFY。Ethnicity 含 7 类及拒绝，Gender 为 Female/Male/Decline；Veteran 有 protected、非 protected veteran、not veteran、decline。末尾需要接受 NVIDIA 条款与申请人隐私政策，停在未勾选状态等待该次授权；注册时的授权不等于此处新协议的授权。尚未点击 Submit。

关键证据：nvidia-07-my-information、08-preferred-name、11-experience-empty、12-multiple-entries、14-application-questions、15-sponsor-yes、16-voluntary-disclosures、20-terms-ready。

认证字段实测为 Email Address、Password、Verify New Password、I agree，另有 Read More / Create Account / Sign In / Forgot your password?。密码要求：至少8字符，含字母、数字、大写、小写、特殊字符；未将密码写入交付物。登录方式页实际见 Google、LinkedIn、Email。NVIDIA Terms 区还提示只允许一个 authentic profile；本轮没有创建额外多个成功账户。

## 字段观察并集

下表由实际 AX/DOM 状态提取，包含被隐藏前后及重复组。`not marked / unverified` 表示未证实必填，不能当作 optional。DOM 补充行与 AX 行可能表达同一控件的不同名称，不是字段总数。选项完整并集见 [菜单附录](../menu-options.md)，属性原文见 evidence，测试动作以上文为准。

|步骤|分组/上下文|字段（实际名称）|控件|必填观测|选项|证据|
|---|---|---|---|---|---|---|
|Sign In|Sign In|Email Address|text field|not marked / unverified|未展开/见选项附录|[nvidia-03-email-login.txt](../evidence/nvidia-03-email-login.txt)|
|Sign In|Sign In|Password|text field|not marked / unverified|未展开/见选项附录|[nvidia-03-email-login.txt](../evidence/nvidia-03-email-login.txt)|
|Sign In|Sign In|Enter website. This input is for robots only, do not enter if you're human.|text field|not marked / unverified|未展开/见选项附录|[nvidia-03-email-login.txt](../evidence/nvidia-03-email-login.txt)|
|Create Account|Create Account|Email Address|text field|not marked / unverified|未展开/见选项附录|[nvidia-04-create-account.txt](../evidence/nvidia-04-create-account.txt)|
|Create Account|Create Account|Password|text field|not marked / unverified|未展开/见选项附录|[nvidia-04-create-account.txt](../evidence/nvidia-04-create-account.txt)|
|Create Account|Create Account|Verify New Password|text field|not marked / unverified|未展开/见选项附录|[nvidia-04-create-account.txt](../evidence/nvidia-04-create-account.txt)|
|Create Account|Create Account|I agree|checkbox|not marked / unverified|未展开/见选项附录|[nvidia-04-create-account.txt](../evidence/nvidia-04-create-account.txt)|
|Create Account|Create Account|Enter website. This input is for robots only, do not enter if you're human.|text field|not marked / unverified|未展开/见选项附录|[nvidia-04-create-account.txt](../evidence/nvidia-04-create-account.txt)|
|My Information|My Information|How Did You Hear About Us?|text field|yes (UI)|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Information|Description: Have you previously worked for NVIDIA as an employee or contractor?|Description: Have you previously worked for NVIDIA as an employee or contractor?|radio button|not marked / unverified|未展开/见选项附录|[nvidia-07-my-information.txt](../evidence/nvidia-07-my-information.txt)|
|My Information|Description: Have you previously worked for NVIDIA as an employee or contractor?|Description: Have you previously worked for NVIDIA as an employee or contractor?|radio button|not marked / unverified|未展开/见选项附录|[nvidia-07-my-information.txt](../evidence/nvidia-07-my-information.txt)|
|My Information|My Information|Country United States of America|pop up button|yes (UI)|未展开/见选项附录|[nvidia-07-my-information.txt](../evidence/nvidia-07-my-information.txt)|
|My Information|Legal Name|First Name|text field|yes (UI)|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Information|Legal Name|Last Name|text field|yes (UI)|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Information|Legal Name|I have a preferred name|checkbox|not marked / unverified|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Information|Address|Address Line 1|text field|not marked / unverified|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Information|Address|City|text field|not marked / unverified|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Information|Address|State Select One|pop up button|not marked / unverified|Select One \| Alabama \| Alaska \| American Samoa \| Arizona \| Arkansas \| Armed Forces Americas \| Armed Forces Europe \| Armed Forces Pacific \| California \| Colorado \| Connecticut \| Delaware \| District of Columbia \| Florida \| Georgia \| Guam \| Hawaii \| Idaho \| Illinois \| Indiana \| Iowa \| Kansas \| Kentucky \| Louisiana \| Maine \| Maryland \| Massachusetts \| Michigan \| Minnesota \| Mississippi \| Missouri \| Mo…（完整见 CSV / menu-options）|[nvidia-07-my-information.txt](../evidence/nvidia-07-my-information.txt)|
|My Information|Address|Postal Code|text field|not marked / unverified|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Information|Phone|Phone Device Type Select One|pop up button|yes (UI)|未展开/见选项附录|[nvidia-07-my-information.txt](../evidence/nvidia-07-my-information.txt)|
|My Information|Phone|Country Phone Code|text field|yes (UI)|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Information|Phone|Phone Number|text field|yes (UI)|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Information|Phone|Phone Extension|text field|not marked / unverified|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Information|Preferred Name|First Name|text field|yes (UI)|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Information|Preferred Name|Last Name|text field|yes (UI)|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Experience|Skills|Type to Add Skills|text field|not marked / unverified|未展开/见选项附录|[nvidia-11-experience-empty.dom.txt](../evidence/nvidia-11-experience-empty.dom.txt)|
|My Experience|Social Network URLs|Please provide a link to your LinkedIn profile:|text field|not marked / unverified|未展开/见选项附录|[nvidia-11-experience-empty.dom.txt](../evidence/nvidia-11-experience-empty.dom.txt)|
|My Experience|Work Experience {n}|Job Title|text field|yes (UI)|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|Work Experience {n}|Company|text field|yes (UI)|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|Work Experience {n}|Location|text field|not marked / unverified|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|Work Experience {n}|I currently work here|checkbox|not marked / unverified|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|workExperience-{entry}--startDate|Month|stepper|not marked / unverified|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|workExperience-{entry}--startDate|Year|stepper|not marked / unverified|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|workExperience-{entry}--endDate|Month|stepper|not marked / unverified|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|workExperience-{entry}--endDate|Year|stepper|not marked / unverified|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|Work Experience {n}|Role Description|text entry area|not marked / unverified|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|Education {n}|School or University|text field|yes (UI)|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|Education {n}|Degree Select One|pop up button|yes (UI)|Select One \| Post-diploma studies \| University Diploma \| Associates \| Technical/other training \| Some college \| PhD \| Some post college \| No Degree \| MBA \| Masters \| Juris Doctor \| High School \| Doctorate \| Bachelors|[nvidia-12-multiple-entries.txt](../evidence/nvidia-12-multiple-entries.txt)|
|My Experience|Education {n}|Field of Study|text field|not marked / unverified|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|Education {n}|Overall Result (GPA)|text field|not marked / unverified|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|From|Year|stepper|not marked / unverified|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|My Experience|To (Actual or Expected)|Year|stepper|not marked / unverified|未展开/见选项附录|[nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)|
|Application Questions|Are you legally authorized to work in the United States?|Are you legally authorized to work in the United States?|pop up button|not marked / unverified|未展开/见选项附录|[nvidia-14-application-questions.txt](../evidence/nvidia-14-application-questions.txt)|
|Application Questions|Will you now or in the future require sponsorship for employment visa status (e.g. H-1B visa status)?|Will you now or in the future require sponsorship for employment visa status (e.g. H-1B visa status)?|pop up button|not marked / unverified|未展开/见选项附录|[nvidia-14-application-questions.txt](../evidence/nvidia-14-application-questions.txt)|
|Voluntary Disclosures|Voluntary Disclosures|What is your ethnicity? Select One|pop up button|yes (UI)|Select One \| American Indian or Alaska Native (Not Hispanic or Latino) (United States of America) \| Asian (Not Hispanic or Latino) (United States of America) \| Black or African American (Not Hispanic or Latino) (United States of America) \| Decline to State (United States of America) \| Hispanic or Latino (United States of America) \| Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)…（完整见 CSV / menu-options）|[nvidia-16-voluntary-disclosures.txt](../evidence/nvidia-16-voluntary-disclosures.txt)|
|Voluntary Disclosures|Voluntary Disclosures|What is your gender? Select One|pop up button|yes (UI)|Select One \| Decline to State \| Female \| Male|[nvidia-16-voluntary-disclosures.txt](../evidence/nvidia-16-voluntary-disclosures.txt)|
|Voluntary Disclosures|Voluntary Disclosures|Do you identify as one of the following protected veterans (Disabled Veteran, Recently Separated Veteran, Active Duty Wartime or Campaign Badge Veteran, Armed Forces Service Medal Veteran)? Select One|pop up button|yes (UI)|Select One \| I IDENTIFY AS ONE OR MORE OF THE CLASSIFICATIONS OF PROTECTED VETERANS LISTED ABOVE \| I IDENTIFY AS A VETERAN, JUST NOT A PROTECTED VETERAN \| I AM NOT A VETERAN \| I DO NOT WISH TO SELF-IDENTIFY|[nvidia-16-voluntary-disclosures.txt](../evidence/nvidia-16-voluntary-disclosures.txt)|
|Voluntary Disclosures|Terms and Conditions|By selecting the checkbox, you agree to our Terms and Conditions and Applicant Privacy Policy.|checkbox|yes (UI)|未展开/见选项附录|[nvidia-16-voluntary-disclosures.dom.txt](../evidence/nvidia-16-voluntary-disclosures.dom.txt)|
|My Information|Have you previously worked for NVIDIA as an employee or contractor?|Have you previously worked for NVIDIA as an employee or contractor?* / Yes|DOM radio|yes (UI)|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|My Information|Have you previously worked for NVIDIA as an employee or contractor?|Have you previously worked for NVIDIA as an employee or contractor?* / No|DOM radio|yes (UI)|未展开/见选项附录|[nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)|
|Application Questions|Will you now or in the future require sponsorship for employment visa status (e.g. H-1B visa status)?|* Indicates a required field / Yes|DOM button|yes (UI)|未展开/见选项附录|[nvidia-15-sponsor-yes.dom.txt](../evidence/nvidia-15-sponsor-yes.dom.txt)|


## 重要状态截图

- [nvidia-03-email-login.jpg](../screenshots/nvidia-03-email-login.jpg)
- [nvidia-04-create-account.jpg](../screenshots/nvidia-04-create-account.jpg)
- [nvidia-05-registration-ready.jpg](../screenshots/nvidia-05-registration-ready.jpg)
- [nvidia-06-registration-error.jpg](../screenshots/nvidia-06-registration-error.jpg)
- [nvidia-07-my-information.jpg](../screenshots/nvidia-07-my-information.jpg)
- [nvidia-08-preferred-name.jpg](../screenshots/nvidia-08-preferred-name.jpg)
- [nvidia-09-phone-types.jpg](../screenshots/nvidia-09-phone-types.jpg)
- [nvidia-10-source-options.jpg](../screenshots/nvidia-10-source-options.jpg)
- [nvidia-11-experience-empty.jpg](../screenshots/nvidia-11-experience-empty.jpg)
- [nvidia-12-multiple-entries.jpg](../screenshots/nvidia-12-multiple-entries.jpg)
- [nvidia-13-degree-options.jpg](../screenshots/nvidia-13-degree-options.jpg)
- [nvidia-14-application-questions.jpg](../screenshots/nvidia-14-application-questions.jpg)
- [nvidia-15-sponsor-yes.jpg](../screenshots/nvidia-15-sponsor-yes.jpg)
- [nvidia-16-voluntary-disclosures.jpg](../screenshots/nvidia-16-voluntary-disclosures.jpg)
- [nvidia-17-ethnicity-options.jpg](../screenshots/nvidia-17-ethnicity-options.jpg)
- [nvidia-18-gender-options.jpg](../screenshots/nvidia-18-gender-options.jpg)
- [nvidia-19-veteran-options.jpg](../screenshots/nvidia-19-veteran-options.jpg)
- [nvidia-20-terms-ready.jpg](../screenshots/nvidia-20-terms-ready.jpg)

## 原始证据索引

- [nvidia-03-email-login.txt](../evidence/nvidia-03-email-login.txt)
- [nvidia-04-create-account.txt](../evidence/nvidia-04-create-account.txt)
- [nvidia-05-registration-ready.txt](../evidence/nvidia-05-registration-ready.txt)
- [nvidia-06-registration-error.txt](../evidence/nvidia-06-registration-error.txt)
- [nvidia-07-my-information.dom.txt](../evidence/nvidia-07-my-information.dom.txt)
- [nvidia-07-my-information.txt](../evidence/nvidia-07-my-information.txt)
- [nvidia-08-preferred-name.dom.txt](../evidence/nvidia-08-preferred-name.dom.txt)
- [nvidia-08-preferred-name.txt](../evidence/nvidia-08-preferred-name.txt)
- [nvidia-09-phone-types.dom.txt](../evidence/nvidia-09-phone-types.dom.txt)
- [nvidia-09-phone-types.txt](../evidence/nvidia-09-phone-types.txt)
- [nvidia-10-source-options.dom.txt](../evidence/nvidia-10-source-options.dom.txt)
- [nvidia-10-source-options.txt](../evidence/nvidia-10-source-options.txt)
- [nvidia-11-experience-empty.dom.txt](../evidence/nvidia-11-experience-empty.dom.txt)
- [nvidia-11-experience-empty.txt](../evidence/nvidia-11-experience-empty.txt)
- [nvidia-12-multiple-entries.dom.txt](../evidence/nvidia-12-multiple-entries.dom.txt)
- [nvidia-12-multiple-entries.txt](../evidence/nvidia-12-multiple-entries.txt)
- [nvidia-13-degree-options.dom.txt](../evidence/nvidia-13-degree-options.dom.txt)
- [nvidia-13-degree-options.txt](../evidence/nvidia-13-degree-options.txt)
- [nvidia-14-application-questions.dom.txt](../evidence/nvidia-14-application-questions.dom.txt)
- [nvidia-14-application-questions.txt](../evidence/nvidia-14-application-questions.txt)
- [nvidia-15-sponsor-yes.dom.txt](../evidence/nvidia-15-sponsor-yes.dom.txt)
- [nvidia-15-sponsor-yes.txt](../evidence/nvidia-15-sponsor-yes.txt)
- [nvidia-16-voluntary-disclosures.dom.txt](../evidence/nvidia-16-voluntary-disclosures.dom.txt)
- [nvidia-16-voluntary-disclosures.txt](../evidence/nvidia-16-voluntary-disclosures.txt)
- [nvidia-17-ethnicity-options.dom.txt](../evidence/nvidia-17-ethnicity-options.dom.txt)
- [nvidia-17-ethnicity-options.txt](../evidence/nvidia-17-ethnicity-options.txt)
- [nvidia-18-gender-options.dom.txt](../evidence/nvidia-18-gender-options.dom.txt)
- [nvidia-18-gender-options.txt](../evidence/nvidia-18-gender-options.txt)
- [nvidia-19-veteran-options.dom.txt](../evidence/nvidia-19-veteran-options.dom.txt)
- [nvidia-19-veteran-options.txt](../evidence/nvidia-19-veteran-options.txt)
- [nvidia-20-terms-ready.dom.txt](../evidence/nvidia-20-terms-ready.dom.txt)
- [nvidia-20-terms-ready.txt](../evidence/nvidia-20-terms-ready.txt)
- [nvidia-state-options.txt](../evidence/nvidia-state-options.txt)
