# 受限网络上的自托管

当 GitHub 或容器镜像仓库不可达时，使用你控制的镜像源，或预先复制文件。这些设置改变的是下载方式；模型和远程计算机提供商仍需要网络访问。

| 故障 | 设置或操作 |
| --- | --- |
| 无法获取安装脚本 | 从你的镜像源下载，或在本地复制 |
| 无法获取 Compose 文件 | `RAKAZO_DOWNLOAD_BASE`、`--local` 或 `RAKAZO_DOWNLOAD_SKIP_EXISTING=1` |
| 无法拉取应用或计算机镜像 | `RAKAZO_IMAGE`、`RAKAZO_IMAGE_TAG`、`RAKAZO_COMPUTER_IMAGE`、`RAKAZO_COMPUTER_IMAGE_TAG` |
| 无法拉取 Postgres 或 busybox | `POSTGRES_IMAGE`、`BUSYBOX_IMAGE`，或 Docker daemon 的 `registry-mirrors` |

## 安装脚本

当 raw GitHub 不可达时，从你的镜像源下载安装脚本：

```bash
export RAKAZO_INSTALLER_URL=https://example.com/mirror/rakazo/infra/compose/install-images.sh
export RAKAZO_DOWNLOAD_BASE=https://example.com/mirror/rakazo/infra/compose
mkdir -p rakazo && cd rakazo &&
curl -fsSL -o install-images.sh "${RAKAZO_INSTALLER_URL}" &&
bash install-images.sh --prepare-only
```

`RAKAZO_INSTALLER_URL` 为此 curl 命令选择脚本；`RAKAZO_DOWNLOAD_BASE` 选择该脚本下载的 Compose 文件。当 raw GitHub 被阻断时，两者都要设置。

## Compose 文件

要镜像 `docker-compose.images.yml` 和 `.env.images.example`，请将安装脚本指向 `infra/compose` 的 HTTPS 镜像源：

```bash
export RAKAZO_DOWNLOAD_BASE=https://example.com/mirror/rakazo/infra/compose
bash install-images.sh --prepare-only
```

末尾斜杠会被去掉；非 HTTPS 的基础地址会被拒绝。下载使用有界重试。

要复用工作目录中已有的文件：

```bash
# Place docker-compose.images.yml and .env.images.example in this directory first.
bash install-images.sh --local --prepare-only
# Equivalent environment setting:
RAKAZO_DOWNLOAD_SKIP_EXISTING=1 bash install-images.sh --prepare-only
```

缺失的文件仍会被下载。`--prepare-only` 会创建 `.env` 而不启动栈；请继续执行下面的镜像设置和启动说明。

离线安装时，将 `docker-compose.images.yml` 和 `.env.images.example` 复制到工作目录，并在 Docker 主机上预加载所有必需的容器镜像。然后运行：

```bash
bash install-images.sh --offline
```

如果任一必需文件缺失，`--offline` 会在调用 Compose 之前失败，即使 `.env` 已存在。它从不下载文件，也不要求 curl。它跳过镜像拉取，并在 Compose 支持时向启动过程传递 `--pull never`。较旧的 Compose 版本会保留启动路径，并在该标志不可用时打印警告。

要离线安装受限的计算机出站规则，还需将 `restrict-computer-egress.sh` 复制到工作目录。如果该可选脚本缺失，安装脚本会记录开放的出站访问并发出警告，而不是下载它。显式的 `SANDBOX_COMPUTER_EGRESS` 设置保持不变。主机要求参见 [受限计算机出站访问](./self-host.md#restricted-computer-egress)。

## 容器镜像

执行 `--prepare-only` 后，在 `.env` 中设置镜像覆盖项。对于镜像的 Postgres 或 busybox，请使用下方的 [digest 校验启动](#digest-verified-hub-mirror-startup)。否则，重新运行安装脚本（如果使用预复制的 Compose 文件，请保留 `--local`）：

```env
RAKAZO_IMAGE=registry.example.com/mirror/rakazo/app
RAKAZO_IMAGE_TAG=edge
RAKAZO_COMPUTER_IMAGE=registry.example.com/mirror/rakazo/computer
RAKAZO_COMPUTER_IMAGE_TAG=edge
POSTGRES_IMAGE=registry.example.com/library/postgres@sha256:<trusted-postgres-digest>
BUSYBOX_IMAGE=registry.example.com/library/busybox@sha256:<trusted-busybox-digest>
```

镜像应用和计算机两种镜像，并将其标签配成同一个发布版本。Arm64 主机需要多架构标签；参见 [发布镜像与标签](./self-host.md#published-images-and-tags)。镜像覆盖项定义在 [docker-compose.images.yml](../infra/compose/docker-compose.images.yml)。

对于 Docker Hub 镜像，你也可以改为将 `registry-mirrors` 合并到 Docker daemon 现有的 JSON 配置中，然后重启 Docker：

```json
{
  "registry-mirrors": ["https://mirror.example.com"]
}
```

参见 [基础 daemon 配置](../infra/compose/docker-daemon.json)。Docker Hub 镜像源不能替代上面的 GHCR 镜像覆盖项。

当主机完全无法访问任何镜像仓库时，跳过镜像源，改为以 tarball 形式分发镜像：`bash infra/compose/make-image-bundle.sh` 会生成一个 `install-images.sh --offline` 可接受的包。参见 [离线包](./self-host.md#offline-bundle-air-gapped)。

<a id="digest-verified-hub-mirror-startup"></a>

## digest 校验的 Hub 镜像源启动

先在安装目录中运行 `bash install-images.sh --prepare-only`（对于预复制的文件请加上 `--local`）。这会准备 Compose 文件并校验必需的密钥，而不启动容器。

将镜像源视为传输通道，而非事实来源。从可信上游或带外的可信工作站获取预期的 `postgres:16` 和 `busybox:1` digest。将 digest 放入每个镜像引用中，然后拉取、比较本地仓库 digest，并在不再拉取的情况下启动。运行前请替换下面所有示例值：

```bash
(
set -euo pipefail

export POSTGRES_IMAGE='registry.example.com/library/postgres@sha256:<trusted-postgres-digest>'
export BUSYBOX_IMAGE='registry.example.com/library/busybox@sha256:<trusted-busybox-digest>'

docker compose --env-file .env -f docker-compose.images.yml pull

for image_ref in "$POSTGRES_IMAGE" "$BUSYBOX_IMAGE"; do
  expected_digest="${image_ref##*@}"
  docker image inspect --format '{{range .RepoDigests}}{{println .}}{{end}}' "$image_ref" |
    awk -F@ -v expected="$expected_digest" '$2 == expected { found=1 } END { exit !found }' || {
      echo "digest verification failed for $image_ref" >&2
      exit 1
    }
done

docker compose up --help | grep -- '--pull' >/dev/null || {
  echo 'Docker Compose with up --pull is required for verified no-repull startup.' >&2
  exit 1
}
docker compose --env-file .env -f docker-compose.images.yml up -d --pull never
)
```

如果拉取或检查失败，或任一镜像缺少预期 digest，此序列会在启动前失败。将相同的 `POSTGRES_IMAGE` 和 `BUSYBOX_IMAGE` 引用保存到安装的 `.env` 中以便后续重启；上面的 export 仅适用于本次启动。不要用可变的镜像源标签替换它们。启动后，按照 [设置提示](../SETUP_PROMPT.md) 中的健康检查操作。

下载可用后，继续执行 [发布镜像设置](./self-host.md#published-images-no-checkout)。对于无法访问外部提供商的主机，使用本地 Docker 计算机和运维人员控制的模型端点；参见 [自托管指南](./self-host.md)。
