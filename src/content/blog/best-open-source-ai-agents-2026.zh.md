---
locale: "zh"
title: "2026 年最佳开源 AI 智能体"
description: "盘点 2026 年你可以自己运行的开源智能体，分为应用和库两类。没有唯一最好的，这也不是一份基准测试。"
published: "2026-10-07"
updated: "2026-10-07"
author: "Elie Steinbock"
category: "roundups"
tldr: "没有唯一最好的开源智能体。Doitx、OpenClaw、Hermes Agent、OpenHands 和 Goose 是你可以直接运行的项目。LangGraph 和 CrewAI 是用来自己搭建智能体的库。Dify 的许可证是经过修改的 Apache-2.0，附带额外条件。先确定产品形态，再去读那个项目的许可证。"
sources:
  - label: "Doitx 源码"
    href: "https://github.com/iishows/doitx"
  - label: "OpenClaw"
    href: "https://docs.openclaw.ai/"
  - label: "Hermes Agent"
    href: "https://hermes-agent.nousresearch.com/"
  - label: "OpenHands Agent Canvas"
    href: "https://github.com/OpenHands/OpenHands"
  - label: "goose"
    href: "https://github.com/aaif-goose/goose"
  - label: "LangGraph"
    href: "https://github.com/langchain-ai/langgraph"
  - label: "CrewAI"
    href: "https://github.com/crewAIInc/crewAI"
  - label: "Dify 许可证"
    href: "https://github.com/langgenius/dify/blob/main/LICENSE"
related:
  - href: "/blog/openclaw-vs-hermes-vs-doitx/"
    title: "OpenClaw 对比 Hermes Agent 对比 Doitx"
    description: "这三者中哪个最容易运行。"
  - href: "/alternatives/"
    title: "开源替代品"
    description: "既与托管助手对比，也与开源方案对比。"
  - href: "/self-hosted-ai-agent/"
    title: "自托管 AI 智能体"
    description: "如何用已发布的镜像运行 Doitx。"
  - href: "/openclaw-alternative/"
    title: "开源 OpenClaw 替代品"
    description: "更详细地介绍 Doitx 和 OpenClaw。"
  - href: "/hermes-alternative/"
    title: "开源 Hermes 替代品"
    description: "更详细地介绍 Doitx 和 Hermes Agent。"
faq:
  - question: "这是一份排名吗？"
    answer: "不是。标题只是点出人们会问的问题。正文已经说明没有唯一最好的智能体。这里没有任何内容按星标、下载量或基准测试排序。"
  - question: "其中哪些是聊天应用？"
    answer: "Doitx 是一个网页版、桌面版和移动端聊天应用。OpenClaw 是一个网关，你从其他聊天应用给它发消息。Hermes Agent 有一个桌面应用和一个终端界面。Goose 有桌面应用、命令行和 API。OpenHands Agent Canvas 是一个开发者控制中心。LangGraph 和 CrewAI 是库。"
  - question: "它们都是 Apache-2.0 吗？"
    answer: "不是。Doitx 和 Goose 使用 Apache-2.0。根据本页核查的许可证文件，OpenClaw、Hermes Agent、OpenHands、LangGraph 和 CrewAI 使用 MIT。Dify 使用的是经过修改的 Apache-2.0，对多租户服务以及前端的标志和版权附加了额外条件。"
  - question: "软件开源了还需要付费吗？"
    answer: "通常需要，费用在模型提供商和机器上。有些项目还出售可选的托管服务。开源描述的是你所运行代码的许可证，并不是零成本模型的承诺。"
