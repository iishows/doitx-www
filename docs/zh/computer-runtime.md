# 计算机运行时

Doitx 将智能体运行时和计算机运行时分开：

```text
chat/API -> one Pi agent session -> Doitx computer tools -> SandboxProvider -> E2B / Daytona / Boat
                                                   |-> Docker
                                                   |-> desktop/fake

SandboxProvider workspace <-> AgentHomeStore <-> Doitx-owned DATA_DIR
```

Pi 在 Doitx API/worker 进程中运行。它不会被安装到 E2B 中，也不由 E2B 执行。内置工具是普通的 Pi 工具，而非 Claude 或 MCP 专用工具，因此通过 Pi 暴露的任何模型都可以调用它们。屏幕操作仍需要能够接受图像工具结果并推理截图的模型。

## 计算机约定

每个空间默认获得一台 Team Computer。Bot 共享其文件和已安装的工具。每个 Team Bot 从 `bots/<bot-id>/` 启动，而有意共享的工作放在 `shared/` 中。这些文件夹用于组织工作，但不是安全边界：每个 Team Bot 都能访问完整的 Team 工作区。Bot 也可以改用 Private Computer，此时整个工作区就是它的主目录。

每个活跃的 Team Bot 都有自己的 X 显示和 Chrome 进程，并有一个以该 Bot 身份为键的持久 Chrome 配置文件。登录状态、cookie 和浏览历史相互独立。配置文件永远不会从另一个 Bot 克隆、合并，也不会在桌面释放时被删除。两个 Bot 都保留各自的更改；重新打开某个 Bot 时即使其显示槽位发生变化，也会使用其现有配置文件。Team 运行使用带栅栏的按 Bot 数据库租约：不同的 Bot 可以并发操作，而一个 Bot 同时只有一个计算机驱动。

Docker、E2B、Daytona 和 Boat 使用相同的 Linux 桌面生命周期命令。远程适配器共享分配、观察、操作和控制处理；提供商代码提供命令执行、持久工作区路径和屏幕 URL。Boat 通过其 `hostPort` API 的受保护端口（而非默认桌面 API）暴露共享运行时。查看和控制使用各自可撤销的 websocket 能力；拆除会在显示槽位被复用前断开客户端。拆除失败会使槽位保持保留状态以便重试。

桌面栈在 Bot 使用图形工具时才惰性启动。默认没有配置的桌面上限；一台计算机可以承载 100 个或更多 Bot 配置文件，同时运行的桌面数受其 RAM、CPU、进程容量和可用的本地调试端口限制。Docker 运维人员可以设置一个正的 `SANDBOX_TEAM_SCREEN_LIMIT` 来限制活跃桌面数（`0` 表示不设置）。超出显式限制的请求会返回 `MULTI_SCREEN_UNAVAILABLE`；shell 和文件工具仍然可用。所有桌面共用一个受令牌保护的屏幕网关，因此增加桌面无需发布更多端口。每个查看/控制能力都指向唯一的本地 Unix socket；回收显示槽位无法将旧连接重定向到它的下一个 Bot。非活跃 Bot 不会各自运行 Chrome。关闭查看器不会破坏桌面。在 Docker 上以及 Boat、E2B、Daytona 和 Railway 计算机的 Linux 桌面上，成功完成运行会撤销该运行的控制权，但会为该 Bot 保留屏幕和浏览器以供下次运行，保持现有视图打开及其已登录会话。确实重启的浏览器会恢复其上次会话。如果达到配置的 Team 屏幕限制，最旧的空闲、未受控屏幕可能会被拆除以腾出给新 Bot。失败或取消的运行以及显式删除计算机仍会拆除其屏幕。CreateOS 屏幕照旧释放。整机空闲关闭会停止剩余进程，同时保留工作区。没有针对每个桌面的单独不活动计时器。持久配置文件会占用磁盘，但不需要运行中的 Chrome 进程。

`SandboxProvider` 是提供商边界。后端必须实现：

- 生命周期：预配/重新连接、停止和销毁；
- 桌面：观察、有序批量操作、用户输入和实时屏幕会话；
- 执行：在机器内运行命令；
- 文件：列出/读取/写入，以及完整的工作区导入/导出。

在受支持的图形计算机上，模型会获得 `browser_navigate`、`browser_snapshot` 和 `browser_act`，用于获取页面文本和元素引用。默认的 `computer` 浏览器提供商通过 sandbox 的可选 `pageBrowser` 契约驱动可见的 Chromium 标签页。Docker 通过与桌面控制相同的受管屏幕和租约检查来实现该契约；请更新计算机镜像以安装辅助程序。其他提供商在实现该契约之前保留其现有的桌面工具。无需托管浏览器服务或 API 密钥。

