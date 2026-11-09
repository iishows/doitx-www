---
locale: "zh"
title: "如何在 10 分钟内自托管一个 AI 智能体"
description: "用已发布的 Docker 镜像安装 Doitx、创建账号、连接模型，并把数据库留在你自己的机器上。镜像拉取时间因人而异，公网服务器需要更久。"
published: "2026-10-07"
updated: "2026-10-07"
author: "Elie Steinbock"
category: "guides"
tldr: "已发布镜像的安装程序是一个短脚本：需要 Docker、Compose、curl 和 OpenSSL，然后是账号和模型。拉取时间取决于你的网络。公网域名、TLS 和密钥审查，比第一次本地聊天要费时得多。"
sources:
  - label: "Doitx 自托管指南"
    href: "https://doitx.ai/docs"
  - label: "自托管 AI 智能体"
    href: "https://doitx.ai/self-hosted-ai-agent/"
  - label: "自托管密钥清单"
    href: "https://doitx.ai/docs"
related:
  - href: "/self-hosted-ai-agent/"
    title: "自托管 AI 智能体"
    description: "同样的安装，附带服务器和源码路径。"
  - href: "/openclaw-alternative/"
    title: "开源 OpenClaw 替代品"
    description: "Doitx 的聊天与 OpenClaw 的网关有何不同。"
  - href: "/hermes-alternative/"
    title: "开源 Hermes 替代品"
    description: "桌面与命令行安装，对比 Doitx 的安装器。"
  - href: "/blog/openclaw-vs-hermes-vs-rakazo/"
    title: "OpenClaw 对比 Hermes Agent 对比 Doitx"
    description: "哪个形态最简单，取决于你想要的产品。"
  - href: "/alternatives/"
    title: "开源替代品"
    description: "其余对比页面。"
faq:
  - question: "安装程序真的只要十分钟吗？"
    answer: "命令本身很短。Docker 需要拉取应用镜像、算力镜像和 Postgres，这段等待取决于机器和网络。本指南不报告实测时间。"
  - question: "用已发布的镜像需要 Node.js 吗？"
    answer: "不需要。已发布镜像路径需要 Docker Engine 26 或更高版本、Compose 插件、curl 和 OpenSSL。Node.js 是源码检出才需要的。"
  - question: "数据存在哪里？"
    answer: "Postgres、机器人文件、浏览器配置和审计日志都留在你运行的部署上。你发送给模型提供商的提示词由该提供商处理。"
  - question: "必须用托管的 Doitx Cloud 吗？"
    answer: "不必。自托管运行的是同一个产品。如果你不想自己运行，Doitx Cloud 处于 beta 阶段。"
comparison:
  caption: "简短的本地安装，与更长的生产路径。"
  columns:
    - "路径"
    - "你做什么"
    - "它不是什么"
  rows:
    - topic: "已发布镜像"
      cells:
        - "在空目录里跑一个安装器，然后是账号和模型。"
        - "一个实测的十分钟承诺。镜像拉取因人而异。"
    - topic: "本机"
      cells:
        - "桌面应用可以在本地启动同一套已发布镜像。"
        - "不足以替代在公网服务器上阅读密钥清单。"
    - topic: "公网服务器"
      cells:
        - "准备环境、设置 HTTPS 源，并代理回环地址 5173。"
        - "发布 3100 端口。Web 服务器会代理 /api。"
    - topic: "源码检出"
      cells:
        - "在改动 Doitx 时克隆、配置环境、跑 Postgres 和开发命令。"
        - "运行已发布镜像时的必需项。"
---

标题描述的是本地安装的形态，不是秒表读数。Doitx 的已发布镜像从一个脚本开始，之后 Docker 下载镜像，而这段下载正是会变化的部分。应用启动后，你创建账号、连接模型，第一次聊天就是产品本身。公网域名、TLS 和密钥审查则是另一件事。