comparison:
  caption: "本页提到的项目，依据 2026 年 10 月 7 日各项目的公开仓库和文档。不是排名。"
  columns:
    - "项目"
    - "许可证"
    - "你运行什么"
    - "面向什么"
  rows:
    - topic: "Doitx"
      cells:
        - "Apache-2.0"
        - "Docker 镜像或源码，然后聊天"
        - "Doitx 应用中的持久型机器人"
    - topic: "OpenClaw"
      cells:
        - "MIT"
        - "你机器上的网关"
        - "你已在使用的聊天应用中的助手"
    - topic: "Hermes Agent"
      cells:
        - "MIT"
        - "桌面应用或命令行"
        - "本地智能体，外加可选的通讯网关"
    - topic: "OpenHands"
      cells:
        - "MIT"
        - "Agent Canvas，可选用 Docker"
        - "面向编码智能体的控制中心"
    - topic: "Goose"
      cells:
        - "Apache-2.0"
        - "桌面、命令行或 API"
        - "你机器上的通用工作"
    - topic: "LangGraph"
      cells:
        - "MIT"
        - "进程内的一个库"
        - "你自己构建的有状态智能体图"
    - topic: "CrewAI"
      cells:
        - "MIT"
        - "一个 Python 框架"
        - "你自己构建的多智能体工作流"
---

"最佳"是人们会输入的词，但对这一组东西来说并不贴切。一个你可以聊天的智能体、一个面向 Telegram 的网关、一个桌面编码控制中心，以及一个 Python 库，彼此并不互为替代。这一页把作为应用运行的项目和作为库嵌入的项目分开，说明每个仓库实际使用的许可证，并讲清各自适合什么。它不是基准测试，也没有按星标排序。

文中的描述在 2026 年 10 月 7 日对照各项目的公开仓库或文档核查过。如果 README 日后有变动，以 README 为准。

## 这份清单如何划分

第一类是安装后直接使用的软件：Doitx、OpenClaw、Hermes Agent、OpenHands 和 Goose。你可以自托管它们。除非你让它们指向本地模型，否则它们仍会调用模型提供商。

第二类是库：LangGraph 和 CrewAI。你不会"登录"它们，而是写一个使用它们的程序，然后托管那个程序。

Dify 单独说明，是因为人们常把它和智能体平台归为一类，而它的许可证并不是标准 Apache-2.0。略过这一点把它称作 Apache-2.0 是错误的。

没有可运行源码的托管产品不在本清单内。[替代品汇总](/alternatives/)把其中一些与 Doitx 做了对比。

## Doitx

Doitx 是一个面向持久型 AI 队友的开源平台，采用 Apache-2.0 许可证。你运行已发布的 Docker 镜像或源码检出。网页版应用、Electron 桌面应用和 Expo 移动应用都是同一套 API 的客户端。托管的 Doitx Cloud 处于 beta 阶段。

一个机器人拥有对话、记忆、例行任务和历史。例行任务是可读的 Markdown，可以按排程运行。浏览器、终端、文件和图形桌面都可用。默认算力是本地 Docker。E2B、Daytona、CreateOS 和 Boat 是可选的远程算力。你为 Doitx 路由器或运维方运行的本地 OpenAI 兼容服务器提供密钥。每个机器人可以使用不同的模型。

机器人可以在你设定的边界处暂停等待批准。操作会记录在部署的审计日志中。Postgres 和机器人文件留在你运维的机器上。提示词仍会发送给你选择的提供商。

日常界面就是聊天。新机器人会先和你聊，你在那个聊天里管理它。可选的 Slack、WhatsApp、Telegram、通过 Sendblue 的 iMessage，以及飞书/Lark 连接器属于附加功能。

当你希望机器人、例行任务和审批都在同一个应用里，且愿意运行 Docker 时，Doitx 适合重复性的运营工作。如果你想要一个嵌在现有服务里的库，或者希望智能体只活在 Discord 里而没有 Doitx 应用，那它就不太合适。[自托管页面](/self-hosted-ai-agent/)讲的是安装。[OpenClaw](/openclaw-alternative/)和 [Hermes](/hermes-alternative/)页面是最接近的形态对比。

## OpenClaw

OpenClaw 是一个自托管网关，把聊天应用连接到你自己机器上的助手。许可证是 MIT。项目称 OpenClaw Foundation 是独立的 501(c)(3) 组织。其文档称中间没有托管服务，软件也没有付费档位。

