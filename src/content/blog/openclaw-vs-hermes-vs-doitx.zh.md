---
locale: "zh"
title: "OpenClaw 对比 Hermes Agent 对比 Doitx：哪个最容易运行？"
description: "Doitx、OpenClaw 和 Hermes Agent 都是开源项目，都能跑在你的硬件上。最简单的那个，取决于你真正想要的产品形态：聊天、网关，还是桌面智能体。"
published: "2026-10-07"
updated: "2026-10-07"
author: "Elie Steinbock"
category: "comparisons"
tldr: "Doitx 是一个用 Docker 安装、然后创建账号并连接模型的聊天应用。OpenClaw 是一个面向你已在使用的聊天应用的网关，带引导流程和一份配置文件。Hermes Agent 有一个无需命令行就能发出第一条消息的桌面应用，以及一套独立的命令行和一个通讯网关。最简单取决于你想要其中哪一个。"
sources:
  - label: "OpenClaw 安装文档"
    href: "https://docs.openclaw.ai/install"
  - label: "OpenClaw 沙箱"
    href: "https://docs.openclaw.ai/gateway/sandboxing"
  - label: "Hermes Agent 快速上手"
    href: "https://hermes-agent.nousresearch.com/docs/getting-started/quickstart"
  - label: "Hermes Agent 桌面版"
    href: "https://hermes-agent.nousresearch.com/docs/user-guide/desktop"
  - label: "Doitx 自托管指南"
    href: "https://doitx.ai/docs"
related:
  - href: "/openclaw-alternative/"
    title: "开源 OpenClaw 替代品"
    description: "更长的 Doitx 与 OpenClaw 对比。"
  - href: "/hermes-alternative/"
    title: "开源 Hermes 替代品"
    description: "Hermes Agent 的安装与日常使用笔记。"
  - href: "/self-hosted-ai-agent/"
    title: "自托管 AI 智能体"
    description: "Doitx 安装程序、服务器代理和源码路径。"
  - href: "/blog/self-host-an-ai-agent/"
    title: "如何自托管一个 AI 智能体"
    description: "已发布镜像的安装步骤，不含计时。"
  - href: "/blog/best-open-source-ai-agents-2026/"
    title: "2026 年最佳开源 AI 智能体"
    description: "更宽的清单，包括作为库而非应用的项目。"
faq:
  - question: "Doitx 一定比 Hermes 桌面版步骤更少吗？"
    answer: "不一定。Hermes 桌面指南称首次引导几秒内就能发出第一条消息，且选择「稍后选择提供商」会跳过提供商设置。Doitx 的已发布镜像仍需 Docker 拉取和启动，然后创建账号并连接模型。选那个与你想要常驻的应用相匹配的安装方式。"
  - question: "这些软件收费吗？"
    answer: "Doitx 自托管免费，托管的 Doitx Cloud 处于 beta 阶段。OpenClaw 文档称没有付费档位，也没有托管服务。Hermes Agent 采用 MIT 许可证，也记录了可选的 Nous Portal 额度和云托管。你仍需为模型、机器以及任何可选算力提供商付费。"
  - question: "我能从 Telegram 或 Slack 给这三者都发消息吗？"
    answer: "OpenClaw 的主要界面就是聊天应用，通过它的 Gateway。Hermes 使用一个通讯网关，桌面指南把它描述为与应用本地后端分开的进程。Doitx 的可选连接器可以接入 Slack、WhatsApp、Telegram、通过 Sendblue 的 iMessage，以及飞书/Lark，这些连接器属于附加项，Doitx 应用并不需要它们。"
  - question: "本页的细节来自哪里？"
    answer: "OpenClaw 的细节依据 2026 年 10 月 7 日阅读的 docs.openclaw.ai。Hermes 的细节依据 Hermes Agent 站点、快速上手和桌面指南。Doitx 的细节依据本项目的自托管指南。依赖某条命令前请核对这些页面。"
comparison:
  caption: "安装形态取自各项目公开文档，阅读于 2026 年 10 月 7 日。"
  columns:
    - "主题"
    - "Doitx"
    - "OpenClaw"
    - "Hermes Agent"
  rows:
    - topic: "许可证"
      cells:
        - "Apache-2.0"
        - "MIT，OpenClaw Foundation"
        - "MIT，Nous Research"
    - topic: "主要界面"
      cells:
        - "网页版、桌面版和移动端聊天"
        - "面向聊天应用的网关"
        - "桌面应用，或命令行"
    - topic: "安装"
      cells:
        - "Docker 安装程序、账号、模型"
        - "安装脚本、引导、网关"
        - "桌面应用，或 install.sh 与 hermes setup"
    - topic: "之后要编辑的配置"
      cells:
        - "聊天，以及可读的例行任务 Markdown"
        - "~/.openclaw 与 openclaw configure"
        - "~/.hermes/.env 与 config.yaml，或桌面设置"
    - topic: "沙箱默认"
      cells:
        - "默认使用 Docker 算力"
        - "文档称沙箱默认关闭"
        - "桌面应用内的本地后端"
---