本页遵循[自托管指南](https://doitx.ai/docs)和[自托管 AI 智能体页面](/self-hosted-ai-agent/)。如果某条命令有变化，以那些页面为准。

## 你运行的是什么

一个已登录的 Doitx 部署并不是静态站点。指南描述的是一个长期运行的 API、一个 Graphile Worker、Postgres 和一计算力提供商。算力默认是 Docker。E2B、Daytona、CreateOS 和 Boat 是可选的远程算力，各自有自己的 API 密钥。网页版应用、Electron 桌面应用和 Expo 移动应用都是该 API 的客户端。

Postgres、机器人文件、浏览器配置和审计日志都留在你运维的机器上。你发送给模型提供商的内容由该提供商按其条款处理。提供商和密钥都由你选择。开源软件不收席位费。你为模型提供商和你启用的任何远程算力付费。

<figure class="post-figure">
  <img src="/graphics/architecture.svg" width="1200" height="720" alt="Doitx 部署示意图。网页版、桌面版和移动端客户端与一个 API 通信。旁边是一个 worker 和 Postgres。算力默认是 Docker，E2B、Daytona、CreateOS 或 Boat 是可选项。模型提示词发往你配置的提供商。" />
  <figcaption>一个 Doitx 部署。Postgres、机器人文件和审计日志留在你运行的机器上。提示词仍会发往你选择的模型提供商。</figcaption>
</figure>

软件采用 Apache-2.0。这次安装运行的产品与处于 beta 阶段的 Doitx Cloud 相同。

## 机器需要什么

对于已发布的镜像，指南要求 Docker Engine 26 或更高版本，因为机器人主目录卷使用了 API 1.45 的子路径。你还需要 Compose 插件、curl 和 OpenSSL。这条路径不需要安装 Node.js。

源码检出则不同。它需要 Node.js 22.x 系列的 22.22.2 或更高版本、Node.js 24.x，或 Node.js 26 及更高版本，加上 pnpm 9 和 Docker。不支持 Node.js 23.x 和 25.x。在开发 Doitx 时使用这条路径。运行已发布镜像不需要它。

## 安装已发布的镜像

在应运行 Doitx 的机器上，从一个空目录开始：

```bash
mkdir -p rakazo && cd rakazo &&
curl -fsSLO https://raw.githubusercontent.com/iishows/doitx/main/infra/compose/install-images.sh &&
bash install-images.sh
```

安装程序会下载 Compose 文件和 `.env.images.example`，生成带随机密钥的 `.env`，并启动 Doitx。再次运行时会保留已有的 `.env`。默认镜像标签是 `edge`，它跟踪主分支上 `linux/amd64` 和 `linux/arm64` 的构建。在出现稳定版之前，不要假定有 `latest` 标签。

如果你想在首次启动前设置公网 URL、镜像标签或可选的提供商，先运行 `bash install-images.sh --prepare-only`，编辑 `.env`，然后再次运行 `bash install-images.sh`。`--prepare-only` 和 `--local` 两个参数可以组合使用。

`SANDBOX_PROVIDER` 默认是 `docker`。镜像版 Compose 文件会在内部网络上运行一个沙箱 supervisor，并拉取算力镜像。注册和本地 Docker 算力无需 E2B 账号即可工作。已发布镜像的整套服务对每个提供商都要求 `SANDBOX_SUPERVISOR_TOKEN`。留空的话，Compose 会安全失败（fail closed），而不是在没有令牌的情况下启动 supervisor。

打开 `http://127.0.0.1:5173`。第一个注册的用户成为部署所有者。在应用里连接模型，或在启动前设置 `RAKAZO_DOITX_API_KEY`。本地 Docker 算力默认开启。

镜像拉取是会变化的部分。快网络加预热缓存，比慢网络上首次拉取应用、算力镜像和 Postgres 的笔记本更快完成。把「10 分钟」当作对安装程序有多小巧的描述，然后看你自己的拉取情况。

## 创建一个机器人

账号创建后，产品就是聊天。新机器人会询问名称、标题和描述，你选择它共用团队算力还是获得一台私有算力。下面的表单是真实的创建机器人界面，填入了示例数据。图中没有任何内容是客户账号。

<figure class="post-figure">
  <img src="/graphics/chat/create-bot.png" width="1200" height="800" alt="Doitx 中新建机器人的表单，填入了一个名为 Inbox 的示例机器人。" />
  <figcaption>创建机器人。名称、标题和描述都是示例数据。</figcaption>
</figure>

机器人保留自己的对话、记忆、例行任务和历史。你在网页版、桌面版和移动端的同一个聊天里管理它。

## 选择模型

一个部署提供两种来源：router.doitx.ai 上的 Doitx 路由器，以及运维方运行的本地 OpenAI 兼容服务器。每个人连接自己的密钥，每个机器人可以使用不同的模型，因此可以用便宜的模型做分诊，用另一个模型来写作。

模型控件位于机器人的高级设置中。菜单列出实际已连接凭据对应的模型。截图使用了一个虚构的 OpenAI 凭据和两个目录 id。它不是对某家厂商的推荐，也不是你的密钥。

<figure class="post-figure">
  <img src="/graphics/chat/model.png" width="1200" height="800" alt="机器人设置中展开的模型菜单，作用于示例 Inbox 机器人。" />
  <figcaption>每个机器人可以使用不同的模型。菜单列出该部署凭据对应的模型。</figcaption>
</figure>

连接器凭据在服务器上加密，且不经 API 返回。模型提示词仍会离开这台机器，因为提供商必须看到它们。如果你无法接受，就把机器人指向你自己运行的本地服务器。

## 保存一条例行任务

例行任务是可读的 Markdown。你可以按排程运行，或从 webhook、从你连接的消息提供商触发。编辑器就是阅读和修改那段文字的地方。截图是一个工作日收件箱检查，指令是虚构的。它不会连接任何邮箱。

<figure class="post-figure">
  <img src="/graphics/chat/routine.png" width="1200" height="800" alt="用于工作日收件箱检查的例行任务编辑器，指令以文本形式书写。" />
  <figcaption>例行任务就是文本加触发器。你可以在应用里编辑它。</figcaption>
</figure>

排程本身不会授予新权限。当工作触及你设定的边界时，机器人仍会停下。

## 审批

审批是线程里的一张卡片。机器人陈述动作、展示细节，然后等待。允许一次、始终允许该工具，或拒绝。该操作会记录在部署的审计日志中。图中的卡片是对 `ada@example.test` 的示例回复，并未发送。

<figure class="post-figure">
  <img src="/graphics/chat/approval.png" width="1200" height="800" alt="一张审批卡片，询问示例机器人是否可以发送邮件，选项为允许一次、始终允许和拒绝。" />
  <figcaption>机器人停在卡片上。审计日志记录该操作。</figcaption>
</figure>

可选的连接器可以接入 Slack、WhatsApp、Telegram、通过 Sendblue 的 iMessage，以及飞书/Lark。它们属于附加功能。Doitx 应用内的聊天并不需要它们。

## 当这台机器是服务器时

当你合上笔记本后机器人仍需继续运行时，在 VPS 上使用同一个安装程序。镜像版 Compose 会把 Web 应用绑定到回环地址 `127.0.0.1:5173`。在主机上终止 TLS 并代理到该地址。不要发布 3100 端口。Web 服务器会代理 `/api`。

把 `RAKAZO_HOST` 设为域名。把 `BETTER_AUTH_URL`、`WEB_ORIGIN` 和 `API_URL` 设为同一个 `https://` 源。若要使用远程算力而非本地 Docker，把 `SANDBOX_PROVIDER` 设为 `e2b`、`daytona`、`createos` 或 `boat`，并填入该提供商的密钥。

一个最小的 Caddy 站点就是反向代理到 `127.0.0.1:5173`。把示例域名换成你的。桌面客户端应使用 **现有实例** 选项并填入 `https://` 地址。HTTP 只对回环地址和私有局域网地址放行。桌面应用里的 **本机** 选项会用 Docker Compose 在该机器上安装已发布的镜像，默认端口是 45173，以便和开发服务器并存。

在移动应用中，于登录界面点击 **使用自定义服务器**，填入与 `WEB_ORIGIN` 相同的 HTTPS 源。

这条服务器路径正是为什么公网安装和本地脚本不是同一件事。你要选定域名、TLS 终止方式、谁可以注册，以及密钥存放在哪里。[密钥清单](https://doitx.ai/docs)列出了各个值及恢复方式。当安装程序或镜像拉取被阻断时，[受限网络指南](https://doitx.ai/docs)涵盖镜像源方案。

## 仅在开发时从源码安装

克隆仓库，把 `.env.example` 复制为 `.env`，并把 `POSTGRES_PASSWORD` 和 `POSTGRES_APP_PASSWORD` 设为 URI 安全、且同时出现在 `DATABASE_MIGRATION_URL` 和 `DATABASE_URL` 中的随机值。把 `BETTER_AUTH_SECRET`、`ENCRYPTION_KEY` 和 `SCREEN_PROXY_SECRET` 设为互不相同的长随机值。Docker 沙箱需要自己的 `SANDBOX_SUPERVISOR_TOKEN`。这些值放在 `.env` 里，不要提交到 git。

使用 Docker Desktop 做主机侧开发时，设置 `SANDBOX_CONTROL_VIA_LOOPBACK=true`，让 supervisor 在回环端口上发布其控制服务。当 supervisor 运行在 Compose 内时，不要设置它。`docker compose down -v` 会删除 Postgres 数据。

已发布的镜像足以运行 Doitx。源码路径是用于修改它的。

## 第一个下午可以跳过什么

备份、升级、注册白名单、SMTP 和主机加固都在完整指南里，因为它们在别人能访问的服务器上很重要。在回环地址上看到机器人回答并不需要它们。在把部署放到域名之前，请阅读它们。

如果下载失败，请停下并改用受限网络指南，而不是反复重试同一个 curl。如果某个密钥被提交进了 git 或被粘贴进了聊天，请按清单轮换它，而不是就地修改然后祈祷。

桌面应用的 **本机** 选项就是同一套已发布镜像，替你启动。它并不消除对 Docker 的需求。当你选择了托管模型时，它也不会让提示词留在这台机器上。

## 这与其他智能体的关系

OpenClaw 和 Hermes Agent 同样是开源项目，也能跑在你掌控的硬件上。它们的安装文档描述的是一个网关，或一个桌面应用加一个命令行，以及主目录下的配置文件。Doitx 的已发布镜像路径就是上面的脚本，然后是聊天。[这三者的对比](/blog/openclaw-vs-hermes-vs-rakazo/)讲的是这种形态差异，不是一场竞赛。

如果目标是在回环地址上完成第一次聊天，就留在已发布镜像上，创建所有者账号并连接一个模型。如果目标是公网 URL，安装器结束后还要为 TLS 和密钥清单预留时间。
