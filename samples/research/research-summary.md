# ATS 真实申请流程研究 · 首批 12 公司

研究日期：2026-10-11，America/Los_Angeles。亲自在 Codex 内置浏览器访问、点击和观察四类 ATS，每类 3 家。12 个职位均可进入申请页面；Adobe、Salesforce 已到 **Review**。没有成功提交正式申请，因此正式提交后的确认页、申请编号、邮件和门户状态都列为未观测。

本轮保存 **114 张视口截图、476 条字段/控件观察记录、12 份公司报告**，以及 AX/DOM 快照、结构化属性和 88 个菜单/查询证据条目。476 是跨状态及 AX/DOM 观察记录数，含重复视角，不是 476 个独立字段，也不表示每条菜单都完整枚举。清单已排除验证码自身的输入控件。

## 阅读入口

- [ATS 跨公司比较](ats-comparison.md)：同平台一致性、公司差异、可复用层与专属逻辑。
- [通用流程模式](flow-patterns.md)：真实状态转换、认证、Review、异步上传/解析/校验。
- [控件行为](control-patterns.md)：日期、搜索下拉、重复组、国家依赖、条件字段及识别陷阱。
- [字段清单 CSV](field-inventory.csv)：字段标签、分组、控件、必填观测、选项、测试范围与原始证据。
- [菜单选项附录](menu-options.md) / [JSON](menu-options.json)、[按钮清单](button-inventory.md)、[状态证据索引](evidence-index.md)。
- [未访问流程及阻断原因](unobserved-flows.md)：明确区分没有看到、没有测试和已发生的错误。

## 样本与最终状态

|ATS|公司|职位|最深实际状态|
|---|---|---|---|
|Workday|[NVIDIA](companies/nvidia.md)|Senior Systems Software Engineer - GPU Performance at Scale|登录后4/5 Disclosures，协议待授权|
|Workday|[Adobe](companies/adobe.md)|Sr. Technical Account Manager，Mexico City|5/5 Review|
|Workday|[Salesforce](companies/salesforce.md)|Software Engineering MTS|5/5 Review|
|Greenhouse|[Anthropic](companies/anthropic.md)|Account Executive, AI Native|手填/手写简历入口、行内缺失错误|
|Greenhouse|[Figma](companies/figma.md)|Account Executive, Enterprise|条件Race、行内错误、可选MyGreenhouse登录|
|Greenhouse|[Airbnb](companies/airbnb.md)|Account Manager，London|公司页面内嵌iframe表单、行内缺失错误|
|Ashby|[Notion](companies/notion.md)|Software Engineer, Developer Platform|解析完成、缺失错误汇总|
|Ashby|[Ramp](companies/ramp.md)|Security Engineer, Cloud|公司问题、地点候选、编码挑战未完成|
|Ashby|[OpenAI](companies/openai.md)|Technical Program Manager, Compute Infrastructure|日期日历和手输、sponsorship切换|
|Lever|[Palantir](companies/palantir.md)|Administrative Business Partner，Singapore|学校/语言/菜单，人工captcha后继续又出现挑战|
|Lever|[Zoox](companies/zoox.md)|Administrative Business Partner, Floater|Custom条件字段，人工captcha后继续又出现挑战|
|Lever|[Veeva](companies/veeva.md)|Account Director|原生required错误、简历解析Success|

完整 URL、职位 ID、原数据 scrape 时间和原始 locations 在 [sample-manifest.json](sample-manifest.json)。职位详情与申请入口已实际访问；有些数据集链接本身直达申请页，之后补看概览/详情并点击入口验证。页面标题和 URL slug 不一致时保留原记录，不自行改职位身份。

## 对 auto-apply 最有价值的发现