人们会问这三者哪个最简单。诚实的回答是：它们并不是同一个产品的三种安装器。Doitx 是面向持久型机器人的聊天应用。OpenClaw 是一个网关，把聊天应用连接到你自己机器上的助手。Hermes Agent 是一个桌面应用加一个命令行智能体，两者共享一个配置目录，另有你在需要 Telegram、Discord、Slack 等时启动的通讯网关。

三者都能跑在你掌控的硬件上。三者都会把提示词发送给你配置的模型提供商。本页没有任何计时基准。下面的步骤都是各项目自己文档记录的。

<figure class="post-figure">
  <img src="/graphics/setup-steps.svg" width="1200" height="720" alt="Doitx、OpenClaw 和 Hermes Agent 的安装步骤。Doitx 是 Docker 安装程序、账号和模型，然后是聊天。OpenClaw 是安装器、引导、Gateway 服务和配置文件。Hermes 是桌面或命令行安装器、选择提供商、主目录下的配置，以及仅在使用消息应用时才单独启动的网关。" />
  <figcaption>安装路径取自各项目公开的安装文档。下载时间另计，这不是计时基准。</figcaption>
</figure>

## 这里的「最简单」指什么

一条短命令不等于省心的一周。真正有用的问题是：第一条回复之后，你在哪里管理这个智能体。

如果你想要一个有名字、有算力、有可读例行任务的机器人，并且希望这个机器人在网页版、桌面版和移动端应用里，那么 Doitx 的日常界面更小。安装是 Docker，然后是聊天。

如果你本来就常驻 Discord、Telegram、WhatsApp、Slack、Signal 或 iMessage，并且想要自己机器上的一个进程去支撑这些应用，那么 OpenClaw 的 Gateway 正是这个项目围绕的核心。这种形态的代价是引导流程、一个后台服务和一份配置文件。

如果你想要一个原生桌面智能体，Hermes 桌面版被记录为一条无需命令行的首次使用路径。命令行仍然是快速上手教学的那条路径，消息平台则是另一个进程。说 Hermes 比 Doitx「步骤更多」，忽略了桌面指南。说 Doitx 比 Hermes「步骤更多」，忽略了 Docker 和账号。让安装方式匹配界面。

## Doitx

Doitx 采用 Apache-2.0。你在自己掌控的机器上运行已发布的 Docker 镜像，或源码检出。桌面应用可以在本地启动这套服务，也可以连接你已在运行的服务器。托管的 Doitx Cloud 处于 beta 阶段。

已发布镜像的安装程序是空目录里的一个脚本。它会写入带随机密钥的 `.env`、拉取镜像，并启动 API、worker、Postgres 和一台 Docker 算力。你打开应用、创建账号并连接模型。第一个注册的用户是部署所有者。之后产品就是聊天。新机器人会先和你聊。例行任务是 Markdown。机器人可以暂停等待批准，操作会落入你保存的审计日志。

模型来自 Doitx 路由器或运维方运行的本地 OpenAI 兼容服务器。每个人连接自己的密钥，每个机器人可以使用不同的模型。默认算力是本地 Docker。E2B、Daytona、CreateOS 和 Boat 是可选项。也可以显式选择桌面算力在主机上运行，但它不是默认项。

可选的连接器支持 Slack、WhatsApp、Telegram、通过 Sendblue 的 iMessage，以及飞书/Lark。它们不是你和机器人交流的方式，网页版、Electron 和 Expo 应用才是。

软件不收席位费。你为模型、机器以及你启用的任何远程算力付费。镜像拉取时间不是固定数字。[自托管指南](/self-hosted-ai-agent/)是命令清单，[更长的安装说明](/blog/self-host-an-ai-agent/)讲清了「十分钟」这个标题代表什么、不代表什么。

## OpenClaw

OpenClaw 采用 MIT 协议，由 OpenClaw Foundation 托管，项目称其为独立的 501(c)(3) 组织。文档称你在自己的电脑或服务器上运行 Gateway，中间没有托管服务，软件也没有付费档位。

安装页阅读于 2026 年 10 月 7 日，称推荐 Node 26，受支持的版本是 Node 24.16+ 或 Node 26.1+。安装脚本会检测操作系统、可安装 Node、安装 OpenClaw，并启动引导：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

第一次聊天时 Gateway 可以停在该终端里。`openclaw gateway install` 会装成后台服务，形式为 LaunchAgent、systemd 用户单元或 Windows 计划任务。后续变更通过 `openclaw configure` 和 `~/.openclaw/openclaw.json` 完成。`openclaw doctor` 和 `openclaw dashboard` 是与这套安装共存的一部分。手机渠道是单独的步骤。

聊天应用是主要界面。文档列出的渠道包括 Discord、Google Chat、iMessage、Matrix、Microsoft Teams、Signal、Slack、Telegram、WhatsApp、Zalo 等（通过插件），外加 WebChat。界面还包括浏览器 Control UI 和 iOS、Android 节点。

