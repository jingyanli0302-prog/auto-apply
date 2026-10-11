# auto-apply

可恢复、必须人工 Review 并明确批准的申请工具。使用 Playwright 和本地 YAML，不调用 OpenAI API，不生成申请答案。

```sh
npm install
npx playwright install chromium
node cli.mjs setup
# 编辑 config/profile.yml，填写本人资料、附件和按题目原文配置的 answers
node cli.mjs queue import-research
node cli.mjs batch
```

一个 headed Chromium 会话、一个 context 管理每个任务的页面，自动操作串行执行。验证码、OTP、协议、认证或异常会保存任务及页面，切换下一个 queued 任务。终端进入交互命令循环；浏览器保持打开。用户操作暂停页后 `resume ID` 重新扫描，绝不回放旧 DOM 定位。

```text
list
resume TASK_ID
review TASK_ID
approve TASK_ID CURRENT_REVIEW_FINGERPRINT
submit TASK_ID
check TASK_ID
resolve TASK_ID not-submitted 已人工核查门户且该职位没有提交记录的具体依据
quit
```

`apply URL` / `fill URL` 填写到人工 Review；`batch [targets.txt]` 处理 queued 任务；`scan URL` 只扫描。`queue add URL [company]` 添加，`queue list` / `status` / `list` 查看。`resume ID`、`review ID`、`check ID` 也可从新进程启动。最终批准只能在当前交互会话给出；没有命令行跳过 Review 的开关。

Review 只显示缺失、推导、不确定、映射/校验失败或未经确认的页面资料；明确提供且实际填写验证成功的资料不重复列出。中间步骤可批准该步 Review 后继续，最终步骤批准才成为 ready-to-submit。协议必须由用户在浏览器内处理。批准绑定页面文字、字段/选项/值、frame、DOM 变更版本、配置答案及附件内容哈希；任何变化（包括改回原值）都会失效，必须重新 Review。最终点击前重新核验，严格只点唯一的最终 Submit。

状态存于 `data/tasks.json`：queued、filling、needs-human、needs-review、ready-to-submit、submitting、submitted、uncertain、failed。每个任务有 UUID、状态历史、阻断/异常、新字段、映射失败、Review 和提交证据。截图在 `data/evidence/`。这些文件包含私人申请信息，已 gitignore。任务文件原子替换；会话锁禁止两个进程同时操作任务。

退出/重启后会重新打开职位原 URL，现场扫描核验；不会宣称恢复了服务端草稿或重放旧字段。原页面内存状态只在会话活着时保留；不持久保存 cookies/password。登录或草稿恢复不确定时交人工处理。重启清除全部 Review/批准；submitting 转 uncertain。旧 CSV 非 queued/pending 记录导入 uncertain，不沿用旧成功判断。

没有错误、解析 Success、验证码消失或 URL 变化均不代表成功。只有同可信来源的新出现、明确针对申请的成功 heading，且该 document 表单消失，才记录 submitted；否则 uncertain。uncertain 不会继续填写或提交。用户先运行 `check ID`，再核查门户/邮件/实际结果；只有明确记录 `resolve ID not-submitted 具体人工核验依据` 才能解除阻断，之后 `resume ID` 重新扫描、Review 和批准。工具不推断“未提交”，也不自动重试。网络异常也不会重投。研究未观察正式成功页，当前确认规则是保守实现，须在受控真实场景继续验证。

账户按精确租户 hostname 配置 `accounts`，邮箱/密码引用 `.env` 环境变量。已有账户明确 `existing: true` 才尝试 Sign In；新账户 `existing: false` 准备创建入口及用户提供的邮箱/密码，注册、协议、OTP 由用户完成。成功后将 existing 改为 true。不会因登录失败擅自新建账户，也不输出或保存密码。Adobe 访客路径不强迫登录；MyGreenhouse 可选认证不自动选择。

国家别名 US/USA/United States/United States of America 只用于 Country。EEO 的限定拒答别名只用于对应披露题；电话国家代码不能借国家别名猜测。Yes/No、同意声明和长题目不做宽泛匹配。`work_auth`、government/export 等事实通过 `answers` 的精确题文 + `value_ref` 映射；支持按 URL/group/id 限定。`company_relationships` 可显式设置 `relatives_employed: "No"`、`previously_employed: "No"`，复用本人已确认的“无亲戚在该公司工作、未在该公司工作过”事实；模板空值不启用。仅识别肯定式题型，反问、政府关联、复合问题或 No 选项不明确仍转 Review。重复组仅在可唯一识别的工作/教育/证书分区内增加，歧义、层级菜单、多选或新控件转人工 Review。未知必填观测不等同 optional。

研究范围及人工回退见 [coverage.md](docs/coverage.md)。fixture 是依据研究证据重建的最小 DOM 行为模型，不能证明线上 12 个页面已经端到端通过。测试不会访问真实职位或投递。

```sh
npm run test:unit
npm run test:dom
npm test
npm run check
```

使用 Node 内置测试；DOM 测试使用已安装的 Chromium，headed。项目没有额外 lint/type/build 工具链。自动学习不会修改申请答案；旧 fields/learner/otp 模块不参与新申请流水线。