1. **Workday 不能统一认定必须登录。** NVIDIA、Salesforce 要账户，Adobe 本职位可访客 Manual。五步表单骨架一致，但 Next 与 Save and Continue、来源树、Degree、地址必填及披露问题不同。
2. **字段必填有层次。** Salesforce 工作/教育分区 Optional，但新增记录内字段必填；Adobe 默认已有一项，NVIDIA/Salesforce 初始为空。新增两项并删除已实测三家。
3. **公司配置可以改变核心结构。** Airbnb 的 Resume 与 Cover Letter 都必填，Veeva Resume 未标必填；Figma Hispanic No 新增 Race；Zoox Custom Pronouns 新增文本；Salesforce previous worker Yes 新增四字段。
4. **日期控件必须实际打开识别。** Workday 是分段月年/年或证书月日年；OpenAI type=text 点击有日历；Anthropic earliest start 是普通文本，Zoox 获取身份日期要求在自由 textarea 内回答。
5. **上传、解析和提交是三个状态。** 同一合成 TXT 在 Notion 回填姓名/邮箱但电话空，Veeva 回填姓名/邮箱/电话/公司。三家 Workday Manual TXT 上传成功，没有验证其 Autofill 分支解析。
6. **校验顺序不同。** Greenhouse 行内，Ashby Notion 汇总且短暂禁用，Veeva 原生 required；Palantir/Zoox 先验证码。用户完成验证码后回到表单，不等于业务验证或申请已成功。
7. **题目措辞不能代替真实验证。** Salesforce “Please select yes if acknowledge” 实际选 No 后仍可保存到后续步骤和 Review；最终提交行为未验证。Palantir Other 学校提示拼法与真实 label 不同。
8. **可访问树需要 DOM 辅助。** Ashby Yes/No 的可见按钮与隐藏 input、Lever 无名称自定义字段、Salesforce Veterans 非 option 的 list、Airbnb iframe 都会影响通用定位器。

上述结论仅针对已测岗位。建议采用通用题块识别和状态观察层，加 ATS 适配器，再发现公司/职位配置；不是为每个公司写一套固定字段顺序。

## 研究方法与可追溯性

读取用户本地 `D:\Jingyan\job\application\auto-apply\samples\jobs.json`、`companies.json`。数据中的 Workday 4287、Greenhouse 25055、Ashby 5110、Lever 1695 个职位提供抽样框；从每个 ATS 选择三家不同公司，每公司取一条职位，优先实际能访问申请页面的记录。属于分层目的抽样，没有随机化或统计代表性声明。没有用网络搜索结果或其他项目说明补造流程。

用内置浏览器亲自操作，辅以授权浏览器只读 DOM/ARIA 和原生控件属性检查。没有独立爬虫或 Playwright 自动化程序；报告生成脚本只处理已保存的本地证据。截图是当时视口，长表单全部字段以完整 AX/DOM 快照补足，不把单张截图当整页内容。

所有录入履历均为明显虚构测试内容，上传 [synthetic-test-resume.txt](synthetic-test-resume.txt)，344 B。指定学校/China/US/California/Fremont 只用于菜单存在性查询，未选作新增测试个人资料；部分页面的初始默认美国值被观察后，Workday 测试地址改为虚构 Canada。NVIDIA 的登录由用户操作，文字证据中的用户操作账户地址已替换为标记；原始截图保留页面本来显示的账户栏，不包含密码。交付文本不保存测试密码。

用户逐次批准注册/协议的操作已完成；验证码由用户操作。NVIDIA 第4步新条款尚未获得本次确认。仲裁、真实性、反机器人代码等未执行分支明确列出，不把未接受的声明说成已同意。

## 保存位置与下一步

完整研究已保存到当前工作区 `outputs/research/`，另提供同目录结构的压缩包。用户指定的 D 盘 `samples/research/` 多次获得权限但实际写入仍被系统拒绝，**未成功同步**；压缩包可整体解压为该目录。所有请求的报告文件均已生成，没有把保存失败掩盖为成功。

优先补测：NVIDIA 协议后 Review；用户人工完成挑战后 Palantir/Zoox 的业务验证；Workday Autofill/Last Application；公司特定 sponsorship/government/export 条件分支；失败日期/文件格式；最后在明确授权的受控场景验证正式提交后的行为。后者目前没有事实依据。