计算机容器就是安全边界。Team Bot 共享 OS 用户、工作区、浏览器配置文件和 shell/X11 访问；屏幕租约协调的是工具调用，而不是该计算机内部互不信任的进程。CDP 仅绑定到容器的回环接口，不会作为主机端口发布。当工作负载需要隔离时，请使用独立的计算机。

该辅助程序使用隔离的脚本环境，屏蔽密码值，并拒绝过期引用，而不是重定向到替换后的元素。快照包含有界的页面文本和最多 80 个交互元素。框架和不支持的交互需要桌面工具。失败的操作会报告已确认的进度以及结果是否不确定：继续之前检查当前状态，永远不要自动重放已完成或结果不确定的操作。对于没有视觉能力的模型，如果页面工具无法操作，请请求接管。

虚拟计算机和显式的 `BROWSER_PROVIDER=fake|emulator` 使用进程内会话进行测试。这些会话不是实时登录的浏览器。浏览器变更共享现有的教学保护和工作中区检查点流程。`computer_observe`、批量 `computer_act`、`open_path`、`launch_app`、`shell` 和文件工具会根据计算机和模型能力保持可用。连续相同的桌面帧会保留其元数据，但从模型上下文中省略重复的图像字节。工具结果会说明上一张屏幕截图仍然有效。在重复相同的视觉操作后画面仍无变化时，computer_act 会拒绝再次执行该操作，并引导智能体使用页面文本工具。

人类输入和智能体输入可以在不同的 Team 屏幕上共存。"Take control"（接管）会为用户授予该 Bot 屏幕的独占控制租约，使嵌入式查看器接受输入。对于 Team Bot，当该 Bot 持有实时的计算机执行租约或存在活跃运行时，接管会以 HTTP 409（"Stop the bot first"）被拒绝，除非该运行处于 `waiting_takeover`（Bot 请求了受保护输入）。先停止 Bot，再接管；释放后，智能体可以继续。当模型明确需要受保护输入或人工判断时，`request_takeover` 仍然可用。在运行期间不计费的提供商上，等待中的接管会在请求后将计算机保持唤醒 30 分钟，以便用户到达时登录、2FA 或 CAPTCHA 页面仍处于打开状态；之后计算机会挂起，而运行继续等待。计费提供商遵循正常的空闲计时器，该请求会重新启动计时器。

## 终端和文件

Web 和桌面计算机视图会从屏幕上的 dock 打开终端和文件浏览器。dock 的浏览器按钮会隐藏这些窗口并保留其会话，从而再次显示整个屏幕。

**终端**

- Activity 视图始终显示 Bot 在其计算机上做了什么，包括实时和历史记录。每个操作都记录为 `computer.command` 事件：
  - `shell` 命令，带有脱敏后的命令及其输出的末尾部分；
  - `write_file`、`attach_file`、`open_path` 和 `launch_app`，各占一行，写入操作带有大小，失败时带有错误。

  只读工具（`read_file`、`list_files`）被排除。用户持有控制时 Bot 仍可运行命令，因此该信息流从不消失。
- 在无控制时（例如控制权被释放或过期后），"Open shell" 按钮会重新接管并切换到 shell。
- 持有控制的用户还会获得一个带有交互式 shell 的 Shell 标签页。它在首次使用时启动，在标签页切换之间保持连接，并在连接断开时重新连接到新的 shell。`computer.terminalUrl` 会在计算机内屏幕网关旁边启动一个小型 PTY 服务器。
  - 它绑定到该显示的控制令牌，并通过与控制屏幕相同的密封能力和网关访问。同一租约下的后续会话（另一个标签页、重新打开的窗口）会以各自的 shell 加入该服务器，因此已打开的 shell 会继续运行。
  - 它以计算机的工作区用户（绝不以 root）运行，环境与 Bot 的 `shell` 工具相同。Docker exec 会继承容器的非 root 用户；E2B、Daytona 和 Boat 使用与 `shell` 相同的命令运行器。当计算机以没有 passwd 条目的主机 uid 运行（macOS 上的 Docker）时，终端会通过 nss_wrapper 为其自身会话将其命名为 `rakazo`，因此提示符和 `whoami` 可以正常工作；`/etc/passwd` 保持不变。
  - 释放控制、过期或屏幕拆除会停止它，断开所有 shell，并删除其会话文件。