你用项目的脚本安装它，走完引导，运行一个 Gateway。这个进程可以留在终端里，也可以安装成后台服务。配置位于 `~/.openclaw` 下。项目记录的渠道包括 Discord、Google Chat、iMessage、Matrix、Microsoft Teams、Signal、Slack、Telegram、WhatsApp、Zalo 等（通过插件），外加一个浏览器 Control UI 和移动节点。

本页阅读的安装文档称推荐 Node 26，支持 Node 24.16+ 或 Node 26.1+。安装程序可以自行准备 Node。工具执行的沙箱默认关闭。启用后，记录的后端包括 Docker、Podman、SSH、OpenShell 和 Crabbox。Gateway 进程留在主机上。

当助手应出现在你已在使用的聊天应用里、且你想要一个运行在自己硬件上的网关时，OpenClaw 合适。它与队友式界面是不同的产品。[三方对比笔记](/blog/openclaw-vs-hermes-vs-doitx/)把这种形态与 Doitx 和 Hermes 做了比较，但没有把它变成一场竞赛。

## Hermes Agent

Hermes Agent 是 Nous Research 的 MIT 协议智能体，你可以在自己的机器上运行它。项目还记录了可选的 Nous Portal 额度和云托管。

它的安装有两种，不应当混为一谈。macOS、Windows 和 Linux 上的桌面应用与命令行共享 `~/.hermes/`。桌面指南称首次引导几秒内就能发出第一条消息，而之后选择提供商会跳过提供商设置。应用会启动一个本地后端。那个聊天不需要命令行。

命令行的快速上手是安装器、`hermes setup`（Quick Setup、Full Setup 或 Blank Slate）和 `hermes model`。密钥放在 `~/.hermes/.env`，其他设置放在 `~/.hermes/config.yaml`。快速上手文档称模型至少需要 64,000 token 的上下文。消息平台使用 `hermes gateway setup` 和一个网关进程，桌面指南称它与应用的本地后端是分开的。

Hermes 适合想要一个桌面智能体或终端智能体、能查看主目录下文件、并且只在需要聊天应用时才添加网关的人。它不是带 Postgres 审计日志的多用户 Web 应用的开箱替代品。关于技能和记忆的行为，请阅读它们的文档。本页不会额外添加说法。

## OpenHands

OpenHands Agent Canvas 自称是一个自托管的、面向编码智能体和自动化的开发者控制中心。仓库 README 称它可以运行 OpenHands 智能体以及其他兼容 ACP 的智能体，包括 Claude Code 和 Codex，跨本地、远程和云端后端。GitHub 仓库根目录的 LICENSE 文件是 MIT。

快速上手的第一个选项是全局 npm 安装，需要 Node.js 24 或更高版本和 `uv`：

```bash
npm install -g @openhands/agent-canvas
agent-canvas
```

README 警告说，这个选项会直接在你安装的机器上运行智能体服务器，智能体将拥有对你文件系统的完全访问权限。Docker 沙箱选项是分开的。README 还说你可以选择在 OpenHands Cloud 或 OpenHands Enterprise 基础设施上运行智能体。本页没有描述这些托管选项的商业条款。上面的 MIT 文本是抓取到的仓库许可证，并不是对每个托管套餐的审查。

OpenHands 适合编码工作：与编码智能体对话、自动化，以及你来回切换的后端。它是这类工作的控制中心。它不是面向收件箱或运营例行任务排程的通用队友，而未沙箱化的安装是实实在在的警告，不是脚注。

## Goose

Goose 的 README 描述了一个原生开源 AI 智能体，带桌面应用、命令行和 API，用于编码及其他工作。仓库是 `aaif-goose/goose`，许可证文件是 Apache-2.0。README 称 Goose 是 Linux 基金会旗下 Agentic AI Foundation 的一部分。

