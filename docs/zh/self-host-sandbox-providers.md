# 自托管 sandbox / 计算机提供商

`SANDBOX_PROVIDER` 选择 Bot 计算机的运行位置。工作区 Bot 默认共享一台 Team Computer；Private Computer 为可选项。关于共享与持久化约定，参见 [计算机运行时与隔离](./computer-runtime.md)。

## 快速选择

| 目标 | 设置 | 还需要 |
| --- | --- | --- |
| 本地 Docker 计算机 | `SANDBOX_PROVIDER=docker` | `SANDBOX_SUPERVISOR_TOKEN`、计算机镜像、供 supervisor 使用的 Docker socket |
| 仅 UI，无计算机 | `SANDBOX_PROVIDER=none` | 无需提供商凭据；发布镜像的 Compose 仍要求 `SANDBOX_SUPERVISOR_TOKEN` |
| 托管远程桌面 | `e2b` / `novita` / `daytona` / `boat` | `SANDBOX_SUPERVISOR_TOKEN`（发布镜像 Compose）、对应的 API 密钥（以及 Daytona/Boat 的可选 URL 参数） |
| 在你自己的集群上每台计算机一个 pod | `SANDBOX_PROVIDER=kubernetes` | API 和 worker 运行在集群内、一个命名空间，以及可创建、读取、删除 pod 并 exec 进入 pod 的 Role |

发布镜像 [Compose](../infra/compose/docker-compose.images.yml) 默认为 **`docker`**。它始终启动 supervisor 并要求 `SANDBOX_SUPERVISOR_TOKEN`，包括 `none` 和远程提供商。该栈级凭据不能替代远程提供商的 API 密钥。

## `docker`（栈内 supervisor）

Compose 会在内部网络启动 **sandbox supervisor**（来自应用镜像）（发布镜像中端口为 `7091`）。它根据 `RAKAZO_COMPUTER_IMAGE` + `RAKAZO_COMPUTER_IMAGE_TAG` 创建同级的 **计算机** 容器。

要求：

- 非空的 `SANDBOX_SUPERVISOR_TOKEN`（与认证 / 屏幕 / 加密密钥不同）
- 可访问的计算机镜像（默认 GHCR 或你的镜像源；在 arm64 上为应用和计算机都固定多架构标签）
- supervisor 可用的 Docker Engine（Compose 路径上挂载 socket）

验证：

```bash
curl -fsS http://127.0.0.1:3100/internal/health
# expect sandbox: docker
```

缺少 supervisor 令牌是**设置失败**：不要将 `sandbox: "none"` 视为该路径的成功。

注册和本地 Docker 计算机**无需** E2B（或其他远程）账户即可工作。

### Bot 浏览器

发布镜像的计算机使用 Chromium。若要改用 Brave，请用 `BROWSER=brave` 构建镜像并让 Compose 指向它：

```bash
docker build --build-arg BROWSER=brave -t rakazo-computer-brave infra/sandboxes/computer
```

```env
RAKAZO_COMPUTER_IMAGE=rakazo-computer-brave
RAKAZO_COMPUTER_IMAGE_TAG=latest
```

镜像只包含一个浏览器，`rakazo-browser` 会启动已安装的那个。本地构建的镜像不在镜像仓库中，因此请在先拉取其他镜像一次后，用 `bash install-images.sh --pull-never` 启动栈。Brave 的 Rewards、Wallet、Leo、VPN 和 News 已通过托管策略禁用。浏览器身份只是 Bot 检测挑战的一个输入；主机的 IP 声誉通常更重要。

## `kubernetes`

