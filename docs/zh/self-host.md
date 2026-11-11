# 自托管 Doitx

登录后的产品是一个长期运行的 API、一个 Graphile Worker、Postgres，以及一个计算机提供商（Docker supervisor、E2B、Daytona、CreateOS 或 Boat）。它不是静态站点。`apps/www` 中的营销站点可以单独托管。

## 本地（源码检出）

与 README 快速开始相同：从 `.env.example` 复制 `.env`，运行 `pnpm sandbox:build`、`pnpm dev`，然后打开它打印的 URL（默认 [http://127.0.0.1:5173](http://127.0.0.1:5173)，或 `http://localhost:5173` —— 两个回环主机都受信任）。Electron：在该技术栈运行期间执行 `pnpm --filter @rakazo/desktop dev`，并用该地址选择 **Existing instance**。桌面应用的 **This computer** 选项则改用 Docker Compose 自行安装并运行已发布的镜像（参见[已发布镜像](#published-images-no-checkout)），默认使用端口 45173，以便与 `pnpm dev` 并行运行。如果该端口被占用，应用会选择并记住另一个回环端口。托管的 API 会获得一个由 Docker 分配的回环端口；所有桌面流量都使用 Web 源。

在 WSL 中进行源码开发时，请将代码检出和 `data` 目录放在 Linux 文件系统中（例如 `~/rakazo`），并以普通用户身份运行 `pnpm dev`。在主机上运行的 supervisor 会将 Bot 容器的 UID/GID 与该用户匹配。如果 Docker Desktop 容器 IP 不可达，请在 `.env` 中设置 `SANDBOX_CONTROL_VIA_LOOPBACK=true`；这会在一个随机的回环端口上发布受令牌保护的控制服务。对于由 Compose 托管的 supervisor，请保持此项未设置。

Compose Bot 主目录仅使用 Docker 卷语义挂载应用程序卷中各自对应的子目录。Docker 内部卷路径绝不会用作主机绑定挂载。

<a id="published-images-no-checkout"></a>

## 已发布镜像（无需检出）

将 Postgres 和 `ghcr.io/iishows/doitx/app` 拉取到任意空文件夹。无需克隆或构建镜像。
需要 Docker Engine 26+（Bot 主目录卷子路径需要 API 1.45+）、Compose 插件、curl 和 OpenSSL。

```bash
mkdir -p rakazo && cd rakazo &&
curl -fsSLO https://raw.githubusercontent.com/iishows/doitx/main/infra/compose/install-images.sh &&
bash install-images.sh
```

安装程序会下载 `docker-compose.images.yml` 和 `.env.images.example`，用随机密钥创建 `.env`，然后拉取并启动镜像。重新运行时它会保留现有的 `.env`。有关安装程序的密钥列表、不复用规则和恢复方法，请参阅[自托管密钥清单](./self-host-secrets.md)。若要在启动前自定义公共 URL、镜像标签或可选提供商，请运行 `bash install-images.sh --prepare-only`，编辑 `.env`，然后运行 `bash install-images.sh`。标志可以任意顺序组合：`--prepare-only`、`--local`。

`SANDBOX_PROVIDER` 默认为 `docker`。镜像 Compose 文件会运行一个沙箱 supervisor（来自应用镜像，仅在内网），并拉取 `ghcr.io/iishows/doitx/computer`。注册和本地 Docker 计算机无需 E2B 账户即可使用。可选远程提供商：将 `SANDBOX_PROVIDER` 设置为 `e2b`、`novita`、`daytona`、`createos` 或 `boat`，并添加相应的 API 密钥。已发布镜像的 Compose 技术栈要求为每个提供商设置 `SANDBOX_SUPERVISOR_TOKEN`；将其留空会导致 `compose up` 故障关闭。

可选：设置 `RAKAZO_DOITX_API_KEY`，或在注册后在 UI 中连接模型。
从主机进行身份验证的提供商无需密钥：对于使用 ECS 任务、IRSA 或 EC2 实例角色的 Amazon Bedrock，通过 `PI_DEFAULT_CREDENTIALS=host` 选择启用，并设置 `PI_DEFAULT_PROVIDER=amazon-bedrock`、`PI_DEFAULT_MODEL` 和 `AWS_REGION`。使用实例角色时，请保持[受限计算机出站访问](#restricted-computer-egress)开启，以免 Bot 计算机从元数据端点读取该角色的凭据。
审批在 **Settings → Approvals** 中有三种模式：**Never ask** 会执行每个操作，**Auto** 让审批模型放行符合请求的操作，**Ask** 在任何更改前询问。空间初始为 **Auto**，在审批模型可用之前，它的询问方式与 **Ask** 相同。每个人都可以在每种模式下允许或阻止单个工具和站点，空间也可以独立于账户自定义其审批。

在 **Settings → Models → Approval model** 中，每个用户可以从现有连接中选择一个模型并添加有序备份，且独立于其主模型。个人连接使用自己的凭据；托管调用遵循与聊天相同的 Doitx 额度规则。仅当检查器失败时才会尝试备份。显式询问（包括不确定的决定）仍然需要人工处理。

未选择审批模型时，部署检查器仍是默认项。对于 OpenRouter Jev，设置 `RAKAZO_AUTO_REVIEW_PROVIDER=openrouter` 和 `RAKAZO_AUTO_REVIEW_MODEL=typesafe/jev-1.14`；它会使用 `OPENROUTER_API_KEY` 和 Decisions API。通过 `RAKAZO_AUTO_REVIEW_PROVIDER=jev` 和 `TYPESAFE_API_KEY` 仍可使用 TypeSafe 直连。核心在无需任一托管服务的情况下运行。

该示例默认使用 `edge`（main 构建）。每次发布都是多架构的（`amd64` + `arm64`），因此 arm64 主机无需特殊标签。在稳定发布版本出现之前，不要假定存在 `latest`。

打开 [http://127.0.0.1:5173](http://127.0.0.1:5173)。注册绝不会授予服务器管理权限。对于公共主机，请将 TLS 放在 `:5173` 前面，并将三个公共源设置为该 HTTPS URL。

Images Compose 将 Web 绑定到回环（`127.0.0.1:5173`）。在主机上终止 TLS 并代理到该处。Vite preview 同源代理 `/api` 和 `/rpc`，因此不要暴露 `:3100`。将 `BETTER_AUTH_URL`、`WEB_ORIGIN` 和 `API_URL` 设置为同一个 HTTPS 源，并将 `RAKAZO_HOST` 设置为其主机名（例如 `app.example.com`）。

```Caddyfile
app.example.com {
	reverse_proxy 127.0.0.1:5173
}
```

在 Bot 上打开 **Agent computer**，或发送一条使用桌面的消息，以查看本地 Docker 计算机。对于栈内 Caddy 加远程 E2B 计算机，请使用[生产 Compose](#public-single-vm-deployment) 路径和 `infra/compose/Caddyfile.prod`，而不是此主机代理。

### 受限网络 / 镜像下载

如果安装程序、Compose 下载或镜像拉取被阻止，请使用[受限网络指南](./self-host-restricted-network.md)了解镜像设置和本地文件。

### 离线包（隔离网络）

当目标主机无法访问 GHCR、GitHub 或任何注册表时，改为将镜像打包为单个 tarball 交付。在拥有这些镜像（或能够构建它们）的机器上：

```bash
bash infra/compose/make-image-bundle.sh --tag v0.3.10
```

这会生成 `dist/offline-bundle/rakazo-offline-bundle-<tag>.tar.gz`：包含 `app`、`computer`、固定版本的 Postgres 和 `busybox` 镜像，以及 `install-images.sh --offline` 按相对路径解析的一组扁平文件（`docker-compose.images.yml`、`.env.images.example`、`restrict-computer-egress.sh`）。当缺少镜像或输出文件系统无法容纳该 tar 时，它会拒绝启动。`--dry-run` 打印计划而不写入，`--build` 先从代码检出构建应用和计算机镜像，而 `RAKAZO_IMAGE` / `RAKAZO_COMPUTER_IMAGE` / `POSTGRES_IMAGE` / `BUSYBOX_IMAGE` 可覆盖引用。

在目标主机上，解压、加载，然后从包目录内运行安装程序：

```bash
tar -xzf rakazo-offline-bundle-v0.3.10.tar.gz &&
cd rakazo-offline-bundle-v0.3.10 &&
docker load -i images/rakazo-images.tar &&
bash install-images.sh --offline
```

`--offline` 保留随包的 Compose 和 env 文件，跳过所有下载，并且从不拉取，因此所有镜像必须已经加载。env 示例将应用和计算机标签默认为 `edge`；包中的 `BUNDLE_ENV` 记录实际保存的标签，因此请将这些标签复制到 `.env`，否则 Compose 会查找不存在的镜像。`IMAGES.txt` 列出摘要，`SHA256SUMS` 涵盖 tarball 内容，`OFFLINE.md` 本身就是离线演练，因此目标主机无需打开仓库。

该包有意省略 `updater` 镜像：它会从 GitHub 和注册表发现并拉取新发布版本，而隔离网络的主机无法访问这些。完整演练（代理、TLS、健康检查、升级、故障排查）请参阅[中文离线指南](./self-host-offline-zh.md)。

### Bot 计算机资源上限

每个 Docker 计算机都会运行 Xvfb、一个窗口管理器，以及一个由智能体驱动的完整 Chromium，该智能体自行决定打开什么，因此它受到上限限制。这些默认值为 Docker 计算机拓扑提供了起点：

| 变量 | 默认值 | 接受值 |
| --- | --- | --- |
| `RAKAZO_COMPUTER_MEMORY` | `6g` | `6g`、`1536m`、字节数。最小 `6m`，即 Docker 自身的下限。硬性 RAM 上限。 |
| `RAKAZO_COMPUTER_SWAP` | `2g` | 一个有界大小，或 `0`/`none` 表示不给容器交换空间。在 `RAKAZO_COMPUTER_MEMORY` 之上额外添加。 |
| `RAKAZO_COMPUTER_CPUS` | `2` | 整数或小数核心数，例如 `1.5` |
| `RAKAZO_COMPUTER_PIDS_LIMIT` | `2048` | 正整数 |

将其中任一项设置为 `0`、`none` 或 `unlimited` 可移除该上限——但 `RAKAZO_COMPUTER_SWAP` 除外，它没有可移除的上限，因此必须指定一个大小（或 `0`）。格式错误的值会让 supervisor 在启动时失败并指明该变量，而不是稍后表现为 Bot 失败。

为交换区域留出真正的余量。如果没有，超出 RAM 的浏览器桌面在缺页路径上只能驱逐文件页并立即再次缺页，这会占满 Docker 磁盘并让桌面因 I/O 而停顿，而不仅仅是变慢。交换区域还必须由主机上的交换空间支持：Docker Desktop 在 `.wslconfig` 中默认 `swap=0`，因此也要在那里设置一个大小。

`install-images.sh` 会在拉取任何内容之前对这两种错误发出警告：它将 Docker 主机的 RAM 与 Compose 文件声明的内存限制进行比较，并检查主机交换区域是否确实支持非零的 `RAKAZO_COMPUTER_SWAP`——在 Linux 上读取 `/proc/meminfo` 中的 `SwapTotal`，在 Windows 上读取 `.wslconfig` 中的 `swap=`。两者都是警告而非失败，因为这些限制是上限而不是预留；如果出现警告，请调整 Docker 的内存、`RAKAZO_COMPUTER_MEMORY` 或 `RAKAZO_COMPUTER_SWAP`。

### API 与 worker 内存

聊天运行在接收消息的 API 容器中执行，而例程和其他后台运行在 worker 中执行，因此两者都持有活跃的智能体轮次。在生产 Compose 文件中，`RAKAZO_API_MEMORY_LIMIT` 和 `RAKAZO_WORKER_MEMORY_LIMIT` 为它们设置上限（Compose 大小如 `2g` 或 `3072m`，默认各为 `2g`）。在更大的主机上请调高这些值。部署时每一侧的旧容器和新容器会短暂并行运行，因此要留出两者的空间。

<a id="restricted-computer-egress"></a>

### 受限计算机出站访问

受限出站访问让 Docker 计算机可以访问公共互联网（浏览、DNS、apt、通过 SSH 的 git），但不能访问 Docker 主机、LAN，或诸如 `169.254.169.254` 之类的链路本地云元数据；在云 VM 上，后者会把实例凭据交给 Bot 运行的任何内容。

它包含两部分：

1. `SANDBOX_COMPUTER_EGRESS=restricted` 为每个计算机网络提供确定的主机网桥名称（`rakazo-c…`），而不是通用的 `br-*`。
2. 主机规则集，每个 Docker 主机应用一次：

   ```bash
   sudo bash infra/compose/restrict-computer-egress.sh
   ```

   `install-images.sh` 会下载并运行它（请求 sudo），并将结果记录在 `.env` 中。在无法安装规则的地方（macOS、Windows、Docker Desktop、rootless Docker、没有 iptables，或运行失败），它会写入 `SANDBOX_COMPUTER_EGRESS=open` 并说明原因。该脚本通过 `DOCKER-USER` 链丢弃从 `rakazo-c*` 网桥转发到所有非公共 IPv4/IPv6 目的地的流量，添加一条 `INPUT` 丢弃规则，使计算机无法向主机打开连接（对主机发起的控制和屏幕连接的已建立回复仍可流动），并安装一个 systemd oneshot，使规则在重启后恢复。`--print` 显示确切的规则而不做任何更改；`--remove` 卸载。

在第一个受限计算机启动之前，supervisor 会检查主机是否丢弃来自 `rakazo-c*` 网桥的连接。如果没有规则集，计算机会启动失败并报错指明该脚本，而不是不受限制地运行；请运行该脚本（无需重启），或设置 `SANDBOX_COMPUTER_EGRESS=open` 并重新创建 supervisor。

当 `SANDBOX_COMPUTER_EGRESS` 未设置时，Compose 文件使用 `auto`：supervisor 运行相同的检查，如果规则集已就位则使用受限出站访问，否则使用开放出站访问并在其日志中给出警告。它会保留第一个完成的答案；无法完成的检查（Docker 错误或超时）会使该计算机的启动失败，并在下一台计算机上再次运行。因此，在规则集存在之前进行的安装会在升级后继续工作。安装规则集后，请重新创建 supervisor，或设置 `restricted` 以便在规则缺失时一律拒绝计算机。主机运行的 supervisor（`pnpm dev`）和桌面应用的 **This computer** 栈默认为开放：Docker Desktop 将其网桥保存在主机规则无法触及的 VM 中。

屏幕流式传输不受影响：supervisor 和 Web 代理会加入每台计算机的网桥，而规则集在任何丢弃之前豁免入接口和出接口均为 `rakazo-c*` 的流量（在 `br_netfilter` 将桥接帧送入 `FORWARD` 的主机上，该豁免至关重要）。规则匹配接口名称而不是子网，因此计算机的创建/删除循环无需维护防火墙；删除计算机只是将其流量从匹配中移除，别无其他。在出站访问开放期间配置的计算机会在其下次配置时被替换——在未命名网桥上恢复它会绕过限制。

计算机通过 Docker 的内嵌 DNS 解析名称，该 DNS 会将每次查询从计算机网络内部转发到主机的解析器。当主机的解析器具有私有地址（如云 VPC 解析器或 LAN 路由器）时，规则集也会丢弃该转发，导致每次查询都超时，而按 IP 的连接仍然有效。将 `SANDBOX_COMPUTER_DNS` 设置为公共解析器（逗号分隔的 IP 地址，例如 `1.1.1.1,1.0.0.1`）并重新创建 supervisor：Docker 随后会将计算机的查询转发到那里，每台计算机会在下次配置时采用这些服务器。

如果计算机必须访问 LAN 服务、内部代理或绑定到主机的端点，请设置 `SANDBOX_COMPUTER_EGRESS=open`，重新创建 supervisor，并运行 `sudo bash infra/compose/restrict-computer-egress.sh --remove`。仅设置该标志并不会卸载主机规则，这些规则会继续匹配仍然命名的 `rakazo-c*` 网桥，直到被移除。

### 每个 Bot 的浏览器代理

Bot 可以通过在 Bot 设置中设置的上游代理进行浏览，因此一个安装中的多个 Bot（或同一共享计算机上的多个 Bot）各自从不同地址离开。该设置仅覆盖 Bot 的浏览器——其 shell、`git` 和包管理器不受影响。

Chromium 自身无法发送代理凭据，因此每个 Bot 的启动都会在计算机内启动一个小型回环中继，由它持有凭据并以 HTTP `CONNECT` 或 SOCKS5 与真实代理通信。支持的方案有 `http`、`https`、`socks5` 和 `socks5h`（`socks5` 在计算机本地解析名称，`socks5h` 在代理处解析）。凭据会静态加密，且绝不会返回给客户端；将密码留空会保留已存储的密码。代理在浏览器启动时按 Bot 应用，使用从该 Bot 的浏览器配置文件派生的中继自身端口，因此共享同一计算机的 Bot 绝不会共享中继或出站访问。

两条运维注意事项：

- **出站访问限制。** 计算机必须能够访问代理。公共代理地址已经通过受限出站规则；位于私有地址（LAN、VPC 或 Docker 主机）的代理需要 `SANDBOX_COMPUTER_EGRESS=open`，因为规则集恰好会丢弃这类流量。
- **失败不会静默。** 如果无法访问配置的代理，或其存储的凭据无法解密，浏览器启动会报错失败，而不是直接连接——回退会暴露此主机的真实地址，而这正是该设置要防止的事情。清除代理设置即可再次直接浏览。

该规则集要求使用带有 iptables 后端的 Linux Docker Engine；不支持 Docker Desktop、rootless Docker 和 `firewall-backend: nftables`。`SANDBOX_SCREEN_NETWORK=internal` 拓扑共享一个网络而不是每 Bot 网桥，因此该模式在此不适用。

当 Docker Engine 在 Linux VM 中运行（例如 macOS 上的 OrbStack）时，规则属于该 VM，而主机上的 `sudo` 无法触及。请改从 VM 主机网络上的容器应用这些规则，并让它持续运行：VM 不会持久化规则，因此循环会在重启后重新放回规则。安装程序在 macOS 上不会下载该脚本。在包含该栈 `.env` 的目录中：

```bash
curl -fsSLO https://raw.githubusercontent.com/iishows/doitx/main/infra/compose/restrict-computer-egress.sh
```

将以下内容保存为该脚本旁边的 `egress.yml`，并用 `docker compose -f egress.yml up -d` 启动它。该名称使其位于自己的 Compose 项目中：

```yaml
name: rakazo-computer-egress
services:
  computer-egress:
    image: alpine:3
    network_mode: host
    cap_add: [NET_ADMIN, NET_RAW]
    restart: unless-stopped
    volumes:
      - ./restrict-computer-egress.sh:/restrict-computer-egress.sh:ro
    command: >-
      sh -c "apk add --no-cache bash iptables ip6tables &&
      while true; do bash /restrict-computer-egress.sh --apply; sleep 60; done"
```

然后在 `.env` 中将 `SANDBOX_COMPUTER_EGRESS` 从 `open` 改为 `restricted`，并重新创建 supervisor。尚未以这种方式测试 Docker Desktop。

## Docker Compose（单机）

1. 将 `.env.example` 复制为 `.env`，为 `POSTGRES_PASSWORD` 和 `POSTGRES_APP_PASSWORD` 分别设置值（各用 `openssl rand -hex 16`），并将 `BETTER_AUTH_SECRET`、`ENCRYPTION_KEY` 和 `SCREEN_PROXY_SECRET` 设为各自独立的长随机字符串（32 个字符以上；`ENCRYPTION_KEY` 用 64 位十六进制）。Docker 沙箱还需要专用的 `SANDBOX_SUPERVISOR_TOKEN`。保留已有的 `ENCRYPTION_KEY` 值，以便已存储的凭据仍可解密。
2. 设置 `OPENROUTER_API_KEY`（如需使用 Plugins，再设置 `COMPOSIO_API_KEY`）。
3. 构建计算机镜像：`pnpm sandbox:build`（Compose 也会通过 `computer` 服务构建它）。
4. `docker compose --env-file .env -f infra/compose/docker-compose.yml up --build`
5. 打开 Web 源（默认 `http://127.0.0.1:5173`）。注册永远不会授予服务器管理权限。

在 Windows 上，如果带有 `core.autocrlf=true` 的旧克隆导致计算机面板在启动时卡住（沙箱日志中出现 `bash\r`）：在干净的工作区中，设置 `git config core.autocrlf false`，运行 `git add --renormalize . && git checkout -- .`，然后用 `pnpm sandbox:build` 重新构建。

Compose 运行 Postgres、沙箱监督程序（Docker socket）、API、worker，以及 Web 应用的 Vite 预览。Bot 计算机是位于按 Bot 划分的独立网络上的同级容器（`rakazo/computer:local`）；只有监督程序和屏幕代理会加入每个网络。API 进程不会获得不受限制的 Docker socket；生命周期由监督程序掌管。

Postgres 仅保留在 Compose 网络上（不在主机上发布），与 images compose 一致。凭据来自 `.env`（`POSTGRES_PASSWORD` 为必填）。优先使用 URI 安全的值（`openssl rand -hex 16`）；`@ : / ? # %` 等字符会破坏 Compose 内插后的 `DATABASE_URL`。官方 Postgres 镜像仅在首次卷初始化时设置用户、密码和数据库，因此已有的数据库卷会保留其原始身份：将这些值保留在 `.env` 中，或用 `ALTER ROLE` / 重命名就地更改。仅在备份之后（或数据可丢弃时）重建卷；`docker compose down -v` 会删除所有 Postgres 状态。对于主机侧客户端（`pnpm db:migrate`、GUI 工具），添加 `infra/compose/docker-compose.postgres-host.yml`，让 Postgres 发布到回环地址 `127.0.0.1:5433`，或者使用 `docker compose --env-file .env -f infra/compose/docker-compose.yml exec postgres sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'`。不要在公共接口上发布 Postgres。

<a id="database-roles"></a>

### 数据库角色

Doitx 使用两个 Postgres 登录账号：

- 所有者（`POSTGRES_USER`，在 Compose 外为 `DATABASE_MIGRATION_URL`）运行迁移并拥有这些表。
- 应用登录账号（`rakazo_app`，配合 `POSTGRES_APP_PASSWORD`，或 `DATABASE_URL`）不是超级用户，无法绕过行级安全，无法创建对象，只能读写应用表。

`pnpm db:migrate`（在容器中为其预构建形式 `pnpm --filter @rakazo/api db:deploy`，由一次性 `migrate` 容器在 API 启动前运行）以所有者身份应用迁移和作业队列 schema。只有该容器获得所有者登录账号，因此运行在 API 或 worker 中的代码无法找到绕过行级安全的账号。随后它创建 `DATABASE_URL` 中指定的应用登录账号，或更新其密码，并授予其 `rakazo_app` 角色。当迁移以没有 `CREATEROLE` 的角色运行（如某些托管 Postgres）时，请自行创建该登录账号并执行 `GRANT rakazo_app TO <login>`。

消息、事件、线程、记忆、工件、密钥、模型和语音凭据、技能、Bot、运行、任务、例程、连接、MCP 服务器与登录、计算机、看板和工单、消息身份与发件箱、外部会话、引导消息、用量、草稿项和审批规则均具有行级安全。每个已登录请求只能看到其所在空间的行，以及用户自己的账户级凭据。未包含空间过滤条件的查询不会返回其他空间的任何内容。代表某次运行、例程、计算机、技能、线程或云端智能体执行的后台作业，以该行的空间和用户身份运行，因此智能体工具也获得同样的兜底保护。安全事件仅在系统作用域内写入和读取。对账程序、队列清扫、消息发件箱排空和 webhook 在具名系统作用域中运行（`packages/db` 中的 `runAsSystem`）。作业队列的表（`graphile_worker`）保存作业元数据而非空间内容：graphile-worker 为其开启行级安全，`pnpm db:migrate` 添加一项策略，让应用登录账号可访问所有行。

仅设置 `DATABASE_URL` 时，迁移和应用共用一个登录账号。一切仍可运行，但 `pnpm db:migrate`、API 和 worker 会警告行级安全未强制执行。要解决此问题，将 `DATABASE_MIGRATION_URL` 设所有者，将 `DATABASE_URL` 设为一个新登录账号。

以所有者身份运行 `pg_dump`。应用登录账号只能导出它被允许看到的行。

Docker 监督程序不单独发布为镜像，也不在主机上暴露。它从应用镜像运行，留在内部 Compose 网络上，并持有 Docker socket，因为访问它等同于控制 Docker 主机。Docker 沙箱需要 `SANDBOX_SUPERVISOR_TOKEN`（API、worker、监督程序）。`SCREEN_PROXY_SECRET` 用于签署浏览器屏幕能力（API 和 Web 代理）。两者都应区别于 `BETTER_AUTH_SECRET`。

新凭据使用带版本号的 AES-GCM，具有每条记录的盐和绑定到行的 AAD。旧密文仍可读取。

在 VPS 上，在 `:5173` 前放置 TLS（或在代理后提供 Web 构建），并设置：

```env
BETTER_AUTH_URL=https://app.example.com
WEB_ORIGIN=https://app.example.com
API_URL=https://app.example.com
```

Cookie 和 CORS 遵循这些源。`SIGNUPS_ENABLED` 和 `SIGNUP_ALLOWLIST` 每次启动都取自运维者的环境。空的允许列表会清除任何旧的已存储列表；注册顺序永远不会授予权限。

当注册允许列表非空且配置了 SMTP 时，用户（包括已有账户）必须验证邮箱才能登录。没有允许列表时，验证不会阻塞：密码注册会立即登录，并收到一个仅将地址标记为已验证的验证链接。

SMTP 还启用了通过六位邮件验证码登录，该验证码在十分钟后过期，允许三次尝试。验证码可以创建账户，因此它遵循与密码注册相同的注册和允许列表规则。使用验证码登录已有的未验证账户会移除该账户的密码、SSO 链接和会话，因为没有任何东西能证明它们属于该邮箱的所有者。这可以阻止注册他人地址的人继续保有访问权限。

允许列表注册要求邮箱验证和邮件投递，包括首个账户。没有邮件投递时，请使用下文描述的服务器端账户引导；公开注册永远不会将地址标记为已验证或授予服务器权限。

服务器配置属于运维者的环境。应用账户无法更改注册策略、服务器集成凭据或部署更新，也无法读取部署安全日志。`SIGNUPS_ENABLED` 和 `SIGNUP_ALLOWLIST` 每次启动都是权威的；空的允许列表会清除任何旧的已存储策略。没有应用管理员角色、首用户特权或 `ADMINS` 列表。工作区所有者只管理自己的工作区。

对于无邮件的安装，先在 `.env` 中设置 `SIGNUPS_ENABLED=false`，然后启动整套服务。私下创建预期账户（密码保留在 shell 环境中）：

```bash
read -r -p "Account email: " OWNER_EMAIL
read -r -s -p "Account password (at least 16 characters): " OWNER_PASSWORD
export OWNER_EMAIL OWNER_PASSWORD
docker compose --env-file .env -f docker-compose.images.yml exec -e OWNER_EMAIL -e OWNER_PASSWORD api node dist/cli/bootstrap-owner.js
unset OWNER_EMAIL OWNER_PASSWORD
```

对于源码检出，改用 `-f infra/compose/docker-compose.yml`。这会创建一个普通的已验证账户和个人工作区，不授予任何服务器权限。对于已有的未验证账户，其密码必须匹配才能通过验证；已有的已验证账户保持不变。将无邮件的安装保持在可信的本地网络上。

### 可选 OpenID Connect SSO

SSO 可与自托管或托管的 OpenID Connect 提供商配合使用。保持其设置未配置即可仅使用密码认证。在 API 上同时配置全部三个凭据：

```env
OIDC_ISSUER=https://identity.example.com
OIDC_CLIENT_ID=replace-with-client-id
OIDC_CLIENT_SECRET=replace-with-client-secret
OIDC_NAME=SSO
OIDC_SCOPES=openid email profile
AUTH_PASSWORD_ENABLED=true
OIDC_ALLOW_SIGNUP_BYPASS=false
```

Issuer 必须为 HTTPS，并与发现文档的 issuer 完全匹配。Doitx 加载 `<issuer>/.well-known/openid-configuration`，使用发现 JWKS 对 ID 令牌进行校验，包含 issuer、audience 和 nonce 检查，并使用带 PKCE 的授权码。附加作用域可用空格或逗号分隔；始终请求 `openid email profile`。`OIDC_NAME` 是按钮标签，默认“SSO”。密钥保留在 API 上；Compose 会清除 worker 的 OIDC 凭据。能力端点仅暴露标签、发现可用性和已启用的认证方法。

在提供商处注册此重定向 URI（使用你的公共 `BETTER_AUTH_URL` 源）：

```text
https://app.example.com/api/auth/callback/oidc
```

Web、Electron 和移动端使用相同的提供商重定向 URI。Electron 在共享应用会话的沙箱化应用内弹窗中完成 SSO，然后返回主窗口。移动端在 API 上完成回调，然后通过 Better Auth 的 Expo 授权代理和原生认证浏览器会话返回 `rakazo://sign-in`（或用于关联和重新认证的 `rakazo://account`）。`rakazo` 应用 scheme 受认证服务器信任；切勿在移动应用中注册客户端密钥。移动端使用 SecureStore 存储生成的会话，与密码登录相同。原生构建需要 Expo WebBrowser 模块。

仅当 `email_verified` 为布尔值 `true` 时，提供商邮箱才算已验证。为 false 或缺失的声明保持未验证，包括后续登录。登录永远不会通过邮箱关联账户。如果邮箱属于另一个账户，请登录该已有账户并在账户设置中选择 **Link SSO**。关联需要已认证的会话、已验证的提供商邮箱和匹配的邮箱地址。此后由 issuer 和提供商 subject 标识关联账户。更改 issuer 不会复用旧身份。旧 issuer 的链接仍会存储，但不计入与当前提供商的关联，因此 **Link SSO** 再次可用。从已存在的已登录账户关联新身份；已认证会话、已验证邮箱和匹配邮箱检查仍然适用。恢复旧 issuer 会使其已有链接重新可用。

普通 SSO 登录和关联可能复用身份提供商的现有会话。它们不会为账户删除授予全新的认证证明。账户设置中显式的重新认证流程会请求 `prompt=login` 和 `max_age=0`，将回调绑定到同一关联的 issuer 和 subject，并要求发起会话保持有效。只有该回调会为产生的会话授予证明，该证明在提供商认证后五分钟过期（回调延迟不会延长它）。其已验证的 ID 令牌必须包含与该请求一致的 `auth_time`（允许 60 秒时钟偏差）且不超过五分钟。缺失、过期或无效的声明会直接失败。OAuth 回调是一次性的，包括并发请求。密码验证和邮件删除验证码仍然可用。通过账户设置或受 CSRF 保护的 `POST /api/auth/delete-user` 端点提交删除验证码；GET 删除回调已禁用。

SSO 注册在创建账户之前遵循关闭注册和部署允许列表。允许列表中的提供商邮箱必须已验证；注册永远不绕过邮箱证明。`OIDC_ALLOW_SIGNUP_BYPASS=true` 显式接纳 IdP 身份，而不应用允许列表或其邮箱验证准入要求。仅当 IdP 控制谁可加入此部署时才启用它。它**不会**重新开放已关闭的注册，也不会改变邮箱验证声明或关联规则。已获准的现有账户可在注册关闭时登录。

仅 SSO 运行时设置 `AUTH_PASSWORD_ENABLED=false`。密码登录、注册、密码重置和密码变更端点在服务器端被禁用，登录表单被隐藏。此模式下除非所有 OIDC 凭据都已配置，否则 API 拒绝启动。当发现临时不可用时它仍可启动：提供商保持注册状态，登录返回临时错误，后台重试会恢复而无需重启。发现为首次使用时惰性执行，后台刷新，失败时退避最多一分钟。可用性反映发现状态，并不保证提供商令牌端点当前可达。

账户删除为密码用户保留现有的密码确认。没有密码的用户可在五分钟内通过显式的提供商重新认证后删除；**Sign in again** 会启动绑定到已登录账户的全新提供商往返。选择不同身份无法在该流程中确认删除或创建另一个账户。仅有过期或借用的会话无法授权删除。配置了事务性邮件后，**Send deletion code** 会向账户邮箱发送一次性验证码，有效期十分钟。在账户设置中输入它以确认删除。邮件验证码请求有速率限制；无效、过期或账户不匹配的验证码会失败。删除无需创建密码。

### 移动端推送通知

API 和 worker 通过 Expo 的推送服务发送 iOS 和 Android 通知。如果 Expo 项目启用了[推送通知增强安全](https://docs.expo.dev/push-notifications/sending-notifications/#additional-security)，则每次发送都需要访问令牌；没有令牌时 Expo 会拒绝所有推送。在拥有该项目的 Expo 账户中创建访问令牌，并为两个服务都设置它：

```env
EXPO_ACCESS_TOKEN=replace-with-your-expo-access-token
```

增强安全关闭时保持未设置。缺失或已撤销的令牌会使推送失败，并返回一个指明 `EXPO_ACCESS_TOKEN` 的错误；令牌本身永远不会被记录。

### 验证和密码找回邮件

已登录用户的密码更改无需邮件配置。只有在有事务性邮件提供商可用时，登录页面才会出现忘记密码找回。Doitx 使用提供商中立的契约，带有 Resend API 和 SMTP 适配器。模板通过 React Email 在本地渲染为 HTML 和纯文本，与发送提供商无关。

要使用 Resend HTTP API，请验证发件域并创建一个仅限该域的仅发送 API 密钥，然后配置：

```env
EMAIL_PROVIDER=resend
EMAIL_API_KEY=replace-with-sending-api-key
EMAIL_FROM=Doitx <hello@mail.example.com>
```

在提供商的域设置中禁用账户邮件的点击和打开跟踪。Resend 投递有十秒截止时间，并使用相同的幂等键进行有界重试，包括响应丢失时。错误会省略提供商响应正文和凭据。

对于 Amazon SES 或其他 SMTP 服务器，使用：

```env
SMTP_URL=smtps://smtp-user:replace-with-password@smtp.example.com:465
EMAIL_FROM=Doitx <no-reply@example.com>
```

设置 `EMAIL_REPLY_TO` 可将回复发送到 `EMAIL_FROM` 以外的位置。

`EMAIL_PROVIDER=smtp` 是可选的：未指定提供商时，已有的 `SMTP_URL` 会继续选择 SMTP。`EMAIL_PROVIDER=none` 禁用外部发送。显式的提供商设置优先于旧的 `SMTP_URL`；不完整或未知的提供商配置会在启动时失败。

Resend 也支持 SMTP：使用 `smtp.resend.com`、用户名 `resend`，并将 API 密钥作为密码。对于 Amazon SES，使用区域 SMTP 端点和 SES SMTP 凭据；它们不同于普通 AWS 访问密钥。在测试投递前与提供商验证发件人/域。将凭据保存在 `.env` 中，绝不要放在受跟踪的文件中。`smtps://` 使用隐式 TLS；`smtp://` 也受支持，但要求 STARTTLS。Doitx 会拒绝禁用 TLS 或证书验证的配置。

本地源码开发可以改用离线邮件模拟器。它在不联系提供商的情况下捕获邮件：

```env
EMAIL_EMULATOR=true
```

模拟器在 `NODE_ENV=production` 时被强制禁用，并要求 API 绑定到回环主机。在 `NODE_ENV=development` 中，捕获的消息可从 `http://127.0.0.1:3100/api/dev/emails` 获取（禁用缓存）；API 仅记录投递元数据，从不记录重置令牌。收件箱路由不会在 test、staging 或 production 中注册。

### 密码策略

新密码（注册、重置和更改）必须为 8 到 128 个字符，没有组合规则。可选地拒绝出现在已知泄露中的新密码：

```env
AUTH_BREACHED_PASSWORD_CHECK_ENABLED=true
```

这会查询 Have I Been Pwned 范围 API，仅发送密码 SHA-1 哈希的前五个字符。默认关闭，因此服务器不会发起外部请求。如果服务不可达或耗时超过三秒，密码会被接受，并记录失败。

### 计费

除非同时设置 `STRIPE_SECRET_KEY` 和 `STRIPE_WEBHOOK_SECRET`（见 `.env.example`），否则计费保持关闭。启用计费后会提供按月自有密钥计划（用于个人模型连接）或以美元计价的月度模型额度：$10、$20、$50、$100、$200 或 $500。一次性充值使用相同金额。月度额度在其服务期结束时过期；一次性充值不会过期。托管计算机包含在两条路径中，月度额度包含自有密钥计划。

`@rakazo/contracts` 中的 `BYOK_MONTHLY_PRICE_CENTS` 设置自有密钥计划的价格；`null` 使其免费，并在当期结束时终止付费自有密钥订阅。运行在服务器上检查访问权限，因此已失效组织的 Bot 和例程会在其订阅前停止。

通过现有模型连接设置配置托管的默认模型。默认 OpenRouter 模型为 Luna 6；客户可选择另一个可用模型，其用量按模型成本扣除。在额度模式下，配置的托管提供商使用 Doitx 的密钥，即使已保存该提供商的个人密钥。切回 BYOK 会恢复该连接。到其他提供商的个人连接继续使用其自有密钥，绝不会扣减 Doitx 额度。托管调用在开始前以原子方式预留成本上限估算，然后结算为报告的或目录定价的用量。未知用量会保留其预留以供对账。

`STRIPE_PRICE_ID` 是可选的，仅用于显示旧版席位价格。现有的实时席位订阅保留其访问权限和计费门户。升级立即收取按比例差额，并将收取的金额加入额度余额；支付失败则计划保持不变。降级会降低下次续费金额，不立即收费也不移除额度。额度购买要求已结算的付款；webhook 重放不会重复添加额度，退款会减少剩余账户余额。

月度资金在充值之前使用。每笔授予都有一个可审计的分配批次，因此预留会在续期期间保留其资金来源：未使用的月度预留额度在释放时过期，而已购买的充值仍然可用。按比例升级共享原始期结束时间。过期会产生财务日记账差额，并在余额读取、预留、结算和后台恢复之前运行。未分类的旧余额作为不过期资金保留。

Postgres 掌管记账。`billing_audit_events` 是由数据库触发器强制执行的仅追加日记账；额度分录、用量行和余额是投影。每次托管调用在预留、持久化提供商回执、用量和结算之间共享同一个 `callId`。保留提供商生成 ID、令牌桶、成本来源和定价快照。用量和结算一起提交，日记账/用量历史在清除消息或删除 Bot 或组织后仍然存在。更正会追加证据，而不是重写先前的日记账事件。迁移运行时，现有行会获得显式的基线事件；更早的历史无法恢复。

API/worker 对账程序会恢复已保存的回执，并在配置的提供商支持时，为中断的调用和估算获取权威的生成成本。重试使用租约和幂等结算。无法验证的调用会保留其预留，并在六次尝试后变为 `needs_review`。每小时的分页审计会从日记账重建漂移的余额缓存并记录修复。使用共享的 call ID 调查 `Model credit hold requires review` 日志；不要将缺失的提供商证据变成零成本结算。

OpenRouter 推理请求在 `user`、`HTTP-Referer`（`https://doitx.ai`）和 `X-OpenRouter-Title`（`Doitx`）中包含正常的 Doitx 用户 ID。这些值仅发送到 OpenRouter 的 HTTPS 推理端点，绝不会发送到兼容的自定义主机。恢复使用现有的已配置部署凭据；不需要 Redis 或外部记账服务。

适配器固定 Stripe API `2026-09-30.endive`。为你自己的账户配置 webhook 目标，使用同一 API 版本的快照载荷。订阅所有 `customer.subscription` 事件、`customer.deleted`、`checkout.session.completed`、`checkout.session.async_payment_succeeded`、`invoice.paid`、`invoice.payment_failed`、`charge.refunded`、`charge.dispute.created` 和 `charge.dispute.closed`。额度 Checkout 将支付方式限制为卡。新订阅显式保留经典计费模式，因此 API 升级不会改变发票/按比例计费行为。

对于本地测试，将 Stripe 测试事件转发到 `/api/v1/billing/webhook`。使用 `stripe listen` 的签名密钥和测试 API 凭据；将它们保存在被忽略的环境文件中。

### Pi 追踪

在 worker 上设置 `OTEL_EXPORTER_OTLP_ENDPOINT` 以启用可选的 OpenTelemetry 追踪（例如 `http://otel-collector:4318`）。OTLP/HTTP 导出器会在基础端点后追加 `/v1/traces`，并遵循标准的 `OTEL_EXPORTER_OTLP_HEADERS`（逗号分隔的 `key=value` 对）和 `OTEL_SERVICE_NAME`（默认 `rakazo-worker`）。Compose worker 从 `.env` 读取这些设置。端点为空或未设置时，不会加载或初始化任何追踪 SDK。运行 Doitx 不需要收集器或托管服务。

追踪包含一个 `rakazo.agent.run` 跨度，带有 `pi.ai.request` 模型调用跨度和 `pi.agent.tool` 步骤，包括持续时间、令牌用量、已知时的成本和成功/错误状态。当运行属于某个例程时，每个跨度携带 `rakazo.bot.id`、`rakazo.run.id` 和 `rakazo.routine.id`。辅助模型调用继承相同的关联。Pi 0.87.1 通过其较新的 harness 暴露内置遥测；Doitx 的旧版 Agent 适配器通过相同的 Pi 遥测契约映射其模型和工具生命周期。

提示词、响应、工具参数和工具结果默认被排除。`OTEL_CAPTURE_CONTENT=true` 会包含它们：仅在受信任的收集器和适当的保留/访问控制下启用，因为该内容可能包含密钥或个人数据。未知属性以及异常消息/堆栈保持排除。导出是批量的、尽力而为的，并在 worker 关闭时刷新；收集器故障不会使运行失败。

### 产品分析

产品分析默认关闭。要启用 PostHog 适配器，在 API 和 worker 上设置 `ANALYTICS_PROVIDER=posthog`、`ANALYTICS_KEY` 为项目捕获令牌，`ANALYTICS_HOST` 为 HTTPS 摄取主机（默认 `https://us.i.posthog.com`）。还要将 `ANALYTICS_PSEUDONYM_SECRET` 设为仅服务器端的随机值（`openssl rand -hex 32`），在 API 和 worker 上相同。轮换公共捕获令牌时保留它，以保持用户和事件身份稳定。切勿将此密钥发送到浏览器或收集器。设置 `ANALYTICS_PROVIDER=none` 可禁用它。公共网站使用其单独的 `PUBLIC_POSTHOG_KEY` 配置。

后端发送账户创建、会话创建、固定屏幕名称、消息计数以及运行开始/结果。运行事件包含共享的触发枚举；分析不会读取或分类错误文本。用户标识符使用仅服务器端密钥进行假名化。不会导出任何姓名、邮箱、提示词、响应、消息文本、DOM、URL、搜索参数、文档内容、请求元数据或原始错误。没有浏览器或移动端分析 SDK、自动捕获、会话回放或第三方脚本。Web、Electron 和移动端仅向已认证的 API 发送固定的屏幕/界面枚举；生命周期事件来自共享后端。这跨客户端工作，而不让收集器访问其内容。本地和自托管安装在配置后端之前保持关闭。

投递是尽力而为的：内存有界，请求会超时，关闭时会刷新待处理事件。分析失败不会导致产品操作失败。这不是持久审计追踪，启用前的事件不会被回填。

### 日志

后端服务将结构化日志写入 stdout。`LOG_LEVEL` 为 `debug`、`info`、`warn`、`error` 或 `off`（默认 `info`）。生产默认 `LOG_FORMAT=json`；开发默认 pretty，除非你设置 `json` 或 `pretty`。

Axiom 是可选的。同时设置 `AXIOM_TOKEN` 和 `AXIOM_DATASET` 以摄取到一个共享数据集。服务设置 `service.name`（`rakazo-api`、`rakazo-worker`、`rakazo-sandbox-supervisor`、`rakazo-updater`）。部分 Axiom 配置会记录一次警告并保持关闭。`AXIOM_EDGE` 是区域主机名；`AXIOM_EDGE_URL` 必须为 https，且两者都设置时优先。

计算机用量在多个边界记录：

- `run.computer`：每次执行尝试一条记录，包括从不请求计算机的运行（`reason=none`）。否则 `reason` 为 `tool`、`takeover` 或 `script`；`tool` 是允许列表中的内置名称，`trigger` 标识用户、例程或其他运行来源。统计运行时对 `run.id` 去重，因为一次运行可能有多次尝试。
- `computer.requested`：尝试中首次使用计算机，带有其原因、工具和触发器。
- `computer.provisioned`：设置完成，带有 `operation=create`、`resume` 或 `reuse` 以及 `durationMs`。设置请求可以复用已在运行的计算机而不消耗一次启动。
- `sandbox.start`：Boat 实际的 `create`、`resume` 和 `recover` 请求，包括准备期间或提供商使计算机过期后的启动。`outcome=accepted` 表示提供商接受了请求，而非后续所有设置都成功。`rate_limited` 和 `failed` 是单独的结果。统计启动用量时计入已接受的 create/resume；恢复单独显示，因为其配额处理取决于提供商。
- `computer.suspended`：成功的空闲或活跃上限挂起，带有活跃时长。

这些记录使用固定元数据、不透明关联 ID、时长和布尔值。它们不添加提示词、响应、文件名、文件内容、命令参数或凭据。请求/作业追踪字段会将非运行启动关联回发起它们的 API 路由或后台作业。Axiom 是相同日志的附加接收端；配置摄取后，这些事件无需额外键。

例如，在这些 APL 查询中替换为你自己的数据集：

```apl
['YOUR_DATASET']
| where message == 'sandbox.start'
| summarize requests=count() by provider, operation, outcome
```

```apl
['YOUR_DATASET']
| where message == 'computer.requested'
| summarize requests=count() by trigger, reason, tool
```

```apl
['YOUR_DATASET']
| where message == 'run.computer'
| summarize attempts=count(), withoutComputer=countif(reason == 'none') by trigger
```

在调整 `SANDBOX_IDLE_MS` 之前，按小时/天跟踪已接受的启动、速率限制拒绝、首次使用的工具，以及无需计算机的尝试比例。增大空闲窗口会减少邻近使用之间的恢复，但会增加计费运行时间；更改它不会消除由工具引起的不必要启动。提供商的滚动窗口限制仍是配额的权威来源。

向 Sentry 或 Sentry 兼容收集器（如 GlitchTip）报告错误是可选的：

- `SENTRY_DSN` 报告后端 `error` 日志，带有异常链、`service` 以及作为标签的请求或作业 ID。未捕获的异常会在退出前报告。
- `SENTRY_BROWSER_DSN` 报告 Web 应用错误。浏览器在启动时从 `/api/monitoring/config` 读取它，并将报告提交到 `/api/monitoring/tunnel`；API 仅转发发往该 DSN 的信封。使用与 `SENTRY_DSN` 不同的项目。
- `SENTRY_ENVIRONMENT` 命名部署。`SENTRY_RELEASE` 默认为镜像的 `GIT_SHA`。

桌面端和移动端使用所连接服务器的 `SENTRY_BROWSER_DSN`。Electron 发送崩溃元数据而不含内存转储。移动端原生报告需要重新构建的应用；不支持 Expo Go。要获得可读的移动端崩溃堆栈，使用 `SENTRY_AUTH_TOKEN`、`SENTRY_ORG`、`SENTRY_PROJECT` 和可选的 `SENTRY_URL` 构建以上传符号。

两个 SDK 都不发送 Cookie、标头、请求正文、用户身份、控制台输出或日志上下文。设置 `ANALYTICS_PSEUDONYM_SECRET` 时，报告会携带已登录用户 ID 的键控哈希，以便收集器统计受影响用户；原始 ID、邮箱和 IP 地址永远不会被发送，浏览器从 API 接收其哈希。没有 DSN 时报告关闭；无效 DSN 会记录警告并保持关闭。

Compose 将这些传入 API、worker、监督程序和更新程序。计算机容器和更新程序子命令不会收到它们。

可选：

```env
SIGNUPS_ENABLED=true
SIGNUP_ALLOWLIST=you@example.com,@company.com
SANDBOX_PROVIDER=docker   # or none, e2b, novita, daytona, createos, boat. Keep fake only for pnpm test.
AGENT_RUNTIME=pi          # Keep scripted only for pnpm test.
WAKEUP_DRIVER=graphile
SANDBOX_IDLE_MS=600000    # pause or stop after 10 minutes idle; 0 disables idle sleep
# Set 0 when self-hosting with Docker, where an idle computer costs nothing, to keep long-running apps and sessions up.
# E2B, CreateOS and Boat still apply their own timeouts.
COMPUTER_MAX_ACTIVE_MS=7200000 # uptime cap for providers that bill while running; minimum 60000; 0 disables
SANDBOX_COMMAND_TIMEOUT_MS=300000 # stop a shell command after 5 minutes
MAX_TOOL_CALLS_PER_TURN=  # optional Pi turn tool-call fuse; unset/0 = unlimited
RAKAZO_MESSAGE_USER_MAX_CHARS=500 # message_user length cap; narration stays at 500
BOT_MESSAGE_MAX_HOPS=6    # bot-to-bot messages one chain may carry before the next is refused
E2B_API_KEY=              # when SANDBOX_PROVIDER=e2b
NOVITA_API_KEY=           # when SANDBOX_PROVIDER=novita; build its template first
DAYTONA_API_KEY=          # when SANDBOX_PROVIDER=daytona
CREATEOS_SANDBOX_API_KEY= # when SANDBOX_PROVIDER=createos
BOAT_API_KEY=             # when SANDBOX_PROVIDER=boat
```

`RAKAZO_LIVE_MODEL_CATALOG=off` 禁用提供商和 Codex 实时目录探测；默认开启。

要使用运维者控制的 OpenAI 兼容服务器（如 Ollama、LM Studio、llama.cpp 或 MLX），列出其模型 ID 以及 API 和 worker 进程都能访问的端点：

```env
RAKAZO_LOCAL_MODELS=qwen3:4b,llama3.1:8b,qwen3-vl
RAKAZO_LOCAL_MODELS_URL=http://127.0.0.1:11434/v1
RAKAZO_LOCAL_CONTEXT_WINDOW=32768
RAKAZO_LOCAL_MAX_TOKENS=4096
# Optional: model ids on this endpoint that accept images (screenshot computer tools).
RAKAZO_LOCAL_VISION_MODELS=qwen3-vl
```

当端点检查 `Authorization` 标头时添加 `RAKAZO_LOCAL_MODELS_API_KEY`，例如模型服务器前的网关或反向代理。Ollama、LM Studio、llama.cpp 和 MLX 无需密钥并会忽略它，因此留空可保持它们期望的占位密钥。没有它时，会进行认证的服务器会返回 `401`。

`RAKAZO_LOCAL_MODELS_URL` 只需是绝对 HTTP(S) URL，因此公共主机名上的网关在此也可用。与在 UI 中保存的连接不同，此环境设置不受 `RAKAZO_OPENAI_COMPAT_ALLOW_PUBLIC` 或 `MCP_ALLOW_PRIVATE_ENDPOINT` 约束；将该值视为受信任的运维者配置。

从源码检出运行 Doitx 时，回环默认值适用。从 Docker api/worker 服务看，`127.0.0.1` 和 `localhost` 解析为容器自身，因此主机上的模型服务器只能通过 `host.docker.internal`（通过 compose 文件中的 `extra_hosts` 映射到 `host-gateway`）或主机的 LAN RFC1918 地址访问。在裸 Linux 上优先使用 LAN 地址，因为它不依赖 extra_hosts 条目；`host.docker.internal` 在 Docker Desktop 上开箱即用，在 Linux 上只要 compose 的 `extra_hosts` 存在即可。在容器内，Bot 计算机 shell 通常可以通过同一主机名访问绑定到主机 `127.0.0.1` 的服务。在 Bot 运行时，不要在回环上运行敏感的未认证服务，或用防火墙/阻止该路径。只配置你控制的端点：发送到该模型的提示词、附件和工具结果会通过此 URL 离开 Doitx。留空 `RAKAZO_LOCAL_MODELS` 可禁用该提供商。

### Doitx Router

`doitx` 是位于 `https://router.doitx.ai/v1` 的集中管理路由器。每个部署都无需配置即可提供它，每个用户在 **Settings → Models** 中提供自己的路由器密钥。路由器的模型列表在运行时从路由器读取，而非打包，因此无需声明任何模型 ID：

```env
# Optional override of the endpoint, for a mirror reachable from your network.
RAKAZO_DOITX_MODELS_URL=https://router.doitx.ai/v1
# Optional: pin an explicit model list instead of discovering it from the router.
# RAKAZO_DOITX_MODELS=
# Optional: a server-side router key, for a deployment that provisions one for its users.
# RAKAZO_DOITX_API_KEY=
# Optional: router model ids that accept images (screenshot computer tools).
# RAKAZO_DOITX_VISION_MODELS=
```

由于地址固定，此提供商不受 `RAKAZO_OPENAI_COMPAT_ALLOW_PUBLIC` 和 `RAKAZO_OPENAI_COMPAT_PRIVATE_HOSTS` 影响。空白 `RAKAZO_DOITX_MODELS_URL` 会回退到默认值，因此仅将其指向受信任的镜像：发送到路由器模型的提示词、附件和工具结果会通过该 URL 离开 Doitx。

### 客户端更新

每个 Web 构建以其构建时的 UTC 时间命名（`YYYYMMDDHHMMSS`）。Web 应用在每次 `/rpc` 请求的 `x-rakazo-client-build` 中发送其构建（`web/20261022093015`；移动应用发送 `mobile/` 及其 JavaScript bundle 的构建时间），API 在 `x-rakazo-build` 中以其自己镜像的 Web 构建作答。看到更新构建的打开标签页会在安全时机重新加载：隐藏时、下次导航时，或在几分钟空闲且无输入后。

要立即淘汰旧客户端，在 API 上设置 `RAKAZO_MIN_CLIENT_BUILD`，例如 `web=20261022093015` 或 `web=20261022093015,mobile=20261001000000`，然后重启。较旧的客户端会收到 HTTP 426 `CLIENT_UPDATE_REQUIRED`：Web 应用会重新加载，移动应用会提供其更新。从任何 `/rpc` 响应的 `x-rakazo-build` 标头读取当前构建。未指明构建的请求（如 webhook 和 API 工具）永远不会被拒绝。格式错误的值会阻止 API 启动，而不是被忽略。

### 客户端地址

会话、日志和安全事件携带调用方地址。仅当 TCP 对端在 `TRUSTED_PROXIES`（IP、CIDR 范围或主机名，如 Compose 服务名）中时，API 才信任转发标头。它从右到左越过受信任跳数读取该标头（`CLIENT_IP_HEADER`，默认 `x-forwarded-for`）。其他任何人都是 TCP 对端，因此客户端无法选择自己的地址。未设置时，容器中的 `TRUSTED_PROXIES` 为 `local-networks`：回环以及 API 有接口的每个网络。容器外仅为回环，因为主机的网络可能包含直接客户端。`none` 不信任任何代理。在 Compose 中，这些网络是整套服务自己的网络，包含 Web 容器和 Docker 主机上反向代理所连接的网络网关，因此设置 `X-Forwarded-For` 的主机代理（Caddy 会设置；nginx 需要 `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for`）无需配置即可被信任。Bot 计算机从不在这些网络上，因此它们无法选择地址。生产 Compose 改为设置 `caddy`。对于任何其他布局，列出互联网与 API 之间的每个代理。登录速率限制按客户端地址计数，因此不被信任的代理会让所有用户共享一个限制。

Caddy 首先解析客户端。`Caddyfile.prod` 取 TCP 对端并用其覆盖 `X-Forwarded-For`。在 CDN 后，Caddy 必须信任 CDN 的范围并读取其客户端标头：`Caddyfile.cloudflare.example` 使用 Cloudflare 的范围和 `CF-Connecting-IP` 做到这一点。对于其他 CDN，复制该文件并更改范围和标头。如果你在此更改之前复制了 Cloudflare 示例，请再次复制。

### 内容安全策略

Web 服务器发送严格的内容安全策略：脚本和连接限于应用自身的源。当应用前的 CDN 注入脚本（如分析信标）时，浏览器会阻止它，直到你添加其源。`RAKAZO_CSP_SCRIPT_SRC` 扩展 `script-src`，`RAKAZO_CSP_CONNECT_SRC` 扩展 `connect-src`。每个接受以空格分隔的 `https://` 源，可带可选端口和前导 `*.` 通配符（`https://*.example.com`）。诸如 `'unsafe-inline'`、裸 scheme、`*`、`http://` 源和路径的关键字会被拒绝，Web 服务器会拒绝启动直到修复该值。更改任一设置后重启 Web 服务。

例如，Cloudflare Web Analytics 从一个主机加载其脚本并向另一个主机报告：

```bash
RAKAZO_CSP_SCRIPT_SRC=https://static.cloudflareinsights.com
RAKAZO_CSP_CONNECT_SRC=https://cloudflareinsights.com
```

仅添加你信任的源：这些设置允许的脚本会以已登录用户的访问权限运行。

浏览器向 `/api/csp-report` 报告策略阻止的内容。API 为每个违规写入一条 `csp.violation` 警告，包含指令、被阻止的源和页面路径，因此在日志中搜索它以找到要添加的源。

### 菜单链接

`RAKAZO_NAV_LINKS` 向账户菜单添加条目，在 Web 应用内打开同域页面，例如反向代理在 Doitx 旁提供的内部工具。在 API 上设置它：

```bash
RAKAZO_NAV_LINKS='[{"id":"clients","label":"Clients","path":"/ext/clients/"}]'
```

每个 `id` 为小写字母、数字和破折号，并变为 `/app/x/<id>`。`path` 必须以单个 `/` 开头，且不能在 `/app`、`/api`、`/rpc`、`/novnc` 或 `/health` 下。在代理中的 catch-all 之前路由它，例如 `Caddyfile.prod` 中的 `handle /ext/* { reverse_proxy office:8080 }`。格式错误的值会阻止 API 启动。

页面以沙箱化的不透明源打开，因此它们无法读取 Doitx 的页面或以已登录用户的会话行事；这也阻止了它们自己的 Cookie 和存储。仅为你控制的服务向链接添加 `"trusted": true`：受信任页面以已登录用户的访问权限运行，就像 `RAKAZO_CSP_SCRIPT_SRC` 允许的脚本一样。页面必须允许应用进行框架嵌入（`frame-ancestors 'self'`）。链接仅出现在 Web 应用中；桌面和移动应用会隐藏它们。

### 安全事件

API 和 worker 向 `security_events` 追加一行，并写入 `security.event` 日志行，用于：

- 注册、登录、登出以及失败的登录或注册
- 会话撤销、密码和通行密钥更改以及账户删除
- 创建、更改或移除模型、MCP、连接器、语音、记忆和密钥凭据
- 部署设置更改、审批决定和审批策略更改
- 被拒绝的私有或内部目标（`egress.refused`）以及认证速率限制命中

每个事件包含用户、空间、客户端地址、用户代理、时间以及少量标识符。事件从不包含消息内容、密钥或令牌。早于 `SECURITY_EVENT_RETENTION_DAYS`（默认 90）的行会被删除，Postgres 拒绝更新保留行的行。

运维者通过服务器端数据库/日志工具读取最近事件。例如，查询 Postgres：

```bash
docker compose --env-file .env -f infra/compose/docker-compose.prod.yml exec postgres \
  psql -U rakazo -d rakazo -c 'SELECT "createdAt", type, ip, "userId", "userAgent", metadata
  FROM security_events ORDER BY "createdAt" DESC LIMIT 50'
```

Caddy 为每个请求向 stdout 写入一行 JSON 访问日志。这些行排除 `Authorization`、`Cookie` 和 `Set-Cookie`，URL 令牌会替换为 `REDACTED`。Docker 会轮转容器日志，并在重新创建容器时丢弃它们。要保留 Caddy 的日志行，请使用收集器将容器 stdout 发送到你的日志接收端。安全事件通过 API 自己的日志传输到达接收端，Postgres 也会保留它们。

### 应对什么告警

以下查询是对 JSON 日志行的伪 SQL，因此请将其转换为你使用的日志接收端。字段名是每行中的字面键：`message`、`security.event.type`、`client.ip`、`user_agent.original`、`user.id` 以及 `security.event.metadata` 对象。根据你的流量调整阈值。

来自一个地址的注册爆发：

```sql
SELECT "client.ip", count(*) FROM logs
WHERE message = 'security.event' AND "security.event.type" = 'auth.sign_up'
GROUP BY "client.ip", bucket(1 hour) HAVING count(*) > 3
```

密码猜测，来自一个地址以及跨多个地址：

```sql
SELECT "client.ip", count(*) FROM logs
WHERE "security.event.type" IN ('auth.sign_in.failed', 'rate_limit.hit')
GROUP BY "client.ip", bucket(15 minutes) HAVING count(*) > 10;

SELECT count(DISTINCT "client.ip") FROM logs
WHERE "security.event.type" = 'auth.sign_in.failed'
GROUP BY bucket(15 minutes) HAVING count(*) > 50
```

探测内部地址。任何命中都值得一看：

```sql
SELECT "user.id", "security.event.metadata.host", "security.event.metadata.reason", count(*)
FROM logs WHERE "security.event.type" = 'egress.refused'
GROUP BY 1, 2, 3
```

账户路由上的脚本化客户端：

```sql
SELECT "client.ip", "user_agent.original", count(*) FROM logs
WHERE "security.event.type" LIKE 'auth.%'
  AND ("user_agent.original" IS NULL
    OR lower("user_agent.original") SIMILAR TO '%(curl|wget|python|go-http-client|headless|okhttp|java/)%')
GROUP BY 1, 2
```

来自该用户从未登录过的地址的凭据和设置更改：

```sql
SELECT * FROM logs c
WHERE (c."security.event.type" LIKE 'credential.%'
    OR c."security.event.type" = 'deployment.settings.changed')
  AND NOT EXISTS (SELECT 1 FROM logs s WHERE s."security.event.type" = 'auth.sign_in'
    AND s."user.id" = c."user.id" AND s."client.ip" = c."client.ip")
```

### 提示词缓存能力

模型连接 API 接受 `cacheCapabilities`，包括 `scope`、`retentionMs`、`minimumTokens` 和 `retentionMode`。仅当端点支持该窗口的前缀复用时，才声明正的 `retentionMs`。对于具有可用历史检索工具的这些连接，运行时自动使用缓存感知上下文：在冷请求上最近历史保持有界，后续请求在该前缀可能仍热且符合上下文预算时保留该选定前缀。保留期未知或 `retentionMode: "none"` 的连接保留默认检索策略。显式的执行器上下文策略仍然优先。没有可用历史检索工具的调用方会继续在模型上下文预算内适配原始历史，而不是用快照替换它。

缓存热度是建议性的。更改指令或工具、上下文压力、worker 驱逐或进程重启可能需要全新的提示词处理。这些设置不会创建后端 KV 快照或保持模型加载；推理服务器负责保留和会话切换。

### Web 搜索和页面读取

内置 `web_search` 和 `web_fetch` 默认使用无密钥 HTTP 搜索（DuckDuckGo HTML）和本地 Readability 提取。要选择 [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp)，在 `.env` 中设置 `WEB_PROVIDER=parallel` 并重启 API 和 worker。相同的 Bot 工具随后通过 `https://search.parallel.ai/mcp` 的 HTTPS MCP 返回搜索摘录和提取的页面 markdown。搜索使用 Fast 模式，无需账户或 API 密钥。

此选项将搜索查询和请求的页面 URL 发送到 Parallel，由其在服务器上检索页面。会话记账使用由 `ENCRYPTION_KEY`（API 和 worker 共享）作为密钥的内部 ID 的 HMAC，因此具有不同密钥的部署会发送不同的会话 ID。轮换该密钥会重置会话 ID；现有的仅开发环境加密密钥回退在此也适用。匿名访问有服务限制；速率限制和提供商错误会返回给 Bot，而不切换提供商。按 Bot 禁用的 Web 工具保持禁用。设置 `WEB_PROVIDER=keyless-http`（或移除该设置）可返回默认。

要改为选择 [Keenable](https://docs.keenable.ai)，设置 `WEB_PROVIDER=keenable` 并重启 API 和 worker。相同的 Bot 工具随后通过 `https://api.keenable.ai/mcp` 的 HTTPS MCP 返回搜索片段和提取的页面 markdown，无需账户或 API 密钥。此选项将搜索查询和请求的页面 URL 发送到 Keenable，由其在服务器上检索页面。匿名访问按 IP 地址受速率限制；在 API 和 worker 上设置 `KEENABLE_API_KEY` 以发送密钥并解除这些限制。错误、按 Bot 禁用的工具以及返回默认的方式与 Parallel 所述相同。

### 自托管记忆

Supermemory 和 Honcho 可在你自己的网络上运行。在 **Settings → Memory** 中，选择 **Local** 并输入实例的基础 URL。运维者必须设置 `MCP_ALLOW_PRIVATE_ENDPOINT=true`；然后工作区所有者可以保存本地端点。它必须是回环地址或解析为私有地址（Compose 服务名、RFC1918 或唯一本地地址，或 `.internal` 名称，如 Railway 的私有网络）；Doitx 为每个请求固定解析后的地址。空间成员使用保存的连接而无需看到其密钥。

对于 [Honcho](https://github.com/plastic-labs/honcho)，在 Honcho 服务器上启用 `AUTH_USE_AUTH`，并将来自其 `scripts/generate_jwt.py --admin` 的管理员 JWT 用作密钥，这样每个空间都有自己的工作区。当你输入该工作区时，工作区范围的 JWT 可用。Honcho 需要自己的带 pgvector 的 PostgreSQL、一个 LLM 提供商和一个嵌入提供商；在其首次启动前设置 `EMBEDDING_VECTOR_DIMENSIONS`。Doitx 仅在 Honcho 中存储显式保存的事实；对话摘要保留在 Doitx 中。Bot 可以在 Honcho v3.2 或更高版本上忘记已保存的事实。

远程 MCP 服务器和已安装的 API / GraphQL 连接器默认使用公共 HTTPS。部署所有者可以在 localhost、同一 LAN 或 Docker 网络上附加一个。在 API 和 worker 上设置 `MCP_ALLOW_PRIVATE_ENDPOINT=true` 以为所有用户允许这些。云元数据地址保持阻止。在公共安装上保持该标志未设置。

使用 OAuth 的远程 MCP 服务器通常在首次 **Connect OAuth** 时向提供商注册 Doitx。某些提供商只接受你在其控制台创建的客户端。对于这些，在添加服务器时于 **Advanced** 下输入客户端 ID（以及机密客户端的密钥），并将那里显示的 **Redirect URI**（`<your web origin>/mcp/oauth/callback`）添加到客户端的允许重定向 URI。客户端与服务器的其他凭据一起加密存储，并在 **Disconnect** 后保留；切换到不同的客户端会丢弃当前授权。首次使用时，客户端会绑定到 MCP 服务器所指向的授权服务器，此后 Doitx 拒绝将其发送到任何其他地方。替换客户端会清除绑定。

Stdio MCP 服务器也可以使用 OAuth。它们不会自行授权（MCP 规范要求它们从环境读取凭据），因此 Doitx 为它们运行流程。除非 API 和 worker 具有 `MCP_STDIO_ENABLED=true` 且命令列在 `MCP_STDIO_ALLOWED_COMMANDS` 中，否则它们处于关闭状态。添加服务器时，输入 OAuth 客户端、其 **Authorization server**（issuer，例如 `https://accounts.google.com`）和 **Scopes**，然后像远程服务器一样点击 **Connect OAuth**。某些提供商仅在通过额外参数请求时才发放刷新令牌：对于 Google，将 **Authorization parameters** 设为 `access_type=offline&prompt=consent`。通过其环境变量将授权传递给进程：

- 值可以单独或在其他文本内引用 `{{oauth.access_token}}`、`{{oauth.refresh_token}}`、`{{oauth.client_id}}`、`{{oauth.client_secret}}`、`{{oauth.expires_at}}`（epoch 毫秒）、`{{oauth.scope}}` 或 `{{oauth.token_type}}`。
- 变量也可以是 **File**：其模板（通常是 JSON，带有相同的引用）在进程启动时写入私有临时目录，变量接收文件的路径。对于读取凭据或令牌文件路径的包使用此项。

Doitx 会在其传递的访问令牌过期前不久刷新授权并重启进程，因此长时间运行的进程永远不会保留失效令牌。仅接收刷新令牌的进程会自行刷新。进程停止时临时文件会被移除。

以 `npx [-y] <package>[@version]`（或 `npx -p <package> <bin>`）启动的服务器不会在每次启动时下载。Doitx 使用 `npm install` 将包安装一次到 `MCP_PACKAGES_DIR`（默认 `DATA_DIR/mcp-packages`，由 API 和 worker 共享），然后直接运行其 bin；`npx` 仍必须在 `MCP_STDIO_ALLOWED_COMMANDS` 中。安装有自己的超时 `MCP_STDIO_INSTALL_TIMEOUT_MS`（默认 180000），独立于握手超时 `MCP_STDIO_STARTUP_TIMEOUT_MS`（默认 30000）。固定版本，使每次启动运行相同代码；可在服务器的环境变量中设置 `NPM_CONFIG_REGISTRY` 等 npm 设置。本地路径、git 和 tarball URL 以及未知的 `npx` 标志会回退到按配置运行命令。每个服务器在 API 和 worker 中各自为每个用户运行一个进程，由该用户的 Bot 共享，并在 `MCP_STDIO_IDLE_MS`（默认 900000，15 分钟）无使用后停止。当服务器启动失败时，原因（包括其 stderr 末尾，凭据已脱敏）会显示在 **Settings** 中的服务器上，其 Bot 会被告知它不可用，而不是静默失去其工具。

运行不会在一个服务器上长时间等待。它给每个服务器 `MCP_DISCOVERY_TIMEOUT_MS`（默认 20000）列出其工具，然后不带它继续；仍在安装的包会在后台完成，其工具会在后续回合出现。失败后，运行会跳过该服务器 30 秒，在其持续失败时翻倍至 5 分钟。成功的 **Test connection** 或发现，或服务器设置的更改，会立即结束等待。

对于接受标准 `reasoning_effort` 的服务器，在连接时于 **Advanced** 下启用 **Supports thinking**。该设置保存在连接上（无需环境变量或重启）。现有连接默认禁用。通过 **Settings → Models** 重新连接以前的 Qwen 列表或部署本地模型并开启它；旧的环境列表不再读取。

已启用的连接默认使用中等思考。Web 和桌面端在 Bot 的高级设置中暴露 **Thinking**；移动端继承相同的后端策略。Doitx 发送标准的 `reasoning_effort`（`minimal`、`low`、`medium`、`high`，关闭时为 `none`）；服务器负责模型特定的转换。当服务器缺少标准 effort 支持时，保持 **Supports thinking** 关闭。现有令牌限制仍然适用；effort 不是单独的推理令牌预算。

不要提交 `.env`。切勿将 `COMPOSIO_API_KEY`、OpenRouter 密钥或提供商令牌放入 git、日志或聊天。

可选的消息平台（iMessage、Slack、WhatsApp、Telegram、Feishu/Lark）在其环境凭据设置后挂载——见 `.env.example`。Lark 适配器和官方 SDK 仅在配置后加载。将 Feishu/Lark Bot 事件订阅指向 `/api/v1/messaging/webhook/lark`（仅 webhook/HTTP 入站；不要启用长连接）。个人群关联仍仅限 iMessage；Slack 频道使用下文的 workspace 安装。Telegram 可以并排运行多个 Bot（`TELEGRAM_BOT_TOKEN_<NAME>` 加 `TELEGRAM_WEBHOOK_SECRET_TOKEN_<NAME>`），例如每个空间一个，这样同一个人可以通过每个 Bot 与不同的 Doitx Bot 聊天。

对于 Slack workspace 安装，在 API 和 worker 上设置 `SLACK_CLIENT_ID`、`SLACK_CLIENT_SECRET` 和 `SLACK_SIGNING_SECRET`。使用你的公共 API 源（`API_URL`）注册 OAuth 重定向 URL `https://app.example.com/api/v1/messaging/install/slack/callback`。在 Slack 应用的 Manage Distribution 设置中启用分发，以便其他 workspace 可以安装它。启用 Slack Events API 投递到 `https://app.example.com/api/v1/messaging/webhook/slack`，包含 `app_mention`、`message.im`、`message.channels`、`message.groups`、`message.mpim` 和 `app_uninstalled`。启用应用的 Messages 选项卡。安装流程请求其使用的 message/history、channel/user lookup、file read and write 和 reaction-write 作用域；更改作用域后重新安装 Slack 应用。不使用 Socket Mode。

在 Messaging 设置中，在 Slack 行上选择 **Connect**。该 workspace 以你默认空间中的第一个 Bot 作答，无论当前打开的是哪个空间。每个 Slack workspace 属于一个 Doitx 空间和一个安装所有者；从另一个空间安装它会被拒绝。要向该 Bot 发送私信，使用 **Link DMs** 并在私信中向 Slack 应用发送验证码。同一空间中的队友可以以相同方式关联自己的 Bot。将 Slack 应用邀请到频道并提及它以在那里接收回复。Bot 的外部会话提供 **Mentions only**、**Listen** 和房间指导。Workspace 设置和个人关联在 Web、桌面和移动端可用。移动端在系统浏览器中打开 Slack 授权；完成后返回应用。频道监听设置目前位于 Web/桌面界面中。

令牌使用配置的密钥存储加密。worker 为每次出站操作解析安装，包括排队的回复；断开安装会停止进一步投递并取消其个人私信关联。Slack 签名的 `app_uninstalled` 事件也会移除安装。Disconnect 移除 Doitx 的本地凭据；在 Slack 中移除应用以撤销 Slack 的安装本身。安装所有者必须保留空间成员资格和一个活跃的 Bot。Workspace 安装需要工作区级 Bot 令牌，无需 Slack 令牌轮换；Enterprise Grid 组织范围安装和轮换令牌会被明确拒绝。

较旧的 `SLACK_BOT_TOKEN` 加 `SLACK_SIGNING_SECRET` 配置仍支持单个 workspace。配置后 OAuth 模式优先；使用 workspace 安装前，必须重新关联现有的静态 Slack 身份/会话。`TEAM_CHAT_BOT_ID` 仅为静态配置选择频道 Bot。它不会覆盖 workspace 安装或个人私信。从 Integrations 屏幕授权的 Slack 工具是与此消息界面分开的连接。

### 使用自选名称的设置

Compose 文件仅按名称向 API 和 worker 传递各自读取的设置，而不是整个 `.env`。因此，名称由你选择的设置（如 `TELEGRAM_BOT_TOKEN_<NAME>`）需要单独一行：在基础文件之后叠加的覆盖文件中，在 `api` 和 `worker` 的 `environment` 下添加它（启用更新程序时也在 `RAKAZO_COMPOSE_FILE` 中），不设值，以便 Compose 从 `.env` 填充。`install-images.sh` 会列出没有容器接收的任何 `.env` 设置。

```yaml
# docker-compose.override.yml
services:
  api:
    environment:
      TELEGRAM_BOT_TOKEN_SUPPORT:
      TELEGRAM_WEBHOOK_SECRET_TOKEN_SUPPORT:
  worker:
    environment:
      TELEGRAM_BOT_TOKEN_SUPPORT:
      TELEGRAM_WEBHOOK_SECRET_TOKEN_SUPPORT:
```

`install-images.sh` 会自动在其旁边叠加 `docker-compose.override.yml`。在你自己的命令中，在基础文件之后添加 `-f docker-compose.override.yml`。

<a id="choosing-a-computer-provider"></a>

## 选择计算机提供商

Electron 桌面应用是同一 API 的客户端。Docker 仍是默认选项。对于由应用管理的本地实例，本地操作者可以选择 **Use this Mac**（macOS）或 **Use this computer**（Windows/Linux）。经原生确认后，一个经过认证的桥接会将命令从 Docker 后端发送到 Electron，并在你的 OS 账户下执行。应用菜单中的 **Computer Access…** 可以更改这一选择；**Revoke Local Computer Access** 会立即断开正在进行的操作并撤销已保存的权限。本地执行要求桌面应用保持运行。连接到已有的远程实例并不会授予该实例访问你计算机的权限。浏览器和移动客户端使用部署所配置的计算机；它们不会暴露自己的主机。`SANDBOX_PROVIDER=desktop` 是一种独立的、仅用于开发的配置，适用于直接运行在目标主机上的后端。

原生文件读取和工作区导出限制为每个文件 8 MiB。更大的工作区文件会使检查点失败，并保留之前保存的工作区；本地文件仍保留在计算机上。写入受 12 MiB 编码请求上限的限制。

- **已发布镜像**（`docker-compose.images.yml`）默认使用 `SANDBOX_PROVIDER=docker`、本地 supervisor 以及已发布的 `ghcr.io/iishows/doitx/computer` 镜像。无需 E2B 账户。可选：设置 `e2b`、`novita`、`daytona`、`createos` 或 `boat` 并配置匹配的 API 密钥，以使用远程计算机。
- **Docker** 是已发布镜像以及源码检出/完整本地 Compose 栈的快速开始默认选项。工作区 Bot 默认共享一个持久化的团队计算机（Team Computer）；私有计算机为可选项。请像随附的 Compose 文件那样，保持 supervisor 私有。
- **E2B** 在远离 Doitx 主机的环境中运行 Bot 计算机，适合公开或多用户的生产部署。Doitx 会将可移植工作区和浏览器配置文件目录检查点保存到 `DATA_DIR`；E2B 磁盘只是运行时缓存，不是持久的事实来源。
- **Daytona** 通过 Daytona 沙箱提供相同的远程计算机契约。配置 `DAYTONA_API_KEY`，可选配置 `DAYTONA_API_URL` / `DAYTONA_TARGET` / `DAYTONA_SNAPSHOT`。
- **CreateOS** 通过 CreateOS 桌面沙箱提供相同的远程计算机契约。配置 `CREATEOS_SANDBOX_API_KEY`，可选配置 `CREATEOS_SANDBOX_BASE_URL`、`CREATEOS_SANDBOX_SHAPE` 或 `CREATEOS_SANDBOX_ROOTFS`。Doitx 默认使用 `https://api.sb.createos.sh`、`s-2vcpu-2gb` 和 `desktop:1`。
- **Boat** 通过 `BOAT_API_KEY`（可选 `BOAT_API_URL`）提供托管的 Linux 桌面。Doitx 始终以 `noEnv: true` 创建或恢复沙箱，将可移植工作区保存在 `/home/user/rakazo-home` 下，并刷新两小时的 TTL。Boat 使用共享的 Linux 桌面运行时和受保护的端口路由，以支持并发的 Bot 桌面。每个 Bot 都有自己持久化的 Chrome 配置文件；登录状态不会在 Bot 之间共享。
- 在应用管理的 Electron 实例中，**本地计算机访问**通过原生桥接在 Windows、macOS 或 Linux 上运行命令。Bot 可以读取/修改本地文件，并通过 OS 命令启动已安装的应用，但受你的账户和 OS 权限限制。可移植的文件工具和检查点仍限于 Bot 工作区；其他本地文件夹请使用命令操作。图形界面控制不可用。权限会保存在本地，并可从应用菜单中撤销。仅对受信任的个人实例启用此功能：该实例上的每个 Bot 都能使用你账户的权限。
- **桌面提供商**（`SANDBOX_PROVIDER=desktop`）直接在 API/worker 主机上运行命令，仅使用最小化的 shell 环境（不含服务器密钥）。除非 `NODE_ENV` 为 `development` 或 `test`，否则 API 和 worker 会拒绝它，因此生产服务器绝不会在自身上运行 Bot 命令。在容器内设置此项不会获得对物理计算机的访问权限。当选择本地计算机访问时，Docker 部署使用经过认证的原生桥接；它们绝不会静默回退为在后端主机上执行。
- **Fake** 仅用于验证的模拟器。
- **None** 在没有计算机主机的情况下启动产品（当未配置 Docker/supervisor，或选择了远程提供商但未提供其 API 密钥时作为回退）。

有关提供商配置和健康检查，请参阅[提供商设置指南](./self-host-sandbox-providers.md)。

## 内容加密

Doitx 会在聊天消息、线程事件、压缩后的历史摘要、记忆文档及其修订版本，以及上传或生成的文件到达 PostgreSQL 或 `DATA_DIR` 之前对其进行加密。名称、id、时间戳和其他元数据保持可读。无论此设置如何，凭据始终加密。详细信息与威胁模型见[内容加密](./content-encryption.md)。

**密钥。** 内容使用由 `ENCRYPTION_KEY`（以及 `ENCRYPTION_MASTER_KEYS`，若已设置）派生出的密钥加密。没有它们，数据库和 `DATA_DIR` 的备份将无法被读取——无论是由你还是其他任何人。`install-images.sh` 在生成密钥时会对此说明一次：

```text
Back up ENCRYPTION_KEY from /path/to/rakazo/.env. Encrypted content cannot be recovered without it.
```

它绝不会打印密钥。请将副本存储在服务器及其备份之外的其他地方。

**开关。** `.env` 中的 `CONTENT_ENCRYPTION=on|off`：

| 安装方式 | 未设置时表示 |
| --- | --- |
| Compose 文件、已发布镜像、Railway | `on` |
| 桌面应用、**此计算机** | `off`（由计算机的磁盘加密提供保护） |
| 源码检出，且 `NODE_ENV=development` 或 `RAKAZO_ALLOW_DEV_SECRETS=1` | `off` |

设置为 `off` 时，新内容和文件将以可读形式存储，因此你可以直接查询自己的数据库，且密钥丢失也不会导致它们丢失。此前加密的内容仍可用密钥读取，因此关闭开关绝不会使数据变得不可读。若要将其一并转换，请运行 `content-encryption decrypt`。任何其他值都会让 API 和 worker 在启动时停止。

若要在之后开启，请设置 `CONTENT_ENCRYPTION=on`，重启，然后加密在关闭期间存储的内容。在已发布镜像文件夹中执行（其他栈使用各自的 Compose 文件）：

```bash
docker compose -f docker-compose.images.yml exec api pnpm --filter @rakazo/api content-encryption migrate
docker compose -f docker-compose.images.yml exec api pnpm --filter @rakazo/api content-encryption status
```

搜索在两种模式下均可用，且行数据混合时也可用。

**读取你的数据。** `content-encryption export` 会将解密后的线程、消息、记忆文档和修订版本以 JSON lines 形式写出。默认读取整个数据库；可使用 `--space <id>`、`--thread <id>` 或 `--bot <id>` 缩小范围。它只执行读取。

```bash
docker compose -f docker-compose.images.yml exec -T api \
  pnpm -s --filter @rakazo/api content-encryption export --bot <bot id> > rakazo-export.jsonl
```

导出内容为明文：请像对待数据库本身一样保存它。文件不包含在内；使用 `content-encryption decrypt` 使其在磁盘上可读。

<a id="bot-homes-in-object-storage"></a>

## 对象存储中的 Bot 主目录

每个 Bot 计算机都有一个主目录：其中的文件、已登录的浏览器配置文件和 CLI 令牌。默认情况下，主目录位于服务器上的 `DATA_DIR/homes`。设置 `OBJECT_STORAGE_BUCKET` 可将其改为保存在任何兼容 S3 的存储桶中，这样 `DATA_DIR` 只是缓存，API 和 worker 主机也不再需要为主目录共享磁盘。保持未设置即可像以前一样将主目录保存在本地磁盘。同一连接还会存储新的制品；有关迁移现有文件和推送注册的信息，请参阅[共享存储迁移](#shared-storage-migration)。

```env
OBJECT_STORAGE_BUCKET=rakazo-homes
OBJECT_STORAGE_ENDPOINT=https://storage.example.com
OBJECT_STORAGE_REGION=us-east-1
OBJECT_STORAGE_ACCESS_KEY_ID=replace-me
OBJECT_STORAGE_SECRET_ACCESS_KEY=replace-me
# Optional: a key prefix, when the bucket holds anything else.
OBJECT_STORAGE_PREFIX=
# Optional: true for services that address buckets in the path rather than the host name.
OBJECT_STORAGE_PATH_STYLE=false
```

只有 API 和 worker 会读取这些设置。Bot 计算机绝不会收到凭据或已存储对象的链接；文件仍像以前一样通过服务器到达它们。这些设置适用于所有提供商，包括 Docker 计算机，它们仍会挂载其缓存的主目录。

**加密。** 无论 `CONTENT_ENCRYPTION` 如何设置，主目录都会在上传前在服务器上加密；存储桶中只会保存密文。每个主目录都有自己的随机数据密钥，保存在其计算机的数据库行中，并由其空间的内容密钥包装（见[内容加密](./content-encryption.md)）。每个存储的修订版本都是一个对象，封装在绑定到该主目录和修订版本的认证分段中，因此被修改、截断或调换的对象会恢复失败，而不会恢复出错误的文件。对象键是随机 id（`homes/<id>/<revision>`），不指明任何 Bot、用户或空间。请像以前一样备份数据库和加密密钥：没有它们，存储桶将无法读取。

**存储桶。** 请为本部署专用一个私有存储桶（或其中的一个前缀）：worker 会删除 `homes/` 下不属于本数据库中任何主目录的对象。阻止公共访问。凭据需要对其中对象具有读取、写入、列出和删除权限，不需要其他权限。启用存储桶版本控制，并配置生命周期规则，在备份窗口之后使非当前版本过期，以便误删除可以撤销。`scripts/backup.sh` 不会复制存储桶；版本控制或服务自身的复制就是它的备份。

**存储的内容。** 每次保存都会将整个主目录作为一个对象上传（对于较大的主目录，分片最大为 16 MiB），然后删除前一个对象，因此无论主目录有多少文件，都只占用大约一个对象。主目录会在运行完成或失败时、计算机停止之前以及休眠之前保存，与以前一致。

**删除。** 删除拥有独立计算机的 Bot，或删除一个空间（包括随账户一并移除的个人空间）时，会连同其计算机行一起删除每个主目录的密钥，使已存储的对象立即变得不可读。worker 会在一小时内删除这些对象，以及中断的保存所遗留的任何修订版本。

**缓存。** `DATA_DIR/homes` 保存正在使用的主目录副本。如果某个副本的修订版本与存储桶一致，那么在副本缺失时会重新下载，因此你可以移除它。Docker 计算机在其副本中直接工作，直到下一次保存，因此只能移除已停止的 Docker 计算机的副本。远程计算机直接从其文件保存到存储桶；worker 会在一小时未读取后移除它们的副本。从未保存到存储桶的主目录会保留其唯一副本。

**保存较大的主目录。** 保存会通过数据卷上的 `DATA_DIR/staging` 流式传输文件，因此内存使用不会随文件或主目录大小增长。超过 20 GiB 或一百万个文件，或超过卷可用空间的主目录不会被保存，并会继续运行；worker 会记录 `computer.sleep_deferred`，原因为 `too_large` 或 `too_many_files`。被终止的进程遗留的暂存文件会在启动时以及由 worker 在几分钟内移除。

### 迁移现有主目录

设置存储桶后，重启 API 和 worker。每个主目录会在下次保存时上传；在此之前使用其本地副本。若要一次性上传其余主目录，请在挂载了 `DATA_DIR` 的位置运行以下命令。它会跳过已存储的主目录，因此可以停止并再次运行。每次上传都会先下载并检查，之后主目录才算已迁移。它绝不会删除本地文件。

```bash
docker compose -f docker-compose.images.yml exec api pnpm --filter @rakazo/api home-storage migrate --dry-run
docker compose -f docker-compose.images.yml exec api pnpm --filter @rakazo/api home-storage migrate
```

列为没有计算机的主目录属于已不存在的 Bot；它们会被保留不动。一旦某次运行报告无失败且没有待上传内容，即可移除本地副本：停止 Docker 计算机，停止 API 和 worker，将 `DATA_DIR/homes` 和 `DATA_DIR/home-revisions` 移开，再次启动它们并检查几个 Bot 的文件，然后删除已移走的目录。

## 备份

```bash
./scripts/backup.sh
```

这会导出 Postgres（`pg_dump`），并将 `data/` 归档到 `backups/<stamp>/`。备份目录的权限为 `0700`，两个产物的权限均为 `0600`，包括在复用的路径上。缺少 `data/` 或设置 `RAKAZO_BACKUP_SKIP_HOMES=1` 会生成一个空归档，恢复时会将其视为省略了主目录。数据库或归档错误会导致备份失败。请丢弃任何失败运行的输出目录。

## 在安装实例之间迁移账户

若要从 Doitx Cloud 迁移到你自己的安装实例（或反向迁移），请在旧实例上使用 **Settings → Export data**，在新实例上使用 **Import data**。导出的是你所属每个空间的 zip：Bot、聊天、文件、记忆、例程、技能、Bot 工作区文件，以及你拥有的空间中的看板。内容在 zip 内是解密的，请妥善保管。导入会创建归你所有的新空间。例程导入后处于关闭状态。凭据和连接（模型密钥、应用、MCP 服务器、消息传递）不会随之迁移，请在新实例上重新连接。超过 8 MiB 的工作区文件会被排除，导出必须小于 4 GiB，且上传必须在服务器的请求超时内完成（Node 中默认 5 分钟）。

<a id="public-single-vm-deployment"></a>

## 公网单 VM 部署

`infra/compose/docker-compose.prod.yml` 使用 Postgres、API、worker、Web 应用以及通过 Caddy 的自动 HTTPS 来运行托管产品。它使用 E2B 作为 Bot 计算机，因此 VM 绝不会暴露 Docker supervisor 或浏览器容器——`infra/compose/docker-compose.prod.docker.yml` 是可选启用的覆盖层，可在同一栈上运行本地 Docker 计算机（见下文）。具有 root 等效权限的更新器 sidecar 是一个显式启用的 profile。

在部署到新的 Ubuntu 主机之前，请创建并验证一个仅使用密钥的 `deploy` 账户，然后应用幂等的主机加固基线。它会禁用 SSH 密码和 root 登录、限制 SSH 速率、仅允许 SSH/HTTP/HTTPS 通过 UFW、启用 fail2ban、无人值守安全更新、AppArmor、审计规则以及保守的内核/网络保护。请保持提供商控制台打开，直到脚本重新加载 SSH 后全新 SSH 登录成功。

```bash
sudo --preserve-env=SSH_CONNECTION DEPLOY_USER=deploy bash infra/compose/harden-host.sh
```

生产主机还使用 `infra/compose/docker-daemon.json` 启用 live restore、限制本地容器日志、默认启用 no-new-privileges，并使用内核 NAT 路径替代 Docker 的用户态代理。

1. 将诸如 `app.example.com` 的 `A`/`AAAA` 记录指向该 VM，并允许入站 TCP 80/443 和 UDP 443。如果使用 Cloudflare，请启用代理并使用 **Full (strict)** TLS，并将 `Caddyfile.cloudflare.example` 复制到公共检出之外的、由操作者控制的路径。将 `CADDYFILE_PATH` 设置为该绝对路径。示例会丢弃非来自 Cloudflare [已发布 IP 范围](https://www.cloudflare.com/ips/)的应用请求；每当 Cloudflare 发布变更时，请同步这些范围。Cloudflare Tunnel 可以替代公共 Web 监听器。
2. 在 VM 上克隆仓库，并创建包含仅生产环境值的根 `.env`。至少设置 `POSTGRES_PASSWORD`、`BETTER_AUTH_SECRET`、`ENCRYPTION_KEY`、`SCREEN_PROXY_SECRET`、`OPENROUTER_API_KEY`、所选沙箱提供商的 API 密钥、`RAKAZO_HOST` 以及三个公共源。当检出版本不在受支持的 Linux 默认路径 `/srv/rakazo` 时，设置 `RAKAZO_DEPLOY_DIR`。数据库凭据请使用 URL 安全的随机值。如果启用 `updater` profile，还需设置专用的 `RAKAZO_UPDATER_TOKEN`（至少 32 个字符），且不同于 `BETTER_AUTH_SECRET`、`SANDBOX_SUPERVISOR_TOKEN` 和 `SCREEN_PROXY_SECRET`。
3. 在服务处于私有状态时，保持注册允许列表启用：

```env
NODE_ENV=production
RAKAZO_HOST=app.example.com
# Optional operator-owned override, for example the Cloudflare allowlist file:
# CADDYFILE_PATH=/etc/rakazo/Caddyfile.prod
BETTER_AUTH_URL=https://app.example.com
WEB_ORIGIN=https://app.example.com
API_URL=https://app.example.com
SIGNUPS_ENABLED=true
SIGNUP_ALLOWLIST=owner@example.com,reviewer@example.com
# e2b, novita, daytona, or boat
SANDBOX_PROVIDER=e2b
AGENT_RUNTIME=pi
WAKEUP_DRIVER=graphile
DATA_DIR=/data
# Absolute path of this checkout as the Docker daemon sees it. /srv/rakazo is the Linux default;
# set this explicitly for every other layout. See "The deploy directory must be one path" below.
RAKAZO_DEPLOY_DIR=/srv/rakazo
RAKAZO_IMAGE_TAG=local
# Optional: required only with `--profile updater`.
# RAKAZO_UPDATER_TOKEN=replace-with-32-plus-character-updater-token
```

4. 从你的检出构建镜像并启动栈，然后验证其公共健康端点：

```bash
docker compose --env-file .env -f infra/compose/docker-compose.prod.yml \
  build --build-arg GIT_SHA=$(git rev-parse HEAD)
docker compose --env-file .env -f infra/compose/docker-compose.prod.yml \
  up -d --wait --pull never
curl --fail https://app.example.com/health
```

**首次部署请构建，不要拉取。** `RAKAZO_IMAGE_TAG` 以 `local` 发布，该标签没有任何注册表提供，因此上述命令会从你刚克隆的检出构建 `api`、`worker` 和 `web`。[更新器 sidecar](#updater-sidecar) 下的可选启用命令会在需要时构建 `updater`。

公共 `/health` 仅报告存活状态。运行时、沙箱和修订版本详情保留在 API 端口的 `/internal/health`，边缘不会路由该端点：

```bash
docker compose --env-file .env -f infra/compose/docker-compose.prod.yml exec api \
  node -e "fetch('http://127.0.0.1:3100/internal/health').then(r=>r.text()).then(console.log)"
```

传入 `GIT_SHA` 才能使 `/internal/health` 报告 `"revision"`；本地构建的镜像没有其他方式得知其提交。来自注册表的预构建镜像在发布时已内置该信息，因此切换到发布标签无需其他操作：容器报告镜像构建时的修订版本，而不是 `.env` 中的 `GIT_SHA`。

发布版本发布后，你可以通过将 `RAKAZO_IMAGE_TAG` 设置为该发布标签，并先运行 `pull` 再运行 `up -d --wait --pull never`，将此主机切换为预构建镜像。有关标签契约，请参阅[已发布镜像与标签](#published-images-and-tags)。

根 `.env` 会同时从 Git 和 Docker 构建上下文中排除。数据库、应用数据和 Caddy 证书保存在命名 Docker 卷中。`webassets` 卷会保留最近构建的带哈希 Web 资源（最多 20 个，每个在被替换后保留一周），因此打开的标签页在更新后仍能加载；它无需设置，可随时删除。

生产 Compose 文件将 Postgres 和 Caddy 固定到多架构清单摘要，已发布的应用/更新器构建则固定其基础镜像摘要。在获取上游安全更新时，请刻意刷新这些固定值；只要存在摘要，仅更改可见的主版本标签并不会改变内容。

对于单 VM 生产布局，请将 `infra/compose/backup-prod.sh` 安装为 `/usr/local/sbin/rakazo-backup`，并启用随附的 `rakazo-backup.timer`。它会在 `/var/backups/rakazo` 下创建经过验证的 Postgres 自定义格式转储以及应用数据归档，权限为 `0600`。它会保留最多 `RAKAZO_BACKUP_KEEP` 个已验证快照（默认 `3`），受 `RAKAZO_BACKUP_MAX_GB`（默认 `50` GiB）限制，并预留 `RAKAZO_BACKUP_MIN_FREE_GB`（默认 `5` GiB）的可用磁盘空间。启动前，它会移除废弃的部分快照和多余的历史记录，然后通过仅按应用数据源增长率缩放上一个 appdata 归档，再加上上一个数据库转储大小来检查容量。没有源大小元数据的快照在初始估算时使用原始源大小。容量不足时，它会保留最新的已验证快照，限制输出文件大小，并移除失败运行的部分快照。仅本地快照无法在主机丢失后幸存；请按下文所述对其进行加密并复制到异地。

<a id="encrypted-and-off-site-backups"></a>

#### 加密备份与异地备份

备份仅使用 [age](https://age-encryption.org) 加密到公共接收者，因此主机可以写入自己无法读取的备份。请在你控制的机器上（而不是服务器上）生成密钥对，并将身份文件（私钥）离线保存，最好让另一位操作者持有第二个接收者：

```bash
age-keygen -o rakazo-backup.key   # prints "Public key: age1..."
```

`harden-host.sh` 会安装 `age`；在其他主机上运行 `apt-get install age`。然后在 `/etc/rakazo/backup.env` 中设置公钥，以空格分隔，或指向一个每行一个密钥的接收者文件：

```env
RAKAZO_BACKUP_AGE_RECIPIENTS=age1exampleprimaryrecipient age1examplerecoveryrecipient
# or: RAKAZO_BACKUP_AGE_RECIPIENTS_FILE=/etc/rakazo/backup-recipients.txt
```

设置接收者后，每个快照包含 `rakazo.dump.age`、`appdata.tgz.age`、`SOURCE_SIZE_KB` 和 `SHA256SUMS`。`pg_dump` 和 `tar` 直接流式写入 age，因此明文绝不会写入磁盘。验证无需私钥：`pg_restore --list` 和 `tar -t` 在加密状态下读取相同的明文流，每个文件都必须带有 age 头，且校验和覆盖加密后的文件。

未设置接收者时，备份会像以前一样保持明文，记录一条警告，主机检查会提示最新备份未加密。在首次加密备份之后，未设置接收者的运行会失败，而不是静默写入明文。仅当有意接受明文时才设置 `RAKAZO_BACKUP_ALLOW_PLAINTEXT=1`；这也会使主机检查警报静默。

若要创建异地副本，请安装 `rclone`，并将 `RAKAZO_BACKUP_OFFSITE_REMOTE` 设置为任意 [rclone 远程](https://rclone.org/overview/)和路径，例如兼容 S3 的存储桶或 SFTP 服务器。在同一文件中使用 rclone 自身的设置配置该远程，例如：

```env
RAKAZO_BACKUP_OFFSITE_REMOTE=offsite:rakazo-backups
RAKAZO_BACKUP_OFFSITE_KEEP=14
RCLONE_CONFIG_OFFSITE_TYPE=s3
RCLONE_CONFIG_OFFSITE_PROVIDER=Other
RCLONE_CONFIG_OFFSITE_ENDPOINT=https://s3.example.com
RCLONE_CONFIG_OFFSITE_ACCESS_KEY_ID=replace-me
RCLONE_CONFIG_OFFSITE_SECRET_ACCESS_KEY=replace-me
```

每个已验证的本地快照完成后，加密文件会上传到 `<remote>/<stamp>/`，使用 `rclone check` 检查，然后才写入 `SHA256SUMS`，标记副本完成。异地副本要求加密。远程会保留最新的 `RAKAZO_BACKUP_OFFSITE_KEEP` 个完整快照（默认 `14`），独立于 `RAKAZO_BACKUP_KEEP`；只会删除以 stamp 命名的目录。将其设置为 `0` 可将删除交给存储桶的生命周期规则，这样凭据只需列出、读取和写入权限，无需删除权限。上传失败会保留本地快照但使服务失败，从而触发备份警报。

#### 恢复加密备份

请在身份文件所在的位置运行以下操作，切勿将其留在服务器上。使用 `rclone copy offsite:rakazo-backups/<stamp> ./<stamp>` 或 `scp` 获取快照，然后运行演练，它会校验校验和，并将每个文件解密到 `pg_restore --list` 和 `tar -t` 而不写入明文（需要 `age`、服务器主版本或更新版本的 `pg_restore`——生产 Compose 文件为 18——以及 `tar`）：

```bash
bash infra/compose/backup-drill.sh ./<stamp> rakazo-backup.key
```

**切勿将 appdata 解压到活动卷上。** 快照之后创建的文件会幸存并与恢复的数据库混合。请解压到干净的同级目录，然后在替换前保留旧目录树。恢复期间暂停自动部署和更新器。停止任何其他写入此数据库或卷的进程。如果任何步骤失败，请保持应用停止。

在具有身份文件的机器上的同一个 Bash 会话中运行这些命令。请先替换快照和卷名。`VOLUME` 必须命名 API 当前挂载到 `/data` 的卷，当栈使用其他项目名时可能会有所不同。

```bash
set -euo pipefail
umask 077
COMPOSE="sudo docker compose --env-file .env -f infra/compose/docker-compose.prod.yml"
VOLUME=rakazo-prod_appdata

ssh deploy@app.example.com "cd /srv/rakazo && $COMPOSE stop api worker web"
ROLLBACK_DUMP="$(mktemp "$PWD/before-restore.dump.XXXXXX")"
if ! ssh deploy@app.example.com \
  "cd /srv/rakazo && $COMPOSE exec -T postgres sh -c 'pg_dump -Fc -U \"\$POSTGRES_USER\" \"\$POSTGRES_DB\"'" \
  > "$ROLLBACK_DUMP"; then
  printf 'Pre-restore dump failed. Do not use the partial file at %s. Keep the application stopped.\n' "$ROLLBACK_DUMP" >&2
  exit 1
fi

APPDATA="$(ssh deploy@app.example.com "sudo docker volume inspect -f '{{.Mountpoint}}' '$VOLUME'")"
RESTORE="$(ssh deploy@app.example.com "sudo mktemp -d '${APPDATA%/*}/rakazo-restore.XXXXXX'")"
ssh deploy@app.example.com "sudo mkdir '$RESTORE/staged'"
printf 'Record this rollback pair:\nDatabase dump: %s\nData tree on deploy@app.example.com: %s/previous\n' \
  "$ROLLBACK_DUMP" "$RESTORE"
age -d -i rakazo-backup.key <stamp>/appdata.tgz.age | ssh deploy@app.example.com \
  "sudo tar -xzf - --numeric-owner -C '$RESTORE/staged'"

age -d -i rakazo-backup.key <stamp>/rakazo.dump.age | ssh deploy@app.example.com \
  "cd /srv/rakazo && $COMPOSE exec -T postgres sh -c 'pg_restore --clean --if-exists --no-owner --exit-on-error --single-transaction -U \"\$POSTGRES_USER\" -d \"\$POSTGRES_DB\"'"

ssh deploy@app.example.com \
  "sudo mv -- '$APPDATA' '$RESTORE/previous' && sudo mv -- '$RESTORE/staged' '$APPDATA'"
ssh deploy@app.example.com \
  "cd /srv/rakazo && $COMPOSE up -d --force-recreate --wait --pull never api worker web"
```

归档必须成功解压后，SQL 导入才能开始。干净的暂存目录和回滚目录树位于卷的活动数据目录旁边，位于同一文件系统上。重新创建应用容器会使其挂载替换后的目录。`--single-transaction` 会回滚 SQL 错误，但无法包含目录切换。导入提交后，切换或启动失败可能使数据库和活动目录树不同步。如果启动失败，请再次停止 `api worker web`，包括那些确实已启动的容器。

`$ROLLBACK_DUMP` 指定一个私有的明文回滚转储。`mktemp` 会为每次尝试创建新的 `0600` 权限文件，不会覆盖 `before-restore.dump`、较早的回滚转储或现有符号链接目标。如果转储失败，命令会停止，应用仍保持停止。打印出的部分文件不是可用的回滚数据。请保留较早的回滚对，并在开始另一次恢复尝试前修复转储失败。

将打印的数据库转储路径与其匹配的远程 `$RESTORE/previous` 目录树路径一并记录。在检查恢复后的应用之前，请保留该配对。在需要回滚目录树时，不要移除 Docker 卷。若要在 SQL 提交后回滚，请保持应用停止，并将记录的 `$ROLLBACK_DUMP` 恢复到新创建的空数据库中。将失败的活目录树移动到单独路径以便诊断，然后将该次尝试记录的 `$RESTORE/previous` 目录树移回 `$APPDATA`，并重新创建应用容器。如果第一次目录移动失败，旧目录树仍在 `$APPDATA`。移动任何内容前，请检查两个路径。仅切换目录树不会回滚数据库。

明文快照使用 `cat` 代替 `age -d`，文件名为 `rakazo.dump` 和 `appdata.tgz`。请使用相同的干净目录流程。

若要恢复到新栈，请在上述流程之前创建 `rakazo_app` 角色。转储会向其授予权限，而在新栈上只有迁移步骤会创建它，因此没有它 `pg_restore` 会停止。不要先运行迁移：比快照更新的表会阻止恢复。该流程的最后一步启动会应用它们。

```bash
ssh deploy@app.example.com "cd /srv/rakazo && $COMPOSE up -d --wait postgres"
ssh deploy@app.example.com "cd /srv/rakazo && $COMPOSE exec -T postgres sh -c 'psql -U \"\$POSTGRES_USER\" -d \"\$POSTGRES_DB\" -c \"CREATE ROLE rakazo_app NOLOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE\"'"
```

计划备份默认使用 `/srv/rakazo`。对于其他部署目录，请在由 root 拥有的 `/etc/rakazo/backup.env`（权限 `0600`）中设置 `RAKAZO_DEPLOY_DIR=/absolute/path/to/checkout`。服务每次运行都会读取此可选文件；脚本使用所选检出的 `.env` 和生产 Compose 文件。如果栈是使用自定义 `-p` 启动的，请在该文件中设置相同的 `COMPOSE_PROJECT_NAME`。也请在那里设置保留和空间设置。更新现有安装时，请重新安装脚本和单元，然后运行 `systemctl daemon-reload`；拉取仓库不会更新 `/usr/local/sbin` 中的副本。

若要使用专用备份磁盘，请持久挂载它，并在 `/etc/fstab` 中将其 `backups` 目录绑定挂载到 `/var/backups`。在绑定挂载选项中添加 `x-systemd.requires-mounts-for=/mnt/your-backup-volume`。设置 `RAKAZO_BACKUP_REQUIRE_VOLUME=1`，并在 `[Unit]` 下添加包含 `RequiresMountsFor=/var/backups` 和 `AssertPathIsMountPoint=/var/backups` 的服务 drop-in。如果挂载缺失或指向根文件系统，脚本随后会拒绝回退到根存储。

监控为可选启用。请将 `host-alert.py` 安装为 `/usr/local/sbin/rakazo-host-alert`，将 `check-host.sh` 安装为 `/usr/local/sbin/rakazo-host-check`，将 `check-services.py` 安装为 `/usr/local/sbin/rakazo-check-services`（均可执行），然后安装随附的主机检查服务和定时器，并启用 `rakazo-host-check.timer`。检查每五分钟运行一次，报告磁盘空间不足、备份失败、已验证备份超过 36 小时，或缺少已配置的 IPv4 SSH 规则。若要同时检查 API 和 worker 容器，请在 `backup.env` 中将 `RAKAZO_MONITOR_COMPOSE_PROJECT` 设置为 Compose 项目名（生产环境为 `rakazo-prod`）。worker 探测会检查心跳和对账的新鲜度。如果容器监控在其他地方管理，请保持该变量未设置。

专用卷检查仅由 `backup.env` 中的 `RAKAZO_BACKUP_REQUIRE_VOLUME=1` 启用。相同的警报会在一天内被抑制；恢复会发送单独的通知。

警报默认发送到系统日志；无需外部服务。若要通过 Slack 发送，请创建一个仅 root 可读的 `/etc/rakazo/alerts.json`，内容为 `{"slack_webhook":"https://hooks.slack.com/services/REPLACE/ME/SECRET"}`。切勿提交此文件。若要在备份失败时立即通知，还需安装 `rakazo-backup-alert.service`，并将 `infra/systemd/rakazo-backup-alerts.conf.example` 复制到 `/etc/systemd/system/rakazo-backup.service.d/alerts.conf`。安装单元或 drop-in 后请运行 `systemctl daemon-reload`。基础备份服务不要求监控工具。

主机加固会保留现有防火墙规则，并将 `firewall-change.sh` 安装为 `/usr/local/sbin/rakazo-firewall-change`。后续防火墙编辑请使用 `sudo --preserve-env=SSH_CONNECTION /usr/local/sbin/rakazo-firewall-change apply COMMAND...`。这要求保留 `SSH_CONNECTION`，会同时保存 `/etc/ufw` 和 `/etc/default/ufw`，并在运行命令前设置三分钟回滚。请打开一个**新的 SSH 连接**并运行打印出的 `confirm TOKEN` 命令；来自原始连接的确认会被拒绝。未确认的更改会恢复已保存的规则和默认策略。该保护不适用于任意直接的 `ufw` 命令或 SSH 守护进程配置更改。

若要从 CI 部署，请将 `infra/compose/deploy-launcher.sh` 安装为 `/usr/local/sbin/rakazo-deploy-main`，并在 deploy 用户的 `authorized_keys` 中给 CI 一个仅限该命令的密钥（`restrict,command="/usr/local/sbin/rakazo-deploy-main" ssh-ed25519 …`）。CI 仅在其检查通过且 `ci.yml` 已发布镜像后部署 main 提交，因此主机会拉取 `<RAKAZO_DEPLOY_IMAGE>:sha-<commit>`，而不是在活动流量旁构建。对于检出所跟踪的 GitHub 仓库，`RAKAZO_DEPLOY_IMAGE` 默认为 `ghcr.io/<owner>/<repo>/app`，因此 fork 会拉取其自身 CI 发布的内容。如果拉取失败或耗时超过 `RAKAZO_DEPLOY_PULL_TIMEOUT`（默认 `5m`），部署会记录警告并在主机上构建检出；将 `RAKAZO_DEPLOY_IMAGE=`（空）设置为始终构建。此仓库的镜像是公开的，因此主机无需登录注册表；对于私有 fork 包，请以 root 身份使用仅有包读取权限的令牌执行 `docker login ghcr.io`。部署会在运行中的容器旁启动每个新的 API、Web 和 worker 容器，并仅在新容器健康后停止旧容器，因此部署不会使站点离线或暂停聊天，然后等待 `https://$RAKAZO_HOST/health`，失败时通过恢复之前容器运行的镜像来回滚。迁移运行后，新旧 API 容器会共同服务几秒钟，因此迁移必须与上一个发布版本保持兼容：先添加，并且只在后续部署中删除或重命名。拉取、构建和启动都有时间限制，因此卡住的步骤会使部署失败而不是一直持有锁；发现锁被持有的部署会以非零状态退出。部署在可用空间少于 `RAKAZO_DEPLOY_MIN_FREE_GB`（默认 `5`）时拒绝启动，健康滚动发布后会保留当前和上一个应用镜像（上一个标记为 `rakazo-rollback`），移除未标记的镜像，并将回退构建留下的构建缓存修剪到 `RAKAZO_DEPLOY_BUILD_CACHE_GB`（默认 8 GB）。对于位于 `/srv/rakazo` 之外的检出，请将 `RAKAZO_DEPLOY_DIR=/absolute/path`（以及其中任何设置）放入由 root 拥有且 deploy 用户可读的 `/etc/rakazo/deploy.env`。启动器会从 `origin/main` 运行 `infra/compose/deploy-main.sh`，因此部署更改会在下次部署时生效；只有启动器本身的更改需要 `sudo install -m 0755 infra/compose/deploy-launcher.sh /usr/local/sbin/rakazo-deploy-main`。

#### 时间点恢复

夜间备份最多可能丢失一天的数据。时间点恢复会将数据库的预写日志（WAL）流式传输到兼容 S3 的对象存储，并每 24 小时执行一次基础备份，因此数据库可以恢复到最近 `PITR_RETAIN_DAYS`（默认 `7`）内的任意时刻，而服务器丢失大约只损失一分钟的写入。它仅涵盖数据库；请保留夜间备份用于应用数据。它默认关闭，需要生产 Compose 文件以及 Postgres 18。

可选的 `pitr` 服务通过内部 `data` 网络使用 `pg_receivewal` 流式传输 WAL，使用仅用于复制的登录和复制槽，并从自己的网络上传，因此 Postgres 不保留互联网访问。只要有写入，Postgres 至少每分钟关闭一个 WAL 段（`archive_timeout`）。每个段和基础备份在离开容器之前都会使用 [age](https://age-encryption.org) 加密到公共接收者，与夜间备份相同，因此服务器无法读取自己的备份。你可以使用相同的接收者。

该槽会保留尚未到达 sidecar 的 WAL，因此 sidecar 重启不会留下间隙。如果上传停滞，磁盘使用量仍保持有界：sidecar 最多保留 `PITR_MAX_WAL_GB`（默认 `4`）的压缩 WAL 等待上传，然后暂停流式传输，Postgres 会为槽保留最多同样多的数据（`max_slot_wal_keep_size`）。超过该值后，Postgres 会丢弃该槽的 WAL，恢复会出现间隙，sidecar 在重新连接后会执行新的基础备份。

请使用独立的存储桶。其凭据需要列出、读取、写入和删除其中对象；删除仅移除超过保留窗口的备份。设置 `PITR_RETAIN_DAYS=0` 时不会删除任何内容，因此无需删除权限，由存储桶的生命周期规则处理过期。将以下内容添加到 `.env`：

```env
COMPOSE_PROFILES=pitr
PITR_DATABASE_PASSWORD=replace-with-openssl-rand-hex-24
PITR_BUCKET=example-rakazo-pitr
PITR_ENDPOINT=https://s3.example.com
PITR_REGION=example-region
PITR_ACCESS_KEY_ID=replace-me
PITR_SECRET_ACCESS_KEY=replace-me
PITR_AGE_RECIPIENTS=age1exampleprimaryrecipient age1examplerecoveryrecipient
# Optional: PITR_PREFIX (a key prefix), PITR_PATH_STYLE=true (path-style bucket addressing),
# PITR_RETAIN_DAYS, PITR_MAX_WAL_GB.
```

`COMPOSE_PROFILES` 以逗号分隔；与更新器一起使用时为 `updater,pitr`。对于 AWS S3，请保持 `PITR_ENDPOINT` 未设置。然后从检出中开启它：

```bash
sudo infra/compose/pitr.sh enable
```

这会创建 `rakazo_pitr` 复制登录，在 `pg_hba.conf` 中允许它，设置 `archive_timeout` 和 `max_slot_wal_keep_size`，并在不重启 Postgres 的情况下重新加载它。随后 sidecar 会执行其首次基础备份。更改 `PITR_DATABASE_PASSWORD` 或 `PITR_MAX_WAL_GB` 后，或将 Postgres 移到新集群后，请再次运行 `enable`。上传按集群的系统标识符分组，因此新集群绝不会覆盖旧集群的 WAL。

当上传等待超过十分钟、流式传输暂停、没有来自槽的流式传输，或最后一次基础备份超过 30 小时，sidecar 的健康检查会失败。设置 `RAKAZO_MONITOR_COMPOSE_PROJECT` 后，主机检查会对此发出警报。详情见：

```bash
sudo docker compose --env-file .env -f infra/compose/docker-compose.prod.yml exec pitr rakazo-pitr health
```

恢复可在任何装有 Docker 和此检出的机器上运行。身份信息通过 stdin 传入，并保留在恢复容器的内存中。请证明最新时间点可以恢复，恢复到一个事后移除的临时卷中。请在启用后、更改 PITR 脚本后以及定期运行它：

```bash
sudo infra/compose/pitr.sh drill < rakazo-backup.key
```

在服务器之外运行时，请将 `PITR_ENV_FILE` 设置为仅包含 `PITR_` 存储设置的文件。若要将生产环境恢复到某个时刻，请停止所有写入数据库的进程，并恢复到其卷中。当前集群会在卷内移到一旁，而不会删除。除非时间指定了时区，否则按 UTC 读取：

```bash
COMPOSE="sudo docker compose --env-file .env -f infra/compose/docker-compose.prod.yml"
ssh deploy@app.example.com "cd /srv/rakazo && $COMPOSE stop api worker web pitr postgres"
ssh deploy@app.example.com \
  "cd /srv/rakazo && sudo infra/compose/pitr.sh restore '2026-01-31 09:41:00+00' rakazo-prod_postgres" \
  < rakazo-backup.key
ssh deploy@app.example.com "cd /srv/rakazo && $COMPOSE up -d --wait"
```

恢复会使用目标时间之前完成的最新基础备份，重放 WAL 至目标时间，并提升结果，这会启动新的时间线；sidecar 会为其执行新的基础备份。恢复期间请暂停 CI 部署。确认恢复后的数据库无误后，移除旧集群：`$COMPOSE run --rm --no-deps --entrypoint sh postgres -c 'rm -rf "$PGDATA".before-restore-*'`。

若要关闭，请从 `COMPOSE_PROFILES` 中移除 `pitr`，然后运行 `sudo infra/compose/pitr.sh disable`。它会移除 sidecar、槽（这样 Postgres 不再为其保留 WAL）、登录和设置。已上传的备份仍保留在存储桶中。

#### 主机审计跟踪

`harden-host.sh` 会为对 SSH 密钥、sudoers、账户、`/etc/rakazo`、部署的 `.env`、`/usr/local/sbin`、systemd 单元、cron 以及 Docker 守护进程配置的写入安装审计规则。目录尚不存在的规则（例如首次克隆前的 `.env`）会被跳过并给出提示；目录存在后请重新运行脚本。任何拥有 root 的人都可以清除本地日志，因此只有记录离开主机后才有帮助。

若要传输日志，请创建一个仅 root 可读的 `/etc/rakazo/audit-ship.env`，将接收端的令牌放入 `/etc/rakazo/audit-ship.token`，然后重新运行 `harden-host.sh`。只有这时它才会将 `audit-ship.py` 安装为 `/usr/local/sbin/rakazo-audit-ship` 并启用 `rakazo-audit-ship.service`。接收端是任何接受带 bearer 令牌的 JSON 事件数组的 HTTPS 端点，例如 Axiom 的 `https://api.axiom.co/v1/datasets/<dataset>/ingest`。

```env
RAKAZO_AUDIT_SINK_URL=https://ingest.example.com/v1/events
# Optional: name the SSH keys you expect (fingerprints from `ssh-keygen -lf key.pub`).
RAKAZO_AUDIT_KNOWN_KEYS=SHA256:replace-with-fingerprint=laptop SHA256:replace-with-fingerprint=ci
# Optional: RAKAZO_AUDIT_TOKEN_FILE (default /etc/rakazo/audit-ship.token), RAKAZO_AUDIT_HOST
# (default: the hostname), and RAKAZO_AUDIT_HEARTBEAT_SECONDS (default 10800, three hours).
```

请使用只能写入该目标的令牌，这样被攻破的主机无法读取或删除它已发送的内容。传输器会跟踪 `/var/log/auth.log` 和审计日志，并发送 `ssh.login`（包含 `key_name`，未列出的密钥为 `unknown`）、`ssh.failed`、`sudo.command`、`su`、`identity.change` 和 `file.change`（包含规则的 `watch` 键和更改的 `paths`），以及启动时和每隔 `RAKAZO_AUDIT_HEARTBEAT_SECONDS` 发送的 `shipper.heartbeat`。每个事件都包含 `event`、`host`、`source`、`message` 和 `_time`。偏移量仅在接收端接受批次后前进，失败会按退避重试，因此事件至少送达一次。首次启动时，它会发送当前认证日志，并从审计日志末尾开始跟踪。安装监控后，当配置了接收端但传输器未运行时，主机检查会发出警报。

在目标端告警，而不是在主机上。以下是起点，此处以 Axiom APL 编写，但在任何日志存储中都是普通过滤器：

| 警报 | 查询 |
| --- | --- |
| 使用未命名密钥登录 | `where event == "ssh.login" and key_name == "unknown"` |
| 被监视文件发生变化 | 在你自己的部署和维护之外的 `where event == "file.change"` |
| 在 deploy 账户之外使用 root | `where (event == "sudo.command" and user != "deploy") or event == "su" or event == "identity.change"` |
| 传输停止 | 某 `host` 超过两个心跳间隔没有 `shipper.heartbeat` |

### 生产栈上的 Docker 计算机

在每次 Compose 调用中，将 `infra/compose/docker-compose.prod.docker.yml` 叠加到基础文件之后，以本地 Docker 容器而非远程提供商运行 Bot 计算机：

```bash
# Pull only the pull-only dependency images (postgres, caddy, busybox);
# --pull never fails when they are absent locally.
docker compose --env-file .env \
  -f infra/compose/docker-compose.prod.yml \
  -f infra/compose/docker-compose.prod.docker.yml \
  pull --ignore-buildable
docker compose --env-file .env \
  -f infra/compose/docker-compose.prod.yml \
  -f infra/compose/docker-compose.prod.docker.yml \
  up -d --build --wait --wait-timeout 300 --pull never
```

在此拓扑中，`api`、`worker`、`web`、`supervisor` 和 `computer` 始终从检出构建——`pull --ignore-buildable` 只涵盖没有 `build` 部分的依赖。若要部署已发布的应用镜像而不是构建，请使用不带覆盖层的基础文件。如果 `docker compose up --help` 缺少 `--wait-timeout`（较旧的 Compose），请去掉 `--wait`，改用 `docker compose ... ps` 验证；单独使用 `--wait` 可能在一次性服务上挂起。

覆盖层添加 supervisor（应用镜像，`user: root`，Docker socket）、一次性的 `computer` 镜像构建和 `data-init` 所有权修复，将 API 和 worker 指向 `http://supervisor:7091`，并将 `SANDBOX_PROVIDER=docker` 设为默认值。它需要在 `.env` 中提供专用的 `SANDBOX_SUPERVISOR_TOKEN`；`RAKAZO_COMPUTER_*` 和 `SANDBOX_*` 限制按 `.env.example` 中的说明适用。与更新器一样，supervisor 在主机上具有 root 等效权限：它不发布端口，仅加入内部 `app` 网络，且 Caddy 没有到它的路由。Bot 计算机是每个 Bot 网络上的同级容器，只有 supervisor 和 `web` 屏幕代理加入这些网络。

当同时启用 `updater` profile 时，请给 sidecar 相同的文件列表和重建集合，以免更新后 supervisor 仍停留在上一个应用镜像：

```env
RAKAZO_COMPOSE_FILE=infra/compose/docker-compose.prod.yml:infra/compose/docker-compose.prod.docker.yml
RAKAZO_UPDATE_SERVICES=supervisor
```

更新器会拉取并重建服务，但无法重建 `computer` 存根镜像（`pull_policy: build` 无法拉取）。当计算机镜像应更改时——例如更新检出后——请在主机上重建它：

```bash
docker compose --env-file .env \
  -f infra/compose/docker-compose.prod.yml \
  -f infra/compose/docker-compose.prod.docker.yml \
  build computer
```

## 恢复

对于由 `scripts/backup.sh` 创建的备份，请使用开发 Compose 栈中的空 `rakazo` 数据库。脚本会在接触数据库之前，在干净的同级目录中验证并解压主目录归档，然后停止 API、worker 和 supervisor。它会拒绝作为符号链接或非目录的 `data/` 路径。在运行脚本之前，请停止 Bot 计算机以及任何其他写入此数据库或目录树的进程。

SQL 导入在单个事务中运行，并在第一个错误处停止，包括与现有表的冲突。无效的归档或失败的导入会使当前数据目录树保持不变。SQL 成功后，脚本会将当前目录树移动到 `data.rollback.<random>/data`，打印该路径，并用保存的目录树替换 `data/`。快照中不存在的文件不会保留在活动目录树中。缺少主目录归档或因省略主目录而产生的空归档会使 `data/` 保持不变。包含空 `data/` 目录的归档会将其替换为空目录树。

应用服务仅在导入和目录树替换成功后启动。一旦开始关闭写入者，后续的失败或中断会使脚本再次尝试停止 API、worker 和 supervisor，包括在最终启动失败前已启动的服务。即使清理失败，脚本也会保留原始失败状态。如果 Docker 无法停止服务，请在恢复前停止它们。

SQL 提交后的失败无法自动回滚数据库。请保持应用停止，保留两个目录树，并在将回滚目录树移回 `data/` 之前恢复匹配的数据库。如果你需要该回滚，请保留恢复之前的单独数据库备份。此脚本不会使用生产快照的自定义格式 `rakazo.dump` 或 `appdata.tgz`。

```bash
./scripts/restore.sh backups/<stamp>
```

## 升级

基于已发布版本标签的 Compose 部署，通过移动该标签来完成升级：

```bash
docker compose --env-file .env -f infra/compose/docker-compose.prod.yml pull api worker web
docker compose --env-file .env -f infra/compose/docker-compose.prod.yml \
  up -d --wait --pull never api worker web
```

使用默认 `local` 标签的部署没有可拉取的仓库，因此改为重新构建检出目录来升级：

```bash
git pull
GIT_SHA=$(git rev-parse HEAD) docker compose --env-file .env -f infra/compose/docker-compose.prod.yml \
  up -d --wait --pull never --build api worker web
```

在新 API 健康、且 worker 和 web 容器运行之前，`up --wait` 不会报告成功。API 只有在 `migrate` 容器完成后才会启动，因此迁移失败会阻止新 API 启动。CLI 重建失败不会自动回滚；请用之前的 `RAKAZO_IMAGE_TAG`（或重新构建 `local`）以及 `up -d --wait --pull never` 来恢复。

updater sidecar 拥有自己的镜像和标签，因此更新永远不会重建正在执行更新的进程。要有意移动它，请将 `RAKAZO_UPDATER_IMAGE_TAG` 设为完整的 `sha-<commit>` 标签，然后运行 `docker compose … pull updater && docker compose … up -d --wait --pull never updater`。Sidecar 的 `/apply` 和 `/rollback` 会在可能时通过重新部署先前缓存的镜像，从失败的重建中恢复；如果这也失败，它们会报告可能存在混合版本运行时。

源码检出（而非 Compose）仍按旧方式升级：拉取，用 `GIT_SHA=$(git rev-parse HEAD)` 重新构建，运行 `pnpm db:migrate`，然后重启 API 和 worker。产品契约在云端和自托管之间保持兼容。

### 升级到独立的应用数据库登录

带有[数据库角色](#database-roles)的发布版本需要在 `.env` 中提供 `POSTGRES_APP_PASSWORD`。桌面应用、`install-images.sh`、updater sidecar 以及 `infra/compose/deploy-main.sh` 会在其缺失时自动添加。其他情况下，请在拉取之前自行添加（`openssl rand -hex 16`），否则 Compose 会在配置校验阶段停止并提示 `Set POSTGRES_APP_PASSWORD in .env`。在首次启动时，API 会创建 `rakazo_app` 登录，随后 API 和 worker 以该登录连接。其他方面没有变化，升级也不会重写任何数据。

如果某个功能在行级安全下行为异常，请以超级用户身份（Compose 所有者即为超级用户）对 `DATABASE_URL` 中的登录（Compose 中为 `rakazo_app`）运行 `ALTER ROLE <login> BYPASSRLS;`，然后重启 API 和 worker。角色属性不会被继承，因此将其授予 `rakazo_app` 对单独的登录没有任何作用。此后应用照常运行，但启动时会有一条警告，后续迁移不会改动该登录。用 `NOBYPASSRLS` 再次重启即可撤销，然后在 API 和 worker 日志中搜索 `violates row-level security` 和 `without a tenant or system context`。较旧的发布版本会忽略这个额外变量并以所有者身份连接，但同一天发布的版本还会对内容进行静态加密：在回滚到这些版本之前，请先运行 `content-encryption decrypt`（[内容加密](./content-encryption.md#rollout)），否则较旧的发布版本会显示密文。

### 升级到 Postgres 18

生产和源码检出的 Compose 文件运行 Postgres 18。在此之前创建的安装将数据保存在 Postgres 16 卷（`pgdata`）中，Postgres 18 无法打开该卷。在数据被复制到新的 `postgres` 卷之前，数据库容器会退出，并记录它在 `/var/lib/postgresql/16/docker` 中发现了 PostgreSQL 数据，生产部署也会在替换任何内容之前停止。不会删除任何内容，也不会以空数据启动。新安装无需任何操作。已发布镜像文件（`docker-compose.images.yml`，桌面应用也会使用）仍停留在 Postgres 16。

先做一次备份，并在备份上演练（[加密备份](#encrypted-and-off-site-backups)）。然后更新检出目录，并以 root 身份运行升级：

```bash
cd /srv/rakazo
git pull --ff-only
sudo infra/compose/upgrade-postgres.sh
```

当该技术栈使用其他 Compose 文件时，例如 Docker 计算机 overlay 或源码检出技术栈，请将它们全部传入：`sudo RAKAZO_DEPLOY_DIR="$PWD" infra/compose/upgrade-postgres.sh infra/compose/docker-compose.yml`。如果该技术栈在自定义 `-p` 下运行，请设置 `COMPOSE_PROJECT_NAME`；在受限网络上，请将 `RAKAZO_POSTGRES_16_IMAGE` 设为你先前 Postgres 16 镜像的镜像源（`POSTGRES_IMAGE` 现在必须指向 Postgres 18 镜像）。

该脚本会停止技术栈，使用 `pg_dumpall` 从 Postgres 16 复制每个角色（含其密码）和数据库，并比较角色、成员关系、所有权、授权、行级安全策略、序列以及每张表的行数。它还会检查 `rakazo_app` 能否使用 `POSTGRES_APP_PASSWORD` 登录且不绕过行级安全。只有这些都通过后，它才会切换 Postgres 18 并重启此前正在运行的服务。整个复制期间站点会下线，耗时大致相当于转储并恢复数据库：小数据库需要几分钟。它需要足够的空闲磁盘来再容纳一份数据库副本，外加 1 GiB。成功后再运行一次不会做任何事。如果任何步骤失败，它会停止，技术栈保持停止状态，Postgres 16 数据保持不变；修复错误后再次运行即可。在生产主机上，然后重新运行此前停止的部署。

Postgres 16 卷保持原样，以只读方式挂载。要回滚，请检出上一个发布版本并启动技术栈：它会在原始数据上运行 Postgres 16。升级之后写入的任何内容只存在于 Postgres 18 上，因此要么立即回滚，要么完全不回滚，并且在再次升级之前暂停 CI 部署。一旦不再需要回滚，请停止 `postgres`，删除 `<project>_pgdata` 卷并再次启动它；Compose 会将该卷重新创建为空。

### 空间隐私边界迁移

在跨迁移 `20260830200000_space_scope_names_and_user_credentials` 升级之前，请检查每个现有的模型和语音凭据仍属于其空间的成员。此查询使用迁移前的 `workspaceId` 列名，必须返回零行：

```sql
SELECT 'model' AS credential_type, credential."id", credential."userId",
       credential."workspaceId" AS "spaceId"
FROM "user_model_credentials" AS credential
LEFT JOIN "space_members" AS membership
  ON membership."spaceId" = credential."workspaceId"
 AND membership."userId" = credential."userId"
WHERE membership."id" IS NULL
UNION ALL
SELECT 'voice', credential."id", credential."userId", credential."workspaceId"
FROM "user_voice_credentials" AS credential
LEFT JOIN "space_members" AS membership
  ON membership."spaceId" = credential."workspaceId"
 AND membership."userId" = credential."userId"
WHERE membership."id" IS NULL;
```

该迁移会重命名 API 和 worker 使用的列，因此需要协调切换，而不是在线滚动迁移。请停止旧的 API 和 worker，应用迁移，然后一起启动新版本。其锁等待时间有上限，因此发生争用时迁移会失败，而不是让应用流量无限期排队。

<a id="published-images-and-tags"></a>

### 已发布的镜像和标签

`.github/workflows/publish-server-image.yml` 发布到 `ghcr.io/<owner>/<repo>/…`，该路径由 `${{ github.repository }}` 派生而非硬编码，因此 fork 的 CI 会填充 fork 自己的命名空间。对于此仓库，即：

| 镜像 | 内容 |
| --- | --- |
| `ghcr.io/iishows/doitx/app` | api、worker、web 和 sandbox 监督进程 —— 一个镜像，多个命令 |
| `ghcr.io/iishows/doitx/computer` | 用作每个 Bot 计算机的 Linux 桌面 |
| `ghcr.io/iishows/doitx/updater` | updater sidecar，外加 Docker CLI |

`infra/compose/docker-compose.images.yml` 是这些应用和计算机标签加上 Postgres 的免检出路径。监督进程仅从内部网络上的应用镜像运行（不是单独的已发布监督进程镜像，也没有主机端口）。一旦 `RAKAZO_IMAGE_TAG` 被设为已发布的值，生产 Compose（`docker-compose.prod.yml`）也可以拉取相同的应用标签。

如果你从自己的 fork 部署，请将 `RAKAZO_IMAGE` 和 `RAKAZO_UPDATER_IMAGE` 设为你的命名空间 —— 你的 CI 无法发布到别人的命名空间。

| 标签 | 发布时间 | 是否移动？ |
| --- | --- | --- |
| `local` | 无 —— 由 `up --build` 在本地构建 | 原地重建 |
| `local-<full-commit>` | 无 —— 由 fork 更新在服务器上构建 | 从不 |
| `vX.Y.Z`、`vX.Y` | 发布版本标签 | 惯例上不移动 / 在补丁发布时移动 |
| `latest` | 仅稳定的 `vX.Y.Z` 标签（不含预发布版） | 是，移动到最新的稳定发布版本 |
| `sha-<full-commit>` | 每个 main 提交、发布版本标签和手动运行 | 以源寻址；由 updater sidecar 使用 |
| `edge` | 推送到 main | 是，移动到最新的 main 构建 |

每次发布（包括来自 main 合并的 `edge`）都是多架构的（`amd64` + `arm64`）：每种架构都原生构建 —— 当 `DEPOT_PROJECT_ID` 仓库变量指定了项目时在 Depot 上构建，否则在 GitHub 的 runner 上构建 —— 然后为每个镜像组装一份清单。Depot 构建会在同一个作业中发布并证明每个镜像；原生 GitHub 构建则在单独的发布作业中合并各架构的产物。main 上的 CI 修订会独立校验。发布锁按镜像划分，被取代的 main 构建会保留其提交标签，而不会移动 `edge`。镜像和发布队列会保留待处理的作业，因此较慢的旧运行不会取代较新的运行。生产部署仍然串行化，并部署通过其检查的确切修订。在任何标签指向新的应用镜像之前，如果镜像中包含 `.env` 文件、`.git` 目录或私钥，CI 会使发布失败（`infra/compose/check-image.sh`）。在稳定版 `vX.Y.Z` 发布之前，GHCR 可能只有 `edge` 和 `sha-*` 标签；除非该标签存在于仓库中，否则不要固定 `latest`。

自行构建镜像不需要 QEMU。`docker compose up --build` 会为主机自身的架构构建，而发布多架构镜像的 fork 应当照 `publish-server-image.yml` 的做法：在原生 runner 上构建每种架构（GitHub Actions 为公共仓库提供 `ubuntu-24.04-arm`），并将各摘要合并为一份清单。如果你没有原生 arm64 机器，QEMU 模拟（`docker/setup-qemu-action`、`binfmt`）仍然可用，但会慢很多倍 —— 对 `computer` 镜像来说是数小时而非数分钟。

updater 会解析最新的稳定 `vX.Y.Z` 源标签，但部署的是其 `sha-<full-commit>` 镜像，而不是 `latest` 或会移动的次要标签。仓库标签不是 OCI 摘要，GHCR 包写入者可以替换它，因此信任边界仍然是本仓库的发布凭据。该工作流通过使用固定 SHA 的 action、只读的拉取请求作业、固定摘要的基础镜像、SBOM/来源输出以及 GitHub 构建证明来缩小该边界。需要在仓库级别进行内容寻址的运维人员，可以在自动 updater 之外将 `RAKAZO_IMAGE` 固定为经过验证的摘要。

回滚从不联系仓库：它从本地 Docker 缓存重新部署先前的标签，因此之后的标签移动不会改变回滚内容。在下次更新被接受之前，不要清理先前的应用镜像。如果镜像缺失，回滚会失败关闭，而不是在旧标签下拉取新内容。

要在首次填充仓库，请手动运行该工作流（`workflow_dispatch`）或推送一个 `v*` 标签。手动运行会生成 `sha-<full-commit>`；只有稳定的 `vX.Y.Z` 标签（不含预发布后缀）才会生成 `latest`，任何 `v*` 标签都会生成 semver 标签。updater 会忽略预发布版，并在稳定版 `vX.Y.Z` 出现之前拒绝官方路径。

<a id="updater-sidecar"></a>

### Updater sidecar

Compose 生产部署在专用的 `control` 网络上提供可选的 `updater` profile。常规部署不会启动它，也不需要其凭据。要启用它，请设置专用的 `RAKAZO_UPDATER_TOKEN` 并显式启动该 profile：

```bash
docker compose --env-file .env -f infra/compose/docker-compose.prod.yml \
  --profile updater up -d --build updater
```

它在 `http://updater:7092` 上以 `RAKAZO_UPDATER_TOKEN` 暴露 `/health`、`/state`、`/plan`、`/apply` 和 `/rollback`。上述运维 CLI 升级不需要它；sidecar 用于通过该私有 HTTP API 进行自动化的 apply/rollback。只有部署工具会调用它；应用账户没有更新端点，应用 API 也不会收到 updater 令牌。

API 无法更新自身 —— 它的镜像中没有 `.git`，容器内也没有任何东西会重启它 —— 因此这项工作发生在单独的 `updater` 容器中，该容器的生命周期长于重建过程：

- *官方仓库：* 使用 `git ls-remote --tags` 解析最新的稳定发布版本及其源码提交，将对应的完整 `sha-<commit>` 镜像标签固定到 `.env`，把即将被替换的标签保存在 `RAKAZO_IMAGE_TAG_PREVIOUS` 中，显式拉取新镜像，然后运行 `up -d --wait --pull never`。服务器上不会执行任何构建。
- *Fork（高级）：* fork 没有已发布的镜像，因此 sidecar 会在 `RAKAZO_DEPLOY_DIR` 中快进检出目录并运行 `up -d --build`。这会在服务器上构建，耗时数分钟而非数秒。只将其指向你控制并审查过的 fork —— sidecar 会通过等价于 root 的 Docker socket 运行该 Compose 文件。

更新和回滚一次只运行一个。拉取失败不会影响正在运行的服务；重建失败会恢复先前的环境固定值，并尝试重新部署缓存的先前镜像。fork 构建失败还会恢复更新前的分支和提交（包括检出成功但合并未成功的情况），因此之后手动执行 `--build` 无法部署被拒绝或非预期的修订。数据库迁移不会被撤销。sidecar 从不重建自身，从不触碰 Postgres 或 Caddy，也从不运行迁移 —— 该顺序由 API 对 `migrate` 服务的依赖决定。

只接受 `https://` 和 `ssh://` 的 git 远程仓库。合并仅允许快进。脏的或未跟踪的源码树会在任何操作运行之前失败关闭（应用 Dockerfile 使用 `COPY . .`）。

### 部署目录必须是同一个路径

`RAKAZO_DEPLOY_DIR` 以与其读取时相同的路径绑定挂载到 updater 中（`${RAKAZO_DEPLOY_DIR}:${RAKAZO_DEPLOY_DIR}`），这是必需的，而不只是为了整洁。生产 Compose 将两侧的默认值都设为 `/srv/rakazo`；其他布局请设置该变量。当 updater 运行 `docker compose -p <project> --file $RAKAZO_DEPLOY_DIR/infra/compose/docker-compose.prod.yml up -d` 时，容器*内部*的 Compose CLI 会相对于该路径展开此文件中的相对绑定挂载 —— `../../.env`、`./Caddyfile.prod` —— 并将结果交给守护进程。守护进程必须能够解析相同的字符串，否则它会在你的 `.env` 和 Caddyfile 本该所在的位置静默创建空目录。Compose 会提供实际生效的 `-p` 值用于插值，但不会自动将其放入容器的环境，因此生产文件显式地将 `COMPOSE_PROJECT_NAME` 赋给 updater。独立的 sidecar 也可以改为设置 `RAKAZO_COMPOSE_PROJECT_NAME`；最终回退值为 `rakazo-prod`。如果没有这种传播，使用 `-p something-else` 启动的技术栈会被置之不理，而另一个带有全新空 Postgres 卷的项目会在旁边启动。

### 叠加 Compose overlay 的部署

`RAKAZO_COMPOSE_FILE` 接受一个列表，其分隔方式与 Compose 自身的 `COMPOSE_FILE` 相同（默认 `:`，或由 `COMPOSE_PATH_SEPARATOR` 指定）。每个条目都会按给定顺序成为独立的 `--file`，因此 updater 会协调与运维人员手动运行的相同技术栈：

```
RAKAZO_COMPOSE_FILE=infra/compose/docker-compose.prod.yml:ops/compose/overlay.yml
```

每个条目都会单独校验，并且必须位于 `RAKAZO_DEPLOY_DIR` 内。

如果 overlay 添加了从应用镜像构建的服务，请在 `RAKAZO_UPDATE_SERVICES` 中列出它（逗号分隔），以便它随其余服务一起被拉取、重建和回滚。否则更新会让该服务继续运行旧代码：

```
RAKAZO_UPDATE_SERVICES=supervisor
```

这些名称会追加到内置的 `api`、`worker`、`web` 之后，绝不会替代它们，因此这里的任何值都不会使核心服务从更新中遗漏。

因此，该值必须是**守护进程**看到的路径，而这并不总是你的 shell 看到的路径：

- **Linux。** 守护进程与主机共享文件系统，因此检出路径就是答案：`/srv/rakazo` 是默认且受支持的生产布局。当检出目录在别处时，请显式设置 `RAKAZO_DEPLOY_DIR`。
- **Docker Desktop（Windows/macOS）。** 守护进程运行在一个 VM 中，该 VM 将你的驱动器挂载到别的位置。在 Windows 上，`C:` 出现在 `/run/desktop/mnt/host/c`，因此位于 `C:\Users\you\rakazo` 的检出目录对应 `RAKAZO_DEPLOY_DIR=/run/desktop/mnt/host/c/Users/you/rakazo`。主机上的 Git 可能使用 `core.autocrlf=true`；updater 会忽略仅 CR 的差异，因此这不会阻止 `/apply`。部署前请验证挂载：

```bash
docker compose --env-file .env -f infra/compose/docker-compose.prod.yml \
  --profile updater run --rm updater git -C "$RAKAZO_DEPLOY_DIR" log --oneline -1
```

它必须打印出你检出目录的 HEAD。两个常见但错误的答案都会失败：原生 Windows 路径会被守护进程拒绝（`mount denied: … too many colons`，因为盘符的冒号与绑定挂载分隔符冲突），而 `/mnt/c/...` 会*静默*失败 —— 容器启动了，挂载却是空目录，updater 只会报告没有检出目录。

### Updater 的权限

updater 持有 Docker socket，该 socket 在主机上等价于 root。它被限制在尽可能窄的范围内：

- 没有 `ports`，因此主机上不发布任何内容。
- 仅接入与 API 共享的专用 `control` 网络。Caddy 未接入，因此反向代理没有到 updater 的路由。
- 除 `/health` 外的每条路由都需要共享的 bearer 令牌，并以常量时间进行比较。
- 进程环境只携带 updater 相关设置（`RAKAZO_UPDATER_TOKEN`、部署路径、镜像名、项目名）。应用密钥仍保留在绑定挂载的 `.env` 中，供 Compose 读取以进行插值；它们不会被加载到此容器中。
- Docker CLI 只存在于 updater 镜像中。api、worker 和 web 容器保持 `cap_drop: ALL` 且没有 socket。

启用 `updater` profile 要求 `RAKAZO_UPDATER_TOKEN` 是一个专用的随机值（生产环境中至少 32 个字符）。它必须不同于 `BETTER_AUTH_SECRET`、`SANDBOX_SUPERVISOR_TOKEN` 和 `SCREEN_PROXY_SECRET`。如果你不愿意授予该能力，请保持该 profile 禁用。

## 其他部署布局

API 和 worker 需要常驻进程；无服务器请求处理器并不够用。请使用根 `package.json` 支持的 Node.js 版本、Postgres 16 或更新版本，以及由 API 和 worker 共享的持久 `DATA_DIR` 卷，并配备加密的异地备份。各主目录会保留在该卷上，除非它们保存在[对象存储](#bot-homes-in-object-storage)中；其他 `DATA_DIR` 文件仍然需要共享该卷。

Web 应用、`/api` 和 `/rpc` 使用相同的 HTTPS 源。保留经过认证的屏幕代理路由。选择适合服务信任边界的[计算机提供商](#choosing-a-computer-provider)。`SIGNUPS_ENABLED` 和 `SIGNUP_ALLOWLIST` 会在每次 API 启动时从环境应用。`apps/www` 中可选的营销站点可以单独托管。

## 图像和视频生成

Bot 媒体工具默认禁用。为 worker（以及用于内联执行的 API）配置提供商及其通用 HTTP 连接：

```dotenv
MEDIA_GENERATION_PROVIDER=fal
MEDIA_GENERATION_BASE_URL=https://queue.fal.run
MEDIA_GENERATION_API_KEY=replace-with-media-api-key
MEDIA_GENERATION_IMAGE_MODEL=fal-ai/flux/schnell
MEDIA_GENERATION_VIDEO_MODEL=fal-ai/wan/v2.2-a14b/text-to-video
```

`MEDIA_GENERATION_PROVIDER` 接受 `disabled`（默认值）、`fal` 或 `fake`（仅用于离线测试）。基础 URL 是可选的，默认使用上面的 URL。只为你想要启用的能力设置图像/视频模型字段。兼容的服务器可以使用相同的连接字段；模型必须支持相应的 fal 队列 API 以及 Flux/Wan 的输入输出结构。凭据保留在服务器上。请在你的部署密钥配置中设置这些值；绝不要提交真实凭据。

Bot 使用 `generate_image` 附加一张 PNG，或使用 `generate_video` 提交一段四秒的 MP4。视频工具会返回作业 ID 以及排队/运行状态；再次使用 `jobId` 调用它即可查看进度并附加已完成的视频。已保存的作业可以在 worker 重启后由同一 owner/bot/thread 轮询。第一个版本要求通过 Bot 进行轮询；它不会在后台自动交付作业。使用现有的按 Bot 工具开关和操作审批规则来控制访问。两个工具默认都需要审批。Ticket board 运行会保持这些仅限聊天的媒体工具不可用，以便工单工作留在看板上。

每次运行最多允许两次提交（包括失败）。提交绝不会自动重试：响应丢失可能意味着提供商已接受请求并已计费。提供商错误不会包含远程响应体。请在你的提供商处配置账户预算和速率限制；运行次数上限不是货币预算。提供商的 429 响应会在同一模型上以递增的等待时间重试（2 秒、8 秒、20 秒，然后是 40 秒至 240 秒）：默认重试一次，可通过 `MODEL_STREAM_MAX_RETRIES` 配置为最多 10 次，整个循环上限为 20 分钟，因此提供商饱和时会暂停运行而不是使其失败。单次尝试等待响应头的时间仍最多为两分钟。输出必须同时满足 10 MiB 的媒体上限和配置的附件大小限制；更大的输出会被拒绝。

图像使用现有的内联聊天渲染。MP4 文件可以在 Web 和 Electron 上使用原生视频控件预览，并在移动端通过现有的原生文件流程打开/下载。不需要新的移动端播放器或设置界面。

## 连接移动客户端

iOS 和 Android 应用也可以在运行时指向自托管的源。在登录界面上，点击 **Use a custom server** 并输入与 `WEB_ORIGIN` 相同的 HTTPS 源（例如 `https://app.example.com`）。商店构建版本仍默认使用 `EXPO_PUBLIC_API_URL`；应用内设置是为自行运行 API 的用户提供的覆盖选项。更改服务器会使设备退出先前的任何会话。

纯 `http://` 仅允许用于私有 IP、`localhost` 或 `.local` 名称。通过 WireGuard 或 Tailscale 等 VPN 访问的主机名需要 HTTPS 以及手机信任的证书，例如通过 DNS 质询签发 Let's Encrypt 证书的真实域名。

### 通行密钥（Passkeys）

只要 `WEB_ORIGIN` 是 HTTPS 域名（开发环境中为 `localhost`），通行密钥就会启用；依赖方是该源的 host，因此现有通行密钥只在 `WEB_ORIGIN` 保持同一域名时继续有效。当 SSO 专用部署禁用密码登录时，它们会关闭。在 Web 上，浏览器会在具备平台认证器的地方提供它们。macOS 桌面应用使用系统通行密钥面板，该面板只服务发布版本关联的域名（`app.doitx.ai`），因此它对其他服务器隐藏通行密钥。

原生应用只有在域名为其背书、且应用是为该域名构建时（应用的关联域名在构建时来自 `EXPO_PUBLIC_API_URL`）才能使用该域名的通行密钥。要让某个构建使用此服务器的通行密钥，请设置：

```bash
# iOS and the macOS desktop app (dev.rakazo.desktop): <Apple Team ID>.<bundle id>, comma-separated.
# Served as /.well-known/apple-app-site-association.
PASSKEY_APPLE_APP_IDS=ABCDE12345.com.rakazo.app,ABCDE12345.dev.rakazo.desktop
# Android: SHA-256 fingerprints of the app signing certificates, comma-separated.
# Served as /.well-known/assetlinks.json and accepted as passkey origins.
PASSKEY_ANDROID_CERT_SHA256=AA:BB:...:FF
```

在设置某个平台的配置之前，该平台上的原生应用会对此服务器隐藏通行密钥。这两个文件都通过 Web 源提供，因此 Web 容器前面的反向代理必须将 `/.well-known/` 透传给容器。

## macOS 语音

当 API 运行在 macOS 上时，语音设置还会提供 **macOS**，它不需要密钥。API 使用内置的 `/usr/bin/say` 将每条回复渲染成音频片段，因此它会在收听者的设备上播放，并像其他语音一样停止。Docker 和 Linux 主机不会列出它。

## 语音摘要

默认关闭。设置 `VOICE_SUMMARY_MIN_CHARS`（例如 `600`），即可让语音将超过该字符数的 Bot 回复朗读为由该 Bot 自身模型撰写的简短摘要。每个摘要都是一次额外计费到该 Bot 的模型调用。聊天会保留完整回复，如果摘要调用失败，则会朗读完整回复。

## 上传大小

`MAX_UPLOAD_SIZE_MB` 以 MiB 为单位设置每个文件的聊天附件和计算机文件传输限制（1 MiB = 1,048,576 字节）。默认值为 `10`，并且必须是正整数。请在 `.env` 中设置它，并重启 API、worker 和 Docker 监督进程（如果使用）。Web、桌面和移动端使用服务器通告的限制。如果反向代理限制请求体，请为 base64 编码（约为文件大小的 4/3）和 JSON 封装留出空间。

<a id="shared-storage-migration"></a>

## 共享存储迁移

推送通知注册现在存放在 Postgres 中，并使用 `ENCRYPTION_KEY` 加密。每个 API 和 worker 副本都必须配置相同的密钥。注册仍绑定到其经过认证的会话；删除账户也会删除其注册。

配置了 `OBJECT_STORAGE_BUCKET` 后，新的产物内容会与计算机主目录一起使用现有的 S3 兼容连接。产物内容在上传前始终使用空间的内容密钥加密，并使用绑定到产物身份的认证分段。即使 `CONTENT_ENCRYPTION=off` 也是如此。元数据和访问检查仍留在 Postgres 中；客户端和沙箱既不会获得存储桶凭据，也不会获得公共对象 URL。没有对象存储时，产物继续使用本地卷。

现有的产物行在迁移之前会继续读取其本地文件。在将 API 或 worker 副本分散到多台机器之前，请迁移每个原始应用卷中的文件。先备份数据库和卷。部署模式迁移和新应用版本，然后停止**所有 API 和 worker 进程**（包括旧发布版本），同时在带有原始卷、`DATABASE_URL`、`ENCRYPTION_KEY`、内容主密钥和对象存储配置的维护容器中运行以下命令：

```sh
# Published image (run from /app/apps/api):
node dist/cli/shared-storage.js artifacts --dry-run
node dist/cli/shared-storage.js artifacts
node dist/cli/shared-storage.js push-tokens --dry-run
node dist/cli/shared-storage.js push-tokens

# Source checkout equivalents:
pnpm --filter @rakazo/api shared-storage artifacts
pnpm --filter @rakazo/api shared-storage push-tokens
```

产物迁移会上传并解密每个文件以进行验证，然后再有条件地更新其数据库存储键。它会保留原始本地文件，并跳过已迁移的行，因此中断的运行可以继续。上传后数据库失败可能会留下未被引用的对象；失败迁移后不要盲目删除对象。在迁移完成并验证之前，请保留本地原件。挂载卷中缺失的文件会被计为待处理，而对存在于该卷中的文件，迁移会继续进行。在每个原始卷上运行该命令，然后再次运行 `artifacts --dry-run`，在启动独立副本之前要求 `pending: 0`。由对象存储承载的产物要求对象存储保持配置；旧应用版本无法读取其新的键。本地内容加密 CLI 仅作用于本地产物；对象产物保持加密，并通过其头部中引用的密钥版本保留访问能力。

推送导入会保留具有活动会话的注册，跳过缺失/过期或无会话的注册、已在 Postgres 中注册的账户，以及由任何现有数据库注册拥有的设备。导入绝不会将设备交还给较旧的账户。它会给已处理的文件加上 `.migrated` 后缀进行归档。这些归档从不用作运行时回退，因此它们无法在登出后恢复注册。迁移期间被跳过的客户端会在下次打开应用时重新注册。验证导入后，请删除已归档的令牌文件。两条命令都完成后，重启 API 和 worker 进程。仅模式回滚仍与上一个发布版本兼容，但旧代码不会读取数据库注册或由对象存储承载的产物。
