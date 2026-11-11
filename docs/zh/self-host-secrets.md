# 自托管密钥清单

发布镜像与 Compose 部署所需的必填和可选凭据。

**切勿提交 `.env`，切勿将密钥值粘贴到 issue/PR 中，也切勿在未经显式备份和运维人员同意的情况下覆盖已有的 `.env`。**

## 发布镜像：安装脚本会填充什么

`bash install-images.sh`（在没有现成 `.env` 时）会复制 `.env.images.example`，并用 `openssl` 填充空白的必填键：

| 键 | 安装脚本填充方式 | 作用 |
| --- | --- | --- |
| `POSTGRES_PASSWORD` | `openssl rand -hex 16` | Compose 内部 Postgres 所有者密码（用于迁移） |
| `POSTGRES_APP_PASSWORD` | `openssl rand -hex 16` | 应用 `rakazo_app` 登录的密码，行级安全策略作用于该登录 |
| `BETTER_AUTH_SECRET` | `openssl rand -hex 32` | 认证/会话签名 |
| `ENCRYPTION_KEY` | `openssl rand -hex 32` | 加密静态存储的凭据 |
| `SCREEN_PROXY_SECRET` | `openssl rand -hex 32` | 签发短期 `/novnc/*` 屏幕能力令牌 |
| `SANDBOX_SUPERVISOR_TOKEN` | `openssl rand -hex 32` | API ↔ sandbox supervisor 认证 |

重新运行**会保留**已有的 `.env`（不会轮换密钥）；只有当旧 `.env` 缺少 `POSTGRES_APP_PASSWORD` 时才会追加。空白的必填键仍会在 Compose 校验阶段直接失败（`${VAR:?Set … in .env}`）。

手动生成（与安装脚本使用的形态相同）：

```bash
openssl rand -hex 16   # POSTGRES_PASSWORD, POSTGRES_APP_PASSWORD
openssl rand -hex 32   # BETTER_AUTH_SECRET, ENCRYPTION_KEY, SCREEN_PROXY_SECRET, SANDBOX_SUPERVISOR_TOKEN
```

源码检出方式的 `.env.example` 同样要求为 `infra/compose/docker-compose.yml` 提供 `POSTGRES_PASSWORD` 和 `POSTGRES_APP_PASSWORD`（同样使用 `openssl rand -hex 16` 形态）。使用可选的 `docker-compose.postgres-host.yml` 覆盖层时，将它们放入主机侧的 `DATABASE_MIGRATION_URL` 和 `DATABASE_URL`。保持密码对 URI 安全：Compose 会像镜像栈那样把它插值进 `DATABASE_URL`。`openssl rand` 生成的十六进制是安全的；`@ : / ? # %` 等字符则不安全。

已有的源码检出 `pgdata` 卷会保留首次初始化时的用户、密码和数据库（通常是过去硬编码的 `rakazo` / `rakazo`）。将这些值保留在 `.env` 中，或用 `ALTER ROLE` / 重命名在原位修改。只有在备份之后（或数据可丢弃时）才重建该卷；`docker compose down -v` 会删除所有 Postgres 状态。

源码检出的 `.env.example` 在注释中要求 **64 位十六进制** 的 `ENCRYPTION_KEY`；发布镜像安装脚本通过 `openssl rand -hex 32` 使用 32 字节十六进制（64 个十六进制字符）。无论哪种方式，都优先使用长且相互独立的随机值。不要在不同键之间复用同一个字符串。

## 独立性规则

以下必须是**相互独立**的随机值（不要将同一个密钥复制粘贴到多个键中）：

- `BETTER_AUTH_SECRET`
- `ENCRYPTION_KEY`
- `SCREEN_PROXY_SECRET`
- `SANDBOX_SUPERVISOR_TOKEN`
- `RAKAZO_UPDATER_TOKEN`（仅在启用 updater profile 时需要；≥32 个字符，并且也要与上述四项不同）

在凭据已存储后轮换 `ENCRYPTION_KEY` 会使旧密文无法读取。对于已有部署，除非你有意清除加密材料，否则请保留原始密钥。

`ENCRYPTION_KEY` 还会派生聊天、记忆和文件加密的默认主密钥，因此更改它也会使这些内容无法读取。若要将内容迁移出去，请设置 `ENCRYPTION_MASTER_KEYS` 并按 [content-encryption.md](content-encryption.md) 中所述执行轮换，它会重新包装空间密钥而不会使内容搁浅。之后保持 `ENCRYPTION_KEY` 不变：已存储的凭据仍依赖它。

## 可选键（不使用时留空）

来自 `.env.images.example`（镜像安装脚本）。不使用时留空：

| 键 | 何时需要 |
| --- | --- |
| `RAKAZO_DOITX_API_KEY` | 部署级 Doitx 路由密钥，当部署为其用户提供该密钥时 |
| `TYPESAFE_API_KEY` | 可选的 TypeSafe Jev Auto Review 验证器（`RAKAZO_AUTO_REVIEW_PROVIDER=jev`） |
| `COMPOSIO_API_KEY` | Composio 托管目录 |
| `E2B_API_KEY` / `DAYTONA_API_KEY` / `BOAT_API_KEY` | 当 `SANDBOX_PROVIDER` 不是 `docker` 时的远程计算机 |
| `EMAIL_PROVIDER` / `EMAIL_API_KEY` / `SMTP_URL` / `EMAIL_FROM` | 通过 Resend API 或 SMTP 的可选账户邮件 |
| `EXPO_ACCESS_TOKEN` | 当 Expo 项目启用增强推送安全时的移动推送 |
| 消息令牌（Slack、Telegram 等） | 仅在你启用这些界面时 |

对于最小化的发布镜像启动，可选项留空是正常的。Pipedream Connect 的键只出现在源码/Compose 的 `.env.example` 中，不在镜像示例中。

## 运维人员流程

```bash
bash install-images.sh --prepare-only   # creates .env + fills empties
# inspect key NAMES only if debugging; never log values
bash install-images.sh                  # pull + up; preserves .env
curl -fsS http://127.0.0.1:3100/internal/health
```

如果 `/internal/health` 中的 `sandbox` 为 `"none"`，或 supervisor 始终无法变为健康状态，请检查 Docker 计算机路径下的 `SANDBOX_SUPERVISOR_TOKEN` 是否已设置且非空。缺少令牌属于设置失败，而不是"稍后可选收紧"的事项。

## 不重新打印密钥的恢复

- 丢失 UI 密码：如已配置，使用 SMTP 恢复；否则运维人员身份恢复需带外进行（数据库）。在运行中的部署上，尽量不要随意轮换 `BETTER_AUTH_SECRET`。
- 丢失 `.env`：只能从备份恢复。在仍保存 Postgres 数据的卷上重新生成随机密钥会导致密码和加密不同步。
- 迁移主机：将 `.env` 和卷一起复制；传输途中将 `.env` 视为密钥材料。

## 相关内容

- [自托管](./self-host.md)

## 可选凭据存储

已存储的凭据可以使用自托管的 Infisical，同时短期密钥仍加密存放在 Postgres 中。参见 [Infisical 设置、迁移与回滚](./infisical-secrets.md)。