- 提供商通过 `SandboxProvider.connectTerminal` 选择加入。Docker、E2B、Daytona 和 Boat 支持它。主机（`desktop`）计算机从不暴露浏览器 shell；其他不支持它的计算机仅显示 Activity。
- 虚拟提供商通过一个回环 websocket 网关提供模拟 shell，该网关使用相同的帧协议。测试随后可以通过密封能力和 Web 代理驱动浏览器终端，而无需暴露主机 shell。

**浏览器代理**

- 可以将 Bot 配置为通过上游代理浏览（参见 `self-host.md` 中的"Per-bot browser proxy"）。由于 Chromium 无法携带代理凭据，启动时会在计算机内的 `127.0.0.1` 上启动 `browser-proxy-relay.py`，并传入 `--proxy-server=http://127.0.0.1:<port>`。
- 中继端口派生自 Bot 的浏览器配置文件路径，因此共享一台计算机的两个 Bot 会获得各自的中继。回环保持直连，因此 CDP 和屏幕路径从不经过上游代理。
- 中继由 `rakazo-browser` 随浏览器一起启动，并在浏览器退出时停止；只影响该 Bot 的浏览器。

**文件**

- 浏览和文本预览可通过已存储的工作区在已停止的计算机上进行。
- 当 Files 窗口可见时，打开的文件夹每隔几秒以及每个 Bot 命令之后都会刷新，因此来自 shell 或 Bot 的更改无需重新打开即可显示。
- 下载需要计算机处于运行状态。
- 上传还需要控制权。上传内容位于 Bot 的工作区路径下，并受附件大小上限限制。

## 屏幕连接诊断

Web 服务会记录 `screen.proxy.target_rejected`、`screen.proxy.http_failed`、`screen.proxy.http_upstream_response`、`screen.proxy.websocket_handshake_failed`、`screen.proxy.websocket_error`、`screen.proxy.websocket_upgraded`、`screen.proxy.websocket_closed` 以及撤销事件。每个事件都包含一个随机的 `screen.connection_id` 和查看/控制策略。WebSocket 关闭事件包含上游握手是否完成、其持续时间以及发起关闭的一方（`client`、`upstream` 或 `revoked`）。日志省略能力 URL、socket 令牌、提供商主机名、cookie 和请求头。

Web 和 Electron 屏幕框架是沙箱化的，因此应用无法查看其内部。在为代理页面加框之前，应用会先获取一次该页面，并在屏幕位置显示固定的、本地化的代理拒绝原因（例如 "The screen did not respond."）。代理会用一个小的报告器重写每个 noVNC 页面，该报告器在页面运行后立即向应用发送 `loading`，然后发送 `connecting`、`connected`、`failed`（其状态文本永不显示）或 `disconnected`；Doitx 自己的 `embed.html` 设置相同的 noVNC class，因此 Docker 计算机也会报告。收到 `failed` 报告，或在 15 秒内没有超过 `loading` 的任何消息，会显示错误和 Retry，而不是空白框架。移动应用遵循相同的屏幕报告，并在连接失败时提供 Retry。保持静默的框架意味着文档从未在该浏览器中执行；停在 `loading` 的框架意味着 noVNC 的模块从未完成求值；`failed` 报告意味着页面已运行但 noVNC 无法连接。

该 shim 还会从页面中移除 `VideoDecoder`。1.7 之前的 noVNC 版本使用顶层 `await` 探测 WebCodecs H.264 支持，而在某些 Android 设备上 `VideoDecoder.flush()` 永不返回，导致页面停留在 `noVNC_loading` 且没有错误。屏幕从不使用 H.264。每个代理的屏幕响应都会带上 `Cache-Control: no-transform`，因此位于 Web 服务前面的 CDN 不会向页面注入脚本或压缩页面。

当屏幕显示连接错误时，检查 API 日志中 `computer.screenUrl` 是否成功，然后检查同一时间附近的 Web 服务 `screen.proxy.*` 事件。对于 `screen.proxy.target_rejected`，读取 `reason`：`invalid_path` 表示不是会话路径（未联系 API）；`authority_rejected` 表示非 OK 的 API 响应（过期、撤销或 API 错误）；`invalid_authority_response` 表示 OK 响应但目标正文无效或格式错误；`authority_unavailable` 表示请求、连接或超时失败。上游错误或非 101 握手指向提供商屏幕网关。已升级但很快关闭的连接指向握手后的传输中断。如果 API 签发了 URL 但没有出现 Web 服务事件，请检查浏览器 Network 面板及其 WebSocket 请求。不要将完整的能力 URL 粘贴到 issue 或日志中。

