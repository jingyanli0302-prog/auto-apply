# 未访问与未证实流程

状态截至 2026-10-11 本轮最后观察。未观察不是“不存在”；一个页面显示正常也不证明正式投递一定成功。

|公司/范围|最后成功状态|未访问/未证实|具体原因|
|---|---|---|---|
|NVIDIA|4/5 Voluntary Disclosures，人口统计已选decline，协议未勾选|Review / Submit|此处条款与隐私协议的具体授权尚待回复；不复用先前注册授权|
|Adobe|5/5 Review|Submit后确认页、门户、邮件、后续状态|未发送正式申请；只保存测试草稿|
|Salesforce|5/5 Review|同上；问题全部No是否会影响最终业务规则|Review仅证明草稿保存接受，非后端提交成功|
|Anthropic|不完整提交后的行内错误|完整有效验证、仲裁接受、只填LinkedIn是否满足Resume二选一、成功页|未同意仲裁，也未构造完整履历；没有将说明与规则差异推为缺陷|
|Figma|行内错误；另MyGreenhouse登录页|security-code登录、Autofill解析、完整申请/成功页|未发验证邮件；普通手填已可访问|
|Airbnb|iframe内行内错误|完整提交、AI同意、sponsorship三选项条件分支|未构造完整申请或同意AI声明；三选项仅展开|
|Notion|解析后缺失错误汇总|有效提交、可能的Review或成功页|资料仍缺Phone/Location/LinkedIn/AnchorDays；没有提交完整申请|
|Ramp|Application，编码题/安全解释未填|编码挑战解答、完整验证、解析、提交后页|网页题目用于反自动申请/读代码；没有运行其代码；一次提交验证工具调用审批超时，不计为已执行|
|OpenAI|Application，日期显示11/15/2026、sponsor No|仲裁与真实性声明、完整验证、上传解析、限次触发、提交后页|未接受协议或声明；限次仅观察文案，没有故意消耗申请次数|
|Palantir|用户完成hCaptcha后原申请表，姓名邮箱等仍空；最后一次继续又出现挑战|缺失字段业务错误、完整提交、最终确认|曾出现Please try again；最新人工完成后继续一次，异步后再次图片挑战，仍阻断|
|Zoox|用户完成hCaptcha后原申请表；最后继续验证再次挑战|缺失字段业务错误、完整提交、解析、最终确认|验证码消失后继续一次再次图片挑战，仍没有业务结果|
|Veeva|合成TXT解析Success，基本资料回填|解析后完整验证、NextStep确认、正式提交、潜在captcha|未虚构已加入安全发件人；没有再次点击Submit|
|全部Workday|Manual分支|Autofill with Resume、Use My Last Application、social auth、forgot password、邮箱验证、持久草稿恢复/退出重登|本轮深入Manual；其他方式仅观察入口，不能称已走通|
|所有12家公司|至少已进入申请并观察控件|拒信/筛选/重复申请/撤回/最终申请ID或邮件|没有成功提交正式申请，不能记录提交后的事实|
|跨地区/岗位|每公司1岗位|同公司其他地区/岗位/移动布局/多语言|首批分层目的抽样，不足以归纳公司全部配置|

## 深度测试中尚缺的分支

Workday 无效日期、开始结束逆序、学校/技能大量候选分页、最大附件/错误格式/病毒扫描、所有 previous-worker 子分支、其他国家地址、浏览器返回/刷新恢复都未系统测试。Salesforce government/export/sponsorship 的 Yes 分支未测试；本轮只打开完整菜单并选 No。NVIDIA/Adobe/单页样本所测 Sponsorship 无新增字段仅限已列选择。

大菜单仅按用户指定目标搜索，不声称枚举全部学校/国家。文件上传只用明确合成的 344 B TXT，未用真实简历或敏感证件。没有独立爬虫、Playwright程序或网络搜索结果作为页面证据。

## 存储限制

用户指定 D:\Jingyan\job\application\auto-apply\samples\research。多次申请并获得该目录写权限后，实际 New-Item/文件写入仍 Access denied。已在当前工作区 outputs/research 保存完整镜像并生成压缩包；D 盘目录没有被成功写入，不将其标记为已同步。数据集读取和本地报告生成不使用网络爬取。