每台计算机都是你选择的命名空间中的一个 pod，由发布镜像的计算机镜像创建。API 和 worker 使用自己的 service account（或 `KUBECONFIG` 中的 kubeconfig）与 Kubernetes API 通信，因此它们通常运行在同一集群中。不涉及 supervisor 或 Docker socket。

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `KUBERNETES_SANDBOX_NAMESPACE` | `rakazo-sandboxes` | 计算机 pod 的命名空间；必须已存在 |
| `KUBERNETES_SANDBOX_COMPUTER_IMAGE` | `ghcr.io/iishows/doitx/computer:edge` | 生产环境中请固定 digest |
| `KUBERNETES_SANDBOX_RUNTIME_CLASS_NAME` | 未设置 | 例如 `kata` 或 `gvisor`，用于 VM 或用户空间内核边界 |
| `KUBERNETES_SANDBOX_CPU_LIMIT` / `_MEMORY_LIMIT` | 未设置 | 容器限制，例如 `2` 和 `4Gi` |
| `KUBERNETES_SANDBOX_POD_LABELS` / `_POD_ANNOTATIONS` | 未设置 | 字符串 JSON 对象，合并到每个 pod |
| `KUBERNETES_SANDBOX_READY_TIMEOUT_MS` | `120000` | 新 pod 变为就绪的时限 |

每个 pod 以镜像自带的用户（uid 1000）运行，不带 service account token 和 service links，并带有 `app.kubernetes.io/name=rakazo-computer` 和 `rakazo-bot-id=<bot id>` 标签。命令、文件传输以及工作区保存和恢复都通过 `pods/exec` 进行；保存和恢复会将主目录作为单个 tar 归档流式传输。屏幕使用 pod IP 上镜像的桌面网关，因此 API、worker 和 Web 屏幕代理必须能够访问该命名空间中 pod 的端口 `6080` 以及从 `6100` 起的显示端口。pod 是临时的：已保存的工作区就是持久化边界，与远程提供商相同。Kubernetes 计算机运行时不计费，因此 `COMPUTER_MAX_ACTIVE_MS` 不适用于它们。

### 挂载主目录（可选）

默认情况下，每台计算机的主目录在启动时被复制进来，停止时被保存回去。将 `KUBERNETES_SANDBOX_HOME_CLAIM` 设为保存 API `DATA_DIR` 的 PersistentVolumeClaim，改为从其中把 `homes/<home key>` 挂载到工作区，这样主目录就永远不会被复制，如同本地 Docker 计算机。该 claim 必须位于计算机命名空间，因此实际上计算机运行在 API 的命名空间中。由于 ReadWriteOnce 卷只挂载到一个节点，必须同时提供 `KUBERNETES_SANDBOX_HOME_COLOCATE_NAMESPACE` 和 `KUBERNETES_SANDBOX_HOME_COLOCATE_LABELS`（一个 JSON 对象），它们会成为指向持有该卷的 pod 的必需 pod 亲和性，例如 `{"app":"rakazo-api"}`。该 pod 会获得 `fsGroup: 1000`。没有主目录卷的现有 pod 在停止前会继续复制其文件；其下一个新 pod 会挂载已保存的主目录。这仅适用于本地主目录存储；设置 `OBJECT_STORAGE_BUCKET` 后，主目录 claim 会被忽略，主目录照常复制。

API 和 worker 的 service account 需要在计算机命名空间中具备以下权限：

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: rakazo-computers
  namespace: rakazo-sandboxes
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["create", "get", "delete"]
  - apiGroups: [""]
    resources: ["pods/exec"]
    verbs: ["create", "get"]