## E2B 后端

E2B 适配器使用 `@e2b/desktop`，Novita 适配器使用 `novita-sandbox` 来处理机器生命周期、shell 命令、文件和端口 URL。每个 Bot 桌面都使用共享的 Linux 运行时，包括第一个 Bot。其 X 显示、屏幕截图、输入和查看/控制传输遵循与其他受管提供商相同的生命周期。

## Daytona 后端

数据库存储提供商类型和不透明的 `providerRef`。该引用是一条加速路径，而非持久数据。它只会传回同一提供商类型。机器缺失或提供商类型更改会创建替代机器，并通过提供商中立契约恢复其工作区。

## Boat 后端

Boat 适配器使用 Boat 官方的 TypeScript SDK 进行生命周期、命令和文件操作。它以 `noEnv: true` 创建和恢复 sandbox，这是第三方提供 API 密钥时的要求，并在计算机活跃期间保持两小时 TTL 刷新。共享运行时创建每个 Bot 的显示和 noVNC 传输，通过受保护的 Boat 端口托管暴露。Doitx 的加密屏幕能力代理绑定查看/控制策略，并使提供商凭据不出现在浏览器可见的 URL 中。观察和操作针对所分配的 Bot 显示。

Boat 停止会归档机器，恢复会重新连接同一个不透明的 sandbox id。每个 Bot 的 Chrome 配置文件位于可移植工作区下，并包含在检查点/导出中。API 无法恢复的 Boat 状态（已删除、已取消、快照数据过期，或恢复无法修复的 `error`）会被报告为 gone，因此计算机会被替换并从其最后一个检查点恢复。

## 持久化

可移植的计算机工作区是持久边界。E2B 使用 `/home/user/rakazo-home`；Docker 和本地提供商暴露等效的主目录。在 E2B 上，浏览器配置文件位于该工作区下的 `.browser-profiles`。Doitx 会在运行完成或失败时、显式停止之前以及空闲挂起之前，将传输的工作区检查点保存到 `AgentHomeStore`。Docker 直接挂载 Doitx 拥有的主目录，并且仅在这些边界推进其修订标记。新机器或替代机器在使用前会导入最新存储的工作区。

`LocalAgentHomeStore` 将最新工作区保存在 `DATA_DIR/homes/<computer-home-key>` 下，并将检查点元数据单独保存在 `DATA_DIR/home-revisions` 下。替代内容会在交换当前副本之前暂存，检查点按计算机串行化。此实现仅保留最新版本，而不是不可变的修订归档。使用它的部署必须将 `DATA_DIR` 放在 Doitx 拥有的持久卷上，对该卷进行静态加密，并将其纳入异地备份。