工具包括浏览器自动化和 exec。沙箱文档称沙箱默认关闭，Gateway 进程留在主机上。开启沙箱后，文档列出的后端包括 Docker、Podman、SSH、OpenShell 和 Crabbox。如果你以为它会像 Doitx 的算力那样默认是个容器（除非你改动），这个默认值就很关键。

模型包括 Anthropic、OpenAI 和 Google，部分订阅（如 OpenAI Codex）支持 OAuth。自托管端点包括 vLLM、SGLang、Ollama、llama.cpp、LM Studio 以及其他 OpenAI 兼容或 Anthropic 兼容服务器，并支持故障转移。会话、记忆、技能、cron、hooks 和插件都是项目的一部分。私聊可以共享一个主会话，群聊默认相互隔离。

你为模型和机器付费。项目文档称该软件没有付费档位。

## Hermes Agent

Hermes Agent 是 Nous Research 的开源智能体，采用 MIT 许可证，仓库在 `github.com/NousResearch/hermes-agent`。项目站点也提供可选的 Nous Portal 额度和云托管，这些都是可选的，软件可以跑在你自己的机器上。

桌面指南描述了 macOS、Windows 和 Linux 上的原生应用。它在 `~/.hermes/` 下与命令行共享配置、API 密钥、会话、技能和记忆。同一份指南称首次引导几秒内就能发出第一条消息，且**稍后选择提供商**会跳过提供商设置。设置涵盖提供商、模型、工具、凭据、MCP 服务器、网关和会话。应用会启动自己的本地 `hermes serve` 后端，那个聊天不需要命令行或网页仪表盘。

命令行是另一条路径，也是快速上手花时间讲的那条。Linux、macOS 和 WSL2 使用 `install.sh` 脚本，Windows 使用 PowerShell 脚本。然后 `hermes setup` 提供带 Nous Portal 的 Quick Setup、Full Setup 或 Blank Slate，`hermes model` 选择提供商。密钥放在 `~/.hermes/.env`，其他设置放在 `~/.hermes/config.yaml`。第一个终端聊天是 `hermes` 或 `hermes --tui`。

快速上手列出许多提供商，包括 Nous Portal、OpenAI、Anthropic、OpenRouter、Google、自定义 OpenAI 兼容端点，以及 Ollama、LM Studio 等本地服务器。它称模型至少需要 64,000 token 的上下文。这是 Hermes 的要求，不是 Doitx 的。

Telegram、Discord、Slack、WhatsApp、Signal、Email 和 Teams 使用 `hermes gateway setup` 和一个你单独启动的网关进程。桌面指南称那个通讯网关与应用本地后端是不同的进程。如果你只想要桌面聊天，不必运行它；如果你想要机器人在那些应用里，就得运行它。

日常使用中，桌面设置涵盖提供商和会话。快速上手记录的命令行恢复命令是 `hermes doctor`、`hermes model`、`hermes setup` 和 `hermes gateway status`。工具访问是 `hermes tools`。Cron、技能和 MCP 服务器是进一步的配置。

Nous Research 描述了一个自我改进的智能体，它从经验中创建技能、跨会话保留记忆，并能运行定时任务。本页不会重复比这更宽泛的说法。关于它实际交付的行为，请阅读他们的文档。

## 如何选择

当工作是你在某个应用里打开的队友——重复的浏览器和终端任务、你能读懂的可排程例行任务、重要操作前的审批，以及网页版、桌面版和手机上同一个机器人——时，选 Doitx。安装成本是 Docker 和一个账号，日常成本是聊天，而不是每次变更都改配置文件。

当助手应出现在你已在使用的聊天应用里、且你愿意运行 Gateway、装成服务、并在出偏差时编辑 `~/.openclaw` 时，选 OpenClaw。沙箱需要你自己开启，文档称它默认关闭。

当你想要一个原生应用、又不想学命令行就能发出第一条消息时，选 Hermes 桌面版。当你想要终端、`hermes model` 和 `~/.hermes` 下的文件时，选 Hermes 命令行。只有当你想用那些平台时才添加通讯网关。不要把桌面路径和网关路径当成同一个步骤数。

有几种情况容易搞错。如果你需要一个能编译进你自己 Python 服务的库，这三者都不是那个库。正因如此，LangGraph 和 CrewAI 在[更宽的汇总](/blog/best-open-source-ai-agents-2026/)里。如果你需要一个无需安装的托管助手，请看看[替代品汇总](/alternatives/)上的其他页面。那些产品是另一种取舍。

## 本页不衡量什么

它不衡量每美元的 token 数、浏览器的可靠性，或某个定时任务成功的频率。它不认为某个项目在每种配置下都更安全。开启沙箱的 OpenClaw 与关闭沙箱的 OpenClaw 风险不同。Doitx 的 Docker 算力与把机器人指向一台远程虚拟机，风险不同。使用本地模型的 Hermes 与使用托管提供商的 Hermes，风险不同。

它也不认为这些项目一成不变。Node 版本、安装器参数和桌面引导都会变。来源清单是这次对比在 2026 年 10 月 7 日核对过的页面集合。如果这里的某条命令与上游页面不一致，以上游页面为准。