```

使用 `RoleBinding` 将其绑定到 API 和 worker 运行时使用的 service account。建议使用一个 NetworkPolicy，只允许 API、worker 和 Web pod 访问计算机 pod，并拒绝它们对私有地址范围的出站访问。

## `none`

运行 API/Web，但不提供 Bot 计算机。

## 远程提供商

将 `SANDBOX_PROVIDER` 设置为以下之一：

| 值 | 凭据 | 说明 |
| --- | --- | --- |
| `e2b` | `E2B_API_KEY` | 托管 sandbox |
| `novita` | `NOVITA_API_KEY` | 先构建桌面模板；可选 `SANDBOX_TEMPLATE` |
| `daytona` | `DAYTONA_API_KEY` | 可选 `DAYTONA_API_URL`、`DAYTONA_TARGET`、`DAYTONA_SNAPSHOT` |
| `boat` | `BOAT_API_KEY` | 可选 `BOAT_API_URL`（参见 `.env.example`） |

远程路径仍需要可用的 API/worker；它们不能替代 Postgres 或 Web UI。它们需要到提供商的出站访问。对于气隙主机，优先使用预加载镜像的 `docker`，或 `none`。

运行仅在首次使用计算机工具时才启动其计算机。启用空闲休眠后，计算机在空闲 `SANDBOX_IDLE_MS` 后挂起。在运行期间计费的提供商（E2B、Daytona、Boat、CreateOS、Railway）上，即使有后台工作或打开的屏幕，计算机也会在一次连续运行达到 `COMPUTER_MAX_ACTIVE_MS`（默认 2 小时）后挂起，除非有运行正在其上执行或有用户正在控制其屏幕。`0` 表示关闭该上限。该例外仅解除运行时长上限；一旦没有任何东西持有该计算机，`SANDBOX_IDLE_MS` 后的空闲挂起仍然适用。Docker 和本机 Mac 计算机从不设上限。下次使用时它会恢复。请求接管会重新开始空闲计时器，而在运行期间不计费的提供商上，运行还会在请求后将计算机保持 30 分钟，以便用户能在同一打开的页面上响应推送。

### 计算机运行时间

计算机在提供商处每次连续运行都是 `computer_runs` 中的一行，归属于该计算机的所有者和空间。运行从计算机就绪时开始（启动时间不计入），到停止时结束。`endReason` 说明结束方式：`stopped`、`idle`、`active_limit`、`replaced`（更新、恢复或重置）、`gone`（提供商已停止或丢失该 sandbox）、`deleted`，或 `reconciled`（未观察到结束；worker 发现计算机已不再运行）。对于 `gone` 和 `reconciled`，`endedAt` 是 Doitx 注意到的时刻，因此真实结束时间可能更早。worker 还会为启动未被记录的运行中计算机开启运行记录。仍被读取为运行中的未关闭运行，就是一台可能仍在运行的计算机。删除用户或空间会保留其运行记录，但清空 `userId` 和 `spaceId`。本机 Mac 计算机不会被记录。

该表具有行级安全策略，因此请以数据库所有者身份查询。时间戳为 UTC。过去 7 天每位用户的运行小时数，仍开启的运行计算至当前时间：

```sql
WITH now_utc AS (SELECT now() AT TIME ZONE 'UTC' AS at)
SELECT r."userId", u.email,
       round(sum(extract(epoch FROM
         coalesce(r."endedAt", n.at) - greatest(r."startedAt", n.at - interval '7 days')
       )) / 3600, 1) AS hours
FROM computer_runs r
CROSS JOIN now_utc n
LEFT JOIN "user" u ON u.id = r."userId"
WHERE coalesce(r."endedAt", n.at) > n.at - interval '7 days'
GROUP BY r."userId", u.email
ORDER BY hours DESC;
```

开启超过 6 小时的运行：

```sql
SELECT r."computerId", r."userId", r."spaceId", r.kind, r."startedAt",
       round(extract(epoch FROM (now() AT TIME ZONE 'UTC') - r."startedAt") / 3600, 1) AS hours_open
FROM computer_runs r
WHERE r."endedAt" IS NULL
  AND r."startedAt" < (now() AT TIME ZONE 'UTC') - interval '6 hours'