设置 `OBJECT_STORAGE_BUCKET` 后，`ObjectAgentHomeStore` 会将 S3 兼容的桶作为事实来源，并将 `DATA_DIR/homes` 作为缓存，而不改变智能体工具或 sandbox 提供商。每个检查点会将主目录打包成由目录和常规文件组成的单个归档，用主目录的数据密钥密封（64 KiB AES-256-GCM 分段，绑定到主目录的存储 id 和修订版本），以 `homes/<storage id>/<revision>` 上传，在计算机行上推进修订版本，并删除上一个对象。读取和启动会首先将缓存更新到已存储的修订版本。数据密钥由空间的内容密钥包装并存储在计算机行上，因此删除计算机会使其对象无法读取；worker 的协调器随后会删除没有任何计算机拥有的对象。恢复仅接受不包含 `.` 或 `..` 段的相对路径，只创建目录和常规文件，并强制执行大小和条目限制。参见 [自托管](./self-host.md#bot-homes-in-object-storage)。

在导出远程工作区之前，远程后端会静默桌面浏览器，以便一致地复制配置文件数据库和登录状态。当另一个 Bot 持有执行或用户控制租约时，运行检查点会推迟；最后完成的运行或空闲作业会保存共享工作区。空闲关闭会在导出前占用计算机，防止在快照期间启动新 Bot。它们只排除 `.browser-profiles` 内的临时缓存/锁文件；名称相似的项目文件仍会持久保留。

一次性的 OS 镜像不是可移植的磁盘快照。迁移到另一个提供商时，安装在工作区之外的系统包会丢失；持久的机器定制应通过可复现的镜像或设置配方来表示。这正是使未来切换后端切实可行、而不必尝试转换供应商特定 VM 快照的原因。

Docker 计算机包含 `uv`，用于无 root 的 Python CLI 安装。运行 `uv tool install <package>`；工具环境、命令 shim、受管 Python 版本和缓存都保存在持久主目录下。这安装的是 Python 命令行工具，而不是 `apt` 依赖之类的系统包。镜像还附带 GitHub 的 `gh` CLI；Bot 通过设备流对该 CLI 进行认证，gh 会将该凭据保存在持久主目录下。`pdftotext`、`pandoc` 和 `openpyxl` 可用于从 PDF、文档和电子表格中提取文本。

## 验证

[智能体验证指南](agent-verification.md) 还描述了通过真实 Pi 进行的确定性联系人导出回放，可使用有状态的虚拟计算机或真实的 Docker Chromium。它不需要推理，并补充了下方的视觉验收测试。

离线测试覆盖工具结果图像、操作解析、提供商一致性（包括页面浏览器适配器和 computer_act 回退）、工作区检查点/恢复、提供商 SDK 转换、生命周期集成，以及针对内存中 Boat API 的真实 Boat 适配器。它们从不调用模型或实时 sandbox。

显式验收测试需要 Docker（用于临时 Postgres）、`E2B_API_KEY`、`OPENROUTER_API_KEY` 以及一个支持视觉的 OpenRouter 模型 id：

```bash
COMPUTER_E2E_MODEL=<vision-capable-openrouter-model-id> pnpm test:computer
```

它会启动完整 API，预配真实的 E2B 桌面，在 sandbox 内提供确定性页面，并要求真实模型观察并点击一个按钮。该按钮会创建服务器端标记；测试随后要求模型使用终端和文件工具，并验证该标记和记录的工具调用。最后，它销毁提供商机器，通过过期的提供商引用启动替代机器，并验证外部检查点恢复了模型创建的文件。该命令为选择性启用，除非显式调用，否则不会由 `pnpm test` 或 CI 运行。

### Docker 桌面生命周期回归

构建计算机镜像，然后运行 `VERIFY_DOCKER_TEAM_SCREENS=1 pnpm exec vitest run infra/sandboxes/supervisor/src/team-desktops.docker.test.ts`。设置 `RAKAZO_COMPUTER_IMAGE` 以选择预构建镜像。该测试使用一个禁用网络且浏览器状态为虚拟的隔离 Docker 容器；它验证并行 Chrome 桌面访问本地 fixture 站点、独立的 cookie、释放后的配置文件持久化、传输拆除，以及槽位复用后拒绝旧查看/控制令牌。它会同时运行 Docker 监管和远程提供商使用的命令路径。默认单元测试在没有 Docker 的情况下离线验证配置文件持久化、分配和租约栅栏。

## 计算机维护

更新和恢复作为持久后台作业运行。在操作保存和替换工作区期间，计算机范围的预留会排除新的执行租约、停止、接管、空闲挂起和计算机模式更改。进度与计算机的预配栅栏分开存储。Web 和 Electron 显示对话框或紧凑的后台药丸；移动端使用原生 sheet。重新打开应用会从 API 恢复活跃操作和失败。

更新会使用配置的提供商/镜像显式重建；`canUpdate` 表示计算机支持该操作，而不是检测到了更新的镜像。提供商迁移和镜像版本发现不属于此 UI 的一部分。更新会在拆除前对实时工作进行检查点。恢复可以回退到最后一个已保存的工作区，因此其失败操作会警告未保存的工作可能丢失。

协调器会在错过入队后重新发布排队的操作。已被认领的作业永远不会被破坏性重放。停止心跳十分钟的 worker 会被标记为已中断，并保持预留，直到其提供商调用结束。只有到那时恢复才可用。如果某个 worker 已永久消失，运维人员必须先停止受影响的 worker，并确认提供商操作已停止，然后才能使用中断对话框中仅限服务器所有者的 **Release computer**（释放计算机）操作。其确认要求显式断言 worker 和提供商操作已停止，然后使正常恢复可用。对应的 RPC 是 `computer/releaseInterrupted`，参数为 `{ id, workersStopped: true }`；它只接受所有者当前工作区中的已中断操作。仅有过期心跳从不授权接管。进度报告实际的生命周期阶段，而不是估计的百分比；工作区文件和浏览器配置文件是可移植的，而工作区之外的系统包则不是。