同一份 README 称 Goose 支持 15 个以上的提供商，点名了 Anthropic、OpenAI、Google、Ollama、OpenRouter、Azure、Bedrock 等，并通过模型上下文协议连接 70 个以上的扩展。这些数字是项目自己的描述，不是本页所做的测量。桌面应用记录了 macOS、Linux 和 Windows 支持。命令行的安装是项目稳定版的一个脚本。

Goose 适合想要在自己机器上拥有一个通用智能体、带桌面应用或终端，并且需要大量 MCP 扩展的人。它不同于那种专门躲在十几个聊天网络背后的网关，也不是你导入到自己已写好的服务里的库。

## 是库，不是应用

LangGraph 是一个用于构建有状态智能体的底层编排框架。仓库 `langchain-ai/langgraph` 采用 MIT 许可证。你通过编写软件来定义图、状态和模型调用来使用它。那份 README 里没有可安装的 LangGraph 聊天应用，本页也不描述 LangSmith 或任何托管定价。

CrewAI 的 README 称它是一个开源 Python 框架，为多智能体工作流提供高层抽象和底层 API。仓库许可证是 MIT。同一份 README 称 CrewAI AMP Suite 是一个商业控制平面，提供托管部署、可观测性、治理、安全和 Enterprise 支持，可本地部署或在云端使用。框架和 AMP 套件是不同的东西。安装 Python 包并不会让你订阅 AMP。

当你构建的产品把智能体当作一个功能、并且你想自己掌控进程模型时，使用这两个库中的任意一个。如果你想要的是一个当天下午就能用的应用，就别选它们。持久化、身份验证和审批界面都得由你来写。

## 关于 Dify 的许可证提醒

LangGenius 的 Dify 常出现在开源智能体平台的清单里。它的 LICENSE 文件并不是单纯的 Apache-2.0 文本，而是经过修改、附带额外条件的 Apache-2.0。在你基于它构建之前，有两条很重要。

该文件称，除非 Dify 书面授权，你不得使用 Dify 源码运营多租户环境。在该文档中，一个租户对应一个工作区。它还称，使用前端时，你不得移除或修改 Dify 控制台或应用中的标志或版权信息。该限制不适用于不涉及前端的用途。那里把前端定义为 `web/` 目录，或你用 Docker 运行时的 Web 镜像。

这只是一个简短的提醒，不是对许可证的完整审查。如果你在选择 Dify，请阅读该文件。不要把它说成与 Doitx 或 Goose 的 Apache-2.0 相同的授权。

## 如何选择

从工作出发，而不是从清单的排位出发。

如果你想要持久型机器人、可读的例行任务、审批和审计日志，并且愿意自己运行服务器，就用 Doitx。安装是 Docker，然后是聊天。

如果你想要一个住进你现有聊天应用里的助手，就用 OpenClaw，并在放开工具之前先读沙箱那一页。Gateway 就是产品。

如果你想要一个配置在主目录下的桌面或终端智能体，就用 Hermes，只在需要时再添加通讯网关。桌面引导和命令行快速上手都是真实可用的路径。

如果你想要一个面向编码智能体的控制中心，就用 OpenHands，并且不要轻看那个未沙箱化的 npm 安装。

如果你想要一个带大量 MCP 扩展的通用桌面和命令行智能体，就用 Goose，并把提供商和扩展数量当作项目自己的说法。

如果你要把智能体构建进自己的服务，就用 LangGraph 或 CrewAI，并做好准备去运维你构建的东西。如果你在评估 Dify，请先读那份修改过的许可证，再假定你可以转售多租户副本或改造控制台样式。

每个选项都要做两项核查。第一，看许可证文件，而不是博客文章里的徽章，包括这一篇。第二，提示词去了哪里。自托管智能体并不等于自托管模型。除非你选择本地模型服务器，否则提供商仍会看到提示词。

以上没有任何内容是说某个项目会做得更好。它说的是它们是不同的软件，有用的选择是形态与工作相匹配的那个。