ORDER BY r."startedAt";
```

### Linux 后台工作检查

回退的后台工作探测和取消命令需要 Bash、Python 3.7 或更高版本，以及可读/可搜索的 `/proc` 根目录。两个随附镜像都在 `infra/sandboxes/computer/Dockerfile` 和 `infra/sandboxes/desktop/Dockerfile` 中显式安装 `python3`。自定义镜像和远程镜像必须提供此能力。扫描器本身从不安装 Python。

扫描器读取标记文件描述符时不考虑持有者的 UID，包括重复、继承以及已删除但仍打开的标记。消失或拒绝访问的单独条目会被跳过，因为无法观察其链接。根目录遍历失败、意外的文件系统错误或缺少 Python 能力都会使检查结果变为未知。此类失败不会授权基于部分扫描器输出进行标记清理或发送取消信号。取消操作在向所选 PID 发送信号前，会重新检查其标记描述符。

### E2B 计算机模板

E2B 计算机从 `rakazo-computer` 模板启动：使用 E2B 的 2 vCPU、4 GB 标准桌面，而非其 8 vCPU、8 GB 版本。请在拥有 `E2B_API_KEY` 的 E2B team 中构建一次，并在 `packages/adapters/src/e2b-template.ts` 中的定义发生变化时再次构建：

```bash
E2B_API_KEY=<deployment key> pnpm sandbox:e2b-template
```

在该模板存在之前，新计算机使用标准桌面模板。现有计算机会保持创建时的大小，直到被替换。

### Novita 计算机模板

在 API 和 worker 上同时设置 `SANDBOX_PROVIDER=novita` 和 `NOVITA_API_KEY`。在拥有该密钥的账户中构建一次桌面模板：

```bash
NOVITA_API_KEY=<deployment-key> pnpm sandbox:novita-template
```

`rakazo-computer` 模板使用 Novita 的 2 vCPU、4 GB 桌面镜像。该提供商要求使用此模板，不会回退到更大的标准桌面。若要使用另一个桌面模板，请在构建时和两个服务上都把 `SANDBOX_TEMPLATE` 设为相同的名称。模板定义变化时请重建；现有计算机会保留其原始模板和资源。

计算机在空闲超时和停止时暂停，保留文件、浏览器配置文件和运行中进程的内存。重新连接会恢复同一台计算机。销毁会在不恢复的情况下删除它。停止操作会重试暂停请求并检查远程状态。命令取消和截止时间会重试终止；如果无法确认终止，适配器会尝试暂停计算机，并报告该命令可能仍处于挂起状态。未确认的命令停止还会在共享数据库中将该计算机关入隔离，因此 API 心跳、worker 作业和重启都无法悄悄恢复它。使用现有的 Recover 或 Reset 操作从已保存的工作替换它；暂停的客户机在该显式操作之前会一直保留。正常的读取和心跳不会恢复已暂停的 Novita 计算机。服务中断可能同时阻止这两种操作；配置的空闲超时仍是最终的自动暂停边界。此恢复不会删除已保存的计算机。暂停的存储仍需遵守 Novita 的存储计费和保留条款。该提供商使用共享的 Linux 桌面运行时来处理屏幕、接管、终端和可移植工作区传输。

缺少密钥会禁用计算机，但不会阻止启动。密钥存在但无效、模板缺失或配额失败会在计算机启动时暴露；认证或网络错误不会授权替换现有计算机。

### Boat 计算机快照

Boat 计算机从名为 `rakazo-computer-<hash>` 的快照启动，该快照已安装桌面工具。哈希遵循 `packages/adapters/src/boat-sandbox.ts` 中的设置，因此更改它会产生新名称，现有计算机会保留其启动时所用的快照。

无需设置：当当前设置的快照缺失时，API 或 worker 会记录 `sandbox.base_image`，其中 `outcome: "missing"`，并从未包含账户环境和 Bot 数据的新 sandbox 在后台构建一次，然后删除构建用的 sandbox。在它就绪之前，新计算机会自行安装工具。要在第一台计算机之前构建它，请在拥有 `BOAT_API_KEY` 的 Boat 账户中执行：

```bash
BOAT_API_KEY=<deployment key> pnpm sandbox:boat-snapshot
```

## 验证提供商更改

更改提供商或密钥后（在包含 `docker-compose.images.yml` 和 `.env` 的发布镜像 drop 目录中）：

```bash
docker compose --env-file .env -f docker-compose.images.yml up -d
curl -fsS http://127.0.0.1:3100/internal/health
```

确认 `sandbox` 等于预期的提供商（`e2b`、`novita`、`daytona` 或 `boat`）。仅凭 HTTP 200 不能验证远程提供商：缺少 API 密钥会回退到 `sandbox: "none"`。密钥存在但无效时仍会报告所选提供商。打开 Bot 的计算机以验证预配和桌面访问。
